import { ReverbID } from 'modules/project/reverb';
import { MasterData } from 'modules/project/master';
import { Delay } from 'modules/project/delay/actions';
import { Reverb } from 'modules/project/reverb/actions';
import { Volume } from 'modules/project/volume/actions';

export const Master = {
    setVolume: (master: MasterData, gain: number): void => {
        Volume.setGain(master.volume, gain);
    },
    setReverbType: (master: MasterData, type: ReverbID): void => {
        Reverb.setType(master.reverb, type);
    },
    setReverbDepth: (master: MasterData, depth: number): void => {
        Reverb.setDepth(master.reverb, depth);
    },
    setDelayAmount: (master: MasterData, amount: number): void => {
        Delay.setAmount(master.delay, amount);
    },
    setDelayRate: (master: MasterData, rate: number): void => {
        Delay.setRate(master.delay, rate);
    }
};
