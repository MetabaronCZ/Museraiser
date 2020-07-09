import React, { useState } from 'react';
import cn from 'classnames';

import { TXT } from 'data/texts';
import { SEQUENCER } from 'data/config';

import { createPaging } from 'modules/paging';
import { PatternData } from 'modules/project/pattern';

import { PagingUI } from 'ui/common/Paging';
import { Paragraph } from 'ui/common/Paragraph';
import { sharpNotes } from 'data/notes';
import { getNoteName } from 'modules/project/note';

const { BEAT, OCTAVE } = SEQUENCER;
const NOTES_PER_BEAT = BEAT.DIVISION;

interface Props {
    readonly pattern: PatternData | null;
}

export const PianoRollUI: React.SFC<Props> = ({ pattern }) => {
    const [page, setPage] = useState<number>(0);

    if (!pattern) {
        return <Paragraph>{TXT.pattern.empty}</Paragraph>;
    }
    const { beats } = pattern;
    const paging = createPaging(page, pattern.length * beats, beats, BEAT.PAGING, setPage);

    return (
        <>
            <ul className="PianoRoll">
                {Array(OCTAVE.LENGTH * 3).fill(0).map((_, i) => (
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

            <PagingUI paging={paging} />
        </>
    );
};
