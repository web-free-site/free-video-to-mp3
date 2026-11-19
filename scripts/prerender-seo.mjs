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
    html = html.replace('<script src="https://ref.web-free.site/r.js" defer></script>
</head>', `    <link rel="canonical" href="${url}" />\n  </head>`);
  }
  html = html.replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${url}" />`);
  html = html.replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${page.title}" />`);
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${page.description}" />`,
  );
  const seoBlock = `<section id="seo-prerender" class="seo-prerender"><h1>${page.h1}</h1>${page.snippet}</section>`;
  html = html.replace('<div id="root"></div>', `${seoBlock}<div id="root"></div>`);
  return html;
}

for (const page of pages) {
  const dir = path.join(dist, page.path.replace(/^\//, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildPage(page));
}

console.log('Prerendered', pages.length, 'SEO HTML shells into dist/');