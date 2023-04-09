// @ts-check

const { ipcRenderer } = require('electron');

ipcRenderer.send('dc-setWindowOpenHandler');

window.addEventListener('keydown', event => {
  if (event.code === 'F12') {
    ipcRenderer.send('dev-openDevTool');
  }
});
