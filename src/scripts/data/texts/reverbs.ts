import { ReverbID } from 'modules/project/reverb';

type ReverbTexts = {
    readonly [type in ReverbID]: string;
};

export const reverbTTexts: ReverbTexts = {
    ROOM: 'Room',
    HALL: 'Hall'
};
