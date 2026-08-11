import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import './DashboardPage.css';
import './UnidadeConsumidoraPage.css';

// Banco de dados em memória local para simular interações ERP completas
const initialConsumers = [
  {
    instalacao: '10243-5',
    dv: '5',
    inscricao: '02.03.045.0120.001',
    codigoImovel: '98734',
    contribuinte: 'João da Silva Santos',
    cpfCnpj: '123.456.789-00',
    telefone: '(91) 98888-1111',
    email: 'joao.silva@email.com',
    compromissario: 'Ana Paula Santos (Cônjuge)',
    cpfCompromissario: '987.654.321-11',
    
    // Endereço
    logradouro: 'Av. Independência',
    nro: '1200',
    complemento: 'Apto 102 - Bloco B',
    bairro: 'Centro',
    cep: '67030-250',
    referencia: 'Próximo ao Supermercado Líder',
    zona: 'Urbana',
    setor: '02',
    quadra: '14',
    lote: '05',
    unidade: '01',
    
    // Características
    situacao: 'Ativa',
    categoria: 'Residencial',
    subcategoria: 'Residencial Padrão',
    tipoFaturamento: 'Medido',
    diametroRamal: '3/4"',
    tipoEsgoto: 'Fossa Séptica',
    
    // Hidrômetro
    hidrometro: 'A24B908',
    marca: 'Elster',
    modelo: 'M170',
    lacre: 'L-48201',
    dataInstalacao: '15/03/2023',
    leituraInicial: '0',
    
    historicos: [
      { data: '10/05/2026', tipo: 'Leitura', descricao: 'Leitura mensal registrada: 145 m³', responsavel: 'Agente Campo - Carlos' },
      { data: '12/04/2026', tipo: 'Leitura', descricao: 'Leitura mensal registrada: 130 m³', responsavel: 'Agente Campo - Carlos' },
      { data: '05/01/2026', tipo: 'Ocorrência', descricao: 'Troca de lacre do hidrômetro efetuada', responsavel: 'Técnico - Rafael' },
      { data: '10/12/2025', tipo: 'Leitura', descricao: 'Leitura mensal registrada: 115 m³', responsavel: 'Agente Campo - Marcos' },
      { data: '15/03/2023', tipo: 'Instalação', descricao: 'Instalação e ativação do hidrômetro A24B908', responsavel: 'Técnico - Marcos' }
    ],
    
    transferencias: [
      { data: '10/11/2024', antigo: 'Manoel da Silva Santos (Falecido)', novo: 'João da Silva Santos', motivo: 'Inventário / Sucessão', responsavel: 'Atendente - Juliana' }
    ],
    
    alteracoes: [
      { data: '05/01/2026', campo: 'Lacre Hidrômetro', antigo: 'L-12903', novo: 'L-48201', responsavel: 'Atendente - Juliana' },
      { data: '12/08/2025', campo: 'Telefone Proprietário', antigo: '(91) 98111-2222', novo: '(91) 98888-1111', responsavel: 'Sistema - Autoatendimento' }
    ],
    
    lancamentos: [
      { mes: '05/2026', vencimento: '10/06/2026', consumo: 15, agua: 45.00, esgoto: 36.00, taxas: 5.00, total: 86.00, pago: '-', situacao: 'EM ABERTO' },
      { mes: '04/2026', vencimento: '10/05/2026', consumo: 15, agua: 45.00, esgoto: 36.00, taxas: 0.00, total: 81.00, pago: '10/05/2026', situacao: 'PAGA' },
      { mes: '03/2026', vencimento: '10/04/2026', consumo: 12, agua: 36.00, esgoto: 28.80, taxas: 0.00, total: 64.80, pago: '08/04/2026', situacao: 'PAGA' },
      { mes: '02/2026', vencimento: '10/03/2026', consumo: 14, agua: 42.00, esgoto: 33.60, taxas: 12.50, total: 88.10, pago: '10/03/2026', situacao: 'PAGA' },
      { mes: '01/2026', vencimento: '10/02/2026', consumo: 10, agua: 30.00, esgoto: 24.00, taxas: 0.00, total: 54.00, pago: '09/02/2026', situacao: 'PAGA' }
    ],
    
    servicos: [
      { os: '48291', tipo: 'Vazamento no Cavalete', status: 'Concluída', abertura: '02/02/2026', execucao: '03/02/2026', equipe: 'Equipe Azul' },
      { os: '39201', tipo: 'Ligação Nova de Água', status: 'Concluída', abertura: '12/03/2023', execucao: '15/03/2023', equipe: 'Equipe Verde' }
    ],
    
    graficoConsumo: [
      { mes: 'Jun/25', consumo: 12 },
      { mes: 'Jul/25', consumo: 14 },
      { mes: 'Ago/25', consumo: 13 },
      { mes: 'Set/25', consumo: 15 },
      { mes: 'Out/25', consumo: 18 },
      { mes: 'Nov/25', consumo: 16 },
      { mes: 'Dez/25', consumo: 14 },
      { mes: 'Jan/26', consumo: 10 },
      { mes: 'Fev/26', consumo: 14 },
      { mes: 'Mar/26', consumo: 12 },
      { mes: 'Abr/26', consumo: 15 },
      { mes: 'Mai/26', consumo: 15 }
    ]
  },
  {
    instalacao: '20491-2',
    dv: '2',
    inscricao: '01.04.089.0340.001',
    codigoImovel: '45102',
    contribuinte: 'Maria do Carmo Oliveira',
    cpfCnpj: '234.567.890-11',
    telefone: '(91) 98777-2222',
    email: 'maria.carmo@email.com',
    compromissario: 'José de Oliveira (Cônjuge)',
    cpfCompromissario: '876.543.210-22',
    
    // Endereço
    logradouro: 'Rua Cláudio Sanders',
    nro: '340',
    complemento: 'Casa A',
    bairro: 'Coqueiro',
    cep: '67113-000',
    referencia: 'Atrás do Posto de Combustível',
    zona: 'Urbana',
    setor: '01',
    quadra: '08',
    lote: '22',
    unidade: '01',
    
    // Características
    situacao: 'Ativa',
    categoria: 'Residencial',
    subcategoria: 'Residencial Social',
    tipoFaturamento: 'Medido',
    diametroRamal: '1/2"',
    tipoEsgoto: 'Rede Pública',
    
    // Hidrômetro
    hidrometro: 'B98L342',
    marca: 'Sensus',
    modelo: 'S200',
    lacre: 'L-59102',
    dataInstalacao: '22/07/2022',
    leituraInicial: '0',
    
    historicos: [
      { data: '12/05/2026', tipo: 'Leitura', descricao: 'Leitura mensal registrada: 95 m³', responsavel: 'Agente Campo - Carlos' },
      { data: '14/04/2026', tipo: 'Leitura', descricao: 'Leitura mensal registrada: 88 m³', responsavel: 'Agente Campo - Carlos' }
    ],
    
    transferencias: [],
    
    alteracoes: [],
    
    lancamentos: [
      { mes: '05/2026', vencimento: '10/06/2026', consumo: 7, agua: 15.40, esgoto: 12.30, taxas: 0.00, total: 27.70, pago: '-', situacao: 'EM ABERTO' },
      { mes: '04/2026', vencimento: '10/05/2026', consumo: 8, agua: 17.60, esgoto: 14.08, taxas: 0.00, total: 31.68, pago: '08/05/2026', situacao: 'PAGA' },
      { mes: '03/2026', vencimento: '10/04/2026', consumo: 6, agua: 13.20, esgoto: 10.56, taxas: 0.00, total: 23.76, pago: '10/04/2026', situacao: 'PAGA' }
    ],
    
    servicos: [
      { os: '32104', tipo: 'Instalação de Caixa Padrão', status: 'Concluída', abertura: '20/07/2022', execucao: '22/07/2022', equipe: 'Equipe Azul' }
    ],
    
    graficoConsumo: [
      { mes: 'Jun/25', consumo: 8 },
      { mes: 'Jul/25', consumo: 9 },
      { mes: 'Ago/25', consumo: 7 },
      { mes: 'Set/25', consumo: 6 },
      { mes: 'Out/25', consumo: 8 },
      { mes: 'Nov/25', consumo: 9 },
      { mes: 'Dez/25', consumo: 8 },
      { mes: 'Jan/26', consumo: 5 },
      { mes: 'Fev/26', consumo: 7 },
      { mes: 'Mar/26', consumo: 6 },
      { mes: 'Abr/26', consumo: 8 },
      { mes: 'Mai/26', consumo: 7 }
    ]
  },
  {
    instalacao: '30562-8',
    dv: '8',
    inscricao: '03.01.012.0055.001',
    codigoImovel: '11032',
    contribuinte: 'Empresa de Bebidas Pará Ltda',
    cpfCnpj: '03.111.222/0001-99',
    telefone: '(91) 3277-4000',
    email: 'financeiro@bebidaspara.com.br',
    compromissario: 'Nivaldo Pinheiro (Gerente)',
    cpfCompromissario: '456.789.012-33',
    
    // Endereço
    logradouro: 'Rod. Mario Covas',
    nro: '55',
    complemento: 'Galpão 3',
    bairro: 'Jaderlândia',
    cep: '67118-200',
    referencia: 'Próximo ao Viaduto',
    zona: 'Urbana',
    setor: '03',
    quadra: '12',
    lote: '15',
    unidade: '03',
    
    // Características
    situacao: 'Ativa',
    categoria: 'Industrial',
    subcategoria: 'Industrial Grande Porte',
    tipoFaturamento: 'Medido',
    diametroRamal: '2"',
    tipoEsgoto: 'Tratamento Próprio',
    
    // Hidrômetro
    hidrometro: 'C45K901',
    marca: 'Itron',
    modelo: 'Flostar',
    lacre: 'L-67012',
    dataInstalacao: '10/01/2024',
    leituraInicial: '120',
    
    historicos: [
      { data: '05/05/2026', tipo: 'Leitura', descricao: 'Leitura mensal registrada: 1845 m³', responsavel: 'Agente Campo - Marcos' }
    ],
    
    transferencias: [],
    
    alteracoes: [],
    
    lancamentos: [
      { mes: '05/2026', vencimento: '10/06/2026', consumo: 120, agua: 720.00, esgoto: 0.00, taxas: 50.00, total: 770.00, pago: '-', situacao: 'EM ABERTO' },
      { mes: '04/2026', vencimento: '10/05/2026', consumo: 135, agua: 810.00, esgoto: 0.00, taxas: 50.00, total: 860.00, pago: '09/05/2026', situacao: 'PAGA' },
      { mes: '03/2026', vencimento: '10/04/2026', consumo: 110, agua: 660.00, esgoto: 0.00, taxas: 50.00, total: 710.00, pago: '10/04/2026', situacao: 'PAGA' }
    ],
    
    servicos: [
      { os: '51023', tipo: 'Aferição de Hidrômetro Grande', status: 'Concluída', abertura: '08/01/2024', execucao: '10/01/2024', equipe: 'Equipe Especializada' }
    ],
    
    graficoConsumo: [
      { mes: 'Jun/25', consumo: 110 },
      { mes: 'Jul/25', consumo: 125 },
      { mes: 'Ago/25', consumo: 130 },
      { mes: 'Set/25', consumo: 115 },
      { mes: 'Out/25', consumo: 140 },
      { mes: 'Nov/25', consumo: 138 },
      { mes: 'Dez/25', consumo: 120 },
      { mes: 'Jan/26', consumo: 105 },
      { mes: 'Fev/26', consumo: 115 },
      { mes: 'Mar/26', consumo: 110 },
      { mes: 'Abr/26', consumo: 135 },
      { mes: 'Mai/26', consumo: 120 }
    ]
  }
];

