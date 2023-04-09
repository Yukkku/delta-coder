// @ts-check

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');


/** @type {Electron.BrowserWindowConstructorOptions} */
const defaultWindowOptions = {
  titleBarStyle: 'hidden',
  titleBarOverlay: {
    color: '#333',
    symbolColor: '#888',
  },
  webPreferences: {
    preload: path.join(__dirname, 'preload.js'),
  },
};

/** @param {string} type */
const createWindow = type => {
  const win = new BrowserWindow(defaultWindowOptions);

  win.loadFile('./src/index.html', {
    hash: type,
  });
};

app.whenReady().then(() => {
  ipcMain.on('dev-openDevTool', event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) {
      win.webContents.openDevTools();
    }
  });

  ipcMain.on('dc-setWindowOpenHandler', event => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (!win) return;

    win.webContents.setWindowOpenHandler(() => {
      return {
        action: 'allow',
        outlivesOpener: true,
        overrideBrowserWindowOptions: defaultWindowOptions,
      };
    });
  });

  createWindow('problem');
  createWindow('editor');

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow('problem');
      createWindow('editor');
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
