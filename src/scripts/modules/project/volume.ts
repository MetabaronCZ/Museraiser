import { limitNumber } from 'core/number';

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;

export interface Volume {
    gain: number;
}

export interface VolumeSnapshot {
    readonly gain: number;
}

export const createVolume = (gain: number): Volume => ({
    gain
});

export const parseVolume = (data: any): Volume => ({
    gain: parseInt(data.gain, 10)
});

export const serializeVolume = (volume: Volume): VolumeSnapshot => ({
    ...volume
});

export const createGainNode = (ctx: AudioContext, data: Volume): GainNode => {
    const now = ctx.currentTime;
    const gain = ctx.createGain();

    const volume = limitNumber(data.gain / 100, VOLUME_MIN, VOLUME_MAX, true);
    gain.gain.setValueAtTime(volume, now);

    return gain;
};
