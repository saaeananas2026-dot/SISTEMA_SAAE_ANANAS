import React from 'react';
import { AlertTriangle, AlertCircle, Info, MessageCircle, MapPin, Mail, Phone, Clock } from 'lucide-react';

function InfoGrid({ config }) {
  const avisos = config?.avisos?.filter(a => a.title) || [];
  const noticias = config?.noticias?.filter(n => n.title) || [];
  const footer = config?.footer || {};

  return (
    <section className="info-grid-section section-padding">
      <div className="container">
        <div className="info-grid">
          
          {/* Column 1: Avisos Importantes */}
          <div className="info-column">
            <div className="column-header">
              <h3>AVISOS IMPORTANTES</h3>
              <a href="#" className="badge-link">VER TODOS</a>
            </div>
            <div className="aviso-list">
              {avisos.length === 0 ? <p style={{color: '#666', fontSize: '0.9rem'}}>Nenhum aviso no momento.</p> : null}
              {avisos.map((aviso, idx) => (
                <div key={idx} className="aviso-card">
                  <div className={`aviso-icon ${aviso.type || 'info'}`}>
                    {aviso.type === 'danger' ? <AlertCircle size={20}/> : aviso.type === 'warning' ? <AlertTriangle size={20}/> : <Info size={20}/>}
                  </div>
                  <div className="aviso-content">
                    <strong>{aviso.title}</strong>
                    <span>{aviso.text}</span>
                  </div>
                  <div className="aviso-arrow">&gt;</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Notícias */}
          <div className="info-column">
            <div className="column-header">
              <h3>NOTÍCIAS</h3>
              <a href="#" className="badge-link">VER TODAS</a>
            </div>
            <div className="noticia-list">
              {noticias.length === 0 ? <p style={{color: '#666', fontSize: '0.9rem'}}>Nenhuma notícia publicada.</p> : null}
              {noticias.map((noticia, idx) => (
                <div key={idx} className={`noticia-card ${!noticia.imgUrl ? 'flex-row' : ''}`} style={!noticia.imgUrl ? {background: 'var(--color-primary-light)', color: 'white'} : {}}>
                  {noticia.imgUrl && (
                    <div className="noticia-img" style={{ backgroundImage: `url(${noticia.imgUrl})` }}></div>
                  )}
                  {!noticia.imgUrl && (
                    <div className="noticia-icon" style={{padding: '0 0 0 16px'}}><MessageCircle color="white" size={24}/></div>
                  )}
                  <div className="noticia-content">
                    <strong style={!noticia.imgUrl ? {color: 'white'} : {}}>{noticia.title}</strong>
                    {noticia.text && <p style={!noticia.imgUrl ? {color: 'rgba(255,255,255,0.9)'} : {}}>{noticia.text}</p>}
                    <span className="noticia-date" style={!noticia.imgUrl ? {color: 'rgba(255,255,255,0.7)'} : {}}>{noticia.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Atendimento */}
          <div className="info-column">
            <div className="column-header">
              <h3>ATENDIMENTO</h3>
            </div>
            <div className="atendimento-card">
              <div className="atendimento-item">
                <MessageCircle size={20} className="icon-blue" />
                <div>
                  <strong>{footer.phone1 || '(63) 99999-0000'}</strong>
                  <span>WhatsApp</span>
                </div>
              </div>
              <div className="atendimento-item">
                <Phone size={20} className="icon-blue" />
                <div>
                  <strong>{footer.phone2 || '(63) 3333-0000'}</strong>
                  <span>Telefone fixo</span>
                </div>
              </div>
              <div className="atendimento-item">
                <Mail size={20} className="icon-blue" />
                <div>
                  <strong>{footer.email || 'atendimento@saae.to.gov.br'}</strong>
                  <span>E-mail</span>
                </div>
              </div>
              <div className="atendimento-item">
                <Clock size={20} className="icon-blue" />
                <div>
                  <strong>Horário de Atendimento</strong>
                  <span>{footer.businessHours || 'Segunda a Sexta, 07h às 17h'}</span>
                </div>
              </div>
              <div className="atendimento-item align-top">
                <MapPin size={20} className="icon-blue" />
                <div>
                  <strong>Endereço Físico</strong>
                  <span>{footer.address || 'Centro'}</span>
                </div>
              </div>
              <button className="btn-outline map-btn">
                <MapPin size={16} /> VER NO MAPA
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default InfoGrid;
