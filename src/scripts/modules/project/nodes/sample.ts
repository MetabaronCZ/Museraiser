import { NOTE } from 'data/config';

import { SampleData } from 'modules/project/sample';
import { createGainNode } from 'modules/project/nodes/volume';
import { createFilterNode } from 'modules/project/nodes/filter';

const { PITCH } = NOTE;

interface SampleNode {
    readonly source: AudioBufferSourceNode;
    readonly gain: GainNode;
}

export const createSampleNode = (ctx: AudioContext, sample: SampleData, buffer: AudioBuffer, velocity?: number, pitch?: number): SampleNode => {
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();

    source.buffer = buffer;
    source.loop = sample.loop;

    // set note pitch
    pitch = pitch || PITCH.DEFAULT;
    source.detune.setValueAtTime((pitch - PITCH.DEFAULT) * 100, now);

    const gain = createGainNode(ctx, sample.volume, sample.envelope, velocity);
    const filter1 = createFilterNode(ctx, 'lowpass', sample.filter1);
    const filter2 = createFilterNode(ctx, 'highpass', sample.filter2);

    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gain);

    return {
        source,
        gain
    };
};
