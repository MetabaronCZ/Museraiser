import { VOLUME } from 'data/config';

export const sanitizeVolume = (volume: number): number => {
    volume = Math.floor(volume);
    volume = Math.max(VOLUME.MIN, volume);
    volume = Math.min(VOLUME.MAX, volume);
    return volume;
};
