import { limitNumber } from 'core/number';

import { SAMPLE } from 'data/config';
import { FilterData } from 'modules/project/filter';

const { FILTER } = SAMPLE;

export const Filter = {
    setCutoff: (filter: FilterData, cutoff: number): void => {
        cutoff = limitNumber(cutoff, FILTER.CUTOFF.MIN, FILTER.CUTOFF.MAX);
        filter.cutoff = cutoff;
    },
    setResonance: (filter: FilterData, reso: number): void => {
        reso = limitNumber(reso, FILTER.RESONANCE.MIN, FILTER.RESONANCE.MAX);
        filter.resonance = reso;
    }
};
