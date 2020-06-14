import { VolumeActions } from 'modules/project/volume/actions';
import { FilterActions } from 'modules/project/filter/actions';
import { SampleData, FilterType } from 'modules/project/sample';

export const SampleActions = {
    loop: (sample: SampleData, loop: boolean): void => {
        sample.loop = loop;
    },
    setVolume: (sample: SampleData, gain: number): void => {
        VolumeActions.setGain(sample.volume, gain);
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
