import React from 'react';
import { MessageCircle, HeadphonesIcon, Globe, Camera, Video, Phone, Mail, MapPin } from 'lucide-react';

function Footer({ config }) {
  const aboutText = config?.about || 'Nosso compromisso é com você e com o futuro. Água tratada, responsabilidade e respeito à vida.';
  const phone1 = config?.phone1 || '(63) 99999-0000';
  const phone2 = config?.phone2 || '(63) 3333-0000';
  const email = config?.email || 'atendimento@saae.to.gov.br';
  const address = config?.address || 'Rua das Águas, 123 - Centro, Sua Cidade - TO';

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container footer-top-content">
          <div className="footer-top-text">
            <h3>PRECISANDO DE AJUDA?</h3>
            <p>Entre em contato pelos nossos canais<br/>de atendimento ou registre sua solicitação.</p>
          </div>
          <div className="footer-top-actions">
            <button className="btn-outline light"><MessageCircle size={18}/> FALE CONOSCO</button>
            <button className="btn-outline light"><HeadphonesIcon size={18}/> OUVIDORIA</button>
          </div>
          <div className="footer-top-app">
            <div>
              <h3>BAIXE NOSSO APP</h3>
              <p>Emita 2ª via, consulte débitos<br/>e muito mais na palma da mão.</p>
            </div>
            {/* Phone mockup placeholder */}
            <div className="phone-mockup">SAAE</div>
          </div>
        </div>
      </div>

      <div className="footer-main">
        <div className="container footer-main-grid">
          <div className="footer-col brand-col">
            <div className="logo-text light">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="var(--color-primary-light)" style={{marginBottom: '10px'}}><path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z"/></svg>
              <div>
                <strong>SAAE</strong>
                <span>Serviço Autônomo<br/>de Água e Esgoto</span>
              </div>
            </div>
            <p>{aboutText}</p>
            <div className="social-links">
              <a href="#"><Globe size={18}/></a>
              <a href="#"><Camera size={18}/></a>
              <a href="#"><Video size={18}/></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>LINKS RÁPIDOS</h4>
            <ul>
              <li><a href="#">Início</a></li>
              <li><a href="#">Serviços</a></li>
              <li><a href="#">Notícias</a></li>
              <li><a href="#">Ouvidoria</a></li>
              <li><a href="#">Contato</a></li>
              <li><a href="#">Área do Cliente</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>SERVIÇOS</h4>
            <ul>
              <li><a href="#">2ª Via de Conta</a></li>
              <li><a href="#">Situação de Débitos</a></li>
              <li><a href="#">Informar Falta de Água</a></li>
              <li><a href="#">Solicitações</a></li>
              <li><a href="#">Revisão de Conta</a></li>
              <li><a href="#">Ligação de Água e Esgoto</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-title">Atendimento</h3>
            <ul className="footer-links">
              <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Phone size={14}/> {phone1}</li>
              <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Phone size={14}/> {phone2}</li>
              <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}><Mail size={14}/> {email}</li>
              <li style={{display: 'flex', alignItems: 'center', gap: '8px'}}><MapPin size={14}/> {address}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <span>&copy; 2026 SAAE - Serviço Autônomo de Água e Esgoto. Todos os direitos reservados.</span>
          <div className="footer-legal">
            <a href="#">Política de Privacidade</a>
            <a href="#">Termos de Uso</a>
            <a href="#">Lei Geral de Proteção de Dados</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
