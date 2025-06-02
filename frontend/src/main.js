const { app, BrowserWindow } = require('electron');
const path = require('path');

console.log('Pasta de dados do app:', app.getPath('userData'));

function createWindow () {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
  createWindow();
});
