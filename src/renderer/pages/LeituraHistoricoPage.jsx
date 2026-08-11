import React, { useState } from 'react';
import './LeituraPages.css';

function LeituraHistoricoPage() {
  const [historico] = useState([
    { uc: '104592-8', ref: '05/2026', leitura: 145, consumo: 12, data: '20/05/2026', leiturista: 'Carlos Mendes' },
    { uc: '104592-8', ref: '04/2026', leitura: 133, consumo: 15, data: '20/04/2026', leiturista: 'Carlos Mendes' },
    { uc: '104592-8', ref: '03/2026', leitura: 118, consumo: 11, data: '20/03/2026', leiturista: 'Ana Souza' },
    { uc: '104592-8', ref: '02/2026', leitura: 107, consumo: 14, data: '20/02/2026', leiturista: 'Carlos Mendes' },
  ]);

  return (
    <div className="leitura-page-container">
      <div className="leitura-header">
        <div>
          <h2>Histórico de Leituras</h2>
          <p>Consulte as leituras anteriores de uma unidade consumidora.</p>
        </div>
      </div>

      <div className="leitura-card">
        <div className="leitura-toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Pesquisar Unidade Consumidora (UC)..." defaultValue="104592-8" />
          </div>
          <button className="btn-leitura primary">Pesquisar</button>
        </div>

        <div className="table-wrapper">
          <table className="leitura-table">
            <thead>
              <tr>
                <th>UC</th>
                <th>Referência</th>
                <th>Leitura (m³)</th>
                <th>Consumo (m³)</th>
                <th>Data da Leitura</th>
                <th>Leiturista</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item, i) => (
                <tr key={i}>
                  <td><strong>{item.uc}</strong></td>
                  <td>{item.ref}</td>
                  <td>{item.leitura}</td>
                  <td><strong>{item.consumo}</strong></td>
                  <td>{item.data}</td>
                  <td>{item.leiturista}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeituraHistoricoPage;
