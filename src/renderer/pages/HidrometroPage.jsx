import React, { useState } from 'react';
import './DashboardPage.css';
import './UnidadeConsumidoraPage.css';
import './HidrometroPage.css';

function HidrometroPage({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Cadastro');
  const [subTab, setSubTab] = useState('Proprietário');

  const toolbarButtons = [
    { label: 'Novo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
    { label: 'Alterar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { label: 'Excluir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
    { label: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
    { label: 'Duplicar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> },
  ];

  const mainTabs = ['Cadastro', 'Históricos', 'Alterações', 'Visualizar'];
  const subTabs = ['Proprietário', 'Histórico de Serviços', 'Trocas de Lacre'];

  return (
    <div className="hidrometro-container">
      {/* TOOLBAR */}
      <div className="toolbar-container">
        {toolbarButtons.map((btn, idx) => (
          <button key={idx} className="toolbar-btn">
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* MAIN TABS */}
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
        <h2>Cadastro de Hidrômetros</h2>
      </div>

      {/* FORMULARIO PRINCIPAL */}
      <div className="filter-panel" style={{ display: 'flex', gap: '2rem' }}>
        <div className="filter-grid" style={{ flex: 1 }}>
          <div className="search-field col-4">
            <label>Hidrômetro</label>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input type="text" style={{ width: '80%' }} />
              <button className="toolbar-btn" style={{ minWidth: '40px', padding: '0' }}>🔍</button>
            </div>
          </div>
          <div className="search-field col-1">
            <label>Pto</label>
            <input type="text" />
          </div>
          <div className="search-field col-2">
            <label>Diâmetro</label>
            <input type="text" />
          </div>
          <div className="col-5"></div>

          <div className="search-field col-3">
            <label>Data Fabricação</label>
            <input type="date" />
          </div>
          <div className="search-field col-3">
            <label>Data Instalação</label>
            <input type="date" />
          </div>
          <div className="search-field col-3">
            <label>Ult. Manutenção</label>
            <input type="date" />
          </div>
          <div className="search-field col-3">
            <label>Sentido</label>
            <select style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid var(--color-border)' }}>
              <option>Horário</option>
              <option>Anti-Horário</option>
            </select>
          </div>

          <div className="search-field col-3">
            <label>Lote</label>
            <input type="text" />
          </div>
          <div className="search-field col-2">
            <label>Valor</label>
            <input type="text" />
          </div>
          <div className="search-field col-2">
            <label>Situação</label>
            <div style={{ display: 'flex', gap: '4px' }}>
              <input type="text" style={{ width: '70%' }} />
              <button className="toolbar-btn" style={{ minWidth: '40px', padding: '0' }}>🔍</button>
            </div>
          </div>
          <div className="search-field col-5">
            <label>SubTipo</label>
            <input type="text" />
          </div>

          <div className="search-field col-6">
            <label>Tipo de Instalação</label>
            <input type="text" />
          </div>
          <div className="search-field col-6">
            <label>Fornecedor</label>
            <input type="text" />
          </div>
        </div>

        {/* FOTO PLACEHOLDER */}
        <div className="photo-placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          <span>(Foto)</span>
        </div>
      </div>

      {/* PAINEL INFERIOR (SUB-TABS) */}
      <div className="sub-panel">
        <div className="inner-tabs-small">
          {subTabs.map((tab) => (
            <button 
              key={tab} 
              className={`inner-tab-small ${subTab === tab ? 'active' : ''}`}
              onClick={() => setSubTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="form-box">
          {subTab === 'Proprietário' && (
            <div className="filter-grid">
              <div className="search-field col-6">
                <label>Instalação</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input type="text" style={{ width: '20%' }} />
                  <button className="toolbar-btn" style={{ minWidth: '40px', padding: '0' }}>🔍</button>
                  <input type="text" style={{ flex: 1 }} />
                </div>
              </div>
              <div className="col-6"></div>

              <div className="search-field col-10">
                <label>Logradouro</label>
                <input type="text" />
              </div>
              <div className="search-field col-2">
                <label>Número</label>
                <input type="text" />
              </div>

              <div className="search-field col-2">
                <label>CEP</label>
                <input type="text" />
              </div>
              <div className="search-field col-4">
                <label>Bairro</label>
                <input type="text" />
              </div>
              <div className="search-field col-6">
                <label>Complemento</label>
                <input type="text" />
              </div>

              <div className="search-field col-4">
                <label>Lacre</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px', flex: 1 }}>
                    <button className="toolbar-btn" style={{ minWidth: '40px', padding: '0' }}>🔍</button>
                    <input type="text" style={{ width: '100%' }} />
                  </div>
                  <button className="action-card-mini">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>Troca Lacre</span>
                  </button>
                </div>
              </div>
              
              <div className="search-field col-4" style={{ backgroundColor: '#fdfdfd', padding: '8px', borderRadius: '4px', border: '1px solid #eee' }}>
                <label>Leitura Inicial (para Hidrom. usados)</label>
                <input type="text" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HidrometroPage;
