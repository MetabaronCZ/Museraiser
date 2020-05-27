import produce from 'immer';
import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

import { Logger } from 'modules/logger';

const STORAGE_KEY = 'SETTINGS';

export interface SettingsData {
    /* */
}

type SettingsReducers = {
    readonly load: CaseReducer<SettingsData, PayloadAction>;
    readonly save: CaseReducer<SettingsData, PayloadAction<SettingsData>>;
};

export const Settings = createSlice<SettingsData, SettingsReducers>({
    name: 'settings',
    initialState: {},
    reducers: {
        load: state => produce(state, draft => {
            const saved = localStorage.getItem(STORAGE_KEY) || '';
            try {
                return JSON.parse(saved) as Storage;
            } catch (err) {
                Logger.error(err);
                return draft;
            }
        }),
        save: state => {
            try {
                const data = JSON.stringify(state);
                localStorage.setItem(STORAGE_KEY, data);
            } catch (err) {
                Logger.error(err);
            }
        }
    }
});
