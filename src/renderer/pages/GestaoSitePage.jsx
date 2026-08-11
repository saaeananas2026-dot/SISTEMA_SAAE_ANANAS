import React, { useState, useEffect } from 'react';

function GestaoSitePage() {
  const [config, setConfig] = useState({
    theme: { primary: '', primaryDark: '', primaryLight: '', logoUrl: '' },
    hero: { slides: [{}, {}, {}] },
    footer: { about: '', phone1: '', phone2: '', email: '', address: '' },
    avisos: [],
    noticias: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('tema');

  useEffect(() => {
    fetch('http://localhost:3000/api/site/config')
      .then(res => res.json())
      .then(res => {
        if (res.success && res.data) {
          setConfig(res.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (section, e) => {
    setConfig({
      ...config,
      [section]: { ...config[section], [e.target.name]: e.target.value }
    });
  };

  const handleSlideChange = (index, field, value) => {
    const newSlides = [...(config.hero?.slides || [{}, {}, {}])];
    newSlides[index] = { ...(newSlides[index] || { id: index + 1 }), [field]: value };
    setConfig({
      ...config,
      hero: { ...config.hero, slides: newSlides }
    });
  };

  const renderTextConfig = (label, fieldPrefix, slide, slideIndex) => (
    <div style={{ marginBottom: '12px', padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
      <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px', fontWeight: 'bold', color: '#334155' }}>{label}</label>
      <input 
        type="text" 
        value={slide[fieldPrefix] || ''} 
        onChange={(e) => handleSlideChange(slideIndex, fieldPrefix, e.target.value)} 
        style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '8px' }} 
        placeholder={`Texto para ${label.toLowerCase()}`}
      />
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input 
          type="color" 
          value={slide[`${fieldPrefix}Color`] || (fieldPrefix === 'title' ? '#ffffff' : '#e2e8f0')} 
          onChange={(e) => handleSlideChange(slideIndex, `${fieldPrefix}Color`, e.target.value)} 
          style={{ width: '36px', height: '36px', padding: '0', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }} 
          title="Cor do texto"
        />
        <select 
          value={slide[`${fieldPrefix}Size`] || 'default'} 
          onChange={(e) => handleSlideChange(slideIndex, `${fieldPrefix}Size`, e.target.value)} 
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
        >
          <option value="default">Tam. Padrão</option>
          <option value="1rem">1rem (Menor)</option>
          <option value="1.5rem">1.5rem (Normal)</option>
          <option value="2.5rem">2.5rem (Grande)</option>
          <option value="3.5rem">3.5rem (Gigante)</option>
          <option value="4.5rem">4.5rem (Extra Gigante)</option>
          <option value="5.5rem">5.5rem (Colossal)</option>
        </select>
        <select 
          value={slide[`${fieldPrefix}Font`] || 'inherit'} 
          onChange={(e) => handleSlideChange(slideIndex, `${fieldPrefix}Font`, e.target.value)} 
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '12px' }}
        >
          <option value="inherit">Fonte Padrão</option>
          <option value="'Inter', sans-serif">Inter</option>
          <option value="'Roboto', sans-serif">Roboto</option>
          <option value="'Montserrat', sans-serif">Montserrat</option>
          <option value="'Oswald', sans-serif">Oswald</option>
          <option value="'Playfair Display', serif">Playfair (Clássica)</option>
        </select>
      </div>
    </div>
  );

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      fetch('http://localhost:3000/api/site/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: reader.result, filename: file.name })
      })
      .then(res => res.json())
      .then(res => {
        setUploading(false);
        if (res.success) {
          handleSlideChange(index, 'bgUrl', `http://localhost:3000${res.url}`);
        } else {
          alert('Erro ao fazer upload da imagem.');
        }
      })
      .catch(err => {
        console.error(err);
        setUploading(false);
        alert('Falha na conexão de upload.');
      });
    };
    reader.readAsDataURL(file);
  };

  const handleArrayItemChange = (arrayName, index, field, value) => {
    const newArray = [...(config[arrayName] || [])];
    newArray[index] = { ...(newArray[index] || { id: Date.now() }), [field]: value };
    setConfig({ ...config, [arrayName]: newArray });
  };

  const handleNewsImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      fetch('http://localhost:3000/api/site/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: reader.result, filename: file.name })
      })
      .then(res => res.json())
      .then(res => {
        setUploading(false);
        if (res.success) handleArrayItemChange('noticias', index, 'imgUrl', `http://localhost:3000${res.url}`);
        else alert('Erro no upload.');
      })
      .catch(err => { setUploading(false); alert('Falha no upload.'); });
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      fetch('http://localhost:3000/api/site/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: reader.result, filename: file.name })
      })
      .then(res => res.json())
      .then(res => {
        setUploading(false);
        if (res.success) {
          handleChange('theme', { target: { name: 'logoUrl', value: `http://localhost:3000${res.url}` } });
        } else {
          alert('Erro no upload da logo.');
        }
      })
      .catch(err => { setUploading(false); alert('Falha no upload da logo.'); });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    setSaving(true);
    fetch('http://localhost:3000/api/site/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    })
    .then(res => res.json())
    .then(res => {
      setSaving(false);
      if (res.success) alert('Configurações salvas com sucesso! O site já está atualizado.');
    })
    .catch(err => {
      console.error(err);
      setSaving(false);
      alert('Erro ao salvar configurações.');
    });
  };

  if (loading) return <div style={{padding: 20}}>Carregando CMS...</div>;

  return (
    <div style={{ padding: '24px', maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '8px', marginTop: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2 style={{ color: '#0f4b9c', margin: 0 }}>Gestão Completa do Site Público</h2>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Gerencie as cores, textos, banners e rodapé.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{ background: '#0f4b9c', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {saving ? 'Salvando...' : 'Publicar Alterações no Site'}
        </button>
      </div>

      <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button 
          style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'tema' ? '3px solid #0f4b9c' : '3px solid transparent', color: activeTab === 'tema' ? '#0f4b9c' : '#64748b', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setActiveTab('tema')}
        >Cores e Logo</button>
        <button 
          style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'hero' ? '3px solid #0f4b9c' : '3px solid transparent', color: activeTab === 'hero' ? '#0f4b9c' : '#64748b', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setActiveTab('hero')}
        >Banner Principal</button>
        <button 
          style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'avisos' ? '3px solid #0f4b9c' : '3px solid transparent', color: activeTab === 'avisos' ? '#0f4b9c' : '#64748b', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setActiveTab('avisos')}
        >Avisos</button>
        <button 
          style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'noticias' ? '3px solid #0f4b9c' : '3px solid transparent', color: activeTab === 'noticias' ? '#0f4b9c' : '#64748b', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setActiveTab('noticias')}
        >Notícias</button>
        <button 
          style={{ padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === 'footer' ? '3px solid #0f4b9c' : '3px solid transparent', color: activeTab === 'footer' ? '#0f4b9c' : '#64748b', fontWeight: 'bold', cursor: 'pointer' }}
          onClick={() => setActiveTab('footer')}
        >Atendimento e Rodapé</button>
      </div>

      {activeTab === 'tema' && (
        <div>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Paleta de Cores e Identidade</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Cor Primária (Principal)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="color" name="primary" value={config.theme.primary} onChange={(e) => handleChange('theme', e)} style={{ height: '40px', width: '60px', padding: 0, border: 'none' }} />
                <input type="text" name="primary" value={config.theme.primary} onChange={(e) => handleChange('theme', e)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Cor Primária Clara (Botões, Ícones)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="color" name="primaryLight" value={config.theme.primaryLight} onChange={(e) => handleChange('theme', e)} style={{ height: '40px', width: '60px', padding: 0, border: 'none' }} />
                <input type="text" name="primaryLight" value={config.theme.primaryLight} onChange={(e) => handleChange('theme', e)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Cor Primária Escura (Cabeçalho/Rodapé)</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input type="color" name="primaryDark" value={config.theme.primaryDark} onChange={(e) => handleChange('theme', e)} style={{ height: '40px', width: '60px', padding: 0, border: 'none' }} />
                <input type="text" name="primaryDark" value={config.theme.primaryDark} onChange={(e) => handleChange('theme', e)} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Logo do Site (PNG, JPG, SVG)</label>
              <input type="file" accept=".png,.jpg,.jpeg,.svg" onChange={handleLogoUpload} disabled={uploading} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px dashed #ccc', background: 'white' }} />
              {config.theme.logoUrl && (
                <div style={{ marginTop: '10px', position: 'relative', display: 'inline-block' }}>
                  <img src={config.theme.logoUrl} alt="Logo Preview" style={{ height: '60px', borderRadius: '4px', objectFit: 'contain', background: '#e2e8f0', padding: '5px' }} />
                  <button onClick={() => handleChange('theme', { target: { name: 'logoUrl', value: '' } })} style={{position: 'absolute', top: -5, right: -10, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer', fontSize: '10px'}}>X</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'hero' && (
        <div>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Carrossel de Imagens e Textos (3 Slides)</h3>
          <p style={{marginBottom: '20px', color: '#666', fontSize: '14px'}}>Tamanho ideal da imagem: 1920x450 ou 1920x500 pixels. Você pode enviar uma foto e definir um texto exclusivo para cada uma!</p>
          
          {[0, 1, 2].map((i) => {
            const slide = config.hero?.slides?.[i] || {};
            return (
              <div key={i} style={{ marginBottom: '32px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px', background: '#f8fafc' }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#0f4b9c' }}>Slide {i + 1}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                  <div>
                    {renderTextConfig('Subtítulo', 'subtitle', slide, i)}
                    {renderTextConfig('Título Principal', 'title', slide, i)}
                    {renderTextConfig('Texto de Apoio', 'text', slide, i)}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Imagem de Fundo (Upload)</label>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(i, e)} disabled={uploading} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px dashed #ccc', background: 'white', marginBottom: '10px' }} />
                    {uploading && <span style={{fontSize: '12px', color: '#0f4b9c'}}>Enviando imagem...</span>}
                    {slide.bgUrl && (
                      <div style={{ marginTop: '10px', position: 'relative' }}>
                        <img src={slide.bgUrl.startsWith('/') ? `http://localhost:3000${slide.bgUrl}` : slide.bgUrl} alt={`Slide ${i+1}`} style={{ width: '100%', height: '120px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #ddd' }} />
                        <button onClick={() => handleSlideChange(i, 'bgUrl', '')} style={{position: 'absolute', top: 5, right: 5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer'}}>X</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'avisos' && (
        <div>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Avisos Importantes</h3>
          {[0, 1, 2].map((i) => {
            const aviso = config.avisos?.[i] || {};
            return (
              <div key={i} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#0f4b9c' }}>Aviso {i + 1}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Tipo</label>
                    <select value={aviso.type || 'info'} onChange={(e) => handleArrayItemChange('avisos', i, 'type', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px' }}>
                      <option value="info">Informação (Azul)</option>
                      <option value="warning">Atenção (Amarelo)</option>
                      <option value="danger">Urgente (Vermelho)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Título</label>
                    <input type="text" value={aviso.title || ''} onChange={(e) => handleArrayItemChange('avisos', i, 'title', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Descrição curta</label>
                    <input type="text" value={aviso.text || ''} onChange={(e) => handleArrayItemChange('avisos', i, 'text', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'noticias' && (
        <div>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Notícias em Destaque</h3>
          {[0, 1, 2].map((i) => {
            const noticia = config.noticias?.[i] || {};
            return (
              <div key={i} style={{ marginBottom: '16px', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#0f4b9c' }}>Notícia {i + 1}</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Título da Notícia</label>
                      <input type="text" value={noticia.title || ''} onChange={(e) => handleArrayItemChange('noticias', i, 'title', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Resumo</label>
                      <input type="text" value={noticia.text || ''} onChange={(e) => handleArrayItemChange('noticias', i, 'text', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '12px' }}>
                      <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Data</label>
                      <input type="text" value={noticia.date || ''} onChange={(e) => handleArrayItemChange('noticias', i, 'date', e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} placeholder="Ex: 22 de Julho de 2026" />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', marginBottom: '8px' }}>Imagem de Capa</label>
                    <input type="file" accept="image/*" onChange={(e) => handleNewsImageUpload(i, e)} disabled={uploading} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px dashed #ccc', background: 'white' }} />
                    {noticia.imgUrl && (
                      <div style={{ marginTop: '10px', position: 'relative' }}>
                        <img src={noticia.imgUrl} alt={`Notícia ${i+1}`} style={{ width: '100%', height: '120px', borderRadius: '4px', objectFit: 'cover' }} />
                        <button onClick={() => handleArrayItemChange('noticias', i, 'imgUrl', '')} style={{position: 'absolute', top: 5, right: 5, background: 'red', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer'}}>X</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'footer' && (
        <div>
          <h3 style={{ marginBottom: '16px', color: '#333' }}>Atendimento e Rodapé</h3>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Horário de Funcionamento</label>
            <input type="text" name="businessHours" value={config.footer.businessHours || ''} onChange={(e) => handleChange('footer', e)} placeholder="Ex: Segunda a Sexta, 07h às 17h" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Texto Sobre a Empresa</label>
            <textarea name="about" value={config.footer.about} onChange={(e) => handleChange('footer', e)} rows="2" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Telefone 1 (WhatsApp)</label>
              <input type="text" name="phone1" value={config.footer.phone1} onChange={(e) => handleChange('footer', e)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Telefone 2 (Fixo)</label>
              <input type="text" name="phone2" value={config.footer.phone2} onChange={(e) => handleChange('footer', e)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>E-mail de Atendimento</label>
              <input type="text" name="email" value={config.footer.email} onChange={(e) => handleChange('footer', e)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>Endereço Físico</label>
              <input type="text" name="address" value={config.footer.address} onChange={(e) => handleChange('footer', e)} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestaoSitePage;
