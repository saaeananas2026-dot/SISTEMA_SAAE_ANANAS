import { SyncQueue } from '../database/models/SyncQueue.js';

export class SyncService {
  constructor(db, networkService) {
    this.db = db; // Mongoose connection
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

  async enqueue(tableName, recordId, operation, payload) {
    try {
      await SyncQueue.create({
        table_name: tableName,
        record_id: recordId,
        operation: operation,
        payload: JSON.stringify(payload)
      });
    } catch (e) {
      console.error('[Sync] Enqueue error:', e);
    }
  }

  async processQueue() {
    if (!this.networkService.isOnline || !this.remoteApiUrl || this.isSyncing) return;
    this.isSyncing = true;
    try {
      const pending = await SyncQueue.find({ status: 'pending', attempts: { $lt: 5 } })
        .sort({ created_at: 1 })
        .limit(50);
      
      if (pending.length === 0) { this.isSyncing = false; return; }
      
      for (const item of pending) await this._processItem(item);
    } catch (error) {
      console.error('[Sync] Queue processing error:', error);
    } finally { this.isSyncing = false; }
  }

  async _processItem(item) {
    try {
      await SyncQueue.updateOne({ _id: item._id }, { $set: { status: 'syncing' }, $inc: { attempts: 1 } });
      console.log(`[Sync] Would sync: ${item.operation} on ${item.table_name}/${item.record_id}`);
      
      // Simular sucesso na nuvem por enquanto
      await SyncQueue.updateOne({ _id: item._id }, { $set: { status: 'synced', synced_at: new Date() } });
    } catch (error) {
      console.error(`[Sync] Failed item ${item._id}:`, error);
      await SyncQueue.updateOne({ _id: item._id }, { $set: { status: 'failed', error_message: error.message } });
    }
  }

  async getStats() {
    try {
      const stats = { pending: 0, syncing: 0, synced: 0, failed: 0 };
      const result = await SyncQueue.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]);
      result.forEach(row => { stats[row._id] = row.count; });
      return stats;
    } catch (e) {
      return { pending: 0, syncing: 0, synced: 0, failed: 0 };
    }
  }
}
