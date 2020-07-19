import { limitNumber } from 'core/number';

import { NOTE } from 'data/config';

import { VolumeData } from 'modules/project/volume';
import { EnvelopeData } from 'modules/project/envelope';

const { VELOCITY } = NOTE;

const VOLUME_MIN = 0;
const VOLUME_MAX = 1;

export const createGainNode = (ctx: AudioContext, data: VolumeData, envelope?: EnvelopeData, velocity = VELOCITY.MAX): GainNode => {
    const attack = envelope ? envelope.attack : 0;
    const decay = envelope ? envelope.decay : 0;
    const sustain = envelope ? envelope.sustain : 100;

    const now = ctx.currentTime;
    const gain = ctx.createGain();

    velocity = limitNumber(velocity, VELOCITY.MIN, VELOCITY.MAX);
    velocity = velocity / VELOCITY.MAX;

    const volume = limitNumber(velocity * (data.gain / 100), VOLUME_MIN, VOLUME_MAX, true);

    const attackTime = now + attack;
    const decayTime = attackTime + decay;
    const sustainValue = volume * sustain / 100;

    gain.gain.setValueAtTime(VOLUME_MIN, now);
    gain.gain.linearRampToValueAtTime(volume, attackTime);
    gain.gain.linearRampToValueAtTime(sustainValue, decayTime);

    return gain;
};
