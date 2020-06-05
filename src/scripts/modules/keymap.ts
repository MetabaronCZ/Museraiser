export type KeyID =
    'ENTER' | 'ESC' |
    'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' |
    'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

export const bindKey = (e: KeyboardEvent, ctrl: 'CTRL' | '-', shift: 'SHIFT' | '-', key: number, cb?: () => void): void => {
    const keyCode = e.keyCode || e.which;
    if (
        (
            ('-' == ctrl && !e.ctrlKey)
            || ('CTRL' === ctrl && e.ctrlKey)
        )
        && (
            ('-' == shift && !e.shiftKey)
            || ('SHIFT' === shift && e.shiftKey)
        )
        && (key === keyCode)
    ) {
        e.preventDefault();

        if (cb) {
            cb();
        }
    }
};

export const unbindKey = (e: KeyboardEvent, ctrl: 'CTRL' | '-', shift: 'SHIFT' | '-', key: number): void => {
    bindKey(e, ctrl, shift, key);
};
