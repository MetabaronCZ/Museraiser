import { MASTER } from 'data/config';

const { AMOUNT, RATE } = MASTER.DELAY;

export interface Delay {
    amount: number;
    rate: number;
}

export interface DelaySnapshot {
    readonly amount: number;
    readonly rate: number;
}

export const createDelay = (): Delay => ({
    amount: AMOUNT.DEFAULT,
    rate: RATE.DEFAULT
});

export const parseDelay = (data: any): Delay => ({
    amount: parseInt(data.amount, 10),
    rate: parseInt(data.rate, 10)
});

export const serializeDelay = (delay: Delay): DelaySnapshot => ({
    ...delay
});
