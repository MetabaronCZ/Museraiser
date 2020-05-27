import { configureStore } from '@reduxjs/toolkit';
import { TestState, Test } from 'modules/test';

export interface State {
    readonly test: TestState;
}

export const store = configureStore<State>({
    reducer: {
        test: Test.reducer
    }
});
