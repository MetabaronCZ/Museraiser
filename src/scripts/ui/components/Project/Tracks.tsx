import React, { useState } from 'react';

import { TXT } from 'data/texts';
import { SEQUENCER } from 'data/config';

import { createBars } from 'modules/project/sequencer';
import { Tracks, TrackID } from 'modules/project/track';

import { PagingUI } from 'ui/common/Paging';
import { SequencerUI } from 'ui/components/Project/Sequencer';
import { TracksHeaderUI } from 'ui/components/Project/TracksHeader';
import { TracksMasterUI } from 'ui/components/Project/TracksMaster';
import { TracksControlUI } from 'ui/components/Project/TracksControl';

const { BAR } = SEQUENCER;
const perPage = BAR.PERPAGE;

const trackMasterHeaders: string[] = [
    TXT.track.volume, TXT.track.pan, TXT.track.delay, TXT.track.reverb
];

interface Props {
    readonly tracks: Tracks;
    readonly selected: TrackID | null;
}

export const TracksUI: React.SFC<Props> = ({ tracks, selected }) => {
    const [page, setPage] = useState<number>(0);

    const bars = createBars(tracks);
    const from = page * perPage;
    const to = from + perPage;

    const headers = Array(perPage).fill(0).map((_, i) => `${from + i + 1}`);

    return (
        <div className="Tracks">
            <div className="Tracks-control">
                <TracksHeaderUI items={[TXT.project.tracks]} />
                <TracksControlUI tracks={tracks} selected={selected} />
            </div>

            <div className="Tracks-grid">
                <TracksHeaderUI items={headers} />

                <SequencerUI
                    tracks={tracks}
                    bars={bars.slice(from, to)}
                    selected={selected}
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
                <TracksMasterUI tracks={tracks} selected={selected} />
            </div>
        </div>
    );
};