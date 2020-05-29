import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from 'modules/store';

export type OverlayID = null | 'CREATE' | 'SETTINGS';

type OverlayReducers = {
    readonly set: CaseReducer<OverlayID, PayloadAction<OverlayID>>;
};

export const Overlay = createSlice<OverlayID, OverlayReducers>({
    name: 'view',
    initialState: null,
    reducers: {
        set: (state, action) => action.payload
    }
});

export const openOverlay = (dispatch: AppDispatch, id: OverlayID): void => {
    dispatch(Overlay.actions.set(id));
};

export const closeOverlay = (dispatch: AppDispatch): void => {
    dispatch(Overlay.actions.set(null));
};
