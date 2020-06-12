// limit value to min / max number
export const limitNumber = (value: number, min: number, max: number, isFloat = false): number => {
    if (!isFloat) {
        value = Math.floor(value);
    }
    value = Math.max(min, value);
    value = Math.min(max, value);
    return value;
};
