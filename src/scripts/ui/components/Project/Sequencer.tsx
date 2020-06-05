import React from 'react';
import cn from 'classnames';

import { Tracks, TrackData, TrackID } from 'modules/project/track';
import { createBars } from 'modules/project/sequencer';

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

export const SequencerUI: React.SFC<Props> = ({ tracks, selected }) => {
    const bars = createBars(tracks);
    return (
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
};
