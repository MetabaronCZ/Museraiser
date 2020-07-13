import { v1 as uuid } from 'uuid';

import { limitNumber } from 'core/number';

import { SEQUENCER } from 'data/config';
import { noteNames, sharpNotes } from 'data/notes';

const { OCTAVE } = SEQUENCER;

export type NoteLength = '1/1' | '1/2' | '1/4' | '1/8' | '1/16';

export interface NoteData {
    id: string;
    start: number;
    length: NoteLength;
    pitch: number;
    velocity: number;
}

export interface NoteSnapshot {
    readonly id: string;
    readonly start: number;
    readonly length: NoteLength;
    readonly pitch: number;
    readonly velocity: number;
}

export const createNote = (start: number, length: NoteLength, pitch: number, velocity: number): NoteData => ({
    id: uuid(),
    start,
    length,
    pitch,
    velocity
});

const parseNote = (data: any): NoteData => ({
    id: `${data.id}`,
    start: parseInt(data.start, 10),
    length: `${data.length}` as NoteLength,
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
    let octave = OCTAVE.MIN + Math.floor(pitch / 12);
    octave = limitNumber(octave, OCTAVE.MIN, OCTAVE.MAX);

    const index = pitch % 12;
    const note = noteNames[index] || '?';
    const isSharp = sharpNotes.includes(index);

    return `${note}${isSharp ? '#' : '–'}${octave}`;
};

export const getNoteLengthValue = (length: NoteLength): number => {
    switch (length) {
        case '1/1': return 16;
        case '1/2': return 8;
        case '1/4': return 4;
        case '1/8': return 2;
        case '1/16': return 1;
        default:
            throw new Error(`Invalid note lonegth: ${length}`);
    }
};
