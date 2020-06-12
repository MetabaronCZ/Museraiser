import { ReverbID } from 'modules/project/reverb';

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

export const RECENT_PROJECTS = Object.freeze({
    MAX: 15,
    VALUES: [0, 5, 10, 15, 20, 30, 50, 100] as const
});

export const PROJECT = Object.freeze({
    FILE: {
        EXT: ['museproj'],
        AUTHOR: '',
        DESCRIPTION: ''
    },
    SAMPLE: {
        EXT: ['wav', 'mp3', 'mp4', 'ogg', 'flac'], // https://en.wikipedia.org/wiki/HTML5_audio
        RATE: 44100
    },
    NAME: {
        DEFAULT: 'New project',
        MIN: 1,
        MAX: 24
    },
    AUTHOR: {
        MIN: 0,
        MAX: 24
    },
    DESCRIPTION: {
        MIN: 0,
        MAX: 150
    },
    TEMPO: {
        DEFAULT: 128,
        MIN: 1,
        MAX: 500
    }
});

export const TRACK = Object.freeze({
    NAME: {
        MIN: 1,
        MAX: 16
    },
    VOLUME: {
        DEFAULT: 90,
        MIN: 0,
        MAX: 100
    },
    PAN: {
        DEFAULT: 0,
        MIN: -100,
        MAX: +100
    },
    DELAY: {
        DEFAULT: 0,
        MIN: 0,
        MAX: 100
    },
    REVERB: {
        DEFAULT: 0,
        MIN: 0,
        MAX: 100
    }
});

export const MASTER = Object.freeze({
    VOLUME: {
        DEFAULT: 100,
        MIN: 0,
        MAX: 100
    },
    DELAY: {
        AMOUNT: {
            DEFAULT: 0,
            MIN: 0,
            MAX: 100
        },
        RATE: {
            DEFAULT: 0,
            MIN: 0,
            MAX: 10
        }
    },
    REVERB: {
        TYPE: {
            DEFAULT: 'ROOM' as ReverbID
        },
        DEPTH: {
            DEFAULT: 50,
            MIN: 0,
            MAX: 100
        }
    }
});

export const SAMPLE = Object.freeze({
    VOLUME: {
        DEFAULT: 100,
        MIN: 0,
        MAX: 100
    },
    FILTER: {
        CUTOFF: {
            DEFAULT: 0,
            MIN: 0,
            MAX: 100
        },
        RESONANCE: {
            DEFAULT: 0,
            MIN: 0,
            MAX: 100
        }
    }
});

export const SEQUENCER = Object.freeze({
    BAR: {
        PERPAGE: 16,
        PAGING: 10,
        MAX: 999
    }
});
