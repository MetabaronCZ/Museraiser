import { fromBuffer, toBase64 } from 'core/buffer';
import { readBuffer } from 'modules/file';

export interface SampleData {
    buffer: string;
    name: string;
    loop: boolean;
}

export interface SampleSnapshot {
    readonly buffer: string;
    readonly name: string;
    readonly loop: boolean;
}

export const createSample = (name: string, buffer: string, loop = false): SampleData => ({
    buffer,
    name,
    loop
});

export const parseSample = (sample: any): SampleData | null => {
    if (!sample) {
        return null;
    }
    return {
        buffer: `${sample.buffer}`,
        name: `${sample.name}`,
        loop: !!sample.loop
    };
};

export const serializeSample = (data: SampleData | null): SampleSnapshot | null => {
    if (!data) {
        return null;
    }
    return { ...data };
};

export const readSample = (path: string): string => {
    const buffer = readBuffer(path);
    const arrayBuffer = fromBuffer(buffer);
    return toBase64(arrayBuffer);
};

export const setSampleLoop = (sample: SampleData, loop: boolean): void => {
    sample.loop = loop;
};
