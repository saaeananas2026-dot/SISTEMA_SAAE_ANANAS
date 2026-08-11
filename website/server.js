import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://saaeananas2026_db_user:jeGwNwaRSwldM3Lz@cluster0.vvibnrk.mongodb.net/saae_erp?appName=Cluster0';
mongoose.connect(MONGO_URI)
  .then(() => console.log('[Server] Connected to MongoDB Atlas'))
  .catch(err => console.error('[Server] MongoDB connection error:', err));

// Definição do Schema para consultar faturas na nuvem
// Vamos usar o SyncQueue por enquanto para ler as faturas enviadas pelo Desktop
const syncQueueSchema = new mongoose.Schema({
  table_name: String,
  record_id: String,
  operation: String,
  payload: String,
  status: String,
  created_at: Date
}, { collection: 'syncqueues' });

const SyncQueue = mongoose.model('SyncQueue', syncQueueSchema);

app.use(cors());
app.use(express.json());

// Servir os arquivos estáticos do React (quando em produção na Hostinger)
app.use(express.static(path.join(__dirname, 'dist')));

// API Endpoint para a 2ª Via
app.get('/api/faturas/:matricula', async (req, res) => {
  try {
    const matricula = req.params.matricula;
    
    // Busca no SyncQueue onde a table_name = 'faturas'
    // Na vida real, seria uma coleção 'faturas'
    const registros = await SyncQueue.find({ table_name: 'faturas' }).lean();
    
    // Procuramos qual fatura tem a 'uc' igual à matrícula informada
    const fatura = registros
      .map(r => JSON.parse(r.payload || '{}'))
      .find(f => f.uc === matricula);

    if (fatura) {
      // Retorna sucesso
      return res.json({ 
        success: true, 
        fatura: {
          vencimento: '10/09/2026', // Dados simulados baseados no payload
          valor: fatura.valor_total || 45.00,
          leitura: fatura.leitura_atual || 0,
          consumo: fatura.consumo || 0,
          status: 'EM ABERTO'
        }
      });
    } else {
      // Não encontrada
      return res.status(404).json({ success: false, message: 'Nenhuma fatura em aberto encontrada para esta matrícula.' });
    }
  } catch (error) {
    console.error('[Server] Erro na API:', error);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});

// Qualquer outra rota retorna o index.html do React
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Server] Agência Virtual API rodando na porta ${PORT}`);
});
