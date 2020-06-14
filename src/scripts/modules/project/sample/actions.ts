import { limitNumber } from 'core/number';
import { SAMPLE } from 'data/config';

import { FilterActions } from 'modules/project/filter/actions';
import { SampleData, FilterType } from 'modules/project/sample';

const { VOLUME } = SAMPLE;

export const SampleActions = {
    loop: (sample: SampleData, loop: boolean): void => {
        sample.loop = loop;
    },
    setVolume: (sample: SampleData, volume: number): void => {
        volume = limitNumber(volume, VOLUME.MIN, VOLUME.MAX);
        sample.volume.gain = volume;
    },
    setFilterCutoff: (sample: SampleData, type: FilterType, cutoff: number): void => {
        const filter = ('FILTER1' === type ? sample.filter1 : sample.filter2);
        FilterActions.setCutoff(filter, cutoff);
    },
    setFilterResonance: (sample: SampleData, type: FilterType, reso: number): void => {
        const filter = ('FILTER1' === type ? sample.filter1 : sample.filter2);
        FilterActions.setResonance(filter, reso);
    }
};
