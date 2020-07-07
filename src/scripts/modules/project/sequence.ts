import { v1 as uuid } from 'uuid';
import { TrackData } from 'modules/project/tracks/track';

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

export const getSequence = (track: TrackData, bar: number): SequenceData | null => {
    const { patterns, sequences } = track;

    for (const seq of sequences) {
        const ptn = patterns.find(p => seq.pattern === p.id);

        if (!ptn) {
            throw new Error(`Invalid sequence: ${seq.id}`);
        }
        const seqStart = seq.start;
        const seqEnd = seqStart + ptn.length - 1;

        if (seqStart <= bar && seqEnd >= bar) {
            return seq;
        }
    }
    return null;
};

export const canInsertSequence = (track: TrackData, patternID: string, bar: number): boolean => {
    const pattern = track.patterns.find(ptn => patternID === ptn.id);

    if (!pattern) {
        return false;
    }
    const start = bar;
    const end = start + pattern.length - 1;

    for (let i = start; i <= end; i++) {
        const seq = getSequence(track, i);

        if (seq) {
            return false;
        }
    }
    return true;
};
