import React from 'react';

import { Tracks } from 'modules/project/track';

import { TracksMasterUI } from 'ui/components/Project/TracksMaster';
import { TracksControlUI } from 'ui/components/Project/TracksControl';

interface Props {
    readonly tracks: Tracks;
}

export const TracksUI: React.SFC<Props> = ({ tracks }) => (
    <div className="Tracks">
        <div className="Tracks-control">
            <TracksControlUI tracks={tracks} />
        </div>

        <div className="Tracks-grid">
            ...grid
        </div>

        <div className="Tracks-master">
            <TracksMasterUI tracks={tracks} />
        </div>
    </div>
);
