import React from 'react';

function LeituraAnalizadorPage() {
  const inputStyle = { padding: '2px 4px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', fontSize: '0.75rem', fontFamily: 'inherit', height: '22px', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '0.7rem', color: '#334155', fontFamily: 'inherit', marginBottom: '2px', display: 'block' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
      
      {/* BLUE HEADER */}
      <div style={{ backgroundColor: '#0D47A1', color: '#FFF', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
        Análise/Digitação das Leituras
      </div>

      {/* TOP PANEL */}
      <div style={{ padding: '8px', backgroundColor: '#F1F5F9', borderBottom: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div>
              <label style={labelStyle}>Agente de Campo:</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
                <button style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #CBD5E1' }}>🔍</button>
                <input type="text" defaultValue="CHIQUIM" style={{ ...inputStyle, width: '150px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <div>
                <label style={labelStyle}>Referência</label>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#0D47A1' }}>09/2026</div>
              </div>
              <div>
                <label style={labelStyle}>Instalação</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input type="text" style={{ ...inputStyle, width: '100px' }} />
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{ padding: '4px 8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Imprimir</button>
            <button style={{ padding: '4px 8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Importar</button>
            <button style={{ padding: '4px 8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Ordem</button>
            <button style={{ padding: '4px 8px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', borderRadius: '4px', fontSize: '0.75rem', cursor: 'pointer' }}>Filtros</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div>
                <label style={labelStyle}>Instalação</label>
                <input type="text" defaultValue="000000018" style={{ ...inputStyle, width: '100px', backgroundColor: '#F8FAFC' }} readOnly />
                <input type="text" defaultValue="MARIA COELHO DA SILVA" style={{ ...inputStyle, width: '300px', marginLeft: '4px', backgroundColor: '#F8FAFC' }} readOnly />
              </div>
              <div>
                <label style={labelStyle}>Leitura Ant.</label>
                <input type="text" defaultValue="906" style={{ ...inputStyle, width: '60px', backgroundColor: '#FEF9C3', fontWeight: 'bold', textAlign: 'center' }} readOnly />
              </div>
              <div>
                <label style={labelStyle}>Leitura</label>
                <input type="text" defaultValue="918" style={{ ...inputStyle, width: '60px', backgroundColor: '#FEF9C3', fontWeight: 'bold', textAlign: 'center' }} />
              </div>
              <div>
                <label style={labelStyle}>Ocorrência</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input type="text" defaultValue="0000" style={{ ...inputStyle, width: '40px' }} />
                  <button style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #CBD5E1' }}>🔍</button>
                  <input type="text" defaultValue="LEITURA NORMAL" style={{ ...inputStyle, width: '200px' }} />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                <label style={{ fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <input type="checkbox" /> Manter Ocorrência ?
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Data da Leitura</label>
                <input type="text" defaultValue="13/08/2026" style={{ ...inputStyle, width: '100px' }} />
              </div>
              <div>
                <label style={labelStyle}>Dados do Agente de Campo (Leiturista)</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input type="text" defaultValue="0" style={{ ...inputStyle, width: '30px', textAlign: 'center' }} />
                  <input type="text" defaultValue="Diogo Avelino" style={{ ...inputStyle, width: '200px' }} />
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
              <div><label style={labelStyle}>Equipamento</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>y18g041727</div></div>
              <div><label style={labelStyle}>Leit. Min</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>906</div></div>
              <div><label style={labelStyle}>Leit Max</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>916</div></div>
              <div><label style={labelStyle}>Média</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>7</div></div>
              <div style={{ marginLeft: '16px' }}><label style={labelStyle}>Consumo</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>12</div></div>
              <div><label style={labelStyle}>Dias</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>31</div></div>
              <div><label style={labelStyle}>Saldo Ant.</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>0</div></div>
              <div><label style={labelStyle}>Saldo Atu.</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>0</div></div>
              <div><label style={labelStyle}>Desc Consu Esg</label><div style={{ fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'right' }}>0</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* LEGEND BAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', backgroundColor: '#FFF', borderBottom: '1px solid #CBD5E1', fontSize: '0.7rem' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>✅ OK</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🟡 Sem Leitura</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>☑️ Negativo</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔴 Irregular</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>➕ Sem Consumo</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>❌ Pré O.S.</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>🔺 Com O.S.</span>
        </div>
        <div style={{ border: '1px solid #CBD5E1', padding: '2px 8px', backgroundColor: '#F8FAFC', borderRadius: '2px' }}>
          Filtro Desativado
        </div>
      </div>

      {/* TABLE */}
      <div style={{ flex: 1, overflow: 'auto', backgroundColor: '#FFF' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.7rem', fontFamily: 'inherit' }}>
          <thead>
            <tr>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px' }}></th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px' }}></th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Seq</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'left' }}>Instalação</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'left' }}>Endereço</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Nro.</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Leit. Anterior</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Leit. Atual</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Ocorr</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'left' }}>Data</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Consumo</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'center' }}>Situ</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Média</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Máxima</th>
              <th style={{ backgroundColor: '#F1F5F9', borderRight: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'right' }}>Mínima</th>
              <th style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '4px', textAlign: 'left' }}>Complemento</th>
            </tr>
          </thead>
          <tbody>
            {[
              { seq: 10, inst: '000000018', end: 'RUA NOSSA SRA DE FATIMA', nro: 13, lAnt: 906, lAtual: 918, ocorr: '0000', data: '13/08/2026 11:14:14', cons: 12, situ: 'LG', med: 7, max: 916, min: 906, err: true },
              { seq: 20, inst: '000000026', end: 'RUA NOSSA SRA DE FATIMA', nro: 21, lAnt: 1334, lAtual: 1350, ocorr: '0000', data: '13/08/2026 11:14:21', cons: 16, situ: 'LG', med: 15, max: 1356, min: 1341, err: false },
              { seq: 30, inst: '000000034', end: 'RUA NOSSA SRA DE FATIMA', nro: 29, lAnt: 1151, lAtual: 1153, ocorr: '0000', data: '13/08/2026 11:14:26', cons: 2, situ: 'LG', med: 12, max: 1170, min: 1157, err: true },
            ].map((row, index) => (
              <tr key={index} style={{ backgroundColor: index === 0 ? '#E2E8F0' : (index % 2 === 0 ? '#FFFFFF' : '#F8FAFC'), cursor: 'pointer' }}>
                <td style={{ textAlign: 'center', borderRight: '1px solid #E2E8F0' }}>{index === 0 ? '▶' : ''}</td>
                <td style={{ textAlign: 'center', borderRight: '1px solid #E2E8F0' }}>✅</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.seq}</td>
                <td style={{ padding: '4px', borderRight: '1px solid #E2E8F0' }}>{row.inst}</td>
                <td style={{ padding: '4px', borderRight: '1px solid #E2E8F0' }}>{row.end}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.nro}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.lAnt}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0', color: row.err ? '#DC2626' : 'inherit' }}>{row.lAtual}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.ocorr}</td>
                <td style={{ padding: '4px', borderRight: '1px solid #E2E8F0' }}>{row.data}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.cons}</td>
                <td style={{ padding: '4px', textAlign: 'center', borderRight: '1px solid #E2E8F0' }}>{row.situ}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.med}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.max}</td>
                <td style={{ padding: '4px', textAlign: 'right', borderRight: '1px solid #E2E8F0' }}>{row.min}</td>
                <td style={{ padding: '4px' }}></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ textAlign: 'right', padding: '4px 16px', fontSize: '0.8rem', fontWeight: 'bold', backgroundColor: '#FFF', borderTop: '1px solid #CBD5E1' }}>
        Total: 2884
      </div>

      {/* BOTTOM TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', backgroundColor: '#F8FAFC', borderTop: '1px solid #CBD5E1' }}>
        <div>
          <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#334155' }}>
            Layout
          </button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button style={{ padding: '6px 12px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', color: '#334155' }}>Gerar OS</button>
          <button style={{ padding: '6px 12px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', color: '#334155' }}>Unid. Con.</button>
          <button style={{ padding: '6px 12px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', color: '#334155' }}>Resumo</button>
          <button style={{ padding: '6px 12px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', color: '#334155' }}>Históricos</button>
          <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#0D47A1' }}>Sair</button>
        </div>
      </div>

    </div>
  );
}

export default LeituraAnalizadorPage;
