import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import QuickAccess from './components/QuickAccess';
import SegundaViaSection from './components/SegundaViaSection';
import InfoGrid from './components/InfoGrid';
import Footer from './components/Footer';

function App() {
  const [siteConfig, setSiteConfig] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/site/config')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setSiteConfig(res.data);
        }
      })
      .catch(err => console.error('Erro ao buscar config do site:', err));
  }, []);

  return (
    <div 
      className="website-app" 
      style={siteConfig?.theme ? {
        '--primary-color': siteConfig.theme.primary || '#0f4b9c',
        '--primary-light': siteConfig.theme.primaryLight || '#1967d2',
        '--primary-dark': siteConfig.theme.primaryDark || '#072a5a'
      } : {}}
    >
      <Header config={siteConfig?.theme} />
      <main>
        <HeroBanner config={siteConfig?.hero} />
        <QuickAccess />
        <SegundaViaSection />
        <InfoGrid config={siteConfig} />
      </main>
      <Footer config={siteConfig?.footer} />
    </div>
  );
}

export default App;
