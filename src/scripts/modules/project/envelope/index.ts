import { ENVELOPE } from 'data/config';

const { ATTACK, DECAY, SUSTAIN, RELEASE } = ENVELOPE;

export interface EnvelopeData {
    attack: number;
    decay: number;
    sustain: number;
    release: number;
}

export interface EnvelopeSnapshot {
    readonly attack: number;
    readonly decay: number;
    readonly sustain: number;
    readonly release: number;
}

export const createEnvelope = (): EnvelopeData => ({
    attack: ATTACK.DEFAULT,
    decay: DECAY.DEFAULT,
    sustain: SUSTAIN.DEFAULT,
    release: RELEASE.DEFAULT
});

export const parseEnvelope = (data: any): EnvelopeData => ({
    attack: parseFloat(data.attack),
    decay: parseFloat(data.decay),
    sustain: parseInt(data.sustain, 10),
    release: parseFloat(data.release)
});

export const serializeEnvelope = (env: EnvelopeData): EnvelopeSnapshot => ({
    ...env
});
