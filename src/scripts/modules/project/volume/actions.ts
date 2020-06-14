import { limitNumber } from 'core/number';
import { TRACK } from 'data/config';

import { Volume } from 'modules/project/volume';

const { VOLUME } = TRACK;

export const VolumeActions = {
    setGain: (volume: Volume, gain: number) => {
        gain = limitNumber(gain, VOLUME.MIN, VOLUME.MAX);
        volume.gain = gain;
    }
};
