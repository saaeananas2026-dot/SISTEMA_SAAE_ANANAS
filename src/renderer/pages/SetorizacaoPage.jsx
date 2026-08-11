import React, { useState } from 'react';
import './DashboardPage.css';
import './UnidadeConsumidoraPage.css';

function SetorizacaoPage({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Geração');

  const toolbarButtons = [
    { label: 'Novo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
    { label: 'Alterar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { label: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
  ];

  const mainTabs = ['Geração', 'Cadastros Sem Setor', 'Visualizar'];

  const visualizarData = [
    { setor: '00001', rota: '00001', descricao: 'SETOR - 1', agente: '', nome: '', ucs: 945 },
    { setor: '00002', rota: '00001', descricao: 'SETOR - 2', agente: '', nome: '', ucs: 964 },
    { setor: '00003', rota: '00001', descricao: 'SETOR - 3', agente: '', nome: '', ucs: 980 },
    { setor: '00004', rota: '00001', descricao: 'SETOR - 4', agente: '', nome: '', ucs: 916 },
    { setor: '00005', rota: '00001', descricao: 'SETOR - 5', agente: '', nome: '', ucs: 128 },
    { setor: '00099', rota: '00001', descricao: 'CONTA UNIFICADA', agente: '', nome: '', ucs: 0 },
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
        <h2>
          {activeTab === 'Geração' && 'Setorização dos Cadastros'}
          {activeTab === 'Cadastros Sem Setor' && 'Cadastros Sem Setor'}
          {activeTab === 'Visualizar' && 'Visualização Geral - Setorização dos Cadastros'}
        </h2>
      </div>

      {activeTab === 'Geração' && (
        <div className="filter-panel" style={{ flexDirection: 'column' }}>
          <div className="filter-grid">
            <div className="search-field col-1">
              <label>Setor</label>
              <input type="text" />
            </div>
            <div className="search-field col-1">
              <label>Rota</label>
              <input type="text" />
            </div>
            <div className="search-field col-10">
              <label>Descrição</label>
              <input type="text" />
            </div>
            
            <div className="search-field col-10">
              <label>Agente de Campo</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="toolbar-btn" style={{ minWidth: '40px', padding: '0' }}>🔍</button>
                <input type="text" style={{ flex: 1 }} />
              </div>
            </div>
            <div className="col-2" style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 'bold', color: 'var(--color-text-muted)' }}>Total de Cadastros</span>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-primary)' }}>0</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <div className="inner-tabs-small">
              <button className="inner-tab-small active">Logradouros Vinculados</button>
              <button className="inner-tab-small">Logradouros não vinculados</button>
              <div style={{ flex: 1, textAlign: 'right', paddingBottom: '4px' }}>
                <button style={{ background: '#10b981', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', marginRight: '4px' }}>[F5] - Desvincular</button>
                <button style={{ background: '#0d47a1', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold' }}>[F6] - Desvincular Todos</button>
              </div>
            </div>
            <div className="results-container" style={{ borderTopLeftRadius: '0' }}>
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Descrição</th>
                    <th>Início</th>
                    <th>Final</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ height: '100px' }}>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                      Nenhum logradouro vinculado.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Cadastros Sem Setor' && (
        <div style={{ display: 'flex', gap: 'var(--space-md)', height: '500px' }}>
          <div className="results-container" style={{ flex: 1 }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Instalação</th>
                  <th>Logradouro</th>
                  <th>Nro</th>
                  <th>Bairro</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '40px' }}><td colSpan="4"></td></tr>
              </tbody>
            </table>
          </div>
          <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="search-field">
              <label>Setor / Rota</label>
              <select className="form-input"><option>Selecione...</option></select>
            </div>
            <div className="results-container" style={{ flex: 1 }}>
              <table className="results-table">
                <thead>
                  <tr><th>Instalação</th></tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button className="btn-search-action primary" style={{ flex: 1 }}>❱</button>
              <button className="btn-search-action primary" style={{ flex: 1 }}>❰</button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Visualizar' && (
        <div className="results-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Setor</th>
                <th>Rota</th>
                <th>Descrição</th>
                <th>Cód. Agente</th>
                <th>Nome</th>
                <th>UC's</th>
              </tr>
            </thead>
            <tbody>
              {visualizarData.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.setor}</td>
                  <td>{row.rota}</td>
                  <td>{row.descricao}</td>
                  <td>{row.agente}</td>
                  <td>{row.nome}</td>
                  <td>{row.ucs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SetorizacaoPage;
