import { limitNumber } from 'core/number';
import { ENVELOPE } from 'data/config';

import { EnvelopeData } from 'modules/project/envelope';

const { ATTACK, DECAY, SUSTAIN, RELEASE } = ENVELOPE;

export const Envelope = {
    setAttack: (env: EnvelopeData, attack: number): void => {
        attack = limitNumber(attack, ATTACK.MIN, ATTACK.MAX);
        env.attack = attack;
    },
    setDecay: (env: EnvelopeData, decay: number): void => {
        decay = limitNumber(decay, DECAY.MIN, DECAY.MAX);
        env.decay = decay;
    },
    setSusutain: (env: EnvelopeData, sustain: number): void => {
        sustain = limitNumber(sustain, SUSTAIN.MIN, SUSTAIN.MAX);
        env.sustain = sustain;
    },
    setRelease: (env: EnvelopeData, release: number): void => {
        release = limitNumber(release, RELEASE.MIN, RELEASE.MAX);
        env.release = release;
    }
};
