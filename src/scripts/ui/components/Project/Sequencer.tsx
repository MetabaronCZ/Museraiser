import React from 'react';
import cn from 'classnames';

import { Bar } from 'modules/project/sequencer';
import { Tracks } from 'modules/project/tracks';
import { TrackID } from 'modules/project/tracks/track';

interface Props {
    readonly tracks: Tracks;
    readonly bars: Bar[];
    readonly selected: TrackID | null;
}

export const SequencerUI: React.SFC<Props> = ({ tracks, bars, selected }) => (
    <ul className="Sequencer">
        {Object.values(tracks).map(({ id }) => (
            <li
                className={cn('Sequencer-track', {
                    'is-selected': id === selected
                })}
                key={id}
            >
                {bars.map(bar => (
                    <div className="Sequencer-track-bar" key={bar.id} />
                ))}
            </li>
        ))}
    </ul>
);
