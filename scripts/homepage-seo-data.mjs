/** Shared homepage FAQ + static HTML for build-time prerender (kept in sync with HomePage.tsx). */

const HUB_REF_URL = 'https://web-free.site/?ref=free-video-to-mp3';
const HUB_GUIDE_URL = 'https://web-free.site/guides/extract-mp3-from-video-free/';
const SITE_URL = 'https://free-video-to-mp3.web-free.site';
export const HOMEPAGE_H1 = 'Free Video to MP3 Converter';
export const HOMEPAGE_LEAD =
  'Pick a video from your device, choose MP3 quality, and download. Processing uses FFmpeg in WebAssembly on your computer — nothing is uploaded.';

export const HOMEPAGE_FAQ = [
  {
    question: 'Does this free video to MP3 converter upload my files?',
    answer:
      'No. Conversion runs entirely in your browser with WebAssembly. Your video and MP3 never leave your device or get sent to our servers.',
  },
  {
    question: 'Which video formats can I convert to MP3?',
    answer:
      'Common containers such as MP4, MOV, WebM, MKV, AVI, MPEG, MPG, M4V, and 3GP are supported when FFmpeg can read the audio track inside the file.',
  },
  {
    question: 'Why does the first conversion take longer?',
    answer:
      'On first use the app downloads the LGPL FFmpeg WebAssembly core once (about 29 MB) and caches it in your browser. Later conversions on this device start much faster.',
  },
  {
    question: 'Can I choose MP3 quality or bitrate?',
    answer:
      'Yes. Pick constant bitrate (CBR), variable bitrate (VBR), or average bitrate (ABR), and set a quality level before you convert. The default 192 kbps suits most music and speech.',
  },
  {
    question: 'Does the converter work on phones and tablets?',
    answer:
      'Yes, in modern mobile browsers that support WebAssembly (Chrome, Safari, Firefox, Edge). Very large videos may be limited by available RAM, so shorter clips convert more reliably on phones.',
  },
];

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function faqDlHtml() {
  return HOMEPAGE_FAQ.map(
    f =>
      `<div><dt>${esc(f.question)}</dt><dd><p>${esc(f.answer)}</p></dd></div>`,
  ).join('\n');
}

export function buildFaqJsonLdString() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: HOMEPAGE_FAQ.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
  return JSON.stringify(data);
}

/** Crawler-visible homepage copy injected before #root (removed on client hydration). */
export function buildHomepagePrerenderSection() {
  return `<section id="seo-prerender" class="seo-prerender">
  <h1>${esc(HOMEPAGE_H1)}</h1>
  <p>${esc(HOMEPAGE_LEAD)}</p>
  <article>
    <h2>What this free video to MP3 converter does</h2>
    <p>This free video to mp3 converter pulls the audio track out of a video file and saves it as a standard MP3 you can play offline, drop into a podcast app, or edit in any audio editor. You might start with a screen recording, a clip from a camera roll, a webinar download, or a music video saved as MP4. Instead of installing desktop software or signing up for a cloud service that copies your media to unknown servers, you open this page, choose a file from disk, and let FFmpeg decode the container locally.</p>
    <p>The tool is built for privacy and speed on everyday tasks: one song, one lecture, one voice-over track. It is part of the <a href="${HUB_REF_URL}">Web Free</a> family of in-browser utilities. For a longer walkthrough with screenshots and troubleshooting tips, see our matching guide: <a href="${HUB_GUIDE_URL}">extract MP3 from video free in the browser</a>.</p>
    <h2>How to convert video to MP3 online</h2>
    <ol>
      <li>Open this page in a current desktop or mobile browser (Chrome, Firefox, Safari, or Edge with JavaScript enabled).</li>
      <li>In step 1 of the converter, click the file area or drag and drop a video. Supported inputs include MP4, MOV, WebM, MKV, AVI, MPEG, and related containers.</li>
      <li>Wait a moment while the app probes the file. The preview panel shows duration, video size, and which audio tracks are inside the container.</li>
      <li>In MP3 settings, choose encoding mode (CBR, VBR, or ABR) and bitrate or quality. For speech, 128 kbps is often enough; for music, try 192 kbps or higher.</li>
      <li>Click <strong>Convert to MP3</strong>. The first run loads the FFmpeg core; after that, repeats are quicker on the same device.</li>
      <li>When conversion finishes, download the MP3 or use the built-in player to check the result before you save it.</li>
    </ol>
    <p>Need help picking a bitrate? Read our <a href="/how-to-choose-an-mp3-bitrate">MP3 bitrate guide</a> on this site.</p>
    <h2>Privacy and in-browser processing</h2>
    <p>Unlike many online converters that ask you to upload a file and wait in a queue, this app keeps your media on your machine. Decoding and encoding happen inside a WebAssembly build of FFmpeg that runs in your tab. We do not receive the video, the MP3, or filenames from the conversion step. The only large download is the open-source encoder core, which is cached in your browser storage for future visits.</p>
    <p>That design matters when you handle personal recordings, confidential meetings, or copyrighted material you already own. You stay in control: close the tab when you are done, and the working data is cleared from memory. As with any local tool, only convert content you have the right to use.</p>
    <h2>Common use cases</h2>
    <ul>
      <li><strong>Podcasts and interviews</strong> — Extract audio from a video interview saved as MP4 so you can edit it in Audacity or publish an audio-only episode.</li>
      <li><strong>Lectures and webinars</strong> — Turn long classroom or Zoom recordings into MP3 for listening on a commute without keeping the video track.</li>
      <li><strong>Music and ringtones</strong> — Save a soundtrack from a clip you already own, then trim or share the MP3 (respect copyright and platform rules).</li>
      <li><strong>Social and messaging limits</strong> — Some apps cap video size but accept audio; converting to a smaller MP3 can make sharing easier.</li>
      <li><strong>Archiving</strong> — Keep a lightweight audio copy alongside a large video library on a laptop or phone with limited storage.</li>
    </ul>
    <p>Format-specific shortcuts are available on this site: try the <a href="/mp4-to-mp3">MP4 to MP3</a>, <a href="/mov-to-mp3">MOV to MP3</a>, and <a href="/webm-to-mp3">WebM to MP3</a> pages when you already know your container type.</p>
    <section aria-labelledby="faq-heading-prerender">
      <h2 id="faq-heading-prerender">Frequently asked questions</h2>
      <dl>
        ${faqDlHtml()}
      </dl>
    </section>
    <p>Canonical URL: <a href="${SITE_URL}">${SITE_URL}</a></p>
  </article>
</section>`;
}