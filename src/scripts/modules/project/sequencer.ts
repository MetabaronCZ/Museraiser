import { SEQUENCER } from 'data/config';

import { TracksData } from 'modules/project/tracks';
import { TrackData } from 'modules/project/tracks/track';

const { BAR } = SEQUENCER;

export interface Bar {
    readonly id: number;
}

export interface BarInfo {
    readonly title: string;
    readonly isFirst: boolean;
    readonly isLast: boolean;
    readonly pattern: string;
    readonly sequence: string;
}

export const createBars = (tracks: TracksData): Bar[] => {
    let count = BAR.PERPAGE;

    main: for (const { sequences, patterns } of Object.values(tracks)) {
        for (const { id, pattern: patternID, start} of sequences) {
            const pattern = patterns.find(ptn => patternID === ptn.id);

            if (!pattern) {
                throw new Error(`Could not create bars: invalid sequence ${id}`);
            }
            const ptnEnd = start + pattern.length;
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

export const getBarInfo = (track: TrackData, bar: number): BarInfo | null => {
    const { patterns, sequences } = track;

    for (const seq of sequences) {
        const ptn = patterns.find(p => seq.pattern === p.id);

        if (!ptn) {
            continue;
        }
        const start = seq.start;
        const end = start + ptn.length - 1;

        if (start <= bar && end >= bar) {
            return {
                title: ptn.name,
                pattern: ptn.id,
                sequence: seq.id,
                isFirst: bar === start,
                isLast: bar === end
            };
        }
    }
    return null;
};
