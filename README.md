# Free Video to MP3 Converter

https://free-video-to-mp3.web-free.site — extract MP3 from local video files in the browser (no upload).

## Base & license

- Forked from [CrypticSignal/av-converter](https://github.com/CrypticSignal/av-converter) (**MIT**). See `LICENSE`.
- FFmpeg WebAssembly **LGPL** single-thread core (recipe in `vendor/ffmpeg-lgpl-source/`).
- [@ffmpeg/ffmpeg](https://github.com/ffmpegwasm/ffmpeg.wasm) 0.12.15 (**MIT**).

## FFmpeg core

| Asset | ~Size | License | In Worker `dist/`? |
|-------|-------|---------|-------------------|
| ffmpeg-core.js | ~250 KB | LGPL | No (CDN) |
| ffmpeg-core.wasm | ~29 MB | LGPL | No (CDN + Cache API) |

Configure URLs in `public/ffmpeg-core.json`. Local dev: `npm run fetch-ffmpeg-core` && `npm run dev`.

## Commands

```bash
npm run fetch-ffmpeg-core
npm run dev
npm run build
npm run preview
```

Node >= 22.18. No COOP/COEP. No URL downloader.
