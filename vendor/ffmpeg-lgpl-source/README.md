# FFmpeg WASM LGPL Build Source

This archive contains the complete source code and build instructions for
the FFmpeg WebAssembly binary used at utterlyapp.com/tools/convert/.

## License

FFmpeg is licensed under the GNU Lesser General Public License version 2.1
(LGPLv2.1). This build uses only LGPL and BSD-compatible libraries.

Full text: https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html

## Build prerequisites

- Docker v23.0+ with buildx
- On Apple Silicon: export DOCKER_DEFAULT_PLATFORM=linux/amd64

## Build

```bash
docker buildx build --platform linux/amd64 -f Dockerfile.lgpl --build-arg FFMPEG_ST=yes -o ./output .
```

Output:
- output/dist/umd/ffmpeg-core.js   (Emscripten glue)
- output/dist/umd/ffmpeg-core.wasm (WebAssembly binary, ~20-25 MB)

## Versions

- FFmpeg: n5.1.4
- Emscripten: 3.1.40
- @ffmpeg/ffmpeg JS wrapper: 0.12.15 (MIT, not included — installed separately)
- @ffmpeg/core: 0.12.10

## Included libraries (all LGPL/BSD-compatible)

| Library      | Version | License            |
|--------------|---------|---------------------|
| libvpx       | 1.13.1  | BSD-3              |
| libopus      | 1.3.1   | BSD-3              |
| libvorbis    | 1.3.3   | BSD-3              |
| libogg       | 1.3.4   | BSD-3              |
| libtheora    | 1.1.1   | BSD-3              |
| libwebp      | 1.3.2   | BSD-3              |
| libmp3lame   | —       | LGPL-2.0+          |
| zlib         | 1.2.11  | zlib               |
| freetype2    | 2.10.4  | FreeType (BSD-like)|
| fribidi      | 1.0.9   | LGPL-2.1+          |
| harfbuzz     | 5.2.0   | MIT                |
| libass       | 0.15.0  | ISC                |

## Using your custom build

Set these in your browser console to use your own build on utterlyapp.com:

```javascript
localStorage.setItem('ffmpeg_custom_core', 'https://your-server/ffmpeg-core.js');
localStorage.setItem('ffmpeg_custom_wasm', 'https://your-server/ffmpeg-core.wasm');
```
