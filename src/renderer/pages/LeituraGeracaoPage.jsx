import React from 'react';

function LeituraGeracaoPage() {
  const inputStyle = { padding: '2px 4px', border: '1px solid #CBD5E1', backgroundColor: '#FFF', fontSize: '0.75rem', fontFamily: 'inherit', height: '22px', boxSizing: 'border-box' };
  const labelStyle = { fontSize: '0.7rem', color: '#334155', fontFamily: 'inherit', marginBottom: '2px', display: 'block' };
  const groupStyle = { border: '1px solid #CBD5E1', padding: '6px', backgroundColor: '#F8FAFC', position: 'relative', marginTop: '8px' };
  const legendStyle = { position: 'absolute', top: '-7px', left: '8px', backgroundColor: '#F8FAFC', padding: '0 4px', fontSize: '0.7rem', color: '#64748B' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#F8FAFC' }}>
      
      {/* HEADER */}
      <div style={{ backgroundColor: '#0D47A1', color: '#FFF', padding: '6px 12px', fontSize: '0.9rem', fontWeight: 'bold' }}>
        Geração de Arquivo para Emissão Simultânea
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, padding: '8px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          
          {/* LEFT COLUMN */}
          <div style={{ flex: 1 }}>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <div>
                <label style={labelStyle}>Tipo de Geração do Arquivo</label>
                <select style={{ ...inputStyle, width: '150px' }}><option>Único</option><option>Dividido</option></select>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Ordenação</label>
                <select style={{ ...inputStyle, width: '100%' }}><option>Logradouro/Complemento</option></select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Referência</label>
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#0D47A1' }}>09/2026</div>
              </div>
              <div>
                <label style={labelStyle}>Instalação</label>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input type="text" style={{ ...inputStyle, width: '80px' }} />
                  <span style={{ fontSize: '0.7rem' }}>Até</span>
                  <input type="text" style={{ ...inputStyle, width: '80px' }} />
                </div>
              </div>
            </div>

            <div style={groupStyle}>
              <div style={legendStyle}>Setor/Rota/Sequência de Leitura</div>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', marginTop: '4px' }}>
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
                <span style={{ fontSize: '0.7rem', margin: '0 4px' }}>Até</span>
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
                <input type="text" style={{ ...inputStyle, width: '40px' }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Logradouro</label>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input type="text" style={{ ...inputStyle, flex: 1 }} />
                  <span style={{ fontSize: '0.7rem' }}>Até</span>
                  <input type="text" style={{ ...inputStyle, flex: 1 }} />
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Bairro</label>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input type="text" style={{ ...inputStyle, flex: 1 }} />
                  <span style={{ fontSize: '0.7rem' }}>Até</span>
                  <input type="text" style={{ ...inputStyle, flex: 1 }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <div style={{ width: '200px' }}>
                <label style={labelStyle}>Setor de Vencimento</label>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <input type="text" style={{ ...inputStyle, width: '60px' }} />
                  <span style={{ fontSize: '0.7rem' }}>Até</span>
                  <input type="text" style={{ ...inputStyle, width: '60px' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <div>
                <label style={labelStyle}>Tipo de Guia</label>
                <select style={{ ...inputStyle, width: '150px' }}><option>Ficha de Compensação</option></select>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '2px' }}>
                <label style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                  <input type="checkbox" defaultChecked /> Gerar Lançto. Cobr Registrada?
                </label>
              </div>
            </div>

            <div style={{ marginTop: '8px' }}>
              <label style={labelStyle}>Selecione o Convênio (Somente quando selecionado Ficha de Compensação)</label>
              <select style={{ ...inputStyle, width: '100%' }}><option>BANCO DO BRASIL</option></select>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '16px', fontSize: '0.7rem', color: '#334155' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label><input type="checkbox" /> Não reter conta com endereço diferente</label>
                <label><input type="checkbox" /> Gerar apenas as contas retidas</label>
                <label><input type="checkbox" /> Notificações <input type="text" style={{ ...inputStyle, width: '30px' }}/> / <input type="text" style={{ ...inputStyle, width: '40px' }}/></label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label><input type="checkbox" /> Reter contas marcadas para enviar por email</label>
                <label><input type="checkbox" /> Gerar arquivo de 2ª via</label>
                <label><input type="checkbox" /> Notificação para corte <select style={inputStyle}><option>01/01/1900</option></select></label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label><input type="checkbox" /> Termo de Quitação</label>
                <label><input type="checkbox" /> Apenas repasse</label>
              </div>
            </div>

            <div style={groupStyle}>
              <div style={legendStyle}>Caminho/Arquivo</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '60px', ...labelStyle, marginBottom: 0 }}>Caminho :</label>
                  <input type="text" defaultValue="C:\SisPalm\Carga" style={{ ...inputStyle, flex: 1 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <label style={{ width: '60px', ...labelStyle, marginBottom: 0 }}>Arquivo :</label>
                  <input type="text" defaultValue="RO0926.txt" style={{ ...inputStyle, flex: 1 }} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: '12px' }}>
              <div style={{ fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '4px' }}>Resumo da Geração</div>
              <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div><strong>Total de Cadastros :</strong></div>
                <div><strong>Total de Bairros :</strong></div>
                <div><strong>Arquivos Gerados :</strong></div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={groupStyle}>
                <div style={legendStyle}>Hidrômetro</div>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.7rem', marginTop: '4px' }}>
                  <label><input type="radio" name="hidro" /> Com</label>
                  <label><input type="radio" name="hidro" /> Sem</label>
                  <label><input type="radio" name="hidro" defaultChecked /> Todos</label>
                </div>
              </div>
              <div style={groupStyle}>
                <div style={legendStyle}>Leitura</div>
                <div style={{ display: 'flex', flexDirection: 'column', fontSize: '0.7rem', marginTop: '4px' }}>
                  <label><input type="radio" name="leit" /> Com</label>
                  <label><input type="radio" name="leit" /> Sem</label>
                  <label><input type="radio" name="leit" defaultChecked /> Todos</label>
                </div>
              </div>
            </div>

            <div style={groupStyle}>
              <div style={legendStyle}>Lado</div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '0.7rem', marginTop: '4px' }}>
                <label><input type="radio" name="lado" /> Impar</label>
                <label><input type="radio" name="lado" /> Par</label>
                <label><input type="radio" name="lado" defaultChecked /> Ambos</label>
              </div>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Situações</label>
              <select multiple style={{ ...inputStyle, height: '100px', width: '100%' }}>
                <option>0 - LIGADO</option>
                <option>1 - RELIGADO</option>
              </select>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <label style={labelStyle}>Categorias</label>
              <select multiple style={{ ...inputStyle, height: '160px', width: '100%' }}>
                <option>01 - RESIDENCIAL - 1</option>
                <option>02 - RESIDENCIAL - 2</option>
                <option>03 - RESIDENCIAL - 3</option>
                <option>04 - COMERCIAL - 4</option>
                <option>05 - COMERCIAL - 5</option>
              </select>
            </div>

          </div>

        </div>
      </div>

      {/* BOTTOM TOOLBAR */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', padding: '8px', backgroundColor: '#F8FAFC', borderTop: '1px solid #CBD5E1' }}>
        <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#B91C1C' }}>
          Cancelar
        </button>
        <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#15803D' }}>
          Processar
        </button>
        <button style={{ padding: '6px 16px', backgroundColor: '#FFF', border: '1px solid #CBD5E1', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold', color: '#0D47A1' }}>
          Sair
        </button>
      </div>

    </div>
  );
}

export default LeituraGeracaoPage;
