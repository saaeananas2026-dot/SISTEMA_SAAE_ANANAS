import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, CheckCircle } from 'lucide-react';

function BoletoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [boleto, setBoleto] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('boleto_atual');
    if (data) {
      setBoleto(JSON.parse(data));
    }
  }, [id]);

  const imprimir = () => {
    // Mock de impressão via impressora térmica bluetooth
    // Na vida real, usaria a Web Bluetooth API para enviar os comandos ESC/POS
    alert('Enviando dados para a impressora Bluetooth Pareada...');
    
    setTimeout(() => {
      alert('Impressão concluída!');
      navigate('/'); // Volta para a tela inicial para a próxima leitura
    }, 1500);
  };

  if (!boleto) return <div className="container">Carregando boleto...</div>;

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>Fatura Gerada</h2>
      </div>

      <div className="card" style={{ textAlign: 'center', backgroundColor: '#f8fafc', border: '2px dashed var(--color-border)' }}>
        <CheckCircle size={48} color="var(--color-success)" style={{ margin: '0 auto 10px' }} />
        <h3 style={{ marginBottom: '5px' }}>Leitura Salva!</h3>
        {boleto.offline && (
          <span className="status-badge offline" style={{ display: 'inline-block', marginBottom: '15px' }}>
            Salvo Offline (Sincronização Pendente)
          </span>
        )}

        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', textAlign: 'left', marginTop: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
          <h4 style={{ textAlign: 'center', borderBottom: '1px dashed #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
            SAAE - FATURA DE ÁGUA
          </h4>
          
          <div className="info-row">
            <span className="info-label">UC</span>
            <span className="info-value">{boleto.uc}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Nome</span>
            <span className="info-value">{boleto.nome}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Data</span>
            <span className="info-value">{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          
          <div style={{ margin: '15px 0', padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '5px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Leitura Anterior:</span> <strong>{boleto.leitura_anterior}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span>Leitura Atual:</span> <strong>{boleto.leitura_atual}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-primary)', fontWeight: 'bold' }}>
              <span>Consumo (m³):</span> <strong>{boleto.consumo}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: 'bold', marginTop: '15px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <span>TOTAL:</span>
            <span>R$ {boleto.valor_total.toFixed(2).replace('.', ',')}</span>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {/* Mock de código de barras */}
            <div style={{ height: '50px', backgroundImage: 'repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 5px, #fff 5px, #fff 8px)', margin: '0 auto', width: '90%' }}></div>
            <small style={{ display: 'block', marginTop: '5px', letterSpacing: '2px' }}>823901823 09182309812 3901283</small>
          </div>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={imprimir}>
        <Printer size={20} /> Imprimir na Rua (Bluetooth)
      </button>
      
      <button className="btn btn-outline" style={{ width: '100%', marginTop: '10px' }} onClick={() => navigate('/')}>
        Voltar e Ler Próximo Hidrômetro
      </button>
    </>
  );
}

export default BoletoPage;
