import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';
import UnidadeConsumidoraPage from './pages/UnidadeConsumidoraPage.jsx';
import HidrometroPage from './pages/HidrometroPage.jsx';
import CobrancasPage from './pages/CobrancasPage.jsx';
import SetorizacaoPage from './pages/SetorizacaoPage.jsx';
import TipoOrdemServicoPage from './pages/TipoOrdemServicoPage.jsx';
import LeituraGeracaoPage from './pages/LeituraGeracaoPage.jsx';
import LeituraRetornoPage from './pages/LeituraRetornoPage.jsx';
import LeituraAnalizadorPage from './pages/LeituraAnalizadorPage.jsx';
import LeituraHistoricoPage from './pages/LeituraHistoricoPage.jsx';
import FaturaMonitorPage from './pages/FaturaMonitorPage.jsx';
import FaturaCalendarioPage from './pages/FaturaCalendarioPage.jsx';
import FaturaCalculoPage from './pages/FaturaCalculoPage.jsx';
import FaturaImpressaoPage from './pages/FaturaImpressaoPage.jsx';
import FaturaRefaturamentoPage from './pages/FaturaRefaturamentoPage.jsx';
import GestaoSitePage from './pages/GestaoSitePage.jsx';
import TabelaServicosPage from './pages/TabelaServicosPage.jsx';
import MainLayout from './components/MainLayout.jsx';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    checkSavedSession();
  }, []);

  const checkSavedSession = async () => {
    try {
      const savedToken = localStorage.getItem('saae_session_token');
      if (savedToken) {
        const result = await window.electronAPI.auth.checkSession(savedToken);
        if (result.valid) {
          setCurrentUser(result.user);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('saae_session_token');
        }
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (user, token, rememberMe) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem('saae_session_token', token);
    }
  };

  const handleLogout = async () => {
    try {
      await window.electronAPI.auth.logout();
    } catch (e) {
      console.error('Logout error:', e);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('saae_session_token');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <div className="app-loading-spinner"></div>
        <p>Carregando SAAE ERP...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'settings':
        return <SettingsPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'unidade-consumidora':
        return <UnidadeConsumidoraPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'hidrometro':
        return <HidrometroPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'cobrancas':
        return <CobrancasPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'setorizacao':
        return <SetorizacaoPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'tabela-servicos':
        return <TabelaServicosPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'tipo-os':
        return <TipoOrdemServicoPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
      case 'leitura-geracao':
        return <LeituraGeracaoPage />;
      case 'leitura-retorno':
        return <LeituraRetornoPage />;
      case 'leitura-analizador':
        return <LeituraAnalizadorPage />;
      case 'leitura-historico':
        return <LeituraHistoricoPage />;
      case 'fatura-monitor':
        return <FaturaMonitorPage />;
      case 'fatura-calendario':
        return <FaturaCalendarioPage />;
      case 'fatura-calculo':
        return <FaturaCalculoPage />;
      case 'fatura-impressao':
        return <FaturaImpressaoPage />;
      case 'fatura-refaturamento':
        return <FaturaRefaturamentoPage />;
      case 'gestao-portal':
        return <GestaoSitePage />;
      default:
        return <DashboardPage user={currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />;
    }
  };

  return (
    <MainLayout 
      user={currentUser} 
      onLogout={handleLogout} 
      onNavigate={handleNavigate}
      currentPage={currentPage}
    >
      {renderPage()}
    </MainLayout>
  );
}

export default App;
