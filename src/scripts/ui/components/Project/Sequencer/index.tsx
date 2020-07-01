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
    readonly track: TrackID | null;
    readonly pattern: string | null;
}

export const SequencerUI: React.SFC<Props> = ({ tracks, bars, track, pattern }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="Sequencer">
            {Object.values(tracks).map(({ id: trackID }) => (
                <li
                    className={cn('Sequencer-track', {
                        'is-selected': trackID === track
                    })}
                    key={trackID}
                >
                    {bars.map(bar => {
                        const barInfo = getBarInfo(tracks[trackID], bar.id);
                        return (
                            <div
                                className="Sequencer-track-bar"
                                key={bar.id}
                                onContextMenu={getBarMenu(dispatch, trackID, bar.id, !!barInfo)}
                            >
                                {!!barInfo && (
                                    <BarUI
                                        track={trackID}
                                        info={barInfo}
                                        selected={pattern === barInfo.pattern}
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
