import { SampleData } from 'modules/project/sample';
import { createGainNode } from 'modules/project/nodes/volume';
import { createFilterNode } from 'modules/project/nodes/filter';

interface SampleNode {
    readonly source: AudioBufferSourceNode;
    readonly gain: GainNode;
}

export const createSampleNode = (ctx: AudioContext, sample: SampleData, buffer: AudioBuffer): SampleNode => {
    const source = ctx.createBufferSource();

    source.buffer = buffer;
    source.loop = sample.loop;

    const gain = createGainNode(ctx, sample.volume, sample.envelope);
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
