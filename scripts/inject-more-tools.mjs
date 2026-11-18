#!/usr/bin/env node
// Injects the web-free.site "More free tools" block and the Cloudflare Web Analytics beacon
// before </body> of every built HTML page (outside the app root, so hydration does not remove it).
import fs from "node:fs";
import path from "node:path";

const MARKER = 'id="wf-more-tools"';
const BEACON = "static.cloudflareinsights.com/beacon.min.js";
const BLOCK = "\n<aside id=\"wf-more-tools\" class=\"wf-more-tools\" aria-labelledby=\"wf-mt-title\">\n  <style>\n    .wf-more-tools{box-sizing:border-box;width:100%;margin:2.5rem 0 0;padding:1.5rem 1rem 5rem;border-top:1px solid rgba(0,0,0,.12);background:rgba(248,249,251,.97);color:#1a1a1a;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;font-size:15px;line-height:1.5}\n    .wf-more-tools *{box-sizing:border-box}\n    .wf-more-tools h2{margin:0 0 .35rem;font-size:1.15rem;font-weight:700}\n    .wf-more-tools .wf-mt-lead{margin:0 0 1rem;color:#333}\n    .wf-more-tools .wf-mt-lead a{color:#0b57d0}\n    .wf-more-tools .wf-mt-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:1rem 1.25rem}\n    .wf-more-tools h3{margin:0 0 .4rem;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em;color:#444}\n    .wf-more-tools ul{margin:0;padding:0;list-style:none}\n    .wf-more-tools li{margin:0 0 .25rem}\n    .wf-more-tools a{color:#0b57d0;text-decoration:underline}\n    .wf-more-tools a:hover{text-decoration:none}\n    @media (prefers-color-scheme:dark){\n      .wf-more-tools{background:rgba(22,24,28,.96);color:#f2f2f2;border-top-color:rgba(255,255,255,.14)}\n      .wf-more-tools .wf-mt-lead,.wf-more-tools h3{color:#c8c8c8}\n      .wf-more-tools a{color:#8ab4f8}\n    }\n  </style>\n  <h2 id=\"wf-mt-title\">More free tools</h2>\n  <p class=\"wf-mt-lead\">These utilities run in your browser. Browse the full list on <a href=\"https://web-free.site/\">web-free.site</a>.</p>\n  <div class=\"wf-mt-grid\">\n    <div class=\"wf-mt-cat wf-mt-guides\"><h3>Guides on this site</h3><ul><li><a href=\"/how-to-convert-a-video-to-mp3-in-the-browser\">How to convert video to MP3 in the browser</a></li></ul></div>\n    <div class=\"wf-mt-cat\"><h3>Documents &amp; writing</h3><ul><li><a href=\"https://free-word-counter.web-free.site/\">Free Word Counter</a></li><li><a href=\"https://free-pdf-converter.web-free.site/\">Free PDF Converter</a></li><li><a href=\"https://free-cv-maker.web-free.site/\">Free CV Maker</a></li><li><a href=\"https://free-invoice-generator.web-free.site/\">Free Invoice Generator</a></li><li><a href=\"https://free-typing-test.web-free.site/\">Free Typing Test</a></li><li><a href=\"https://free-signature-generator.web-free.site/\">Free Signature Generator</a></li></ul></div><div class=\"wf-mt-cat\"><h3>Images &amp; codes</h3><ul><li><a href=\"https://free-qr-code-creator.web-free.site/\">Free QR Code Creator</a></li><li><a href=\"https://free-image-resizer.web-free.site/\">Free Image Resizer</a></li><li><a href=\"https://free-image-to-text.web-free.site/\">Free Image to Text</a></li><li><a href=\"https://free-background-remover.web-free.site/\">Free Background Remover</a></li><li><a href=\"https://free-image-compressor.web-free.site/\">Free Image Compressor</a></li></ul></div><div class=\"wf-mt-cat\"><h3>Calculators &amp; currency</h3><ul><li><a href=\"https://free-online-calculator.web-free.site/\">Free Online Calculator</a></li><li><a href=\"https://free-currency-converter.web-free.site/\">Free Currency Converter</a></li><li><a href=\"https://free-unit-converter.web-free.site/\">Free Unit Converter</a></li><li><a href=\"https://free-loan-calculator.web-free.site/\">Free Loan Calculator</a></li><li><a href=\"https://free-age-calculator.web-free.site/\">Free Age Calculator</a></li><li><a href=\"https://free-percentage-calculator.web-free.site/\">Free Percentage Calculator</a></li><li><a href=\"https://free-bmi-calculator.web-free.site/\">Free BMI Calculator</a></li></ul></div><div class=\"wf-mt-cat\"><h3>Text &amp; SEO</h3><ul><li><a href=\"https://free-ai-humanizer.web-free.site/\">Free AI Humanizer</a></li><li><a href=\"https://free-seo-generator.web-free.site/\">Free SEO Generator</a></li><li><a href=\"https://free-backlink-generator.web-free.site/\">Free Backlink Generator</a></li><li><a href=\"https://free-json-formatter.web-free.site/\">Free JSON Formatter</a></li><li><a href=\"https://free-text-to-speech.web-free.site/\">Free Text to Speech</a></li><li><a href=\"https://free-speech-to-text.web-free.site/\">Free Speech to Text</a></li></ul></div><div class=\"wf-mt-cat\"><h3>Audio &amp; video</h3><ul><li><strong>Free Video to MP3 Converter</strong></li></ul></div><div class=\"wf-mt-cat\"><h3>Test data</h3><ul><li><a href=\"https://free-fake-address-generator.web-free.site/\">Free Fake Address Generator</a></li><li><a href=\"https://free-fake-name-generator.web-free.site/\">Free Fake Name Generator</a></li></ul></div><div class=\"wf-mt-cat\"><h3>Security &amp; passwords</h3><ul><li><a href=\"https://free-password-generator.web-free.site/\">Free Password Generator</a></li></ul></div>\n  </div>\n</aside>\n";
const SNIPPET_BEACON = "<!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{\"token\": \"3e2f5f96ab32442ebb6e6f650615b58a\"}'></script><!-- End Cloudflare Web Analytics -->";

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "node_modules" || name === ".git") continue;
      walk(p, acc);
    } else if (name.endsWith(".html") && st.size >= 80) acc.push(p);
  }
  return acc;
}

function inject(text) {
  const idx = text.toLowerCase().lastIndexOf("</body>");
  if (idx === -1) return { text, changed: false };
  const parts = [];
  if (!text.includes(MARKER)) parts.push(BLOCK);
  if (!text.includes(BEACON)) parts.push(SNIPPET_BEACON);
  if (!parts.length) return { text, changed: false };
  return { text: text.slice(0, idx) + parts.join("\n") + "\n" + text.slice(idx), changed: true };
}

const SKIP = new Set([]);
const root = path.resolve(process.argv[2] || "dist");
let n = 0;
for (const file of walk(root)) {
  if (SKIP.has(path.relative(root, file).split(path.sep).join("/"))) continue;
  const { text, changed } = inject(fs.readFileSync(file, "utf8"));
  if (changed) {
    fs.writeFileSync(file, text);
    n += 1;
  }
}
console.log("inject-more-tools: updated", n, "HTML files in", root);
