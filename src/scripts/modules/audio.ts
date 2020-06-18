import { toArrayBuffer } from 'core/buffer';

import { PROJECT } from 'data/config';

import { SampleData } from 'modules/project/sample';
import { MasterData } from 'modules/project/master';
import { TrackData } from 'modules/project/tracks/track';

import { createTrackNode } from 'modules/project/nodes/track';
import { createSampleNode } from 'modules/project/nodes/sample';
import { createMasterNode } from 'modules/project/nodes/master';
import { createReverbNode } from 'modules/project/nodes/reverb';

const { SAMPLE } = PROJECT;
const STOP_OFFSET = 0.1;

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
    }
};
