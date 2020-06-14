import { limitNumber } from 'core/number';
import { TRACK } from 'data/config';

import { VolumeData } from 'modules/project/volume';

const { VOLUME } = TRACK;

export const Volume = {
    setGain: (volume: VolumeData, gain: number) => {
        gain = limitNumber(gain, VOLUME.MIN, VOLUME.MAX);
        volume.gain = gain;
    }
};
