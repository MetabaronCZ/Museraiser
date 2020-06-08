import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';
import { TRACK } from 'data/config';

import { Dialog } from 'modules/dialog';
import { clickOnly } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { TrackID, getDefaultTrackName } from 'modules/project/track';
import {
    setTrackName, selectTrack, deleteTrack, removeTrackPatterns
} from 'modules/project/actions';

import { FormInput } from 'ui/common/FormInput';

const getMenu = (dispatch: AppDispatch, track: TrackID) => () => {
    return Dialog.contextMenu([
        {
            title: TXT.track.removePatterns.title,
            onClick: () => dispatch(removeTrackPatterns(track))
        },
        {
            title: TXT.track.delete.title,
            onClick: () => dispatch(deleteTrack(track))
        }
    ]);
};

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
    const menu = getMenu(dispatch, id);
    return (
        <button
            className="TrackButton TrackButton--category"
            type="button"
            onClick={clickOnly(() => dispatch(selectTrack(id)))}
            onDoubleClick={() => setEditable(true)}
            onContextMenu={menu}
        >
            {name}
        </button>
    );
};
