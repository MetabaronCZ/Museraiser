/* eslint @typescript-eslint/explicit-function-return-type: "off" */
const { app, BrowserWindow } = require('electron');

const pathRoot = __dirname;
const env = process.argv.slice(2)[0] || 'prod';
const isDev = ('dev' === env);

const createWindow = () => {
    const win = new BrowserWindow({
        icon: `${pathRoot}/icon.ico`,
        minWidth: 800,
        minHeight: 600,
        show: false,
        resizable: true,
        useContentSize: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.setMenuBarVisibility(false);

    win.loadFile(`${pathRoot}/index.html`);

    win.maximize();
    win.show();

    if (isDev) {
        win.webContents.openDevTools({ mode: 'right' });
    }
};

app.on('ready', createWindow);
