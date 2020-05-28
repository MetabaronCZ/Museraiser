import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from 'modules/store';

export type OverlayData = null | 'CREATE' | 'SETTINGS';

type OverlayReducers = {
    readonly set: CaseReducer<OverlayData, PayloadAction<OverlayData>>;
};

export const Overlay = createSlice<OverlayData, OverlayReducers>({
    name: 'view',
    initialState: null,
    reducers: {
        set: (state, action) => action.payload
    }
});

export const openOverlay = (dispatch: AppDispatch, id: OverlayData): void => {
    dispatch(Overlay.actions.set(id));
};

export const closeOverlay = (dispatch: AppDispatch): void => {
    dispatch(Overlay.actions.set(null));
};
