/**
 * Loads the LGPL single-threaded ffmpeg.wasm core at runtime (never bundled in Worker assets).
 * Uses the Cache API when available; shows byte progress via the optional callback.
 */
import { toBlobURL } from '@ffmpeg/util';

export interface FfmpegCoreManifest {
  license: string;
  description: string;
  coreJsUrl: string;
  coreWasmUrl: string;
  wasmBytes?: number;
  fallbackWasmBytes?: number;
}

const CACHE_NAME = 'free-video-to-mp3-ffmpeg-core-v1';
const MANIFEST_URL = '/ffmpeg-core.json';

let manifestPromise: Promise<FfmpegCoreManifest> | null = null;

export async function loadFfmpegCoreManifest(): Promise<FfmpegCoreManifest> {
  if (!manifestPromise) {
    manifestPromise = fetch(MANIFEST_URL, { cache: 'no-cache' })
      .then(r => {
        if (!r.ok) throw new Error(`Could not load ${MANIFEST_URL}`);
        return r.json() as Promise<FfmpegCoreManifest>;
      });
  }
  return manifestPromise;
}

async function fetchWithCache(
  url: string,
  mime: string,
  onProgress?: (loaded: number, total?: number) => void,
): Promise<string> {
  if (typeof caches !== 'undefined') {
    try {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        const blob = await cached.blob();
        onProgress?.(blob.size, blob.size);
        return URL.createObjectURL(blob);
      }
    } catch {
      /* private mode / quota — fetch without cache */
    }
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch FFmpeg core (${response.status}): ${url}`);

  const total = Number(response.headers.get('content-length')) || undefined;
  let loaded = 0;
  const reader = response.body?.getReader();
  if (!reader) {
    const blob = await response.blob();
    onProgress?.(blob.size, total ?? blob.size);
    const blobUrl = URL.createObjectURL(blob);
    try {
      const cache = await caches.open(CACHE_NAME);
      await cache.put(url, new Response(blob, { headers: { 'Content-Type': mime } }));
    } catch {
      /* ignore */
    }
    return blobUrl;
  }

  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      loaded += value.length;
      onProgress?.(loaded, total);
    }
  }
  const blob = new Blob(chunks as BlobPart[], { type: mime });
  const blobUrl = URL.createObjectURL(blob);
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(url, new Response(blob, { headers: { 'Content-Type': mime } }));
  } catch {
    /* ignore */
  }
  return blobUrl;
}

export type CoreLoadProgress = (loaded: number, total?: number, phase?: 'manifest' | 'js' | 'wasm') => void;

/** Resolve core + wasm URLs (blob:) for ffmpeg.load(). Caller must revoke URLs after load. */
export async function resolveFfmpegCoreUrls(onProgress?: CoreLoadProgress): Promise<{
  coreURL: string;
  wasmURL: string;
  manifest: FfmpegCoreManifest;
}> {
  onProgress?.(0, undefined, 'manifest');
  const manifest = await loadFfmpegCoreManifest();
  const estimated = manifest.wasmBytes ?? manifest.fallbackWasmBytes;

  const coreURL = await fetchWithCache(
    manifest.coreJsUrl,
    'text/javascript',
    (loaded, total) => onProgress?.(loaded, total, 'js'),
  );
  const wasmURL = await fetchWithCache(
    manifest.coreWasmUrl,
    'application/wasm',
    (loaded, total) => onProgress?.(loaded, total ?? estimated, 'wasm'),
  );

  return { coreURL, wasmURL, manifest };
}