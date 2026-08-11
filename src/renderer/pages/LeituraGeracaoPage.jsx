import React, { useState } from 'react';
import './LeituraPages.css';

function LeituraGeracaoPage() {
  const [showModal, setShowModal] = useState(false);
  const [rotas, setRotas] = useState([
    { id: 'R001', setor: 'Centro', quadras: 15, unidades: 450, status: 'pendente' },
    { id: 'R002', setor: 'Bairro das Flores', quadras: 22, unidades: 680, status: 'pendente' },
    { id: 'R003', setor: 'Jardim América', quadras: 18, unidades: 520, status: 'concluido' },
    { id: 'R004', setor: 'Vila Nova', quadras: 10, unidades: 290, status: 'pendente' }
  ]);

  const handleGerarRota = (e) => {
    e.preventDefault();
    // Simulação de adição de nova rota
    const formData = new FormData(e.target);
    const setor = formData.get('setor');
    const novaRota = {
      id: `R00${rotas.length + 1}`,
      setor: setor === 'Todos' ? 'Geral' : setor,
      quadras: Math.floor(Math.random() * 20) + 5,
      unidades: Math.floor(Math.random() * 500) + 100,
      status: 'concluido'
    };
    setRotas([novaRota, ...rotas]);
    setShowModal(false);
  };

  return (
    <div className="leitura-page-container">
      <div className="leitura-header">
        <div>
          <h2>Geração de Rotas de Leitura</h2>
          <p>Gere os lotes de leitura para enviar aos leituristas.</p>
        </div>
        <div className="leitura-actions">
          <button className="btn-leitura primary" onClick={() => setShowModal(true)}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            Gerar Novas Rotas
          </button>
        </div>
      </div>

      <div className="leitura-card">
        <div className="leitura-toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar por setor ou ID..." />
          </div>
          <button className="btn-leitura secondary">Filtrar</button>
        </div>

        <div className="table-wrapper">
          <table className="leitura-table">
            <thead>
              <tr>
                <th>ID da Rota</th>
                <th>Setor</th>
                <th>Qtd Quadras</th>
                <th>Qtd Unidades</th>
                <th>Status da Geração</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rotas.map((rota, i) => (
                <tr key={i}>
                  <td><strong>{rota.id}</strong></td>
                  <td>{rota.setor}</td>
                  <td>{rota.quadras}</td>
                  <td>{rota.unidades}</td>
                  <td>
                    <span className={`badge-status ${rota.status}`}>
                      {rota.status === 'pendente' ? 'Pendente' : 'Gerado'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-leitura secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>
                      Visualizar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="leitura-modal-overlay">
          <div className="leitura-modal">
            <div className="leitura-modal-header">
              <h3>Gerar Novas Rotas</h3>
              <button className="leitura-modal-close" onClick={() => setShowModal(false)}>&times;</button>
            </div>
            <form onSubmit={handleGerarRota}>
              <div className="leitura-form-group">
                <label>Mês/Ano de Referência</label>
                <input type="month" name="referencia" className="leitura-form-control" defaultValue="2026-05" required />
              </div>
              
              <div className="leitura-form-group">
                <label>Setor / Zona</label>
                <select name="setor" className="leitura-form-control" required>
                  <option value="Todos">Todos os Setores (Geração em Massa)</option>
                  <option value="Centro">Centro</option>
                  <option value="Bairro das Flores">Bairro das Flores</option>
                  <option value="Jardim América">Jardim América</option>
                  <option value="Vila Nova">Vila Nova</option>
                </select>
              </div>

              <div className="leitura-form-group">
                <label>Atribuir Leiturista (Opcional)</label>
                <select name="leiturista" className="leitura-form-control">
                  <option value="">Atribuição Automática</option>
                  <option value="Carlos Mendes">Carlos Mendes</option>
                  <option value="Ana Souza">Ana Souza</option>
                  <option value="Roberto Alves">Roberto Alves</option>
                </select>
              </div>

              <div className="leitura-form-group">
                <label>Data Prevista para Início</label>
                <input type="date" name="dataInicio" className="leitura-form-control" defaultValue="2026-05-15" required />
              </div>

              <div className="leitura-modal-footer">
                <button type="button" className="btn-leitura secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-leitura primary">
                  Processar Geração
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeituraGeracaoPage;
