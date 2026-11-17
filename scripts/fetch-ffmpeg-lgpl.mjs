import { mkdir, writeFile, access, readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { pipeline } from 'node:stream/promises';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'external-assets/ffmpeg-lgpl');
const BASE = process.env.FFMPEG_LGPL_CDN_BASE ?? 'https://utterlyapp.com/static/js/vendor/ffmpeg-0.12.15/core';

const files = ['ffmpeg-core.js', 'ffmpeg-core.wasm'];

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function download(name) {
  const dest = join(OUT, name);
  if (await exists(dest)) {
    console.log('skip', name, '(already present)');
    return;
  }
  const url = `${BASE}/${name}`;
  console.log('fetch', url);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  await pipeline(res.body, createWriteStream(dest));
}

async function ensureEsmExport() {
  const jsPath = join(OUT, 'ffmpeg-core.js');
  let code = await readFile(jsPath, 'utf8');
  if (!code.includes('export default createFFmpegCore')) {
    code = `${code.trim()}\nexport default createFFmpegCore;\n`;
    await writeFile(jsPath, code);
    console.log('wrapped ffmpeg-core.js as ES module (export default)');
  }
}

await mkdir(OUT, { recursive: true });
await Promise.all(files.map(download));
await ensureEsmExport();
await writeFile(
  join(OUT, 'SOURCE.txt'),
  `Downloaded for local dev from ${BASE}.\n` +
    'Production must serve LGPL binaries built from vendor/ffmpeg-lgpl-source (not GPL @ffmpeg/core).\n',
);
console.log('FFmpeg LGPL cores ready in', OUT);