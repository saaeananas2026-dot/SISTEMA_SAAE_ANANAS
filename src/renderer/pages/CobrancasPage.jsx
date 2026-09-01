import React, { useState } from 'react';
import './DashboardPage.css';
import './UnidadeConsumidoraPage.css';

function CobrancasPage({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Cadastro');

  const toolbarButtons = [
    { label: 'Novo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
    { label: 'Alterar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { label: 'Excluir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
    { label: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
  ];

  const mainTabs = ['Cadastro', 'Visualizar'];

  const tableData = [
    { codigo: 1, periodo: 99, descricao: 'NORMAL', lei: '', sorteio: 'N' },
    { codigo: 2, periodo: 99, descricao: 'ISENTO TOTAL', lei: '', sorteio: 'N' },
    { codigo: 3, periodo: 99, descricao: 'NORMAL SEM TAXA DE LIXO', lei: '', sorteio: 'N' },
  ];

  return (
    <div className="consumer-container">
      {/* TOOLBAR */}
      <div className="toolbar-container">
        {toolbarButtons.map((btn, idx) => (
          <button key={idx} className="toolbar-btn">
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* INNER TABS */}
      <div className="inner-tabs">
        {mainTabs.map((tab) => (
          <button 
            key={tab} 
            className={`inner-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* STRIPE TITULO */}
      <div className="content-header-stripe" style={{ marginTop: '0', borderRadius: '0 0 var(--radius-md) var(--radius-md)' }}>
        <h2>{activeTab === 'Cadastro' ? 'Código de Cobrança (Água) -- Código:' : 'Visualização Geral - Código de Cobrança (Água)'}</h2>
      </div>

      {activeTab === 'Cadastro' ? (
        <div className="filter-panel" style={{ flexDirection: 'column' }}>
          <div className="filter-grid">
            <div className="search-field col-10">
              <label>Descrição</label>
              <input type="text" />
            </div>
            <div className="search-field col-2">
              <label>Período de Isenção (anos)</label>
              <input type="text" />
            </div>
            
            <div className="search-field col-4">
              <label>Nro. da Lei</label>
              <input type="text" />
            </div>
            <div className="col-8" style={{ display: 'flex', alignItems: 'center', paddingTop: '15px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                Gerar Número de Sorteio?
              </label>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <h3 className="section-title" style={{ fontSize: '0.85rem', borderBottom: '1px solid var(--color-border)' }}>Cadastro de Valores</h3>
            <div className="results-container" style={{ marginTop: '10px' }}>
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Cód.</th>
                    <th>Receita</th>
                    <th>Gerar Lançamento</th>
                    <th>Porcentagem</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ height: '40px' }}>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="classic-table-container" style={{ border: '1px solid #CBD5E1', backgroundColor: '#FFF', display: 'flex', flexDirection: 'column', flex: 1, minHeight: '400px', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ backgroundColor: '#0D47A1', color: '#FFF', padding: '8px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
            Visualização Geral
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'inherit' }}>
              <thead>
                <tr>
                  <th style={{ width: '24px', backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}></th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Código</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Descrição</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Período</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Nro. Lei</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Sorteio</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row.codigo} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                    <td style={{ textAlign: 'center', color: '#0D47A1', fontSize: '0.65rem', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{index === 0 ? '▶' : ''}</td>
                    <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{String(row.codigo).padStart(4, '0')}</td>
                    <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{row.descricao}</td>
                    <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{row.periodo}</td>
                    <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{row.lei}</td>
                    <td style={{ padding: '6px 8px', color: '#334155', borderBottom: '1px solid #E2E8F0' }}>{row.sorteio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default CobrancasPage;
