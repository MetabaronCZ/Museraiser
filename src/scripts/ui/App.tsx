import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'store';
import { Test } from 'ui/Test';

export const App: React.SFC = () => (
    <Provider store={store}>
        <div className="App">
            <Test />
        </div>
    </Provider>
);
