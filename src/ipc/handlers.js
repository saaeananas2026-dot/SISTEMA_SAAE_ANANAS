import { ipcMain, app } from 'electron';
import { AuthService } from '../services/authService.js';
import { NetworkService } from '../services/networkService.js';
import { SyncService } from '../services/syncService.js';
import { saveDatabase } from '../database/init.js';
import { getLocalServerInfo } from '../server/index.js';

let authService;
let networkService;
let syncService;

export function registerIpcHandlers(db) {
  authService = new AuthService(db);
  networkService = new NetworkService();
  syncService = new SyncService(db, networkService);

  networkService.start();
  syncService.start();
  authService.cleanupExpiredSessions();

  ipcMain.handle('auth:login', async (_event, matricula, senha) => authService.login(matricula, senha));
  ipcMain.handle('auth:logout', async () => authService.logout());
  ipcMain.handle('auth:check-session', async (_event, token) => authService.checkSession(token));
  ipcMain.handle('auth:get-current-user', async () => authService.getCurrentUser());

  ipcMain.handle('network:get-status', async () => networkService.getStatus());

  ipcMain.handle('db:query', async (_event, sql, params = []) => {
    // raw SQL queries are no longer supported with MongoDB
    console.warn('[IPC] db:query called but raw SQL is not supported with MongoDB', sql);
    return { success: true, data: [] };
  });

  ipcMain.handle('db:execute', async (_event, sql, params = []) => {
    // raw SQL execute is no longer supported with MongoDB
    console.warn('[IPC] db:execute called but raw SQL is not supported with MongoDB', sql);
    return { success: true, changes: 0 };
  });

  ipcMain.handle('app:get-version', async () => app.getVersion());
  ipcMain.handle('app:get-server-info', async () => getLocalServerInfo());

  console.log('[IPC] All handlers registered');
}
