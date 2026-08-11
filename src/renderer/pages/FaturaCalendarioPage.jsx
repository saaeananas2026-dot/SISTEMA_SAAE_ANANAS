import React from 'react';
import './FaturaPages.css';

function FaturaCalendarioPage() {
  return (
    <div className="fatura-page-container">
      <div className="fatura-header">
        <div>
          <h2>Calendário de Faturamento</h2>
          <p>Defina as datas de leitura, vencimento e corte para cada rota.</p>
        </div>
        <div className="fatura-actions">
          <button className="btn-fatura primary">Salvar Calendário</button>
        </div>
      </div>

      <div className="fatura-card">
        <p style={{color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
          Módulo de cronograma visual (Em construção). Aqui será exibido um calendário interativo para arrastar e soltar os dias de faturamento de cada Setor/Rota.
        </p>
        
        <div className="fatura-table-wrapper">
          <table className="fatura-table">
            <thead>
              <tr>
                <th>Setor</th>
                <th>Data Prev. Leitura</th>
                <th>Data Emissão</th>
                <th>Vencimento Padrão</th>
                <th>Data Prev. Corte</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Centro</strong></td>
                <td><input type="date" defaultValue="2026-05-01" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
                <td><input type="date" defaultValue="2026-05-02" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
                <td><input type="date" defaultValue="2026-05-15" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
                <td><input type="date" defaultValue="2026-05-30" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
              </tr>
              <tr>
                <td><strong>Bairro das Flores</strong></td>
                <td><input type="date" defaultValue="2026-05-05" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
                <td><input type="date" defaultValue="2026-05-06" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
                <td><input type="date" defaultValue="2026-05-20" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
                <td><input type="date" defaultValue="2026-06-05" className="search-input" style={{width: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '4px'}}/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FaturaCalendarioPage;
