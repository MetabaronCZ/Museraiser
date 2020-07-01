import { PatternData } from 'modules/project/pattern';
import { PATTERN } from 'data/config';

const { NAME } = PATTERN;

export const Pattern = {
    setname: (pattern: PatternData, name: string): void => {
        name = name.substring(0, NAME.MAX);
        pattern.name = name;
    }
};
