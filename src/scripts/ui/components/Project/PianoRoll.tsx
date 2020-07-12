import cn from 'classnames';
import React, { useState } from 'react';

import { limitNumber } from 'core/number';

import { TXT } from 'data/texts';
import { SEQUENCER } from 'data/config';
import { sharpNotes } from 'data/notes';

import { createPaging } from 'modules/paging';
import { getNoteName } from 'modules/project/note';
import { PatternData } from 'modules/project/pattern';

import { PagingUI } from 'ui/common/Paging';
import { Paragraph } from 'ui/common/Paragraph';

const { BEAT, OCTAVE } = SEQUENCER;

const NOTES_PER_BEAT = BEAT.DIVISION;
const OCTAVES_TO_DISPLAY = 3;

type OnOctave = (octave: number) => void;

const changeOctave = (value: number, cb: OnOctave) => (e: React.MouseEvent) => {
    e.preventDefault();

    value = limitNumber(value, OCTAVE.MIN + 1, OCTAVE.MAX - 2);
    cb(value);
};

interface Props {
    readonly pattern: PatternData | null;
}

export const PianoRollUI: React.SFC<Props> = ({ pattern }) => {
    const [page, setPage] = useState<number>(0);
    const [octave, setOctave] = useState<number>(5);

    if (!pattern) {
        return <Paragraph>{TXT.pattern.empty}</Paragraph>;
    }
    const { beats } = pattern;
    const paging = createPaging(page, pattern.length * beats, beats, BEAT.PAGING, setPage);

    const rows = Array(OCTAVE.LENGTH * OCTAVES_TO_DISPLAY)
        .fill(0)
        .map((_, i) => OCTAVE.LENGTH * octave + i)
        .reverse();

    return (
        <>
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

                                {Array(beats * NOTES_PER_BEAT).fill(0).map((_, j) => (
                                    <div
                                        className={cn('PianoRoll-row-note', {
                                            'PianoRoll-row-note--odd': 0 === Math.floor(j / NOTES_PER_BEAT) % 2
                                        })}
                                        key={j}
                                    />
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="Pattern-actions">
                    <button
                        className="Pattern-actions-button"
                        type="button"
                        title={TXT.pianoRoll.octaveUp.title}
                        disabled={octave === OCTAVE.MAX - 2}
                        onClick={changeOctave(octave + 1, setOctave)}
                    >
                        {TXT.pianoRoll.octaveUp.ico}
                    </button>

                    <div className="Pattern-actions-center" />

                    <button
                        className="Pattern-actions-button"
                        type="button"
                        title={TXT.pianoRoll.octaveDown.title}
                        disabled={octave === OCTAVE.MIN + 1}
                        onClick={changeOctave(octave - 1, setOctave)}
                    >
                        {TXT.pianoRoll.octaveDown.ico}
                    </button>
                </div>
            </div>

            <PagingUI paging={paging} />
        </>
    );
};
