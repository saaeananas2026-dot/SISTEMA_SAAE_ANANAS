import React, { useState } from 'react';

function LeituraRetornoPage() {
  const [activeTab, setActiveTab] = useState('Retorno');
  const inputStyle = { padding: '2px 4px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', fontSize: '0.75rem', fontFamily: 'inherit', height: '22px', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '0.7rem', color: '#334155', fontFamily: 'inherit', marginBottom: '2px', display: 'block' };
  const groupStyle = { border: '1px solid #CBD5E1', padding: '8px', backgroundColor: '#F8FAFC', position: 'relative', marginTop: '12px' };
  const legendStyle = { position: 'absolute', top: '-8px', left: '8px', backgroundColor: '#F8FAFC', padding: '0 4px', fontSize: '0.7rem', color: '#64748B' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
      
      {/* TABS */}
      <div style={{ display: 'flex', padding: '4px 8px 0 8px', backgroundColor: '#E2E8F0', borderBottom: '1px solid #CBD5E1' }}>
        {['Retorno', 'Históricos'].map((tab) => (
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

      {/* BLUE HEADER */}
      <div style={{ backgroundColor: '#0D47A1', color: '#FFF', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
        {activeTab === 'Retorno' ? 'Retorno das Leituras com Impressão Simultânea' : 'Histórico dos Retorno das Leituras com Impressão Simultânea'}
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, backgroundColor: '#FFF', padding: '8px', overflowY: 'auto' }}>
        
        {activeTab === 'Retorno' && (
          <div style={{ display: 'flex', gap: '16px' }}>
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div>
                  <label style={labelStyle}>Referência</label>
                  <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0D47A1' }}>09/2026</div>
                </div>
                <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px' }}>
                  <input type="checkbox" /> Reprocessar apenas sem refaturamento
                </label>
              </div>

              <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                
                <div style={{ flex: 1 }}>
                  <div style={groupStyle}>
                    <div style={legendStyle}>Tipo de Guia</div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                      <select style={{ ...inputStyle, width: '180px' }}>
                        <option>Ficha de Compensação</option>
                        <option>Arrecadação</option>
                      </select>
                      <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                        <input type="checkbox" defaultChecked /> Gerar Lançto. Cobr Registrada?
                      </label>
                    </div>
                    <select style={{ ...inputStyle, width: '100%', marginTop: '4px' }}>
                      <option>BANCO DO BRASIL</option>
                    </select>
                  </div>
                </div>

                <div style={{ width: '280px' }}>
                  <div style={groupStyle}>
                    <div style={legendStyle}>Parâmetros Para Envio Automático de E-mail</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.7rem', marginTop: '4px' }}>
                      <label><input type="checkbox" /> Fazer envio automático das faturas por e-mail.</label>
                      <label><input type="checkbox" /> Fazer envio para o e-mail do Proprietário.</label>
                      <label><input type="checkbox" /> Fazer envio para o e-mail do Compromissário.</label>
                      <div>
                        <label style={{ ...labelStyle, display: 'inline-block', marginRight: '4px' }}>Tipo de Histórico</label>
                        <input type="text" style={{ ...inputStyle, width: '120px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div style={groupStyle}>
                <div style={legendStyle}>Caminho dos Arquivos</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: '60px', ...labelStyle, marginBottom: 0, fontWeight: 'bold' }}>Arquivos :</label>
                    <input type="text" defaultValue="C:\SisPalm\Retorno" style={{ ...inputStyle, flex: 1 }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label style={{ width: '60px', ...labelStyle, marginBottom: 0, fontWeight: 'bold' }}>Fotos :</label>
                    <input type="text" defaultValue="O Caminho da Foto sempre estará informado dentro do arquivo, caso não esteja, utilize este caminho." style={{ ...inputStyle, flex: 1, color: '#94a3b8' }} />
                  </div>
                  <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '60px' }}>
                    <input type="checkbox" /> Ignorar mensagem de anexo não encontrado.
                  </label>
                </div>
              </div>

              <div style={{ marginTop: '12px', flex: 1, border: '1px solid #CBD5E1' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'inherit' }}>
                  <thead>
                    <tr>
                      <th style={{ width: '24px', backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}></th>
                      <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Arquivos</th>
                      <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right', fontWeight: '600', color: '#334155' }}>Total</th>
                      <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right', fontWeight: '600', color: '#334155' }}>Processamento</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td colSpan="4" style={{ height: '80px' }}></td></tr>
                  </tbody>
                </table>
              </div>

              <div style={{ marginTop: '12px', borderTop: '1px solid #CBD5E1', paddingTop: '8px', display: 'flex', gap: '16px', fontSize: '0.7rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Resumo</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Total de Cadastros :</span><span></span></div>
                  <div style={{ fontWeight: 'bold', marginTop: '16px', marginBottom: '4px' }}>Serviços</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>A :</span><span></span></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Leituras</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Igual a Anterior :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Acima da Média :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Abaixo da Média :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Sem Leitura :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Fotos :</span><span></span></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Manutenções</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}><span>Ressequenciamentos :</span><span></span></div>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Entrega Simultânea</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Irregularidades :</span><span></span></div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>Faturamento Simultâneo</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Impressos :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Não Impressos :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Calculou :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Não Calculou :</span><span></span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}><span>Cadastros Não Encontrados :</span><span></span></div>
                </div>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'Históricos' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', marginBottom: '12px', padding: '8px', backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1' }}>
              <div>
                <label style={labelStyle}>Pesquisar pelo Nome do Arquivo</label>
                <input type="text" style={{ ...inputStyle, width: '250px' }} />
              </div>
              <div>
                <label style={labelStyle}>Pesquisar por Período</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input type="text" style={{ ...inputStyle, width: '80px' }} placeholder="__/__/____" />
                  <input type="text" style={{ ...inputStyle, width: '80px' }} placeholder="__/__/____" />
                </div>
              </div>
              <button style={{ padding: '2px 12px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '14px' }}>🔍</span> Pesquisar
              </button>
            </div>

            <div style={{ flex: 1, border: '1px solid #CBD5E1', overflowY: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem', fontFamily: 'inherit' }}>
                <thead>
                  <tr>
                    <th style={{ width: '24px', backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}></th>
                    <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Data</th>
                    <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Arquivo</th>
                    <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Caminho</th>
                    <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '6px 8px', textAlign: 'left', fontWeight: '600', color: '#334155' }}>Usuário</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6].map((row, index) => (
                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#F8FAFC', cursor: 'pointer' }}>
                      <td style={{ textAlign: 'center', color: '#0D47A1', fontSize: '0.65rem', borderRight: '1px solid #E2E8F0' }}>{index === 0 ? '▶' : ''}</td>
                      <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0' }}>15/09/2023 10:30</td>
                      <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0' }}>RO1023S4R1.txt</td>
                      <td style={{ padding: '6px 8px', color: '#334155', borderRight: '1px solid #E2E8F0' }}>C:\SisPalm\Retorno</td>
                      <td style={{ padding: '6px 8px', color: '#334155' }}>JULIOCESAR</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* BOTTOM TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderTop: '1px solid #CBD5E1' }}>
        <div>
          <button style={{ padding: '6px 12px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', color: '#B91C1C' }}>
            <span style={{ fontWeight: 'bold' }}>⚠️</span> Serviços
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#15803D' }}>
            Processar
          </button>
          <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#B91C1C' }}>
            Cancelar
          </button>
          <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#0D47A1' }}>
            Sair
          </button>
        </div>
      </div>

    </div>
  );
}

export default LeituraRetornoPage;
