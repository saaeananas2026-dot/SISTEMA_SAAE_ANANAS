import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const sessionSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 },
  user_id: { type: String, required: true },
  token: { type: String, required: true, index: true },
  expires_at: { type: Date, required: true },
  created_at: { type: Date, default: Date.now }
});

export const Session = mongoose.model('Session', sessionSchema);
