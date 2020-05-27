import React from 'react';
import { useSelector } from 'react-redux';

import { State } from 'store';

export const Test: React.SFC = () => {
    const test = useSelector<State>(state => state.test.value);
    return (
        <div>
            TEST: {test}
        </div>
    );
};
