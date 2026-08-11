import React, { useState } from 'react';
import { Search, User, X, LogIn, UserPlus } from 'lucide-react';
import './components.css'; // We will create this for specific component styles

function Header({ config }) {
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState('login'); // 'login' ou 'cadastro'

  const toggleModal = () => setShowModal(!showModal);
  return (
    <header className="site-header">
      <div className="container header-container">
        <div className="header-logo">
          {config?.logoUrl ? (
            <img src={config.logoUrl} alt="Logo" style={{ height: '50px', objectFit: 'contain' }} />
          ) : (
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="var(--color-primary-light)"><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
            </div>
          )}
          <div className="logo-text">
            <strong>SAAE</strong>
            <span>Serviço Autônomo<br/>de Água e Esgoto</span>
          </div>
        </div>
        
        <nav className="header-nav">
          <a href="#" className="active">INÍCIO</a>
          <a href="#">SERVIÇOS</a>
          <a href="#">NOTÍCIAS</a>
          <a href="#">OUVIDORIA</a>
          <a href="#">CONTATO</a>
        </nav>

        <div className="header-actions">
          <button className="search-btn"><Search size={20} /></button>
          <button className="btn-outline area-cliente-btn" onClick={toggleModal}>
            <User size={18} />
            ÁREA DO CLIENTE
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close-modal-btn" onClick={toggleModal}>
                <X size={24} />
              </button>
              <h3>Área do Cliente</h3>
              <p>Acesse seus serviços digitais</p>
            </div>
            
            <div className="modal-body">
              <div className="modal-tabs">
                <button 
                  className={`modal-tab ${modalTab === 'login' ? 'active' : ''}`}
                  onClick={() => setModalTab('login')}
                >
                  <LogIn size={16} style={{marginRight: 6, verticalAlign: 'middle'}}/> Entrar
                </button>
                <button 
                  className={`modal-tab ${modalTab === 'cadastro' ? 'active' : ''}`}
                  onClick={() => setModalTab('cadastro')}
                >
                  <UserPlus size={16} style={{marginRight: 6, verticalAlign: 'middle'}}/> Cadastrar
                </button>
              </div>

              {modalTab === 'login' ? (
                <form onSubmit={(e) => { e.preventDefault(); alert('Em breve: Conexão com a base de clientes do ERP'); }}>
                  <div className="form-group">
                    <label>CPF ou CNPJ</label>
                    <input type="text" placeholder="Digite apenas os números" required />
                  </div>
                  <div className="form-group">
                    <label>Senha</label>
                    <input type="password" placeholder="Sua senha de acesso" required />
                  </div>
                  <div style={{textAlign: 'right', marginBottom: '24px'}}>
                    <a href="#" style={{fontSize: '0.8rem', color: 'var(--color-primary-light)', fontWeight: 600}}>Esqueci minha senha</a>
                  </div>
                  <button type="submit" className="btn-primary w-100" style={{padding: '12px'}}>ACESSAR MINHA CONTA</button>
                </form>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); alert('Em breve: Envio de cadastro para aprovação no ERP'); }}>
                  <div className="form-group">
                    <label>Número da Matrícula (Conta de Água)</label>
                    <input type="text" placeholder="Ex: 12345-6" required />
                  </div>
                  <div className="form-group">
                    <label>CPF ou CNPJ do Titular</label>
                    <input type="text" placeholder="Digite apenas números" required />
                  </div>
                  <div className="form-group">
                    <label>E-mail (Opcional)</label>
                    <input type="email" placeholder="Para receber notificações" />
                  </div>
                  <div className="form-group">
                    <label>Crie uma Senha</label>
                    <input type="password" placeholder="Mínimo 6 caracteres" required />
                  </div>
                  <button type="submit" className="btn-primary w-100" style={{padding: '12px', background: 'var(--color-success)'}}>CRIAR MEU CADASTRO</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
