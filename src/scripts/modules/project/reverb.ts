import { limitNumber } from 'core/number';
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

export const setReverbType = (reverb: Reverb, type: ReverbID): void => {
    reverb.type = type;
};

export const setReverbDepth = (reverb: Reverb, depth: number): void => {
    depth = limitNumber(depth, DEPTH.MIN, DEPTH.MAX);
    reverb.depth = depth;
};
