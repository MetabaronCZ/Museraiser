export type OnClick = () => void;
export type OnChange<T extends string | number = string> = (value: T) => void;

export const clickOnly = <T extends HTMLElement>(cb: OnClick) => (e: React.MouseEvent<T>) => {
    e.preventDefault();
    cb();
};

type Changeble = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export const changeOnly = <T extends Changeble>(cb: OnChange) => (e: React.ChangeEvent<T>) => {
    const { value } = e.currentTarget;
    cb(value);
};
