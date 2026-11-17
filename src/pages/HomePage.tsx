import ConverterPage from './ConverterPage';
import { JsonLdFaq, JsonLdWebApp } from '../components/JsonLd';
import { usePageMeta } from '../seo/usePageMeta';
import { SITE_NAME, SITE_URL } from '../site';

const FAQ = [
  {
    question: 'Does this upload my video to a server?',
    answer: 'No. The converter runs entirely in your browser using WebAssembly. Your file never leaves your device.',
  },
  {
    question: 'Which video formats can I convert to MP3?',
    answer: 'Common containers such as MP4, MOV, WebM, MKV, AVI, MPEG, and M4V are supported when FFmpeg can read the audio track inside.',
  },
  {
    question: 'Why does the first conversion take longer?',
    answer: 'The app downloads the LGPL FFmpeg WebAssembly core once (about 29 MB) and caches it in your browser for future visits.',
  },
  {
    question: 'Can I adjust MP3 quality?',
    answer: 'Yes. Choose constant bitrate (CBR), variable bitrate (VBR), or average bitrate (ABR) before converting.',
  },
];

export default function HomePage() {
  usePageMeta({
    title: `${SITE_NAME} — Extract audio in your browser`,
    description:
      'Free video to MP3 converter. Pick a local MP4, MOV, or WebM file, choose bitrate, and download MP3. No upload, no account.',
    path: '/',
  });

  return (
    <>
      <JsonLdWebApp />
      <JsonLdFaq faqs={FAQ} />
      <ConverterPage
        title={SITE_NAME}
        lead="Pick a video from your device, choose MP3 quality, and download. Processing uses FFmpeg in WebAssembly on your computer — nothing is uploaded."
      />
      <section className="max-w-3xl mx-auto px-4 pb-12 text-left">
        <h2 className="text-xl font-semibold text-white mb-4">FAQ</h2>
        <dl className="space-y-4 text-slate-300 text-sm">
          {FAQ.map(f => (
            <div key={f.question}>
              <dt className="font-medium text-slate-100">{f.question}</dt>
              <dd className="mt-1">{f.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6 text-xs text-slate-500">
          Canonical URL: <a href={SITE_URL}>{SITE_URL}</a>
        </p>
      </section>
    </>
  );
}