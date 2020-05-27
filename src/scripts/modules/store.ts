import { configureStore } from '@reduxjs/toolkit';

import { TestData, Test } from 'modules/test';
import { SettingsData, Settings } from 'modules/settings';

export interface State {
    readonly test: TestData;
    readonly settings: SettingsData;
}

export const store = configureStore<State>({
    reducer: {
        test: Test.reducer,
        settings: Settings.reducer
    }
});

export type AppDispatch = typeof store.dispatch;

// init
store.dispatch(Settings.actions.load());
