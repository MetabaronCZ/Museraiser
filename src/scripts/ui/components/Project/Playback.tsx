import React from 'react';
import { useSelector } from 'react-redux';

import { TXT } from 'data/texts';

import { AppState } from 'modules/store';
import { clickOnly } from 'modules/events';
import { ProjectData } from 'modules/project';
import { PatternData } from 'modules/project/pattern';
import { TrackData } from 'modules/project/tracks/track';

import { usePlayback } from 'ui/hooks/playback';

interface Props {
    readonly track: TrackData;
    readonly pattern: PatternData;
}

export const Playback: React.SFC<Props> = ({ track, pattern }) => {
    const project = useSelector<AppState, ProjectData | null>(state => state.project);
    const [running, paused, play, pause, stop] = usePlayback(project, track, pattern);
    return (
        <ul className="Playback">
            <li className="Playback-item">
                {(paused || !running)
                    ? (
                        <button
                            className="Playback-button"
                            type="button"
                            title={TXT.playback.play.title}
                            onClick={clickOnly(play)}
                        >
                            {TXT.playback.play.ico}
                        </button>
                    )
                    : (
                        <button
                            className="Playback-button"
                            type="button"
                            title={TXT.playback.pause.title}
                            onClick={clickOnly(pause)}
                        >
                            {TXT.playback.pause.ico}
                        </button>
                    )
                }
            </li>

            <li className="Playback-item">
                <button
                    className="Playback-button"
                    type="button"
                    title={TXT.playback.stop.title}
                    onClick={clickOnly(stop)}
                >
                    {TXT.playback.stop.ico}
                </button>
            </li>
        </ul>
    );
};
