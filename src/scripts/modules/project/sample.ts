export interface SampleData {
    readonly buffer: AudioBuffer;
    name: string;
}

export const createSample = (name: string, buffer: AudioBuffer): SampleData => ({
    name,
    buffer
});

export const createSampleFrom = (data: any): SampleData | null => {
    if (!data) {
        return null;
    }
    return {
        name: `${data.name}`,
        buffer: data.buffer
    };
};
