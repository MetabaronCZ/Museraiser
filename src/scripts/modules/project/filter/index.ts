import { SAMPLE } from 'data/config';

const { FILTER } = SAMPLE;

export interface FilterData {
    cutoff: number;
    resonance: number;
}

export interface FilterSnapshot {
    readonly cutoff: number;
    readonly resonance: number;
}

export const createFilter = (): FilterData => ({
    cutoff: FILTER.CUTOFF.DEFAULT,
    resonance: FILTER.RESONANCE.DEFAULT
});

export const parseFilter = (data: any): FilterData => ({
    cutoff: parseInt(data.cutoff, 10),
    resonance: parseInt(data.resonance, 10)
});

export const serializeFilter = (filter: FilterData): FilterSnapshot => ({
    ...filter
});
