import React from 'react';
import './FaturaPages.css';

function FaturaRefaturamentoPage() {
  return (
    <div className="fatura-page-container">
      <div className="fatura-header">
        <div>
          <h2>Refaturamento</h2>
          <p>Corrija e recálcule faturas individuais após contestações de clientes.</p>
        </div>
      </div>

      <div className="fatura-card">
        <div className="fatura-toolbar">
          <div className="fatura-search-box">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Digite o número da UC ou Fatura..." />
          </div>
          <button className="btn-fatura primary">Buscar Fatura</button>
        </div>

        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--color-text-muted)' }}>
          <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{marginBottom: '16px', opacity: 0.5}}>
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <h3>Nenhuma fatura selecionada</h3>
          <p>Busque por uma unidade consumidora para iniciar o processo de refaturamento.</p>
        </div>
      </div>
    </div>
  );
}

export default FaturaRefaturamentoPage;
