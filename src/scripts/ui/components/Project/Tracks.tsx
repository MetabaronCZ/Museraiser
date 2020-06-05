import React from 'react';

import { Tracks, TrackID } from 'modules/project/track';

import { SequencerUI } from 'ui/components/Project/Sequencer';
import { TracksMasterUI } from 'ui/components/Project/TracksMaster';
import { TracksControlUI } from 'ui/components/Project/TracksControl';

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

export const TracksUI: React.SFC<Props> = ({ tracks, selected }) => (
    <div className="Tracks">
        <div className="Tracks-control">
            <TracksControlUI tracks={tracks} selected={selected} />
        </div>

        <div className="Tracks-grid">
            <SequencerUI tracks={tracks} selected={selected} />
        </div>

        <div className="Tracks-master">
            <TracksMasterUI tracks={tracks} selected={selected} />
        </div>
    </div>
);
