import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

import { loadFromStorage, saveToStorage } from 'modules/storage';

const STORAGE_KEY = 'SETTINGS';

export interface SettingsData {
    /* */
}

const load = (): SettingsData => {
    return loadFromStorage<SettingsData>(STORAGE_KEY, {});
};

const save = (state: SettingsData): void => {
    saveToStorage<SettingsData>(STORAGE_KEY, state);
};

type SettingsReducers = {
    readonly test: CaseReducer<SettingsData, PayloadAction>;
};

export const Settings = createSlice<SettingsData, SettingsReducers>({
    name: 'settings',
    initialState: load(),
    reducers: {
        test: state => {
            save(state);
            return state;
        }
    }
});
