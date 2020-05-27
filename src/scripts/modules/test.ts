import produce from 'immer';
import { createSlice, PayloadAction, CaseReducer } from '@reduxjs/toolkit';

export interface TestState {
    value: number;
}

type ValueReducer = CaseReducer<TestState, PayloadAction<number>>;

type TestReducers = {
    readonly set: ValueReducer;
    readonly inc: ValueReducer;
    readonly dec: ValueReducer;
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
