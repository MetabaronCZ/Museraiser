export interface VolumeData {
    gain: number;
}

export interface VolumeSnapshot {
    readonly gain: number;
}

export const createVolume = (gain: number): VolumeData => ({
    gain
});

export const parseVolume = (data: any): VolumeData => ({
    gain: parseInt(data.gain, 10)
});

export const serializeVolume = (volume: VolumeData): VolumeSnapshot => ({
    ...volume
});
