import produce from 'immer';
import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

export interface TestState {
    value: number;
}

type TestReducers = {
    readonly set: CaseReducer<TestState, PayloadAction<number>>;
};

export const Test = createSlice<TestState, TestReducers>({
    name: 'test',
    initialState: {
        value: 0
    },
    reducers: {
        set: (state, action) => produce(state, draft => {
            draft.value = action.payload;
            return draft;
        })
    }
});
