import React, { useState } from 'react';

import { TXT } from 'data/texts';
import { SEQUENCER } from 'data/config';

import { TracksData } from 'modules/project/tracks';
import { TrackID } from 'modules/project/tracks/track';
import { createBars } from 'modules/project/sequencer';

import { PagingUI } from 'ui/common/Paging';
import { SequencerUI } from 'ui/components/Project/Sequencer';
import { TracksHeaderUI } from 'ui/components/Project/TracksHeader';
import { TracksMasterUI } from 'ui/components/Project/TracksMaster';
import { TracksControlUI } from 'ui/components/Project/TracksControl';

const { BAR } = SEQUENCER;
const perPage = BAR.PERPAGE;

const trackMasterHeaders: string[] = [
    TXT.track.volume, TXT.track.pan, TXT.track.reverb
];

interface Props {
    readonly tracks: TracksData;
    readonly track: TrackID | null;
    readonly pattern: string | null;
}

export const TracksUI: React.SFC<Props> = ({ tracks, track, pattern }) => {
    const [page, setPage] = useState<number>(0);

    const bars = createBars(tracks);
    const from = page * perPage;
    const to = from + perPage;

    const headers = Array(perPage).fill(0).map((_, i) => `${from + i + 1}`);

    return (
        <div className="Tracks">
            <div className="Tracks-control">
                <TracksHeaderUI items={[TXT.project.tracks]} />
                <TracksControlUI tracks={tracks} selected={track} />
            </div>

            <div className="Tracks-grid">
                <TracksHeaderUI items={headers} />

                <SequencerUI
                    tracks={tracks}
                    selectedTrack={track}
                    selectedPattern={pattern}
                    bars={bars.slice(from, to)}
                />

                <PagingUI
                    page={page}
                    perPage={perPage}
                    count={bars.length}
                    maxPages={BAR.PAGING}
                    onPage={setPage}
                />
            </div>

            <div className="Tracks-master">
                <TracksHeaderUI items={trackMasterHeaders} />
                <TracksMasterUI tracks={tracks} selected={track} />
            </div>
        </div>
    );
};
