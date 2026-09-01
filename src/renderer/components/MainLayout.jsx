import React, { useState } from 'react';
import logoSaae from '../assets/logo-saae.png';

function MainLayout({ children, user, onLogout, onNavigate, currentPage }) {
  const [expandedMenu, setExpandedMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setExpandedMenu(expandedMenu === menuName ? null : menuName);
  };

  const sidebarMenus = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
      submenus: []
    },
    {
      id: 'tabelas',
      title: 'Tabelas',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18"/></svg>,
      submenus: ['Cobrança', 'Tipo de Hidrometro', 'Setorização', 'Tipo de O.S.']
    },
    {
      id: 'cadastros',
      title: 'Cadastros',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
      submenus: ['Unidade Consumidora', 'Hidrometro', 'Qualidade da Água', 'Tabela de Serviços']
    },
    {
      id: 'leitura',
      title: 'Leitura',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
      submenus: ['Geração', 'Retorno', 'Analizador', 'Historico']
    },
    {
      id: 'fatura',
      title: 'Fatura',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>,
      submenus: ['Monitor', 'Calendário', 'Calculo', 'Impressao', 'Refaturamento']
    },
    {
      id: 'servicos',
      title: 'Serviços',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>,
      submenus: ['Monitor', 'Solicitação', 'Ordem de Serviço', 'Agendar Pagamento', 'Notificação', 'Ordem de Corte']
    },
    {
      id: 'gestao',
      title: 'Gestão',
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
      submenus: ['Estação', 'Tomada de Decisão', 'Eventos', 'Portal do Cliente']
    }
  ];

  return (
    <div className="layout-container">
      {/* HEADER FIXO COMPARTILHADO */}
      <header className="app-header">
        <div className="header-left">
          <img src={logoSaae} alt="Logo SAAE" className="header-logo" />
        </div>
        
        <div className="header-center">
          <div className="search-bar-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Pesquisar unidade consumidora" 
            />
          </div>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <button className="action-btn" title="Notificações">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <button className="action-btn" title="Configurações" onClick={() => onNavigate('settings')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </button>
          </div>
          
          <div className="user-profile">
            <div className="user-info">
              <span className="user-name">{user?.nome || 'Administrador'}</span>
              <span className="user-role">{user?.cargo || 'ADMINISTRADOR'}</span>
            </div>
            <div className="user-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* SIDEBAR COMPARTILHADA */}
        <aside className="app-sidebar">
          <nav className="sidebar-nav">
            {sidebarMenus.map((menu) => {
              const isOpen = expandedMenu === menu.id;
              const isActive = currentPage === menu.id;
              return (
                <div key={menu.id} className={`sidebar-menu-group ${isOpen ? 'expanded' : ''}`}>
                  <button 
                    className={`sidebar-menu-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      toggleMenu(menu.id);
                      if (menu.submenus.length === 0) onNavigate(menu.id);
                    }}
                  >
                    <div className="menu-btn-left">
                      <span className="menu-icon">{menu.icon}</span>
                      <span className="menu-title">{menu.title}</span>
                    </div>
                    {menu.submenus && menu.submenus.length > 0 && (
                      <svg className="menu-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    )}
                  </button>
                  
                  <div className="sidebar-submenu" style={{ maxHeight: isOpen ? `${menu.submenus.length * 40}px` : '0px' }}>
                    {menu.submenus.map((sub, idx) => (
                      <button 
                        key={idx} 
                        className="submenu-item"
                        onClick={() => {
                          if (sub === 'Unidade Consumidora') onNavigate('unidade-consumidora');
                          if (sub === 'Hidrometro') onNavigate('hidrometro');
                          if (sub === 'Cobrança') onNavigate('cobrancas');
                          if (sub === 'Tipo de Hidrometro') onNavigate('hidrometro');
                          if (sub === 'Setorização') onNavigate('setorizacao');
                          if (sub === 'Tipo de O.S.') onNavigate('tipo-os');
                          if (sub === 'Tabela de Serviços') onNavigate('tabela-servicos');
                          if (sub === 'Geração') onNavigate('leitura-geracao');
                          if (sub === 'Retorno') onNavigate('leitura-retorno');
                          if (sub === 'Analizador') onNavigate('leitura-analizador');
                          if (sub === 'Historico') onNavigate('leitura-historico');
                          if (sub === 'Monitor') onNavigate('fatura-monitor');
                          if (sub === 'Calendário') onNavigate('fatura-calendario');
                          if (sub === 'Calculo') onNavigate('fatura-calculo');
                          if (sub === 'Impressao') onNavigate('fatura-impressao');
                          if (sub === 'Refaturamento') onNavigate('fatura-refaturamento');
                          if (sub === 'Portal do Cliente') onNavigate('gestao-portal');
                        }}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </nav>
          
          <div className="sidebar-footer">
            <button className="footer-action-btn" onClick={() => onNavigate('settings')}>
              <span className="footer-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg></span> Configuração
            </button>
            <button className="footer-action-btn" onClick={onLogout}>
              <span className="footer-icon red"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></span> Sair
            </button>
          </div>
        </aside>

        {/* CONTEÚDO DINÂMICO */}
        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
