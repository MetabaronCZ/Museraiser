/* eslint-disable no-console */
import { IS_DEV } from 'data/config';

export const Logger = {
    log: (...args: any) => (IS_DEV ? console.log(...args) : undefined),
    error: (...args: any) => (IS_DEV ? console.error(...args) : undefined),
    table: (...args: any) => (IS_DEV ? console.table(...args) : undefined)
};
