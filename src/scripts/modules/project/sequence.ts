import { v1 as uuid } from 'uuid';

export interface SequenceData {
    readonly id: string;
    readonly pattern: string;
    start: number;
}

export interface SequenceSnapshot {
    readonly id: string;
    readonly pattern: string;
    readonly start: number;
}

export const createSequence = (pattern: string, start: number): SequenceData => ({
    id: uuid(),
    pattern,
    start
});

const parseSequence = (data: any): SequenceData => ({
    id: `${data.id}`,
    pattern: `${data.pattern}`,
    start: parseInt(data.start, 10)
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
