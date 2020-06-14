import { limitNumber } from 'core/number';
import { MASTER } from 'data/config';

import { Delay } from 'modules/project/delay';

const { AMOUNT, RATE } = MASTER.DELAY;

export const DelayActions = {
    setAmount: (delay: Delay, amount: number): void => {
        amount = limitNumber(amount, AMOUNT.MIN, AMOUNT.MAX);
        delay.amount = amount;
    },
    setRate: (delay: Delay, rate: number): void => {
        rate = limitNumber(rate, RATE.MIN, RATE.MAX);
        delay.rate = rate;
    }
};
