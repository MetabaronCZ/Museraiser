import { MASTER } from 'data/config';

const { TYPE, DEPTH } = MASTER.REVERB;

export const reverbs = ['ROOM', 'HALL'] as const;
export type ReverbID = typeof reverbs[number];

export interface ReverbData {
    type: ReverbID;
    depth: number;
}

export interface ReverbSnapshot {
    readonly type: ReverbID;
    readonly depth: number;
}

export const createReverb = (): ReverbData => ({
    type: TYPE.DEFAULT,
    depth: DEPTH.DEFAULT
});

export const parseReverb = (data: any): ReverbData => ({
    type: `${data.type}` as ReverbID,
    depth: parseInt(data.depth, 10)
});

export const serializeReverb = (reverb: ReverbData): ReverbSnapshot => ({
    ...reverb
});
