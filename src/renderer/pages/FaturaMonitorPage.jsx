import React, { useState } from 'react';
import './FaturaPages.css';

function FaturaMonitorPage() {
  const [lotes] = useState([
    { id: 'LT-2026-05A', ref: '05/2026', setor: 'Centro', qdt_faturas: 450, valor_total: 'R$ 25.400,00', status: 'concluido' },
    { id: 'LT-2026-05B', ref: '05/2026', setor: 'Bairro das Flores', qdt_faturas: 680, valor_total: 'R$ 38.150,00', status: 'concluido' },
    { id: 'LT-2026-05C', ref: '05/2026', setor: 'Jardim América', qdt_faturas: 520, valor_total: 'R$ 0,00', status: 'pendente' }
  ]);

  return (
    <div className="fatura-page-container">
      <div className="fatura-header">
        <div>
          <h2>Monitor de Faturamento</h2>
          <p>Acompanhe o status e a geração dos lotes de faturamento mensais.</p>
        </div>
        <div className="fatura-actions">
          <button className="btn-fatura primary">Atualizar Painel</button>
        </div>
      </div>

      <div className="grid-cards">
        <div className="kpi-fatura-card">
          <span className="kpi-fatura-title">Lotes Faturados (Mês)</span>
          <span className="kpi-fatura-value">2 / 14</span>
        </div>
        <div className="kpi-fatura-card">
          <span className="kpi-fatura-title">Previsão de Receita</span>
          <span className="kpi-fatura-value" style={{color: 'var(--color-success)'}}>R$ 63.550,00</span>
        </div>
        <div className="kpi-fatura-card">
          <span className="kpi-fatura-title">Faturas Pendentes</span>
          <span className="kpi-fatura-value" style={{color: 'var(--color-warning)'}}>3.204</span>
        </div>
      </div>

      <div className="fatura-card">
        <div className="fatura-toolbar">
          <div className="fatura-search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar por Lote ou Setor..." />
          </div>
        </div>

        <div className="fatura-table-wrapper">
          <table className="fatura-table">
            <thead>
              <tr>
                <th>Lote</th>
                <th>Referência</th>
                <th>Setor</th>
                <th>Qtd Faturas</th>
                <th>Valor Total</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map((lote, i) => (
                <tr key={i}>
                  <td><strong>{lote.id}</strong></td>
                  <td>{lote.ref}</td>
                  <td>{lote.setor}</td>
                  <td>{lote.qdt_faturas}</td>
                  <td>{lote.valor_total}</td>
                  <td>
                    <span className={`fatura-badge ${lote.status}`}>
                      {lote.status === 'pendente' ? 'Aguardando Leitura' : 'Faturado'}
                    </span>
                  </td>
                  <td>
                    <button className="btn-fatura secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>Detalhes</button>
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

export default FaturaMonitorPage;
