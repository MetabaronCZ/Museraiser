import { Logger } from 'modules/logger';

export const saveToStorage = <T>(key: string, data: T): void => {
    try {
        const save = JSON.stringify(data);
        localStorage.setItem(key, save);
    } catch (err) {
        Logger.error(`Could not save storage data for ${key}`);
    }
};

export const loadFromStorage = <T>(key: string, fallback: T): T => {
    const saved = localStorage.getItem(key) || '';
    try {
        return JSON.parse(saved) as T;
    } catch (err) {
        Logger.error(`Invalid storage data for ${key}. Saving default...`);
        saveToStorage(key, fallback);
        return fallback;
    }
};
