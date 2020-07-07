import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { Dialog, ContextItem } from 'modules/dialog';
import { TrackData } from 'modules/project/tracks/track';
import { canInsertSequence } from 'modules/project/sequence';
import {
    createTrackPattern, removeTrackSequence, insertTrackPattern
} from 'modules/project/actions';

const getEmptyBarMenu = (dispatch: AppDispatch, track: TrackData, bar: number): ContextItem[] => {
    const menu: ContextItem[] = [
        {
            title: TXT.track.createPattern,
            onClick: () => dispatch(createTrackPattern(track.id, bar))
        }
    ];
    if (track.patterns.length) {
        menu.push({
            title: TXT.track.insertPattern,
            submenu: track.patterns.map(ptn => {
                return {
                    title: ptn.name,
                    disabled: !canInsertSequence(track, ptn.id, bar),
                    onClick: () => dispatch(insertTrackPattern(track.id, ptn.id, bar))
                };
            })
        });
    }
    return menu;
};

const getSequenceBarMenu = (dispatch: AppDispatch, track: TrackData, bar: number): ContextItem[] => [
    {
        title: TXT.track.removeSequence,
        onClick: () => dispatch(removeTrackSequence(track.id, bar))
    }
];

export const getBarMenu = (dispatch: AppDispatch, track: TrackData, bar: number, isSequence: boolean) => () => {
    return Dialog.contextMenu(
        !isSequence
            ? getEmptyBarMenu(dispatch, track, bar)
            : getSequenceBarMenu(dispatch, track, bar)
    );
};
