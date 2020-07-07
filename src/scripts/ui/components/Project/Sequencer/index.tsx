import React from 'react';
import cn from 'classnames';
import { useDispatch } from 'react-redux';

import { AppDispatch } from 'modules/store';
import { TracksData } from 'modules/project/tracks';
import { TrackID } from 'modules/project/tracks/track';
import { Bar, getBarInfo } from 'modules/project/sequencer';

import { BarUI } from 'ui/components/Project/Sequencer/Bar';
import { getBarMenu } from 'ui/components/Project/Sequencer/menu';

interface Props {
    readonly bars: Bar[];
    readonly tracks: TracksData;
    readonly selectedTrack: TrackID | null;
    readonly selectedPattern: string | null;
}

export const SequencerUI: React.SFC<Props> = ({ tracks, bars, selectedTrack, selectedPattern }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="Sequencer">
            {Object.values(tracks).map(track => (
                <li
                    className={cn('Sequencer-track', {
                        'is-selected': selectedTrack === track.id
                    })}
                    key={track.id}
                >
                    {bars.map(bar => {
                        const barInfo = getBarInfo(track, bar.id);
                        return (
                            <div
                                className="Sequencer-track-bar"
                                key={bar.id}
                                onContextMenu={getBarMenu(dispatch, track, bar.id, !!barInfo)}
                            >
                                {!!barInfo && (
                                    <BarUI
                                        track={track.id}
                                        info={barInfo}
                                        selected={selectedPattern === barInfo.pattern}
                                    />
                                )}
                            </div>
                        );
                    })}
                </li>
            ))}
        </ul>
    );
};
