import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Server, Save, ArrowLeft } from 'lucide-react';

function ConfigPage() {
  const navigate = useNavigate();
  const defaultIp = `${window.location.hostname}:3000`;
  const [ip, setIp] = useState(localStorage.getItem('saae_server_ip') || defaultIp);

  const handleSave = () => {
    localStorage.setItem('saae_server_ip', ip);
    alert('Configuração salva com sucesso!');
    navigate('/');
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', gap: '10px' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
          <ArrowLeft size={24} />
        </button>
        <h2 style={{ fontSize: '1.2rem' }}>Configurações do Servidor</h2>
      </div>

      <div className="input-group">
        <label>IP do Servidor Local (Desktop)</label>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Server size={20} style={{ position: 'absolute', left: '12px', color: 'var(--color-text-muted)' }} />
          <input 
            type="text" 
            value={ip} 
            onChange={(e) => setIp(e.target.value)} 
            placeholder="Ex: 192.168.1.15:3000"
            style={{ paddingLeft: '40px', width: '100%' }}
          />
        </div>
        <small style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
          Você encontra este IP na tela inicial do sistema Desktop.
        </small>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={handleSave}>
        <Save size={20} /> Salvar Configuração
      </button>
    </div>
  );
}

export default ConfigPage;
