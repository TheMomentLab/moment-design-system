// The Moment primary fill has theme-specific foreground contrast.
export function momentRuntime(source, file) {
 if (!file.replaceAll('\\', '/').endsWith('/components/data/AnnotatedImage.jsx')) return source;
 const anchor="function toneLabelColor(tone) {";
 if(!source.includes(anchor)) throw new Error('AnnotatedImage tone contract changed');
 return source.replace(anchor, anchor+"\n  if (tone === 'signal') return 'var(--ml-annotation-signal-fg)';");
}
