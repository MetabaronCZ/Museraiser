import fs from 'fs';

export const readFile = (path: string): string => {
    return fs.readFileSync(path, 'utf8');
};

export const fileExists = (path: string): boolean => {
    try {
        fs.accessSync(path);
        return true;
    } catch (err) {
        return false;
    }
};
