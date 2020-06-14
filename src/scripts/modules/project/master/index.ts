import { MASTER } from 'data/config';

import {
    VolumeData, VolumeSnapshot, createVolume, parseVolume, serializeVolume
} from 'modules/project/volume';

import {
    DelayData, DelaySnapshot, createDelay, parseDelay, serializeDelay
} from 'modules/project/delay';

import {
    ReverbData, ReverbSnapshot, createReverb, parseReverb, serializeReverb
} from 'modules/project/reverb';

const { VOLUME } = MASTER;

export interface MasterData {
    readonly delay: DelayData;
    readonly reverb: ReverbData;
    readonly volume: VolumeData;
}

export interface MasterSnapshot {
    readonly delay: DelaySnapshot;
    readonly reverb: ReverbSnapshot;
    readonly volume: VolumeSnapshot;
}

export const createMasterData = (): MasterData => ({
    volume: createVolume(VOLUME.DEFAULT),
    delay: createDelay(),
    reverb: createReverb()
});

export const parseMasterData = (data: any): MasterData => ({
    volume: parseVolume(data.volume),
    delay: parseDelay(data.delay),
    reverb: parseReverb(data.reverb)
});

export const serializeMasterData = (master: MasterData): MasterSnapshot => ({
    volume: serializeVolume(master.volume),
    delay: serializeDelay(master.delay),
    reverb: serializeReverb(master.reverb)
});
