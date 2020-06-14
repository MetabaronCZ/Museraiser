import { SEQUENCER } from 'data/config';
import { Tracks } from 'modules/project/tracks';

const { BAR } = SEQUENCER;

export interface Bar {
    readonly id: number;
}

export const createBars = (tracks: Tracks): Bar[] => {
    let count = BAR.PERPAGE;

    main: for (const { sequences } of Object.values(tracks)) {
        for (const { start, length } of sequences) {
            const ptnEnd = start + length;
            count = Math.max(ptnEnd, count);

            if (count >= BAR.MAX) {
                count = Math.min(count, BAR.MAX);
                break main;
            }
        }
    }

    return Array(count).fill(0).map((_, i) => ({
        id: i
    }));
};
