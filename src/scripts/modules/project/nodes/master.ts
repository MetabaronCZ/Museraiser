import { MasterData } from 'modules/project/master';
import { createGainNode } from 'modules/project/nodes/volume';

export const createMasterNode = (ctx: AudioContext, data: MasterData): GainNode => {
    const gain = createGainNode(ctx, data.volume);
    const compressor = ctx.createDynamicsCompressor();

    gain.connect(compressor);
    compressor.connect(ctx.destination);

    return gain;
};
