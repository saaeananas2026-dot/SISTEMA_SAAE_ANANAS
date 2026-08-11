import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import './DashboardPage.css';

function DashboardPage({ user, onLogout, onNavigate }) {
  const [networkStatus, setNetworkStatus] = useState({ online: false, label: 'Offline' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [serverInfo, setServerInfo] = useState(null);

  // Initial empty data for Recharts
  const consumptionData = [];
  const revenueData = [];
  const defaultData = [
    { name: 'Sem dados', value: 1 }
  ];

  const COLORS = ['#10b981', '#ef4444'];

  useEffect(() => {
    const getStatus = async () => {
      try {
        const status = await window.electronAPI.network.getStatus();
        setNetworkStatus(status);
      } catch (e) { /* ignore */ }
    };
    const getServerInfo = async () => {
      try {
        const info = await window.electronAPI.app.getServerInfo();
        setServerInfo(info);
      } catch (e) { /* ignore */ }
    };
    getStatus();
    getServerInfo();

    let cleanup;
    try {
      cleanup = window.electronAPI.network.onStatusChange((status) => {
        setNetworkStatus(status);
      });
    } catch (e) { /* ignore */ }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="content-header-stripe">
        <h2>VISUALIZAÇÃO GERAL DO SISTEMA</h2>
        {!networkStatus.online && (
          <span className="offline-badge">● Modo Offline</span>
        )}
      </div>

      <div className="dashboard-scrollable">
        {/* SEÇÃO 1: MÉTRICAS PRINCIPAIS */}
        <div className="dashboard-section">
          <h3 className="section-title">Visão Geral</h3>
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon primary">👥</div>
              <div className="kpi-data">
                <span className="kpi-label">Total de Consumidores</span>
                <span className="kpi-value">0</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon warning">📝</div>
              <div className="kpi-data">
                <span className="kpi-label">Leituras Pendentes</span>
                <span className="kpi-value">0</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon danger">📄</div>
              <div className="kpi-data">
                <span className="kpi-label">Faturas Vencidas</span>
                <span className="kpi-value">0</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-icon success">🔧</div>
              <div className="kpi-data">
                <span className="kpi-label">Ordens de Serviço Abertas</span>
                <span className="kpi-value">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 2: ANÁLISE DE DESEMPENHO */}
        <div className="dashboard-section">
          <h3 className="section-title">Indicadores de Desempenho</h3>
          <div className="charts-row">
            <div className="chart-card">
              <div className="card-header">
                <h3>Consumo Mensal de Água (m³)</h3>
                <button className="card-action">⋮</button>
              </div>
              <div className="chart-container-real">
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={consumptionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Bar dataKey="value" fill="#0d47a1" radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="card-header">
                <h3>Receita Mensal</h3>
                <button className="card-action">⋮</button>
              </div>
              <div className="chart-container-real">
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d47a1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0d47a1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Area type="monotone" dataKey="value" stroke="#0d47a1" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="card-header">
                <h3>Inadimplência vs Pagamentos</h3>
                <button className="card-action">⋮</button>
              </div>
              <div className="chart-container-real pie-chart-flex">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={defaultData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {defaultData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '8px', border: 'none'}} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="circle-legend">
                  <div><span className="dot green"></span> Pagos (85%)</div>
                  <div><span className="dot red"></span> Em Atraso (15%)</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO 3: OPERAÇÃO DIÁRIA */}
        <div className="dashboard-section">
          <h3 className="section-title">Operação Diária</h3>
          <div className="tables-row">
            <div className="table-card" style={{ flex: 2 }}>
              <div className="card-header">
                <h3>Últimas Leituras Registradas</h3>
                <button className="view-all-btn">Ver todas</button>
              </div>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Matrícula</th>
                      <th>Consumidor</th>
                      <th>Leitura (m³)</th>
                      <th>Data/Hora</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '1rem', color: '#64748b' }}>
                        Nenhuma leitura registrada recentemente.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="side-widgets">
              <div className="status-card">
                <div className="status-header">
                  <h3>Status do Sistema</h3>
                  <span className="pulse-indicator"></span>
                </div>
                <div className="status-list">
                  <div className="status-item">
                    <span className="status-label">Conexão Servidor</span>
                    <span className={`status-value ${networkStatus.online ? 'online' : 'offline'}`}>
                      {networkStatus.online ? 'Online' : 'Offline'}
                    </span>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Banco Local</span>
                    <span className="status-value online">Integrado</span>
                  </div>
                  <div className="status-item" style={{ borderTop: '1px dashed #e2e8f0', paddingTop: '8px', marginTop: '4px' }}>
                    <span className="status-label">Acesso Celular (PWA)</span>
                    <span className="status-value" style={{ color: '#00b0ff', fontWeight: '600' }}>
                      {serverInfo ? `http://${serverInfo.ip}:${serverInfo.port}` : 'Carregando...'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="weather-widget">
                <div className="weather-main">
                  <div className="weather-temp">31°C</div>
                  <div className="weather-time">
                    {currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                  <div className="weather-date">
                    {currentTime.toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <div className="weather-info">
                  <span className="weather-city">Ananás, TO</span>
                  <span className="weather-desc">Céu limpo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
