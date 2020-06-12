import { toArrayBuffer } from 'core/buffer';
import { PROJECT } from 'data/config';

import { SampleData } from 'modules/project/sample';
import { createFilterNode } from 'modules/project/filter';
import { createMasterNode, MasterData } from 'modules/project/master';
import { createGainNode } from 'modules/project/volume';

const { SAMPLE } = PROJECT;

let auditioned: AudioBufferSourceNode | null = null;

const ctx = new AudioContext({
    sampleRate: SAMPLE.RATE
});

export const Audio = {
    ctx,
    auditStart: (sample: SampleData, master: MasterData): void => {
        if (auditioned) {
            auditioned.stop(0);
        }
        const src = ctx.createBufferSource();
        const data = toArrayBuffer(sample.buffer);

        ctx.decodeAudioData(data).then(buffer => {
            auditioned = src;

            src.buffer = buffer;

            const gain = createGainNode(ctx, sample.volume);
            const filter1 = createFilterNode(ctx, 'lowpass', sample.filter1);
            const filter2 = createFilterNode(ctx, 'highpass', sample.filter2);
            const masterGain = createMasterNode(ctx, master);

            src.connect(filter1);
            filter1.connect(filter2);
            filter2.connect(gain);
            gain.connect(masterGain);
            masterGain.connect(ctx.destination);

            src.start(0);
        });
    },
    auditStop: (): void => {
        if (!auditioned) {
            return;
        }
        auditioned.stop(0);
    }
};
