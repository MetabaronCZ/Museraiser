/* eslint-disable no-underscore-dangle */
declare const __ENVIRONMENT__: string;
export const IS_DEV = ('dev' === __ENVIRONMENT__);
/* eslint-enable no-underscore-dangle */

// files
export const PROJECT_FILE_EXT = 'museproj';

// settings
export const RECENT_PROJECTS_MAX = 15;
export const RECENT_PROJECTS_VALUES = [0, 5, 10, 15, 20, 30, 50, 100] as const;
