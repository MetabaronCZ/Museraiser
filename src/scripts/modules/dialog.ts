import { remote, FileFilter } from 'electron';

import { TXT } from 'data/texts';
import { PROJECT_FILE_EXT } from 'data/config';

const defPositive = TXT.dialogue.positive;
const defNegative = TXT.dialogue.negative;

type AskDialog = Promise<boolean>;
type FileDialog = Promise<string>;

type AppFilter = 'PROJECT';

type AppFilters = {
    readonly [type in AppFilter]: FileFilter[];
};
const filters: AppFilters = {
    PROJECT: [{ name: 'Project files', extensions: [PROJECT_FILE_EXT] }]
};

export const ask = (text: string, positive = defPositive, negative = defNegative): AskDialog => {
    return new Promise((resolve, reject) => {
        const dialog = remote.dialog.showMessageBox({
            message: text,
            buttons: [negative, positive]
        });

        dialog
            .then(result => resolve(1 === result.response))
            .catch(reject);
    });
};

export const selectFile = (filter: AppFilter): FileDialog => {
    return new Promise((resolve, reject) => {
        const dialog = remote.dialog.showOpenDialog({
            properties: ['openFile'],
            filters: filters[filter]
        });

        dialog
            .then(result => resolve(result.filePaths[0]))
            .catch(reject);
    });
};
