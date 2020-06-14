import { limitNumber } from 'core/number';
import { MASTER } from 'data/config';

import { Reverb, ReverbID } from 'modules/project/reverb';

const { DEPTH } = MASTER.REVERB;

export const ReverbActions = {
    setType: (reverb: Reverb, type: ReverbID): void => {
        reverb.type = type;
    },
    setDepth: (reverb: Reverb, depth: number): void => {
        depth = limitNumber(depth, DEPTH.MIN, DEPTH.MAX);
        reverb.depth = depth;
    }
};
