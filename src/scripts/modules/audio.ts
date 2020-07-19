import { toArrayBuffer } from 'core/buffer';

import { PROJECT } from 'data/config';

import { SampleData } from 'modules/project/sample';
import { MasterData } from 'modules/project/master';
import { PatternData } from 'modules/project/pattern';
import { TrackData } from 'modules/project/tracks/track';

import { createTrackNode } from 'modules/project/nodes/track';
import { createSampleNode } from 'modules/project/nodes/sample';
import { createMasterNode } from 'modules/project/nodes/master';
import { createReverbNode } from 'modules/project/nodes/reverb';
import { NoteData, getNoteLengthValue } from 'modules/project/note';

const { SAMPLE } = PROJECT;
const STOP_OFFSET = 0.1;

type OnNoteStop = (source: AudioBufferSourceNode) => void;

interface Audition {
    readonly sample: SampleData;
    readonly source: AudioBufferSourceNode;
    readonly gain: GainNode;
}

let auditioned: Audition | null = null;

const ctx = new AudioContext({
    sampleRate: SAMPLE.RATE
});

export const Audio = {
    ctx,
    auditStart: (sample: SampleData, track: TrackData, master: MasterData) => {
        if (auditioned) {
            Audio.auditStop();
        }
        const data = toArrayBuffer(sample.buffer);

        ctx.decodeAudioData(data).then(buffer => {
            const { source, gain } = createSampleNode(ctx, sample, buffer);
            const trackNode = createTrackNode(ctx, track, gain);
            const masterNode = createMasterNode(ctx, master, trackNode);
            const reverbNode = createReverbNode(ctx, track.reverb, master.reverb, masterNode);

            reverbNode.connect(ctx.destination);
            source.start(ctx.currentTime);

            auditioned = {
                sample,
                source,
                gain
            };
        });
    },
    auditStop: (force = false) => {
        if (!auditioned) {
            return;
        }
        const { sample, source, gain } = auditioned;

        const now = ctx.currentTime;
        gain.gain.cancelAndHoldAtTime(now);

        if (force) {
            source.stop(now + STOP_OFFSET);
            return;
        }
        const releaseTime = now + sample.envelope.release;
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0, releaseTime);

        const stopTime = releaseTime + STOP_OFFSET;
        source.stop(stopTime);
    },
    playNote: (note: NoteData, timeUnit: number, track: TrackData, sample: SampleData, buffer: AudioBuffer, master: MasterData, from: number, onStop: OnNoteStop): AudioBufferSourceNode => {
        const { source, gain } = createSampleNode(ctx, sample, buffer, note.velocity, note.pitch);
        const trackNode = createTrackNode(ctx, track, gain);
        const masterNode = createMasterNode(ctx, master, trackNode);
        const reverbNode = createReverbNode(ctx, track.reverb, master.reverb, masterNode);

        reverbNode.connect(ctx.destination);

        const length = getNoteLengthValue(note.length);
        const start = from + note.start * timeUnit;
        const stop = start + length * timeUnit;

        // queue note start
        source.start(start);

        // queue note end (+ADSR)
        gain.gain.cancelAndHoldAtTime(stop);

        const releaseTime = stop + sample.envelope.release;
        gain.gain.setValueAtTime(gain.gain.value, stop);
        gain.gain.linearRampToValueAtTime(0, releaseTime);

        const stopTime = releaseTime + STOP_OFFSET;
        source.stop(stopTime);

        // report note stopped
        setTimeout(() => onStop(source), (stop - from) * 1000);

        return source;
    },
    playPattern: (pattern: PatternData, timeUnit: number, track: TrackData, sample: SampleData, buffer: AudioBuffer, master: MasterData, from: number, onNoteStop: OnNoteStop): AudioBufferSourceNode[] => {
        const sources: AudioBufferSourceNode[] = [];

        for (const note of pattern.notes) {
            const source = Audio.playNote(
                note, timeUnit,
                track, sample, buffer, master, from,
                onNoteStop
            );
            sources.push(source);
        }
        return sources;
    }
};
