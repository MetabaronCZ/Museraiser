import { VOLUME } from 'data/config';

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
