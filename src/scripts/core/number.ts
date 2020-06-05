// limit value to min / max number
export const limitNumber = (value: number, min: number, max: number): number => {
    value = Math.floor(value);
    value = Math.max(min, value);
    value = Math.min(max, value);
    return value;
};
