import { limitNumber } from 'core/number';
import { MASTER } from 'data/config';

import { DelayData } from 'modules/project/delay';

const { AMOUNT, RATE } = MASTER.DELAY;

export const Delay = {
    setAmount: (delay: DelayData, amount: number): void => {
        amount = limitNumber(amount, AMOUNT.MIN, AMOUNT.MAX);
        delay.amount = amount;
    },
    setRate: (delay: DelayData, rate: number): void => {
        rate = limitNumber(rate, RATE.MIN, RATE.MAX);
        delay.rate = rate;
    }
};
