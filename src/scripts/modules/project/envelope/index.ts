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
    attack: 0,
    decay: 0,
    release: 0,
    sustain: 0
});

export const parseEnvelope = (data: any): EnvelopeData => ({
    attack: parseInt(data.attack, 10),
    decay: parseInt(data.decay, 10),
    release: parseInt(data.release, 10),
    sustain: parseInt(data.sustain, 10)
});

export const serializeEnvelope = (env: EnvelopeData): EnvelopeSnapshot => ({
    ...env
});
