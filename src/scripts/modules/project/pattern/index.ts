import { v1 as uuid } from 'uuid';

import { SEQUENCER } from 'data/config';
import { NoteData, NoteSnapshot, parseNotes, serializeNote } from 'modules/project/note';

export type BeatID = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface PatternData {
    readonly id: string;
    readonly notes: NoteData[];
    name: string;
    beats: BeatID;
    length: number;
}

export interface PatternSnapshot {
    readonly id: string;
    readonly notes: NoteSnapshot[];
    readonly name: string;
    readonly beats: BeatID;
    readonly length: number;
}

export const getDefaultPatternName = (): string => 'Pattern';

export const createPattern = (name = getDefaultPatternName()): PatternData => ({
    id: uuid(),
    beats: SEQUENCER.BEAT.DEFAULT as BeatID,
    length: 1,
    notes: [],
    name
});

const parsePattern = (data: any): PatternData => ({
    id: `${data.id}`,
    name: `${data.name}`,
    notes: parseNotes(data.notes),
    length: parseInt(data.length, 10),
    beats: parseInt(data.beats, 10) as BeatID
});

export const parsePatterns = (data: any): PatternData[] => {
    if (!data.length) {
        return [];
    }
    return data.map((ptn: any) => parsePattern(ptn));
};

export const serializePatterns = (patterns: PatternData[]): PatternSnapshot[] => {
    return patterns.map(ptn => ({
        ...ptn,
        notes: ptn.notes.map(note => serializeNote(note))
    }));
};

export const isPatternOverlap = (a: PatternData, b: PatternData, aStart: number, bStart: number): boolean => {
    const aEnd = aStart + a.length;
    const bEnd = bStart + b.length;
    return aStart < bEnd && aEnd > bStart;
};
