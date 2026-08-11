import { app, BrowserWindow } from 'electron';
import path from 'path';
import { initDatabase, closeDatabase } from './database/init.js';
import { registerIpcHandlers } from './ipc/handlers.js';
import { startLocalServer, stopLocalServer } from './server/index.js';

// Handle Squirrel events for Windows installer
try {
  const startup = require('electron-squirrel-startup');
  if (startup) app.quit();
} catch (e) { /* not in squirrel context */ }

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1024,
    minHeight: 700,
    title: 'SAAE ERP - Sistema Integrado',
    frame: true,
    backgroundColor: '#0D47A1',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools({ mode: 'detach' });
  }
};

app.whenReady().then(async () => {
  const db = await initDatabase();
  registerIpcHandlers(db);
  startLocalServer();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  stopLocalServer();
  closeDatabase();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
