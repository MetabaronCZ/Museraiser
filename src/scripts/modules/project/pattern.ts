import {
    NoteData, NoteSnapshot, parseNotes, serializeNotes
} from 'modules/project/note';

export interface PatternData {
    readonly notes: NoteData[];
    name: string;
    start: number;
    length: number;
}

export interface PatternSnapshot {
    readonly notes: NoteSnapshot[];
    readonly name: string;
    readonly start: number;
    readonly length: number;
}

export const createPattern = (name: string, start: number, length: number): PatternData => ({
    notes: [], name, start, length
});

const parsePattern = (data: any): PatternData => ({
    name: `${data.name}`,
    start: parseInt(data.start, 10),
    length: parseInt(data.length, 10),
    notes: parseNotes(data.notes)
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
