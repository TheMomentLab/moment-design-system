import React from 'react';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';
import {MdsColorSchemeScript} from '@themomentlab/design-system';
import {App} from './App';
export const body=renderToString(<App/>);
export const themeScript=renderToStaticMarkup(<MdsColorSchemeScript/>);
