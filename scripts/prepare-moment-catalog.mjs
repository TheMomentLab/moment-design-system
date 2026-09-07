import { cp, mkdir, rm, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const root = path.resolve(import.meta.dirname, '..');
const source = path.join(root, 'stories');
const target = path.join(root, '.mds-catalog');
await rm(target, { recursive: true, force: true });
await mkdir(target, { recursive: true });
await cp(source, target, { recursive: true });
const files = [];
const baseline = JSON.parse(await readFile(path.join(root, 'docs/moment/lds-baseline.json'), 'utf8'));
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (/\.(jsx?|mjs|json)$/.test(file)) {
      const original = await readFile(file, 'utf8');
      const relative = path.relative(target, file).replaceAll('\\', '/');
      let text = original;
      // Keep LDS's exact story IDs/bookmarks/play functions while exposing MDS groups.
      if (/\.stories\.[^.]+$/.test(file)) {
        text = text.replace(/title:\s*(['"])(LDS(?: Core| Theme| Product)?\/[^'"]+)\1/, (_, quote, title) => {
          const id = baseline.stories.find(entry => entry.importPath === './stories/' + relative)?.id.split('--')[0] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const explicit = new RegExp(`\\bid:\\s*['\"]${id}['\"]`).test(original);
          return `${explicit ? '' : `id: '${id}', `}title: ${quote}${title.replace(/^LDS/, 'MDS')}${quote}`;
        });
        // The fork loads self-hosted fonts. Measure only after the rendered fonts
        // and layout settle; run every original play assertion unchanged.
        for (const [, name] of original.matchAll(/export const (\w+)\s*=/g)) {
          text += `\nif (typeof ${name}.play === 'function') { const originalPlay = ${name}.play; ${name}.play = async (context) => { await context.canvasElement.ownerDocument.fonts.ready; await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))); return originalPlay(context); }; }\n`;
        }
        if (relative === 'ActionSplitButton.stories.jsx') {
          const step = '    edgeTrigger.focus();';
          if (!text.includes(step)) throw new Error('Upstream SplitButton focus step changed');
          // Escape schedules focus restoration for the next frame. Let that
          // restoration finish before the test intentionally moves elsewhere.
          text = text.replace(step, '    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));\n' + step);
        }
        files.push({ source: 'stories/' + relative, generated: '.mds-catalog/' + relative, sha256: createHash('sha256').update(original).digest('hex') });
      }
      await writeFile(file, text);
    }
  }
}
await walk(target);
await writeFile(path.join(root, 'docs/moment/catalog-inventory.json'), JSON.stringify({ source: 'LDS 0.2.2', scope: 'every upstream Storybook file, no story/variant filters', files }, null, 2) + '\n');
console.log(`Moment catalog: all ${files.length} upstream story files retained, plus Moment brand specimens.`);
