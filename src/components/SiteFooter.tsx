import { Link } from 'react-router-dom';
import { HUB_URL, SITE_NAME } from '../site';
import { SponsoredSmartlink } from './ads/AdSlot';

export default function SiteFooter() {
  return (
    <footer className="max-w-6xl mx-auto px-4 py-10 mt-12 border-t border-white/10 text-sm text-slate-400">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-slate-200 mb-2">{SITE_NAME}</p>
          <p>
            Local video to MP3 in your browser. Based on{' '}
            <a
              href="https://github.com/CrypticSignal/av-converter"
              className="text-cyan-300 hover:text-cyan-200 underline"
              rel="noopener noreferrer"
            >
              av-converter
            </a>{' '}
            (MIT). Uses{' '}
            <a href="https://ffmpeg.org" className="text-cyan-300 hover:text-cyan-200 underline" rel="noopener">
              FFmpeg
            </a>{' '}
            (LGPL build) via{' '}
            <a
              href="https://github.com/ffmpegwasm/ffmpeg.wasm"
              className="text-cyan-300 hover:text-cyan-200 underline"
              rel="noopener"
            >
              ffmpeg.wasm
            </a>
            .
          </p>
          <p className="mt-2">
            More free tools:{' '}
            <a href={HUB_URL} className="text-cyan-300 hover:text-cyan-200 underline">
              web-free.site
            </a>
          </p>
          <SponsoredSmartlink className="mt-3" />
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-1">
          <Link to="/how-to-convert-a-video-to-mp3-in-the-browser" className="hover:text-white">
            How to convert video to MP3
          </Link>
          <Link to="/how-to-choose-an-mp3-bitrate" className="hover:text-white">
            How to choose an MP3 bitrate
          </Link>
          <Link to="/about" className="hover:text-white">
            About
          </Link>
          <Link to="/contact" className="hover:text-white">
            Contact
          </Link>
          <Link to="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms
          </Link>
        </nav>
      </div>
      <p className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} {SITE_NAME}. English only.</p>
    </footer>
  );
}