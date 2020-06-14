import { fromBuffer, toBase64 } from 'core/buffer';

import { SAMPLE } from 'data/config';

import { readBuffer } from 'modules/file';
import { Volume, createVolume, parseVolume, serializeVolume } from 'modules/project/volume';
import {
    FilterData, FilterSnapshot, createFilterData, parseFilter, serializeFilter
} from 'modules/project/filter';

const { VOLUME } = SAMPLE;

export type FilterType = 'FILTER1' | 'FILTER2';

export interface SampleData {
    readonly volume: Volume;
    readonly filter1: FilterData;
    readonly filter2: FilterData;
    buffer: string;
    name: string;
    loop: boolean;
}

export interface SampleSnapshot {
    readonly name: string;
    readonly loop: boolean;
    readonly buffer: string;
    readonly volume: Volume;
    readonly filter1: FilterSnapshot;
    readonly filter2: FilterSnapshot;
}

export const createSample = (name: string, buffer: string, loop = false): SampleData => ({
    buffer,
    name,
    loop,
    volume: createVolume(VOLUME.DEFAULT),
    filter1: createFilterData(),
    filter2: createFilterData()
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
        filter2: parseFilter(sample.filter2)
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
        filter2: serializeFilter(data.filter2)
    };
};

export const readSample = (path: string): string => {
    const buffer = readBuffer(path);
    const arrayBuffer = fromBuffer(buffer);
    return toBase64(arrayBuffer);
};
