import { toArrayBuffer } from 'core/buffer';
import { PROJECT } from 'data/config';

import { SampleData } from 'modules/project/sample';

const { SAMPLE } = PROJECT;

let auditioned: AudioBufferSourceNode | null = null;

const ctx = new AudioContext({
    sampleRate: SAMPLE.RATE
});

export const Audio = {
    ctx,
    audit: (sample: SampleData, volume = 1.0): void => {
        if (auditioned) {
            auditioned.stop(0);
        }
        const src = ctx.createBufferSource();
        const data = toArrayBuffer(sample.buffer);

        ctx.decodeAudioData(data).then(buffer => {
            auditioned = src;

            src.buffer = buffer;

            const gain = Audio.ctx.createGain();
            gain.gain.value = volume;

            src.connect(gain);
            gain.connect(Audio.ctx.destination);

            src.start(0);
        });
    }
};
