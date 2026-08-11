import React, { useState } from 'react';
import { FileText, Search, CheckCircle } from 'lucide-react';

function SegundaViaSection() {
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const [faturaPronta, setFaturaPronta] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!matricula) return;
    
    setLoading(true);
    setFaturaPronta(false);
    
    try {
      // Faz a chamada real para o nosso servidor Node.js
      const response = await fetch(`/api/faturas/${matricula}`);
      const data = await response.json();
      
      if (data.success && data.fatura) {
        setFaturaPronta(data.fatura);
      } else {
        alert(data.message || 'Fatura não encontrada.');
      }
    } catch (error) {
      console.error('Erro ao buscar fatura:', error);
      alert('Erro de conexão ao buscar a fatura.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="segunda-via-section">
      <div className="container">
        <div className="segunda-via-card">
          
          <div className="segunda-via-form-area">
            <div className="form-header">
              <div className="icon-box"><FileText size={24} color="white" /></div>
              <div>
                <h3>EMITA SUA 2ª VIA</h3>
                <p>Informe os dados abaixo para consultar sua fatura e emitir a segunda via.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="segunda-via-form">
              <div className="form-group">
                <label>MATRÍCULA DO IMÓVEL</label>
                <input 
                  type="text" 
                  placeholder="Digite a matrícula" 
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>CPF / CNPJ (OPCIONAL)</label>
                <input type="text" placeholder="Digite seu CPF ou CNPJ" />
              </div>
              
              <button type="submit" className="btn-primary w-100" disabled={loading}>
                {loading ? 'BUSCANDO...' : <><Search size={18} /> CONSULTAR FATURA</>}
              </button>
            </form>

            {faturaPronta && (
              <div className="fatura-success-alert">
                <CheckCircle size={20} color="var(--color-success)" />
                <div>
                  <strong>Fatura Encontrada!</strong>
                  <p style={{ margin: '4px 0', fontSize: '0.9rem', color: '#555' }}>
                    Vencimento: {faturaPronta.vencimento} | Valor: R$ {faturaPronta.valor.toFixed(2)} | Status: {faturaPronta.status}
                  </p>
                  <a href="#" className="download-link" onClick={(e) => { e.preventDefault(); alert('Gerando PDF da Fatura...') }}>
                    Clique aqui para baixar o PDF
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="segunda-via-divider">
            <span className="ou-badge">OU</span>
          </div>

          <div className="segunda-via-benefits">
            <h3>TENHA SUAS CONTAS<br/>EM DIA</h3>
            <ul className="benefits-list">
              <li><CheckCircle size={16} /> Evite multas e juros</li>
              <li><CheckCircle size={16} /> Mantenha seus serviços ativos</li>
              <li><CheckCircle size={16} /> Contribua com a qualidade do abastecimento de água</li>
            </ul>
          </div>
          
          <div className="segunda-via-illustration">
            {/* We will simulate the bill illustration with css/svg in components.css */}
            <div className="bill-graphic">
              <div className="bill-paper"></div>
              <div className="bill-drop"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default SegundaViaSection;
