import React from 'react';
import { Button, Input, Modal, MdsProvider, useMdsRuntime, MomentMark } from '@themomentlab/design-system';
import { Lockup } from '@themomentlab/design-system/theme/components/brand/Lockup';
function Workspace() {
 const {colorScheme,setColorScheme,profile,setProfile}=useMdsRuntime();
 const [open,setOpen]=React.useState(false);
 return <main style={{maxWidth:'var(--ml-reading-max)',margin:'0 auto',padding:'var(--space-6)',display:'grid',gap:'var(--space-4)'}}><h1>실험 기록</h1><MomentMark decorative/><Lockup height={28}/>
 <Input label="실험 이름" defaultValue="센서 시간 동기화"/>
 <div style={{display:'flex',flexWrap:'wrap',gap:'var(--space-2)'}}><Button onClick={()=>setOpen(true)}>실행 조건 확인</Button>
 <Button onClick={()=>setColorScheme(colorScheme==='dark'?'light':'dark')}>테마 전환</Button>
 <Button onClick={()=>setProfile(profile==='ops'?'default':'ops')}>밀도 전환</Button></div>
 <output aria-label="테마">{colorScheme}</output>
 <Modal open={open} onOpenChange={setOpen} title="실행 조건"><Input label="로그 경로"/><Button onClick={()=>setOpen(false)}>확인 완료</Button></Modal>
 </main>;
}
export function App(){return <MdsProvider defaultColorScheme="light" locale="ko"><Workspace/></MdsProvider>}
