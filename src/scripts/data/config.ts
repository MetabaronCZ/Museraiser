/* eslint-disable no-underscore-dangle */
declare const __ENVIRONMENT__: string;
export const IS_DEV = ('dev' === __ENVIRONMENT__);
/* eslint-enable no-underscore-dangle */

export const APP = Object.freeze({
    UNDO: {
        DEFAULT: 20,
        MIN: 0,
        MAX: 100
    },
    REDO: {
        DEFAULT: 20,
        MIN: 0,
        MAX: 100
    }
});

export const PROJECT = Object.freeze({
    FILE: {
        EXT: 'museproj',
        NAME: 'New project'
    },
    SAMPLE: {
        RATE: 44100
    },
    NAME: {
        MIN: 1,
        MAX: 24
    },
    TEMPO: {
        DEFAULT: 128,
        MIN: 1,
        MAX: 500
    }
});

export const RECENT_PROJECTS = Object.freeze({
    MAX: 15,
    VALUES: [0, 5, 10, 15, 20, 30, 50, 100] as const
});

export const VOLUME = Object.freeze({
    DEFAULT: 100,
    MIN: 0,
    MAX: 127
});
