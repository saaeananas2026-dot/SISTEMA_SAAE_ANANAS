const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Authentication
  auth: {
    login: (matricula, senha) => ipcRenderer.invoke('auth:login', matricula, senha),
    logout: () => ipcRenderer.invoke('auth:logout'),
    checkSession: () => ipcRenderer.invoke('auth:check-session'),
    getCurrentUser: () => ipcRenderer.invoke('auth:get-current-user')
  },

  // Network status
  network: {
    getStatus: () => ipcRenderer.invoke('network:get-status'),
    onStatusChange: (callback) => {
      const listener = (_event, status) => callback(status);
      ipcRenderer.on('network:status-changed', listener);
      // Return cleanup function
      return () => ipcRenderer.removeListener('network:status-changed', listener);
    }
  },

  // Database operations (generic)
  db: {
    query: (sql, params) => ipcRenderer.invoke('db:query', sql, params),
    execute: (sql, params) => ipcRenderer.invoke('db:execute', sql, params)
  },

  // App info
  app: {
    getVersion: () => ipcRenderer.invoke('app:get-version'),
    getPlatform: () => process.platform,
    getServerInfo: () => ipcRenderer.invoke('app:get-server-info')
  }
});
