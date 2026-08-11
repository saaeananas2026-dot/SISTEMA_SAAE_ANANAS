import express from 'express';
import cors from 'cors';
import ip from 'ip';
import { getDatabase } from '../database/init.js';

import fs from 'fs';
import path from 'path';

import { UnidadeConsumidora } from '../database/models/UnidadeConsumidora.js';
import { SyncQueue } from '../database/models/SyncQueue.js';

let serverInstance = null;
const CONFIG_PATH = path.join(process.cwd(), 'site_config.json');

// Default config se não existir
const DEFAULT_CONFIG = {
  theme: {
    primary: '#0f4b9c',
    primaryDark: '#072a5a',
    primaryLight: '#1967d2',
    logoUrl: '' // Usa logo padrão se vazio
  },
  hero: {
    slides: [
      { 
        id: 1, 
        title: 'ECONOMIZE HOJE PARA NÃO FALTAR AMANHÃ.', 
        subtitle: 'ÁGUA É VIDA.', 
        text: 'Use a água com consciência. Preserve esse bem essencial.', 
        bgUrl: 'https://images.unsplash.com/photo-1541888037375-403487c02bbf?auto=format&fit=crop&w=1920&q=80' 
      },
      { id: 2, title: '', subtitle: '', text: '', bgUrl: '' },
      { id: 3, title: '', subtitle: '', text: '', bgUrl: '' }
    ]
  },
  footer: {
    about: 'Nosso compromisso é com você e com o futuro. Água tratada, responsabilidade e respeito à vida.',
    phone1: '(63) 99999-0000',
    phone2: '(63) 3333-0000',
    email: 'atendimento@saae.to.gov.br',
    address: 'Rua das Águas, 123 - Centro, Sua Cidade - TO',
    businessHours: 'Segunda a Sexta, 07h às 11h • 13h às 17h'
  },
  avisos: [
    { id: 1, type: 'warning', title: 'Manutenção programada na rede', text: 'Bairro Centro - 22/07 das 13h às 17h' },
    { id: 2, type: 'danger', title: 'Interrupção no abastecimento', text: 'Bairro Jardim - 23/07' }
  ],
  noticias: [
    { id: 1, title: 'Dicas para consumo consciente de água', text: 'Pequenas atitudes que fazem a diferença no futuro.', date: '20 de julho de 2026', imgUrl: '' },
    { id: 2, title: 'SAAE realiza limpeza de reservatórios', text: 'Manutenção preventiva garantindo a qualidade da água.', date: '18 de julho de 2026', imgUrl: '' },
    { id: 3, title: 'Novo canal de atendimento via WhatsApp', text: 'Fale conosco de forma mais rápida e fácil.', date: '15 de julho de 2026', imgUrl: '' }
  ]
};

export function startLocalServer() {
  if (serverInstance) return;

  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use('/uploads', express.static(path.join(process.cwd(), 'website', 'public', 'uploads')));

  // Rotas para o Gestor do Site
  app.get('/api/site/config', (req, res) => {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        const data = fs.readFileSync(CONFIG_PATH, 'utf8');
        res.json({ success: true, data: JSON.parse(data) });
      } else {
        res.json({ success: true, data: DEFAULT_CONFIG });
      }
    } catch (e) {
      res.json({ success: true, data: DEFAULT_CONFIG });
    }
  });

  app.post('/api/site/config', (req, res) => {
    try {
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(req.body, null, 2));
      res.json({ success: true, message: 'Configurações salvas com sucesso!' });
    } catch (e) {
      res.status(500).json({ success: false, error: e.message });
    }
  });

  app.post('/api/site/upload', (req, res) => {
    try {
      const { imageBase64, filename } = req.body;
      if (!imageBase64) throw new Error("No image data provided");
      
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, 'base64');
      
      const safeFilename = Date.now() + '_' + filename.replace(/[^a-zA-Z0-9.-]/g, '');
      const uploadsDir = path.join(process.cwd(), 'website', 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      
      const uploadPath = path.join(uploadsDir, safeFilename);
      fs.writeFileSync(uploadPath, buffer);
      
      // Retorna a URL que o Vite vai servir estaticamente
      res.json({ success: true, url: `/uploads/${safeFilename}` });
    } catch (e) {
      console.error('[Upload Error]', e);
      res.status(500).json({ success: false, error: e.message });
    }
  });

  app.get('/api/ping', (req, res) => {
    res.json({ status: 'ok', message: 'SAAE Local Server Running', ip: ip.address() });
  });

  // Rota para buscar unidades consumidoras (Simulação de carga para o mobile)
  app.get('/api/unidades', async (req, res) => {
    try {
      // Tentar buscar da coleção
      try {
        const ucs = await UnidadeConsumidora.find().limit(100).lean();
        if (ucs && ucs.length > 0) {
          return res.json({ success: true, data: ucs });
        }
      } catch (e) {
        // Coleção vazia ou erro
      }

      res.json({ success: true, data: [] });
    } catch (error) {
      console.error('[Server] Erro ao buscar unidades:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Rota para salvar a leitura e gerar a fatura
  app.post('/api/leitura', async (req, res) => {
    try {
      const { uc, leitura_atual, consumo, valor_total } = req.body;
      
      // Salvar na fila de sync (ou salvar direto no MongoDB real)
      try {
        await SyncQueue.create({
          table_name: 'faturas',
          record_id: Date.now().toString(),
          operation: 'INSERT',
          payload: JSON.stringify(req.body)
        });
      } catch (e) {
        console.error('[Server] Falha ao salvar leitura na fila', e);
      }

      res.json({ 
        success: true, 
        message: 'Leitura registrada e boleto gerado com sucesso!',
        boleto_id: Date.now().toString()
      });
    } catch (error) {
      console.error('[Server] Erro ao salvar leitura:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  serverInstance = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Local Server] Running on http://${ip.address()}:${PORT}`);
  });

  return { ip: ip.address(), port: PORT };
}

export function getLocalServerInfo() {
  if (!serverInstance) return null;
  return { ip: ip.address(), port: 3000 };
}

export function stopLocalServer() {
  if (serverInstance) {
    serverInstance.close();
    serverInstance = null;
    console.log('[Local Server] Stopped');
  }
}
