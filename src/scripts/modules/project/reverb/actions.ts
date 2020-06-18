import { limitNumber } from 'core/number';
import { MASTER } from 'data/config';

import { ReverbData } from 'modules/project/reverb';

const { DEPTH, DAMPENING } = MASTER.REVERB;

export const Reverb = {
    setDepth: (reverb: ReverbData, depth: number): void => {
        depth = limitNumber(depth, DEPTH.MIN, DEPTH.MAX);
        reverb.depth = depth;
    },
    setDampening: (reverb: ReverbData, dampening: number): void => {
        dampening = limitNumber(dampening, DAMPENING.MIN, DAMPENING.MAX);
        reverb.dampening = dampening;
    }
};
