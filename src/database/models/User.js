import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4 }, 
  nome: { type: String, required: true },
  matricula: { type: String, required: true, unique: true, index: true },
  email: { type: String },
  senha_hash: { type: String, required: true },
  cargo: { type: String, default: 'operador' },
  ativo: { type: Number, default: 1 },
  ultimo_login: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);
