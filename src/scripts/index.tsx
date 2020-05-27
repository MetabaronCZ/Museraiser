import React from 'react';
import { render } from 'react-dom';

import { TXT } from 'data/texts';
import { App } from 'ui/App';

document.title = TXT.app.title;

const root = document.querySelector('.App');
render(<App />, root);
