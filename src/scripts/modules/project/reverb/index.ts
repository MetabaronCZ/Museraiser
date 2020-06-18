import { MASTER } from 'data/config';

const { DEPTH, DAMPENING } = MASTER.REVERB;

export interface ReverbData {
    depth: number;
    dampening: number;
}

export interface ReverbSnapshot {
    readonly depth: number;
    readonly dampening: number;
}

export const createReverb = (): ReverbData => ({
    depth: DEPTH.DEFAULT,
    dampening: DAMPENING.DEFAULT
});

export const parseReverb = (data: any): ReverbData => ({
    depth: parseInt(data.depth, 10),
    dampening: parseInt(data.dampening, 10)
});

export const serializeReverb = (reverb: ReverbData): ReverbSnapshot => ({
    ...reverb
});
