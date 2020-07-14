import { v1 as uuid } from 'uuid';

import { SEQUENCER } from 'data/config';

import { getSequence } from 'modules/project/sequence';
import { TrackData } from 'modules/project/tracks/track';
import {
    NoteData, NoteSnapshot,
    parseNotes, serializeNote, getNoteLengthValue
} from 'modules/project/note';

const { BEAT } = SEQUENCER;

export const patternBeats = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export type BeatID = typeof patternBeats[number];

export interface PatternData {
    readonly id: string;
    name: string;
    beats: BeatID;
    length: number;
    notes: NoteData[];
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
    beats: BEAT.DEFAULT as BeatID,
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

export const getPatternLength = (pattern: PatternData): number => {
    let end = 1;

    for (const note of pattern.notes) {
        const length = getNoteLengthValue(note.length);
        const noteEnd = note.start + length - 1;
        end = Math.max(end, noteEnd);
    }
    return Math.ceil(end / (pattern.beats * BEAT.DIVISION));
};

export const serializePatterns = (patterns: PatternData[]): PatternSnapshot[] => {
    return patterns.map(ptn => ({
        ...ptn,
        length: getPatternLength(ptn),
        notes: ptn.notes.map(note => serializeNote(note))
    }));
};

export const isPatternOverlap = (a: PatternData, b: PatternData, aStart: number, bStart: number): boolean => {
    const aEnd = aStart + a.length;
    const bEnd = bStart + b.length;
    return aStart < bEnd && aEnd > bStart;
};

export const canAddPatternPage = (track: TrackData, pattern: PatternData): boolean => {
    return !track.sequences
        .filter(seq => pattern.id === seq.pattern)
        .find(seq => getSequence(track, seq.start + pattern.length));
};

export const getPatternNote = (pattern: PatternData, pitch: number, time: number): NoteData | null => {
    for (const note of pattern.notes) {
        const length = getNoteLengthValue(note.length);
        const noteEnd = note.start + length - 1;

        if (pitch === note.pitch && note.start <= time && noteEnd >= time) {
            return note;
        }
    }
    return null;
};
