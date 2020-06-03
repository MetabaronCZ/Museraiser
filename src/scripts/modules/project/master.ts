import { VOLUME } from 'data/config';
import { sanitizeVolume } from 'modules/project/volume';

export interface MasterData {
    volume: number;
}

export interface MasterSnapshot {
    readonly volume: number;
}

export const createMasterData = (): MasterData => ({
    volume: VOLUME.DEFAULT
});

export const parseMasterData = (data: any): MasterData => ({
    volume: parseInt(data.volume, 10)
});

export const serializeMasterData = (master: MasterData): MasterSnapshot => ({
    ...master
});

export const editMasterVolume = (master: MasterData, volume: number): void => {
    const value = sanitizeVolume(volume);
    master.volume = value;
};
