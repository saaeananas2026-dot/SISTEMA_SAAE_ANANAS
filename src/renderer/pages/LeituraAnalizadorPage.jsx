import React, { useState } from 'react';
import './LeituraPages.css';

function LeituraAnalizadorPage() {
  const [anomalias] = useState([
    { uc: '104592-8', nome: 'João da Silva Sauro', media: 12, leitura: 45, tipo: 'Consumo Elevado', status: 'alerta' },
    { uc: '293847-1', nome: 'Maria Antonieta Paz', media: 20, leitura: 0, tipo: 'Hidrômetro Parado', status: 'alerta' },
    { uc: '482910-5', nome: 'Condomínio Águas Claras', media: 1200, leitura: 1250, tipo: 'Vazamento?', status: 'pendente' }
  ]);

  return (
    <div className="leitura-page-container">
      <div className="leitura-header">
        <div>
          <h2>Analisador de Leituras (Crítica)</h2>
          <p>Valide as anomalias detectadas pelo sistema antes de faturar.</p>
        </div>
        <div className="leitura-actions">
          <button className="btn-leitura success">
            Aprovar Todas
          </button>
        </div>
      </div>

      <div className="leitura-card">
        <div className="leitura-toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar por UC ou Tipo..." />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="leitura-table">
            <thead>
              <tr>
                <th>UC</th>
                <th>Consumidor</th>
                <th>Média (m³)</th>
                <th>Lido (m³)</th>
                <th>Tipo de Anomalia</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {anomalias.map((item, i) => (
                <tr key={i}>
                  <td><strong>{item.uc}</strong></td>
                  <td>{item.nome}</td>
                  <td>{item.media}</td>
                  <td><strong style={{color: 'var(--color-danger)'}}>{item.leitura}</strong></td>
                  <td>
                    <span className={`badge-status ${item.status}`}>
                      {item.tipo}
                    </span>
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button className="btn-leitura secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>Editar</button>
                      <button className="btn-leitura primary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>Confirmar</button>
                    </div>
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

export default LeituraAnalizadorPage;
