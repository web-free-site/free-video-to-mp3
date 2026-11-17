import { defineConfig, type Plugin, type ViteDevServer, type PreviewServer } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import type { IncomingMessage, ServerResponse } from 'node:http';

const FFMPEG_LOCAL = join(process.cwd(), 'external-assets/ffmpeg-lgpl');

function attachFfmpegMiddleware(
  middlewares: ViteDevServer['middlewares'] | PreviewServer['middlewares'],
) {
  middlewares.use((req: IncomingMessage, res: ServerResponse, next) => {
    const url = req.url?.split('?')[0] ?? '';
    if (url === '/ffmpeg-core.json') {
      const base = JSON.parse(readFileSync(join(process.cwd(), 'public/ffmpeg-core.json'), 'utf8'));
      const devManifest = {
        ...base,
        coreJsUrl: '/ffmpeg-cdn/ffmpeg-core.js',
        coreWasmUrl: '/ffmpeg-cdn/ffmpeg-core.wasm',
      };
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(devManifest, null, 2));
      return;
    }
    if (url.startsWith('/ffmpeg-cdn/')) {
      const name = url.replace('/ffmpeg-cdn/', '');
      if (name.includes('..')) {
        res.statusCode = 400;
        res.end();
        return;
      }
      const file = join(FFMPEG_LOCAL, name);
      if (!existsSync(file)) {
        res.statusCode = 404;
        res.end('Run: npm run fetch-ffmpeg-core');
        return;
      }
      const type = name.endsWith('.wasm') ? 'application/wasm' : 'text/javascript';
      res.setHeader('Content-Type', type);
      res.setHeader('Content-Length', String(statSync(file).size));
      res.setHeader('Cache-Control', 'public, max-age=86400');
      createReadStream(file).pipe(res);
      return;
    }
    next();
  });
}

const serveFfmpegCdn = (): Plugin => ({
  name: 'serve-ffmpeg-lgpl-cdn',
  configureServer(server) {
    attachFfmpegMiddleware(server.middlewares);
  },
  configurePreviewServer(server) {
    attachFfmpegMiddleware(server.middlewares);
  },
});

export default defineConfig({
  plugins: [react(), tailwindcss(), serveFfmpegCdn()],
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
  build: {
    outDir: 'dist',
  },
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
});