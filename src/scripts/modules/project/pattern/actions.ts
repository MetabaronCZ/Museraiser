import { PATTERN, NOTE } from 'data/config';

import { NoteData, getNoteLengthValue } from 'modules/project/note';
import { PatternData, getPatternNote } from 'modules/project/pattern';

const { NAME } = PATTERN;

export const Pattern = {
    setname: (pattern: PatternData, name: string): void => {
        name = name.substring(0, NAME.MAX);
        pattern.name = name;
    },
    addPage: (pattern: PatternData): void => {
        pattern.length++;
    },
    insertNote: (pattern: PatternData, note: NoteData): void => {
        const length = getNoteLengthValue(note.length);

        for (let i = 0; i < length; i++) {
            const time = note.start + i;

            // check free space
            if (getPatternNote(pattern, note.pitch, time)) {
                return;
            }
            let polyphony = 0;

            // check polyphony limit
            for (let p = 0; p <= NOTE.PITCH.MAX; p++) {
                if (getPatternNote(pattern, p, time)) {
                    polyphony++;
                }
            }

            if (polyphony >= PATTERN.POLYPHONY.MAX) {
                // max polyphony (voices count) reached
                return;
            }
        }
        pattern.notes.push(note);
    },
    removeNote: (pattern: PatternData, note: string): void => {
        pattern.notes = pattern.notes.filter(n => note !== n.id);
    }
};
