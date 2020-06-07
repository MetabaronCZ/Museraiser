export interface SequenceData {
    readonly pattern: number;
    start: number;
    length: number;
}

export interface SequenceSnapshot {
    readonly pattern: number;
    readonly start: number;
    readonly length: number;
}

export const createSequence = (pattern: number, start: number, length: number): SequenceData => ({
    pattern, start, length
});

const parseSequence = (data: any): SequenceData => ({
    pattern: parseInt(data.pattern, 10),
    start: parseInt(data.start, 10),
    length: parseInt(data.length, 10)
});

export const parseSequences = (data: any): SequenceData[] => {
    if (!data.length) {
        return [];
    }
    return data.map((seq: any) => parseSequence(seq));
};

export const serializeSequences = (sequences: SequenceData[]): SequenceSnapshot[] => {
    return sequences.map(seq => ({
        ...seq
    }));
};
