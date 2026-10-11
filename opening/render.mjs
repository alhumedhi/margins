// Render the opening sequence to a 1920×1080 / 24fps MP4 with its synthesized score.
//
//   node opening/render.mjs                    -> opening/dist/margins-opening.mp4
//   node opening/render.mjs --stills 5,15,34   -> PNG stills at those seconds
//
// Needs: Playwright (Chromium) and ffmpeg on PATH. Fonts load from Google Fonts.
import { createRequire } from 'node:module';
import { spawn, execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const require = createRequire(import.meta.url);
let playwright;
try { playwright = require('playwright'); }
catch { playwright = require(join(execSync('npm root -g').toString().trim(), 'playwright')); }

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'dist');
mkdirSync(out, { recursive: true });
const args = process.argv.slice(2);
const stillsArg = args.includes('--stills') ? args[args.indexOf('--stills') + 1] : null;
const audioOnly = args.includes('--audio-only'); // re-score and remux onto an existing render

const launch = { args: ['--autoplay-policy=no-user-gesture-required'] };
if (process.env.CHROMIUM_PATH) launch.executablePath = process.env.CHROMIUM_PATH;
const browser = await playwright.chromium.launch(launch);
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('page error:', e.message));
await page.goto(pathToFileURL(join(here, 'index.html')).href + '?render=1');
await page.evaluate(() => window.MARGINS.ready);
const { DUR, FPS } = await page.evaluate(() => ({ DUR: window.MARGINS.DUR, FPS: window.MARGINS.FPS }));

const frame = t => page.evaluate(t => { window.MARGINS.renderFrame(t); return document.getElementById('c').toDataURL('image/png').split(',')[1]; }, t);

if (stillsArg) {
  for (const s of stillsArg.split(',').map(Number)) {
    writeFileSync(join(out, `still-${String(s).padStart(5, '0')}.png`), Buffer.from(await frame(s), 'base64'));
    console.log('still', s);
  }
  await browser.close();
  process.exit(0);
}

console.log('rendering score…');
const wav = join(out, 'score.wav');
writeFileSync(wav, Buffer.from(await page.evaluate(() => window.MARGINS.renderAudio()), 'base64'));

const mp4 = join(out, 'margins-opening.mp4');
if (audioOnly) {
  const tmp = join(out, 'remux.mp4');
  execSync(`ffmpeg -y -loglevel error -i "${mp4}" -i "${wav}" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart "${tmp}"`);
  execSync(`mv "${tmp}" "${mp4}"`);
  await browser.close();
  console.log(`remuxed ${mp4}`);
  process.exit(0);
}
const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error',
  '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-',
  '-i', wav,
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '24', '-pix_fmt', 'yuv420p',
  '-c:a', 'aac', '-b:a', '256k', '-shortest', '-movflags', '+faststart', mp4], { stdio: ['pipe', 'inherit', 'inherit'] });
const total = Math.round(DUR * FPS);
for (let i = 0; i < total; i++) {
  const buf = Buffer.from(await frame(i / FPS), 'base64');
  if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  if (i % FPS === 0) process.stdout.write(`\rframe ${i}/${total}`);
}
ff.stdin.end();
await new Promise(r => ff.on('close', r));
await browser.close();
console.log(`\nwrote ${mp4}`);
