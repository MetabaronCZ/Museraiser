import { MasterData } from 'modules/project/master';
import { Reverb } from 'modules/project/reverb/actions';
import { Volume } from 'modules/project/volume/actions';

export const Master = {
    setVolume: (master: MasterData, gain: number): void => {
        Volume.setGain(master.volume, gain);
    },
    setReverbDepth: (master: MasterData, depth: number): void => {
        Reverb.setDepth(master.reverb, depth);
    },
    setReverbDampening: (master: MasterData, dampening: number): void => {
        Reverb.setDampening(master.reverb, dampening);
    }
};
