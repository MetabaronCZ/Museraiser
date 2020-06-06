import React from 'react';
import cn from 'classnames';

import { Bar } from 'modules/project/sequencer';
import { Tracks, TrackData, TrackID } from 'modules/project/track';

interface Props {
    readonly tracks: Tracks;
    readonly bars: Bar[];
    readonly selected: TrackID | null;
}

export const SequencerUI: React.SFC<Props> = ({ tracks, bars, selected }) => (
    <ul className="Sequencer">
        {Object.entries<TrackData>(tracks).map(([id, track]) => {
            const tID = id as TrackID;
            return (
                <li
                    className={cn('Sequencer-track', {
                        'is-selected': tID === selected
                    })}
                    key={id}
                >
                    {bars.map(bar => (
                        <div className="Sequencer-track-bar" key={bar.id} />
                    ))}
                </li>
            );
        })}
    </ul>
);
