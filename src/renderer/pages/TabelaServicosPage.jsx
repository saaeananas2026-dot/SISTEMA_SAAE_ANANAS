import React, { useState } from 'react';
import './DashboardPage.css'; // Import base styles for toolbar etc if needed

function TabelaServicosPage() {
  const [activeTab, setActiveTab] = useState('Cadastro');

  const toolbarButtons = [
    { label: 'Novo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
    { label: 'Alterar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { label: 'Excluir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
    { label: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
  ];

  const inputStyle = {
    padding: '2px 4px',
    border: '1px solid #999',
    backgroundColor: '#FFF',
    fontSize: '0.75rem',
    fontFamily: 'Tahoma, sans-serif',
    height: '22px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '0.7rem',
    color: '#000',
    fontFamily: 'Tahoma, sans-serif',
    marginBottom: '2px',
    display: 'block'
  };

  const fieldGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginRight: '8px',
    marginBottom: '8px'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F0F0F0' }}>
      
      {/* TOOLBAR */}
      <div style={{ display: 'flex', gap: '4px', padding: '4px', backgroundColor: '#F0F0F0', borderBottom: '1px solid #CCC' }}>
        {toolbarButtons.map((btn, idx) => (
          <button key={idx} style={{ 
            display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', 
            backgroundColor: 'transparent', border: '1px solid transparent', 
            cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'Tahoma, sans-serif' 
          }}>
            <span style={{ width: '16px', height: '16px' }}>{btn.icon}</span>
            {btn.label}
          </button>
        ))}
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', padding: '4px 8px 0 8px', backgroundColor: '#E0E0E0', borderBottom: '1px solid #999' }}>
        {['Cadastro', 'Visualizar'].map((tab) => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '4px 12px',
              backgroundColor: activeTab === tab ? '#FFF' : '#F0F0F0',
              border: '1px solid #999',
              borderBottom: activeTab === tab ? '1px solid #FFF' : '1px solid #999',
              marginBottom: '-1px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontFamily: 'Tahoma, sans-serif',
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px',
              fontWeight: activeTab === tab ? 'bold' : 'normal'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, backgroundColor: '#FFF', padding: '4px' }}>
        
        {/* GREEN HEADER */}
        <div style={{ backgroundColor: '#478B7C', color: '#FFF', padding: '4px 8px', fontSize: '0.85rem', fontWeight: 'bold', fontFamily: 'Tahoma, sans-serif' }}>
          {activeTab === 'Cadastro' ? 'Cadastro da Tabela para Cálculo' : 'Visualização Geral'}
        </div>

        {activeTab === 'Cadastro' && (
          <div style={{ padding: '8px', backgroundColor: '#F0F0F0', border: '1px solid #999', borderTop: 'none', minHeight: '400px' }}>
            
            <div style={{ display: 'flex' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Código da Receita</label>
                <div style={{ display: 'flex', gap: '2px' }}>
                  <input type="text" style={{ ...inputStyle, width: '40px' }} />
                  <button style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #999', backgroundColor: '#E0E0E0', cursor: 'pointer' }}>
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  </button>
                  <input type="text" style={{ ...inputStyle, width: '300px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Desdobro</label>
                <input type="text" style={{ ...inputStyle, width: '100px' }} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Situação do Lançamento</label>
                <select style={{ ...inputStyle, width: '150px', padding: '0 2px' }}>
                  <option></option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Abreviatura</label>
                <input type="text" style={{ ...inputStyle, width: '368px' }} />
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Descrição</label>
                <input type="text" style={{ ...inputStyle, width: '368px' }} />
              </div>
            </div>

            <div style={{ display: 'flex' }}>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Tipo do Cálculo</label>
                <select style={{ ...inputStyle, width: '110px', padding: '0 2px' }}>
                  <option></option>
                </select>
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Limite Inf.</label>
                <input type="text" style={{ ...inputStyle, width: '45px' }} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Limite Sup.</label>
                <input type="text" style={{ ...inputStyle, width: '45px' }} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Valor</label>
                <input type="text" style={{ ...inputStyle, width: '60px' }} />
              </div>
              <div style={fieldGroupStyle}>
                <label style={labelStyle}>Tipo do Valor</label>
                <select style={{ ...inputStyle, width: '90px', padding: '0 2px' }}>
                  <option></option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', marginTop: '4px' }}>
              <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ margin: 0 }} />
                Receita Inativa ?
              </label>
            </div>

          </div>
        )}

        {activeTab === 'Visualizar' && (
          <div style={{ border: '1px solid #999', borderTop: 'none', flex: 1, backgroundColor: '#FFF', minHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'Tahoma, sans-serif' }}>
              <thead>
                <tr>
                  <th style={{ width: '24px', backgroundColor: '#F0F0F0', borderRight: '1px solid #CCC', borderBottom: '1px solid #CCC' }}></th>
                  <th style={{ backgroundColor: '#F0F0F0', borderRight: '1px solid #CCC', borderBottom: '1px solid #CCC', padding: '4px 6px', textAlign: 'left', fontWeight: 'normal', color: '#000' }}>Código</th>
                  <th style={{ backgroundColor: '#F0F0F0', borderRight: '1px solid #CCC', borderBottom: '1px solid #CCC', padding: '4px 6px', textAlign: 'left', fontWeight: 'normal', color: '#000' }}>Abreviatura</th>
                  <th style={{ backgroundColor: '#F0F0F0', borderRight: '1px solid #CCC', borderBottom: '1px solid #CCC', padding: '4px 6px', textAlign: 'left', fontWeight: 'normal', color: '#000' }}>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#FFFFFF', cursor: 'pointer' }}>
                  <td style={{ textAlign: 'center', color: '#000', fontSize: '0.65rem', borderRight: '1px solid #EEE' }}>▶</td>
                  <td style={{ padding: '4px 6px', color: '#000', borderRight: '1px solid #EEE' }}>0001</td>
                  <td style={{ padding: '4px 6px', color: '#000', borderRight: '1px solid #EEE' }}>TAXA DE LIXO</td>
                  <td style={{ padding: '4px 6px', color: '#000' }}>TAXA DE LIXO RESIDENCIAL</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default TabelaServicosPage;
