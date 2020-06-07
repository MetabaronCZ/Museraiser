import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TRACK } from 'data/config';

import { clickOnly } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { setTrackName, selectTrack } from 'modules/project/actions';
import { TrackID, getDefaultTrackName } from 'modules/project/track';

import { FormInput } from 'ui/common/FormInput';

interface Props {
    readonly id: TrackID;
    readonly name: string;
}

export const TrackCategory: React.SFC<Props> = ({ id, name }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [editable, setEditable] = useState(false);

    if (editable) {
        return (
            <FormInput
                id={`TRACK-${id}`}
                value={name}
                min={TRACK.NAME.MIN}
                max={TRACK.NAME.MAX}
                defaultValue={getDefaultTrackName(id)}
                autofocus
                onBlur={() => setEditable(false)}
                onChange={value => dispatch(setTrackName(id, value))}
            />
        );
    }
    return (
        <button
            className="TrackButton TrackButton--category"
            type="button"
            onClick={clickOnly(() => dispatch(selectTrack(id)))}
            onDoubleClick={() => setEditable(true)}
        >
            {name}
        </button>
    );
};
