import React, { useState } from 'react';
import './DashboardPage.css';
import './UnidadeConsumidoraPage.css';
import './HidrometroPage.css';

function TipoOrdemServicoPage({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Cadastro');
  const [subTab, setSubTab] = useState('Serviços');

  const toolbarButtons = [
    { label: 'Novo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
    { label: 'Alterar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { label: 'Excluir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
    { label: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
  ];

  const mainTabs = ['Cadastro', 'Automatização', 'Visualizar'];
  const subTabs = ['Serviços', 'Materiais', 'Prestador', 'Roteiro Operacional', 'Notificações', 'Descrição', 'Veículos'];

  const tableData = [
    { tipo: 'CORTE', codigo: 1, descricao: 'ORDEM CORTE' },
    { tipo: 'RELIGAÇÃO', codigo: 2, descricao: 'RELIGAÇÃO' },
    { tipo: 'taxa de 2º via', codigo: 3, descricao: 'taxa de 2º via' },
  ];

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
        <h2>
          {activeTab === 'Cadastro' && 'Cadastro de Tipos de O.S. - Cód.:'}
          {activeTab === 'Automatização' && 'O.S. Principal - Cód.:'}
          {activeTab === 'Visualizar' && 'Visualização Geral - Tipos de O.S.'}
        </h2>
      </div>

      {activeTab === 'Cadastro' && (
        <div className="filter-panel" style={{ flexDirection: 'column' }}>
          <div className="filter-grid">
            <div className="search-field col-4">
              <label>Tipo de Serviço</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button className="toolbar-btn" style={{ minWidth: '40px', padding: '0' }}>🔍</button>
                <input type="text" style={{ flex: 1 }} />
              </div>
            </div>
            <div className="search-field col-8">
              <label>Descrição</label>
              <input type="text" />
            </div>

            <div className="search-field col-3">
              <label>Ação</label>
              <input type="text" />
            </div>
            <div className="search-field col-1">
              <label>Previsão</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <input type="text" style={{ width: '100%' }} />
                <span style={{ fontSize: '0.65rem', fontWeight: 'bold' }}>hr</span>
              </div>
            </div>
            <div className="search-field col-2">
              <label>Situação</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <select className="form-input"><option></option></select>
                <button className="toolbar-btn" style={{ minWidth: '30px', padding: '0' }}>✖</button>
              </div>
            </div>
            
            <div className="col-6" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
              <label className="checkbox-label-mini"><input type="checkbox" /> Interromper Ramal ?</label>
              <label className="checkbox-label-mini"><input type="checkbox" /> Permite mudar a situação na baixa ?</label>
              <label className="checkbox-label-mini"><input type="checkbox" /> Mudança automática?</label>
              <label className="checkbox-label-mini"><input type="checkbox" /> Bloquear Baixa em Lote</label>
              <label className="checkbox-label-mini"><input type="checkbox" /> Requer Placa e Operador ?</label>
              <label className="checkbox-label-mini"><input type="checkbox" /> Tipo de O.S. Inativa</label>
            </div>

            <div className="search-field col-4">
              <label>Urgência para Execução</label>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.65rem' }}>
                <label><input type="radio" name="urgencia" /> Alto</label>
                <label><input type="radio" name="urgencia" /> Normal</label>
                <label><input type="radio" name="urgencia" /> Baixo</label>
              </div>
            </div>
            <div className="search-field col-4">
              <label>Natureza</label>
              <div style={{ display: 'flex', gap: '10px', fontSize: '0.65rem' }}>
                <label><input type="radio" name="natureza" /> Execução</label>
                <label><input type="radio" name="natureza" /> Administrativa</label>
              </div>
            </div>
            <div className="col-4"></div>

            <div className="search-field col-12">
              <label>Na Geração da Ordem de Serviço de Processo de Fiscalização</label>
              <select className="form-input"><option></option></select>
            </div>
          </div>

          <div className="sub-panel" style={{ marginTop: '1.5rem' }}>
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
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-primary)' }}>Pré Configuração</h4>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button style={{ background: '#64748b', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>[F2] - Incluir</button>
                  <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>[F5] - Excluir</button>
                </div>
              </div>
              <div className="results-container">
                <table className="results-table">
                  <thead>
                    <tr>
                      <th>Rec.</th>
                      <th>Cód. Serv.</th>
                      <th>Serviço</th>
                      <th>Valor</th>
                      <th>Fórmula</th>
                      <th>TP. Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ height: '60px' }}><td colSpan="6"></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Automatização' && (
        <div className="filter-panel" style={{ flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-primary)' }}>Gera OS´s Automaticamente na OS Principal</h4>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button style={{ background: '#64748b', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>[F2] - Incluir</button>
              <button style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>[F5] - Excluir</button>
            </div>
          </div>
          <div className="results-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Momento</th>
                  <th>Ação</th>
                  <th>Grau</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ height: '100px' }}><td colSpan="4"></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Visualizar' && (
        <div className="filter-panel" style={{ flexDirection: 'column', gap: '15px' }}>
          <div className="filter-grid">
            <div className="search-field col-4">
              <label>Cód Tipo de OS / Descrição</label>
              <input type="text" />
            </div>
            <div className="search-field col-4">
              <label>Tipo de Serviço</label>
              <input type="text" />
            </div>
            <div className="search-field col-1">
              <label>Tempo</label>
              <input type="text" />
            </div>
            <div className="col-3" style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button className="btn-search-action primary">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Pesquisar
              </button>
            </div>

            <div className="search-field col-3">
              <label>Ação</label>
              <select className="form-input"><option>00 - Ambos</option></select>
            </div>
            <div className="search-field col-2">
              <label>Grau</label>
              <select className="form-input"><option>Ambos</option></select>
            </div>
            <div className="search-field col-2">
              <label>Natureza</label>
              <select className="form-input"><option>Ambos</option></select>
            </div>
            <div className="search-field col-2">
              <label>O.S. Inativa</label>
              <select className="form-input"><option>Ambos</option></select>
            </div>
          </div>

          <div className="results-container">
            <table className="results-table">
              <thead>
                <tr>
                  <th>Tipo Serviço</th>
                  <th>Código</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.tipo}</td>
                    <td>{row.codigo}</td>
                    <td>{row.descricao}</td>
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

export default TipoOrdemServicoPage;
