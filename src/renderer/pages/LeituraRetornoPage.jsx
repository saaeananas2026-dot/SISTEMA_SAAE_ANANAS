import React, { useState } from 'react';
import './LeituraPages.css';

function LeituraRetornoPage() {
  const [retornos] = useState([
    { id: 'R003', data: '20/05/2026', leiturista: 'Carlos Mendes', lidas: 510, total: 520, status: 'pendente' },
    { id: 'R001', data: '19/05/2026', leiturista: 'Ana Souza', lidas: 450, total: 450, status: 'concluido' }
  ]);

  return (
    <div className="leitura-page-container">
      <div className="leitura-header">
        <div>
          <h2>Retorno de Leituras</h2>
          <p>Sincronize ou importe as leituras realizadas em campo.</p>
        </div>
        <div className="leitura-actions">
          <button className="btn-leitura primary">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
            Importar Arquivo
          </button>
          <button className="btn-leitura success">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-8.21l-2.83 2.83"></path></svg>
            Sincronizar Celulares
          </button>
        </div>
      </div>

      <div className="leitura-card">
        <div className="leitura-toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar retorno..." />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="leitura-table">
            <thead>
              <tr>
                <th>ID da Rota</th>
                <th>Data</th>
                <th>Leiturista</th>
                <th>Progresso</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {retornos.map((ret, i) => (
                <tr key={i}>
                  <td><strong>{ret.id}</strong></td>
                  <td>{ret.data}</td>
                  <td>{ret.leiturista}</td>
                  <td>{ret.lidas} / {ret.total} ({(ret.lidas/ret.total*100).toFixed(0)}%)</td>
                  <td>
                    <span className={`badge-status ${ret.status}`}>
                      {ret.status === 'pendente' ? 'Processando' : 'Finalizado'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-leitura secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>
                      Analisar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeituraRetornoPage;
