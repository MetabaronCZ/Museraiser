import produce from 'immer';
import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

export interface TestData {
    value: number;
}

type TestReducer = CaseReducer<TestData, PayloadAction<number>>;

type TestReducers = {
    readonly set: TestReducer;
    readonly inc: TestReducer;
    readonly dec: TestReducer;
};

export const Test = createSlice<TestData, TestReducers>({
    name: 'test',
    initialState: {
        value: 0
    },
    reducers: {
        set: (state, action) => produce(state, draft => {
            draft.value = action.payload;
            return draft;
        }),
        inc: (state, action) => produce(state, draft => {
            draft.value += action.payload;
            return draft;
        }),
        dec: (state, action) => produce(state, draft => {
            draft.value -= action.payload;
            return draft;
        })
    }
});
