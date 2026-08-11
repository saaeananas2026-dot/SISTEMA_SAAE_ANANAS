import mongoose from 'mongoose';

const ucSchema = new mongoose.Schema({
  uc: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  endereco: { type: String },
  ultima_leitura: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now }
});

export const UnidadeConsumidora = mongoose.model('UnidadeConsumidora', ucSchema);
