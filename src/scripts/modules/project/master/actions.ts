import { ReverbID } from 'modules/project/reverb';
import { MasterData } from 'modules/project/master';
import { DelayActions } from 'modules/project/delay/actions';
import { ReverbActions } from 'modules/project/reverb/actions';
import { VolumeActions } from 'modules/project/volume/actions';

export const MasterActions = {
    setVolume: (master: MasterData, gain: number): void => {
        VolumeActions.setGain(master.volume, gain);
    },
    setReverbType: (master: MasterData, type: ReverbID): void => {
        ReverbActions.setType(master.reverb, type);
    },
    setReverbDepth: (master: MasterData, depth: number): void => {
        ReverbActions.setDepth(master.reverb, depth);
    },
    setDelayAmount: (master: MasterData, amount: number): void => {
        DelayActions.setAmount(master.delay, amount);
    },
    setDelayRate: (master: MasterData, rate: number): void => {
        DelayActions.setRate(master.delay, rate);
    }
};
