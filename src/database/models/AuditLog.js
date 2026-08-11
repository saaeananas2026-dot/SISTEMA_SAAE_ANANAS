import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  user_id: { type: String },
  action: { type: String, required: true },
  details: { type: String },
  created_at: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
