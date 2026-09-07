import React from 'react';
import { Button, Input, MomentSourceTag, EditorialCard, MomentMark, MomentLockup, Tag } from '../../packages/moment/dist/index.js';
export const Consumer = () => <><Button loading="inline">저장 중</Button><Button as="a" href="https://example.com">원문</Button><Input label="주소"/><MomentSourceTag href="https://example.com">출처</MomentSourceTag><EditorialCard title="제목" summary="요약" source={{name:'출처'}}/><MomentMark decorative/><MomentLockup/><Tag>태그</Tag></>;
// @ts-expect-error Only supported editorial treatments are accepted.
const invalid = <EditorialCard title="제목" summary="요약" source={{name:'출처'}} variant="unknown"/>;

import { MdsProvider, LdsProvider, DataGrid, Map2DCanvas, TelemetryValue } from '../../packages/moment/dist/index.js';
import { Button as CoreButton } from '../../packages/moment/dist/core/index.js';
import { useLdsRuntime } from '../../packages/moment/dist/theme/index.js';
import { DashboardShell } from '../../packages/moment/dist/product/index.js';
export const ResearchConsumer = () => <MdsProvider defaultColorScheme="auto" profile="ops" direction="rtl" locale="ko"><CoreButton>실험</CoreButton></MdsProvider>;
export const inheritedApi = { LdsProvider, DataGrid, Map2DCanvas, TelemetryValue, useLdsRuntime, DashboardShell };
