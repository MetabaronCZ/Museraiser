import produce from 'immer';
import { createSlice, CaseReducer, PayloadAction } from '@reduxjs/toolkit';

export interface SettingsData {
    active: boolean
}

type SettingsReducers = {
    readonly toggle: CaseReducer<SettingsData, PayloadAction>;
};

export const Settings = createSlice<SettingsData, SettingsReducers>({
    name: 'settings',
    initialState: {
        active: false
    },
    reducers: {
        toggle: state => produce(state, draft => {
            draft.active = !draft.active;
            return draft;
        })
    }
});
