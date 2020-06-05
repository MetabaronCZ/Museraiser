import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { TrackData, TrackID, Tracks } from 'modules/project/track';
import { soloProjectTrack, muteProjectTrack, selectTrack } from 'modules/project';

import { LinkButton } from 'ui/common/LinkButton';
import { Button } from 'ui/common/Button';

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
                            <Button
                                text={name}
                                onClick={() => dispatch(selectTrack(tID))}
                            />
                        </div>

                        <div className="TracksControl-item-column">
                            <LinkButton
                                title={TXT.track.solo.title}
                                onClick={() => dispatch(soloProjectTrack(tID))}
                            >
                                <span style={{ background: solo ? 'red' : 'lightgrey' }}>
                                    {TXT.track.solo.ico}
                                </span>
                            </LinkButton>

                            {' '}

                            <LinkButton
                                title={TXT.track.mute.title}
                                onClick={() => dispatch(muteProjectTrack(tID))}
                            >
                                <span style={{ background: mute ? 'red' : 'lightgrey' }}>
                                    {TXT.track.mute.ico}
                                </span>
                            </LinkButton>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
