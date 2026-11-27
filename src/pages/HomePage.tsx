import ConverterPage from './ConverterPage';
import { JsonLdFaq, JsonLdWebApp } from '../components/JsonLd';
import { usePageMeta } from '../seo/usePageMeta';
import { HUB_GUIDE_URL, HUB_REF_URL, SITE_NAME, SITE_URL } from '../site';
import { HOMEPAGE_FAQ } from '../../scripts/homepage-seo-data.mjs';

const META_TITLE = 'Free Video to MP3 Converter — Extract MP3 in your browser | No upload';
const META_DESCRIPTION =
  'Convert MP4, MOV, WebM, MKV, and other videos to MP3 free in your browser. FFmpeg WebAssembly runs locally—no upload, no account, no watermark.';

const FAQ = HOMEPAGE_FAQ;

export default function HomePage() {
  usePageMeta({
    title: META_TITLE,
    description: META_DESCRIPTION,
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
      <article className="max-w-3xl mx-auto px-4 pb-12 text-left prose prose-invert prose-slate prose-sm sm:prose-base">
        <h2 className="text-xl font-semibold text-white mt-10 mb-4 not-prose">
          What this free video to MP3 converter does
        </h2>
        <p className="text-slate-300 leading-relaxed">
          This {SITE_NAME.toLowerCase()} pulls the audio track out of a video file and saves it as a standard MP3 you
          can play offline, drop into a podcast app, or edit in any audio editor. You might start with a screen
          recording, a clip from a camera roll, a webinar download, or a music video saved as MP4. Instead of installing
          desktop software or signing up for a cloud service that copies your media to unknown servers, you open this
          page, choose a file from disk, and let FFmpeg decode the container locally.
        </p>
        <p className="text-slate-300 leading-relaxed">
          The tool is built for privacy and speed on everyday tasks: one song, one lecture, one voice-over track. It is
          part of the{' '}
          <a href={HUB_REF_URL} className="text-cyan-300 hover:text-cyan-200 underline">
            Web Free
          </a>{' '}
          family of in-browser utilities. For a longer walkthrough with screenshots and troubleshooting tips, see our
          matching guide:{' '}
          <a href={HUB_GUIDE_URL} className="text-cyan-300 hover:text-cyan-200 underline">
            extract MP3 from video free in the browser
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4 not-prose">How to convert video to MP3 online</h2>
        <ol className="text-slate-300 space-y-2 list-decimal list-inside leading-relaxed">
          <li>
            Open this page in a current desktop or mobile browser (Chrome, Firefox, Safari, or Edge with JavaScript
            enabled).
          </li>
          <li>
            In step 1 of the converter, click the file area or drag and drop a video. Supported inputs include MP4,
            MOV, WebM, MKV, AVI, MPEG, and related containers.
          </li>
          <li>
            Wait a moment while the app probes the file. The preview panel shows duration, video size, and which audio
            tracks are inside the container.
          </li>
          <li>
            In MP3 settings, choose encoding mode (CBR, VBR, or ABR) and bitrate or quality. For speech, 128 kbps is often
            enough; for music, try 192 kbps or higher.
          </li>
          <li>
            Click <strong className="text-slate-100">Convert to MP3</strong>. The first run loads the FFmpeg core; after
            that, repeats are quicker on the same device.
          </li>
          <li>
            When conversion finishes, download the MP3 or use the built-in player to check the result before you save
            it.
          </li>
        </ol>
        <p className="text-slate-300 leading-relaxed">
          Need help picking a bitrate? Read our{' '}
          <a href="/how-to-choose-an-mp3-bitrate" className="text-cyan-300 hover:text-cyan-200 underline">
            MP3 bitrate guide
          </a>{' '}
          on this site.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4 not-prose">Privacy and in-browser processing</h2>
        <p className="text-slate-300 leading-relaxed">
          Unlike many “online converters” that ask you to upload a file and wait in a queue, this app keeps your media on
          your machine. Decoding and encoding happen inside a WebAssembly build of FFmpeg that runs in your tab. We do not
          receive the video, the MP3, or filenames from the conversion step. The only large download is the open-source
          encoder core, which is cached in your browser storage for future visits.
        </p>
        <p className="text-slate-300 leading-relaxed">
          That design matters when you handle personal recordings, confidential meetings, or copyrighted material you
          already own. You stay in control: close the tab when you are done, and the working data is cleared from memory.
          As with any local tool, only convert content you have the right to use.
        </p>

        <h2 className="text-xl font-semibold text-white mt-8 mb-4 not-prose">Common use cases</h2>
        <ul className="text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>
            <strong className="text-slate-100">Podcasts and interviews</strong> — Extract audio from a video interview
            saved as MP4 so you can edit it in Audacity or publish an audio-only episode.
          </li>
          <li>
            <strong className="text-slate-100">Lectures and webinars</strong> — Turn long classroom or Zoom recordings
            into MP3 for listening on a commute without keeping the video track.
          </li>
          <li>
            <strong className="text-slate-100">Music and ringtones</strong> — Save a soundtrack from a clip you already
            own, then trim or share the MP3 (respect copyright and platform rules).
          </li>
          <li>
            <strong className="text-slate-100">Social and messaging limits</strong> — Some apps cap video size but accept
            audio; converting to a smaller MP3 can make sharing easier.
          </li>
          <li>
            <strong className="text-slate-100">Archiving</strong> — Keep a lightweight audio copy alongside a large
            video library on a laptop or phone with limited storage.
          </li>
        </ul>
        <p className="text-slate-300 leading-relaxed">
          Format-specific shortcuts are available on this site: try the{' '}
          <a href="/mp4-to-mp3" className="text-cyan-300 hover:text-cyan-200 underline">
            MP4 to MP3
          </a>
          ,{' '}
          <a href="/mov-to-mp3" className="text-cyan-300 hover:text-cyan-200 underline">
            MOV to MP3
          </a>
          , and{' '}
          <a href="/webm-to-mp3" className="text-cyan-300 hover:text-cyan-200 underline">
            WebM to MP3
          </a>{' '}
          pages when you already know your container type.
        </p>

        <section className="mt-10 not-prose" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-semibold text-white mb-4">
            Frequently asked questions
          </h2>
          <dl className="space-y-4 text-slate-300 text-sm">
            {FAQ.map(f => (
              <div key={f.question}>
                <dt className="font-medium text-slate-100">{f.question}</dt>
                <dd className="mt-1">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
        <p className="mt-6 text-xs text-slate-500 not-prose">
          Canonical URL:{' '}
          <a href={SITE_URL} className="text-slate-400 hover:text-slate-300 underline">
            {SITE_URL}
          </a>
        </p>
      </article>
    </>
  );
}