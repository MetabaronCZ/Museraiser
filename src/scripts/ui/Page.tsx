import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'modules/store';

import { Test } from 'ui/Test';
import { Logo } from 'ui/common/Logo';
import { Copyright } from 'ui/common/Copyright';

export const Page: React.SFC = () => (
    <Provider store={store}>
        <div className="Page">
            <header className="Page-header">
                <Logo />
            </header>

            <main className="Page-content">
                <Test />
            </main>

            <footer className="Page-footer">
                <Copyright />
            </footer>
        </div>
    </Provider>
);
