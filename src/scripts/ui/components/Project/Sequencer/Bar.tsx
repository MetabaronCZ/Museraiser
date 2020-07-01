import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { clickOnly } from 'modules/events';
import { AppDispatch } from 'modules/store';
import { BarInfo } from 'modules/project/sequencer';
import { TrackID } from 'modules/project/tracks/track';
import { selectTrackPattern } from 'modules/project/actions';

interface Props {
    readonly track: TrackID;
    readonly info: BarInfo;
    readonly selected: boolean;
}

export const BarUI: React.SFC<Props> = ({ track, info, selected }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div
            className={cn('Bar', {
                'Bar--first': info.isFirst,
                'Bar--last': info.isLast,
                'is-selected': selected
            })}
            title={info.title}
            onClick={clickOnly(() => dispatch(selectTrackPattern(track, info.pattern)))}
        />
    );
};
