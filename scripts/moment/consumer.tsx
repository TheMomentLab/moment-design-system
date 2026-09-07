import React from 'react';
import { Button, Input, SourceTag, EditorialCard, MomentMark, Lockup, Tag } from '../../packages/moment/dist/index.js';
export const Consumer = () => <><Button loading="inline">저장 중</Button><Button as="a" href="https://example.com">원문</Button><Input label="주소"/><SourceTag href="https://example.com">출처</SourceTag><EditorialCard title="제목" summary="요약" source={{name:'출처'}}/><MomentMark decorative/><Lockup/><Tag>태그</Tag></>;
// @ts-expect-error Only supported editorial treatments are accepted.
const invalid = <EditorialCard title="제목" summary="요약" source={{name:'출처'}} variant="unknown"/>;
