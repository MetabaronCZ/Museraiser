import { v1 as uuid } from 'uuid';
import {
    NoteData, NoteSnapshot, parseNotes, serializeNotes
} from 'modules/project/note';

export interface PatternData {
    readonly id: string;
    readonly length: number;
    readonly notes: NoteData[];
    name: string;
}

export interface PatternSnapshot {
    readonly id: string;
    readonly length: number;
    readonly notes: NoteSnapshot[];
    readonly name: string;
}

export const getDefaultPatternName = (): string => 'Pattern';

export const createPattern = (name = getDefaultPatternName()): PatternData => ({
    id: uuid(),
    length: 1,
    notes: [],
    name
});

const parsePattern = (data: any): PatternData => ({
    id: `${data.id}`,
    name: `${data.name}`,
    notes: parseNotes(data.notes),
    length: parseInt(data.length, 10)
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
        notes: serializeNotes(ptn.notes)
    }));
};

export const isPatternOverlap = (a: PatternData, b: PatternData, aStart: number, bStart: number): boolean => {
    const aEnd = aStart + a.length;
    const bEnd = bStart + b.length;
    return aStart < bEnd && aEnd > bStart;
};
