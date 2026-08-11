import React, { useState, useEffect } from 'react';

function HeroBanner({ config }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = config?.slides || [
    {
      title: 'ECONOMIZE HOJE PARA NÃO FALTAR AMANHÃ.',
      subtitle: 'ÁGUA É VIDA.',
      text: 'Use a água com consciência. Preserve esse bem essencial.',
      bgUrl: 'https://images.unsplash.com/photo-1541888037375-403487c02bbf?auto=format&fit=crop&w=1920&q=80'
    }
  ];

  // Filtra apenas slides que tenham ao menos título ou imagem preenchidos
  const activeSlides = slides.filter(s => s.title || s.bgUrl);
  const displaySlides = activeSlides.length > 0 ? activeSlides : slides;

  useEffect(() => {
    if (displaySlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % displaySlides.length);
    }, 5000); // 5 segundos
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  const slide = displaySlides[currentSlide];
  const bgUrl = slide?.bgUrl || slides[0].bgUrl;
  const finalBgUrl = bgUrl.startsWith('/') ? `http://localhost:3000${bgUrl}` : bgUrl;

  return (
    <section 
      className="hero-banner" 
      style={{ 
        backgroundImage: `linear-gradient(to right, var(--primary-dark, #072a5a) 0%, transparent 100%), url(${finalBgUrl})`,
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      <div className="container hero-container">
        <div className="hero-content" style={{animation: 'fadeIn 0.5s ease-in-out'}}>
          {slide?.subtitle && <h2 className="hero-subtitle" style={{ 
            color: slide.subtitleColor || 'rgba(255,255,255,0.9)', 
            fontSize: slide.subtitleSize !== 'default' ? slide.subtitleSize : undefined,
            fontFamily: slide.subtitleFont !== 'inherit' ? slide.subtitleFont : undefined
          }}>{slide.subtitle}</h2>}
          
          {slide?.title && <h1 className="hero-title" style={{ 
            color: slide.titleColor || 'white', 
            fontSize: slide.titleSize !== 'default' ? slide.titleSize : undefined,
            fontFamily: slide.titleFont !== 'inherit' ? slide.titleFont : undefined
          }}>{slide.title}</h1>}
          
          {slide?.text && <p className="hero-text" style={{ 
            color: slide.textColor || 'rgba(255,255,255,0.9)', 
            fontSize: slide.textSize !== 'default' ? slide.textSize : undefined,
            fontFamily: slide.textFont !== 'inherit' ? slide.textFont : undefined
          }}>{slide.text}</p>}
          <button className="btn-primary hero-btn">SAIBA MAIS</button>
        </div>
        
        {displaySlides.length > 1 && (
          <div className="hero-dots" style={{ position: 'absolute', bottom: '20px', left: '0', width: '100%', textAlign: 'center' }}>
            {displaySlides.map((_, index) => (
              <button 
                key={index} 
                onClick={() => setCurrentSlide(index)}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                style={{
                  width: '12px', height: '12px', borderRadius: '50%', margin: '0 5px', border: 'none',
                  background: currentSlide === index ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer', transition: 'background 0.3s'
                }}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default HeroBanner;
