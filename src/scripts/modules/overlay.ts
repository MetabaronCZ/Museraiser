import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'modules/store';

export type OverlayID = null | 'CREATE' | 'PROJECT' | 'SETTINGS';

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

export const openOverlay = (id: OverlayID): AppThunk => dispatch => {
    dispatch(Overlay.actions.set(id));
};

export const closeOverlay = (): AppThunk => dispatch => {
    dispatch(Overlay.actions.set(null));
};
