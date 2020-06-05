import React from 'react';

import { TXT } from 'data/texts';
import { SEQUENCER } from 'data/config';

import { Tracks, TrackID } from 'modules/project/track';

import { SequencerUI } from 'ui/components/Project/Sequencer';
import { TracksHeaderUI } from 'ui/components/Project/TracksHeader';
import { TracksMasterUI } from 'ui/components/Project/TracksMaster';
import { TracksControlUI } from 'ui/components/Project/TracksControl';

const trackMasterHeaders: string[] = [
    TXT.track.volume, TXT.track.pan, TXT.track.delay, TXT.track.reverb
];
const sequencerHeaders = Array(SEQUENCER.BAR.MIN).fill(0).map((_, i) => `${i + 1}`);

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

export const TracksUI: React.SFC<Props> = ({ tracks, selected }) => (
    <div className="Tracks">
        <div className="Tracks-control">
            <TracksHeaderUI items={[TXT.project.tracks]} />
            <TracksControlUI tracks={tracks} selected={selected} />
        </div>

        <div className="Tracks-grid">
            <TracksHeaderUI items={sequencerHeaders} />
            <SequencerUI tracks={tracks} selected={selected} />
        </div>

        <div className="Tracks-master">
            <TracksHeaderUI items={trackMasterHeaders} />
            <TracksMasterUI tracks={tracks} selected={selected} />
        </div>
    </div>
);
