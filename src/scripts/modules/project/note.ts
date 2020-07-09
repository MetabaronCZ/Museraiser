import { noteNames, sharpNotes } from 'data/notes';

export type NoteLength = 1 | 2 | 4 | 8 | 16;

export interface NoteData {
    start: number;
    length: NoteLength;
    pitch: number;
    velocity: number;
}

export interface NoteSnapshot {
    readonly start: number;
    readonly length: NoteLength;
    readonly pitch: number;
    readonly velocity: number;
}

const parseNote = (data: any): NoteData => ({
    start: parseInt(data.start, 10),
    length: parseInt(data.length, 10) as NoteLength,
    pitch: parseInt(data.pitch, 10),
    velocity: parseInt(data.velocity, 10)
});

export const parseNotes = (data: any): NoteData[] => {
    return data.map((note: any) => parseNote(note));
};

export const serializeNote = (note: NoteData): NoteSnapshot => ({
    ...note
});

export const getNoteName = (pitch: number): string => {
    const octave = -1 + Math.floor(pitch / 12);
    const index = pitch % 12;
    const note = noteNames[index] || '?';
    const isSharp = sharpNotes.includes(index);

    return `${note}${octave}${isSharp ? '#' : ''}`;
};
