import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { TrackData, TrackID, Tracks } from 'modules/project/track';
import { soloProjectTrack, muteProjectTrack, selectTrack } from 'modules/project/actions';

import { TrackButton } from 'ui/components/Project/TrackButton';

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

export const TracksControlUI: React.SFC<Props> = ({ tracks, selected }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="TracksControl">
            {Object.entries<TrackData>(tracks).map(([id, track]) => {
                const { name, solo, mute } = track;
                const tID = id as TrackID;
                return (
                    <li
                        className={cn('TracksControl-item', {
                            'is-selected': tID === selected
                        })}
                        key={id}
                    >
                        <div className="TracksControl-item-column">
                            <TrackButton
                                text={name}
                                category
                                onClick={() => dispatch(selectTrack(tID))}
                            />
                        </div>

                        <div className="TracksControl-item-column">
                            <TrackButton
                                text={TXT.track.solo.ico}
                                title={TXT.track.solo.title}
                                highlighted={solo}
                                onClick={() => dispatch(soloProjectTrack(tID))}
                            />
                        </div>

                        <div className="TracksControl-item-column">
                            <TrackButton
                                text={TXT.track.mute.ico}
                                title={TXT.track.mute.title}
                                highlighted={mute}
                                onClick={() => dispatch(muteProjectTrack(tID))}
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
