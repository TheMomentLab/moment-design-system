import { preparePublicDocs } from './moment/prepare-public-docs.mjs';
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
      let text = original.replaceAll("'../src/index.js'", "'../packages/moment/src/index.jsx'");
      if (relative === 'Brand.stories.jsx' || relative === 'BrandProductLockup.stories.jsx') {
        const name = relative === 'Brand.stories.jsx' ? 'Brand' : 'ProductBrand';
        text = await readFile(path.join(root, `packages/moment/stories/overrides/${name}.catalog.jsx`), 'utf8');
      }
      if (relative === 'DesignSystemDirectory.shared.jsx') {
        const start=text.indexOf('export const designSystems = [');
        const end=text.indexOf('];',start)+2;
        const systems=[
          {name:'MDS Core',status:'Available',scope:'공통 토큰, 컴포넌트, 패턴',href:'/?path=/docs/lds-core-foundation-design-token--docs',linkLabel:'MDS Core 열기'},
          {name:'MDS Theme',status:'Available',scope:'Moment Lab 브랜드, 테마와 표현 프로필',href:'/?path=/story/mds-foundation-identity--identity',linkLabel:'MDS Theme 열기'},
          {name:'MDS Product',status:'Available',scope:'연구 도구, 데이터·운영 UI, 뷰어와 편집 컴포넌트',href:'/?path=/docs/lds-product-data-collections-data-grid--docs',linkLabel:'MDS Product 열기'},
          {name:'MDS Conformance',status:'Available',scope:'토큰 소유권과 소비 앱 규격 검사',href:'https://github.com/TheMomentLab/moment-design-system/tree/main/packages/conformance',linkLabel:'검증 도구 보기',external:true},
        ];
        text=text.slice(0,start)+'export const designSystems = '+JSON.stringify(systems,null,2)+';'+text.slice(end);
        text=text.replace('공통 토큰과 범용 UI는 Core에서 시작하고, 로봇·3D·편집·발표처럼 별도 도메인 계약이 필요한 기능은 해당 제품군 문서에서 확인합니다.','공통 토큰과 범용 UI는 Core, 모먼트랩의 브랜드는 Theme, 연구·개발 도구의 확장 컴포넌트는 Product에서 확인합니다.');
        text=text.replace('공개된 LDS 제품군과 준비 중인 다음 제품군을 한곳에서 확인합니다.','1인 로봇 소프트웨어 연구소 Moment Lab의 디자인 시스템을 구성하는 네 계층입니다.');
      }
      if(relative === 'DesignSystemDirectory.stories.jsx') {
        text=text.replace('LDS Core, LDS Robotics, 그리고 이후 공개될 LDS 제품군으로 이동하는 공통 시작 화면입니다.','MDS Core, Theme, Product와 검증 도구로 이동하는 시작 화면입니다.').replace('각 제품군은 독립된 카탈로그를 유지하며, 이 표에서 한곳으로 모입니다.','브랜드·기본 UI·연구 도구의 문서를 같은 카탈로그에서 찾습니다.');
      }
      // Keep LDS's exact story IDs/bookmarks/play functions while exposing MDS groups.
      if (/\.stories\.[^.]+$/.test(file)) {
        text = text.replace(/title:\s*(['"])(LDS(?: Core| Theme| Product)?\/[^'"]+)\1/, (_, quote, title) => {
          const id = baseline.stories.find(entry => entry.importPath === './stories/' + relative)?.id.split('--')[0] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const explicit = new RegExp(`\\bid:\\s*['\"]${id}['\"]`).test(original);
          return `${explicit ? '' : `id: '${id}', `}title: ${quote}${title.replace(/^LDS/, 'MDS')}${quote}`;
        });
        // The fork loads self-hosted fonts. Measure only after the rendered fonts
        // and layout settle; run every original play assertion unchanged.
        for (const [, name] of text.matchAll(/export const (\w+)\s*=/g)) {
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

await preparePublicDocs();
