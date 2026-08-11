import React, { useState } from 'react';
import './FaturaPages.css';

function FaturaImpressaoPage() {
  const [lotes] = useState([
    { id: 'LT-2026-05A', setor: 'Centro', qdt_faturas: 450, impressas: 0, status: 'pendente' }
  ]);

  return (
    <div className="fatura-page-container">
      <div className="fatura-header">
        <div>
          <h2>Impressão em Lote</h2>
          <p>Gere os PDFs de impressão para entrega manual (papel A4 ou Térmica).</p>
        </div>
        <div className="fatura-actions">
          <button className="btn-fatura secondary">Configurar Impressora</button>
        </div>
      </div>

      <div className="fatura-card">
        <div className="fatura-toolbar">
          <div className="fatura-search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar lote faturado..." />
          </div>
        </div>

        <div className="fatura-table-wrapper">
          <table className="fatura-table">
            <thead>
              <tr>
                <th>Lote Faturado</th>
                <th>Setor</th>
                <th>Total de Faturas</th>
                <th>Impressas</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lotes.map((lote, i) => (
                <tr key={i}>
                  <td><strong>{lote.id}</strong></td>
                  <td>{lote.setor}</td>
                  <td>{lote.qdt_faturas}</td>
                  <td>{lote.impressas}</td>
                  <td>
                    <span className="fatura-badge pendente">Aguardando Impressão</span>
                  </td>
                  <td>
                    <div style={{display: 'flex', gap: '8px'}}>
                      <button className="btn-fatura primary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>Gerar PDF (A4)</button>
                      <button className="btn-fatura secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}}>Gerar PDF (Bobina)</button>
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

export default FaturaImpressaoPage;
