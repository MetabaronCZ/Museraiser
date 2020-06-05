import { MASTER } from 'data/config';
import { limitNumber } from 'core/number';

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

export const setDelayAmount = (delay: Delay, amount: number): void => {
    amount = limitNumber(amount, AMOUNT.MIN, AMOUNT.MAX);
    delay.amount = amount;
};

export const setDelayRate = (delay: Delay, rate: number): void => {
    rate = limitNumber(rate, RATE.MIN, RATE.MAX);
    delay.rate = rate;
};
