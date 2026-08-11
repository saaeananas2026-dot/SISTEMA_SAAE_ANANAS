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
    try {
      const result = db.exec(sql, params);
      if (result.length === 0) return { success: true, data: [] };
      const cols = result[0].columns;
      const data = result[0].values.map(vals => {
        const row = {};
        cols.forEach((c, i) => row[c] = vals[i]);
        return row;
      });
      return { success: true, data };
    } catch (error) { return { success: false, error: error.message }; }
  });

  ipcMain.handle('db:execute', async (_event, sql, params = []) => {
    try {
      db.run(sql, params);
      saveDatabase();
      return { success: true, changes: db.getRowsModified() };
    } catch (error) { return { success: false, error: error.message }; }
  });

  ipcMain.handle('app:get-version', async () => app.getVersion());
  ipcMain.handle('app:get-server-info', async () => getLocalServerInfo());

  console.log('[IPC] All handlers registered');
}
