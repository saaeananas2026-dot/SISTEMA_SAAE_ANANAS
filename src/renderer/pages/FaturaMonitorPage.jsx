import React, { useState } from 'react';
import './DashboardPage.css'; 

function FaturaMonitorPage() {
  const [activeTab, setActiveTab] = useState('Monitoramento');

  const bottomToolbarButtons = [
    { label: 'Visualizar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M21 12c-2.4 4-5.4 6-9 6s-6.6-2-9-6c2.4-4 5.4-6 9-6s6.6 2 9 6z"></path></svg> },
    { label: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
    { label: 'Mapa', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg> },
  ];

  const monitoramentoData = [
    { ref: '09/2026', inc: 0, abe: 0, sL: 11, cL: 12, fat: 112, imp: 2749, cp: '', cr: '', ex: '', fc: '', pt: '', total: 2884 },
    { ref: '08/2026', inc: 0, abe: 0, sL: 7, cL: 0, fat: 0, imp: 22, cp: '', cr: '', ex: '', fc: '', pt: '', total: 29 },
    { ref: '07/2026', inc: 0, abe: 0, sL: 4, cL: 1, fat: 0, imp: 15, cp: '', cr: '', ex: '', fc: '', pt: '', total: 20 },
    { ref: '06/2026', inc: 0, abe: 0, sL: 4, cL: 1, fat: 0, imp: 15, cp: '', cr: '', ex: '', fc: '', pt: '', total: 20 },
    { ref: '05/2026', inc: 0, abe: 0, sL: 1, cL: 1, fat: 1, imp: 14, cp: '', cr: '', ex: '', fc: '', pt: '', total: 17 },
    { ref: '04/2026', inc: 0, abe: 0, sL: 2, cL: 0, fat: 0, imp: 12, cp: '', cr: '', ex: '', fc: '', pt: '', total: 14 },
    { ref: '03/2026', inc: 0, abe: 0, sL: 0, cL: 0, fat: 1, imp: 6, cp: '', cr: '', ex: '', fc: '', pt: '', total: 7 },
  ];

  const logData = [
    { data: '17/08/2026', hora: '14:20:15', user: 'CHIQUIM' },
    { data: '16/08/2026', hora: '09:10:00', user: 'ADMIN' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
      
      {/* BLUE HEADER */}
      <div style={{ backgroundColor: '#0D47A1', color: '#FFF', padding: '8px 12px', fontSize: '0.9rem', fontWeight: 'bold', fontFamily: 'inherit' }}>
        Monitor de Faturamento
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', padding: '4px 8px 0 8px', backgroundColor: '#E2E8F0', borderBottom: '1px solid #CBD5E1' }}>
        {['Monitoramento', 'Log', 'Ocorrências'].map((tab) => (
          <div 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '6px 14px',
              backgroundColor: activeTab === tab ? '#FFF' : '#F1F5F9',
              border: '1px solid #CBD5E1',
              borderBottom: activeTab === tab ? '1px solid #FFF' : '1px solid #CBD5E1',
              marginBottom: '-1px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontFamily: 'inherit',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
              fontWeight: activeTab === tab ? 'bold' : 'normal',
              color: activeTab === tab ? '#0D47A1' : '#475569'
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, backgroundColor: '#FFF', padding: '0', display: 'flex', flexDirection: 'column' }}>
        
        {activeTab === 'Monitoramento' && (
          <div style={{ border: '1px solid #CBD5E1', borderTop: 'none', flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.70rem', fontFamily: 'inherit' }}>
              <thead>
                <tr>
                  <th rowSpan="2" style={{ width: '24px', backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}></th>
                  <th rowSpan="2" style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>REFERENCIA</th>
                  <th rowSpan="2" style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>INCLUSAO</th>
                  <th rowSpan="2" style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>ABERTURA</th>
                  <th colSpan="4" style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>TOTAIS FATURADOS</th>
                  <th colSpan="5" style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>TOTAIS NÃO FATURADOS</th>
                  <th rowSpan="2" style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>TOTAL</th>
                </tr>
                <tr>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>SEM LEITURA</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>COM LEITURA</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>FATURADO</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>IMPRESSA</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>CP</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>CR</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>EX</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>FC</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'center', fontWeight: '600', color: '#334155' }}>PT</th>
                </tr>
              </thead>
              <tbody>
                {monitoramentoData.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                    <td style={{ textAlign: 'center', color: '#0D47A1', fontSize: '0.65rem', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{index === 0 ? '▶' : ''}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{row.ref}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.inc}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.abe}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.sL}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.cL}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.fat}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.imp}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.cp}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.cr}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.ex}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.fc}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.pt}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderBottom: '1px solid #E2E8F0', textAlign: 'right' }}>{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Log' && (
          <div style={{ border: '1px solid #CBD5E1', borderTop: 'none', flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '400px', borderCollapse: 'collapse', fontSize: '0.70rem', fontFamily: 'inherit' }}>
              <thead>
                <tr>
                  <th style={{ width: '24px', backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}></th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>DATA</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>HORA</th>
                  <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px 6px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>USUARIO</th>
                </tr>
              </thead>
              <tbody>
                {logData.map((row, index) => (
                  <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC', cursor: 'pointer', transition: 'background-color 0.2s' }}>
                    <td style={{ textAlign: 'center', color: '#0D47A1', fontSize: '0.65rem', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{index === 0 ? '▶' : ''}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{row.data}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>{row.hora}</td>
                    <td style={{ padding: '4px 6px', color: '#334155', borderBottom: '1px solid #E2E8F0' }}>{row.user}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'Ocorrências' && (
          <div style={{ border: '1px solid #CBD5E1', borderTop: 'none', flex: 1, overflowY: 'auto', padding: '12px' }}>
            <span style={{ fontSize: '0.8rem', fontFamily: 'inherit', color: '#64748b' }}>Nenhuma ocorrência registrada.</span>
          </div>
        )}

      </div>

      {/* BOTTOM TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderTop: '1px solid #CBD5E1' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {bottomToolbarButtons.map((btn, idx) => (
            <button key={idx} style={{ 
              display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', 
              backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px',
              cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit', color: '#334155',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              <span style={{ width: '14px', height: '14px', color: '#64748B' }}>{btn.icon}</span>
              {btn.label}
            </button>
          ))}
        </div>
        <div>
          <button style={{ 
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 20px', 
            backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px',
            cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit', fontWeight: 'bold', color: '#0D47A1',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <span style={{ width: '14px', height: '14px', color: '#0D47A1' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </span>
            Sair
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default FaturaMonitorPage;
