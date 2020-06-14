import { limitNumber } from 'core/number';
import { MASTER } from 'data/config';

import { ReverbData, ReverbID } from 'modules/project/reverb';

const { DEPTH } = MASTER.REVERB;

export const Reverb = {
    setType: (reverb: ReverbData, type: ReverbID): void => {
        reverb.type = type;
    },
    setDepth: (reverb: ReverbData, depth: number): void => {
        depth = limitNumber(depth, DEPTH.MIN, DEPTH.MAX);
        reverb.depth = depth;
    }
};
