import { chromium } from 'playwright';
import { join } from 'node:path';

const base = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173';
const files = ['test.mp4', 'test.mov', 'test.webm'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const results = [];

try {
  await page.goto(base, { waitUntil: 'networkidle', timeout: 120_000 });
  const dl = await page.goto(`${base}/download`, { waitUntil: 'domcontentloaded' });
  results.push({ step: 'no-download', ok: dl.status() === 404 });

  for (const name of files) {
    await page.goto(base, { waitUntil: 'networkidle', timeout: 120_000 });
    const input = page.locator('input[type="file"]');
    await input.setInputFiles(join(process.cwd(), 'test-media', name));
    await page.getByRole('button', { name: /Convert to MP3/i }).click();
    await page.getByText('Download MP3', { exact: false }).waitFor({ timeout: 300_000 });
    const audio = page.locator('audio');
    results.push({ step: name, ok: (await audio.count()) > 0 });
  }
} catch (e) {
  results.push({ step: 'error', ok: false, message: String(e) });
} finally {
  await browser.close();
}

console.log(JSON.stringify(results, null, 2));
if (!results.every(r => r.ok)) process.exit(1);