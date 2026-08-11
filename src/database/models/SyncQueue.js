import mongoose from 'mongoose';

const syncQueueSchema = new mongoose.Schema({
  table_name: { type: String, required: true },
  record_id: { type: String, required: true },
  operation: { type: String, required: true },
  payload: { type: String },
  status: { type: String, default: 'pending', index: true },
  attempts: { type: Number, default: 0 },
  max_attempts: { type: Number, default: 5 },
  error_message: { type: String },
  created_at: { type: Date, default: Date.now },
  synced_at: { type: Date }
});

export const SyncQueue = mongoose.model('SyncQueue', syncQueueSchema);
