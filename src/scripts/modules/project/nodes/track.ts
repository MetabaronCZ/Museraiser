import { limitNumber } from 'core/number';

import { TrackData } from 'modules/project/tracks/track';
import { createGainNode } from 'modules/project/nodes/volume';

const PAN_MIN = -1;
const PAN_MAX = +1;

export const createTrackNode = (ctx: AudioContext, data: TrackData, sample: GainNode): GainNode => {
    const now = ctx.currentTime;

    const pan = limitNumber(data.pan / 100, PAN_MIN, PAN_MAX);
    const panNode = ctx.createStereoPanner();
    panNode.pan.setValueAtTime(pan, now);

    const gainNode = createGainNode(ctx, data.volume);

    sample.connect(panNode);
    panNode.connect(gainNode);

    return gainNode;
};
