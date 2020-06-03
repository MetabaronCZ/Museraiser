import React from 'react';
import { useDispatch } from 'react-redux';

import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { TrackData, TrackID, Tracks } from 'modules/project/track';
import { soloProjectTrack, muteProjectTrack } from 'modules/project';

import { LinkButton } from 'ui/common/LinkButton';

interface Props {
    readonly tracks: Tracks;
}

export const TracksUI: React.SFC<Props> = ({ tracks }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="List">
            {Object.entries<TrackData>(tracks).map(([id, track]) => (
                <li className="List-item" key={id}>
                    {track.name}
                    {' '}

                    ({track.sample ? track.sample.name : '-'})
                    {' '}

                    <LinkButton
                        title={TXT.track.solo.title}
                        onClick={() => dispatch(soloProjectTrack(id as TrackID))}
                    >
                        <span style={{ background: track.solo ? 'red' : 'lightgrey' }}>
                            {TXT.track.solo.ico}
                        </span>
                    </LinkButton>

                    {' '}

                    <LinkButton
                        title={TXT.track.mute.title}
                        onClick={() => dispatch(muteProjectTrack(id as TrackID))}
                    >
                        <span style={{ background: track.mute ? 'red' : 'lightgrey' }}>
                            {TXT.track.mute.ico}
                        </span>
                    </LinkButton>

                    {' '}

                    <pre style={{ display: 'inline' }}>
                        {JSON.stringify(track.patterns, null, '\t')}
                    </pre>
                </li>
            ))}
        </ul>
    );
};
