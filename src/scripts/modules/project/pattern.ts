import {
    NoteData, NoteSnapshot, parseNotes, serializeNotes
} from 'modules/project/note';

export interface PatternData {
    readonly notes: NoteData[];
    name: string;
}

export interface PatternSnapshot {
    readonly notes: NoteSnapshot[];
    readonly name: string;
}

export const createPattern = (name: string): PatternData => ({
    notes: [], name
});

const parsePattern = (data: any): PatternData => ({
    name: `${data.name}`,
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
