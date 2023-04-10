// @ts-check

const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.send('dc-setWindowOpenHandler');

window.addEventListener('keydown', async event => {
  if (event.code === 'F12') {
    ipcRenderer.send('dev-openDevTool');
  }
  if (event.code === 'F5') {
    alert(JSON.stringify(
      await ipcRenderer.invoke('dc-tester', 'console.log("Hello!");', 'stdin')
    ));
  }
});

contextBridge.exposeInMainWorld('dcAPI', {
  /**
   * @param {string} code
   * @param {string} stdin
   */
  async tester (code, stdin) {
    return await ipcRenderer.invoke('dc-tester', code, stdin);
  }
});
