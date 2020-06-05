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
