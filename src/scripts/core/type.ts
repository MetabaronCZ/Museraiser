// change readonly object type to writable
type Writeable<T> = {
    -readonly [key in keyof T]: T[key]
};

// make readonly object editable
export type Editable<T extends Record<string, any>> = Partial<Writeable<T>>;
