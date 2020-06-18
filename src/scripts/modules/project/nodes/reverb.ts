import Freeverb from 'freeverb';

import { limitNumber } from 'core/number';
import { ReverbData } from 'modules/project/reverb';

const MIX_MIN = 0;
const MIX_MAX = 1;
const ROOM_SIZE_MIN = 0;
const ROOM_SIZE_MAX = 1;
const DAMPENING_MIN = 0;
const DAMPENING_MAX = 20000;

export const createReverbNode = (ctx: AudioContext, mix: number, reverb: ReverbData, master: DynamicsCompressorNode): Freeverb => {
    const node = new Freeverb(ctx);
    const now = ctx.currentTime;

    const depth = limitNumber(reverb.depth / 100, ROOM_SIZE_MIN, ROOM_SIZE_MAX, true);
    const dampening = limitNumber(DAMPENING_MAX * (reverb.dampening / 100), DAMPENING_MIN, DAMPENING_MAX);
    const wet = limitNumber(mix / 100, MIX_MIN, MIX_MAX, true);
    const dry = 1 - wet;

    node.roomSize = depth;
    node.dampening = dampening;
    node.dry.setValueAtTime(dry, now);
    node.wet.setValueAtTime(wet, now);

    master.connect(node);

    return node;
};
