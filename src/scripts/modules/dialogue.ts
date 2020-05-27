import { remote } from 'electron';

type Dialogue = Promise<boolean>;

export const ask = (text: string, positive: string, negative: string): Dialogue => {
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
