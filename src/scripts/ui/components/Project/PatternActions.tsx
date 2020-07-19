import React from 'react';

import { TXT } from 'data/texts';
import { NOTE } from 'data/config';

import { TrackData } from 'modules/project/tracks/track';
import { Pattern } from 'modules/project/pattern/actions';
import { NoteLength, noteLengths } from 'modules/project/note';
import { BeatID, PatternData, patternBeats, canAddPatternPage } from 'modules/project/pattern';

import { FormNumber } from 'ui/common/FormNumber';
import { FormSelect } from 'ui/common/FormSelect';
import { Playback } from 'ui/components/Project/Playback';
import { createSelectOptions, FormSelectOption } from 'ui/common/FormSelect/options';

type OnLength = (length: NoteLength) => void;
type OnVelocity = (velocity: number) => void;
type OnBeat = (beat: BeatID) => void;

const noteLengthOptions = createSelectOptions(noteLengths.slice(0), len => ({
    label: len,
    value: len
}));

const getPatternBeatsOptions = (track: TrackData, pattern: PatternData): FormSelectOption[] => {
    const trk = {
        ...track,
        patterns: [...track.patterns]
    };

    // filter beats which dont add colliding length to pattern
    const beats = patternBeats.filter(b => {
        const ptn = { ...pattern };
        Pattern.setBeats(ptn, b);

        const len = ptn.length;

        if (len <= pattern.length) {
            return true;
        }
        Pattern.setBeats(ptn, pattern.beats);

        trk.patterns.filter(p => p.id !== pattern.id);
        trk.patterns.push(ptn);

        for (let i = 0; i < len - pattern.length; i++) {
            if (!canAddPatternPage(trk, ptn)) {
                return false;
            }
            Pattern.addPage(ptn);
        }
        return true;
    });

    return createSelectOptions(beats, sig => ({
        label: `${sig}`,
        value: `${sig}`
    }));
};

interface Props {
    readonly track: TrackData;
    readonly pattern: PatternData;
    readonly beats: BeatID;
    readonly length: NoteLength;
    readonly velocity: number;
    readonly onLength: OnLength;
    readonly onVelocity: OnVelocity;
    readonly onBeat: OnBeat;
}

export const PatternActions: React.SFC<Props> = props => {
    const { track, pattern, length, velocity, beats, onLength, onVelocity, onBeat } = props;
    return (
        <ul className="PatternActions">
            <li className="PatternActions-item">
                <Playback track={track} pattern={pattern} />
            </li>

            <li
                className="PatternActions-item"
                title={TXT.pianoRoll.beats.title}
            >
                {TXT.pianoRoll.beats.short}:&nbsp;

                <FormSelect
                    id="pattern-beats"
                    value={`${beats}`}
                    options={getPatternBeatsOptions(track, pattern)}
                    mini
                    onChange={value => onBeat(parseInt(value, 10) as BeatID)}
                />
            </li>

            <li
                className="PatternActions-item"
                title={TXT.pianoRoll.length.title}
            >
                {TXT.pianoRoll.length.short}:&nbsp;

                <FormSelect
                    id="pattern-note-length"
                    value={length}
                    options={noteLengthOptions}
                    mini
                    onChange={value => onLength(value as NoteLength)}
                />
            </li>

            <li
                className="PatternActions-item"
                title={TXT.pianoRoll.velocity.title}
            >
                {TXT.pianoRoll.velocity.short}:&nbsp;

                <FormNumber
                    id="pattern-note-velocity"
                    value={velocity}
                    min={NOTE.VELOCITY.MIN}
                    max={NOTE.VELOCITY.MAX}
                    mini
                    onChange={onVelocity}
                />
            </li>
        </ul>
    );
};
