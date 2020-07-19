import React from 'react';

import { TXT } from 'data/texts';
import { clickOnly } from 'modules/events';

interface Props {
    readonly running: boolean;
    readonly paused: boolean;
    readonly onPlay: () => void;
    readonly onPause: () => void;
    readonly onStop: () => void;
}

export const PlaybackUI: React.SFC<Props> = ({ running, paused, onPlay, onPause, onStop }) => (
    <ul className="Playback">
        <li className="Playback-item">
            {(paused || !running)
                ? (
                    <button
                        className="Playback-button"
                        type="button"
                        title={TXT.playback.play.title}
                        onClick={clickOnly(onPlay)}
                    >
                        {TXT.playback.play.ico}
                    </button>
                )
                : (
                    <button
                        className="Playback-button"
                        type="button"
                        title={TXT.playback.pause.title}
                        onClick={clickOnly(onPause)}
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
                onClick={clickOnly(onStop)}
            >
                {TXT.playback.stop.ico}
            </button>
        </li>
    </ul>
);
