import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'modules/store';

import { Test } from 'ui/Test';
import { Logo } from 'ui/components/Logo';
import { Menu } from 'ui/components/Menu';
import { Copyright } from 'ui/components/Copyright';
import { AppActions } from 'ui/components/AppActions';

export const Page: React.SFC = () => (
    <Provider store={store}>
        <div className="Page">
            <header className="Page-header">
                <div className="Page-header-item">
                    <Logo />
                </div>

                <div className="Page-header-item">
                    <Menu />
                </div>

                <div className="Page-header-item">
                    <AppActions />
                </div>
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