function UnidadeConsumidoraPage({ user, onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('Visualizar');
  const [consumers, setConsumers] = useState(initialConsumers);
  const [selectedUnit, setSelectedUnit] = useState(initialConsumers[0]);
  
  // Estados para busca
  const [searchInstalacao, setSearchInstalacao] = useState('');
  const [searchHidrometro, setSearchHidrometro] = useState('');
  const [searchProprietario, setSearchProprietario] = useState('');
  const [filteredConsumers, setFilteredConsumers] = useState(initialConsumers);

  // Estado para formulários de edição (Cadastro)
  const [formData, setFormData] = useState(initialConsumers[0]);

  // Estados para modais e formulários secundários
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showOSModal, setShowOSModal] = useState(false);

  // Campos para novas OS
  const [newOSType, setNewOSType] = useState('Vazamento no Cavalete');
  const [newOSEquipe, setNewOSEquipe] = useState('Equipe Azul');

  // Campos para Transferência
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerCpf, setNewOwnerCpf] = useState('');
  const [newOwnerPhone, setNewOwnerPhone] = useState('');
  const [newOwnerEmail, setNewOwnerEmail] = useState('');
  const [transferReason, setTransferReason] = useState('Venda do Imóvel');

  // Sincroniza formData ao alterar a unidade selecionada
  useEffect(() => {
    if (selectedUnit) {
      setFormData({ ...selectedUnit });
      // Limpa os campos de transferência
      setNewOwnerName('');
      setNewOwnerCpf('');
      setNewOwnerPhone('');
      setNewOwnerEmail('');
    }
  }, [selectedUnit]);

  // Função de busca nos filtros
  const handleSearch = () => {
    let result = consumers;
    if (searchInstalacao.trim() !== '') {
      result = result.filter(c => c.instalacao.includes(searchInstalacao.trim()));
    }
    if (searchHidrometro.trim() !== '') {
      result = result.filter(c => c.hidrometro.toLowerCase().includes(searchHidrometro.trim().toLowerCase()));
    }
    if (searchProprietario.trim() !== '') {
      result = result.filter(c => c.contribuinte.toLowerCase().includes(searchProprietario.trim().toLowerCase()));
    }
    setFilteredConsumers(result);
  };

  // Limpar Filtros de Busca
  const handleClearFilters = () => {
    setSearchInstalacao('');
    setSearchHidrometro('');
    setSearchProprietario('');
    setFilteredConsumers(consumers);
  };

  // Salvar Alterações de Cadastro (Update/Insert)
  const handleSaveCadastro = (e) => {
    e.preventDefault();
    
    // Procura se já existe para atualizar, senão adiciona
    const index = consumers.findIndex(c => c.instalacao === formData.instalacao);
    
    let updatedConsumers = [...consumers];
    const logData = new Date().toLocaleDateString('pt-BR');

    if (index >= 0) {
      // Atualização
      // Insere um histórico de alteração cadastral automaticamente
      const logEntry = {
        data: logData,
        campo: 'Atualização Geral',
        antigo: selectedUnit.contribuinte,
        novo: formData.contribuinte,
        responsavel: user?.nome || 'Operador Web'
      };
      
      const newHistory = {
        data: logData,
        tipo: 'Ocorrência',
        descricao: 'Alteração cadastral geral realizada via painel.',
        responsavel: user?.nome || 'Operador Web'
      };

      const updatedUnit = {
        ...formData,
        alteracoes: [logEntry, ...(selectedUnit.alteracoes || [])],
        historicos: [newHistory, ...(selectedUnit.historicos || [])]
      };
      
      updatedConsumers[index] = updatedUnit;
      setSelectedUnit(updatedUnit);
      alert('Cadastro da Unidade Consumidora atualizado com sucesso!');
    } else {
      // Novo registro
      if (!formData.instalacao) {
        alert('Por favor, defina um número de Instalação!');
        return;
      }
      
      const newUnit = {
        ...formData,
        historicos: [
          { data: logData, tipo: 'Instalação', descricao: 'Nova Unidade Consumidora registrada no sistema.', responsavel: user?.nome || 'Operador Web' }
        ],
        alteracoes: [],
        transferencias: [],
        lancamentos: [
          { mes: '05/2026', vencimento: '10/06/2026', consumo: 0, agua: 0.00, esgoto: 0.00, taxas: 0.00, total: 0.00, pago: '-', situacao: 'EM ABERTO' }
        ],
        servicos: [],
        graficoConsumo: [
          { mes: 'Mai/26', consumo: 0 }
        ]
      };
      
      updatedConsumers.push(newUnit);
      setSelectedUnit(newUnit);
      alert('Nova Unidade Consumidora registrada com sucesso!');
    }
    
    setConsumers(updatedConsumers);
    setFilteredConsumers(updatedConsumers);
  };

  // Transferência de Titularidade
  const handleConfirmTransfer = (e) => {
    e.preventDefault();
    if (!newOwnerName.trim() || !newOwnerCpf.trim()) {
      alert('Nome e CPF do novo titular são obrigatórios!');
      return;
    }

    const logData = new Date().toLocaleDateString('pt-BR');
    
    // Registra transferência
    const transferEntry = {
      data: logData,
      antigo: selectedUnit.contribuinte,
      novo: newOwnerName,
      motivo: transferReason,
      responsavel: user?.nome || 'Operador Web'
    };

    // Registra histórico geral
    const historyEntry = {
      data: logData,
      tipo: 'Transferência',
      descricao: `Mudança de titularidade de ${selectedUnit.contribuinte} para ${newOwnerName}.`,
      responsavel: user?.nome || 'Operador Web'
    };

    const updatedUnit = {
      ...selectedUnit,
      contribuinte: newOwnerName,
      cpfCnpj: newOwnerCpf,
      telefone: newOwnerPhone,
      email: newOwnerEmail,
      transferencias: [transferEntry, ...(selectedUnit.transferencias || [])],
      historicos: [historyEntry, ...(selectedUnit.historicos || [])]
    };

    // Atualiza base
    const updatedConsumers = consumers.map(c => c.instalacao === selectedUnit.instalacao ? updatedUnit : c);
    setConsumers(updatedConsumers);
    setFilteredConsumers(updatedConsumers);
    setSelectedUnit(updatedUnit);
    
    // Limpa campos
    setNewOwnerName('');
    setNewOwnerCpf('');
    setNewOwnerPhone('');
    setNewOwnerEmail('');
    
    alert('Transferência de titularidade efetuada com sucesso!');
  };

  // Criar nova O.S. (Serviços)
  const handleCreateOS = (e) => {
    e.preventDefault();
    const logData = new Date().toLocaleDateString('pt-BR');
    const newOSNumber = Math.floor(10000 + Math.random() * 90000).toString();
    
    const newOS = {
      os: newOSNumber,
      tipo: newOSType,
      status: 'Aberta',
      abertura: logData,
      execucao: '-',
      equipe: newOSEquipe
    };

    const historyEntry = {
      data: logData,
      tipo: 'Ocorrência',
      descricao: `Abertura de Ordem de Serviço Nº ${newOSNumber} para ${newOSType}.`,
      responsavel: user?.nome || 'Operador Web'
    };

    const updatedUnit = {
      ...selectedUnit,
      servicos: [newOS, ...(selectedUnit.servicos || [])],
      historicos: [historyEntry, ...(selectedUnit.historicos || [])]
    };

    const updatedConsumers = consumers.map(c => c.instalacao === selectedUnit.instalacao ? updatedUnit : c);
    setConsumers(updatedConsumers);
    setFilteredConsumers(updatedConsumers);
    setSelectedUnit(updatedUnit);
    setShowOSModal(false);
    alert(`Ordem de Serviço Nº ${newOSNumber} aberta com sucesso!`);
  };

  // Botões de Ação da Toolbar
  const handleToolbarAction = (action) => {
    if (action === 'Novo') {
      // Prepara objeto vazio para criação
      const newEmptyUnit = {
        instalacao: Math.floor(10000 + Math.random() * 90000).toString() + '-1',
        dv: '1',
        inscricao: '',
        codigoImovel: '',
        contribuinte: '',
        cpfCnpj: '',
        telefone: '',
        email: '',
        compromissario: '',
        cpfCompromissario: '',
        logradouro: '',
        nro: '',
        complemento: '',
        bairro: '',
        cep: '',
        referencia: '',
        zona: 'Urbana',
        setor: '01',
        quadra: '01',
        lote: '01',
        unidade: '01',
        situacao: 'Ativa',
        categoria: 'Residencial',
        subcategoria: 'Residencial Padrão',
        tipoFaturamento: 'Medido',
        diametroRamal: '1/2"',
        tipoEsgoto: 'Rede Pública',
        hidrometro: '',
        marca: '',
        modelo: '',
        lacre: '',
        dataInstalacao: '',
        leituraInicial: '0',
        historicos: [],
        transferencias: [],
        alteracoes: [],
        lancamentos: [],
        servicos: [],
        graficoConsumo: []
      };
      setFormData(newEmptyUnit);
      setActiveTab('Cadastro');
    } 
    else if (action === 'Alterar') {
      if (!selectedUnit) {
        alert('Por favor, selecione uma Unidade Consumidora na aba "Visualizar" primeiro.');
        return;
      }
      setFormData({ ...selectedUnit });
      setActiveTab('Cadastro');
    } 
    else if (action === 'Excluir') {
      if (!selectedUnit) {
        alert('Selecione uma Unidade Consumidora para excluir.');
        return;
      }
      if (confirm(`Tem certeza que deseja excluir permanentemente a UC ${selectedUnit.instalacao} (${selectedUnit.contribuinte})?`)) {
        const updated = consumers.filter(c => c.instalacao !== selectedUnit.instalacao);
        setConsumers(updated);
        setFilteredConsumers(updated);
        setSelectedUnit(updated[0] || null);
        alert('Unidade Consumidora removida com sucesso.');
        setActiveTab('Visualizar');
      }
    } 
    else if (action === 'Imprimir') {
      if (!selectedUnit) {
        alert('Nenhuma unidade selecionada para impressão.');
        return;
      }
      window.print();
    }
    else {
      alert(`Ação "${action}" executada com sucesso.`);
    }
  };

  const toolbarButtons = [
    { label: 'Novo', action: 'Novo', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg> },
    { label: 'Alterar', action: 'Alterar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> },
    { label: 'Excluir', action: 'Excluir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg> },
    { label: 'Imprimir', action: 'Imprimir', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg> },
    { label: 'Duplicar', action: 'Duplicar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> },
    { label: 'Funções', action: 'Funções', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg> },
    { label: 'Anexos', action: 'Anexos', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg> },
  ];

  const innerTabs = [
    { id: 'Cadastro', label: 'Cadastro' },
    { id: 'Históricos', label: 'Históricos' },
    { id: 'Transfer.', label: 'Transfer.' },
    { id: 'Alterações', label: 'Alterações' },
    { id: 'Lançamentos', label: 'Lançamentos' },
    { id: 'Serviços', label: 'Serviços' },
    { id: 'Análises', label: 'Análises' },
    { id: 'Visualizar', label: 'Visualizar' }
  ];

  return (
    <div className="consumer-container">
      {/* TOOLBAR */}
      <div className="toolbar-container">
        {toolbarButtons.map((btn, idx) => (
          <button 
            key={idx} 
            className="toolbar-btn"
            onClick={() => handleToolbarAction(btn.action)}
          >
            {btn.icon}
            <span>{btn.label}</span>
          </button>
        ))}
      </div>

      {/* INNER TABS */}
      <div className="inner-tabs">
        {innerTabs.map((tab) => (
          <button 
            key={tab.id} 
            className={`inner-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* BANNER UC ATIVA */}
      {selectedUnit && activeTab !== 'Visualizar' && (
        <div className="uc-selected-banner">
          <div className="uc-selected-info">
            <h3>Faturamento UC Nº {selectedUnit.instalacao}</h3>
            <p><strong>Contribuinte:</strong> {selectedUnit.contribuinte} | <strong>Endereço:</strong> {selectedUnit.logradouro}, nº {selectedUnit.nro} - {selectedUnit.bairro}</p>
          </div>
          <div className="uc-selected-badge">
            {selectedUnit.categoria} - {selectedUnit.situacao}
          </div>
        </div>
      )}

      {/* RENDERIZADOR DE CONTEÚDO DAS ABAS */}

      {/* 1. ABA CADASTRO (FORMULÁRIO EDITÁVEL) */}
      {activeTab === 'Cadastro' && (
        <form className="form-sections-container" onSubmit={handleSaveCadastro}>
          {/* SEÇÃO 1: DADOS GERAIS */}
          <div className="form-section-card">
            <div className="form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>
              <span>Dados de Identificação da Unidade</span>
            </div>
            <div className="filter-grid">
              <div className="search-field col-3">
                <label>Instalação</label>
                <input 
                  type="text" 
                  value={formData.instalacao || ''} 
                  onChange={(e) => setFormData({ ...formData, instalacao: e.target.value })}
                />
              </div>
              <div className="search-field col-1">
                <label>D.V.</label>
                <input 
                  type="text" 
                  maxLength="1"
                  value={formData.dv || ''} 
                  onChange={(e) => setFormData({ ...formData, dv: e.target.value })}
                />
              </div>
              <div className="search-field col-4">
                <label>Inscrição Imobiliária</label>
                <input 
                  type="text" 
                  value={formData.inscricao || ''} 
                  onChange={(e) => setFormData({ ...formData, inscricao: e.target.value })}
                />
              </div>
              <div className="search-field col-4">
                <label>Código do Imóvel</label>
                <input 
                  type="text" 
                  value={formData.codigoImovel || ''} 
                  onChange={(e) => setFormData({ ...formData, codigoImovel: e.target.value })}
                />
              </div>

              <div className="search-field col-8">
                <label>Proprietário Principal (Nome Completo)</label>
                <input 
                  type="text" 
                  value={formData.contribuinte || ''} 
                  onChange={(e) => setFormData({ ...formData, contribuinte: e.target.value })}
                  required
                />
              </div>
              <div className="search-field col-4">
                <label>CPF ou CNPJ Proprietário</label>
                <input 
                  type="text" 
                  value={formData.cpfCnpj || ''} 
                  onChange={(e) => setFormData({ ...formData, cpfCnpj: e.target.value })}
                />
              </div>

              <div className="search-field col-4">
                <label>Telefone Contato</label>
                <input 
                  type="text" 
                  value={formData.telefone || ''} 
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                />
              </div>
              <div className="search-field col-8">
                <label>Email de Faturamento</label>
                <input 
                  type="email" 
                  value={formData.email || ''} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="search-field col-8">
                <label>Compromissário Secundário</label>
                <input 
                  type="text" 
                  value={formData.compromissario || ''} 
                  onChange={(e) => setFormData({ ...formData, compromissario: e.target.value })}
                />
              </div>
              <div className="search-field col-4">
                <label>CPF Compromissário</label>
                <input 
                  type="text" 
                  value={formData.cpfCompromissario || ''} 
                  onChange={(e) => setFormData({ ...formData, cpfCompromissario: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: ENDEREÇO DA LIGAÇÃO */}
          <div className="form-section-card">
            <div className="form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Localização e Endereço da Ligação</span>
            </div>
            <div className="filter-grid">
              <div className="search-field col-6">
                <label>Logradouro</label>
                <input 
                  type="text" 
                  value={formData.logradouro || ''} 
                  onChange={(e) => setFormData({ ...formData, logradouro: e.target.value })}
                />
              </div>
              <div className="search-field col-2">
                <label>Número</label>
                <input 
                  type="text" 
                  value={formData.nro || ''} 
                  onChange={(e) => setFormData({ ...formData, nro: e.target.value })}
                />
              </div>
              <div className="search-field col-4">
                <label>Bairro</label>
                <input 
                  type="text" 
                  value={formData.bairro || ''} 
                  onChange={(e) => setFormData({ ...formData, bairro: e.target.value })}
                />
              </div>

              <div className="search-field col-3">
                <label>CEP</label>
                <input 
                  type="text" 
                  value={formData.cep || ''} 
                  onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                />
              </div>
              <div className="search-field col-4">
                <label>Complemento</label>
                <input 
                  type="text" 
                  value={formData.complemento || ''} 
                  onChange={(e) => setFormData({ ...formData, complemento: e.target.value })}
                />
              </div>
              <div className="search-field col-5">
                <label>Ponto de Referência</label>
                <input 
                  type="text" 
                  value={formData.referencia || ''} 
                  onChange={(e) => setFormData({ ...formData, referencia: e.target.value })}
                />
              </div>

              <div className="search-field col-2">
                <label>Setor Loc.</label>
                <input type="text" value={formData.setor || ''} onChange={(e) => setFormData({ ...formData, setor: e.target.value })}/>
              </div>
              <div className="search-field col-2">
                <label>Rota Loc.</label>
                <input type="text" value={formData.quadra || ''} onChange={(e) => setFormData({ ...formData, quadra: e.target.value })}/>
              </div>
              <div className="search-field col-2">
                <label>Quadra</label>
                <input type="text" value={formData.quadra || ''} onChange={(e) => setFormData({ ...formData, quadra: e.target.value })}/>
              </div>
              <div className="search-field col-2">
                <label>Lote</label>
                <input type="text" value={formData.lote || ''} onChange={(e) => setFormData({ ...formData, lote: e.target.value })}/>
              </div>
              <div className="search-field col-2">
                <label>Sub-Unidade</label>
                <input type="text" value={formData.unidade || ''} onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}/>
              </div>
              <div className="search-field col-2">
                <label>Zona</label>
                <select value={formData.zona || 'Urbana'} onChange={(e) => setFormData({ ...formData, zona: e.target.value })}>
                  <option value="Urbana">Urbana</option>
                  <option value="Rural">Rural</option>
                </select>
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: CARACTERÍSTICAS DA LIGAÇÃO E HIDRÔMETRO */}
          <div className="form-section-card">
            <div className="form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              <span>Parâmetros Técnicos e Equipamento de Medição</span>
            </div>
            <div className="filter-grid">
              <div className="search-field col-3">
                <label>Situação da Ligação</label>
                <select value={formData.situacao || 'Ativa'} onChange={(e) => setFormData({ ...formData, situacao: e.target.value })}>
                  <option value="Ativa">Ativa</option>
                  <option value="Inativa">Inativa</option>
                  <option value="Cortada">Cortada</option>
                  <option value="Suprimida">Suprimida</option>
                </select>
              </div>
              <div className="search-field col-3">
                <label>Categoria Principal</label>
                <select value={formData.categoria || 'Residencial'} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Pública">Pública</option>
                </select>
              </div>
              <div className="search-field col-3">
                <label>Faturamento</label>
                <select value={formData.tipoFaturamento || 'Medido'} onChange={(e) => setFormData({ ...formData, tipoFaturamento: e.target.value })}>
                  <option value="Medido">Medido (Hidrômetro)</option>
                  <option value="Estimado">Estimado (Taxa Fixa)</option>
                </select>
              </div>
              <div className="search-field col-3">
                <label>Diâmetro do Ramal</label>
                <input 
                  type="text" 
                  value={formData.diametroRamal || ''} 
                  onChange={(e) => setFormData({ ...formData, diametroRamal: e.target.value })}
                />
              </div>

              <div className="search-field col-3">
                <label>Número do Hidrômetro</label>
                <input 
                  type="text" 
                  value={formData.hidrometro || ''} 
                  onChange={(e) => setFormData({ ...formData, hidrometro: e.target.value })}
                />
              </div>
              <div className="search-field col-3">
                <label>Marca do Medidor</label>
                <input 
                  type="text" 
                  value={formData.marca || ''} 
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                />
              </div>
              <div className="search-field col-3">
                <label>Número do Lacre</label>
                <input 
                  type="text" 
                  value={formData.lacre || ''} 
                  onChange={(e) => setFormData({ ...formData, lacre: e.target.value })}
                />
              </div>
              <div className="search-field col-3">
                <label>Data de Instalação</label>
                <input 
                  type="text" 
                  placeholder="DD/MM/AAAA"
                  value={formData.dataInstalacao || ''} 
                  onChange={(e) => setFormData({ ...formData, dataInstalacao: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* BARRA DE AÇÕES DO FORMULÁRIO */}
          <div className="form-actions-bar">
            <button type="button" className="btn-form secondary" onClick={() => setActiveTab('Visualizar')}>
              Cancelar
            </button>
            <button type="submit" className="btn-form primary">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
              Salvar Dados
            </button>
          </div>
        </form>
      )}

      {/* 2. ABA HISTÓRICOS */}
      {activeTab === 'Históricos' && selectedUnit && (
        <div className="results-container">
          <div className="content-header-stripe" style={{ marginTop: '0' }}>
            <h2>Histórico de Atividades e Registros de Campo</h2>
          </div>
          <div className="table-responsive" style={{ padding: '20px' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Tipo Evento</th>
                  <th>Descrição da Atividade</th>
                  <th>Responsável</th>
                </tr>
              </thead>
              <tbody>
                {selectedUnit.historicos && selectedUnit.historicos.length > 0 ? (
                  selectedUnit.historicos.map((h, i) => (
                    <tr key={i}>
                      <td><strong>{h.data}</strong></td>
                      <td>
                        <span className={`badge-status ${h.tipo === 'Leitura' ? 'paga' : 'pendente'}`}>
                          {h.tipo}
                        </span>
                      </td>
                      <td>{h.descricao}</td>
                      <td>{h.responsavel}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                      Nenhum histórico registrado para esta unidade.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. ABA TRANSFER. (MUDANÇA DE PROPRIETÁRIO) */}
      {activeTab === 'Transfer.' && selectedUnit && (
        <div className="form-sections-container">
          <div className="split-layout">
            {/* LADO ESQUERDO: TITULAR ATUAL */}
            <div className="form-section-card">
              <div className="form-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Titularidade Atual (Proprietário)</span>
              </div>
              <div className="filter-grid">
                <div className="search-field col-12">
                  <label>Nome do Proprietário</label>
                  <input type="text" className="read-only-field" value={selectedUnit.contribuinte || ''} readOnly />
                </div>
                <div className="search-field col-6">
                  <label>CPF / CNPJ</label>
                  <input type="text" className="read-only-field" value={selectedUnit.cpfCnpj || ''} readOnly />
                </div>
                <div className="search-field col-6">
                  <label>Telefone</label>
                  <input type="text" className="read-only-field" value={selectedUnit.telefone || ''} readOnly />
                </div>
                <div className="search-field col-12">
                  <label>Compromissário Secundário</label>
                  <input type="text" className="read-only-field" value={selectedUnit.compromissario || '- Não Informado -'} readOnly />
                </div>
              </div>
            </div>

            {/* LADO DIREITO: NOVO TITULAR */}
            <form className="form-section-card" onSubmit={handleConfirmTransfer}>
              <div className="form-section-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                <span>Novos Dados de Titularidade</span>
              </div>
              <div className="filter-grid">
                <div className="search-field col-12">
                  <label>Nome do Novo Proprietário</label>
                  <input 
                    type="text" 
                    placeholder="Digite o nome completo" 
                    value={newOwnerName} 
                    onChange={(e) => setNewOwnerName(e.target.value)} 
                    required 
                  />
                </div>
                <div className="search-field col-6">
                  <label>CPF ou CNPJ</label>
                  <input 
                    type="text" 
                    placeholder="000.000.000-00" 
                    value={newOwnerCpf} 
                    onChange={(e) => setNewOwnerCpf(e.target.value)} 
                    required 
                  />
                </div>
                <div className="search-field col-6">
                  <label>Telefone de Contato</label>
                  <input 
                    type="text" 
                    placeholder="(91) 98888-8888" 
                    value={newOwnerPhone} 
                    onChange={(e) => setNewOwnerPhone(e.target.value)} 
                  />
                </div>
                <div className="search-field col-7">
                  <label>Email de Cobrança</label>
                  <input 
                    type="email" 
                    placeholder="email@servico.com" 
                    value={newOwnerEmail} 
                    onChange={(e) => setNewOwnerEmail(e.target.value)} 
                  />
                </div>
                <div className="search-field col-5">
                  <label>Motivo da Transferência</label>
                  <select value={transferReason} onChange={(e) => setTransferReason(e.target.value)}>
                    <option value="Venda do Imóvel">Venda do Imóvel</option>
                    <option value="Locação / Aluguel">Locação / Aluguel</option>
                    <option value="Herança / Sucessão">Herança / Sucessão</option>
                    <option value="Doação">Doação</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                <div className="col-12" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="submit" className="btn-form primary">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    Confirmar Transferência
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* HISTÓRICO DE MUDANÇAS DE TITULARIDADE */}
          <div className="form-section-card">
            <div className="form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Histórico de Transferências Deste Imóvel</span>
            </div>
            <div className="table-responsive">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Titular Anterior</th>
                    <th>Novo Titular</th>
                    <th>Motivo do Pedido</th>
                    <th>Operador Autorizante</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedUnit.transferencias && selectedUnit.transferencias.length > 0 ? (
                    selectedUnit.transferencias.map((t, i) => (
                      <tr key={i}>
                        <td>{t.data}</td>
                        <td style={{ color: '#ef4444' }}><s>{t.antigo}</s></td>
                        <td style={{ color: '#10b981', fontWeight: '700' }}>{t.novo}</td>
                        <td>{t.motivo}</td>
                        <td>{t.responsavel}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '15px' }}>
                        Nenhuma alteração de titularidade registrada para este imóvel.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. ABA ALTERAÇÕES (LOG DE AUDITORIA) */}
      {activeTab === 'Alterações' && selectedUnit && (
        <div className="results-container">
          <div className="content-header-stripe" style={{ marginTop: '0' }}>
            <h2>Log de Auditoria - Modificações de Campos Cadastrais</h2>
          </div>
          <div style={{ padding: '20px' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Data/Hora</th>
                  <th>Campo Modificado</th>
                  <th>Valor Anterior</th>
                  <th>Novo Valor</th>
                  <th>Operador SAAE</th>
                </tr>
              </thead>
              <tbody>
                {selectedUnit.alteracoes && selectedUnit.alteracoes.length > 0 ? (
                  selectedUnit.alteracoes.map((alt, i) => (
                    <tr key={i}>
                      <td>{alt.data}</td>
                      <td><strong>{alt.campo}</strong></td>
                      <td><span style={{ color: '#ef4444' }}>{alt.antigo}</span></td>
                      <td><span style={{ color: '#10b981', fontWeight: 'bold' }}>{alt.novo}</span></td>
                      <td>{alt.responsavel}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '15px' }}>
                      Nenhum registro de alteração de campo cadastral para esta unidade.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. ABA LANÇAMENTOS (LIVRO FINANCEIRO) */}
      {activeTab === 'Lançamentos' && selectedUnit && (
        <div className="results-container">
          <div className="content-header-stripe" style={{ marginTop: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Extrato Financeiro e Lançamentos de Cobrança</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="btn-search-action secondary" style={{ width: 'auto', padding: '6px 12px' }} onClick={() => alert('Simulação de parcelamento aberta.')}>
                Acordo de Débitos
              </button>
            </div>
          </div>
          <div style={{ padding: '20px' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Mês/Ref</th>
                  <th>Vencimento</th>
                  <th>Consumo (m³)</th>
                  <th>Tarifa Água</th>
                  <th>Tarifa Esgoto</th>
                  <th>Taxas/Multas</th>
                  <th>Total Fatura</th>
                  <th>Data Pago</th>
                  <th>Situação</th>
                  <th style={{ textAlign: 'center' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {selectedUnit.lancamentos && selectedUnit.lancamentos.length > 0 ? (
                  selectedUnit.lancamentos.map((lan, i) => (
                    <tr key={i}>
                      <td><strong>{lan.mes}</strong></td>
                      <td>{lan.vencimento}</td>
                      <td>{lan.consumo} m³</td>
                      <td>R$ {lan.agua.toFixed(2)}</td>
                      <td>R$ {lan.esgoto.toFixed(2)}</td>
                      <td>R$ {lan.taxas.toFixed(2)}</td>
                      <td style={{ fontWeight: '700', color: 'var(--color-primary)' }}>R$ {lan.total.toFixed(2)}</td>
                      <td>{lan.pago}</td>
                      <td>
                        <span className={`badge-status ${lan.situacao.toLowerCase().replace(' ', '')}`}>
                          {lan.situacao}
                        </span>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <button 
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }} 
                          title="Imprimir 2ª Via da Fatura"
                          onClick={() => {
                            setSelectedInvoice(lan);
                            setShowInvoiceModal(true);
                          }}
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '15px' }}>
                      Nenhum lançamento de fatura registrado para esta unidade.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. ABA SERVIÇOS (ORDENS DE SERVIÇO) */}
      {activeTab === 'Serviços' && selectedUnit && (
        <div className="results-container">
          <div className="content-header-stripe" style={{ marginTop: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>Ordens de Serviço e Demandas Técnicas Vinculadas</h2>
            <button className="btn-search-action primary" style={{ width: 'auto', padding: '6px 14px' }} onClick={() => setShowOSModal(true)}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" style={{ marginRight: '6px' }}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Solicitar Novo Serviço
            </button>
          </div>
          <div style={{ padding: '20px' }}>
            <table className="results-table">
              <thead>
                <tr>
                  <th>Cód. O.S.</th>
                  <th>Serviço Solicitado</th>
                  <th>Situação O.S.</th>
                  <th>Data Abertura</th>
                  <th>Data Execução</th>
                  <th>Equipe Campo</th>
                </tr>
              </thead>
              <tbody>
                {selectedUnit.servicos && selectedUnit.servicos.length > 0 ? (
                  selectedUnit.servicos.map((os, i) => (
                    <tr key={i}>
                      <td><strong>#{os.os}</strong></td>
                      <td>{os.tipo}</td>
                      <td>
                        <span className={`badge-status ${os.status === 'Concluída' ? 'concluida' : 'pendente'}`}>
                          {os.status}
                        </span>
                      </td>
                      <td>{os.abertura}</td>
                      <td>{os.execucao}</td>
                      <td>{os.equipe}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', padding: '15px' }}>
                      Nenhuma Ordem de Serviço aberta para esta unidade consumidora.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 7. ABA ANÁLISES (KPI & GRÁFICOS) */}
      {activeTab === 'Análises' && selectedUnit && (
        <div className="form-sections-container">
          {/* CARDS DE METRICAS */}
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-icon-container">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Média de Consumo</span>
                <span className="kpi-value">
                  {(selectedUnit.graficoConsumo?.reduce((acc, curr) => acc + curr.consumo, 0) / (selectedUnit.graficoConsumo?.length || 1)).toFixed(1)} m³
                </span>
              </div>
            </div>
            
            <div className="kpi-card">
              <div className="kpi-icon-container" style={{ background: '#E8F5E9', color: '#2E7D32' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/></svg>
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Último Consumo</span>
                <span className="kpi-value">
                  {selectedUnit.graficoConsumo?.[selectedUnit.graficoConsumo.length - 1]?.consumo || 0} m³
                </span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-container" style={{ background: '#FFF3E0', color: '#EF6C00' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Tarifa / Estrutura</span>
                <span className="kpi-value" style={{ fontSize: '0.85rem' }}>{selectedUnit.categoria}</span>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-icon-container" style={{ background: '#F3E5F5', color: '#6A1B9A' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="15"/><line x1="15" y1="9" x2="9" y2="15"/></svg>
              </div>
              <div className="kpi-details">
                <span className="kpi-label">Status Ramal</span>
                <span className="kpi-value" style={{ color: '#2e7d32' }}>{selectedUnit.situacao}</span>
              </div>
            </div>
          </div>

          {/* GRÁFICO HISTÓRICO DE CONSUMO */}
          <div className="chart-section-card">
            <div className="chart-header">
              <div className="chart-title">
                <h3>Perfil de Consumo Mensal (Últimos 12 Meses)</h3>
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 'bold' }}>VALORES EM METROS CÚBICOS (m³)</div>
            </div>
            
            <div className="chart-container">
              {selectedUnit.graficoConsumo && selectedUnit.graficoConsumo.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={selectedUnit.graficoConsumo}
                    margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="mes" stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#0F172A', color: '#FFF', borderRadius: '6px', fontSize: '11px', border: 'none' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', fontWeight: '600' }} />
                    <Line 
                      name="Consumo Registrado"
                      type="monotone" 
                      dataKey="consumo" 
                      stroke="#0D47A1" 
                      strokeWidth={3} 
                      activeDot={{ r: 8 }} 
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
                  Sem dados gráficos para exibição.
                </div>
              )}
            </div>
          </div>

          {/* PARÂMETROS DE QUALIDADE DA ÁGUA DO SETOR */}
          <div className="form-section-card">
            <div className="form-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
              <span>Parâmetros Químico-Biológicos Médios da Água (Setor {selectedUnit.setor})</span>
            </div>
            <div className="table-responsive">
              <table className="results-table" style={{ fontSize: '0.7rem' }}>
                <thead>
                  <tr>
                    <th>Indicador</th>
                    <th>Valor Detectado</th>
                    <th>Padrão de Potabilidade (Portaria GM/MS nº 888)</th>
                    <th>Status de Qualidade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Turbidez</strong></td>
                    <td>0.82 uT</td>
                    <td>Máximo 5.0 uT</td>
                    <td><span className="badge-status paga" style={{ padding: '2px 6px' }}>Conforme</span></td>
                  </tr>
                  <tr>
                    <td><strong>Flúor (Fluoretação)</strong></td>
                    <td>0.74 mg/L</td>
                    <td>0.6 a 0.8 mg/L</td>
                    <td><span className="badge-status paga" style={{ padding: '2px 6px' }}>Conforme</span></td>
                  </tr>
                  <tr>
                    <td><strong>Cloro Residual Livre</strong></td>
                    <td>1.45 mg/L</td>
                    <td>0.2 a 2.0 mg/L</td>
                    <td><span className="badge-status paga" style={{ padding: '2px 6px' }}>Conforme</span></td>
                  </tr>
                  <tr>
                    <td><strong>pH Médio</strong></td>
                    <td>6.95 pH</td>
                    <td>6.0 a 9.5 pH</td>
                    <td><span className="badge-status paga" style={{ padding: '2px 6px' }}>Conforme</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 8. ABA VISUALIZAR (TELA ORIGINAL DE PESQUISA) */}
      {activeTab === 'Visualizar' && (
        <>
          {/* STRIPE TITULO */}
          <div className="content-header-stripe" style={{ marginTop: '0', borderRadius: '0 0 var(--radius-md) var(--radius-md)' }}>
            <h2>Visualização Geral das Unidades Consumidoras</h2>
          </div>

          {/* FILTROS / PESQUISA */}
          <div className="filter-panel">
            <div className="filter-grid">
              <div className="search-field col-2">
                <label>Instalação</label>
                <input 
                  type="text" 
                  value={searchInstalacao} 
                  onChange={(e) => setSearchInstalacao(e.target.value)}
                  placeholder="Ex: 10243"
                />
              </div>
              <div className="search-field col-2">
                <label>Hidrômetro</label>
                <input 
                  type="text" 
                  value={searchHidrometro}
                  onChange={(e) => setSearchHidrometro(e.target.value)}
                  placeholder="Ex: A24B908"
                />
              </div>
              <div className="search-field col-8">
                <label>Proprietário / Titular</label>
                <input 
                  type="text" 
                  value={searchProprietario}
                  onChange={(e) => setSearchProprietario(e.target.value)}
                  placeholder="Pesquise por nome do consumidor"
                />
              </div>
            </div>

            <div className="filter-actions-right">
              <button className="btn-search-action primary" onClick={handleSearch}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                Pesquisar
              </button>
              <button className="btn-search-action secondary" onClick={handleClearFilters}>
                Limpar Filtros
              </button>
            </div>
          </div>

          {/* GRID DE RESULTADOS */}
          <div className="results-container">
            <div className="table-responsive">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Instalação</th>
                    <th>Setor</th>
                    <th>Rota</th>
                    <th>Seq.</th>
                    <th>Hidrômetro</th>
                    <th>Contribuinte</th>
                    <th>Logradouro</th>
                    <th>Nro.</th>
                    <th>Complemento</th>
                    <th>CEP</th>
                    <th>Bairro</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsumers.length > 0 ? (
                    filteredConsumers.map((c) => (
                      <tr 
                        key={c.instalacao} 
                        className={`row-clickable ${selectedUnit?.instalacao === c.instalacao ? 'selected' : ''}`}
                        onClick={() => setSelectedUnit(c)}
                        onDoubleClick={() => {
                          setSelectedUnit(c);
                          setActiveTab('Cadastro');
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <td><strong>{c.instalacao}</strong></td>
                        <td>{c.setor}</td>
                        <td>{c.quadra}</td>
                        <td>{c.lote}</td>
                        <td>{c.hidrometro || 'Sem Hidrômetro'}</td>
                        <td style={{ fontWeight: '600' }}>{c.contribuinte}</td>
                        <td>{c.logradouro}</td>
                        <td>{c.nro}</td>
                        <td>{c.complemento || '-'}</td>
                        <td>{c.cep}</td>
                        <td>{c.bairro}</td>
                      </tr>
                    ))
                  ) : (
                    <tr style={{ height: '100px' }}>
                      <td colSpan="11" style={{ textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' }}>
                        Nenhum registro encontrado. Utilize os filtros acima para pesquisar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ========================================================
          MODAIS INTERATIVOS (FATURA 2ª VIA & ABERTURA DE O.S.)
          ======================================================== */}

      {/* A. MODAL DE IMPRESSÃO DA 2ª VIA DE FATURA */}
      {showInvoiceModal && selectedInvoice && selectedUnit && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '480px' }}>
            <div className="modal-header">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                Visualizar 2ª Via da Fatura
              </h3>
              <button className="btn-close-modal" onClick={() => setShowInvoiceModal(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="modal-body" style={{ padding: '15px' }}>
              <div className="invoice-bill">
                <div className="bill-header">
                  <h4>SERVIÇO AUTÔNOMO DE ÁGUA E ESGOTO</h4>
                  <div>SAAE ANANINDEUA - PARÁ</div>
                  <div>CNPJ: 05.120.482/0001-90</div>
                </div>

                <div className="bill-row">
                  <span className="bill-title">Matrícula UC:</span>
                  <span>{selectedUnit.instalacao}</span>
                </div>
                <div className="bill-row">
                  <span className="bill-title">Consumidor:</span>
                  <span>{selectedUnit.contribuinte.substr(0, 24)}</span>
                </div>
                <div className="bill-row">
                  <span className="bill-title">Endereço:</span>
                  <span>{selectedUnit.logradouro}, {selectedUnit.nro}</span>
                </div>
                <div className="bill-row dashed">
                  <span className="bill-title">Bairro / Setor:</span>
                  <span>{selectedUnit.bairro} / Setor {selectedUnit.setor}</span>
                </div>

                <div className="bill-section-title">DETALHAMENTO DO FATURAMENTO</div>
                
                <div className="bill-row">
                  <span>Mês de Referência:</span>
                  <strong>{selectedInvoice.mes}</strong>
                </div>
                <div className="bill-row">
                  <span>Vencimento da Conta:</span>
                  <strong>{selectedInvoice.vencimento}</strong>
                </div>
                <div className="bill-row">
                  <span>Volume Consumido:</span>
                  <span>{selectedInvoice.consumo} m³</span>
                </div>
                
                <div className="bill-section-title">DISCRIMINAÇÃO DOS SERVIÇOS</div>
                
                <div className="bill-row">
                  <span>Tarifa de Abastecimento Água:</span>
                  <span>R$ {selectedInvoice.agua.toFixed(2)}</span>
                </div>
                <div className="bill-row">
                  <span>Tarifa de Esgotamento Sanitário:</span>
                  <span>R$ {selectedInvoice.esgoto.toFixed(2)}</span>
                </div>
                <div className="bill-row">
                  <span>Serviços Adicionais / Multas:</span>
                  <span>R$ {selectedInvoice.taxas.toFixed(2)}</span>
                </div>

                <div className="bill-section-title" style={{ background: '#000', color: '#FFF' }}>TOTAL A PAGAR</div>
                <div className="bill-row" style={{ fontSize: '1rem', fontWeight: 'bold', margin: '8px 0' }}>
                  <span>VALOR LIQUIDO:</span>
                  <span>R$ {selectedInvoice.total.toFixed(2)}</span>
                </div>

                <div className="barcode-placeholder">
                  <div className="barcode-lines"></div>
                  <div className="barcode-number">83650000000 8 {selectedInvoice.total.toFixed(0)}820138 2901382 0382910 2</div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-form secondary" onClick={() => setShowInvoiceModal(false)}>
                Fechar
              </button>
              <button className="btn-form primary" onClick={() => { window.print(); }}>
                Imprimir Documento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* B. MODAL PARA ABERTURA DE ORDEM DE SERVIÇO */}
      {showOSModal && selectedUnit && (
        <div className="modal-overlay">
          <form className="modal-content" onSubmit={handleCreateOS}>
            <div className="modal-header">
              <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                Registrar Solicitação de Serviço
              </h3>
              <button type="button" className="btn-close-modal" onClick={() => setShowOSModal(false)}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="modal-body">
              <div className="filter-grid">
                <div className="search-field col-12">
                  <label>Consumidor Vinculado</label>
                  <input type="text" className="read-only-field" value={`${selectedUnit.instalacao} - ${selectedUnit.contribuinte}`} readOnly />
                </div>
                
                <div className="search-field col-12">
                  <label>Tipo de Serviço Requerido</label>
                  <select value={newOSType} onChange={(e) => setNewOSType(e.target.value)}>
                    <option value="Vazamento no Cavalete">Vazamento no Cavalete</option>
                    <option value="Ligação Nova de Água">Ligação Nova de Água</option>
                    <option value="Troca de Hidrômetro">Troca de Hidrômetro</option>
                    <option value="Desobstrução de Esgoto">Desobstrução de Esgoto</option>
                    <option value="Corte por Inadimplência">Corte por Inadimplência</option>
                    <option value="Religação de Água">Religação de Água</option>
                    <option value="Aferição / Calibração de Medidor">Aferição / Calibração de Medidor</option>
                  </select>
                </div>

                <div className="search-field col-12">
                  <label>Equipe de Campo Responsável</label>
                  <select value={newOSEquipe} onChange={(e) => setNewOSEquipe(e.target.value)}>
                    <option value="Equipe Azul">Equipe Azul (Zona Central)</option>
                    <option value="Equipe Verde">Equipe Verde (Zona Leste)</option>
                    <option value="Equipe Roxa">Equipe Roxa (Zona Sul)</option>
                    <option value="Equipe Especializada">Equipe Especializada (Grandes Medidores)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn-form secondary" onClick={() => setShowOSModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn-form primary">
                Gerar O.S.
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

export default UnidadeConsumidoraPage;
