import { TXT } from 'texts';

const root = document.querySelector('.App');

if (!root) {
    throw new Error('Invalid HTML structure');
}
document.title = TXT.app.title;
