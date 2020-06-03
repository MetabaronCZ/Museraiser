export interface SampleData {
    readonly buffer: AudioBuffer;
    name: string;
}

export interface SampleSnapshot {
    readonly name: string;
    readonly rate: number;
    readonly data: [number[], number[]];
}

export const createSample = (name: string, buffer: AudioBuffer): SampleData => ({
    name,
    buffer
});

export const parseSample = (sample: any): SampleData | null => {
    if (!sample) {
        return null;
    }
    const { name, rate, data } = sample;

    const buffer = new AudioBuffer({
        numberOfChannels: data.length,
        sampleRate: rate,
        length: data[0].length
    });

    const L = new Float32Array(data[0]);
    const R = new Float32Array(data[1]);
    buffer.copyToChannel(L, 0);
    buffer.copyToChannel(R, 1);

    return createSample(name, buffer);
};

export const serializeSample = (data: SampleData | null): SampleSnapshot | null => {
    if (!data) {
        return null;
    }
    const { name, buffer } = data;
    const L = new Float32Array(buffer.length);
    const R = new Float32Array(buffer.length);
    buffer.copyFromChannel(L, 0);
    buffer.copyFromChannel(R, 1);

    return {
        name,
        rate: buffer.sampleRate,
        data: [Array.from(L), Array.from(R)]
    };
};
