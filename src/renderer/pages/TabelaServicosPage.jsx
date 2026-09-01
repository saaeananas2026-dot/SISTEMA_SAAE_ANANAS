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
      <div style={{ flex: 1, backgroundColor: '#FFF', padding: '8px' }}>
        
        {/* BLUE HEADER */}
        <div style={{ backgroundColor: '#0D47A1', color: '#FFF', padding: '8px 12px', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'inherit', borderRadius: '4px 4px 0 0' }}>
          {activeTab === 'Cadastro' ? 'Cadastro da Tabela para Cálculo' : 'Visualização Geral'}
        </div>

        {activeTab === 'Cadastro' && (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ padding: '16px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderTop: 'none', borderBottom: 'none', flex: 1, minHeight: '400px' }}>
              
              <div style={{ display: 'flex' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Código da Receita</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input type="text" style={{ ...inputStyle, width: '60px' }} />
                    <button style={{ width: '26px', height: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #CBD5E1', backgroundColor: '#E2E8F0', cursor: 'pointer', borderRadius: '2px' }}>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#334155" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>
                    <input type="text" style={{ ...inputStyle, width: '300px' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Desdobro</label>
                  <input type="text" style={{ ...inputStyle, width: '120px' }} />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Situação do Lançamento</label>
                  <select style={{ ...inputStyle, width: '180px', padding: '0 6px' }}>
                    <option></option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Abreviatura</label>
                  <input type="text" style={{ ...inputStyle, width: '394px' }} />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Descrição</label>
                  <input type="text" style={{ ...inputStyle, width: '394px' }} />
                </div>
              </div>

              <div style={{ display: 'flex' }}>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Tipo do Cálculo</label>
                  <select style={{ ...inputStyle, width: '130px', padding: '0 6px' }}>
                    <option></option>
                  </select>
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Limite Inf.</label>
                  <input type="text" style={{ ...inputStyle, width: '60px' }} />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Limite Sup.</label>
                  <input type="text" style={{ ...inputStyle, width: '60px' }} />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Valor</label>
                  <input type="text" style={{ ...inputStyle, width: '80px' }} />
                </div>
                <div style={fieldGroupStyle}>
                  <label style={labelStyle}>Tipo do Valor</label>
                  <select style={{ ...inputStyle, width: '110px', padding: '0 6px' }}>
                    <option></option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', marginTop: '12px' }}>
                <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                  <input type="checkbox" style={{ margin: 0, width: '16px', height: '16px' }} />
                  Receita Inativa ?
                </label>
              </div>

            </div>
            
            {/* BOTTOM TOOLBAR */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '8px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '0 0 4px 4px' }}>
              <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#15803D' }}>
                Confirma
              </button>
              <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#B91C1C' }}>
                Cancela
              </button>
              <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#0D47A1' }}>
                Sair
              </button>
            </div>
          </div>
        )}

        {activeTab === 'Visualizar' && (
          <div style={{ border: '1px solid #CBD5E1', borderTop: 'none', flex: 1, backgroundColor: '#FFF', minHeight: '400px', overflowY: 'auto', borderRadius: '0 0 4px 4px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'inherit' }}>
              <thead>
                <tr>
                  <th style={{ width: '24px', backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}></th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Código</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Abreviatura</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ backgroundColor: '#FFFFFF', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                  <td style={{ textAlign: 'center', color: '#0D47A1', fontSize: '0.65rem', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>▶</td>
                  <td style={{ padding: '8px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>0001</td>
                  <td style={{ padding: '8px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>TAXA DE LIXO</td>
                  <td style={{ padding: '8px', color: '#334155', borderBottom: '1px solid #E2E8F0' }}>TAXA DE LIXO RESIDENCIAL</td>
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
