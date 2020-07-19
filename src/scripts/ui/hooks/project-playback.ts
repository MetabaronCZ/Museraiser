import { useState } from 'react';

import { toArrayBuffer } from 'core/buffer';
import { SEQUENCER } from 'data/config';

import { Audio } from 'modules/audio';
import { Playback } from 'modules/playback';
import { ProjectData } from 'modules/project';
import { SampleData } from 'modules/project/sample';
import { TrackData } from 'modules/project/tracks/track';

interface PlaybackData {
    readonly track: TrackData;
    readonly sample: SampleData;
    readonly buffer: ArrayBuffer;
}

const { BEAT } = SEQUENCER;
const emptyFn = (): void => undefined;

export const useProjectPlayback = (project: ProjectData | null): Playback => {
    const invalidResult: Playback = [false, false, emptyFn, emptyFn, emptyFn];
    const [running, setRunning] = useState<AudioBufferSourceNode[]>([]);

    if (!project) {
        return invalidResult;
    }
    const { tempo, tracks, master } = project.file;
    const timeUnit = (60 / tempo) / BEAT.DIVISION;
    const paused = ('suspended' === Audio.ctx.state);
    const isRunning = running.length > 0;

    const data: PlaybackData[] = [];

    Object.values(tracks).map(track => {
        if (!track.sample || track.mute) {
            return;
        }
        data.push({
            track,
            sample: track.sample,
            buffer: toArrayBuffer(track.sample.buffer)
        });
    });

    const play = (): void => {
        if (isRunning) {
            if (paused) {
                resume();
            }
            return;
        }
        const now = Audio.ctx.currentTime;

        for (const d of data) {
            Audio.ctx.decodeAudioData(d.buffer).then(buffer => {
                let sources: AudioBufferSourceNode[] = [];

                for (const seq of d.track.sequences) {
                    const pattern = d.track.patterns.find(ptn => seq.pattern === ptn.id);

                    if (!pattern) {
                        return;
                    }
                    const from = now + seq.start * BEAT.DIVISION * pattern.beats;

                    const ptnSrc = Audio.playPattern(pattern, timeUnit, d.track, d.sample, buffer, master, from, s => {
                        setRunning(items => items.filter(src => s !== src));
                    });
                    sources = [...sources, ...ptnSrc];
                }
                setRunning(sources);
            });
        }
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
