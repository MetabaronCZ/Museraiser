import { MASTER } from 'data/config';

export const reverbs = ['ROOM', 'HALL'] as const;
export type ReverbID = typeof reverbs[number];

export interface Reverb {
    type: ReverbID;
}

export interface ReverbSnapshot {
    readonly type: ReverbID;
}

export const createReverb = (): Reverb => ({
    type: MASTER.REVERB.TYPE.DEFAULT
});

export const parseReverb = (data: any): Reverb => ({
    type: `${data.type}` as ReverbID
});

export const serializeReverb = (reverb: Reverb): ReverbSnapshot => ({
    ...reverb
});

export const setReverbType = (reverb: Reverb, type: ReverbID): void => {
    reverb.type = type;
};
