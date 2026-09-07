import React from 'react';
import { LdsProvider, LdsColorSchemeScript, useLdsRuntime, createLocalStorageManager } from '../../theme/src/components/selection/LdsProvider.jsx';
function RestoreStoredTheme({manager,enabled,fallback}) {
 const {setColorScheme}=useLdsRuntime();
 const restore=React.useRef(setColorScheme);restore.current=setColorScheme;
 React.useEffect(()=>{
  if(enabled) restore.current(manager.get(fallback));
 },[manager,enabled,fallback]);
 return null;
}
// Share the inherited context, but keep first render identical on server and client.
export function MdsProvider({storageKey='mds-theme',storageManager,persist=true,colorScheme,defaultColorScheme='light',children,...props}) {
 const manager=React.useMemo(()=>storageManager??createLocalStorageManager({key:storageKey}),[storageKey,storageManager]);
 const initialSafeManager=React.useMemo(()=>({...manager,get:fallback=>fallback}),[manager]);
 return <LdsProvider {...props} storageKey={storageKey} storageManager={initialSafeManager} persist={persist} colorScheme={colorScheme} defaultColorScheme={defaultColorScheme}>
  <RestoreStoredTheme manager={manager} enabled={persist&&colorScheme===undefined} fallback={defaultColorScheme}/>{children}
 </LdsProvider>;
}
export function MdsColorSchemeScript({storageKey='mds-theme',...props}) {
 return <LdsColorSchemeScript storageKey={storageKey} {...props}/>;
}
export const useMdsRuntime=useLdsRuntime;
