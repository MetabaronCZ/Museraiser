import fs from 'fs';
import { Logger } from 'modules/logger';

export const getFileStats = (path: string): fs.Stats | null => {
    try {
        const stats = fs.statSync(path);

        if (stats.isFile()) {
            return stats;
        }
    } catch (err) {
        // invalid file
        Logger.error(`Invalid file "${path}":`, err);
    }
    return null;
};
