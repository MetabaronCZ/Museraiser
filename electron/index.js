/* eslint @typescript-eslint/explicit-function-return-type: "off" */
const { app, BrowserWindow } = require('electron');

const pathRoot = __dirname;
const env = process.argv.slice(2)[0] || 'prod';
const isDev = ('dev' === env);

const createWindow = () => {
    const win = new BrowserWindow({
        icon: `${pathRoot}/icon.ico`,
        minWidth: 1024,
        minHeight: 768,
        show: false,
        frame: false,
        resizable: true,
        useContentSize: true,
        webPreferences: {
            spellcheck: false,
            nodeIntegration: true,
            enableRemoteModule: true
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
