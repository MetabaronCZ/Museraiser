import cn from 'classnames';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { limitNumber } from 'core/number';

import { TXT } from 'data/texts';
import { sharpNotes } from 'data/notes';
import { SEQUENCER, NOTE } from 'data/config';

import { clickOnly } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { createPaging } from 'modules/paging';
import { TrackData } from 'modules/project/tracks/track';
import { PatternData, canAddPatternPage, getPatternNote } from 'modules/project/pattern';
import { getNoteName, NoteLength, createNote, getNoteLengthValue } from 'modules/project/note';

import {
    addTrackPatternPage, insertTrackPatternNote,
    removeTrackPatternNote, setTrackPatternBeats
} from 'modules/project/actions';

import { Heading } from 'ui/common/Heading';
import { PagingUI } from 'ui/common/Paging';
import { Paragraph } from 'ui/common/Paragraph';
import { PatternActions } from 'ui/components/Project/PatternActions';

const { BEAT, OCTAVE } = SEQUENCER;

const OCTAVES_TO_DISPLAY = 3;
const NOTES_PER_BEAT = BEAT.DIVISION;

type OnOctave = (octave: number) => void;

const changeOctave = (value: number, cb: OnOctave): void => {
    value = limitNumber(value, OCTAVE.MIN + 1, OCTAVE.MAX - 1);
    cb(value);
};

const setNote = (dispatch: AppDispatch, track: TrackData, pattern: PatternData, pitch: number, time: number, length: NoteLength, velocity: number): void => {
    const note = getPatternNote(pattern, pitch, time);

    if (note) {
        dispatch(removeTrackPatternNote(track.id, pattern.id, note.id));
    } else {
        const newNote = createNote(time, length, pitch, velocity);
        dispatch(insertTrackPatternNote(track.id, pattern.id, newNote));
    }
};

interface Props {
    readonly track: TrackData | null;
    readonly pattern: PatternData | null;
}

export const PianoRollUI: React.SFC<Props> = ({ track, pattern }) => {
    const dispatch = useDispatch<AppDispatch>();

    const [page, setPage] = useState<number>(0);
    const [octave, setOctave] = useState<number>(5);
    const [noteLength, setNoteLength] = useState<NoteLength>(NOTE.LENGTH.DEFAULT);
    const [noteVelocity, setNoteVelocity] = useState<number>(NOTE.VELOCITY.DEFAULT);

    if (!track || !pattern) {
        return (
            <>
                <Heading text={TXT.pattern.title} />
                <Paragraph>{TXT.pattern.empty}</Paragraph>
            </>
        );
    }
    const { beats } = pattern;

    const paging = createPaging(
        page,
        pattern.length * beats,
        beats,
        BEAT.PAGING,
        setPage,
        canAddPatternPage(track, pattern),
        () => dispatch(addTrackPatternPage(track.id, pattern.id))
    );
    const rows = Array(OCTAVE.LENGTH * OCTAVES_TO_DISPLAY)
        .fill(0)
        .map((_, i) => OCTAVE.LENGTH * octave + i)
        .reverse();

    return (
        <>
            <Heading
                text={TXT.pattern.title}
                extra={
                    <PatternActions
                        track={track}
                        pattern={pattern}
                        beats={beats}
                        length={noteLength}
                        velocity={noteVelocity}
                        onLength={setNoteLength}
                        onVelocity={setNoteVelocity}
                        onBeat={value => dispatch(setTrackPatternBeats(track.id, pattern.id, value))}
                    />
                }
            />

            <div className="Pattern">
                <div className="Pattern-grid">
                    <ul className="PianoRoll">
                        {rows.map(i => (
                            <li className="PianoRoll-row" key={i}>
                                <div
                                    className={cn('PianoRoll-row-note', {
                                        'PianoRoll-row-note--white': !sharpNotes.includes(i % OCTAVE.LENGTH),
                                        'PianoRoll-row-note--black': sharpNotes.includes(i % OCTAVE.LENGTH)
                                    })}
                                    key={-1}
                                >
                                    {getNoteName(i)}
                                </div>

                                {Array(beats * NOTES_PER_BEAT).fill(0).map((_, j) => {
                                    const isOdd = 0 === Math.floor(j / NOTES_PER_BEAT) % 2;
                                    const time = paging.page * beats * NOTES_PER_BEAT + j;
                                    const note = getPatternNote(pattern, i, time);
                                    return (
                                        <div
                                            className={cn('PianoRoll-row-note', {
                                                'PianoRoll-row-note--odd': isOdd
                                            })}
                                            key={j}
                                            onClick={clickOnly(
                                                () => setNote(dispatch, track, pattern, i, time, noteLength, noteVelocity)
                                            )}
                                        >
                                            {!!note && (
                                                <div
                                                    className={cn('Note', {
                                                        'Note--first': (time === note.start),
                                                        'Note--last': (time === note.start + getNoteLengthValue(note.length) - 1)
                                                    })}
                                                    data-pitch={note.pitch}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="Pattern-actions">
                    <button
                        className="Pattern-actions-button"
                        type="button"
                        title={TXT.pianoRoll.octaveUp.title}
                        disabled={octave === OCTAVE.MAX - 1}
                        onClick={clickOnly(() => changeOctave(octave + 1, setOctave))}
                    >
                        {TXT.pianoRoll.octaveUp.ico}
                    </button>

                    <div className="Pattern-actions-center" />

                    <button
                        className="Pattern-actions-button"
                        type="button"
                        title={TXT.pianoRoll.octaveDown.title}
                        disabled={octave === OCTAVE.MIN + 1}
                        onClick={clickOnly(() => changeOctave(octave - 1, setOctave))}
                    >
                        {TXT.pianoRoll.octaveDown.ico}
                    </button>
                </div>
            </div>

            <PagingUI paging={paging} />
        </>
    );
};
