import { Filter } from 'modules/project/filter/actions';
import { Volume } from 'modules/project/volume/actions';
import { SampleData, FilterType } from 'modules/project/sample';

export const Sample = {
    loop: (sample: SampleData, loop: boolean): void => {
        sample.loop = loop;
    },
    setVolume: (sample: SampleData, gain: number): void => {
        Volume.setGain(sample.volume, gain);
    },
    setFilterCutoff: (sample: SampleData, type: FilterType, cutoff: number): void => {
        const filter = ('FILTER1' === type ? sample.filter1 : sample.filter2);
        Filter.setCutoff(filter, cutoff);
    },
    setFilterResonance: (sample: SampleData, type: FilterType, reso: number): void => {
        const filter = ('FILTER1' === type ? sample.filter1 : sample.filter2);
        Filter.setResonance(filter, reso);
    }
};
