import { useState } from 'react';

import { toArrayBuffer } from 'core/buffer';
import { SEQUENCER } from 'data/config';

import { Audio } from 'modules/audio';
import { Playback } from 'modules/playback';
import { ProjectData } from 'modules/project';
import { PatternData } from 'modules/project/pattern';
import { TrackData } from 'modules/project/tracks/track';

const { BEAT } = SEQUENCER;
const emptyFn = (): void => undefined;

export const usePatternPlayback = (project: ProjectData | null, track: TrackData, pattern: PatternData): Playback => {
    const [running, setRunning] = useState<AudioBufferSourceNode[]>([]);
    const { sample } = track;

    if (!project || !sample) {
        return [false, false, emptyFn, emptyFn, emptyFn];
    }
    const { tempo, master } = project.file;
    const data = toArrayBuffer(sample.buffer);
    const timeUnit = (60 / tempo) / BEAT.DIVISION;
    const paused = ('suspended' === Audio.ctx.state);
    const isRunning = running.length > 0;

    const play = (): void => {
        if (isRunning) {
            if (paused) {
                resume();
            }
            return;
        }
        Audio.ctx.decodeAudioData(data).then(buffer => {
            const now = Audio.ctx.currentTime;

            const sources = Audio.playPattern(pattern, timeUnit, track, sample, buffer, master, now, s => {
                setRunning(items => items.filter(src => s !== src));
            });

            setRunning(sources);
        });
    };

    const pause = (): void => {
        Audio.ctx.suspend();
    };

    const resume = (): void => {
        Audio.ctx.resume();
    };

    const stop = (): void => {
        for (const source of running) {
            source.stop();
        }
        Audio.ctx.resume().then(() => setRunning([]));
    };

    return [isRunning, paused, play, pause, stop];
};
