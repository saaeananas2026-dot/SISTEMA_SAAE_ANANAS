import React from 'react';
import { FileText, DollarSign, FileCheck, Droplet, HeadphonesIcon, Phone } from 'lucide-react';

function QuickAccess() {
  const actions = [
    { icon: <FileText size={32} color="var(--color-primary-light)" />, label: '2ª VIA DE CONTA' },
    { icon: <DollarSign size={32} color="var(--color-primary-dark)" />, label: 'SITUAÇÃO DE DÉBITOS' },
    { icon: <FileCheck size={32} color="var(--color-primary-dark)" />, label: 'PROTOCOLOS E SOLICITAÇÕES' },
    { icon: <Droplet size={32} color="var(--color-primary-dark)" />, label: 'INFORMAR FALTA DE ÁGUA' },
    { icon: <HeadphonesIcon size={32} color="var(--color-primary-dark)" />, label: 'OUVIDORIA' },
    { icon: <Phone size={32} color="var(--color-primary-dark)" />, label: 'FALE CONOSCO' },
  ];

  return (
    <section className="quick-access-section section-padding">
      <div className="container">
        <h3 className="section-title">ACESSO RÁPIDO</h3>
        <div className="quick-access-grid">
          {actions.map((action, idx) => (
            <button key={idx} className={`quick-action-card ${idx === 0 ? 'active' : ''}`}>
              <div className="action-icon">{action.icon}</div>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default QuickAccess;
