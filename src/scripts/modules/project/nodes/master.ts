import { MasterData } from 'modules/project/master';
import { createGainNode } from 'modules/project/nodes/volume';

export const createMasterNode = (ctx: AudioContext, data: MasterData, track: GainNode): DynamicsCompressorNode => {
    const gain = createGainNode(ctx, data.volume);
    const compressor = ctx.createDynamicsCompressor();

    track.connect(gain);
    gain.connect(compressor);

    return compressor;
};
