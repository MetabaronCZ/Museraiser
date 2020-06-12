import { limitNumber } from 'core/number';
import { PROJECT, SAMPLE } from 'data/config';

const { FILTER } = SAMPLE;

const CUTOFF_MIN = 0;
const CUTOFF_MAX = PROJECT.SAMPLE.RATE / 2;
const RESONANCE_MIN = 1;
const RESONANCE_MAX = 100;

export interface FilterData {
    cutoff: number;
    resonance: number;
}

export interface FilterSnapshot {
    readonly cutoff: number;
    readonly resonance: number;
}

export const createFilterData = (): FilterData => ({
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

export const setFilterCutoff = (filter: FilterData, cutoff: number): void => {
    cutoff = limitNumber(cutoff, FILTER.CUTOFF.MIN, FILTER.CUTOFF.MAX);
    filter.cutoff = cutoff;
};

export const setFilterResonance = (filter: FilterData, reso: number): void => {
    reso = limitNumber(reso, FILTER.RESONANCE.MIN, FILTER.RESONANCE.MAX);
    filter.resonance = reso;
};

export const createFilterNode = (ctx: AudioContext, type: BiquadFilterType, data: FilterData): BiquadFilterNode => {
    const now = ctx.currentTime;

    const filter = ctx.createBiquadFilter();
    filter.type = type;

    let freq = data.cutoff * (CUTOFF_MAX - CUTOFF_MIN) / 100;

    if ('lowpass' === type) {
        freq = CUTOFF_MAX - freq;
    } else {
        freq += CUTOFF_MIN;
    }
    freq = limitNumber(freq, CUTOFF_MIN, CUTOFF_MAX, true);
    filter.frequency.setValueAtTime(freq, now);

    let reso = data.resonance * (RESONANCE_MAX - RESONANCE_MIN) / 100;
    reso += RESONANCE_MIN;
    reso = limitNumber(reso, RESONANCE_MIN, RESONANCE_MAX, true);
    filter.Q.setValueAtTime(reso, now);

    return filter;
};
