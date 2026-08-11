import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Wifi, WifiOff } from 'lucide-react';
import LeituraPage from './pages/LeituraPage';
import BoletoPage from './pages/BoletoPage';
import ConfigPage from './pages/ConfigPage';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <BrowserRouter>
      <header className="app-header">
        <h1>SAAE Mobile</h1>
        <div className="connection-status">
          {isOnline ? (
            <span className="status-badge online"><Wifi size={14} style={{marginRight: 4, verticalAlign: 'middle'}}/> Online</span>
          ) : (
            <span className="status-badge offline"><WifiOff size={14} style={{marginRight: 4, verticalAlign: 'middle'}}/> Offline</span>
          )}
        </div>
      </header>
      
      <main className="container">
        <Routes>
          <Route path="/" element={<LeituraPage />} />
          <Route path="/boleto/:id" element={<BoletoPage />} />
          <Route path="/config" element={<ConfigPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
