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
    readonly tracks: TracksData;
    readonly bars: Bar[];
    readonly selected: TrackID | null;
}

export const SequencerUI: React.SFC<Props> = ({ tracks, bars, selected }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <ul className="Sequencer">
            {Object.values(tracks).map(({ id }) => (
                <li
                    className={cn('Sequencer-track', {
                        'is-selected': id === selected
                    })}
                    key={id}
                >
                    {bars.map(bar => {
                        const barInfo = getBarInfo(tracks[id], bar.id);
                        return (
                            <div
                                className="Sequencer-track-bar"
                                key={bar.id}
                                onContextMenu={getBarMenu(dispatch, id, bar.id, !!barInfo)}
                            >
                                {!!barInfo && (
                                    <BarUI track={id} info={barInfo} />
                                )}
                            </div>
                        );
                    })}
                </li>
            ))}
        </ul>
    );
};
