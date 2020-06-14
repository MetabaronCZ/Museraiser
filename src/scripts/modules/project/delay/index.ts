import { MASTER } from 'data/config';

const { AMOUNT, RATE } = MASTER.DELAY;

export interface DelayData {
    amount: number;
    rate: number;
}

export interface DelaySnapshot {
    readonly amount: number;
    readonly rate: number;
}

export const createDelay = (): DelayData => ({
    amount: AMOUNT.DEFAULT,
    rate: RATE.DEFAULT
});

export const parseDelay = (data: any): DelayData => ({
    amount: parseInt(data.amount, 10),
    rate: parseInt(data.rate, 10)
});

export const serializeDelay = (delay: DelayData): DelaySnapshot => ({
    ...delay
});
