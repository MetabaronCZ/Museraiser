import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Test as T } from 'modules/test';
import { State, AppDispatch } from 'modules/store';

const click = (cb: Function) => (e: React.MouseEvent) => {
    e.preventDefault();
    cb();
};

export const Test: React.SFC = () => {
    const test = useSelector<State>(state => state.test.value);
    const dispatch = useDispatch<AppDispatch>();
    return (
        <div>
            TEST: {test}
            <br />

            <button type="button" onClick={click(() => dispatch(T.actions.dec(1)))}>
                Dec
            </button>

            <button type="button" onClick={click(() => dispatch(T.actions.inc(1)))}>
                Inc
            </button>
        </div>
    );
};
