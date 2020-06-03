import p from 'path';
import { remote, FileFilter } from 'electron';

import { TXT } from 'data/texts';
import { PROJECT_FILE_EXT } from 'data/config';

const defPositive = TXT.dialog.positive;
const defNegative = TXT.dialog.negative;

type AskDialog = Promise<boolean>;
type FileDialog = Promise<string>;

type AppFilter = 'PROJECT';

type AppFilters = {
    readonly [type in AppFilter]: FileFilter[];
};
const filters: AppFilters = {
    PROJECT: [{ name: 'Project files', extensions: [PROJECT_FILE_EXT] }]
};

export const Dialog = {
    ask: (text: string, positive = defPositive, negative = defNegative): AskDialog => {
        return new Promise((resolve, reject) => {
            const dialog = remote.dialog.showMessageBox({
                message: text,
                buttons: [negative, positive]
            });

            dialog
                .then(result => resolve(1 === result.response))
                .catch(reject);
        });
    },
    openFile: (path: string, filter: AppFilter): FileDialog => {
        return new Promise((resolve, reject) => {
            const dialog = remote.dialog.showOpenDialog({
                defaultPath: path,
                properties: ['openFile'],
                filters: filters[filter]
            });

            dialog
                .then(result => resolve(result.filePaths[0]))
                .catch(reject);
        });
    },
    saveFile: (path: string, filter: AppFilter, title?: string): FileDialog => {
        return new Promise((resolve, reject) => {
            const dialog = remote.dialog.showSaveDialog({
                defaultPath: p.resolve(path, title || ''),
                title,
                filters: filters[filter]
            });

            dialog
                .then(result => resolve(result.filePath))
                .catch(reject);
        });
    },
    showError: (title: string, msg: string): void => {
        remote.dialog.showErrorBox(title, msg);
    }
};
