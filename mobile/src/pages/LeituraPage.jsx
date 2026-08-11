import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Droplet, Calculator, Printer, Settings } from 'lucide-react';

function LeituraPage() {
  const navigate = useNavigate();
  const [ucBusca, setUcBusca] = useState('');
  const [unidade, setUnidade] = useState(null);
  const [leituraAtual, setLeituraAtual] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  // Busca do servidor configurado ou adivinha pelo endereço atual
  const defaultIp = `${window.location.hostname}:3000`;
  const serverIp = localStorage.getItem('saae_server_ip') || defaultIp;

  const buscarUC = async () => {
    if (!ucBusca) return;
    setLoading(true);
    setErro('');
    
    try {
      // Simula busca local ou via API
      const response = await axios.get(`http://${serverIp}/api/unidades`);
      const ucs = response.data.data;
      
      const encontrada = ucs.find(u => u.uc === ucBusca || u.uc.replace('-', '') === ucBusca);
      
      if (encontrada) {
        setUnidade(encontrada);
      } else {
        setErro('Unidade Consumidora não encontrada.');
        setUnidade(null);
      }
    } catch (err) {
      console.error(err);
      setErro('Erro de conexão. O servidor Desktop está ligado e no mesmo Wi-Fi? Vá em Configurações.');
    } finally {
      setLoading(false);
    }
  };

  const calcularConsumo = () => {
    if (!unidade || !leituraAtual) return 0;
    const atual = parseInt(leituraAtual);
    const anterior = parseInt(unidade.ultima_leitura);
    if (isNaN(atual)) return 0;
    return atual > anterior ? atual - anterior : 0;
  };

  const calcularValor = (consumo) => {
    // Cálculo simples (Taxa mínima + Excedente)
    const taxaMinima = 35.00; // Até 10m³
    if (consumo <= 10) return taxaMinima;
    return taxaMinima + ((consumo - 10) * 5.50);
  };

  const gerarBoleto = async () => {
    if (!leituraAtual) {
      setErro('Digite a leitura atual!');
      return;
    }

    const consumo = calcularConsumo();
    const valor = calcularValor(consumo);

    setLoading(true);
    try {
      const payload = {
        uc: unidade.uc,
        leitura_atual: parseInt(leituraAtual),
        leitura_anterior: unidade.ultima_leitura,
        consumo,
        valor_total: valor,
        data_leitura: new Date().toISOString()
      };

      const res = await axios.post(`http://${serverIp}/api/leitura`, payload);
      
      if (res.data.success) {
        // Guarda os dados no localStorage para a página do boleto
        localStorage.setItem('boleto_atual', JSON.stringify({
          ...unidade,
          ...payload,
          id: res.data.boleto_id
        }));
        
        navigate(`/boleto/${res.data.boleto_id}`);
      }
    } catch (err) {
      console.error(err);
      // Se der erro na internet, salva offline (simplificado para o exemplo)
      const id = Date.now().toString();
      localStorage.setItem('boleto_atual', JSON.stringify({
        ...unidade,
        uc: unidade.uc,
        leitura_atual: parseInt(leituraAtual),
        consumo,
        valor_total: valor,
        offline: true,
        id
      }));
      navigate(`/boleto/${id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-10px' }}>
        <button 
          onClick={() => navigate('/config')} 
          style={{ background: 'none', border: 'none', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <Settings size={16} /> Configurar Conexão
        </button>
      </div>

      <div className="card">
        <div className="input-group">
          <label>Buscar Unidade Consumidora (UC)</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="number" 
              placeholder="Ex: 10010" 
              value={ucBusca}
              onChange={(e) => setUcBusca(e.target.value)}
              style={{ flex: 1 }}
            />
            <button className="btn btn-primary" onClick={buscarUC} disabled={loading} style={{ padding: '0 20px', minWidth: '60px' }}>
              {loading ? <span className="app-loading-spinner" style={{width: '20px', height: '20px', borderWidth: '2px', display: 'inline-block'}}></span> : <Search size={20} />}
            </button>
          </div>
        </div>
        
        {erro && <div style={{ color: 'var(--color-danger)', fontSize: '0.9rem', marginTop: '10px' }}>{erro}</div>}
      </div>

      {unidade && (
        <div className="card" style={{ animation: 'fadeInUp 0.3s' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '15px', color: 'var(--color-primary-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Droplet size={20} /> Dados do Imóvel
          </h2>
          
          <div className="info-row">
            <span className="info-label">Nome</span>
            <span className="info-value">{unidade.nome}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Endereço</span>
            <span className="info-value">{unidade.endereco}</span>
          </div>
          <div className="info-row" style={{ backgroundColor: 'var(--color-primary-subtle)', margin: '10px -20px', padding: '15px 20px' }}>
            <span className="info-label">Última Leitura</span>
            <span className="info-value" style={{ fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>
              {unidade.ultima_leitura} <small>m³</small>
            </span>
          </div>

          <div className="input-group" style={{ marginTop: '20px' }}>
            <label style={{ textAlign: 'center', fontSize: '1.1rem', color: 'var(--color-primary)' }}>LEITURA ATUAL</label>
            <input 
              type="number" 
              className="number-large"
              placeholder="000" 
              value={leituraAtual}
              onChange={(e) => setLeituraAtual(e.target.value)}
            />
          </div>

          {leituraAtual && parseInt(leituraAtual) >= unidade.ultima_leitura && (
            <div style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '10px', marginTop: '15px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
                  <Calculator size={16} /> Consumo
                </span>
                <strong>{calcularConsumo()} m³</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', color: 'var(--color-primary-dark)' }}>
                <span>Valor Previsto</span>
                <strong>R$ {calcularValor(calcularConsumo()).toFixed(2).replace('.', ',')}</strong>
              </div>
            </div>
          )}

          <button 
            className="btn btn-success" 
            style={{ width: '100%', marginTop: '20px' }}
            onClick={gerarBoleto}
            disabled={!leituraAtual || loading}
          >
            <Printer size={20} /> Gerar Boleto
          </button>
        </div>
      )}
    </>
  );
}

export default LeituraPage;
