import React, { useState, useEffect, useRef } from 'react';
import ConnectionIndicator from '../components/ConnectionIndicator.jsx';
import logoSaae from '../assets/logo-saae.png';
import './LoginPage.css';

function LoginPage({ onLogin }) {
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [networkStatus, setNetworkStatus] = useState({ online: false, label: 'Verificando...' });
  const [mounted, setMounted] = useState(false);
  const matriculaRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
    if (matriculaRef.current) {
      setTimeout(() => matriculaRef.current.focus(), 600);
    }
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
    } catch (e) { /* ignore */ }
    return () => { if (cleanup) cleanup(); };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!matricula.trim()) { setError('Informe sua matrícula ou usuário.'); return; }
    if (!senha.trim()) { setError('Informe sua senha.'); return; }
    setIsLoading(true);
    try {
      const result = await window.electronAPI.auth.login(matricula.trim(), senha);
      if (result.success) {
        onLogin(result.user, result.token, rememberMe);
      } else {
        setError(result.error || 'Erro ao realizar login.');
        const card = document.querySelector('.login-card');
        if (card) {
          card.classList.add('shake');
          setTimeout(() => card.classList.remove('shake'), 500);
        }
      }
    } catch (err) {
      setError('Erro de comunicação com o sistema.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`login-container ${mounted ? 'mounted' : ''}`}>
      {/* LEFT SIDE */}
      <div className="login-left">
        <div className="login-left-bg"></div>
        <div className="login-left-overlay"></div>
        <div className="login-waves">
          <div className="wave wave-1"></div>
          <div className="wave wave-2"></div>
          <div className="wave wave-3"></div>
        </div>
        <div className="login-left-content">
          <div className="login-left-icon">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path d="M32 4C32 4 12 28 12 40C12 51.046 20.954 60 32 60C43.046 60 52 51.046 52 40C52 28 32 4 32 4Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
              <path d="M32 12C32 12 20 28 20 36C20 42.627 25.373 48 32 48C38.627 48 44 42.627 44 36C44 28 32 12 32 12Z" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
            </svg>
          </div>
          <h2 className="login-left-title">Saneamento de Qualidade</h2>
          <p className="login-left-text">Cuidando da saúde pública e do meio ambiente com tecnologia, eficiência e compromisso com a população.</p>
          <div className="login-left-features">
            <div className="login-left-feature"><span className="feature-icon">💧</span><span>Abastecimento de Água</span></div>
            <div className="login-left-feature"><span className="feature-icon">🏗️</span><span>Gestão de Infraestrutura</span></div>
            <div className="login-left-feature"><span className="feature-icon">📊</span><span>Relatórios Inteligentes</span></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-logo">
            <img src={logoSaae} alt="Logo SAAE" className="login-custom-logo" />
          </div>
          <div className="login-titles">
            <h1 className="login-title">Sistema Integrado SAAE</h1>
            <p className="login-subtitle">Gestão Inteligente de Água e Esgoto</p>
          </div>
          {error && (
            <div className="login-error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 1a7 7 0 110 14A7 7 0 018 1zm0 9.5a.75.75 0 100 1.5.75.75 0 000-1.5zM8 4a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 4z"/></svg>
              <span>{error}</span>
            </div>
          )}
          <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
            <div className="input-group">
              <label htmlFor="matricula" className="input-label">Usuário ou Matrícula</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input id="matricula" ref={matriculaRef} type="text" className="input-field" placeholder="Digite sua matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} disabled={isLoading} autoComplete="off"/>
              </div>
            </div>
            <div className="input-group">
              <label htmlFor="senha" className="input-label">Senha</label>
              <div className="input-wrapper">
                <svg className="input-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                <input id="senha" type={showPassword ? 'text' : 'password'} className="input-field" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} disabled={isLoading} autoComplete="off"/>
                <button type="button" className="input-toggle-password" onClick={() => setShowPassword(!showPassword)} tabIndex={-1} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}>
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  )}
                </button>
              </div>
            </div>
            <div className="login-options">
              <label className="checkbox-label" htmlFor="remember">
                <input id="remember" type="checkbox" className="checkbox-input" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                <span className="checkbox-custom"></span>
                <span className="checkbox-text">Lembrar acesso</span>
              </label>
              <ConnectionIndicator status={networkStatus}/>
            </div>
            <button type="submit" className="login-button" disabled={isLoading}>
              {isLoading ? (
                <span className="login-button-loading"><span className="login-button-spinner"></span>Entrando...</span>
              ) : (
                <span className="login-button-content">
                  <span>Entrar</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              )}
            </button>
          </form>
          <div className="login-footer">
            <span className="login-version">SAAE ERP v1.0</span>
            <span className="login-separator">•</span>
            <span className="login-mode">{networkStatus.online ? 'Modo Online' : 'Modo Offline'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
