/* eslint-disable no-underscore-dangle */
declare const __ENVIRONMENT__: string;
export const IS_DEV = ('dev' === __ENVIRONMENT__);
/* eslint-enable no-underscore-dangle */

// project files
export const PROJECT_FILE_EXT = 'museproj';
export const PROJECT_FILE_NAME = 'New project';
export const PROJECT_SAMPLE_RATE = 44100;
export const PROJECT_NAME_MIN = 1;
export const PROJECT_NAME_MAX = 24;
export const PROJECT_TEMPO = 128;
export const PROJECT_TEMPO_MIN = 1;
export const PROJECT_TEMPO_MAX = 500;

// settings
export const RECENT_PROJECTS_MAX = 15;
export const RECENT_PROJECTS_VALUES = [0, 5, 10, 15, 20, 30, 50, 100] as const;
