import { MASTER } from 'data/config';

const { TYPE, DEPTH } = MASTER.REVERB;

export const reverbs = ['ROOM', 'HALL'] as const;
export type ReverbID = typeof reverbs[number];

export interface Reverb {
    type: ReverbID;
    depth: number;
}

export interface ReverbSnapshot {
    readonly type: ReverbID;
    readonly depth: number;
}

export const createReverb = (): Reverb => ({
    type: TYPE.DEFAULT,
    depth: DEPTH.DEFAULT
});

export const parseReverb = (data: any): Reverb => ({
    type: `${data.type}` as ReverbID,
    depth: parseInt(data.depth, 10)
});

export const serializeReverb = (reverb: Reverb): ReverbSnapshot => ({
    ...reverb
});
