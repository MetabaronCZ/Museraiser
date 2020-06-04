export interface NoteData {
    start: number;
    length: number;
    pitch: number;
    velocity: number;
}

export interface NoteSnapshot {
    readonly start: number;
    readonly length: number;
    readonly pitch: number;
    readonly velocity: number;
}

const parseNote = (data: any): NoteData => ({
    start: parseInt(data.start, 10),
    length: parseInt(data.length, 10),
    pitch: parseInt(data.pitch, 10),
    velocity: parseInt(data.velocity, 10)
});

export const parseNotes = (data: any): NoteData[] => {
    return data.map((note: any) => parseNote(note));
};

const serializeNote = (note: NoteData): NoteSnapshot => ({
    ...note
});

export const serializeNotes = (notes: NoteData[]): NoteSnapshot[] => {
    return notes.map(note => serializeNote(note));
};
