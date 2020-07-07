import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { PATTERN } from 'data/config';

import { clickOnly } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { TrackID } from 'modules/project/tracks/track';
import { getDefaultPatternName } from 'modules/project/pattern';
import { selectTrackPattern, setTrackPatternName } from 'modules/project/actions';

import { FormInput } from 'ui/common/FormInput';

interface Props {
    readonly id: string;
    readonly name: string;
    readonly count: number; // pattern usage count
    readonly track: TrackID;
}

export const PatternTitle: React.SFC<Props> = ({ id, name, count, track }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [editable, setEditable] = useState(false);

    if (editable) {
        return (
            <FormInput
                id={`PATTERN-${id}`}
                value={name}
                min={PATTERN.NAME.MIN}
                max={PATTERN.NAME.MAX}
                defaultValue={getDefaultPatternName()}
                autofocus
                onBlur={() => setEditable(false)}
                onChange={value => dispatch(setTrackPatternName(track, id, value))}
            />
        );
    }
    return (
        <button
            className="PatternButton"
            type="button"
            onClick={clickOnly(() => dispatch(selectTrackPattern(track, id)))}
            onDoubleClick={() => setEditable(true)}
        >
            {name} ({count})
        </button>
    );
};
