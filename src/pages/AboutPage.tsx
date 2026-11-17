import ContentPage from './ContentPage';

export default function AboutPage() {
  return (
    <ContentPage
      title="About Free Video to MP3 Converter"
      description="Privacy-first local video to MP3 conversion, upstream credits, and FFmpeg LGPL compliance."
      path="/about"
    >
      <p>
        This site extracts audio from videos you already have on your device. It does not download from YouTube or other
        URLs, and it does not upload your files.
      </p>
      <h2>Upstream project</h2>
      <p>
        The converter is derived from{' '}
        <a href="https://github.com/CrypticSignal/av-converter">CrypticSignal/av-converter</a> (MIT), simplified for
        video-to-MP3 only.
      </p>
      <h2>FFmpeg &amp; ffmpeg.wasm</h2>
      <p>
        Encoding uses a <strong>single-threaded LGPL FFmpeg WebAssembly core</strong> (no libx264/libx265, no GPL codecs).
        Build recipe and Dockerfile are in <code>vendor/ffmpeg-lgpl-source/</code> in the repository. The JavaScript
        wrapper <a href="https://github.com/ffmpegwasm/ffmpeg.wasm">@ffmpeg/ffmpeg</a> is MIT.
      </p>
      <p>
        Because the core WASM is about 29–30&nbsp;MB, it is loaded at runtime from a CDN and cached in the browser — not
        shipped as a Cloudflare Worker static asset.
      </p>
      <h2>More tools</h2>
      <p>
        Visit the <a href="https://web-free.site/">web-free.site</a> hub for other free in-browser utilities.
      </p>
    </ContentPage>
  );
}