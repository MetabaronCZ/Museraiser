import { limitNumber } from 'core/number';
import { MASTER } from 'data/config';

import {
    Volume, VolumeSnapshot, createVolume, parseVolume, serializeVolume, createGainNode
} from 'modules/project/volume';

import {
    Delay, DelaySnapshot, createDelay, parseDelay, serializeDelay
} from 'modules/project/delay';

import {
    Reverb, ReverbSnapshot, createReverb, parseReverb, serializeReverb
} from 'modules/project/reverb';

const { VOLUME } = MASTER;

export interface MasterData {
    readonly delay: Delay;
    readonly reverb: Reverb;
    readonly volume: Volume;
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

export const editMasterVolume = (master: MasterData, volume: number): void => {
    volume = limitNumber(volume, VOLUME.MIN, VOLUME.MAX);
    master.volume.gain = volume;
};

export const createMasterNode = (ctx: AudioContext, data: MasterData): GainNode => {
    const gain = createGainNode(ctx, data.volume);
    const compressor = ctx.createDynamicsCompressor();

    gain.connect(compressor);
    compressor.connect(ctx.destination);

    return gain;
};
