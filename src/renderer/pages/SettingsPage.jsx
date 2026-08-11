import React, { useState, useEffect } from 'react';
import './DashboardPage.css'; // Reutilizar estilos globais da dashboard
import './SettingsPage.css';

function SettingsPage({ user, onLogout, onNavigate }) {
  const [networkStatus, setNetworkStatus] = useState({ online: false, label: 'Offline' });
  const [activeTab, setActiveTab] = useState('new-user'); // 'new-user', 'profile', 'info'

  useEffect(() => {
    const getNetworkStatus = async () => {
      try {
        const status = await window.electronAPI.network.getStatus();
        setNetworkStatus(status);
      } catch (e) {
        setNetworkStatus({ online: false, label: 'Offline' });
      }
    };
    getNetworkStatus();

    let cleanup;
    try {
      cleanup = window.electronAPI.network.onStatusChange((status) => {
        setNetworkStatus(status);
      });
    } catch (e) {
      // Ignora erro em modo web/desenvolvimento
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <>
      {/* ÁREA DE CONFIGURAÇÕES */}
      <div className="settings-content-wrapper">
        <div className="settings-header">
          <h1 className="settings-title">Configurações do Sistema</h1>
          <p className="settings-subtitle">Gerencie usuários, permissões e consulte dados da aplicação.</p>
        </div>

        <div className="settings-container">
          <div className="settings-tabs">
            <button 
              className={`settings-tab-btn ${activeTab === 'new-user' ? 'active' : ''}`}
              onClick={() => handleTabChange('new-user')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
              Novo Usuário
            </button>
            <button 
              className={`settings-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => handleTabChange('profile')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Alteração de Dados Cadastrais
            </button>
            <button 
              className={`settings-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
              onClick={() => handleTabChange('info')}
            >
              <svg className="tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              Informações do Sistema
            </button>
          </div>

          <div className="settings-tab-content">
            {activeTab === 'new-user' && (
              <div className="settings-section">
                <h2 className="settings-section-title">Cadastrar Novo Usuário</h2>
                <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nome Completo</label>
                      <input type="text" className="form-input" placeholder="Ex: João da Silva" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Matrícula</label>
                      <input type="text" className="form-input" placeholder="Ex: 12345" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cargo / Perfil</label>
                      <select className="form-input form-select">
                        <option>Administrador</option>
                        <option>Atendimento</option>
                        <option>Leiturista</option>
                        <option>Gerência</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Senha Provisória</label>
                      <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirmar Senha</label>
                      <input type="password" className="form-input" placeholder="••••••••" />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-secondary">Cancelar</button>
                    <button type="submit" className="btn-primary">Salvar Usuário</button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="settings-section">
                <h2 className="settings-section-title">Meus Dados Cadastrais</h2>
                <form className="settings-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nome Completo</label>
                      <input type="text" className="form-input" defaultValue={user?.nome || ''} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">E-mail Corporativo</label>
                      <input type="email" className="form-input" placeholder="exemplo@saae.gov.br" />
                    </div>
                  </div>
                  <h3 className="form-label" style={{ marginTop: '1rem', color: 'var(--color-primary)' }}>Alterar Senha</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Senha Atual</label>
                      <input type="password" className="form-input" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nova Senha</label>
                      <input type="password" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirmar Nova Senha</label>
                      <input type="password" className="form-input" />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-secondary">Descartar Alterações</button>
                    <button type="submit" className="btn-primary">Atualizar Perfil</button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'info' && (
              <div className="settings-section">
                <h2 className="settings-section-title">Status e Informações do Sistema</h2>
                <div className="info-grid">
                  <div className="info-card">
                    <div className="info-card-icon">
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                    </div>
                    <div className="info-card-content">
                      <span className="info-card-title">Versão do Sistema</span>
                      <span className="info-card-value">SAAE ERP v1.0.0</span>
                      <span className="info-card-desc">Build Electron 30.0.1</span>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon" style={{ color: networkStatus.online ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </div>
                    <div className="info-card-content">
                      <span className="info-card-title">Status da Conexão</span>
                      <span className="info-card-value">{networkStatus.online ? 'Online (Nuvem)' : 'Offline (Local)'}</span>
                      <span className="info-card-desc">{networkStatus.online ? 'Sincronizado com MongoDB' : 'Operando em SQLite Local'}</span>
                    </div>
                  </div>

                  <div className="info-card">
                    <div className="info-card-icon" style={{ color: 'var(--color-info)' }}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                    </div>
                    <div className="info-card-content">
                      <span className="info-card-title">Última Sincronização</span>
                      <span className="info-card-value">Hoje, 16:30</span>
                      <span className="info-card-desc">0 registros na fila de espera</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;
