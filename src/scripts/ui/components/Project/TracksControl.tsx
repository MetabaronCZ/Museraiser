import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { Tracks } from 'modules/project/tracks';
import { TrackID } from 'modules/project/tracks/track';
import { soloProjectTrack, muteProjectTrack } from 'modules/project/actions';

import { TrackButton } from 'ui/components/Project/TrackButton';
import { TrackCategory } from 'ui/components/Project/TrackCategory';

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

export const TracksControlUI: React.SFC<Props> = ({ tracks, selected }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="TracksControl">
            {Object.values(tracks).map(({ id, name, solo, mute }) => (
                <li
                    className={cn('TracksControl-item', {
                        'is-selected': id === selected
                    })}
                    key={id}
                >
                    <div className="TracksControl-item-column">
                        <TrackCategory id={id} name={name} />
                    </div>

                    <div className="TracksControl-item-column">
                        <TrackButton
                            text={TXT.track.solo.ico}
                            title={TXT.track.solo.title}
                            highlighted={solo}
                            onClick={() => dispatch(soloProjectTrack(id))}
                        />
                    </div>

                    <div className="TracksControl-item-column">
                        <TrackButton
                            text={TXT.track.mute.ico}
                            title={TXT.track.mute.title}
                            highlighted={mute}
                            onClick={() => dispatch(muteProjectTrack(id))}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};
