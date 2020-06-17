import { toArrayBuffer } from 'core/buffer';
import { PROJECT } from 'data/config';

import { MasterData } from 'modules/project/master';
import { SampleData } from 'modules/project/sample';
import { createGainNode } from 'modules/project/nodes/volume';
import { createFilterNode } from 'modules/project/nodes/filter';
import { createMasterNode } from 'modules/project/nodes/master';

const { SAMPLE } = PROJECT;

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
    auditStart: (sample: SampleData, master: MasterData) => {
        if (auditioned) {
            auditioned.source.stop(0);
        }
        const src = ctx.createBufferSource();
        const data = toArrayBuffer(sample.buffer);

        ctx.decodeAudioData(data).then(buffer => {
            const now = ctx.currentTime;

            src.buffer = buffer;
            src.loop = sample.loop;

            const gain = createGainNode(ctx, sample.volume, sample.envelope);
            const filter1 = createFilterNode(ctx, 'lowpass', sample.filter1);
            const filter2 = createFilterNode(ctx, 'highpass', sample.filter2);
            const masterGain = createMasterNode(ctx, master);

            src.connect(filter1);
            filter1.connect(filter2);
            filter2.connect(gain);
            gain.connect(masterGain);
            masterGain.connect(ctx.destination);

            src.start(now);

            auditioned = {
                source: src,
                sample,
                gain
            };
        });
    },
    auditStop: () => {
        if (!auditioned) {
            return;
        }
        const { sample, source, gain } = auditioned;
        const now = ctx.currentTime;

        const releaseTime = now + sample.envelope.release;
        gain.gain.cancelAndHoldAtTime(now);
        gain.gain.linearRampToValueAtTime(0, releaseTime);

        const stopTime = releaseTime + 0.1;
        source.stop(stopTime);
    }
};
