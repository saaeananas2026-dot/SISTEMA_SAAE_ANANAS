import React, { useState } from 'react';
import './FaturaPages.css';

function FaturaCalculoPage() {
  const [calculos] = useState([
    { lote: 'LT-2026-05A', lidas: 450, anomalias: 0, status: 'Pronto para Cálculo' },
    { lote: 'LT-2026-05B', lidas: 680, anomalias: 12, status: 'Anomalias Pendentes' }
  ]);

  return (
    <div className="fatura-page-container">
      <div className="fatura-header">
        <div>
          <h2>Cálculo de Faturamento</h2>
          <p>Processe as leituras retornadas e calcule os valores em R$ e taxas.</p>
        </div>
      </div>

      <div className="fatura-card">
        <div className="fatura-toolbar">
          <div className="fatura-search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Buscar lote para cálculo..." />
          </div>
        </div>

        <div className="fatura-table-wrapper">
          <table className="fatura-table">
            <thead>
              <tr>
                <th>Lote / Rota</th>
                <th>Leituras Recebidas</th>
                <th>Anomalias Pendentes</th>
                <th>Status do Lote</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {calculos.map((item, i) => (
                <tr key={i}>
                  <td><strong>{item.lote}</strong></td>
                  <td>{item.lidas}</td>
                  <td>
                    {item.anomalias > 0 ? (
                      <span style={{color: 'var(--color-danger)', fontWeight: 'bold'}}>{item.anomalias}</span>
                    ) : (
                      <span style={{color: 'var(--color-success)'}}>Nenhuma</span>
                    )}
                  </td>
                  <td>{item.status}</td>
                  <td>
                    <button 
                      className={`btn-fatura ${item.anomalias > 0 ? 'secondary' : 'success'}`} 
                      style={{padding: '6px 12px', fontSize: '0.85rem'}}
                      disabled={item.anomalias > 0}
                    >
                      {item.anomalias > 0 ? 'Resolver Anomalias' : 'Calcular Valores'}
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

export default FaturaCalculoPage;
