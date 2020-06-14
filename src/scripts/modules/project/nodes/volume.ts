import { limitNumber } from 'core/number';
import { VolumeData } from 'modules/project/volume';

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;

export const createGainNode = (ctx: AudioContext, data: VolumeData): GainNode => {
    const now = ctx.currentTime;
    const gain = ctx.createGain();

    const volume = limitNumber(data.gain / 100, VOLUME_MIN, VOLUME_MAX, true);
    gain.gain.setValueAtTime(volume, now);

    return gain;
};
