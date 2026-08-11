import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// Web browser fallback mock for electronAPI when running directly in browser
if (typeof window !== 'undefined' && !window.electronAPI) {
  console.log('%c[SAAE ERP] Executando em modo de compatibilidade Web (Navegador)', 'color: #0284c7; font-weight: bold; font-size: 14px;');
  
  window.electronAPI = {
    auth: {
      login: async (matricula, senha) => {
        console.log('[Web Mock] Login solicitado para:', matricula);
        
        // Simulação de login: aceita qualquer matrícula e senha para fins de demonstração
        if (matricula && senha) {
          const isDev = matricula.toLowerCase() === 'admin';
          const user = {
            matricula: matricula,
            nome: isDev ? 'Administrador do SAAE' : `Operador (${matricula})`,
            cargo: isDev ? 'Administrador Geral' : 'Operador Técnico',
            setor: 'Tecnologia da Informação'
          };
          
          return { 
            success: true, 
            user, 
            token: 'mock-web-session-token-' + Math.random().toString(36).substr(2, 9) 
          };
        }
        
        return { success: false, error: 'Matrícula e senha são obrigatórias.' };
      },
      logout: async () => {
        console.log('[Web Mock] Logout efetuado');
        return { success: true };
      },
      checkSession: async (token) => {
        console.log('[Web Mock] Verificando sessão:', token);
        // Retorna sessão válida para qualquer token mock
        if (token && token.startsWith('mock-web-session-token-')) {
          return {
            valid: true,
            user: {
              matricula: 'admin',
              nome: 'Administrador do SAAE',
              cargo: 'Administrador Geral',
              setor: 'Tecnologia da Informação'
            }
          };
        }
        return { valid: false };
      },
      getCurrentUser: async () => {
        return {
          matricula: 'admin',
          nome: 'Administrador do SAAE',
          cargo: 'Administrador Geral',
          setor: 'Tecnologia da Informação'
        };
      }
    },
    network: {
      getStatus: async () => {
        return { online: navigator.onLine, label: navigator.onLine ? 'Online' : 'Offline' };
      },
      onStatusChange: (callback) => {
        const handleOnline = () => callback({ online: true, label: 'Online' });
        const handleOffline = () => callback({ online: false, label: 'Offline' });
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
          window.removeEventListener('online', handleOnline);
          window.removeEventListener('offline', handleOffline);
        };
      }
    },
    db: {
      query: async (sql, params) => {
        console.log('[Web Mock DB Query]:', sql, params);
        return { success: true, data: [] };
      },
      execute: async (sql, params) => {
        console.log('[Web Mock DB Execute]:', sql, params);
        return { success: true, changes: 0 };
      }
    },
    app: {
      getVersion: async () => '1.0.0-web',
      getPlatform: () => 'browser'
    }
  };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
