import { BrowserWindow } from 'electron';
import https from 'https';

export class NetworkService {
  constructor() {
    this.isOnline = false;
    this.checkInterval = null;
    this.pingUrl = 'https://www.google.com';
    this.checkIntervalMs = 15000;
  }

  start() {
    this._checkConnectivity();
    this.checkInterval = setInterval(() => this._checkConnectivity(), this.checkIntervalMs);
    console.log('[Network] Monitoring started');
  }

  stop() {
    if (this.checkInterval) { clearInterval(this.checkInterval); this.checkInterval = null; }
  }

  getStatus() {
    return { online: this.isOnline, label: this.isOnline ? 'Online' : 'Offline' };
  }

  _checkConnectivity() {
    const req = https.get(this.pingUrl, { timeout: 5000 }, () => {
      const wasOffline = !this.isOnline;
      this.isOnline = true;
      if (wasOffline) { this._notifyRenderer(); console.log('[Network] Status: Online'); }
    });
    req.on('error', () => {
      const wasOnline = this.isOnline;
      this.isOnline = false;
      if (wasOnline) { this._notifyRenderer(); console.log('[Network] Status: Offline'); }
    });
    req.on('timeout', () => {
      req.destroy();
      const wasOnline = this.isOnline;
      this.isOnline = false;
      if (wasOnline) { this._notifyRenderer(); console.log('[Network] Status: Offline (timeout)'); }
    });
  }

  _notifyRenderer() {
    const windows = BrowserWindow.getAllWindows();
    const status = this.getStatus();
    for (const win of windows) {
      if (!win.isDestroyed()) win.webContents.send('network:status-changed', status);
    }
  }
}
