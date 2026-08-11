import { saveDatabase } from '../database/init.js';

export class SyncService {
  constructor(db, networkService) {
    this.db = db;
    this.networkService = networkService;
    this.syncInterval = null;
    this.isSyncing = false;
    this.remoteApiUrl = null;
  }

  start() {
    this.syncInterval = setInterval(() => this.processQueue(), 30000);
    console.log('[Sync] Engine started (waiting for remote API configuration)');
  }

  stop() {
    if (this.syncInterval) { clearInterval(this.syncInterval); this.syncInterval = null; }
  }

  enqueue(tableName, recordId, operation, payload) {
    this.db.run(
      `INSERT INTO sync_queue (table_name, record_id, operation, payload) VALUES (?, ?, ?, ?)`,
      [tableName, recordId, operation, JSON.stringify(payload)]
    );
    saveDatabase();
  }

  async processQueue() {
    if (!this.networkService.isOnline || !this.remoteApiUrl || this.isSyncing) return;
    this.isSyncing = true;
    try {
      const result = this.db.exec(
        `SELECT * FROM sync_queue WHERE status = 'pending' AND attempts < max_attempts ORDER BY created_at ASC LIMIT 50`
      );
      if (result.length === 0) { this.isSyncing = false; return; }
      const cols = result[0].columns;
      const pending = result[0].values.map(vals => {
        const row = {};
        cols.forEach((c, i) => row[c] = vals[i]);
        return row;
      });
      for (const item of pending) await this._processItem(item);
    } catch (error) {
      console.error('[Sync] Queue processing error:', error);
    } finally { this.isSyncing = false; }
  }

  async _processItem(item) {
    try {
      this.db.run("UPDATE sync_queue SET status = 'syncing', attempts = attempts + 1 WHERE id = ?", [item.id]);
      console.log(`[Sync] Would sync: ${item.operation} on ${item.table_name}/${item.record_id}`);
    } catch (error) {
      console.error(`[Sync] Failed item ${item.id}:`, error);
      this.db.run("UPDATE sync_queue SET status = 'failed', error_message = ? WHERE id = ?", [error.message, item.id]);
    }
    saveDatabase();
  }

  getStats() {
    const result = this.db.exec(`SELECT status, COUNT(*) as count FROM sync_queue GROUP BY status`);
    const stats = { pending: 0, syncing: 0, synced: 0, failed: 0 };
    if (result.length > 0) result[0].values.forEach(row => { stats[row[0]] = row[1]; });
    return stats;
  }
}
