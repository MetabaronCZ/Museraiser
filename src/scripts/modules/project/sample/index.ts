import { fromBuffer, toBase64 } from 'core/buffer';
import { SAMPLE } from 'data/config';

import { readBuffer } from 'modules/file';

import {
    VolumeData, createVolume, parseVolume, serializeVolume
} from 'modules/project/volume';

import {
    FilterData, FilterSnapshot, createFilter, parseFilter, serializeFilter
} from 'modules/project/filter';

import {
    EnvelopeData, EnvelopeSnapshot, createEnvelope, parseEnvelope, serializeEnvelope
} from 'modules/project/envelope';

const { VOLUME } = SAMPLE;

export type FilterType = 'FILTER1' | 'FILTER2';

export interface SampleData {
    readonly volume: VolumeData;
    readonly filter1: FilterData;
    readonly filter2: FilterData;
    readonly volumeEnvelope: EnvelopeData;
    buffer: string;
    name: string;
    loop: boolean;
}

export interface SampleSnapshot {
    readonly name: string;
    readonly loop: boolean;
    readonly buffer: string;
    readonly volume: VolumeData;
    readonly filter1: FilterSnapshot;
    readonly filter2: FilterSnapshot;
    readonly volumeEnvelope: EnvelopeSnapshot;
}

export const createSample = (name: string, buffer: string, loop = false): SampleData => ({
    buffer,
    name,
    loop,
    filter1: createFilter(),
    filter2: createFilter(),
    volume: createVolume(VOLUME.DEFAULT),
    volumeEnvelope: createEnvelope()
});

export const parseSample = (sample: any): SampleData | null => {
    if (!sample) {
        return null;
    }
    return {
        buffer: `${sample.buffer}`,
        name: `${sample.name}`,
        loop: !!sample.loop,
        volume: parseVolume(sample.volume),
        filter1: parseFilter(sample.filter1),
        filter2: parseFilter(sample.filter2),
        volumeEnvelope: parseEnvelope(sample.volumeEnvelope)
    };
};

export const serializeSample = (data: SampleData | null): SampleSnapshot | null => {
    if (!data) {
        return null;
    }
    return {
        ...data,
        volume: serializeVolume(data.volume),
        filter1: serializeFilter(data.filter1),
        filter2: serializeFilter(data.filter2),
        volumeEnvelope: serializeEnvelope(data.volumeEnvelope)
    };
};

export const readSample = (path: string): string => {
    const buffer = readBuffer(path);
    const arrayBuffer = fromBuffer(buffer);
    return toBase64(arrayBuffer);
};
