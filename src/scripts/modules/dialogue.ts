import { remote } from 'electron';
import { TXT } from 'data/texts';

const defPositive = TXT.dialogue.positive;
const defNegative = TXT.dialogue.negative;

type Dialogue = Promise<boolean>;

export const ask = (text: string, positive = defPositive, negative = defNegative): Dialogue => {
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
