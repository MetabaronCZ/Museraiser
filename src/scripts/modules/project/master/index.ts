import { MASTER } from 'data/config';

import {
    VolumeData, VolumeSnapshot, createVolume, parseVolume, serializeVolume
} from 'modules/project/volume';

import {
    ReverbData, ReverbSnapshot, createReverb, parseReverb, serializeReverb
} from 'modules/project/reverb';

const { VOLUME } = MASTER;

export interface MasterData {
    readonly reverb: ReverbData;
    readonly volume: VolumeData;
}

export interface MasterSnapshot {
    readonly reverb: ReverbSnapshot;
    readonly volume: VolumeSnapshot;
}

export const createMasterData = (): MasterData => ({
    volume: createVolume(VOLUME.DEFAULT),
    reverb: createReverb()
});

export const parseMasterData = (data: any): MasterData => ({
    volume: parseVolume(data.volume),
    reverb: parseReverb(data.reverb)
});

export const serializeMasterData = (master: MasterData): MasterSnapshot => ({
    volume: serializeVolume(master.volume),
    reverb: serializeReverb(master.reverb)
});
