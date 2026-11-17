import fs from 'node:fs';
import path from 'node:path';

const HOST = 'https://free-video-to-mp3.web-free.site';
const paths = [
  '/',
  '/mp4-to-mp3',
  '/mov-to-mp3',
  '/webm-to-mp3',
  '/how-to-convert-a-video-to-mp3-in-the-browser',
  '/about',
  '/privacy',
  '/terms',
  '/contact',
];

const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map(p => `  <url><loc>${HOST}${p === '/' ? '/' : p}</loc></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join('dist', 'sitemap.xml'), body);
fs.writeFileSync(
  path.join('dist', 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${HOST}/sitemap.xml\n`,
);
console.log('Wrote sitemap.xml and robots.txt');