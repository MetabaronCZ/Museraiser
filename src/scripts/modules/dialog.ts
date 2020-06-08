import p from 'path';
import { remote, FileFilter } from 'electron';

import { TXT } from 'data/texts';
import { PROJECT } from 'data/config';

const defPositive = TXT.dialog.positive;
const defNegative = TXT.dialog.negative;

type AskDialog = Promise<boolean>;
type FileDialog = Promise<string>;

type AppFilter = 'PROJECT';

type AppFilters = {
    readonly [type in AppFilter]: FileFilter[];
};
const filters: AppFilters = {
    PROJECT: [{ name: 'Project files', extensions: [PROJECT.FILE.EXT] }]
};

interface ContextItem {
    readonly title: string;
    readonly onClick: () => void;
}

export const Dialog = {
    ask: (text: string, positive = defPositive, negative = defNegative): AskDialog => {
        return new Promise((resolve, reject) => {
            const dialog = remote.dialog.showMessageBox({
                message: text,
                title: TXT.app.title,
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
                filters: filters[filter]
            });

            dialog
                .then(result => resolve(result.filePath))
                .catch(reject);
        });
    },
    showError: (title: string, msg: string): void => {
        remote.dialog.showErrorBox(title, msg);
    },
    contextMenu: (items: ContextItem[]): void => {
        const menu = new remote.Menu();

        for (const { title, onClick } of items) {
            const item = new remote.MenuItem({
                label: title,
                click: onClick
            });
            menu.append(item);
        }
        menu.popup();
    }
};
