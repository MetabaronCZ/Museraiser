import { limitNumber } from 'core/number';
import { PROJECT } from 'data/config';

import { FilterData } from 'modules/project/filter';

const CUTOFF_MIN = 0;
const CUTOFF_MAX = PROJECT.SAMPLE.RATE / 2;
const RESONANCE_MIN = 1;
const RESONANCE_MAX = 100;

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
