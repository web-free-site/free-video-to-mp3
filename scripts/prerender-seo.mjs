import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-video-to-mp3.web-free.site';
const dist = path.resolve('dist');
const baseHtml = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

const pages = [
  {
    path: '/mp4-to-mp3',
    title: 'MP4 to MP3 — Free browser converter',
    description: 'Convert local MP4 videos to MP3 online. Extract audio without uploading.',
    h1: 'MP4 to MP3 converter',
    snippet: '<p>Turn MP4 and M4V files into MP3 entirely in your browser.</p>',
  },
  {
    path: '/mov-to-mp3',
    title: 'MOV to MP3 — Free QuickTime audio extractor',
    description: 'Convert MOV videos to MP3 without uploading files.',
    h1: 'MOV to MP3 converter',
    snippet: '<p>Extract MP3 audio from QuickTime MOV files locally.</p>',
  },
  {
    path: '/webm-to-mp3',
    title: 'WebM to MP3 — Free online converter',
    description: 'Convert WebM video to MP3 in the browser.',
    h1: 'WebM to MP3 converter',
    snippet: '<p>Save WebM audio as MP3 on your device.</p>',
  },
  {
    path: '/how-to-convert-a-video-to-mp3-in-the-browser',
    title: 'How to convert a video to MP3 in the browser',
    description: 'Step-by-step guide for MP4, MOV, and WebM to MP3 without upload.',
    h1: 'How to convert video to MP3 in the browser',
    snippet: '<p>Pick a file, choose bitrate, convert, and download MP3.</p>',
  },
  {
    path: '/how-to-choose-an-mp3-bitrate',
    title: 'How to choose an MP3 bitrate when converting video',
    description: 'CBR, VBR or ABR, and 128, 192 or 320 kbps? Pick the right MP3 settings for speech, music and file size when you extract audio from a video.',
    h1: 'How to choose an MP3 bitrate when converting video',
    snippet: "<p>When you turn a video into MP3, the bitrate decides two things: how good the audio sounds and how big the file is. Higher is not always better, because MP3 cannot add quality that was not in the video in the first place.</p><h2>What the bitrate means</h2><p>The bitrate is the amount of data used per second of audio, in kilobits per second (kbps). File size grows in direct proportion: at a constant 128 kbps one minute of audio is about 0.96 MB, at 192 kbps about 1.44 MB, and at 320 kbps about 2.4 MB.</p><h2>CBR, VBR or ABR</h2><ul><li><strong>CBR (constant bitrate)</strong>: the same bitrate for the whole file. The size is predictable and every player handles it. A safe default.</li><li><strong>VBR (variable bitrate)</strong>: the encoder spends more data on complex passages and less on silence. You choose a quality level instead of a bitrate (0 = best, higher numbers = smaller files). Usually the best quality for a given size.</li><li><strong>ABR (average bitrate)</strong>: a middle ground that varies the bitrate but aims at the average you set, so the size stays close to what you expect.</li></ul><h2>Practical starting points</h2><ul><li><strong>Speech</strong> (lectures, podcasts, meetings, voice-overs): 64 to 128 kbps is usually enough and keeps files small.</li><li><strong>Music for everyday listening</strong>: 192 kbps CBR (the default here) or VBR quality 2 to 4.</li><li><strong>Music you want to keep at the highest MP3 quality</strong>: 320 kbps CBR or VBR quality 0.</li><li><strong>Sending over a messaging app or e-mail</strong>: choose a lower bitrate so the file stays under the size limit.</li></ul><h2>Do not exceed the source</h2><p>Phone recordings and many online videos already carry compressed audio, often around 96 to 160 kbps AAC. Converting that to 320 kbps MP3 makes a bigger file but does not make it sound better. If you are unsure, try 192 kbps first and compare it with a higher setting on your own headphones.</p><h2>Set it in the converter</h2><ol><li>Open the converter on the home page and choose your video. Nothing is uploaded; the conversion runs in your browser.</li><li>Pick the encoding type: CBR, VBR or ABR.</li><li>For CBR or ABR move the <strong>Bitrate</strong> slider (64 to 320 kbps); for VBR pick a <strong>VBR quality</strong> level.</li><li>Click Convert to MP3, then listen to the result before you download it.</li></ol>",
    jsonLd: "{\"@context\": \"https://schema.org\", \"@type\": \"Article\", \"headline\": \"How to choose an MP3 bitrate when converting video\", \"description\": \"CBR, VBR or ABR, and 128, 192 or 320 kbps? Pick the right MP3 settings for speech, music and file size when you extract audio from a video.\", \"inLanguage\": \"en\", \"mainEntityOfPage\": \"https://free-video-to-mp3.web-free.site/how-to-choose-an-mp3-bitrate\", \"author\": {\"@type\": \"Organization\", \"name\": \"web-free.site\", \"url\": \"https://web-free.site/\"}, \"publisher\": {\"@type\": \"Organization\", \"name\": \"web-free.site\", \"url\": \"https://web-free.site/\"}, \"datePublished\": \"2026-11-22\", \"dateModified\": \"2026-11-22\"}",
  },
  {
    path: '/about',
    title: 'About — Free Video to MP3 Converter',
    description: 'Upstream credits, FFmpeg LGPL core, and privacy.',
    h1: 'About this converter',
    snippet: '<p>Based on av-converter (MIT) with an LGPL FFmpeg WebAssembly core.</p>',
  },
  {
    path: '/privacy',
    title: 'Privacy policy',
    description: 'Privacy policy for the Free Video to MP3 Converter.',
    h1: 'Privacy policy',
    snippet: '<p>Your files are processed locally; we do not receive your media.</p>',
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description: 'Terms for using the Free Video to MP3 Converter.',
    h1: 'Terms of use',
    snippet: '<p>Use the tool lawfully on files you have rights to convert.</p>',
  },
  {
    path: '/contact',
    title: 'Contact',
    description: 'Contact the Free Video to MP3 Converter maintainers.',
    h1: 'Contact',
    snippet: '<p>Reach us via the web-free.site hub or GitHub issues.</p>',
  },
];

function buildPage(page) {
  const url = HOST + page.path;
  let html = baseHtml;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`);
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${page.description}" />`,
  );
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);
  } else {
    html = html.replace('</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`;
  if (page.jsonLd) html = html.replace('</head>', `<script type="application/ld+json">${page.jsonLd}</script>\n  </head>`);
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`);
  return html;
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page));
}

console.log('Prerendered', pages.length, 'SEO HTML shells into dist/');