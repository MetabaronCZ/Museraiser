export interface FormSelectOption {
    readonly label: string;
    readonly value: string;
}

type OptionCreationFn<T> = (item: T) => FormSelectOption;

export const createSelectOptions = <T extends any>(arr: T[], cb: OptionCreationFn<T>): FormSelectOption[] => {
    return arr.map(item => cb(item));
};
