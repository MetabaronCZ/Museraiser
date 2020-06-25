import { TXT } from 'data/texts';

import { AppDispatch } from 'modules/store';
import { Dialog, ContextItem } from 'modules/dialog';
import { TrackID } from 'modules/project/tracks/track';
import { createTrackPattern, removeTrackPattern } from 'modules/project/actions';

const getEmptyBarMenu = (dispatch: AppDispatch, track: TrackID, bar: number): ContextItem[] => [
    {
        title: TXT.track.createPattern,
        onClick: () => dispatch(createTrackPattern(track, bar))
    }
];

const getSequenceBarMenu = (dispatch: AppDispatch, track: TrackID, bar: number): ContextItem[] => [
    {
        title: TXT.track.removePattern,
        onClick: () => dispatch(removeTrackPattern(track, bar))
    }
];

export const getBarMenu = (dispatch: AppDispatch, track: TrackID, bar: number, isSequence: boolean) => () => {
    return Dialog.contextMenu(
        !isSequence
            ? getEmptyBarMenu(dispatch, track, bar)
            : getSequenceBarMenu(dispatch, track, bar)
    );
};
