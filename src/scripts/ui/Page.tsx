import React from 'react';
import { Provider } from 'react-redux';

import { store } from 'modules/store';

import { RouterUI } from 'ui/Router';
import { Logo } from 'ui/components/Logo';
import { Menu } from 'ui/components/Menu';
import { Copyright } from 'ui/components/Copyright';
import { Keybindings } from 'ui/components/Keybindings';
import { WindowActions } from 'ui/components/WindowActions';
import { SettingsActions } from 'ui/components/SettingsActions';

export const PageUI: React.SFC = () => (
    <Provider store={store}>
        <Keybindings />

        <div className="Page">
            <header className="Page-header">
                <div className="Page-header-item">
                    <Logo />
                </div>

                <div className="Page-header-item">
                    <Menu />
                </div>

                <div className="Page-header-item">
                    <WindowActions />
                </div>
            </header>

            <main className="Page-content">
                <RouterUI />
            </main>

            <footer className="Page-footer">
                <div className="Page-footer-copyright">
                    <Copyright />
                </div>

                <div className="Page-footer-actions">
                    <SettingsActions />
                </div>
            </footer>
        </div>
    </Provider>
);
