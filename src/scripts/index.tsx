import React from 'react';
import { render } from 'react-dom';

import { TXT } from 'data/texts';
import { PageUI } from 'ui/Page';

document.title = TXT.app.title;

const root = document.querySelector('.Container');
render(<PageUI />, root);
