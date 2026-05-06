import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard, FileText, Calendar, Users, ClipboardList,
  Package, Plus, Trash2, Pencil, X, Check, Clock,
  Euro, AlertCircle, Building2, HardHat, ChevronRight,
  Download, Hammer, CalendarDays, FileBarChart, Menu,
  Wrench, MapPin, Phone, TrendingUp,
  Receipt, CreditCard, Truck, Fuel, Briefcase,
  Bell, Search, Shield, FolderOpen, BarChart3,
  ArrowUp, ArrowDown, AlertTriangle, CheckCircle2,
  Activity, Target, Award,
  Image, Send, Camera, Upload, Eye, Mail, Copy,
  Scale, Map, Save, FileSpreadsheet, Presentation, Database
} from 'lucide-react';

const storage = {
  async get(key, defaultValue = null) {
    try {
      const r = await window.storage.get(key);
      return r ? JSON.parse(r.value) : defaultValue;
    } catch { return defaultValue; }
  },
  async set(key, value) {
    try { await window.storage.set(key, JSON.stringify(value)); }
    catch (e) { console.error('Storage error', e); }
  }
};

const uid = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
const eur = (n) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(Number(n) || 0);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('pt-PT') : '—';
const today = () => new Date().toISOString().split('T')[0];

const KEYS = ['obras', 'trabalhadores', 'orcamentos', 'planos', 'partes', 'materiais', 'tarefas', 'relatorios',
              'faturas', 'despesas', 'maquinas', 'manutencoes', 'abastecimentos',
              'fornecedores', 'subcontratados', 'documentos', 'epi', 'formacoes', 'acidentes',
              'fotos', 'relatoriosDiarios'];

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const [data, setData] = useState(null);
  const [template, setTemplate] = useState(null);
  const openTemplate = (t) => setTemplate(t);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const loaded = {};
      for (const k of KEYS) loaded[k] = await storage.get(k, []);
      setData(loaded);
    })();
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
        setNotifOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const save = async (key, value) => {
    setData(d => ({ ...d, [key]: value }));
    await storage.set(key, value);
  };

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-100">
        <div className="font-display text-2xl tracking-wider text-stone-900">A CARREGAR...</div>
      </div>
    );
  }

  const NAV = [
    { section: 'PAINEL', items: [
      { id: 'dashboard', label: 'Painel', icon: LayoutDashboard },
      { id: 'calendario', label: 'Calendário', icon: Calendar },
      { id: 'analise', label: 'Análise', icon: BarChart3 },
      { id: 'mapa', label: 'Mapa de Obras', icon: Map },
    ]},
    { section: 'OBRAS', items: [
      { id: 'obras', label: 'Obras', icon: Building2 },
      { id: 'tarefas', label: 'Cronograma', icon: Target },
      { id: 'planos', label: 'Plano Diário', icon: CalendarDays },
      { id: 'partes', label: 'Partes Diárias', icon: ClipboardList },
      { id: 'fotos', label: 'Galeria', icon: Image },
    ]},
    { section: 'COMERCIAL', items: [
      { id: 'orcamentos', label: 'Orçamentos', icon: FileText },
      { id: 'faturas', label: 'Faturas', icon: Receipt },
    ]},
    { section: 'CUSTOS · ESTALEIRO', items: [
      { id: 'despesas', label: 'Despesas', icon: CreditCard },
      { id: 'materiais', label: 'Estaleiro', icon: Package },
      { id: 'comparador', label: 'Comparador Preços', icon: Scale },
      { id: 'fornecedores', label: 'Fornecedores', icon: Briefcase },
      { id: 'subcontratados', label: 'Subempreitadas', icon: Briefcase },
    ]},
    { section: 'RECURSOS', items: [
      { id: 'equipa', label: 'Equipa', icon: Users },
      { id: 'ferramentas', label: 'Ferramentas', icon: Wrench },
      { id: 'seguranca', label: 'Segurança', icon: Shield },
    ]},
    { section: 'DOCUMENTOS', items: [
      { id: 'documentos', label: 'Documentos', icon: FolderOpen },
      { id: 'relatorios', label: 'Relatórios', icon: FileBarChart },
      { id: 'relatorio-diario', label: 'Relatório Diário', icon: Send },
    ]},
    { section: 'SISTEMA', items: [
      { id: 'backup', label: 'Backup', icon: Database },
    ]},
  ];
  const NAV_FLAT = NAV.flatMap(g => g.items);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', sans-serif; font-variation-settings: 'opsz' 96; letter-spacing: -0.03em; font-weight: 700; }
        .font-body { font-family: 'Geist', system-ui, sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        body { font-family: 'Geist', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        .grid-bg {
          background-image:
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0);
          background-size: 28px 28px;
        }
        .scrollbar-thin::-webkit-scrollbar { width: 6px; height: 6px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 8px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .anim-in { animation: fadeUp 0.4s ease-out both; }
        .anim-in-1 { animation-delay: 0.05s; }
        .anim-in-2 { animation-delay: 0.1s; }
        .anim-in-3 { animation-delay: 0.15s; }
        .anim-in-4 { animation-delay: 0.2s; }

        .glow-amber { box-shadow: 0 0 0 1px rgba(245,158,11,0.2), 0 8px 24px -8px rgba(245,158,11,0.4); }
        .card-hover { transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 12px 32px -12px rgba(0,0,0,0.15); }

        .mesh-bg {
          background-image:
            radial-gradient(at 20% 20%, rgba(245,158,11,0.18) 0px, transparent 50%),
            radial-gradient(at 80% 0%, rgba(251,146,60,0.12) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(245,158,11,0.08) 0px, transparent 50%);
        }

        @media print {
          body * { visibility: hidden !important; }
          #print-template, #print-template * { visibility: visible !important; }
          #print-template {
            position: absolute !important;
            left: 0 !important; top: 0 !important;
            width: 100% !important; padding: 0 !important;
            background: white !important;
          }
          .no-print { display: none !important; }
          @page { size: A4; margin: 14mm; }
        }
      `}</style>

      <div className="min-h-screen bg-stone-50 font-body text-stone-900 flex">
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-stone-100 flex flex-col transform transition-transform shadow-2xl ${navOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className="p-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Hammer className="w-5 h-5 text-zinc-900" strokeWidth={2.5} />
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/20" />
              </div>
              <div>
                <div className="font-display text-base leading-none tracking-tight">Slide &amp; Stone</div>
                <div className="text-[10px] tracking-[0.2em] text-amber-400/80 mt-1.5 font-medium">SA · CONSTRUÇÃO CIVIL</div>
              </div>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto py-3 scrollbar-thin px-3">
            {NAV.map(group => (
              <div key={group.section} className="mb-4">
                <div className="px-3 mb-1.5 text-[9px] tracking-[0.25em] text-stone-500 font-bold">{group.section}</div>
                {group.items.map(n => {
                  const Icon = n.icon;
                  const active = tab === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => { setTab(n.id); setNavOpen(false); }}
                      className={`w-full flex items-center gap-3 px-3 py-2 mb-0.5 text-sm rounded-xl transition-all ${active
                        ? 'bg-gradient-to-r from-amber-500/15 to-transparent text-white shadow-sm ring-1 ring-amber-500/20'
                        : 'text-stone-400 hover:bg-white/5 hover:text-white'}`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-amber-400' : ''}`} />
                      <span className="font-medium">{n.label}</span>
                      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-amber-400" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10 text-[10px] text-stone-500 tracking-widest font-mono">
            <div className="flex items-center justify-between">
              <span>v1.0</span>
              <span className="text-stone-600">GESTÃO DE OBRA</span>
            </div>
          </div>
        </aside>

        {navOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setNavOpen(false)} />}

        <main className="flex-1 flex flex-col min-w-0">
          <header className="bg-white/80 backdrop-blur-xl border-b border-stone-200 px-4 lg:px-8 py-3.5 flex items-center justify-between sticky top-0 z-20 gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <button className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-stone-100" onClick={() => setNavOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.2em] text-stone-400 font-medium">PAINEL DE GESTÃO</div>
                <h1 className="font-display text-xl lg:text-2xl tracking-tight text-stone-900 truncate">{NAV_FLAT.find(n => n.id === tab)?.label}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} className="hidden md:flex items-center gap-2 text-sm text-stone-500 bg-stone-100 hover:bg-stone-200 transition-colors rounded-xl px-3 py-2 min-w-[200px]">
                <Search className="w-4 h-4" />
                <span>Pesquisar...</span>
                <kbd className="ml-auto text-[9px] font-mono bg-white px-1.5 py-0.5 rounded border border-stone-300">⌘ K</kbd>
              </button>
              <button onClick={() => setSearchOpen(true)} className="md:hidden p-2.5 rounded-xl hover:bg-stone-100">
                <Search className="w-4 h-4" />
              </button>
              <NotificationsBell data={data} setTab={setTab} open={notifOpen} setOpen={setNotifOpen} />
              <div className="hidden md:block text-right ml-2">
                <div className="text-stone-400 tracking-widest text-[10px] font-medium">HOJE</div>
                <div className="font-mono font-semibold text-stone-700 text-xs">{fmtDate(today())}</div>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-zinc-900 text-amber-400 flex items-center justify-center font-display rounded-xl shadow-md ring-1 ring-white/10">R</div>
            </div>
          </header>

          <div className="flex-1 p-4 lg:p-8 grid-bg">
            {tab === 'dashboard' && <Dashboard data={data} setTab={setTab} openTemplate={openTemplate} />}
            {tab === 'calendario' && <Calendario data={data} setTab={setTab} />}
            {tab === 'analise' && <Analise data={data} />}
            {tab === 'obras' && <Obras data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'orcamentos' && <Orcamentos data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'planos' && <PlanoDiario data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'partes' && <PartesDiarias data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'tarefas' && <Cronograma data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'materiais' && <Materiais data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'relatorios' && <Relatorios data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'equipa' && <Equipa data={data} save={save} openTemplate={openTemplate} />}
            {tab === 'faturas' && <Faturas data={data} save={save} />}
            {tab === 'despesas' && <Despesas data={data} save={save} />}
            {tab === 'ferramentas' && <Ferramentas data={data} save={save} />}
            {tab === 'fornecedores' && <Fornecedores data={data} save={save} />}
            {tab === 'subcontratados' && <Subcontratados data={data} save={save} />}
            {tab === 'documentos' && <Documentos data={data} save={save} />}
            {tab === 'seguranca' && <Seguranca data={data} save={save} />}
            {tab === 'fotos' && <Galeria data={data} save={save} />}
            {tab === 'relatorio-diario' && <RelatorioDiario data={data} save={save} />}
            {tab === 'mapa' && <MapaObras data={data} setTab={setTab} />}
            {tab === 'comparador' && <Comparador data={data} />}
            {tab === 'backup' && <Backup data={data} save={save} />}
          </div>
        </main>
      </div>
      {template && <TemplateOverlay type={template} onClose={() => setTemplate(null)} />}
      {searchOpen && <SearchPalette data={data} setTab={setTab} onClose={() => setSearchOpen(false)} />}
    </>
  );
}

const Btn = ({ children, onClick, variant = 'primary', size = 'md', className = '', type = 'button', disabled }) => {
  const styles = {
    primary: 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow-md',
    accent: 'bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900 hover:from-amber-300 hover:to-orange-400 shadow-md shadow-amber-500/20 hover:shadow-lg hover:shadow-amber-500/30',
    outline: 'bg-white border border-stone-300 text-stone-800 hover:border-stone-400 hover:bg-stone-50 shadow-sm',
    ghost: 'bg-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-900',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 shadow-sm',
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs rounded-lg', md: 'px-4 py-2 text-sm rounded-xl', lg: 'px-6 py-3 rounded-xl' };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`inline-flex items-center gap-2 font-semibold tracking-tight transition-all disabled:opacity-40 disabled:pointer-events-none ${styles[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white border border-stone-200/80 rounded-2xl shadow-sm ${className}`}>{children}</div>
);

const SectionHeader = ({ title, action }) => (
  <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
    <h2 className="font-display text-xl tracking-tight text-stone-900">{title}</h2>
    {action}
  </div>
);

const Empty = ({ icon: Icon, title, hint }) => (
  <Card className="p-12 text-center">
    <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl flex items-center justify-center">
      <Icon className="w-6 h-6 text-stone-400" />
    </div>
    <div className="font-display text-base mb-1 text-stone-800">{title}</div>
    <div className="text-sm text-stone-500">{hint}</div>
  </Card>
);

const Field = ({ label, children, className = '' }) => (
  <label className={`block ${className}`}>
    <div className="text-[10px] tracking-[0.18em] text-stone-500 mb-1.5 font-semibold uppercase">{label}</div>
    {children}
  </label>
);

const Input = (props) => (
  <input {...props}
    className={`w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-body ${props.className || ''}`} />
);

const Select = ({ children, ...props }) => (
  <select {...props}
    className={`w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all ${props.className || ''}`}>
    {children}
  </select>
);

const Textarea = (props) => (
  <textarea {...props}
    className={`w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all font-body ${props.className || ''}`} />
);

const Badge = ({ children, variant = 'gray' }) => {
  const v = {
    gray: 'bg-stone-100 text-stone-700 ring-1 ring-stone-200',
    green: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200',
    amber: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
    red: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200',
    blue: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
    black: 'bg-zinc-900 text-amber-400 ring-1 ring-white/10',
  };
  return <span className={`inline-flex items-center px-2.5 py-1 text-[10px] tracking-widest font-bold rounded-md ${v[variant]}`}>{children}</span>;
};

const Modal = ({ open, onClose, title, children, wide }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} my-8 overflow-hidden anim-in`} onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between bg-gradient-to-r from-zinc-900 to-zinc-800 text-white px-6 py-4">
          <div className="font-display text-sm tracking-tight">{title}</div>
          <button onClick={onClose} className="hover:bg-white/10 rounded-lg p-1 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 max-h-[75vh] overflow-y-auto scrollbar-thin">{children}</div>
      </div>
    </div>
  );
};

function Dashboard({ data, setTab, openTemplate }) {
  const obrasAtivas = data.obras.filter(o => o.estado === 'em_curso').length;
  const orcPendentes = data.orcamentos.filter(o => o.estado === 'enviado').length;
  const valorOrcAprovados = data.orcamentos.filter(o => o.estado === 'aprovado').reduce((s, o) => s + (o.total || 0), 0);
  const trabalhadores = data.trabalhadores.length;
  const materiaisFalta = data.materiais.filter(m => (m.adquirir || 0) > 0).length;
  const partesHoje = data.partes.filter(p => p.data === today()).length;
  const tarefasAtrasadas = data.tarefas.filter(t => t.estado !== 'concluida' && t.dataFim && t.dataFim < today()).length;

  const stats = [
    { label: 'Obras em curso', value: obrasAtivas, icon: Building2, tab: 'obras', accent: 'from-amber-400 to-orange-500', dark: true },
    { label: 'Orçamentos pendentes', value: orcPendentes, icon: FileText, tab: 'orcamentos', accent: 'from-amber-50 to-amber-100', tone: 'amber' },
    { label: 'Trabalhadores', value: trabalhadores, icon: HardHat, tab: 'equipa', accent: 'from-sky-50 to-sky-100', tone: 'sky' },
    { label: 'Materiais a adquirir', value: materiaisFalta, icon: Package, tab: 'materiais', accent: 'from-rose-50 to-rose-100', tone: 'rose' },
  ];

  return (
    <div className="space-y-6">
      <div className="anim-in relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 text-white p-8 lg:p-10 shadow-2xl">
        <div className="absolute inset-0 mesh-bg opacity-90" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <div className="text-[10px] tracking-[0.3em] text-amber-300/90 font-medium">BEM-VINDO, REI</div>
          </div>
          <h2 className="font-display text-3xl lg:text-5xl mb-3 leading-[1.05] tracking-tight">
            Slide &amp; Stone <span className="text-amber-400">SA</span>
          </h2>
          <div className="text-stone-400 text-sm lg:text-base max-w-xl leading-relaxed">
            Gestão integrada de obras, orçamentos, equipa e estaleiro. Tudo o que precisa para correr o dia.
          </div>
          <div className="flex items-center gap-3 mt-6 text-xs text-stone-400">
            <div className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-amber-400" /> {data.obras.length} obras</div>
            <div className="w-1 h-1 rounded-full bg-stone-600" />
            <div className="flex items-center gap-1.5"><HardHat className="w-3.5 h-3.5 text-amber-400" /> {trabalhadores} trabalhadores</div>
            <div className="w-1 h-1 rounded-full bg-stone-600" />
            <div className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-amber-400" /> {data.orcamentos.length} orçamentos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const dark = s.dark;
          return (
            <button key={s.label} onClick={() => setTab(s.tab)}
              className={`anim-in anim-in-${i + 1} card-hover relative overflow-hidden rounded-2xl p-5 text-left ${dark ? 'bg-gradient-to-br ' + s.accent + ' text-zinc-900 shadow-lg shadow-amber-500/20' : 'bg-white border border-stone-200 shadow-sm'}`}>
              {!dark && <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${s.accent} rounded-full blur-2xl opacity-60 -translate-y-1/2 translate-x-1/2`} />}
              <div className="relative">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-4 ${dark ? 'bg-zinc-900/10' : `bg-${s.tone}-500/10 text-${s.tone}-700`}`}>
                  <Icon className="w-4 h-4" strokeWidth={2.5} />
                </div>
                <div className="font-display text-3xl lg:text-4xl font-bold leading-none tracking-tight">{s.value}</div>
                <div className={`text-xs mt-2 font-medium ${dark ? 'text-zinc-800' : 'text-stone-500'}`}>{s.label}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <Card className="p-6 anim-in anim-in-2 card-hover relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-50" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Valor Aprovado</div>
            </div>
            <div className="font-display text-3xl font-bold tracking-tight">{eur(valorOrcAprovados)}</div>
            <div className="text-xs text-stone-500 mt-2">orçamentos adjudicados</div>
          </div>
        </Card>

        <Card className="p-6 anim-in anim-in-3 card-hover">
          <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mb-3">Atividade de hoje</div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-600">Partes diárias</span>
              <span className="font-display font-bold text-lg">{partesHoje}</span>
            </div>
            <div className="h-px bg-stone-100" />
            <div className="flex justify-between items-center">
              <span className="text-sm text-stone-600">Tarefas em atraso</span>
              <span className={`font-display font-bold text-lg ${tarefasAtrasadas > 0 ? 'text-rose-600' : 'text-stone-900'}`}>{tarefasAtrasadas}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 anim-in anim-in-4 card-hover">
          <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mb-3">Acções rápidas</div>
          <div className="space-y-1.5">
            <button onClick={() => setTab('orcamentos')} className="w-full text-left text-sm py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-all flex items-center justify-between group">
              <span className="font-medium">Novo orçamento</span>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
            </button>
            <button onClick={() => setTab('partes')} className="w-full text-left text-sm py-2.5 px-3 rounded-xl hover:bg-stone-100 transition-all flex items-center justify-between group">
              <span className="font-medium">Parte diária</span>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
            </button>
            <button onClick={() => openTemplate('parte')} className="w-full text-left text-sm py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 transition-all flex items-center justify-between group ring-1 ring-amber-200/60">
              <span className="font-semibold text-amber-900">Imprimir folha em branco</span>
              <Download className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </Card>
      </div>

      <div>
        <SectionHeader title="Obras recentes" />
        {data.obras.length === 0 ? (
          <Empty icon={Building2} title="Sem obras registadas" hint="Comece por criar a sua primeira obra" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.obras.slice(0, 6).map((o, i) => (
              <Card key={o.id} className={`p-5 anim-in anim-in-${Math.min(i + 1, 4)} card-hover cursor-pointer`} onClick={() => setTab('obras')}>
                <div className="flex items-start justify-between mb-3">
                  <div className="font-display text-sm pr-2">{o.nome}</div>
                  <Badge variant={o.estado === 'em_curso' ? 'green' : o.estado === 'concluida' ? 'gray' : 'amber'}>
                    {o.estado === 'em_curso' ? 'EM CURSO' : o.estado === 'concluida' ? 'CONCLUÍDA' : 'PLANEADA'}
                  </Badge>
                </div>
                <div className="text-xs text-stone-500 space-y-1.5">
                  <div className="flex items-center gap-1.5"><Users className="w-3 h-3" />{o.cliente || '—'}</div>
                  <div className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{o.local || '—'}</div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Obras({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', nome: '', cliente: '', local: '', dataInicio: today(), dataFim: '', estado: 'planeada', valorContrato: 0, notas: '' };
  const [form, setForm] = useState(blank);

  const open = (o) => { setForm(o || { ...blank, id: uid() }); setEditing(o ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.obras, form] : data.obras.map(o => o.id === form.id ? form : o);
    save('obras', list); close();
  };
  const del = (id) => {
    if (!confirm('Eliminar esta obra?')) return;
    save('obras', data.obras.filter(o => o.id !== id));
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="GESTÃO DE OBRAS" action={
        <div className="flex gap-2">
          <Btn variant="outline" onClick={() => openTemplate('obra')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA OBRA</Btn>
        </div>
      } />
      {data.obras.length === 0 ? (
        <Empty icon={Building2} title="Sem obras" hint="Crie a primeira obra para começar" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {data.obras.map((o, i) => {
            const sem = calcularSemaforoObra(data, o.id);
            const corBg = { verde: 'bg-emerald-500', laranja: 'bg-amber-500', vermelho: 'bg-rose-500' }[sem.cor];
            const corText = { verde: 'text-emerald-700', laranja: 'text-amber-700', vermelho: 'text-rose-700' }[sem.cor];
            return (
            <Card key={o.id} className={`p-6 anim-in card-hover relative overflow-hidden ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
              {/* Faixa lateral de semáforo */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${corBg}`} title={sem.label} />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-amber-400 flex items-center justify-center font-display text-lg shadow-md flex-shrink-0">
                    {o.nome.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base mb-1 truncate">{o.nome}</div>
                    <div className="text-[10px] text-stone-400 font-mono tracking-widest">{o.id.slice(-6).toUpperCase()}</div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Badge variant={o.estado === 'em_curso' ? 'green' : o.estado === 'concluida' ? 'gray' : 'amber'}>
                    {o.estado === 'em_curso' ? 'EM CURSO' : o.estado === 'concluida' ? 'CONCLUÍDA' : 'PLANEADA'}
                  </Badge>
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold ${corText}`}>
                    <span className={`w-2 h-2 rounded-full ${corBg}`} />
                    {sem.label} · {sem.pct}%
                  </div>
                </div>
              </div>
              <div className="text-sm space-y-2 text-stone-600 mb-4">
                <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-stone-400" />{o.cliente || '—'}</div>
                <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-stone-400" />{o.local || '—'}</div>
                <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-stone-400" /><span className="font-mono text-xs">{fmtDate(o.dataInicio)} → {fmtDate(o.dataFim)}</span></div>
                <div className="flex items-center gap-2 pt-2 mt-2 border-t border-stone-100"><Euro className="w-3.5 h-3.5 text-stone-400" /><span className="font-display font-bold text-base text-stone-900">{eur(o.valorContrato)}</span></div>
              </div>
              <div className="flex gap-2 pt-3 border-t border-stone-100">
                <Btn size="sm" variant="outline" onClick={() => open(o)}><Pencil className="w-3 h-3" /> Editar</Btn>
                <Btn size="sm" variant="ghost" onClick={() => del(o.id)}><Trash2 className="w-3 h-3" /></Btn>
              </div>
            </Card>
          );})}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA OBRA' : 'EDITAR OBRA'} wide>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="NOME DA OBRA" className="md:col-span-2">
            <Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Reabilitação Edifício Coimbra Centro" />
          </Field>
          <Field label="CLIENTE"><Input value={form.cliente} onChange={e => setForm({ ...form, cliente: e.target.value })} /></Field>
          <Field label="LOCAL"><Input value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} /></Field>
          <Field label="DATA INÍCIO"><Input type="date" value={form.dataInicio} onChange={e => setForm({ ...form, dataInicio: e.target.value })} /></Field>
          <Field label="DATA FIM PREVISTA"><Input type="date" value={form.dataFim} onChange={e => setForm({ ...form, dataFim: e.target.value })} /></Field>
          <Field label="ESTADO">
            <Select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option value="planeada">Planeada</option>
              <option value="em_curso">Em curso</option>
              <option value="concluida">Concluída</option>
              <option value="suspensa">Suspensa</option>
            </Select>
          </Field>
          <Field label="VALOR CONTRATO (€)"><Input type="number" step="0.01" value={form.valorContrato} onChange={e => setForm({ ...form, valorContrato: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="NOTAS" className="md:col-span-2"><Textarea rows={3} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Orcamentos({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const blank = {
    id: '', numero: '', cliente: '', obraId: '', data: today(), validade: '',
    estado: 'rascunho', items: [], iva: 23, notas: '', total: 0
  };
  const [form, setForm] = useState(blank);

  const calcTotal = (items, iva) => {
    const sub = items.reduce((s, i) => s + (i.quantidade || 0) * (i.precoUnit || 0), 0);
    return { sub, iva: sub * (iva / 100), total: sub * (1 + iva / 100) };
  };

  const open = (o) => {
    setForm(o ? { ...o } : { ...blank, id: uid(), numero: `ORC-${new Date().getFullYear()}-${String(data.orcamentos.length + 1).padStart(3, '0')}` });
    setEditing(o ? 'edit' : 'new');
  };
  const close = () => { setEditing(null); setForm(blank); };
  const addItem = () => setForm(f => ({ ...f, items: [...f.items, { id: uid(), descricao: '', quantidade: 1, unidade: 'un', precoUnit: 0 }] }));
  const updItem = (id, k, v) => setForm(f => ({ ...f, items: f.items.map(i => i.id === id ? { ...i, [k]: v } : i) }));
  const delItem = (id) => setForm(f => ({ ...f, items: f.items.filter(i => i.id !== id) }));

  const submit = () => {
    if (!form.cliente) return;
    const t = calcTotal(form.items, form.iva);
    const final = { ...form, subtotal: t.sub, valorIva: t.iva, total: t.total };
    const list = editing === 'new' ? [...data.orcamentos, final] : data.orcamentos.map(o => o.id === final.id ? final : o);
    save('orcamentos', list); close();
  };
  const del = (id) => { if (confirm('Eliminar orçamento?')) save('orcamentos', data.orcamentos.filter(o => o.id !== id)); };

  const totals = calcTotal(form.items, form.iva);

  const estadoBadge = (e) => {
    const map = { rascunho: ['gray', 'RASCUNHO'], enviado: ['amber', 'ENVIADO'], aprovado: ['green', 'APROVADO'], rejeitado: ['red', 'REJEITADO'] };
    const [v, l] = map[e] || ['gray', e.toUpperCase()];
    return <Badge variant={v}>{l}</Badge>;
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="ORÇAMENTOS" action={
        <div className="flex gap-2">
          <ExportBtn onClick={() => exportToCSV('orcamentos',
            ['Numero', 'Cliente', 'Obra', 'Data', 'Validade', 'Subtotal', 'IVA %', 'Total', 'Estado'],
            data.orcamentos.map(o => [o.numero, o.cliente, data.obras.find(x => x.id === o.obraId)?.nome || '', o.data, o.validade, o.subtotal, o.iva, o.total, o.estado])
          )} />
          <Btn variant="outline" onClick={() => openTemplate('orcamento')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO ORÇAMENTO</Btn>
        </div>
      } />
      {data.orcamentos.length === 0 ? (
        <Empty icon={FileText} title="Sem orçamentos" hint="Crie o primeiro orçamento para um cliente" />
      ) : (
        <Card className="overflow-hidden anim-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">Nº</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">CLIENTE</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">DATA</th>
                  <th className="text-right px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">TOTAL</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ESTADO</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody>
                {data.orcamentos.map(o => (
                  <tr key={o.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50 transition-colors">
                    <td className="px-5 py-3.5 font-mono font-semibold text-xs">{o.numero}</td>
                    <td className="px-5 py-3.5 font-medium">{o.cliente}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-stone-500">{fmtDate(o.data)}</td>
                    <td className="px-5 py-3.5 text-right font-display font-bold">{eur(o.total)}</td>
                    <td className="px-5 py-3.5">{estadoBadge(o.estado)}</td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button onClick={() => gerarOrcamentoExcel(o, data.obras.find(x => x.id === o.obraId))} className="p-1.5 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition-colors" title="Gerar Excel com fórmulas"><FileSpreadsheet className="w-4 h-4" /></button>
                      <button onClick={() => open(o)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(o.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO ORÇAMENTO' : 'EDITAR ORÇAMENTO'} wide>
        <div className="grid md:grid-cols-3 gap-3 mb-5">
          <Field label="Nº ORÇAMENTO"><Input value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} /></Field>
          <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="VALIDADE"><Input type="date" value={form.validade} onChange={e => setForm({ ...form, validade: e.target.value })} /></Field>
          <Field label="CLIENTE" className="md:col-span-2"><Input value={form.cliente} onChange={e => setForm({ ...form, cliente: e.target.value })} /></Field>
          <Field label="OBRA ASSOCIADA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Sem obra —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="ESTADO">
            <Select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option value="rascunho">Rascunho</option>
              <option value="enviado">Enviado</option>
              <option value="aprovado">Aprovado</option>
              <option value="rejeitado">Rejeitado</option>
            </Select>
          </Field>
          <Field label="IVA (%)"><Input type="number" value={form.iva} onChange={e => setForm({ ...form, iva: parseFloat(e.target.value) || 0 })} /></Field>
        </div>

        <div className="border-t-2 border-stone-300 pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="font-display text-sm">LINHAS DO ORÇAMENTO</div>
            <Btn size="sm" variant="outline" onClick={addItem}><Plus className="w-3 h-3" /> Adicionar linha</Btn>
          </div>
          {form.items.length === 0 ? (
            <div className="text-center py-6 text-sm text-stone-500 bg-stone-50 border-2 border-dashed border-stone-300">
              Sem linhas. Clique em adicionar para incluir trabalhos/materiais.
            </div>
          ) : (
            <div className="space-y-2">
              {form.items.map(it => {
                const tot = (it.quantidade || 0) * (it.precoUnit || 0);
                return (
                  <div key={it.id} className="grid grid-cols-12 gap-2 items-end bg-stone-50 p-2 border border-stone-300">
                    <div className="col-span-12 md:col-span-5">
                      <Input placeholder="Descrição" value={it.descricao} onChange={e => updItem(it.id, 'descricao', e.target.value)} />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <Input type="number" placeholder="Qtd" value={it.quantidade} onChange={e => updItem(it.id, 'quantidade', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-span-3 md:col-span-1">
                      <Input placeholder="un" value={it.unidade} onChange={e => updItem(it.id, 'unidade', e.target.value)} />
                    </div>
                    <div className="col-span-3 md:col-span-2">
                      <Input type="number" step="0.01" placeholder="€/un" value={it.precoUnit} onChange={e => updItem(it.id, 'precoUnit', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div className="col-span-2 md:col-span-1 text-right font-mono font-bold text-sm">{eur(tot)}</div>
                    <div className="col-span-1">
                      <button onClick={() => delItem(it.id)} className="p-1 text-red-700 hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="mt-4 ml-auto md:w-72 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-5 space-y-2 text-sm shadow-lg">
            <div className="flex justify-between text-stone-300"><span>Subtotal</span><span className="font-mono">{eur(totals.sub)}</span></div>
            <div className="flex justify-between text-stone-300"><span>IVA ({form.iva}%)</span><span className="font-mono">{eur(totals.iva)}</span></div>
            <div className="flex justify-between font-display text-amber-400 text-xl pt-3 border-t border-white/10"><span>TOTAL</span><span className="font-mono">{eur(totals.total)}</span></div>
          </div>
        </div>

        <Field label="NOTAS / CONDIÇÕES" className="mt-4"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>

        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function PlanoDiario({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const [filterDate, setFilterDate] = useState(today());
  const blank = { id: '', data: today(), obraId: '', trabalhadores: [], tarefas: '', equipamentos: '', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (p) => { setForm(p || { ...blank, id: uid() }); setEditing(p ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.obraId) return;
    const list = editing === 'new' ? [...data.planos, form] : data.planos.map(p => p.id === form.id ? form : p);
    save('planos', list); close();
  };
  const del = (id) => { if (confirm('Eliminar plano?')) save('planos', data.planos.filter(p => p.id !== id)); };
  const toggleW = (wid) => setForm(f => ({ ...f, trabalhadores: f.trabalhadores.includes(wid) ? f.trabalhadores.filter(x => x !== wid) : [...f.trabalhadores, wid] }));

  const filtrados = data.planos.filter(p => p.data === filterDate).sort((a, b) => a.obraId.localeCompare(b.obraId));
  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';
  const wNome = (id) => data.trabalhadores.find(w => w.id === id)?.nome || '?';

  return (
    <div className="space-y-5">
      <SectionHeader title="PLANO DIÁRIO" action={
        <div className="flex gap-2 flex-wrap">
          <Btn variant="outline" onClick={() => openTemplate('plano')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="!w-auto" />
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO PLANO</Btn>
        </div>
      } />

      {filtrados.length === 0 ? (
        <Empty icon={CalendarDays} title="Sem planos para esta data" hint="Crie um plano diário atribuindo trabalhadores e tarefas a uma obra" />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtrados.map((p, i) => (
            <Card key={p.id} className={`p-6 anim-in card-hover relative overflow-hidden ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3" />
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="black">{fmtDate(p.data)}</Badge>
                    <div className="font-display text-lg mt-2.5 tracking-tight">{obraNome(p.obraId)}</div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => open(p)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => del(p.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="text-[10px] text-stone-500 tracking-[0.18em] font-semibold uppercase mb-2">Equipa</div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.trabalhadores.length === 0 ? <span className="text-xs text-stone-400 italic">Sem trabalhadores</span> :
                    p.trabalhadores.map(id => <Badge key={id} variant="gray">{wNome(id)}</Badge>)}
                </div>
                <div className="text-[10px] text-stone-500 tracking-[0.18em] font-semibold uppercase mb-2">Tarefas</div>
                <div className="text-sm whitespace-pre-wrap mb-3 text-stone-700">{p.tarefas || '—'}</div>
                {p.equipamentos && (<>
                  <div className="text-[10px] text-stone-500 tracking-[0.18em] font-semibold uppercase mb-2 mt-3">Equipamentos</div>
                  <div className="text-sm text-stone-700 mb-3 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5 text-stone-400" />{p.equipamentos}</div>
                </>)}
                {p.notas && <div className="text-xs italic text-stone-500 pt-3 mt-3 border-t border-stone-100">{p.notas}</div>}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO PLANO DIÁRIO' : 'EDITAR PLANO'} wide>
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
        </div>
        <Field label="ATRIBUIR TRABALHADORES" className="mb-4">
          {data.trabalhadores.length === 0 ? (
            <div className="text-sm text-stone-500 bg-stone-50 p-3">Adicione primeiro trabalhadores na secção Equipa</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {data.trabalhadores.map(w => {
                const sel = form.trabalhadores.includes(w.id);
                return (
                  <button key={w.id} type="button" onClick={() => toggleW(w.id)}
                    className={`text-left p-2 border-2 text-sm transition-colors ${sel ? 'bg-stone-900 text-white border-stone-900' : 'bg-white border-stone-300 hover:border-stone-900'}`}>
                    <div className="font-semibold text-xs">{w.nome}</div>
                    <div className={`text-[10px] ${sel ? 'text-stone-300' : 'text-stone-500'}`}>{w.funcao}</div>
                  </button>
                );
              })}
            </div>
          )}
        </Field>
        <Field label="TAREFAS PREVISTAS" className="mb-4"><Textarea rows={4} value={form.tarefas} onChange={e => setForm({ ...form, tarefas: e.target.value })} placeholder="Ex.: Cofragem dos pilares P3 e P4; Aplicação de impermeabilização na laje sul..." /></Field>
        <Field label="EQUIPAMENTOS / MAQUINARIA" className="mb-4"><Input value={form.equipamentos} onChange={e => setForm({ ...form, equipamentos: e.target.value })} placeholder="Ex.: Giratória CAT 320, Camião basculante" /></Field>
        <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function PartesDiarias({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const [filterDate, setFilterDate] = useState(today());
  const blank = { id: '', data: today(), trabalhadorId: '', obraId: '', horaInicio: '08:00', horaFim: '17:00', horas: 8, trabalhoRealizado: '', materiais: '', observacoes: '' };
  const [form, setForm] = useState(blank);

  const open = (p) => { setForm(p || { ...blank, id: uid() }); setEditing(p ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.trabalhadorId || !form.obraId) return;
    const list = editing === 'new' ? [...data.partes, form] : data.partes.map(p => p.id === form.id ? form : p);
    save('partes', list); close();
  };
  const del = (id) => { if (confirm('Eliminar parte?')) save('partes', data.partes.filter(p => p.id !== id)); };

  const filtradas = data.partes.filter(p => p.data === filterDate);
  const wNome = (id) => data.trabalhadores.find(w => w.id === id)?.nome || '?';
  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';
  const totalHoras = filtradas.reduce((s, p) => s + (p.horas || 0), 0);

  return (
    <div className="space-y-5">
      <SectionHeader title="PARTES DIÁRIAS" action={
        <div className="flex gap-2 flex-wrap">
          <ExportBtn onClick={() => exportToCSV('partes_diarias',
            ['Data', 'Trabalhador', 'Obra', 'Inicio', 'Fim', 'Horas', 'Trabalho', 'Materiais', 'Observacoes'],
            data.partes.map(p => [p.data, data.trabalhadores.find(w => w.id === p.trabalhadorId)?.nome || '', data.obras.find(o => o.id === p.obraId)?.nome || '', p.horaInicio, p.horaFim, p.horas, p.trabalhoRealizado, p.materiais, p.observacoes])
          )} />
          <Btn variant="outline" onClick={() => openTemplate('parte')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="!w-auto" />
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA PARTE</Btn>
        </div>
      } />

      {filtradas.length > 0 && (
        <Card className="p-5 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-0 anim-in relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.2em] text-amber-300/80 font-semibold uppercase mb-1">Resumo · {fmtDate(filterDate)}</div>
              <div className="font-display text-2xl mt-1 tracking-tight">{filtradas.length} parte{filtradas.length !== 1 ? 's' : ''} · <span className="text-amber-400">{totalHoras}h</span></div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </Card>
      )}

      {filtradas.length === 0 ? (
        <Empty icon={ClipboardList} title="Sem partes para esta data" hint="Registe a parte diária de cada trabalhador" />
      ) : (
        <div className="space-y-3">
          {filtradas.map((p, i) => (
            <Card key={p.id} className={`p-5 anim-in card-hover ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
              <div className="flex items-start justify-between mb-3 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900 flex items-center justify-center font-display text-base shadow-md">{wNome(p.trabalhadorId).charAt(0)}</div>
                  <div>
                    <div className="font-display text-base">{wNome(p.trabalhadorId)}</div>
                    <div className="text-xs text-stone-500">{obraNome(p.obraId)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="black">{p.horas}H · {p.horaInicio}–{p.horaFim}</Badge>
                  <button onClick={() => open(p)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => del(p.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="text-sm mt-3"><span className="font-semibold text-stone-700">Trabalho:</span> <span className="text-stone-600">{p.trabalhoRealizado || '—'}</span></div>
              {p.materiais && <div className="text-sm mt-1"><span className="font-semibold text-stone-700">Materiais:</span> <span className="text-stone-600">{p.materiais}</span></div>}
              {p.observacoes && <div className="text-xs text-stone-500 italic mt-3 pt-3 border-t border-stone-100">{p.observacoes}</div>}
            </Card>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA PARTE DIÁRIA' : 'EDITAR PARTE'} wide>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="TRABALHADOR">
            <Select value={form.trabalhadorId} onChange={e => setForm({ ...form, trabalhadorId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.trabalhadores.map(w => <option key={w.id} value={w.id}>{w.nome}</option>)}
            </Select>
          </Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="HORA INÍCIO"><Input type="time" value={form.horaInicio} onChange={e => setForm({ ...form, horaInicio: e.target.value })} /></Field>
          <Field label="HORA FIM"><Input type="time" value={form.horaFim} onChange={e => setForm({ ...form, horaFim: e.target.value })} /></Field>
          <Field label="HORAS TOTAIS"><Input type="number" step="0.5" value={form.horas} onChange={e => setForm({ ...form, horas: parseFloat(e.target.value) || 0 })} /></Field>
        </div>
        <Field label="TRABALHO REALIZADO" className="mb-4"><Textarea rows={3} value={form.trabalhoRealizado} onChange={e => setForm({ ...form, trabalhoRealizado: e.target.value })} placeholder="Descrição detalhada das tarefas executadas..." /></Field>
        <Field label="MATERIAIS UTILIZADOS" className="mb-4"><Input value={form.materiais} onChange={e => setForm({ ...form, materiais: e.target.value })} placeholder="Ex.: 3 sacos de cimento, 50 tijolos burros..." /></Field>
        <Field label="OBSERVAÇÕES"><Textarea rows={2} value={form.observacoes} onChange={e => setForm({ ...form, observacoes: e.target.value })} /></Field>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Cronograma({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const [filtroObra, setFiltroObra] = useState('');
  const blank = { id: '', obraId: '', titulo: '', dataInicio: today(), dataFim: today(), responsavel: '', estado: 'pendente', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (t) => { setForm(t || { ...blank, id: uid() }); setEditing(t ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.titulo || !form.obraId) return;
    const list = editing === 'new' ? [...data.tarefas, form] : data.tarefas.map(t => t.id === form.id ? form : t);
    save('tarefas', list); close();
  };
  const del = (id) => { if (confirm('Eliminar tarefa?')) save('tarefas', data.tarefas.filter(t => t.id !== id)); };
  const updEstado = (id, estado) => save('tarefas', data.tarefas.map(t => t.id === id ? { ...t, estado } : t));

  const tarefas = (filtroObra ? data.tarefas.filter(t => t.obraId === filtroObra) : data.tarefas)
    .sort((a, b) => (a.dataInicio || '').localeCompare(b.dataInicio || ''));

  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';

  const colEstado = (e) => ({
    pendente: 'amber', em_curso: 'blue', concluida: 'green', bloqueada: 'red'
  }[e] || 'gray');
  const lblEstado = (e) => ({
    pendente: 'PENDENTE', em_curso: 'EM CURSO', concluida: 'CONCLUÍDA', bloqueada: 'BLOQUEADA'
  }[e] || e.toUpperCase());

  return (
    <div className="space-y-5">
      <SectionHeader title="CRONOGRAMA DE TAREFAS" action={
        <div className="flex gap-2 flex-wrap">
          <Btn variant="outline" onClick={() => gerarCronogramaPPTX(data)}>
            <Presentation className="w-4 h-4" /> POWERPOINT
          </Btn>
          <Btn variant="outline" onClick={() => openTemplate('tarefa')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Select value={filtroObra} onChange={e => setFiltroObra(e.target.value)} className="!w-auto">
            <option value="">Todas as obras</option>
            {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
          </Select>
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA TAREFA</Btn>
        </div>
      } />

      {tarefas.length === 0 ? (
        <Empty icon={Calendar} title="Sem tarefas no cronograma" hint="Adicione tarefas com prazos para acompanhar o progresso de cada obra" />
      ) : (
        <>
          {/* Resumo de Semáforos */}
          {(() => {
            const semaforos = tarefas.map(calcularSemaforoTarefa);
            const verde = semaforos.filter(s => s.cor === 'verde').length;
            const laranja = semaforos.filter(s => s.cor === 'laranja').length;
            const vermelho = semaforos.filter(s => s.cor === 'vermelho').length;
            return (
              <div className="grid grid-cols-3 gap-3 anim-in">
                <Card className="p-4 bg-emerald-50/60 border-emerald-200 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-md shadow-emerald-500/40" />
                    <div className="flex-1">
                      <div className="text-[10px] tracking-[0.18em] text-emerald-800 font-semibold uppercase">No prazo</div>
                      <div className="font-display text-2xl font-bold text-emerald-900">{verde}</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-amber-50/60 border-amber-200 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-amber-500 shadow-md shadow-amber-500/40" />
                    <div className="flex-1">
                      <div className="text-[10px] tracking-[0.18em] text-amber-800 font-semibold uppercase">Comprometido</div>
                      <div className="font-display text-2xl font-bold text-amber-900">{laranja}</div>
                    </div>
                  </div>
                </Card>
                <Card className="p-4 bg-rose-50/60 border-rose-200 card-hover">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-rose-500 shadow-md shadow-rose-500/40" />
                    <div className="flex-1">
                      <div className="text-[10px] tracking-[0.18em] text-rose-800 font-semibold uppercase">Extrapolado</div>
                      <div className="font-display text-2xl font-bold text-rose-900">{vermelho}</div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })()}

          <div className="space-y-2">
            {tarefas.map((t, i) => {
              const sem = calcularSemaforoTarefa(t);
              const corBg = { verde: 'bg-emerald-500', laranja: 'bg-amber-500', vermelho: 'bg-rose-500' }[sem.cor];
              const atrasada = sem.cor === 'vermelho';
              return (
                <Card key={t.id} className={`p-5 anim-in card-hover ${atrasada ? 'border-rose-200 bg-rose-50/30' : ''} ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-3 h-3 rounded-full ${corBg} mt-1.5 flex-shrink-0 shadow-sm`} title={sem.label} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <Badge variant={colEstado(t.estado)}>{lblEstado(t.estado)}</Badge>
                          {atrasada && <Badge variant="red">{sem.label}</Badge>}
                          {sem.cor === 'laranja' && <Badge variant="amber">{sem.label}</Badge>}
                        </div>
                        <div className="font-display text-base tracking-tight">{t.titulo}</div>
                        <div className="text-xs text-stone-500 mt-1.5 flex items-center gap-2 flex-wrap">
                          <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{obraNome(t.obraId)}</span>
                          <span className="w-1 h-1 rounded-full bg-stone-300" />
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{t.responsavel || 'sem responsável'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-xs text-stone-600 mb-2">{fmtDate(t.dataInicio)} → {fmtDate(t.dataFim)}</div>
                      <div className="flex gap-1 justify-end items-center">
                        <Select value={t.estado} onChange={e => updEstado(t.id, e.target.value)} className="!w-auto !text-xs !py-1.5 !px-2.5">
                          <option value="pendente">Pendente</option>
                          <option value="em_curso">Em curso</option>
                          <option value="concluida">Concluída</option>
                          <option value="bloqueada">Bloqueada</option>
                        </Select>
                        <button onClick={() => open(t)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => del(t.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                  {t.notas && <div className="text-xs text-stone-600 mt-3 pt-3 border-t border-stone-100">{t.notas}</div>}
                </Card>
              );
            })}
          </div>
        </>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA TAREFA' : 'EDITAR TAREFA'} wide>
        <div className="space-y-4">
          <Field label="TÍTULO DA TAREFA"><Input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} placeholder="Ex.: Cofragem da laje do piso 1" /></Field>
          <div className="grid md:grid-cols-2 gap-3">
            <Field label="OBRA">
              <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
                <option value="">— Selecionar —</option>
                {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
              </Select>
            </Field>
            <Field label="RESPONSÁVEL">
              <Select value={form.responsavel} onChange={e => setForm({ ...form, responsavel: e.target.value })}>
                <option value="">— Selecionar —</option>
                {data.trabalhadores.map(w => <option key={w.id} value={w.nome}>{w.nome}</option>)}
              </Select>
            </Field>
            <Field label="DATA INÍCIO"><Input type="date" value={form.dataInicio} onChange={e => setForm({ ...form, dataInicio: e.target.value })} /></Field>
            <Field label="DATA FIM"><Input type="date" value={form.dataFim} onChange={e => setForm({ ...form, dataFim: e.target.value })} /></Field>
            <Field label="ESTADO" className="md:col-span-2">
              <Select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
                <option value="pendente">Pendente</option>
                <option value="em_curso">Em curso</option>
                <option value="concluida">Concluída</option>
                <option value="bloqueada">Bloqueada</option>
              </Select>
            </Field>
          </div>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Materiais({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const [filtroObra, setFiltroObra] = useState('');
  const blank = { id: '', nome: '', obraId: '', estaleiro: 0, adquirir: 0, unidade: 'un', fornecedor: '', precoUnit: 0, notas: '' };
  const [form, setForm] = useState(blank);

  const open = (m) => { setForm(m || { ...blank, id: uid() }); setEditing(m ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.materiais, form] : data.materiais.map(m => m.id === form.id ? form : m);
    save('materiais', list); close();
  };
  const del = (id) => { if (confirm('Eliminar material?')) save('materiais', data.materiais.filter(m => m.id !== id)); };

  const lista = filtroObra ? data.materiais.filter(m => m.obraId === filtroObra) : data.materiais;
  const emEstaleiro = lista.filter(m => (m.estaleiro || 0) > 0);
  const aAdquirir = lista.filter(m => (m.adquirir || 0) > 0);
  const valorAdquirir = aAdquirir.reduce((s, m) => s + (m.adquirir * m.precoUnit), 0);

  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || 'Geral';

  return (
    <div className="space-y-5">
      <SectionHeader title="ESTALEIRO E MATERIAIS" action={
        <div className="flex gap-2 flex-wrap">
          <Btn variant="outline" onClick={() => openTemplate('material')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Select value={filtroObra} onChange={e => setFiltroObra(e.target.value)} className="!w-auto">
            <option value="">Todos</option>
            {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
          </Select>
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO MATERIAL</Btn>
        </div>
      } />

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 anim-in anim-in-1 card-hover relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-100 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Em estaleiro</div>
              <div className="font-display text-3xl font-bold mt-2 tracking-tight">{emEstaleiro.length}</div>
              <div className="text-xs text-stone-500 mt-1">referências disponíveis</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
        </Card>
        <Card className="p-5 anim-in anim-in-2 card-hover relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/60">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-300/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-amber-900 font-semibold uppercase">A adquirir</div>
              <div className="font-display text-3xl font-bold mt-2 tracking-tight text-amber-900">{aAdquirir.length}</div>
              <div className="text-xs text-amber-800 mt-1">referências em falta</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-amber-700" />
            </div>
          </div>
        </Card>
        <Card className="p-5 anim-in anim-in-3 card-hover relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-0">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-amber-300/80 font-semibold uppercase">Valor estimado</div>
              <div className="font-display text-3xl font-bold mt-2 tracking-tight">{eur(valorAdquirir)}</div>
              <div className="text-xs text-stone-400 mt-1">para aquisição</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Euro className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </Card>
      </div>

      {lista.length === 0 ? (
        <Empty icon={Package} title="Sem materiais registados" hint="Adicione materiais para controlar o estaleiro e necessidades de compra" />
      ) : (
        <Card className="overflow-hidden anim-in">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">MATERIAL</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">OBRA</th>
                  <th className="text-right px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ESTALEIRO</th>
                  <th className="text-right px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ADQUIRIR</th>
                  <th className="text-right px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">€/UN</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">FORNECEDOR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {lista.map(m => (
                  <tr key={m.id} className={`border-b border-stone-100 last:border-0 transition-colors ${m.adquirir > 0 ? 'bg-amber-50/40 hover:bg-amber-50/70' : 'hover:bg-stone-50/50'}`}>
                    <td className="px-5 py-3.5 font-medium">{m.nome}</td>
                    <td className="px-5 py-3.5 text-xs text-stone-500">{obraNome(m.obraId)}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs">{m.estaleiro} {m.unidade}</td>
                    <td className={`px-5 py-3.5 text-right font-mono font-bold ${m.adquirir > 0 ? 'text-amber-700' : 'text-stone-300'}`}>{m.adquirir} {m.unidade}</td>
                    <td className="px-5 py-3.5 text-right font-mono text-xs text-stone-600">{eur(m.precoUnit)}</td>
                    <td className="px-5 py-3.5 text-xs text-stone-600">{m.fornecedor || '—'}</td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <button onClick={() => open(m)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(m.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO MATERIAL' : 'EDITAR MATERIAL'}>
        <div className="space-y-4">
          <Field label="DESIGNAÇÃO"><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Cimento Cinza 32.5R" /></Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Geral / Estaleiro central —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="EM ESTALEIRO"><Input type="number" step="0.01" value={form.estaleiro} onChange={e => setForm({ ...form, estaleiro: parseFloat(e.target.value) || 0 })} /></Field>
            <Field label="A ADQUIRIR"><Input type="number" step="0.01" value={form.adquirir} onChange={e => setForm({ ...form, adquirir: parseFloat(e.target.value) || 0 })} /></Field>
            <Field label="UNIDADE"><Input value={form.unidade} onChange={e => setForm({ ...form, unidade: e.target.value })} placeholder="un, kg, m³, m²..." /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="FORNECEDOR"><Input value={form.fornecedor} onChange={e => setForm({ ...form, fornecedor: e.target.value })} /></Field>
            <Field label="PREÇO UNITÁRIO (€)"><Input type="number" step="0.01" value={form.precoUnit} onChange={e => setForm({ ...form, precoUnit: parseFloat(e.target.value) || 0 })} /></Field>
          </div>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Relatorios({ data, save, openTemplate }) {
  const [obraId, setObraId] = useState('');
  const [periodoIni, setPeriodoIni] = useState(() => {
    const d = new Date(); d.setDate(d.getDate() - 7); return d.toISOString().split('T')[0];
  });
  const [periodoFim, setPeriodoFim] = useState(today());
  const [observacoes, setObservacoes] = useState('');

  const obra = data.obras.find(o => o.id === obraId);
  const partesObra = data.partes.filter(p => p.obraId === obraId && p.data >= periodoIni && p.data <= periodoFim);
  const tarefasObra = data.tarefas.filter(t => t.obraId === obraId);
  const horasTotal = partesObra.reduce((s, p) => s + (p.horas || 0), 0);
  const tarefasConcluidas = tarefasObra.filter(t => t.estado === 'concluida').length;
  const progresso = tarefasObra.length > 0 ? Math.round(tarefasConcluidas / tarefasObra.length * 100) : 0;

  const guardar = () => {
    if (!obraId) return;
    const r = { id: uid(), obraId, periodoIni, periodoFim, observacoes, geradoEm: new Date().toISOString(), horasTotal, progresso };
    save('relatorios', [r, ...data.relatorios]);
    setObservacoes('');
    alert('Relatório guardado.');
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="RELATÓRIOS PARA CLIENTES" action={
        <Btn variant="outline" onClick={() => openTemplate('relatorio')}><Download className="w-4 h-4" /> MODELO</Btn>
      } />

      <Card className="p-5">
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <Field label="OBRA">
            <Select value={obraId} onChange={e => setObraId(e.target.value)}>
              <option value="">— Selecionar —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="PERÍODO INÍCIO"><Input type="date" value={periodoIni} onChange={e => setPeriodoIni(e.target.value)} /></Field>
          <Field label="PERÍODO FIM"><Input type="date" value={periodoFim} onChange={e => setPeriodoFim(e.target.value)} /></Field>
        </div>

        {obra && (
          <div className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-6 lg:p-8 mt-4 shadow-inner">
            <div className="flex items-start justify-between mb-5 pb-5 border-b border-stone-200 flex-wrap gap-3">
              <div>
                <div className="text-[10px] tracking-[0.3em] text-amber-600 font-semibold mb-1">RELATÓRIO DE OBRA</div>
                <h3 className="font-display text-2xl mt-1 tracking-tight">{obra.nome}</h3>
                <div className="text-sm text-stone-600 mt-1.5">Cliente: <strong className="text-stone-900">{obra.cliente}</strong></div>
                <div className="text-xs text-stone-500 font-mono mt-1">{fmtDate(periodoIni)} → {fmtDate(periodoFim)}</div>
              </div>
              <div className="text-right">
                <div className="font-display text-5xl text-amber-600 tracking-tight">{progresso}<span className="text-3xl">%</span></div>
                <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mt-1">Progresso</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
                <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Horas</div>
                <div className="font-display text-2xl font-bold mt-1.5 tracking-tight">{horasTotal}</div>
              </div>
              <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
                <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Partes</div>
                <div className="font-display text-2xl font-bold mt-1.5 tracking-tight">{partesObra.length}</div>
              </div>
              <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-sm">
                <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Tarefas</div>
                <div className="font-display text-2xl font-bold mt-1.5 tracking-tight">{tarefasConcluidas}<span className="text-stone-400">/{tarefasObra.length}</span></div>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[10px] tracking-[0.18em] text-stone-600 mb-2.5 font-semibold uppercase">Trabalhos realizados</div>
              {partesObra.length === 0 ? (
                <div className="text-sm text-stone-400 italic">Sem partes diárias no período.</div>
              ) : (
                <ul className="text-sm space-y-1.5">
                  {partesObra.slice(0, 10).map(p => (
                    <li key={p.id} className="flex gap-2 text-stone-700"><span className="text-amber-500 font-mono text-xs mt-1">▸</span><span><span className="font-mono text-xs text-stone-500">{fmtDate(p.data)}</span> — {p.trabalhoRealizado}</span></li>
                  ))}
                  {partesObra.length > 10 && <li className="italic text-stone-400 pl-4">+ {partesObra.length - 10} outros registos</li>}
                </ul>
              )}
            </div>

            <div className="mb-5">
              <div className="text-[10px] tracking-[0.18em] text-stone-600 mb-2.5 font-semibold uppercase">Estado das tarefas</div>
              {tarefasObra.length === 0 ? (
                <div className="text-sm text-stone-400 italic">Sem tarefas registadas.</div>
              ) : (
                <div className="space-y-1.5">
                  {tarefasObra.map(t => (
                    <div key={t.id} className="flex items-center justify-between text-sm bg-white border border-stone-200 rounded-lg px-3 py-2">
                      <span>{t.titulo}</span>
                      <Badge variant={t.estado === 'concluida' ? 'green' : t.estado === 'em_curso' ? 'blue' : 'amber'}>
                        {t.estado.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Field label="OBSERVAÇÕES PARA O CLIENTE"><Textarea rows={4} value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Notas, próximos passos, pontos de atenção..." /></Field>

            <div className="flex justify-end gap-2 mt-5 flex-wrap">
              <Btn variant="primary" onClick={() => window.print()}><Download className="w-4 h-4" /> Imprimir / PDF</Btn>
              <Btn variant="accent" onClick={guardar}><Check className="w-4 h-4" /> Guardar relatório</Btn>
            </div>
          </div>
        )}
      </Card>

      {data.relatorios.length > 0 && (
        <div>
          <SectionHeader title="HISTÓRICO" />
          <div className="space-y-2">
            {data.relatorios.map(r => {
              const o = data.obras.find(x => x.id === r.obraId);
              return (
                <Card key={r.id} className="p-3 flex items-center justify-between">
                  <div>
                    <div className="font-display text-sm">{o?.nome || 'Obra removida'}</div>
                    <div className="text-xs text-stone-500">{fmtDate(r.periodoIni)} → {fmtDate(r.periodoFim)} · {r.progresso}% · {r.horasTotal}h</div>
                  </div>
                  <button onClick={() => save('relatorios', data.relatorios.filter(x => x.id !== r.id))} className="p-2 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function Equipa({ data, save, openTemplate }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', nome: '', funcao: 'Pedreiro', telefone: '', custoHora: 0, ativo: true };
  const [form, setForm] = useState(blank);

  const open = (w) => { setForm(w || { ...blank, id: uid() }); setEditing(w ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.trabalhadores, form] : data.trabalhadores.map(w => w.id === form.id ? form : w);
    save('trabalhadores', list); close();
  };
  const del = (id) => { if (confirm('Eliminar trabalhador?')) save('trabalhadores', data.trabalhadores.filter(w => w.id !== id)); };

  return (
    <div className="space-y-5">
      <SectionHeader title="EQUIPA" action={
        <div className="flex gap-2">
          <Btn variant="outline" onClick={() => openTemplate('trabalhador')}><Download className="w-4 h-4" /> MODELO</Btn>
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO TRABALHADOR</Btn>
        </div>
      } />

      {data.trabalhadores.length === 0 ? (
        <Empty icon={HardHat} title="Sem trabalhadores" hint="Adicione a equipa para poder atribuir nos planos diários e partes" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {data.trabalhadores.map((w, i) => (
            <Card key={w.id} className={`p-5 anim-in card-hover ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 text-amber-400 flex items-center justify-center font-display text-xl shadow-md ring-1 ring-white/10">{w.nome.charAt(0).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-display text-base truncate">{w.nome}</div>
                  <div className="text-xs text-stone-500 mt-0.5">{w.funcao}</div>
                </div>
              </div>
              <div className="text-xs space-y-1.5 text-stone-600 mb-4">
                {w.telefone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-stone-400" />{w.telefone}</div>}
                {w.custoHora > 0 && <div className="flex items-center gap-2"><Euro className="w-3 h-3 text-stone-400" /><span className="font-mono font-semibold">{eur(w.custoHora)}/h</span></div>}
              </div>
              <div className="flex gap-2 pt-3 border-t border-stone-100">
                <Btn size="sm" variant="outline" onClick={() => open(w)}><Pencil className="w-3 h-3" /> Editar</Btn>
                <Btn size="sm" variant="ghost" onClick={() => del(w.id)}><Trash2 className="w-3 h-3" /></Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO TRABALHADOR' : 'EDITAR TRABALHADOR'}>
        <div className="space-y-4">
          <Field label="NOME"><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="FUNÇÃO">
              <Select value={form.funcao} onChange={e => setForm({ ...form, funcao: e.target.value })}>
                {['Encarregado', 'Pedreiro', 'Servente', 'Carpinteiro', 'Armador de ferro', 'Manobrador', 'Eletricista', 'Canalizador', 'Pintor', 'Outro']
                  .map(f => <option key={f} value={f}>{f}</option>)}
              </Select>
            </Field>
            <Field label="CUSTO HORA (€)"><Input type="number" step="0.01" value={form.custoHora} onChange={e => setForm({ ...form, custoHora: parseFloat(e.target.value) || 0 })} /></Field>
          </div>
          <Field label="TELEFONE"><Input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t-2 border-stone-300">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   HELPERS DE NEGÓCIO
   ============================================================ */

function getNotifications(data) {
  const t = today();
  const in7 = new Date(); in7.setDate(in7.getDate() + 7);
  const in7s = in7.toISOString().split('T')[0];
  const in30 = new Date(); in30.setDate(in30.getDate() + 30);
  const in30s = in30.toISOString().split('T')[0];

  const notifs = [];

  (data.tarefas || []).filter(x => x.estado !== 'concluida' && x.dataFim && x.dataFim < t)
    .forEach(x => notifs.push({ id: 'tar-' + x.id, severity: 'red', icon: AlertTriangle, text: `Tarefa atrasada: ${x.titulo}`, sub: fmtDate(x.dataFim), tab: 'tarefas' }));

  (data.faturas || []).filter(x => x.estado === 'emitida' && x.vencimento && x.vencimento < t)
    .forEach(x => notifs.push({ id: 'fat-v-' + x.id, severity: 'red', icon: Receipt, text: `Fatura vencida: ${x.numero}`, sub: `${eur(x.total)} · ${x.cliente}`, tab: 'faturas' }));

  (data.faturas || []).filter(x => x.estado === 'emitida' && x.vencimento && x.vencimento >= t && x.vencimento <= in7s)
    .forEach(x => notifs.push({ id: 'fat-p-' + x.id, severity: 'amber', icon: Receipt, text: `Fatura a vencer: ${x.numero}`, sub: `${eur(x.total)} · ${fmtDate(x.vencimento)}`, tab: 'faturas' }));

  (data.manutencoes || []).filter(x => x.proximaData && x.proximaData >= t && x.proximaData <= in30s)
    .forEach(x => {
      const m = (data.maquinas || []).find(mm => mm.id === x.maquinaId);
      notifs.push({ id: 'man-' + x.id, severity: 'amber', icon: Wrench, text: `Manutenção próxima: ${m?.nome || '?'}`, sub: fmtDate(x.proximaData), tab: 'ferramentas' });
    });

  (data.materiais || []).filter(x => (x.adquirir || 0) > 0).slice(0, 3)
    .forEach(x => notifs.push({ id: 'mat-' + x.id, severity: 'amber', icon: Package, text: `Material em falta: ${x.nome}`, sub: `${x.adquirir} ${x.unidade}`, tab: 'materiais' }));

  (data.formacoes || []).filter(x => x.dataValidade && x.dataValidade >= t && x.dataValidade <= in30s)
    .forEach(x => {
      const w = (data.trabalhadores || []).find(ww => ww.id === x.trabalhadorId);
      notifs.push({ id: 'for-' + x.id, severity: 'amber', icon: Award, text: `Formação a expirar: ${w?.nome || '?'} · ${x.tipo}`, sub: fmtDate(x.dataValidade), tab: 'seguranca' });
    });

  (data.formacoes || []).filter(x => x.dataValidade && x.dataValidade < t)
    .forEach(x => {
      const w = (data.trabalhadores || []).find(ww => ww.id === x.trabalhadorId);
      notifs.push({ id: 'for-e-' + x.id, severity: 'red', icon: Award, text: `Formação caducada: ${w?.nome || '?'} · ${x.tipo}`, sub: fmtDate(x.dataValidade), tab: 'seguranca' });
    });

  (data.documentos || []).filter(x => x.dataValidade && x.dataValidade >= t && x.dataValidade <= in30s)
    .forEach(x => notifs.push({ id: 'doc-' + x.id, severity: 'amber', icon: FolderOpen, text: `Documento a expirar: ${x.nome}`, sub: fmtDate(x.dataValidade), tab: 'documentos' }));

  return notifs;
}

function calcCustosObra(data, obraId) {
  const partes = (data.partes || []).filter(p => p.obraId === obraId);
  const custoMaoObra = partes.reduce((s, p) => {
    const w = (data.trabalhadores || []).find(t => t.id === p.trabalhadorId);
    return s + (w?.custoHora || 0) * (p.horas || 0);
  }, 0);
  const horasMaoObra = partes.reduce((s, p) => s + (p.horas || 0), 0);
  const custoMateriais = (data.materiais || []).filter(m => m.obraId === obraId)
    .reduce((s, m) => s + (m.precoUnit || 0) * ((m.estaleiro || 0) + (m.adquirir || 0)), 0);
  const custoDespesas = (data.despesas || []).filter(d => d.obraId === obraId)
    .reduce((s, d) => s + (d.valor || 0), 0);
  const custoSubs = (data.subcontratados || []).filter(s => s.obraId === obraId)
    .reduce((s, x) => s + (x.executado || 0), 0);
  const total = custoMaoObra + custoMateriais + custoDespesas + custoSubs;
  return { custoMaoObra, custoMateriais, custoDespesas, custoSubs, total, horasMaoObra };
}

/* ============================================================
   NOTIFICAÇÕES E PESQUISA
   ============================================================ */

function NotificationsBell({ data, setTab, open, setOpen }) {
  const notifs = getNotifications(data);
  const unread = notifs.length;
  const hasRed = notifs.some(n => n.severity === 'red');

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="p-2.5 rounded-xl hover:bg-stone-100 relative transition-colors">
        <Bell className="w-4 h-4" />
        {unread > 0 && (
          <span className={`absolute top-1 right-1 min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full flex items-center justify-center text-white ${hasRed ? 'bg-rose-600' : 'bg-amber-500'}`}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-[360px] bg-white rounded-2xl shadow-2xl border border-stone-200 z-40 anim-in overflow-hidden">
            <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between">
              <div className="font-display text-sm tracking-tight">Notificações</div>
              <Badge variant={hasRed ? 'red' : 'amber'}>{unread} ATIVAS</Badge>
            </div>
            <div className="max-h-[480px] overflow-y-auto scrollbar-thin">
              {notifs.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-2" />
                  <div className="text-sm font-semibold text-stone-700">Tudo em ordem</div>
                  <div className="text-xs text-stone-500 mt-1">Sem alertas pendentes</div>
                </div>
              ) : notifs.map(n => {
                const Icon = n.icon;
                return (
                  <button key={n.id} onClick={() => { setTab(n.tab); setOpen(false); }}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-stone-50 border-b border-stone-50 last:border-0 text-left transition-colors">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${n.severity === 'red' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-stone-800 truncate">{n.text}</div>
                      <div className="text-xs text-stone-500 mt-0.5 truncate">{n.sub}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SearchPalette({ data, setTab, onClose }) {
  const [q, setQ] = useState('');
  const results = useMemoSearch(data, q);

  return (
    <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-[10vh]" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden anim-in" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-stone-100">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            autoFocus
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Pesquisar obras, clientes, trabalhadores, materiais, máquinas..."
            className="flex-1 bg-transparent outline-none text-sm font-body"
          />
          <kbd className="text-[10px] font-mono bg-stone-100 px-1.5 py-0.5 rounded">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto scrollbar-thin">
          {!q ? (
            <div className="px-4 py-8 text-center text-sm text-stone-400">
              Comece a escrever para pesquisar em toda a base de dados
            </div>
          ) : results.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-stone-400">Sem resultados para "{q}"</div>
          ) : (
            results.map(r => (
              <button key={r.id} onClick={() => { setTab(r.tab); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-stone-50 border-b border-stone-50 last:border-0 text-left transition-colors">
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0">
                  <r.icon className="w-4 h-4 text-stone-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">{r.title}</div>
                  <div className="text-xs text-stone-500 truncate">{r.subtitle}</div>
                </div>
                <Badge variant="gray">{r.type}</Badge>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function useMemoSearch(data, q) {
  const ql = (q || '').toLowerCase().trim();
  if (!ql) return [];
  const matches = (s) => s && s.toLowerCase().includes(ql);
  const out = [];
  (data.obras || []).forEach(o => { if (matches(o.nome) || matches(o.cliente) || matches(o.local)) out.push({ id: 'o-' + o.id, type: 'OBRA', title: o.nome, subtitle: `${o.cliente || ''} · ${o.local || ''}`, icon: Building2, tab: 'obras' }); });
  (data.trabalhadores || []).forEach(w => { if (matches(w.nome) || matches(w.funcao) || matches(w.telefone)) out.push({ id: 't-' + w.id, type: 'TRABALHADOR', title: w.nome, subtitle: w.funcao, icon: HardHat, tab: 'equipa' }); });
  (data.orcamentos || []).forEach(o => { if (matches(o.cliente) || matches(o.numero)) out.push({ id: 'orc-' + o.id, type: 'ORÇAMENTO', title: `${o.numero} · ${o.cliente}`, subtitle: eur(o.total), icon: FileText, tab: 'orcamentos' }); });
  (data.faturas || []).forEach(f => { if (matches(f.cliente) || matches(f.numero)) out.push({ id: 'fat-' + f.id, type: 'FATURA', title: `${f.numero} · ${f.cliente}`, subtitle: eur(f.total), icon: Receipt, tab: 'faturas' }); });
  (data.materiais || []).forEach(m => { if (matches(m.nome) || matches(m.fornecedor)) out.push({ id: 'm-' + m.id, type: 'MATERIAL', title: m.nome, subtitle: m.fornecedor || '—', icon: Package, tab: 'materiais' }); });
  (data.maquinas || []).forEach(m => { if (matches(m.nome) || matches(m.matricula)) out.push({ id: 'maq-' + m.id, type: 'EQUIPAMENTO', title: m.nome, subtitle: `${m.marca || ''} ${m.modelo || ''}`, icon: Truck, tab: 'ferramentas' }); });
  (data.fornecedores || []).forEach(f => { if (matches(f.nome)) out.push({ id: 'f-' + f.id, type: 'FORNECEDOR', title: f.nome, subtitle: f.tipo || '', icon: Briefcase, tab: 'fornecedores' }); });
  return out.slice(0, 30);
}

/* ============================================================
   FATURAS
   ============================================================ */

function Faturas({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', numero: '', cliente: '', obraId: '', data: today(), vencimento: '', subtotal: 0, iva: 23, total: 0, estado: 'rascunho', metodoPagamento: '', notas: '' };
  const [form, setForm] = useState(blank);
  const [filter, setFilter] = useState('todas');
  const [printFatura, setPrintFatura] = useState(null);

  const open = (f) => {
    setForm(f ? { ...f } : { ...blank, id: uid(), numero: `FAT-${new Date().getFullYear()}-${String(data.faturas.length + 1).padStart(3, '0')}` });
    setEditing(f ? 'edit' : 'new');
  };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.cliente) return;
    const total = (form.subtotal || 0) * (1 + (form.iva || 0) / 100);
    const final = { ...form, total };
    const list = editing === 'new' ? [...data.faturas, final] : data.faturas.map(f => f.id === final.id ? final : f);
    save('faturas', list); close();
  };
  const del = (id) => { if (confirm('Eliminar fatura?')) save('faturas', data.faturas.filter(f => f.id !== id)); };
  const updEstado = (id, estado) => {
    const dataPag = estado === 'paga' ? today() : '';
    save('faturas', data.faturas.map(f => f.id === id ? { ...f, estado, dataPag } : f));
  };

  const t = today();
  const filtered = data.faturas.filter(f => {
    if (filter === 'todas') return true;
    if (filter === 'pagas') return f.estado === 'paga';
    if (filter === 'pendentes') return f.estado === 'emitida' && f.vencimento >= t;
    if (filter === 'vencidas') return f.estado === 'emitida' && f.vencimento && f.vencimento < t;
    return true;
  });

  const totalPendente = data.faturas.filter(f => f.estado === 'emitida').reduce((s, f) => s + (f.total || 0), 0);
  const totalVencido = data.faturas.filter(f => f.estado === 'emitida' && f.vencimento && f.vencimento < t).reduce((s, f) => s + (f.total || 0), 0);
  const totalRecebido = data.faturas.filter(f => f.estado === 'paga').reduce((s, f) => s + (f.total || 0), 0);

  const estadoBadge = (e, venc) => {
    if (e === 'paga') return <Badge variant="green">PAGA</Badge>;
    if (e === 'emitida' && venc && venc < t) return <Badge variant="red">VENCIDA</Badge>;
    if (e === 'emitida') return <Badge variant="amber">EMITIDA</Badge>;
    return <Badge variant="gray">RASCUNHO</Badge>;
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="FATURAS" action={
        <div className="flex gap-2">
          <ExportBtn onClick={() => exportToCSV('faturas',
            ['Numero', 'Cliente', 'Obra', 'Data', 'Vencimento', 'Subtotal', 'IVA %', 'Total', 'Estado', 'Metodo'],
            data.faturas.map(f => [f.numero, f.cliente, data.obras.find(o => o.id === f.obraId)?.nome || '', f.data, f.vencimento, f.subtotal, f.iva, f.total, f.estado, f.metodoPagamento])
          )} />
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA FATURA</Btn>
        </div>
      } />

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 anim-in anim-in-1 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">A receber</div>
              <div className="font-display text-2xl font-bold mt-2 tracking-tight">{eur(totalPendente)}</div>
              <div className="text-xs text-stone-500 mt-1">faturas emitidas</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-700" />
            </div>
          </div>
        </Card>
        <Card className="p-5 anim-in anim-in-2 card-hover bg-rose-50/60 border-rose-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-rose-700 font-semibold uppercase">Vencido</div>
              <div className="font-display text-2xl font-bold mt-2 tracking-tight text-rose-900">{eur(totalVencido)}</div>
              <div className="text-xs text-rose-700 mt-1">cobrança urgente</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-rose-200 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-700" />
            </div>
          </div>
        </Card>
        <Card className="p-5 anim-in anim-in-3 card-hover">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Recebido</div>
              <div className="font-display text-2xl font-bold mt-2 tracking-tight text-emerald-700">{eur(totalRecebido)}</div>
              <div className="text-xs text-stone-500 mt-1">total no período</div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-1 flex-wrap">
        {[['todas', 'Todas'], ['pendentes', 'Pendentes'], ['vencidas', 'Vencidas'], ['pagas', 'Pagas']].map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)}
            className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${filter === k ? 'bg-zinc-900 text-white' : 'bg-white border border-stone-200 hover:bg-stone-50'}`}>{l}</button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Empty icon={Receipt} title="Sem faturas" hint="Crie a primeira fatura para um cliente" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">Nº</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">CLIENTE</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">DATA</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">VENCIM.</th>
                  <th className="text-right px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">TOTAL</th>
                  <th className="text-left px-5 py-3.5 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ESTADO</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                    <td className="px-5 py-3.5 font-mono font-semibold text-xs">{f.numero}</td>
                    <td className="px-5 py-3.5 font-medium">{f.cliente}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-stone-500">{fmtDate(f.data)}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-stone-500">{fmtDate(f.vencimento)}</td>
                    <td className="px-5 py-3.5 text-right font-display font-bold">{eur(f.total)}</td>
                    <td className="px-5 py-3.5">{estadoBadge(f.estado, f.vencimento)}</td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      {f.estado === 'emitida' && <button onClick={() => updEstado(f.id, 'paga')} className="p-1.5 rounded-lg hover:bg-emerald-100 hover:text-emerald-700 transition-colors" title="Marcar paga"><Check className="w-4 h-4" /></button>}
                      <button onClick={() => setPrintFatura(f)} className="p-1.5 rounded-lg hover:bg-sky-100 hover:text-sky-700 transition-colors" title="Imprimir"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => open(f)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(f.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA FATURA' : 'EDITAR FATURA'} wide>
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <Field label="Nº FATURA"><Input value={form.numero} onChange={e => setForm({ ...form, numero: e.target.value })} /></Field>
          <Field label="DATA EMISSÃO"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="VENCIMENTO"><Input type="date" value={form.vencimento} onChange={e => setForm({ ...form, vencimento: e.target.value })} /></Field>
          <Field label="CLIENTE" className="md:col-span-2"><Input value={form.cliente} onChange={e => setForm({ ...form, cliente: e.target.value })} /></Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Sem obra —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="SUBTOTAL (€)"><Input type="number" step="0.01" value={form.subtotal} onChange={e => setForm({ ...form, subtotal: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="IVA (%)"><Input type="number" value={form.iva} onChange={e => setForm({ ...form, iva: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="ESTADO">
            <Select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option value="rascunho">Rascunho</option>
              <option value="emitida">Emitida</option>
              <option value="paga">Paga</option>
            </Select>
          </Field>
          <Field label="MÉTODO PAGAMENTO" className="md:col-span-3"><Input value={form.metodoPagamento} onChange={e => setForm({ ...form, metodoPagamento: e.target.value })} placeholder="Transferência, MB Way, cheque..." /></Field>
          <Field label="NOTAS" className="md:col-span-3"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 text-white rounded-2xl p-5 text-sm shadow-lg">
          <div className="flex justify-between text-stone-300 mb-1"><span>Subtotal</span><span className="font-mono">{eur(form.subtotal)}</span></div>
          <div className="flex justify-between text-stone-300 mb-2"><span>IVA ({form.iva}%)</span><span className="font-mono">{eur((form.subtotal || 0) * (form.iva || 0) / 100)}</span></div>
          <div className="flex justify-between font-display text-amber-400 text-xl pt-2 border-t border-white/10"><span>TOTAL</span><span className="font-mono">{eur((form.subtotal || 0) * (1 + (form.iva || 0) / 100))}</span></div>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>

      {printFatura && <FaturaPrintView fatura={printFatura} obra={data.obras.find(o => o.id === printFatura.obraId)} onClose={() => setPrintFatura(null)} />}
    </div>
  );
}

/* ============================================================
   DESPESAS
   ============================================================ */

const CAT_DESPESA = ['Combustível', 'Materiais', 'Subcontratação', 'Equipamento', 'Transporte', 'Refeições', 'Taxas/Licenças', 'Manutenção', 'Outros'];

function Despesas({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', data: today(), obraId: '', categoria: 'Materiais', descricao: '', fornecedor: '', valor: 0, comDocumento: true, notas: '' };
  const [form, setForm] = useState(blank);
  const [filtroObra, setFiltroObra] = useState('');
  const [filtroCat, setFiltroCat] = useState('');

  const open = (d) => { setForm(d || { ...blank, id: uid() }); setEditing(d ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.descricao || !form.valor) return;
    const list = editing === 'new' ? [...data.despesas, form] : data.despesas.map(d => d.id === form.id ? form : d);
    save('despesas', list); close();
  };
  const del = (id) => { if (confirm('Eliminar despesa?')) save('despesas', data.despesas.filter(d => d.id !== id)); };

  let lista = data.despesas;
  if (filtroObra) lista = lista.filter(d => d.obraId === filtroObra);
  if (filtroCat) lista = lista.filter(d => d.categoria === filtroCat);
  lista = [...lista].sort((a, b) => (b.data || '').localeCompare(a.data || ''));

  const totalMes = data.despesas.filter(d => d.data && d.data.startsWith(today().slice(0, 7))).reduce((s, d) => s + (d.valor || 0), 0);
  const totalAno = data.despesas.filter(d => d.data && d.data.startsWith(today().slice(0, 4))).reduce((s, d) => s + (d.valor || 0), 0);
  const semDoc = data.despesas.filter(d => !d.comDocumento).length;

  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';

  return (
    <div className="space-y-5">
      <SectionHeader title="DESPESAS" action={
        <div className="flex gap-2">
          <ExportBtn onClick={() => exportToCSV('despesas',
            ['Data', 'Descricao', 'Categoria', 'Obra', 'Fornecedor', 'Valor', 'Comprovativo'],
            data.despesas.map(d => [d.data, d.descricao, d.categoria, data.obras.find(o => o.id === d.obraId)?.nome || '', d.fornecedor, d.valor, d.comDocumento ? 'Sim' : 'Nao'])
          )} />
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA DESPESA</Btn>
        </div>
      } />

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 anim-in anim-in-1 card-hover">
          <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Este mês</div>
          <div className="font-display text-2xl font-bold mt-2">{eur(totalMes)}</div>
        </Card>
        <Card className="p-5 anim-in anim-in-2 card-hover">
          <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Este ano</div>
          <div className="font-display text-2xl font-bold mt-2">{eur(totalAno)}</div>
        </Card>
        <Card className="p-5 anim-in anim-in-3 card-hover bg-amber-50/60 border-amber-200">
          <div className="text-[10px] tracking-[0.18em] text-amber-800 font-semibold uppercase">Sem comprovativo</div>
          <div className="font-display text-2xl font-bold mt-2 text-amber-900">{semDoc}</div>
        </Card>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Select value={filtroObra} onChange={e => setFiltroObra(e.target.value)} className="!w-auto">
          <option value="">Todas as obras</option>
          {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
        </Select>
        <Select value={filtroCat} onChange={e => setFiltroCat(e.target.value)} className="!w-auto">
          <option value="">Todas as categorias</option>
          {CAT_DESPESA.map(c => <option key={c} value={c}>{c}</option>)}
        </Select>
      </div>

      {lista.length === 0 ? (
        <Empty icon={CreditCard} title="Sem despesas registadas" hint="Adicione despesas para acompanhar custos reais por obra" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200">
                  <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">DATA</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">DESCRIÇÃO</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">CATEGORIA</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">OBRA</th>
                  <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">FORNECEDOR</th>
                  <th className="text-right px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">VALOR</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {lista.map(d => (
                  <tr key={d.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                    <td className="px-5 py-3 font-mono text-xs text-stone-500">{fmtDate(d.data)}</td>
                    <td className="px-5 py-3 font-medium">{d.descricao}{!d.comDocumento && <span className="ml-2 text-[10px] text-amber-700 font-bold">⚠ s/ doc</span>}</td>
                    <td className="px-5 py-3"><Badge variant="gray">{d.categoria}</Badge></td>
                    <td className="px-5 py-3 text-xs text-stone-500">{obraNome(d.obraId)}</td>
                    <td className="px-5 py-3 text-xs">{d.fornecedor || '—'}</td>
                    <td className="px-5 py-3 text-right font-display font-bold">{eur(d.valor)}</td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button onClick={() => open(d)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700 transition-colors"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(d.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA DESPESA' : 'EDITAR DESPESA'} wide>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="VALOR (€)"><Input type="number" step="0.01" value={form.valor} onChange={e => setForm({ ...form, valor: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="DESCRIÇÃO" className="md:col-span-2"><Input value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} placeholder="Ex.: Gasóleo CAT 320 (200L)" /></Field>
          <Field label="CATEGORIA">
            <Select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
              {CAT_DESPESA.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Geral —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="FORNECEDOR" className="md:col-span-2"><Input value={form.fornecedor} onChange={e => setForm({ ...form, fornecedor: e.target.value })} /></Field>
          <Field label="COMPROVATIVO" className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.comDocumento} onChange={e => setForm({ ...form, comDocumento: e.target.checked })} className="w-4 h-4" />
              Despesa tem comprovativo (fatura, recibo)
            </label>
          </Field>
          <Field label="NOTAS" className="md:col-span-2"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   FERRAMENTAS (com tabs: frota, manutenções, combustível)
   ============================================================ */

function Ferramentas({ data, save }) {
  const [tab, setTab] = useState('frota');
  return (
    <div className="space-y-5">
      <div className="flex gap-1 flex-wrap">
        {[['frota', 'Frota / Equipamento', Truck], ['manutencoes', 'Manutenções', Wrench], ['abastecimentos', 'Combustível', Fuel]].map(([k, l, Icon]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-2 text-sm rounded-xl font-semibold transition-colors flex items-center gap-2 ${tab === k ? 'bg-zinc-900 text-white shadow-md' : 'bg-white border border-stone-200 hover:bg-stone-50'}`}>
            <Icon className="w-4 h-4" /> {l}
          </button>
        ))}
      </div>
      {tab === 'frota' && <Frota data={data} save={save} />}
      {tab === 'manutencoes' && <Manutencoes data={data} save={save} />}
      {tab === 'abastecimentos' && <Abastecimentos data={data} save={save} />}
    </div>
  );
}

function Frota({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', nome: '', tipo: 'Giratória', marca: '', modelo: '', matricula: '', ano: new Date().getFullYear(), horasMotor: 0, custoHora: 0, estado: 'operacional', obraAtualId: '', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (m) => { setForm(m || { ...blank, id: uid() }); setEditing(m ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.maquinas, form] : data.maquinas.map(m => m.id === form.id ? form : m);
    save('maquinas', list); close();
  };
  const del = (id) => { if (confirm('Eliminar equipamento?')) save('maquinas', data.maquinas.filter(m => m.id !== id)); };

  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';
  const estadoBadge = (e) => ({ operacional: <Badge variant="green">OPERACIONAL</Badge>, manutencao: <Badge variant="amber">EM MANUTENÇÃO</Badge>, avariada: <Badge variant="red">AVARIADA</Badge>, parada: <Badge variant="gray">PARADA</Badge> })[e];

  return (
    <div className="space-y-4">
      <SectionHeader title="FROTA E EQUIPAMENTOS" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO EQUIPAMENTO</Btn>} />

      {data.maquinas.length === 0 ? (
        <Empty icon={Truck} title="Sem equipamentos registados" hint="Adicione máquinas (CAT, Komatsu, Volvo, Hitachi) e ferramentas (martelos pneumáticos, cortadoras, geradores)" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.maquinas.map((m, i) => (
            <Card key={m.id} className={`p-5 anim-in card-hover ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center shadow-md flex-shrink-0">
                    <Truck className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-base truncate">{m.nome}</div>
                    <div className="text-xs text-stone-500 truncate">{m.marca} {m.modelo}</div>
                  </div>
                </div>
                {estadoBadge(m.estado)}
              </div>
              <div className="text-xs space-y-1.5 text-stone-600 mb-3">
                {m.matricula && <div className="font-mono">{m.matricula}</div>}
                <div className="flex items-center gap-2"><Activity className="w-3 h-3 text-stone-400" /><span className="font-mono">{m.horasMotor}h motor</span></div>
                {m.custoHora > 0 && <div className="flex items-center gap-2"><Euro className="w-3 h-3 text-stone-400" /><span className="font-mono">{eur(m.custoHora)}/h</span></div>}
                {m.obraAtualId && <div className="flex items-center gap-2"><Building2 className="w-3 h-3 text-stone-400" />{obraNome(m.obraAtualId)}</div>}
              </div>
              <div className="flex gap-2 pt-3 border-t border-stone-100">
                <Btn size="sm" variant="outline" onClick={() => open(m)}><Pencil className="w-3 h-3" /> Editar</Btn>
                <Btn size="sm" variant="ghost" onClick={() => del(m.id)}><Trash2 className="w-3 h-3" /></Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO EQUIPAMENTO' : 'EDITAR EQUIPAMENTO'} wide>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="NOME / DESIGNAÇÃO"><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} placeholder="Ex.: Giratória CAT 320D ou Martelo Hilti TE 60" /></Field>
          <Field label="TIPO">
            <Select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
              <optgroup label="Maquinaria pesada">
                {['Giratória', 'Pá Carregadora', 'Bulldozer', 'Camião Basculante', 'Cilindro', 'Grua', 'Mini-giratória', 'Retroescavadora', 'Compactador'].map(t => <option key={t}>{t}</option>)}
              </optgroup>
              <optgroup label="Equipamento auxiliar">
                {['Gerador', 'Compressor', 'Andaime', 'Plataforma elevatória', 'Betoneira', 'Vibrador'].map(t => <option key={t}>{t}</option>)}
              </optgroup>
              <optgroup label="Ferramentas elétricas">
                {['Martelo demolidor', 'Cortadora de metal', 'Berbequim', 'Lixadeira', 'Serra circular', 'Soldadora'].map(t => <option key={t}>{t}</option>)}
              </optgroup>
              <optgroup label="Outros">
                {['Veículo ligeiro', 'Carrinha', 'Outro'].map(t => <option key={t}>{t}</option>)}
              </optgroup>
            </Select>
          </Field>
          <Field label="MARCA"><Input value={form.marca} onChange={e => setForm({ ...form, marca: e.target.value })} placeholder="CAT, Komatsu, Volvo, Hitachi..." /></Field>
          <Field label="MODELO"><Input value={form.modelo} onChange={e => setForm({ ...form, modelo: e.target.value })} /></Field>
          <Field label="MATRÍCULA"><Input value={form.matricula} onChange={e => setForm({ ...form, matricula: e.target.value })} /></Field>
          <Field label="ANO"><Input type="number" value={form.ano} onChange={e => setForm({ ...form, ano: parseInt(e.target.value) || 0 })} /></Field>
          <Field label="HORAS DE MOTOR"><Input type="number" step="0.1" value={form.horasMotor} onChange={e => setForm({ ...form, horasMotor: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="CUSTO/HORA (€)"><Input type="number" step="0.01" value={form.custoHora} onChange={e => setForm({ ...form, custoHora: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="ESTADO">
            <Select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option value="operacional">Operacional</option>
              <option value="manutencao">Em manutenção</option>
              <option value="avariada">Avariada</option>
              <option value="parada">Parada</option>
            </Select>
          </Field>
          <Field label="OBRA ATUAL">
            <Select value={form.obraAtualId} onChange={e => setForm({ ...form, obraAtualId: e.target.value })}>
              <option value="">— Estaleiro —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="NOTAS" className="md:col-span-2"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Manutencoes({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', maquinaId: '', data: today(), tipo: 'preventiva', horasMotorAtual: 0, descricao: '', custo: 0, fornecedor: '', proximaData: '', proximasHoras: 0, notas: '' };
  const [form, setForm] = useState(blank);

  const open = (m) => { setForm(m || { ...blank, id: uid() }); setEditing(m ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.maquinaId || !form.descricao) return;
    const list = editing === 'new' ? [...data.manutencoes, form] : data.manutencoes.map(m => m.id === form.id ? form : m);
    save('manutencoes', list); close();
  };
  const del = (id) => { if (confirm('Eliminar manutenção?')) save('manutencoes', data.manutencoes.filter(m => m.id !== id)); };

  const maqNome = (id) => data.maquinas.find(m => m.id === id)?.nome || '?';
  const t = today();
  const proximas = data.manutencoes.filter(m => m.proximaData && m.proximaData >= t).length;
  const atrasadas = data.manutencoes.filter(m => m.proximaData && m.proximaData < t).length;
  const lista = [...data.manutencoes].sort((a, b) => (b.data || '').localeCompare(a.data || ''));

  return (
    <div className="space-y-4">
      <SectionHeader title="MANUTENÇÕES" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA MANUTENÇÃO</Btn>} />

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5 anim-in anim-in-1"><div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Total registadas</div><div className="font-display text-2xl font-bold mt-2">{data.manutencoes.length}</div></Card>
        <Card className="p-5 anim-in anim-in-2 bg-amber-50/60 border-amber-200"><div className="text-[10px] tracking-[0.18em] text-amber-800 font-semibold uppercase">Próximas</div><div className="font-display text-2xl font-bold mt-2 text-amber-900">{proximas}</div></Card>
        <Card className="p-5 anim-in anim-in-3 bg-rose-50/60 border-rose-200"><div className="text-[10px] tracking-[0.18em] text-rose-800 font-semibold uppercase">Atrasadas</div><div className="font-display text-2xl font-bold mt-2 text-rose-900">{atrasadas}</div></Card>
      </div>

      {lista.length === 0 ? (
        <Empty icon={Wrench} title="Sem manutenções registadas" hint="Registe manutenções preventivas e corretivas" />
      ) : (
        <div className="space-y-2">
          {lista.map(m => {
            const atrasada = m.proximaData && m.proximaData < t;
            return (
              <Card key={m.id} className={`p-4 ${atrasada ? 'border-rose-200 bg-rose-50/30' : ''}`}>
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant={m.tipo === 'preventiva' ? 'blue' : m.tipo === 'corretiva' ? 'amber' : 'gray'}>{m.tipo.toUpperCase()}</Badge>
                      <Badge variant="black">{maqNome(m.maquinaId)}</Badge>
                      {atrasada && <Badge variant="red">PRÓXIMA EM ATRASO</Badge>}
                    </div>
                    <div className="font-display text-sm">{m.descricao}</div>
                    <div className="text-xs text-stone-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-mono">{fmtDate(m.data)}</span>
                      <span>·</span>
                      <span>{m.horasMotorAtual}h motor</span>
                      {m.custo > 0 && <><span>·</span><span className="font-mono font-semibold">{eur(m.custo)}</span></>}
                      {m.proximaData && <><span>·</span><span className="text-amber-700">próxima: {fmtDate(m.proximaData)}</span></>}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => open(m)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => del(m.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA MANUTENÇÃO' : 'EDITAR'} wide>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="MÁQUINA">
            <Select value={form.maquinaId} onChange={e => setForm({ ...form, maquinaId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.maquinas.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </Select>
          </Field>
          <Field label="TIPO">
            <Select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
              <option value="preventiva">Preventiva</option>
              <option value="corretiva">Corretiva</option>
              <option value="inspecao">Inspeção</option>
            </Select>
          </Field>
          <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="HORAS MOTOR ATUAL"><Input type="number" step="0.1" value={form.horasMotorAtual} onChange={e => setForm({ ...form, horasMotorAtual: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="DESCRIÇÃO" className="md:col-span-2"><Textarea rows={2} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} placeholder="Mudança de óleo, filtros, revisão das 5000h..." /></Field>
          <Field label="CUSTO (€)"><Input type="number" step="0.01" value={form.custo} onChange={e => setForm({ ...form, custo: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="FORNECEDOR/OFICINA"><Input value={form.fornecedor} onChange={e => setForm({ ...form, fornecedor: e.target.value })} /></Field>
          <Field label="PRÓXIMA MANUTENÇÃO (DATA)"><Input type="date" value={form.proximaData} onChange={e => setForm({ ...form, proximaData: e.target.value })} /></Field>
          <Field label="OU AOS (HORAS MOTOR)"><Input type="number" value={form.proximasHoras} onChange={e => setForm({ ...form, proximasHoras: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="NOTAS" className="md:col-span-2"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Abastecimentos({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', maquinaId: '', data: today(), litros: 0, custo: 0, horasMotor: 0, obraId: '', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (a) => { setForm(a || { ...blank, id: uid() }); setEditing(a ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.maquinaId || !form.litros) return;
    const list = editing === 'new' ? [...data.abastecimentos, form] : data.abastecimentos.map(a => a.id === form.id ? form : a);
    save('abastecimentos', list); close();
  };
  const del = (id) => { if (confirm('Eliminar?')) save('abastecimentos', data.abastecimentos.filter(a => a.id !== id)); };

  const maqNome = (id) => data.maquinas.find(m => m.id === id)?.nome || '?';
  const lista = [...data.abastecimentos].sort((a, b) => (b.data || '').localeCompare(a.data || ''));
  const totalMes = data.abastecimentos.filter(a => a.data && a.data.startsWith(today().slice(0, 7))).reduce((s, a) => s + (a.custo || 0), 0);
  const litrosMes = data.abastecimentos.filter(a => a.data && a.data.startsWith(today().slice(0, 7))).reduce((s, a) => s + (a.litros || 0), 0);

  return (
    <div className="space-y-4">
      <SectionHeader title="COMBUSTÍVEL" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO ABASTECIMENTO</Btn>} />

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5"><div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Litros este mês</div><div className="font-display text-2xl font-bold mt-2 font-mono">{litrosMes}L</div></Card>
        <Card className="p-5"><div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Custo este mês</div><div className="font-display text-2xl font-bold mt-2">{eur(totalMes)}</div></Card>
      </div>

      {lista.length === 0 ? (
        <Empty icon={Fuel} title="Sem abastecimentos" hint="Registe consumos de combustível por máquina" />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">DATA</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">MÁQUINA</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">LITROS</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">€/L</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">CUSTO</th>
                <th className="text-right px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">H. MOTOR</th>
                <th></th>
              </tr></thead>
              <tbody>
                {lista.map(a => (
                  <tr key={a.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                    <td className="px-5 py-3 font-mono text-xs">{fmtDate(a.data)}</td>
                    <td className="px-5 py-3 font-medium">{maqNome(a.maquinaId)}</td>
                    <td className="px-5 py-3 text-right font-mono">{a.litros}L</td>
                    <td className="px-5 py-3 text-right font-mono text-xs text-stone-500">{a.litros > 0 ? (a.custo / a.litros).toFixed(3) : '—'}</td>
                    <td className="px-5 py-3 text-right font-display font-bold">{eur(a.custo)}</td>
                    <td className="px-5 py-3 text-right font-mono text-xs">{a.horasMotor}h</td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button onClick={() => open(a)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(a.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO ABASTECIMENTO' : 'EDITAR'}>
        <div className="space-y-3">
          <Field label="MÁQUINA">
            <Select value={form.maquinaId} onChange={e => setForm({ ...form, maquinaId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.maquinas.map(m => <option key={m.id} value={m.id}>{m.nome}</option>)}
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
            <Field label="HORAS MOTOR"><Input type="number" step="0.1" value={form.horasMotor} onChange={e => setForm({ ...form, horasMotor: parseFloat(e.target.value) || 0 })} /></Field>
            <Field label="LITROS"><Input type="number" step="0.01" value={form.litros} onChange={e => setForm({ ...form, litros: parseFloat(e.target.value) || 0 })} /></Field>
            <Field label="CUSTO TOTAL (€)"><Input type="number" step="0.01" value={form.custo} onChange={e => setForm({ ...form, custo: parseFloat(e.target.value) || 0 })} /></Field>
          </div>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Geral —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   FORNECEDORES
   ============================================================ */

function Fornecedores({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', nome: '', tipo: '', contacto: '', telefone: '', email: '', nif: '', morada: '', materiaisFornecidos: '', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (f) => { setForm(f || { ...blank, id: uid() }); setEditing(f ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.fornecedores, form] : data.fornecedores.map(f => f.id === form.id ? form : f);
    save('fornecedores', list); close();
  };
  const del = (id) => { if (confirm('Eliminar fornecedor?')) save('fornecedores', data.fornecedores.filter(f => f.id !== id)); };

  return (
    <div className="space-y-5">
      <SectionHeader title="FORNECEDORES" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO FORNECEDOR</Btn>} />

      {data.fornecedores.length === 0 ? (
        <Empty icon={Briefcase} title="Sem fornecedores" hint="Adicione fornecedores de cimento, agregados, ferro, etc." />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.fornecedores.map((f, i) => (
            <Card key={f.id} className={`p-5 anim-in card-hover ${i < 4 ? 'anim-in-' + (i + 1) : ''}`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center text-sky-700">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base truncate">{f.nome}</div>
                  <div className="text-xs text-stone-500 truncate">{f.tipo || '—'}</div>
                </div>
              </div>
              <div className="text-xs space-y-1 text-stone-600 mb-3">
                {f.telefone && <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-stone-400" />{f.telefone}</div>}
                {f.email && <div className="flex items-center gap-2 truncate">✉ {f.email}</div>}
                {f.nif && <div className="font-mono text-stone-500">NIF {f.nif}</div>}
                {f.materiaisFornecidos && <div className="text-stone-500 italic line-clamp-2">{f.materiaisFornecidos}</div>}
              </div>
              <div className="flex gap-2 pt-3 border-t border-stone-100">
                <Btn size="sm" variant="outline" onClick={() => open(f)}><Pencil className="w-3 h-3" /> Editar</Btn>
                <Btn size="sm" variant="ghost" onClick={() => del(f.id)}><Trash2 className="w-3 h-3" /></Btn>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO FORNECEDOR' : 'EDITAR FORNECEDOR'}>
        <div className="space-y-3">
          <Field label="NOME"><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></Field>
          <Field label="TIPO"><Input value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} placeholder="Ex.: Cimentos, Agregados, Ferro, Combustível" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="PESSOA DE CONTACTO"><Input value={form.contacto} onChange={e => setForm({ ...form, contacto: e.target.value })} /></Field>
            <Field label="TELEFONE"><Input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} /></Field>
            <Field label="EMAIL"><Input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
            <Field label="NIF"><Input value={form.nif} onChange={e => setForm({ ...form, nif: e.target.value })} /></Field>
          </div>
          <Field label="MORADA"><Input value={form.morada} onChange={e => setForm({ ...form, morada: e.target.value })} /></Field>
          <Field label="MATERIAIS / SERVIÇOS FORNECIDOS"><Textarea rows={2} value={form.materiaisFornecidos} onChange={e => setForm({ ...form, materiaisFornecidos: e.target.value })} /></Field>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   SUBEMPREITADAS
   ============================================================ */

function Subcontratados({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', nome: '', tipo: '', telefone: '', nif: '', obraId: '', descricao: '', valor: 0, executado: 0, faturado: 0, notas: '' };
  const [form, setForm] = useState(blank);

  const open = (s) => { setForm(s || { ...blank, id: uid() }); setEditing(s ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.subcontratados, form] : data.subcontratados.map(s => s.id === form.id ? form : s);
    save('subcontratados', list); close();
  };
  const del = (id) => { if (confirm('Eliminar subempreitada?')) save('subcontratados', data.subcontratados.filter(s => s.id !== id)); };

  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';
  const totalAdjudicado = data.subcontratados.reduce((s, x) => s + (x.valor || 0), 0);
  const totalExecutado = data.subcontratados.reduce((s, x) => s + (x.executado || 0), 0);
  const totalFaturado = data.subcontratados.reduce((s, x) => s + (x.faturado || 0), 0);

  return (
    <div className="space-y-5">
      <SectionHeader title="SUBEMPREITADAS" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA SUBEMPREITADA</Btn>} />

      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-5"><div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Adjudicado</div><div className="font-display text-2xl font-bold mt-2">{eur(totalAdjudicado)}</div></Card>
        <Card className="p-5"><div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Executado</div><div className="font-display text-2xl font-bold mt-2">{eur(totalExecutado)}</div></Card>
        <Card className="p-5"><div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Faturado</div><div className="font-display text-2xl font-bold mt-2">{eur(totalFaturado)}</div></Card>
      </div>

      {data.subcontratados.length === 0 ? (
        <Empty icon={Briefcase} title="Sem subempreitadas" hint="Registe trabalhos subcontratados (eletricidade, canalização, etc.)" />
      ) : (
        <div className="space-y-2">
          {data.subcontratados.map(s => {
            const pctExec = s.valor > 0 ? Math.round((s.executado / s.valor) * 100) : 0;
            return (
              <Card key={s.id} className="p-5">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-base">{s.nome}</div>
                    <div className="text-xs text-stone-500 mt-1">{s.tipo} · {obraNome(s.obraId)}</div>
                    {s.descricao && <div className="text-sm text-stone-700 mt-2">{s.descricao}</div>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => open(s)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700"><Pencil className="w-4 h-4" /></button>
                    <button onClick={() => del(s.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                  <div><div className="text-stone-500 mb-1">Adjudicado</div><div className="font-display font-bold">{eur(s.valor)}</div></div>
                  <div><div className="text-stone-500 mb-1">Executado</div><div className="font-display font-bold">{eur(s.executado)}</div></div>
                  <div><div className="text-stone-500 mb-1">Faturado</div><div className="font-display font-bold">{eur(s.faturado)}</div></div>
                </div>
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1"><span className="text-stone-500">Progresso de execução</span><span className="font-mono font-semibold">{pctExec}%</span></div>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500" style={{ width: pctExec + '%' }} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA SUBEMPREITADA' : 'EDITAR'} wide>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="EMPRESA / PRESTADOR"><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></Field>
          <Field label="TIPO DE TRABALHO"><Input value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} placeholder="Eletricidade, Canalização, AVAC..." /></Field>
          <Field label="TELEFONE"><Input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} /></Field>
          <Field label="NIF"><Input value={form.nif} onChange={e => setForm({ ...form, nif: e.target.value })} /></Field>
          <Field label="OBRA" className="md:col-span-2">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="DESCRIÇÃO DO TRABALHO" className="md:col-span-2"><Textarea rows={2} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></Field>
          <Field label="VALOR ADJUDICADO (€)"><Input type="number" step="0.01" value={form.valor} onChange={e => setForm({ ...form, valor: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="VALOR EXECUTADO (€)"><Input type="number" step="0.01" value={form.executado} onChange={e => setForm({ ...form, executado: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="VALOR FATURADO PELO SUB (€)"><Input type="number" step="0.01" value={form.faturado} onChange={e => setForm({ ...form, faturado: parseFloat(e.target.value) || 0 })} /></Field>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   DOCUMENTOS
   ============================================================ */

function Documentos({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', obraId: '', nome: '', tipo: 'Alvará', dataEmissao: today(), dataValidade: '', referencia: '', notas: '' };
  const [form, setForm] = useState(blank);
  const [filtroObra, setFiltroObra] = useState('');

  const open = (d) => { setForm(d || { ...blank, id: uid() }); setEditing(d ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.nome) return;
    const list = editing === 'new' ? [...data.documentos, form] : data.documentos.map(d => d.id === form.id ? form : d);
    save('documentos', list); close();
  };
  const del = (id) => { if (confirm('Eliminar documento?')) save('documentos', data.documentos.filter(d => d.id !== id)); };

  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || 'Geral';
  const lista = filtroObra ? data.documentos.filter(d => d.obraId === filtroObra) : data.documentos;
  const t = today();

  return (
    <div className="space-y-5">
      <SectionHeader title="DOCUMENTOS" action={
        <div className="flex gap-2 flex-wrap">
          <Select value={filtroObra} onChange={e => setFiltroObra(e.target.value)} className="!w-auto">
            <option value="">Todas</option>
            {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
          </Select>
          <Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO DOCUMENTO</Btn>
        </div>
      } />

      {lista.length === 0 ? (
        <Empty icon={FolderOpen} title="Sem documentos" hint="Registe alvarás, seguros, licenças, contratos e atas" />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {lista.map(d => {
            const expirado = d.dataValidade && d.dataValidade < t;
            const aExpirar = d.dataValidade && d.dataValidade >= t && (new Date(d.dataValidade) - new Date(t)) / 86400000 < 30;
            return (
              <Card key={d.id} className={`p-4 ${expirado ? 'border-rose-200 bg-rose-50/30' : aExpirar ? 'border-amber-200 bg-amber-50/30' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={d.tipo === 'Alvará' ? 'blue' : d.tipo === 'Seguro' ? 'green' : 'gray'}>{d.tipo.toUpperCase()}</Badge>
                  <div className="flex gap-1">
                    <button onClick={() => open(d)} className="p-1 hover:text-amber-600"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => del(d.id)} className="p-1 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="font-display text-sm mb-1">{d.nome}</div>
                <div className="text-xs text-stone-500 mb-2">{obraNome(d.obraId)}</div>
                {d.referencia && <div className="text-xs font-mono text-stone-500 mb-1">Ref: {d.referencia}</div>}
                <div className="text-xs space-y-0.5 text-stone-600 pt-2 border-t border-stone-100">
                  <div>Emitido: {fmtDate(d.dataEmissao)}</div>
                  {d.dataValidade && (
                    <div className={expirado ? 'text-rose-700 font-bold' : aExpirar ? 'text-amber-700 font-bold' : ''}>
                      Validade: {fmtDate(d.dataValidade)} {expirado && '⚠ EXPIRADO'} {aExpirar && '⚠ A EXPIRAR'}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO DOCUMENTO' : 'EDITAR'}>
        <div className="space-y-3">
          <Field label="NOME / DESIGNAÇÃO"><Input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></Field>
          <Field label="TIPO">
            <Select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
              {['Alvará', 'Seguro', 'Licença', 'Contrato', 'Ata', 'Projeto', 'Auto-medição', 'Outro'].map(t => <option key={t}>{t}</option>)}
            </Select>
          </Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Geral / Empresa —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="REFERÊNCIA / Nº DOCUMENTO"><Input value={form.referencia} onChange={e => setForm({ ...form, referencia: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="DATA EMISSÃO"><Input type="date" value={form.dataEmissao} onChange={e => setForm({ ...form, dataEmissao: e.target.value })} /></Field>
            <Field label="DATA VALIDADE"><Input type="date" value={form.dataValidade} onChange={e => setForm({ ...form, dataValidade: e.target.value })} /></Field>
          </div>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   SEGURANÇA (EPI + Formações + Acidentes)
   ============================================================ */

function Seguranca({ data, save }) {
  const [tab, setTab] = useState('formacoes');
  return (
    <div className="space-y-5">
      <div className="flex gap-1 flex-wrap">
        {[['formacoes', 'Formações', Award], ['epi', 'EPI', Shield], ['acidentes', 'Acidentes', AlertTriangle]].map(([k, l, Icon]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-2 text-sm rounded-xl font-semibold transition-colors flex items-center gap-2 ${tab === k ? 'bg-zinc-900 text-white shadow-md' : 'bg-white border border-stone-200 hover:bg-stone-50'}`}>
            <Icon className="w-4 h-4" /> {l}
          </button>
        ))}
      </div>
      {tab === 'formacoes' && <Formacoes data={data} save={save} />}
      {tab === 'epi' && <EPI data={data} save={save} />}
      {tab === 'acidentes' && <Acidentes data={data} save={save} />}
    </div>
  );
}

function Formacoes({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', trabalhadorId: '', tipo: '', entidade: '', dataEmissao: today(), dataValidade: '', certificado: '', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (f) => { setForm(f || { ...blank, id: uid() }); setEditing(f ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.trabalhadorId || !form.tipo) return;
    const list = editing === 'new' ? [...data.formacoes, form] : data.formacoes.map(f => f.id === form.id ? form : f);
    save('formacoes', list); close();
  };
  const del = (id) => { if (confirm('Eliminar?')) save('formacoes', data.formacoes.filter(f => f.id !== id)); };

  const wNome = (id) => data.trabalhadores.find(w => w.id === id)?.nome || '?';
  const t = today();

  return (
    <div className="space-y-4">
      <SectionHeader title="FORMAÇÕES E CERTIFICAÇÕES" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVA FORMAÇÃO</Btn>} />

      {data.formacoes.length === 0 ? (
        <Empty icon={Award} title="Sem formações registadas" hint="Cartas de manobrador, formação em altura, primeiros socorros..." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">TRABALHADOR</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">FORMAÇÃO</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ENTIDADE</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">EMISSÃO</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">VALIDADE</th>
                <th></th>
              </tr></thead>
              <tbody>
                {data.formacoes.map(f => {
                  const expirada = f.dataValidade && f.dataValidade < t;
                  return (
                    <tr key={f.id} className={`border-b border-stone-100 last:border-0 hover:bg-stone-50/50 ${expirada ? 'bg-rose-50/30' : ''}`}>
                      <td className="px-5 py-3 font-medium">{wNome(f.trabalhadorId)}</td>
                      <td className="px-5 py-3"><Badge variant="blue">{f.tipo}</Badge></td>
                      <td className="px-5 py-3 text-xs text-stone-500">{f.entidade || '—'}</td>
                      <td className="px-5 py-3 font-mono text-xs">{fmtDate(f.dataEmissao)}</td>
                      <td className={`px-5 py-3 font-mono text-xs ${expirada ? 'text-rose-700 font-bold' : ''}`}>{fmtDate(f.dataValidade)}{expirada && ' ⚠'}</td>
                      <td className="px-5 py-3 text-right whitespace-nowrap">
                        <button onClick={() => open(f)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => del(f.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA FORMAÇÃO' : 'EDITAR'}>
        <div className="space-y-3">
          <Field label="TRABALHADOR">
            <Select value={form.trabalhadorId} onChange={e => setForm({ ...form, trabalhadorId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.trabalhadores.map(w => <option key={w.id} value={w.id}>{w.nome}</option>)}
            </Select>
          </Field>
          <Field label="TIPO DE FORMAÇÃO"><Input value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} placeholder="Carta de manobrador, Trabalho em altura..." /></Field>
          <Field label="ENTIDADE FORMADORA"><Input value={form.entidade} onChange={e => setForm({ ...form, entidade: e.target.value })} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="DATA DE EMISSÃO"><Input type="date" value={form.dataEmissao} onChange={e => setForm({ ...form, dataEmissao: e.target.value })} /></Field>
            <Field label="VALIDADE"><Input type="date" value={form.dataValidade} onChange={e => setForm({ ...form, dataValidade: e.target.value })} /></Field>
          </div>
          <Field label="Nº CERTIFICADO"><Input value={form.certificado} onChange={e => setForm({ ...form, certificado: e.target.value })} /></Field>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function EPI({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', trabalhadorId: '', equipamento: '', dataEntrega: today(), dataRenovacao: '', estado: 'novo', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (e) => { setForm(e || { ...blank, id: uid() }); setEditing(e ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.trabalhadorId || !form.equipamento) return;
    const list = editing === 'new' ? [...data.epi, form] : data.epi.map(e => e.id === form.id ? form : e);
    save('epi', list); close();
  };
  const del = (id) => { if (confirm('Eliminar?')) save('epi', data.epi.filter(e => e.id !== id)); };

  const wNome = (id) => data.trabalhadores.find(w => w.id === id)?.nome || '?';

  return (
    <div className="space-y-4">
      <SectionHeader title="EPI ATRIBUÍDO" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO REGISTO</Btn>} />

      {data.epi.length === 0 ? (
        <Empty icon={Shield} title="Sem registos de EPI" hint="Capacetes, calçado de segurança, luvas, arneses..." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">TRABALHADOR</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">EQUIPAMENTO</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ENTREGA</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">RENOVAR ATÉ</th>
                <th className="text-left px-5 py-3 font-mono text-[10px] tracking-widest text-stone-500 font-semibold">ESTADO</th>
                <th></th>
              </tr></thead>
              <tbody>
                {data.epi.map(e => (
                  <tr key={e.id} className="border-b border-stone-100 last:border-0 hover:bg-stone-50/50">
                    <td className="px-5 py-3 font-medium">{wNome(e.trabalhadorId)}</td>
                    <td className="px-5 py-3">{e.equipamento}</td>
                    <td className="px-5 py-3 font-mono text-xs">{fmtDate(e.dataEntrega)}</td>
                    <td className="px-5 py-3 font-mono text-xs">{fmtDate(e.dataRenovacao)}</td>
                    <td className="px-5 py-3"><Badge variant={e.estado === 'novo' ? 'green' : e.estado === 'usado' ? 'amber' : 'red'}>{e.estado.toUpperCase()}</Badge></td>
                    <td className="px-5 py-3 text-right whitespace-nowrap">
                      <button onClick={() => open(e)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(e.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVO REGISTO EPI' : 'EDITAR'}>
        <div className="space-y-3">
          <Field label="TRABALHADOR">
            <Select value={form.trabalhadorId} onChange={e => setForm({ ...form, trabalhadorId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.trabalhadores.map(w => <option key={w.id} value={w.id}>{w.nome}</option>)}
            </Select>
          </Field>
          <Field label="EQUIPAMENTO"><Input value={form.equipamento} onChange={e => setForm({ ...form, equipamento: e.target.value })} placeholder="Capacete, calçado biqueira aço, arnês..." /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="DATA ENTREGA"><Input type="date" value={form.dataEntrega} onChange={e => setForm({ ...form, dataEntrega: e.target.value })} /></Field>
            <Field label="RENOVAR ATÉ"><Input type="date" value={form.dataRenovacao} onChange={e => setForm({ ...form, dataRenovacao: e.target.value })} /></Field>
          </div>
          <Field label="ESTADO">
            <Select value={form.estado} onChange={e => setForm({ ...form, estado: e.target.value })}>
              <option value="novo">Novo</option>
              <option value="usado">Usado</option>
              <option value="substituir">A substituir</option>
            </Select>
          </Field>
          <Field label="NOTAS"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

function Acidentes({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', data: today(), obraId: '', trabalhadorId: '', descricao: '', gravidade: 'ligeiro', baixa: 0, medidas: '', notas: '' };
  const [form, setForm] = useState(blank);

  const open = (a) => { setForm(a || { ...blank, id: uid() }); setEditing(a ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.descricao) return;
    const list = editing === 'new' ? [...data.acidentes, form] : data.acidentes.map(a => a.id === form.id ? form : a);
    save('acidentes', list); close();
  };
  const del = (id) => { if (confirm('Eliminar?')) save('acidentes', data.acidentes.filter(a => a.id !== id)); };

  const wNome = (id) => data.trabalhadores.find(w => w.id === id)?.nome || '?';
  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';

  return (
    <div className="space-y-4">
      <SectionHeader title="REGISTO DE ACIDENTES" action={<Btn variant="accent" onClick={() => open(null)}><Plus className="w-4 h-4" /> NOVO REGISTO</Btn>} />

      {data.acidentes.length === 0 ? (
        <Empty icon={AlertTriangle} title="Sem acidentes registados" hint="Esperemos que continue assim. Registe qualquer ocorrência com obrigação legal." />
      ) : (
        <div className="space-y-2">
          {data.acidentes.map(a => (
            <Card key={a.id} className={`p-4 ${a.gravidade === 'fatal' ? 'border-rose-300 bg-rose-50' : a.gravidade === 'grave' ? 'border-amber-300 bg-amber-50/40' : ''}`}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant={a.gravidade === 'fatal' ? 'red' : a.gravidade === 'grave' ? 'amber' : 'gray'}>{a.gravidade.toUpperCase()}</Badge>
                    <span className="text-xs font-mono text-stone-500">{fmtDate(a.data)}</span>
                  </div>
                  <div className="font-display text-sm">{a.descricao}</div>
                  <div className="text-xs text-stone-500 mt-1">{wNome(a.trabalhadorId)} · {obraNome(a.obraId)}{a.baixa > 0 && ` · ${a.baixa} dias de baixa`}</div>
                  {a.medidas && <div className="text-xs text-stone-700 mt-2"><span className="font-semibold">Medidas:</span> {a.medidas}</div>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => open(a)} className="p-1.5 rounded-lg hover:bg-amber-100 hover:text-amber-700"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => del(a.id)} className="p-1.5 rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'REGISTO DE ACIDENTE' : 'EDITAR'} wide>
        <div className="grid md:grid-cols-2 gap-3">
          <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
          <Field label="GRAVIDADE">
            <Select value={form.gravidade} onChange={e => setForm({ ...form, gravidade: e.target.value })}>
              <option value="ligeiro">Ligeiro (sem baixa)</option>
              <option value="moderado">Moderado</option>
              <option value="grave">Grave</option>
              <option value="fatal">Fatal</option>
            </Select>
          </Field>
          <Field label="OBRA">
            <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="TRABALHADOR">
            <Select value={form.trabalhadorId} onChange={e => setForm({ ...form, trabalhadorId: e.target.value })}>
              <option value="">— Selecionar —</option>
              {data.trabalhadores.map(w => <option key={w.id} value={w.id}>{w.nome}</option>)}
            </Select>
          </Field>
          <Field label="DIAS DE BAIXA"><Input type="number" value={form.baixa} onChange={e => setForm({ ...form, baixa: parseInt(e.target.value) || 0 })} /></Field>
          <Field label="DESCRIÇÃO DO ACIDENTE" className="md:col-span-2"><Textarea rows={3} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></Field>
          <Field label="MEDIDAS CORRETIVAS / PREVENTIVAS" className="md:col-span-2"><Textarea rows={2} value={form.medidas} onChange={e => setForm({ ...form, medidas: e.target.value })} /></Field>
          <Field label="NOTAS" className="md:col-span-2"><Textarea rows={2} value={form.notas} onChange={e => setForm({ ...form, notas: e.target.value })} /></Field>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>
    </div>
  );
}

/* ============================================================
   CALENDÁRIO UNIFICADO
   ============================================================ */

function Calendario({ data, setTab }) {
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d; });
  const monthLabel = cursor.toLocaleDateString('pt-PT', { month: 'long', year: 'numeric' });
  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;

  const eventsByDate = {};
  const push = (date, ev) => {
    if (!date) return;
    if (!eventsByDate[date]) eventsByDate[date] = [];
    eventsByDate[date].push(ev);
  };

  data.tarefas.forEach(t => { if (t.dataFim) push(t.dataFim, { type: 'tarefa', label: 'Tarefa: ' + t.titulo, color: 'amber', tab: 'tarefas' }); });
  data.planos.forEach(p => { push(p.data, { type: 'plano', label: 'Plano diário', color: 'blue', tab: 'planos' }); });
  data.manutencoes.forEach(m => { if (m.proximaData) push(m.proximaData, { type: 'manut', label: 'Manutenção', color: 'amber', tab: 'ferramentas' }); });
  data.faturas.forEach(f => { if (f.vencimento && f.estado === 'emitida') push(f.vencimento, { type: 'fat', label: `Fatura ${f.numero}`, color: 'rose', tab: 'faturas' }); });
  data.obras.forEach(o => { if (o.dataInicio) push(o.dataInicio, { type: 'obra-i', label: `Início obra: ${o.nome}`, color: 'emerald', tab: 'obras' }); if (o.dataFim) push(o.dataFim, { type: 'obra-f', label: `Fim obra: ${o.nome}`, color: 'zinc', tab: 'obras' }); });
  data.documentos.forEach(d => { if (d.dataValidade) push(d.dataValidade, { type: 'doc', label: `Validade: ${d.nome}`, color: 'rose', tab: 'documentos' }); });
  data.formacoes.forEach(f => { if (f.dataValidade) push(f.dataValidade, { type: 'form', label: `Formação expira`, color: 'rose', tab: 'seguranca' }); });

  const t = today();
  const cells = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    cells.push({ day: d, dateStr, events: eventsByDate[dateStr] || [], isToday: dateStr === t });
  }

  const colorClass = {
    amber: 'bg-amber-500', blue: 'bg-sky-500', rose: 'bg-rose-500', emerald: 'bg-emerald-500', zinc: 'bg-zinc-500'
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="CALENDÁRIO" action={
        <div className="flex items-center gap-2">
          <Btn variant="outline" size="sm" onClick={() => setCursor(new Date(year, month - 1, 1))}>‹</Btn>
          <div className="font-display text-base capitalize px-3 min-w-[160px] text-center">{monthLabel}</div>
          <Btn variant="outline" size="sm" onClick={() => setCursor(new Date(year, month + 1, 1))}>›</Btn>
          <Btn variant="ghost" size="sm" onClick={() => { const d = new Date(); d.setDate(1); setCursor(d); }}>Hoje</Btn>
        </div>
      } />

      <Card className="p-3 lg:p-5">
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map(d => (
            <div key={d} className="text-[10px] text-stone-500 font-semibold tracking-widest uppercase text-center py-2">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((c, i) => (
            <div key={i} className={`min-h-[80px] lg:min-h-[110px] rounded-lg p-1.5 ${!c ? 'bg-transparent' : c.isToday ? 'bg-amber-50 ring-2 ring-amber-400' : 'bg-stone-50/60 hover:bg-stone-100/60 transition-colors'}`}>
              {c && (
                <>
                  <div className={`text-xs font-mono font-semibold ${c.isToday ? 'text-amber-700' : 'text-stone-500'} mb-1`}>{c.day}</div>
                  <div className="space-y-0.5">
                    {c.events.slice(0, 3).map((ev, ei) => (
                      <button key={ei} onClick={() => setTab(ev.tab)} className="w-full flex items-center gap-1 text-[10px] truncate hover:bg-white rounded px-1 py-0.5 text-left">
                        <span className={`w-1.5 h-1.5 rounded-full ${colorClass[ev.color]}`} />
                        <span className="truncate text-stone-700">{ev.label}</span>
                      </button>
                    ))}
                    {c.events.length > 3 && <div className="text-[9px] text-stone-400 px-1">+{c.events.length - 3} mais</div>}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mb-3">Legenda</div>
        <div className="flex flex-wrap gap-3 text-xs">
          {[['emerald', 'Início de obra'], ['zinc', 'Fim de obra'], ['blue', 'Plano diário'], ['amber', 'Tarefa / Manutenção'], ['rose', 'Vencimento / Validade']].map(([c, l]) => (
            <div key={c} className="flex items-center gap-1.5"><span className={`w-2.5 h-2.5 rounded-full ${colorClass[c]}`} />{l}</div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   ANÁLISE DE LUCRO POR OBRA
   ============================================================ */

function Analise({ data }) {
  const obrasComCustos = data.obras.map(o => {
    const custos = calcCustosObra(data, o.id);
    const margem = (o.valorContrato || 0) - custos.total;
    const margemPct = o.valorContrato > 0 ? (margem / o.valorContrato) * 100 : 0;
    const faturado = data.faturas.filter(f => f.obraId === o.id && f.estado !== 'rascunho').reduce((s, f) => s + (f.total || 0), 0);
    const recebido = data.faturas.filter(f => f.obraId === o.id && f.estado === 'paga').reduce((s, f) => s + (f.total || 0), 0);
    return { obra: o, custos, margem, margemPct, faturado, recebido };
  });

  const totalContrato = data.obras.reduce((s, o) => s + (o.valorContrato || 0), 0);
  const totalCustos = obrasComCustos.reduce((s, x) => s + x.custos.total, 0);
  const totalMargem = totalContrato - totalCustos;
  const totalFaturado = data.faturas.filter(f => f.estado !== 'rascunho').reduce((s, f) => s + (f.total || 0), 0);
  const totalRecebido = data.faturas.filter(f => f.estado === 'paga').reduce((s, f) => s + (f.total || 0), 0);
  const totalDespesas = data.despesas.reduce((s, d) => s + (d.valor || 0), 0);

  const sorted = [...obrasComCustos].sort((a, b) => b.margemPct - a.margemPct);

  return (
    <div className="space-y-5">
      <SectionHeader title="ANÁLISE FINANCEIRA" />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 anim-in anim-in-1 card-hover bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="relative">
            <div className="text-[10px] tracking-[0.18em] text-amber-300/80 font-semibold uppercase">Adjudicado</div>
            <div className="font-display text-2xl font-bold mt-2 tracking-tight">{eur(totalContrato)}</div>
            <div className="text-xs text-stone-400 mt-1">{data.obras.length} obras</div>
          </div>
        </Card>
        <Card className="p-5 anim-in anim-in-2 card-hover">
          <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Custos totais</div>
          <div className="font-display text-2xl font-bold mt-2 tracking-tight text-rose-700">{eur(totalCustos)}</div>
          <div className="text-xs text-stone-500 mt-1">incluindo despesas</div>
        </Card>
        <Card className={`p-5 anim-in anim-in-3 card-hover ${totalMargem >= 0 ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'}`}>
          <div className={`text-[10px] tracking-[0.18em] font-semibold uppercase ${totalMargem >= 0 ? 'text-emerald-800' : 'text-rose-800'}`}>Margem total</div>
          <div className={`font-display text-2xl font-bold mt-2 tracking-tight ${totalMargem >= 0 ? 'text-emerald-900' : 'text-rose-900'}`}>{eur(totalMargem)}</div>
          <div className={`text-xs mt-1 ${totalMargem >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
            {totalContrato > 0 ? Math.round((totalMargem / totalContrato) * 100) : 0}% sobre adjudicado
          </div>
        </Card>
        <Card className="p-5 anim-in anim-in-4 card-hover">
          <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Cash flow</div>
          <div className="space-y-1.5 mt-2 text-xs">
            <div className="flex justify-between"><span className="text-stone-600">Faturado</span><span className="font-mono font-semibold">{eur(totalFaturado)}</span></div>
            <div className="flex justify-between"><span className="text-stone-600">Recebido</span><span className="font-mono font-semibold text-emerald-700">{eur(totalRecebido)}</span></div>
            <div className="flex justify-between"><span className="text-stone-600">Despesas</span><span className="font-mono font-semibold text-rose-700">{eur(totalDespesas)}</span></div>
          </div>
        </Card>
      </div>

      <Card className="p-5 lg:p-6">
        <SectionHeader title="LUCRO POR OBRA" />
        {obrasComCustos.length === 0 ? (
          <Empty icon={BarChart3} title="Sem obras para analisar" hint="Crie obras e registe custos para ver a análise" />
        ) : (
          <div className="space-y-3">
            {sorted.map(({ obra, custos, margem, margemPct, faturado, recebido }) => {
              const positiva = margem >= 0;
              return (
                <div key={obra.id} className="border border-stone-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
                    <div>
                      <div className="font-display text-base">{obra.nome}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{obra.cliente}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-display text-2xl font-bold tracking-tight ${positiva ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {positiva ? '+' : ''}{eur(margem)}
                      </div>
                      <div className={`text-xs font-mono font-semibold ${positiva ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {positiva ? <ArrowUp className="w-3 h-3 inline" /> : <ArrowDown className="w-3 h-3 inline" />} {Math.abs(margemPct).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 text-xs">
                    <div><div className="text-stone-500">Adjudicado</div><div className="font-mono font-semibold mt-0.5">{eur(obra.valorContrato)}</div></div>
                    <div><div className="text-stone-500">Mão-de-obra</div><div className="font-mono font-semibold mt-0.5">{eur(custos.custoMaoObra)}<span className="text-stone-400 ml-1">({custos.horasMaoObra}h)</span></div></div>
                    <div><div className="text-stone-500">Materiais</div><div className="font-mono font-semibold mt-0.5">{eur(custos.custoMateriais)}</div></div>
                    <div><div className="text-stone-500">Despesas</div><div className="font-mono font-semibold mt-0.5">{eur(custos.custoDespesas)}</div></div>
                    <div><div className="text-stone-500">Subempr.</div><div className="font-mono font-semibold mt-0.5">{eur(custos.custoSubs)}</div></div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-stone-100 flex justify-between items-center text-xs flex-wrap gap-2">
                    <div className="text-stone-500">Faturação:</div>
                    <div className="flex gap-3">
                      <span>Faturado: <strong className="font-mono">{eur(faturado)}</strong></span>
                      <span>Recebido: <strong className="font-mono text-emerald-700">{eur(recebido)}</strong></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ============================================================
   HELPER: EXPORTAÇÃO CSV/EXCEL
   ============================================================ */

function exportToCSV(filename, headers, rows) {
  const escape = (v) => {
    if (v === null || v === undefined) return '';
    const s = String(v);
    if (s.includes(';') || s.includes('"') || s.includes('\n')) return '"' + s.replace(/"/g, '""') + '"';
    return s;
  };
  const csv = [
    headers.join(';'),
    ...rows.map(r => r.map(escape).join(';'))
  ].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename + '_' + today() + '.csv';
  a.click();
  URL.revokeObjectURL(url);
}

const ExportBtn = ({ onClick, label = 'EXPORTAR' }) => (
  <Btn variant="outline" size="sm" onClick={onClick}><Download className="w-3.5 h-3.5" /> {label}</Btn>
);

/* ============================================================
   GALERIA DE FOTOS
   ============================================================ */

function Galeria({ data, save }) {
  const [editing, setEditing] = useState(null);
  const blank = { id: '', obraId: '', data: today(), fase: 'durante', titulo: '', descricao: '', imagemBase64: '' };
  const [form, setForm] = useState(blank);
  const [filtroObra, setFiltroObra] = useState('');
  const [preview, setPreview] = useState(null);

  const open = (f) => { setForm(f || { ...blank, id: uid() }); setEditing(f ? 'edit' : 'new'); };
  const close = () => { setEditing(null); setForm(blank); };
  const submit = () => {
    if (!form.obraId || !form.imagemBase64) return;
    const list = editing === 'new' ? [...data.fotos, form] : data.fotos.map(f => f.id === form.id ? form : f);
    save('fotos', list); close();
  };
  const del = (id) => { if (confirm('Eliminar fotografia?')) save('fotos', data.fotos.filter(f => f.id !== id)); };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) {
      alert('Imagem demasiado grande. Máximo 4MB. Use uma versão comprimida.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      // Reduzir resolução para poupar espaço
      const img = new window.Image();
      img.onload = () => {
        const max = 1280;
        let w = img.width, h = img.height;
        if (w > max || h > max) {
          if (w > h) { h = h * (max / w); w = max; }
          else { w = w * (max / h); h = max; }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        setForm(f => ({ ...f, imagemBase64: canvas.toDataURL('image/jpeg', 0.78) }));
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
  };

  const lista = filtroObra ? data.fotos.filter(f => f.obraId === filtroObra) : data.fotos;
  const sorted = [...lista].sort((a, b) => (b.data || '').localeCompare(a.data || ''));
  const obraNome = (id) => data.obras.find(o => o.id === id)?.nome || '—';

  const faseLabel = (f) => ({ antes: 'ANTES', durante: 'DURANTE', depois: 'DEPOIS' })[f] || f.toUpperCase();
  const faseVariant = (f) => ({ antes: 'gray', durante: 'amber', depois: 'green' })[f] || 'gray';

  return (
    <div className="space-y-5">
      <SectionHeader title="GALERIA DE FOTOS" action={
        <div className="flex gap-2 flex-wrap">
          <Select value={filtroObra} onChange={e => setFiltroObra(e.target.value)} className="!w-auto">
            <option value="">Todas as obras</option>
            {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
          </Select>
          <Btn variant="accent" onClick={() => open(null)}><Camera className="w-4 h-4" /> NOVA FOTO</Btn>
        </div>
      } />

      {sorted.length === 0 ? (
        <Empty icon={Image} title="Sem fotografias" hint="Adicione fotos antes/durante/depois para enriquecer relatórios ao cliente" />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {sorted.map(f => (
            <div key={f.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 card-hover">
              <button onClick={() => setPreview(f)} className="block w-full aspect-[4/3] bg-stone-100 overflow-hidden">
                <img src={f.imagemBase64} alt={f.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </button>
              <div className="absolute top-2 left-2"><Badge variant={faseVariant(f.fase)}>{faseLabel(f.fase)}</Badge></div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => open(f)} className="p-1.5 bg-white/90 backdrop-blur rounded-lg hover:bg-white"><Pencil className="w-3.5 h-3.5" /></button>
                <button onClick={() => del(f.id)} className="p-1.5 bg-white/90 backdrop-blur rounded-lg hover:bg-rose-100 hover:text-rose-700"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <div className="p-3">
                <div className="font-display text-sm truncate">{f.titulo || obraNome(f.obraId)}</div>
                <div className="text-[10px] text-stone-500 mt-0.5 font-mono">{fmtDate(f.data)} · {obraNome(f.obraId)}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={editing} onClose={close} title={editing === 'new' ? 'NOVA FOTOGRAFIA' : 'EDITAR FOTOGRAFIA'} wide>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Field label="IMAGEM">
              {form.imagemBase64 ? (
                <div className="relative">
                  <img src={form.imagemBase64} alt="" className="w-full rounded-xl border border-stone-200" />
                  <button onClick={() => setForm({ ...form, imagemBase64: '' })} className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-lg hover:bg-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="block border-2 border-dashed border-stone-300 rounded-xl p-8 text-center cursor-pointer hover:border-amber-400 hover:bg-amber-50/30 transition-colors">
                  <Upload className="w-8 h-8 mx-auto text-stone-400 mb-2" />
                  <div className="text-sm text-stone-600">Clique para carregar imagem</div>
                  <div className="text-xs text-stone-400 mt-1">JPG, PNG · máx 4MB</div>
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
              )}
            </Field>
          </div>
          <div className="space-y-3">
            <Field label="OBRA">
              <Select value={form.obraId} onChange={e => setForm({ ...form, obraId: e.target.value })}>
                <option value="">— Selecionar —</option>
                {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
              </Select>
            </Field>
            <Field label="DATA"><Input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></Field>
            <Field label="FASE">
              <Select value={form.fase} onChange={e => setForm({ ...form, fase: e.target.value })}>
                <option value="antes">Antes</option>
                <option value="durante">Durante</option>
                <option value="depois">Depois</option>
              </Select>
            </Field>
            <Field label="TÍTULO"><Input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} placeholder="Ex.: Estado inicial da fachada" /></Field>
            <Field label="DESCRIÇÃO"><Textarea rows={3} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></Field>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-5 pt-4 border-t border-stone-200">
          <Btn variant="ghost" onClick={close}>Cancelar</Btn>
          <Btn variant="primary" onClick={submit}><Check className="w-4 h-4" /> Guardar</Btn>
        </div>
      </Modal>

      {preview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 anim-in" onClick={() => setPreview(null)}>
          <button onClick={() => setPreview(null)} className="absolute top-4 right-4 p-2 bg-white/10 rounded-xl hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
          <div className="max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <img src={preview.imagemBase64} alt="" className="max-h-[80vh] mx-auto rounded-2xl shadow-2xl" />
            <div className="mt-4 text-center text-white">
              <div className="font-display text-lg">{preview.titulo || obraNome(preview.obraId)}</div>
              <div className="text-sm text-stone-300 mt-1">{fmtDate(preview.data)} · {obraNome(preview.obraId)} · {faseLabel(preview.fase)}</div>
              {preview.descricao && <div className="text-sm text-stone-400 mt-2 max-w-xl mx-auto">{preview.descricao}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RELATÓRIO DIÁRIO PARA CLIENTE
   ============================================================ */

function RelatorioDiario({ data, save }) {
  const [obraId, setObraId] = useState('');
  const [dataRef, setDataRef] = useState(today());
  const [resumo, setResumo] = useState('');
  const [proximosPassos, setProximosPassos] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [meteoTemperatura, setMeteoTemperatura] = useState('');
  const [meteoCondicoes, setMeteoCondicoes] = useState('');
  const [showSendOptions, setShowSendOptions] = useState(false);

  const obra = data.obras.find(o => o.id === obraId);
  const partesDia = data.partes.filter(p => p.obraId === obraId && p.data === dataRef);
  const fotosDia = data.fotos.filter(f => f.obraId === obraId && f.data === dataRef);
  const horasDia = partesDia.reduce((s, p) => s + (p.horas || 0), 0);
  const trabalhadoresDia = [...new Set(partesDia.map(p => p.trabalhadorId))].length;
  const planoDia = data.planos.find(p => p.obraId === obraId && p.data === dataRef);
  const tarefasObra = data.tarefas.filter(t => t.obraId === obraId);
  const tarefasConcluidas = tarefasObra.filter(t => t.estado === 'concluida').length;
  const progresso = tarefasObra.length > 0 ? Math.round(tarefasConcluidas / tarefasObra.length * 100) : 0;
  const wNome = (id) => data.trabalhadores.find(w => w.id === id)?.nome || '?';

  const guardar = () => {
    if (!obraId) return;
    const r = { id: uid(), obraId, data: dataRef, resumo, proximosPassos, observacoes, meteoTemperatura, meteoCondicoes, geradoEm: new Date().toISOString(), horasDia, trabalhadoresDia };
    save('relatoriosDiarios', [r, ...data.relatoriosDiarios]);
    alert('Relatório diário guardado.');
  };

  // Gerar texto para email/whatsapp
  const gerarTexto = () => {
    if (!obra) return '';
    const fmtPt = (d) => new Date(d).toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    let txt = `RELATÓRIO DIÁRIO DE OBRA\n${obra.nome}\n${fmtPt(dataRef)}\n\n`;
    txt += `Cliente: ${obra.cliente}\n`;
    if (meteoCondicoes || meteoTemperatura) txt += `Condições: ${meteoCondicoes}${meteoTemperatura ? ' · ' + meteoTemperatura + '°C' : ''}\n`;
    txt += `\n— RECURSOS DO DIA —\n`;
    txt += `Trabalhadores: ${trabalhadoresDia}\nHoras totais: ${horasDia}h\nProgresso global: ${progresso}%\n`;
    if (resumo) txt += `\n— RESUMO DOS TRABALHOS —\n${resumo}\n`;
    if (partesDia.length > 0) {
      txt += `\n— TRABALHO REALIZADO —\n`;
      partesDia.forEach(p => { txt += `• ${wNome(p.trabalhadorId)}: ${p.trabalhoRealizado || '—'}\n`; });
    }
    if (proximosPassos) txt += `\n— PRÓXIMOS PASSOS —\n${proximosPassos}\n`;
    if (observacoes) txt += `\n— OBSERVAÇÕES —\n${observacoes}\n`;
    txt += `\n---\nSlide & Stone SA · Construção Civil`;
    return txt;
  };

  const copiarTexto = () => {
    navigator.clipboard.writeText(gerarTexto());
    alert('Texto copiado para a área de transferência.');
  };
  const enviarWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(gerarTexto())}`;
    window.open(url, '_blank');
  };
  const enviarEmail = () => {
    const subject = `Relatório diário - ${obra?.nome} - ${fmtDate(dataRef)}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(gerarTexto())}`;
    window.location.href = url;
  };

  return (
    <div className="space-y-5">
      <SectionHeader title="RELATÓRIO DIÁRIO PARA CLIENTE" />

      <Card className="p-5 lg:p-6">
        <div className="grid md:grid-cols-3 gap-3 mb-5">
          <Field label="OBRA">
            <Select value={obraId} onChange={e => setObraId(e.target.value)}>
              <option value="">— Selecionar —</option>
              {data.obras.map(o => <option key={o.id} value={o.id}>{o.nome}</option>)}
            </Select>
          </Field>
          <Field label="DATA"><Input type="date" value={dataRef} onChange={e => setDataRef(e.target.value)} /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="TEMP. (°C)"><Input value={meteoTemperatura} onChange={e => setMeteoTemperatura(e.target.value)} placeholder="22" /></Field>
            <Field label="CONDIÇÕES">
              <Select value={meteoCondicoes} onChange={e => setMeteoCondicoes(e.target.value)}>
                <option value="">—</option>
                <option value="Sol">Sol</option>
                <option value="Nublado">Nublado</option>
                <option value="Chuva">Chuva</option>
                <option value="Chuva forte">Chuva forte</option>
                <option value="Vento forte">Vento forte</option>
              </Select>
            </Field>
          </div>
        </div>

        {obra && (
          <div className="bg-gradient-to-br from-stone-50 to-white border border-stone-200 rounded-2xl p-6 lg:p-8 shadow-inner" id="print-template">
            {/* Cabeçalho */}
            <div className="flex items-start justify-between mb-5 pb-5 border-b-2 border-zinc-900 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                  <Hammer className="w-6 h-6 text-zinc-900" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-display text-lg leading-none">SLIDE &amp; STONE SA</div>
                  <div className="text-[9px] tracking-[0.3em] text-stone-500 mt-1.5">CONSTRUÇÃO CIVIL · TERRAPLANAGENS · REABILITAÇÃO</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] tracking-[0.3em] text-amber-600 font-bold">RELATÓRIO DIÁRIO</div>
                <div className="font-mono text-xs text-stone-500 mt-1">{fmtDate(dataRef)}</div>
              </div>
            </div>

            {/* Identificação */}
            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <div>
                <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Obra</div>
                <div className="font-display text-lg mt-1">{obra.nome}</div>
                <div className="text-xs text-stone-600 mt-1">{obra.local || '—'}</div>
              </div>
              <div>
                <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase">Cliente</div>
                <div className="font-display text-lg mt-1">{obra.cliente}</div>
                {(meteoCondicoes || meteoTemperatura) && (
                  <div className="text-xs text-stone-600 mt-1">{meteoCondicoes}{meteoTemperatura ? ' · ' + meteoTemperatura + '°C' : ''}</div>
                )}
              </div>
            </div>

            {/* KPIs do dia */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
                <div className="text-[9px] tracking-widest text-stone-500 font-semibold">EQUIPA</div>
                <div className="font-display text-2xl font-bold mt-1">{trabalhadoresDia}</div>
              </div>
              <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
                <div className="text-[9px] tracking-widest text-stone-500 font-semibold">HORAS</div>
                <div className="font-display text-2xl font-bold mt-1">{horasDia}</div>
              </div>
              <div className="bg-white border border-stone-200 rounded-xl p-3 text-center">
                <div className="text-[9px] tracking-widest text-stone-500 font-semibold">FOTOS</div>
                <div className="font-display text-2xl font-bold mt-1">{fotosDia.length}</div>
              </div>
              <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl p-3 text-center text-zinc-900">
                <div className="text-[9px] tracking-widest font-semibold">PROGRESSO</div>
                <div className="font-display text-2xl font-bold mt-1">{progresso}%</div>
              </div>
            </div>

            {/* Plano do dia */}
            {planoDia && (planoDia.tarefas || planoDia.equipamentos) && (
              <div className="mb-5 bg-sky-50/40 border border-sky-200 rounded-xl p-4">
                <div className="text-[10px] tracking-[0.18em] text-sky-800 font-bold uppercase mb-2">Plano previsto para o dia</div>
                {planoDia.tarefas && <div className="text-sm text-stone-700 whitespace-pre-wrap">{planoDia.tarefas}</div>}
                {planoDia.equipamentos && <div className="text-xs text-stone-600 mt-2 flex items-center gap-1.5"><Wrench className="w-3.5 h-3.5" />{planoDia.equipamentos}</div>}
              </div>
            )}

            {/* Resumo editável */}
            <Field label="RESUMO DOS TRABALHOS REALIZADOS" className="mb-4">
              <Textarea rows={4} value={resumo} onChange={e => setResumo(e.target.value)} placeholder="Descreva o que foi executado hoje na obra..." />
            </Field>

            {/* Trabalho por trabalhador */}
            {partesDia.length > 0 && (
              <div className="mb-5">
                <div className="text-[10px] tracking-[0.18em] text-stone-600 font-bold uppercase mb-2">Trabalho por elemento da equipa</div>
                <div className="space-y-1.5">
                  {partesDia.map(p => (
                    <div key={p.id} className="flex items-start gap-3 bg-white border border-stone-200 rounded-lg p-3 text-sm">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 text-zinc-900 flex items-center justify-center font-display text-sm flex-shrink-0">{wNome(p.trabalhadorId).charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs">{wNome(p.trabalhadorId)} <span className="text-stone-400 font-normal font-mono">· {p.horas}h</span></div>
                        <div className="text-stone-600 text-xs mt-0.5">{p.trabalhoRealizado || '—'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fotos do dia */}
            {fotosDia.length > 0 && (
              <div className="mb-5">
                <div className="text-[10px] tracking-[0.18em] text-stone-600 font-bold uppercase mb-2">Fotografias do dia</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {fotosDia.map(f => (
                    <div key={f.id} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-stone-200">
                      <img src={f.imagemBase64} alt="" className="w-full h-full object-cover" />
                      {f.titulo && <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] px-2 py-1 truncate">{f.titulo}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Field label="PRÓXIMOS PASSOS" className="mb-4">
              <Textarea rows={3} value={proximosPassos} onChange={e => setProximosPassos(e.target.value)} placeholder="O que está previsto para os próximos dias..." />
            </Field>

            <Field label="OBSERVAÇÕES / OCORRÊNCIAS" className="mb-2">
              <Textarea rows={2} value={observacoes} onChange={e => setObservacoes(e.target.value)} placeholder="Atrasos, alterações, pontos de atenção..." />
            </Field>

            <div className="mt-5 pt-4 border-t border-stone-200 text-[10px] text-stone-400 font-mono tracking-wider flex justify-between">
              <span>SLIDE &amp; STONE SA · CONSTRUÇÃO CIVIL</span>
              <span>RELATÓRIO DIÁRIO · {fmtDate(dataRef)}</span>
            </div>
          </div>
        )}

        {obra && (
          <div className="flex justify-end gap-2 mt-5 flex-wrap no-print">
            <Btn variant="outline" onClick={() => window.print()}><Download className="w-4 h-4" /> Imprimir / PDF</Btn>
            <Btn variant="outline" onClick={copiarTexto}><Copy className="w-4 h-4" /> Copiar texto</Btn>
            <Btn variant="outline" onClick={enviarWhatsApp} className="bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100">
              <Send className="w-4 h-4" /> WhatsApp
            </Btn>
            <Btn variant="outline" onClick={enviarEmail}><Mail className="w-4 h-4" /> Email</Btn>
            <Btn variant="accent" onClick={guardar}><Check className="w-4 h-4" /> Guardar</Btn>
          </div>
        )}
      </Card>

      {data.relatoriosDiarios.length > 0 && (
        <div>
          <SectionHeader title="HISTÓRICO" />
          <div className="space-y-2">
            {data.relatoriosDiarios.slice(0, 20).map(r => {
              const o = data.obras.find(x => x.id === r.obraId);
              return (
                <Card key={r.id} className="p-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-display text-sm">{o?.nome || 'Obra removida'}</div>
                    <div className="text-xs text-stone-500 mt-0.5">{fmtDate(r.data)} · {r.trabalhadoresDia} pessoas · {r.horasDia}h</div>
                    {r.resumo && <div className="text-xs text-stone-600 mt-1 line-clamp-1">{r.resumo}</div>}
                  </div>
                  <button onClick={() => save('relatoriosDiarios', data.relatoriosDiarios.filter(x => x.id !== r.id))} className="p-2 hover:text-rose-600 flex-shrink-0">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   COMPARADOR DE PREÇOS POR MATERIAL/FORNECEDOR
   ============================================================ */

function Comparador({ data }) {
  const [search, setSearch] = useState('');

  // Agregar preços por nome de material
  const materiaisPorNome = {};
  data.materiais.forEach(m => {
    const key = (m.nome || '').toLowerCase().trim();
    if (!key) return;
    if (!materiaisPorNome[key]) materiaisPorNome[key] = { nome: m.nome, registos: [] };
    materiaisPorNome[key].registos.push(m);
  });

  // Cruzar despesas categoria=Materiais com fornecedores
  const despesasMat = data.despesas.filter(d => d.categoria === 'Materiais' && d.fornecedor && d.descricao);

  let lista = Object.values(materiaisPorNome);
  if (search) {
    const q = search.toLowerCase();
    lista = lista.filter(x => x.nome.toLowerCase().includes(q));
  }

  // Calcular estatísticas
  lista = lista.map(m => {
    const precos = m.registos.filter(r => r.precoUnit > 0).map(r => r.precoUnit);
    const min = precos.length ? Math.min(...precos) : 0;
    const max = precos.length ? Math.max(...precos) : 0;
    const avg = precos.length ? precos.reduce((s, p) => s + p, 0) / precos.length : 0;
    const fornecedores = [...new Set(m.registos.map(r => r.fornecedor).filter(Boolean))];
    const variation = min > 0 ? ((max - min) / min) * 100 : 0;
    return { ...m, min, max, avg, fornecedores, variation, count: m.registos.length };
  }).sort((a, b) => b.variation - a.variation);

  // Top fornecedores
  const fornecedoresStats = {};
  data.fornecedores.forEach(f => {
    fornecedoresStats[f.nome] = { fornecedor: f, materiais: 0, gasto: 0 };
  });
  data.materiais.forEach(m => {
    if (m.fornecedor && fornecedoresStats[m.fornecedor]) {
      fornecedoresStats[m.fornecedor].materiais++;
    }
  });
  data.despesas.forEach(d => {
    if (d.fornecedor && fornecedoresStats[d.fornecedor]) {
      fornecedoresStats[d.fornecedor].gasto += d.valor || 0;
    }
  });
  const topFornecedores = Object.values(fornecedoresStats).sort((a, b) => b.gasto - a.gasto);

  return (
    <div className="space-y-5">
      <SectionHeader title="COMPARADOR DE PREÇOS" />

      <Card className="p-5 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center flex-shrink-0">
            <Scale className="w-5 h-5 text-amber-800" />
          </div>
          <div>
            <div className="font-display text-base text-amber-900">Identifique poupanças</div>
            <div className="text-sm text-amber-800 mt-1">Esta secção compara preços históricos por material e fornecedor. Use para negociar melhor com base em dados reais.</div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <div>
          <SectionHeader title="VARIAÇÃO DE PREÇOS POR MATERIAL" />
          <div className="mb-3">
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Pesquisar material..." />
          </div>
          {lista.length === 0 ? (
            <Empty icon={Scale} title="Sem dados de preços" hint="Registe materiais com preços e fornecedores para começar a comparar" />
          ) : (
            <div className="space-y-2">
              {lista.map(m => (
                <Card key={m.nome} className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
                    <div className="font-display text-sm">{m.nome}</div>
                    {m.variation > 5 && (
                      <Badge variant={m.variation > 20 ? 'red' : 'amber'}>
                        VARIAÇÃO {m.variation.toFixed(0)}%
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
                      <div className="text-emerald-800 font-semibold">MÍN</div>
                      <div className="font-mono font-bold text-sm mt-0.5 text-emerald-900">{eur(m.min)}</div>
                    </div>
                    <div className="bg-stone-50 border border-stone-200 rounded-lg p-2">
                      <div className="text-stone-600 font-semibold">MÉDIO</div>
                      <div className="font-mono font-bold text-sm mt-0.5">{eur(m.avg)}</div>
                    </div>
                    <div className="bg-rose-50 border border-rose-200 rounded-lg p-2">
                      <div className="text-rose-800 font-semibold">MÁX</div>
                      <div className="font-mono font-bold text-sm mt-0.5 text-rose-900">{eur(m.max)}</div>
                    </div>
                  </div>
                  {m.fornecedores.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
                      <span className="font-semibold">Fornecedores:</span> {m.fornecedores.join(', ')} <span className="text-stone-400">({m.count} {m.count === 1 ? 'registo' : 'registos'})</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        <div>
          <SectionHeader title="GASTO POR FORNECEDOR" />
          {topFornecedores.length === 0 ? (
            <Empty icon={Briefcase} title="Sem dados" hint="Registe despesas com fornecedores associados" />
          ) : (
            <div className="space-y-2">
              {topFornecedores.map(f => (
                <Card key={f.fornecedor.id} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-display text-sm">{f.fornecedor.nome}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{f.fornecedor.tipo || '—'}</div>
                      <div className="text-xs text-stone-500 mt-1">{f.materiais} materiais associados</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-lg font-bold">{eur(f.gasto)}</div>
                      <div className="text-[10px] text-stone-500">total gasto</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   MAPA DE OBRAS
   ============================================================ */

function MapaObras({ data, setTab }) {
  // Agrupar por região (heurística simples a partir do campo "local")
  const regioesPT = ['Coimbra', 'Lisboa', 'Porto', 'Aveiro', 'Leiria', 'Figueira da Foz', 'Algarve', 'Braga', 'Évora', 'Setúbal'];
  const regioesMZ = ['Maputo', 'Nacala', 'Pemba', 'Beira', 'Nampula', 'Tete', 'Quelimane'];

  const classificar = (local) => {
    if (!local) return { pais: 'Outros', regiao: 'Não definido' };
    const l = local.toLowerCase();
    for (const r of regioesMZ) if (l.includes(r.toLowerCase())) return { pais: 'Moçambique', regiao: r };
    for (const r of regioesPT) if (l.includes(r.toLowerCase())) return { pais: 'Portugal', regiao: r };
    return { pais: 'Outros', regiao: local };
  };

  const obrasMapeadas = data.obras.map(o => ({ ...o, ...classificar(o.local) }));

  const porPais = { Portugal: [], 'Moçambique': [], Outros: [] };
  obrasMapeadas.forEach(o => { (porPais[o.pais] || porPais['Outros']).push(o); });

  const totalPorPais = (lista) => lista.reduce((s, o) => s + (o.valorContrato || 0), 0);
  const ativosPorPais = (lista) => lista.filter(o => o.estado === 'em_curso').length;

  const corEstado = (e) => ({ em_curso: 'emerald', concluida: 'zinc', planeada: 'amber', suspensa: 'rose' })[e] || 'zinc';

  return (
    <div className="space-y-5">
      <SectionHeader title="MAPA DE OBRAS" />

      <div className="grid md:grid-cols-3 gap-4">
        {[{ pais: 'Portugal', emoji: '🇵🇹', cor: 'from-emerald-500 to-emerald-600' },
          { pais: 'Moçambique', emoji: '🇲🇿', cor: 'from-amber-500 to-orange-600' },
          { pais: 'Outros', emoji: '🌍', cor: 'from-stone-500 to-stone-600' }
        ].map(({ pais, emoji, cor }) => (
          <Card key={pais} className={`p-5 text-white border-0 bg-gradient-to-br ${cor} relative overflow-hidden anim-in card-hover`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="relative">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{emoji}</div>
                <Badge variant="black">{porPais[pais].length} OBRAS</Badge>
              </div>
              <div className="font-display text-xl mb-2">{pais}</div>
              <div className="text-xs opacity-90">Em curso: <strong>{ativosPorPais(porPais[pais])}</strong></div>
              <div className="font-display text-2xl mt-3 tracking-tight">{eur(totalPorPais(porPais[pais]))}</div>
              <div className="text-xs opacity-80 mt-1">valor contratual</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Mapa estilizado SVG */}
      <Card className="p-6">
        <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mb-4">Distribuição geográfica</div>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Portugal */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🇵🇹</span>
              <div className="font-display text-base">Portugal</div>
              <Badge variant="gray">{porPais['Portugal'].length}</Badge>
            </div>
            <svg viewBox="0 0 200 350" className="w-full max-w-[200px] mx-auto">
              <defs>
                <linearGradient id="ptg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
              {/* Forma estilizada de Portugal continental */}
              <path d="M 80 30 L 120 25 L 145 50 L 155 100 L 165 150 L 160 200 L 150 250 L 135 290 L 120 320 L 90 325 L 70 310 L 60 280 L 55 230 L 50 180 L 55 130 L 65 80 L 80 30 Z"
                fill="url(#ptg)" stroke="#10b981" strokeWidth="2" strokeLinejoin="round"/>
              {/* Pins por região com obras */}
              {[
                { regiao: 'Porto', x: 80, y: 75 },
                { regiao: 'Aveiro', x: 75, y: 110 },
                { regiao: 'Coimbra', x: 85, y: 145 },
                { regiao: 'Figueira da Foz', x: 65, y: 155 },
                { regiao: 'Leiria', x: 80, y: 180 },
                { regiao: 'Lisboa', x: 75, y: 230 },
                { regiao: 'Évora', x: 115, y: 250 },
                { regiao: 'Algarve', x: 110, y: 305 },
                { regiao: 'Setúbal', x: 85, y: 250 },
                { regiao: 'Braga', x: 90, y: 50 },
              ].map(({ regiao, x, y }) => {
                const obrasReg = porPais['Portugal'].filter(o => o.regiao === regiao);
                if (obrasReg.length === 0) return null;
                const ativas = obrasReg.filter(o => o.estado === 'em_curso').length;
                return (
                  <g key={regiao}>
                    <circle cx={x} cy={y} r={6 + obrasReg.length * 1.5} fill={ativas > 0 ? '#f59e0b' : '#71717a'} opacity="0.85"/>
                    <text x={x + 12} y={y + 4} fontSize="9" fontFamily="monospace" fill="#27272a" fontWeight="600">{regiao}</text>
                    <text x={x + 12} y={y + 14} fontSize="8" fontFamily="monospace" fill="#71717a">{obrasReg.length}</text>
                  </g>
                );
              })}
            </svg>
            <div className="mt-2 space-y-1 text-xs">
              {porPais['Portugal'].length === 0 ? (
                <div className="text-stone-400 italic text-center">Sem obras em Portugal</div>
              ) : (
                Object.entries(porPais['Portugal'].reduce((acc, o) => { acc[o.regiao] = (acc[o.regiao] || 0) + 1; return acc; }, {})).map(([r, n]) => (
                  <div key={r} className="flex justify-between"><span className="text-stone-600">{r}</span><span className="font-mono font-semibold">{n}</span></div>
                ))
              )}
            </div>
          </div>

          {/* Moçambique */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🇲🇿</span>
              <div className="font-display text-base">Moçambique</div>
              <Badge variant="gray">{porPais['Moçambique'].length}</Badge>
            </div>
            <svg viewBox="0 0 200 350" className="w-full max-w-[200px] mx-auto">
              <defs>
                <linearGradient id="mzg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.1"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3"/>
                </linearGradient>
              </defs>
              {/* Forma estilizada de Moçambique (alongado) */}
              <path d="M 100 20 L 140 30 L 155 60 L 150 100 L 140 140 L 130 180 L 115 220 L 100 250 L 85 280 L 75 310 L 70 335 L 55 330 L 45 300 L 50 260 L 65 220 L 80 180 L 90 140 L 95 100 L 90 60 L 100 20 Z"
                fill="url(#mzg)" stroke="#f59e0b" strokeWidth="2" strokeLinejoin="round"/>
              {[
                { regiao: 'Pemba', x: 130, y: 50 },
                { regiao: 'Nacala', x: 125, y: 90 },
                { regiao: 'Nampula', x: 110, y: 120 },
                { regiao: 'Quelimane', x: 95, y: 175 },
                { regiao: 'Beira', x: 85, y: 215 },
                { regiao: 'Tete', x: 65, y: 130 },
                { regiao: 'Maputo', x: 65, y: 320 },
              ].map(({ regiao, x, y }) => {
                const obrasReg = porPais['Moçambique'].filter(o => o.regiao === regiao);
                if (obrasReg.length === 0) return null;
                const ativas = obrasReg.filter(o => o.estado === 'em_curso').length;
                return (
                  <g key={regiao}>
                    <circle cx={x} cy={y} r={6 + obrasReg.length * 1.5} fill={ativas > 0 ? '#f59e0b' : '#71717a'} opacity="0.85"/>
                    <text x={x + 12} y={y + 4} fontSize="9" fontFamily="monospace" fill="#27272a" fontWeight="600">{regiao}</text>
                    <text x={x + 12} y={y + 14} fontSize="8" fontFamily="monospace" fill="#71717a">{obrasReg.length}</text>
                  </g>
                );
              })}
            </svg>
            <div className="mt-2 space-y-1 text-xs">
              {porPais['Moçambique'].length === 0 ? (
                <div className="text-stone-400 italic text-center">Sem obras em Moçambique</div>
              ) : (
                Object.entries(porPais['Moçambique'].reduce((acc, o) => { acc[o.regiao] = (acc[o.regiao] || 0) + 1; return acc; }, {})).map(([r, n]) => (
                  <div key={r} className="flex justify-between"><span className="text-stone-600">{r}</span><span className="font-mono font-semibold">{n}</span></div>
                ))
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Lista detalhada por obra */}
      <Card className="p-5">
        <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mb-3">Todas as obras</div>
        {obrasMapeadas.length === 0 ? (
          <div className="text-sm text-stone-400 text-center py-6">Sem obras registadas</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-2">
            {obrasMapeadas.map(o => (
              <button key={o.id} onClick={() => setTab('obras')} className="text-left p-3 rounded-xl hover:bg-stone-50 border border-stone-200 transition-colors flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-${corEstado(o.estado)}-500`} />
                <div className="min-w-0 flex-1">
                  <div className="font-display text-sm truncate">{o.nome}</div>
                  <div className="text-xs text-stone-500 truncate flex items-center gap-1"><MapPin className="w-3 h-3" />{o.regiao} · {o.pais}</div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-mono font-semibold">{eur(o.valorContrato)}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

/* ============================================================
   BACKUP / RESTORE
   ============================================================ */

function Backup({ data, save }) {
  const [importing, setImporting] = useState(false);

  const exportAll = () => {
    const payload = { _meta: { app: 'slide-and-stone', version: '2.0', exportedAt: new Date().toISOString() }, data };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `slide-stone-backup_${today()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!confirm('Importar este backup vai SUBSTITUIR todos os dados atuais. Continuar?')) {
      e.target.value = '';
      return;
    }
    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const obj = JSON.parse(ev.target.result);
        if (!obj.data || !obj._meta || obj._meta.app !== 'slide-and-stone') {
          alert('Ficheiro de backup inválido.');
          setImporting(false);
          return;
        }
        for (const key of Object.keys(obj.data)) {
          await save(key, obj.data[key]);
        }
        alert('Backup restaurado com sucesso! A página vai recarregar.');
        window.location.reload();
      } catch (err) {
        alert('Erro ao ler o ficheiro: ' + err.message);
      }
      setImporting(false);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const apagarTudo = async () => {
    const conf = prompt('Para apagar TODOS os dados, escreva: APAGAR');
    if (conf !== 'APAGAR') return;
    for (const key of Object.keys(data)) {
      await save(key, []);
    }
    alert('Todos os dados foram apagados. A página vai recarregar.');
    window.location.reload();
  };

  // Estatísticas
  const stats = Object.entries(data).map(([k, v]) => ({ key: k, count: Array.isArray(v) ? v.length : 0 }));
  const totalRegistos = stats.reduce((s, x) => s + x.count, 0);

  return (
    <div className="space-y-5">
      <SectionHeader title="BACKUP E DADOS" />

      <Card className="p-6 bg-gradient-to-br from-zinc-900 to-zinc-950 text-white border-0 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Database className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <div className="font-display text-xl">Os seus dados</div>
            <div className="text-sm text-stone-300 mt-1">Os dados estão guardados no seu navegador. Faça backups regulares para evitar perdas em caso de troca de equipamento ou limpeza do browser.</div>
            <div className="font-mono text-2xl font-bold mt-3 text-amber-400">{totalRegistos} registos</div>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center"><Download className="w-5 h-5 text-emerald-700" /></div>
            <div>
              <div className="font-display text-base">Exportar backup</div>
              <div className="text-xs text-stone-500 mt-1">Cria um ficheiro JSON com todos os seus dados. Guarde em local seguro (Drive, iCloud, disco externo).</div>
            </div>
          </div>
          <Btn variant="primary" onClick={exportAll} className="w-full justify-center"><Save className="w-4 h-4" /> Descarregar backup</Btn>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center"><Upload className="w-5 h-5 text-sky-700" /></div>
            <div>
              <div className="font-display text-base">Restaurar backup</div>
              <div className="text-xs text-stone-500 mt-1">Carregue um ficheiro JSON exportado anteriormente. <strong className="text-amber-700">Substitui todos os dados atuais.</strong></div>
            </div>
          </div>
          <label className="block">
            <Btn variant="primary" className="w-full justify-center" disabled={importing}>
              <Upload className="w-4 h-4" /> {importing ? 'A importar...' : 'Selecionar ficheiro'}
            </Btn>
            <input type="file" accept="application/json,.json" onChange={handleImport} className="hidden" />
          </label>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-[10px] tracking-[0.18em] text-stone-500 font-semibold uppercase mb-3">Conteúdo da base de dados</div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
          {stats.filter(s => s.count > 0).sort((a, b) => b.count - a.count).map(s => (
            <div key={s.key} className="flex justify-between items-center bg-stone-50 rounded-lg px-3 py-2 text-sm">
              <span className="text-stone-700 capitalize">{s.key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <span className="font-mono font-bold">{s.count}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-5 bg-rose-50/40 border-rose-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-display text-sm text-rose-900">Zona de perigo</div>
            <div className="text-xs text-rose-800 mt-1">Apagar todos os dados é uma ação irreversível. Recomendamos exportar um backup antes.</div>
            <Btn variant="danger" size="sm" onClick={apagarTudo} className="mt-3"><Trash2 className="w-3.5 h-3.5" /> Apagar todos os dados</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   GERAÇÃO DE EXCEL (XLSX) E POWERPOINT (PPTX)
   Bibliotecas carregadas dinamicamente via CDN.
   ============================================================ */

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

async function ensureXLSX() {
  if (typeof window.XLSX === 'undefined') {
    await loadScript('https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js');
  }
  return window.XLSX;
}

async function ensurePptxGen() {
  if (typeof window.PptxGenJS === 'undefined') {
    await loadScript('https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js');
  }
  return window.PptxGenJS;
}

/* ============================================================
   ORÇAMENTO COMO EXCEL COM FÓRMULAS
   ============================================================ */

async function gerarOrcamentoExcel(orc, obra) {
  const XLSX = await ensureXLSX();
  const wb = XLSX.utils.book_new();

  // === FOLHA 1: ORÇAMENTO COM FÓRMULAS ===
  const ws_data = [];

  // Cabeçalho da empresa
  ws_data.push(['SLIDE & STONE SA', '', '', '', '', '']);
  ws_data.push(['Construção Civil · Terraplanagens · Reabilitação', '', '', '', '', '']);
  ws_data.push(['', '', '', '', '', '']);

  // Identificação do orçamento
  ws_data.push(['ORÇAMENTO', orc.numero || '', '', 'Data:', orc.data || '', '']);
  ws_data.push(['Cliente:', orc.cliente || '', '', 'Validade:', orc.validade || '', '']);
  ws_data.push(['Obra:', obra?.nome || '', '', 'Local:', obra?.local || '', '']);
  ws_data.push(['', '', '', '', '', '']);

  // Cabeçalho da tabela
  ws_data.push(['Nº', 'Descrição', 'Quantidade', 'Unidade', 'Preço Unit. (€)', 'Total (€)']);

  const startRow = ws_data.length + 1; // 1-indexed
  const items = orc.items || [];
  const numLinhas = Math.max(items.length, 10);

  for (let i = 0; i < numLinhas; i++) {
    const it = items[i];
    const linha = startRow + i;
    ws_data.push([
      i + 1,
      it?.descricao || '',
      it?.quantidade || '',
      it?.unidade || '',
      it?.precoUnit || '',
      // FÓRMULA: Quantidade * Preço Unit
      { f: `IF(AND(C${linha}<>"",E${linha}<>""),C${linha}*E${linha},"")` }
    ]);
  }

  const endRow = startRow + numLinhas - 1;
  const subtotalRow = endRow + 2;

  // Linhas de totais com fórmulas
  ws_data.push(['', '', '', '', '', '']);
  ws_data.push(['', '', '', '', 'SUBTOTAL', { f: `SUM(F${startRow}:F${endRow})` }]);
  ws_data.push(['', '', '', '', `IVA (${orc.iva || 23}%)`, { f: `F${subtotalRow}*${(orc.iva || 23) / 100}` }]);
  ws_data.push(['', '', '', '', 'TOTAL', { f: `F${subtotalRow}+F${subtotalRow + 1}` }]);
  ws_data.push(['', '', '', '', '', '']);

  // Notas
  if (orc.notas) {
    ws_data.push(['NOTAS / CONDIÇÕES:', '', '', '', '', '']);
    ws_data.push([orc.notas, '', '', '', '', '']);
  }

  const ws = XLSX.utils.aoa_to_sheet(ws_data);

  // Larguras das colunas
  ws['!cols'] = [
    { wch: 5 },   // Nº
    { wch: 50 },  // Descrição
    { wch: 12 },  // Qtd
    { wch: 10 },  // Un
    { wch: 14 },  // Preço
    { wch: 14 },  // Total
  ];

  // Merge das células do cabeçalho
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 5 } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: 5 } },
  ];

  // Formatação numérica para € na coluna F (Total) e E (Preço unit.)
  for (let i = startRow - 1; i <= endRow - 1; i++) {
    ['E', 'F'].forEach(col => {
      const ref = col + (i + 1);
      if (ws[ref]) {
        ws[ref].z = '#,##0.00 €';
      }
    });
  }
  // Linha subtotal/iva/total
  ['F' + subtotalRow, 'F' + (subtotalRow + 1), 'F' + (subtotalRow + 2)].forEach(ref => {
    if (ws[ref]) ws[ref].z = '#,##0.00 €';
  });

  XLSX.utils.book_append_sheet(wb, ws, 'Orçamento');

  // === FOLHA 2: AJUDA ===
  const helpData = [
    ['INSTRUÇÕES DE USO'],
    [''],
    ['Este ficheiro contém fórmulas Excel automáticas:'],
    [''],
    ['• Coluna F (Total): calcula automaticamente Quantidade × Preço Unit.'],
    [`• SUBTOTAL: soma todos os totais das linhas`],
    [`• IVA: calculado a ${orc.iva || 23}% sobre o subtotal`],
    ['• TOTAL: SUBTOTAL + IVA'],
    [''],
    ['Para acrescentar mais linhas, copie a fórmula da última linha da coluna F.'],
    [''],
    ['---'],
    ['Slide & Stone SA · Gerado automaticamente'],
  ];
  const wsHelp = XLSX.utils.aoa_to_sheet(helpData);
  wsHelp['!cols'] = [{ wch: 70 }];
  XLSX.utils.book_append_sheet(wb, wsHelp, 'Ajuda');

  // Download
  const filename = `${orc.numero || 'orcamento'}_${(orc.cliente || '').replace(/[^a-z0-9]/gi, '_')}.xlsx`;
  XLSX.writeFile(wb, filename);
}

/* ============================================================
   CRONOGRAMA POWERPOINT - GANTT COM SEMÁFORO
   Verde: no prazo
   Laranja: prazo comprometido (atraso possível ou tarefa próxima do fim sem progresso suficiente)
   Vermelho: prazo extrapolado
   ============================================================ */

function calcularSemaforoTarefa(tarefa) {
  const t = today();
  const fim = tarefa.dataFim;
  const inicio = tarefa.dataInicio;

  if (tarefa.estado === 'concluida') return { cor: 'verde', label: 'CONCLUÍDA' };
  if (!fim) return { cor: 'verde', label: 'NO PRAZO' };

  if (fim < t) return { cor: 'vermelho', label: 'EXTRAPOLADO' };

  // Comprometido: faltam menos de 7 dias para o fim e tarefa não está em curso
  const diasRestantes = (new Date(fim) - new Date(t)) / 86400000;
  if (diasRestantes < 7 && tarefa.estado !== 'em_curso') {
    return { cor: 'laranja', label: 'PRAZO COMPROMETIDO' };
  }

  // Comprometido: passou já mais de 50% do prazo e está pendente
  if (inicio && tarefa.estado === 'pendente') {
    const total = (new Date(fim) - new Date(inicio)) / 86400000;
    const decorrido = (new Date(t) - new Date(inicio)) / 86400000;
    if (total > 0 && (decorrido / total) > 0.5) {
      return { cor: 'laranja', label: 'PRAZO COMPROMETIDO' };
    }
  }

  return { cor: 'verde', label: 'NO PRAZO' };
}

function calcularSemaforoObra(data, obraId) {
  const tarefas = data.tarefas.filter(t => t.obraId === obraId);
  if (tarefas.length === 0) return { cor: 'verde', label: 'SEM TAREFAS', pct: 0 };

  const semaforos = tarefas.map(calcularSemaforoTarefa);
  const concluidas = tarefas.filter(t => t.estado === 'concluida').length;
  const pct = Math.round((concluidas / tarefas.length) * 100);

  if (semaforos.some(s => s.cor === 'vermelho')) return { cor: 'vermelho', label: 'PRAZO EXTRAPOLADO', pct };
  if (semaforos.some(s => s.cor === 'laranja')) return { cor: 'laranja', label: 'PRAZO COMPROMETIDO', pct };
  return { cor: 'verde', label: 'NO PRAZO', pct };
}

async function gerarCronogramaPPTX(data) {
  const PptxGenJS = await ensurePptxGen();
  const pptx = new PptxGenJS();

  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = 'Cronograma de Obras - Slide & Stone SA';
  pptx.company = 'Slide & Stone SA';

  const COR = {
    verde: '10b981',
    laranja: 'f59e0b',
    vermelho: 'dc2626',
    zinc: '27272a',
    amber: 'f59e0b',
    stone: 'f5f5f4',
    border: 'd6d3d1',
  };

  // === SLIDE 1: CAPA ===
  const slide1 = pptx.addSlide();
  slide1.background = { color: '18181b' };

  // Faixa amber decorativa
  slide1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.4, fill: { color: COR.amber } });

  // Logo box
  slide1.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.2, w: 1, h: 1, fill: { color: COR.amber }, rectRadius: 0.1 });
  slide1.addText('🔨', { x: 0.5, y: 1.2, w: 1, h: 1, fontSize: 36, align: 'center', valign: 'middle' });

  slide1.addText('SLIDE & STONE SA', { x: 1.7, y: 1.3, w: 10, h: 0.5, fontSize: 28, bold: true, color: 'FFFFFF', fontFace: 'Calibri' });
  slide1.addText('Construção Civil · Terraplanagens · Reabilitação', { x: 1.7, y: 1.85, w: 10, h: 0.3, fontSize: 11, color: COR.amber, fontFace: 'Calibri' });

  slide1.addText('CRONOGRAMA DE OBRAS', { x: 0.5, y: 3, w: 12, h: 0.5, fontSize: 14, color: COR.amber, bold: true, fontFace: 'Calibri', charSpacing: 8 });
  slide1.addText('Mapa Acumulado de Execução', { x: 0.5, y: 3.5, w: 12, h: 1, fontSize: 44, bold: true, color: 'FFFFFF', fontFace: 'Calibri' });

  const dataPt = new Date().toLocaleDateString('pt-PT', { day: 'numeric', month: 'long', year: 'numeric' });
  slide1.addText(`Atualizado a ${dataPt}`, { x: 0.5, y: 4.6, w: 12, h: 0.4, fontSize: 14, color: 'a1a1aa', fontFace: 'Calibri' });

  // Legenda do semáforo
  slide1.addText('LEGENDA', { x: 0.5, y: 5.5, w: 12, h: 0.3, fontSize: 10, color: 'a1a1aa', bold: true, charSpacing: 6 });
  const legenda = [
    { x: 0.5, cor: COR.verde, label: 'NO PRAZO', desc: 'Tarefa dentro dos prazos previstos' },
    { x: 4.7, cor: COR.laranja, label: 'PRAZO COMPROMETIDO', desc: 'Atenção - risco de atraso' },
    { x: 8.9, cor: COR.vermelho, label: 'PRAZO EXTRAPOLADO', desc: 'Obra excedeu o prazo previsto' },
  ];
  legenda.forEach(l => {
    slide1.addShape(pptx.ShapeType.ellipse, { x: l.x, y: 5.95, w: 0.4, h: 0.4, fill: { color: l.cor } });
    slide1.addText(l.label, { x: l.x + 0.5, y: 5.9, w: 4, h: 0.3, fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Calibri' });
    slide1.addText(l.desc, { x: l.x + 0.5, y: 6.2, w: 4, h: 0.3, fontSize: 9, color: 'a1a1aa', fontFace: 'Calibri' });
  });

  // === SLIDE 2: RESUMO POR OBRA ===
  const slide2 = pptx.addSlide();
  slide2.background = { color: 'FFFFFF' };
  slide2.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.6, fill: { color: '18181b' } });
  slide2.addText('SLIDE & STONE SA', { x: 0.5, y: 0.1, w: 6, h: 0.4, fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Calibri' });
  slide2.addText('Cronograma · Resumo por Obra', { x: 7, y: 0.1, w: 6, h: 0.4, fontSize: 12, color: COR.amber, fontFace: 'Calibri', align: 'right' });

  slide2.addText('MAPA ACUMULADO DE EXECUÇÃO', { x: 0.5, y: 0.85, w: 12, h: 0.4, fontSize: 24, bold: true, color: '18181b', fontFace: 'Calibri' });

  // Tabela de obras
  const obrasData = data.obras.map(o => {
    const sem = calcularSemaforoObra(data, o.id);
    return { obra: o, sem };
  });

  const headers = [
    { text: 'OBRA', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' } } },
    { text: 'CLIENTE', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' } } },
    { text: 'INÍCIO', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
    { text: 'FIM', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
    { text: '%', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
    { text: 'ESTADO', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
  ];

  const rows = [headers];
  obrasData.forEach(({ obra, sem }) => {
    const corHex = COR[sem.cor];
    rows.push([
      { text: obra.nome || '—', options: { color: '27272a', bold: true } },
      { text: obra.cliente || '—', options: { color: '57534e' } },
      { text: obra.dataInicio ? new Date(obra.dataInicio).toLocaleDateString('pt-PT') : '—', options: { color: '57534e', align: 'center' } },
      { text: obra.dataFim ? new Date(obra.dataFim).toLocaleDateString('pt-PT') : '—', options: { color: '57534e', align: 'center' } },
      { text: sem.pct + '%', options: { color: '27272a', bold: true, align: 'center' } },
      { text: sem.label, options: { color: 'FFFFFF', bold: true, align: 'center', fill: { color: corHex } } },
    ]);
  });

  if (obrasData.length === 0) {
    slide2.addText('Sem obras registadas', { x: 0.5, y: 4, w: 12, h: 0.5, fontSize: 16, color: '78716c', italic: true, align: 'center' });
  } else {
    slide2.addTable(rows, {
      x: 0.5, y: 1.5, w: 12.33,
      colW: [3.5, 2.5, 1.5, 1.5, 1, 2.33],
      fontSize: 11, fontFace: 'Calibri',
      border: { type: 'solid', color: COR.border, pt: 0.5 },
      rowH: 0.5,
    });
  }

  // === SLIDE 3+: GANTT POR OBRA ===
  if (obrasData.length > 0) {
    // Calcular range global de datas
    const allDates = [];
    obrasData.forEach(({ obra }) => {
      if (obra.dataInicio) allDates.push(new Date(obra.dataInicio));
      if (obra.dataFim) allDates.push(new Date(obra.dataFim));
      data.tarefas.filter(t => t.obraId === obra.id).forEach(t => {
        if (t.dataInicio) allDates.push(new Date(t.dataInicio));
        if (t.dataFim) allDates.push(new Date(t.dataFim));
      });
    });

    if (allDates.length > 0) {
      const minDate = new Date(Math.min(...allDates));
      const maxDate = new Date(Math.max(...allDates));
      // Estender 7 dias antes e depois para visualização
      minDate.setDate(minDate.getDate() - 3);
      maxDate.setDate(maxDate.getDate() + 7);
      const totalDays = (maxDate - minDate) / 86400000;

      // === SLIDE 3: GANTT GLOBAL ===
      const slide3 = pptx.addSlide();
      slide3.background = { color: 'FFFFFF' };
      slide3.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.6, fill: { color: '18181b' } });
      slide3.addText('SLIDE & STONE SA', { x: 0.5, y: 0.1, w: 6, h: 0.4, fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Calibri' });
      slide3.addText('Gantt Acumulado · Todas as Obras', { x: 7, y: 0.1, w: 6, h: 0.4, fontSize: 12, color: COR.amber, fontFace: 'Calibri', align: 'right' });

      slide3.addText('GANTT - VISÃO GLOBAL', { x: 0.5, y: 0.85, w: 12, h: 0.4, fontSize: 24, bold: true, color: '18181b', fontFace: 'Calibri' });

      // Eixo de tempo
      const ganttX = 4;
      const ganttW = 9;
      const ganttYStart = 1.7;

      // Linha de "hoje"
      const todayPos = ganttX + ((new Date(today()) - minDate) / 86400000) / totalDays * ganttW;
      if (todayPos >= ganttX && todayPos <= ganttX + ganttW) {
        slide3.addShape(pptx.ShapeType.line, {
          x: todayPos, y: ganttYStart - 0.2, w: 0, h: Math.min(obrasData.length * 0.5 + 0.3, 5.5),
          line: { color: COR.amber, width: 2, dashType: 'dash' }
        });
        slide3.addText('HOJE', { x: todayPos - 0.3, y: ganttYStart - 0.5, w: 0.6, h: 0.25, fontSize: 8, color: COR.amber, bold: true, align: 'center' });
      }

      // Marcas de meses no eixo
      const monthMarks = [];
      const cur = new Date(minDate);
      cur.setDate(1);
      while (cur <= maxDate) {
        const pos = ganttX + ((cur - minDate) / 86400000) / totalDays * ganttW;
        monthMarks.push({ pos, label: cur.toLocaleDateString('pt-PT', { month: 'short', year: '2-digit' }) });
        cur.setMonth(cur.getMonth() + 1);
      }
      monthMarks.forEach(m => {
        if (m.pos >= ganttX && m.pos <= ganttX + ganttW) {
          slide3.addText(m.label, { x: m.pos - 0.4, y: ganttYStart - 0.35, w: 0.8, h: 0.2, fontSize: 8, color: '78716c', align: 'center' });
          slide3.addShape(pptx.ShapeType.line, { x: m.pos, y: ganttYStart - 0.1, w: 0, h: 0.1, line: { color: COR.border, width: 0.5 } });
        }
      });

      // Barras por obra
      obrasData.slice(0, 10).forEach(({ obra, sem }, idx) => {
        const y = ganttYStart + idx * 0.5;

        // Nome da obra
        slide3.addText(obra.nome || '—', { x: 0.3, y: y - 0.05, w: 3.5, h: 0.4, fontSize: 10, color: '27272a', bold: true, fontFace: 'Calibri', valign: 'middle' });

        // Bola do semáforo
        slide3.addShape(pptx.ShapeType.ellipse, { x: 3.7, y: y + 0.05, w: 0.25, h: 0.25, fill: { color: COR[sem.cor] } });

        // Linha de fundo
        slide3.addShape(pptx.ShapeType.rect, { x: ganttX, y: y + 0.12, w: ganttW, h: 0.08, fill: { color: 'f5f5f4' } });

        if (obra.dataInicio && obra.dataFim) {
          const xs = ganttX + ((new Date(obra.dataInicio) - minDate) / 86400000) / totalDays * ganttW;
          const xe = ganttX + ((new Date(obra.dataFim) - minDate) / 86400000) / totalDays * ganttW;
          const w = Math.max(xe - xs, 0.1);

          // Barra principal com cor do semáforo
          slide3.addShape(pptx.ShapeType.rect, {
            x: xs, y: y + 0.08, w, h: 0.18,
            fill: { color: COR[sem.cor] },
            line: { color: COR[sem.cor], width: 0 }
          });

          // Barra de progresso (pintada mais escura)
          if (sem.pct > 0) {
            slide3.addShape(pptx.ShapeType.rect, {
              x: xs, y: y + 0.13, w: w * (sem.pct / 100), h: 0.08,
              fill: { color: '18181b' },
              line: { width: 0 }
            });
          }

          // Label de %
          slide3.addText(sem.pct + '%', { x: xs + w + 0.1, y: y + 0.05, w: 0.6, h: 0.3, fontSize: 9, color: '57534e', bold: true });
        }
      });

      if (obrasData.length > 10) {
        slide3.addText(`+ ${obrasData.length - 10} outras obras (ver slides seguintes)`, { x: 0.5, y: 6.5, w: 12, h: 0.3, fontSize: 10, color: '78716c', italic: true });
      }
    }

    // === UM SLIDE POR CADA OBRA COM TAREFAS ===
    obrasData.forEach(({ obra, sem }) => {
      const tarefas = data.tarefas.filter(t => t.obraId === obra.id);
      if (tarefas.length === 0) return;

      const slide = pptx.addSlide();
      slide.background = { color: 'FFFFFF' };

      // Faixa de cor topo (semáforo da obra)
      slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 13.33, h: 0.5, fill: { color: COR[sem.cor] } });
      slide.addText(sem.label, { x: 0.5, y: 0.05, w: 6, h: 0.4, fontSize: 11, bold: true, color: 'FFFFFF', fontFace: 'Calibri', charSpacing: 6 });
      slide.addText(`${sem.pct}% concluído`, { x: 7, y: 0.05, w: 6, h: 0.4, fontSize: 11, color: 'FFFFFF', fontFace: 'Calibri', align: 'right', bold: true });

      // Título da obra
      slide.addText(obra.nome || '—', { x: 0.5, y: 0.7, w: 12, h: 0.5, fontSize: 24, bold: true, color: '18181b', fontFace: 'Calibri' });
      slide.addText(`${obra.cliente || '—'} · ${obra.local || '—'}`, { x: 0.5, y: 1.2, w: 12, h: 0.3, fontSize: 11, color: '78716c', fontFace: 'Calibri' });

      // Datas
      const dataInicio = obra.dataInicio ? new Date(obra.dataInicio).toLocaleDateString('pt-PT') : '—';
      const dataFim = obra.dataFim ? new Date(obra.dataFim).toLocaleDateString('pt-PT') : '—';
      slide.addText(`${dataInicio}  →  ${dataFim}`, { x: 0.5, y: 1.5, w: 12, h: 0.3, fontSize: 10, color: '57534e', fontFace: 'Calibri' });

      // Tabela de tarefas com semáforo
      const taskHeaders = [
        { text: 'TAREFA', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' } } },
        { text: 'INÍCIO', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
        { text: 'FIM', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
        { text: 'RESPONSÁVEL', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' } } },
        { text: 'ESTADO', options: { bold: true, color: 'FFFFFF', fill: { color: '27272a' }, align: 'center' } },
      ];
      const taskRows = [taskHeaders];
      tarefas.forEach(t => {
        const semT = calcularSemaforoTarefa(t);
        taskRows.push([
          { text: t.titulo || '—', options: { color: '27272a' } },
          { text: t.dataInicio ? new Date(t.dataInicio).toLocaleDateString('pt-PT') : '—', options: { color: '57534e', align: 'center', fontSize: 9 } },
          { text: t.dataFim ? new Date(t.dataFim).toLocaleDateString('pt-PT') : '—', options: { color: '57534e', align: 'center', fontSize: 9 } },
          { text: t.responsavel || '—', options: { color: '57534e', fontSize: 9 } },
          { text: semT.label, options: { color: 'FFFFFF', bold: true, align: 'center', fill: { color: COR[semT.cor] }, fontSize: 9 } },
        ]);
      });

      slide.addTable(taskRows, {
        x: 0.5, y: 2, w: 12.33,
        colW: [4.5, 1.6, 1.6, 2.5, 2.13],
        fontSize: 10, fontFace: 'Calibri',
        border: { type: 'solid', color: COR.border, pt: 0.5 },
        rowH: 0.4,
        autoPage: true,
      });
    });
  }

  // === SLIDE FINAL ===
  const slideEnd = pptx.addSlide();
  slideEnd.background = { color: '18181b' };
  slideEnd.addShape(pptx.ShapeType.rect, { x: 0, y: 3.5, w: 13.33, h: 0.05, fill: { color: COR.amber } });
  slideEnd.addText('Slide & Stone SA', { x: 0.5, y: 3, w: 12.33, h: 0.5, fontSize: 32, bold: true, color: 'FFFFFF', align: 'center', fontFace: 'Calibri' });
  slideEnd.addText('Construção Civil · Terraplanagens · Reabilitação', { x: 0.5, y: 3.7, w: 12.33, h: 0.4, fontSize: 12, color: COR.amber, align: 'center', fontFace: 'Calibri' });
  slideEnd.addText(`Gerado a ${dataPt}`, { x: 0.5, y: 4.2, w: 12.33, h: 0.3, fontSize: 10, color: 'a1a1aa', align: 'center', fontFace: 'Calibri' });

  await pptx.writeFile({ fileName: `cronograma_obras_${today()}.pptx` });
}

/* ============================================================
   FATURA - VISTA IMPRIMÍVEL
   ============================================================ */

function FaturaPrintView({ fatura, obra, onClose }) {
  const subtotal = fatura.subtotal || 0;
  const iva = subtotal * (fatura.iva || 0) / 100;
  const total = subtotal + iva;

  return (
    <div className="fixed inset-0 bg-zinc-900/95 z-50 overflow-y-auto">
      <div className="no-print sticky top-0 z-10 bg-zinc-900 text-white px-4 py-3 flex items-center justify-between gap-3 border-b-2 border-amber-500">
        <div className="flex items-center gap-3 min-w-0">
          <Receipt className="w-5 h-5 text-amber-500 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[9px] tracking-[0.3em] text-stone-400">FATURA</div>
            <div className="font-display text-sm tracking-tight truncate">{fatura.numero} · {fatura.cliente}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Btn variant="accent" onClick={() => window.print()}><Download className="w-4 h-4" /> IMPRIMIR / PDF</Btn>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-stone-800 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
      </div>

      <div id="print-template" className="bg-white max-w-4xl mx-auto my-6 p-10 shadow-2xl text-stone-900 font-body">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b-4 border-zinc-900">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-600 rounded-xl flex items-center justify-center">
              <Hammer className="w-8 h-8 text-zinc-900" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-2xl leading-none">SLIDE &amp; STONE SA</div>
              <div className="text-[10px] tracking-[0.3em] text-stone-500 mt-2">CONSTRUÇÃO CIVIL · TERRAPLANAGENS · REABILITAÇÃO</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.3em] text-amber-600 font-bold mb-1">FATURA</div>
            <div className="font-display text-3xl tracking-tight">{fatura.numero}</div>
          </div>
        </div>

        {/* Dados emitente / cliente */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase mb-2">Emitente</div>
            <div className="font-display text-base">Slide &amp; Stone SA</div>
            <div className="text-sm text-stone-700 mt-1 space-y-0.5">
              <div>Construção Civil</div>
              <div className="font-mono text-xs">NIPC: _________________</div>
              <div className="text-xs">_________________</div>
            </div>
          </div>
          <div>
            <div className="text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase mb-2">Cliente</div>
            <div className="font-display text-base">{fatura.cliente}</div>
            {obra && <div className="text-sm text-stone-700 mt-1">Obra: {obra.nome}</div>}
            {obra?.local && <div className="text-xs text-stone-600">{obra.local}</div>}
          </div>
        </div>

        {/* Datas */}
        <div className="grid grid-cols-3 gap-4 mb-8 bg-stone-50 border border-stone-200 rounded-xl p-4">
          <div>
            <div className="text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase">Data de emissão</div>
            <div className="font-mono text-sm font-semibold mt-1">{fmtDate(fatura.data)}</div>
          </div>
          <div>
            <div className="text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase">Vencimento</div>
            <div className="font-mono text-sm font-semibold mt-1">{fmtDate(fatura.vencimento)}</div>
          </div>
          <div>
            <div className="text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase">Pagamento</div>
            <div className="font-mono text-sm font-semibold mt-1">{fatura.metodoPagamento || '—'}</div>
          </div>
        </div>

        {/* Tabela / descrição */}
        <table className="w-full mb-6 border-2 border-stone-900" style={{ borderCollapse: 'collapse' }}>
          <thead className="bg-zinc-900 text-white">
            <tr>
              <th className="text-left px-4 py-3 text-xs tracking-widest font-mono">DESCRIÇÃO</th>
              <th className="text-right px-4 py-3 text-xs tracking-widest font-mono w-32">VALOR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-4 align-top border border-stone-300">
                <div className="font-semibold">{obra ? `Trabalhos referentes à obra: ${obra.nome}` : 'Prestação de serviços'}</div>
                {fatura.notas && <div className="text-xs text-stone-600 mt-2 whitespace-pre-wrap">{fatura.notas}</div>}
              </td>
              <td className="px-4 py-4 text-right font-mono font-semibold border border-stone-300 align-top">{eur(subtotal)}</td>
            </tr>
            {/* Linhas vazias para visual */}
            {[1, 2, 3].map(i => (
              <tr key={i}><td className="px-4 py-3 border border-stone-300"></td><td className="px-4 py-3 border border-stone-300"></td></tr>
            ))}
          </tbody>
        </table>

        {/* Totais */}
        <div className="flex justify-end mb-8">
          <div className="w-72">
            <div className="flex justify-between py-2 border-b border-stone-200 text-sm">
              <span className="text-stone-600">Subtotal</span>
              <span className="font-mono">{eur(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-stone-200 text-sm">
              <span className="text-stone-600">IVA ({fatura.iva}%)</span>
              <span className="font-mono">{eur(iva)}</span>
            </div>
            <div className="flex justify-between py-3 mt-2 bg-zinc-900 text-white px-4 -mx-4 rounded-xl">
              <span className="font-display text-amber-400">TOTAL A PAGAR</span>
              <span className="font-mono font-display text-amber-400 text-lg">{eur(total)}</span>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="border-t border-stone-200 pt-4 mb-8">
          <div className="text-[9px] tracking-[0.2em] text-stone-500 font-bold uppercase mb-2">Condições</div>
          <div className="text-xs text-stone-600 space-y-1">
            <div>· Pagamento por transferência bancária para o IBAN _______________________________</div>
            <div>· Em caso de atraso de pagamento serão aplicados juros à taxa legal em vigor.</div>
            <div>· Mercadoria e serviços ao cuidado e responsabilidade do cliente após faturação.</div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="grid grid-cols-2 gap-12 mt-12 pt-6">
          <div>
            <div className="border-t-2 border-stone-700 pt-2 text-[9px] tracking-[0.2em] text-stone-700 font-bold">EMITIDO POR</div>
          </div>
          <div>
            <div className="border-t-2 border-stone-700 pt-2 text-[9px] tracking-[0.2em] text-stone-700 font-bold">RECEBIDO POR</div>
          </div>
        </div>

        <div className="mt-8 pt-3 border-t border-stone-300 text-[8px] text-stone-400 font-mono tracking-wider flex justify-between">
          <span>SLIDE &amp; STONE SA · CONSTRUÇÃO CIVIL</span>
          <span>FATURA Nº {fatura.numero} · {fmtDate(fatura.data)}</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   FOLHAS MODELO IMPRIMÍVEIS
   ============================================================ */

const TplLine = ({ label, lines = 1 }) => (
  <div className="mb-3">
    <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-1">{label}</div>
    {Array.from({ length: lines }).map((_, i) => (
      <div key={i} className="border-b border-stone-500" style={{ height: '26px' }} />
    ))}
  </div>
);

const TplBox = ({ label }) => (
  <div className="mb-3">
    <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-1">{label}</div>
    <div className="border-2 border-stone-500 bg-white" style={{ height: '32px' }} />
  </div>
);

const TplCheckGroup = ({ label, options }) => (
  <div className="mb-3">
    <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2">{label}</div>
    <div className="flex flex-wrap gap-5 text-xs">
      {options.map(o => (
        <div key={o} className="flex items-center gap-2">
          <span className="inline-block w-4 h-4 border-2 border-stone-700" />
          <span>{o}</span>
        </div>
      ))}
    </div>
  </div>
);

const TplTable = ({ cols, rows = 8, rowHeight = 30 }) => (
  <table className="w-full border-2 border-stone-900 mb-4" style={{ borderCollapse: 'collapse' }}>
    <thead className="bg-stone-900 text-white">
      <tr>
        {cols.map(c => (
          <th key={c.label} className="text-left px-2 py-2 text-[9px] tracking-[0.15em] font-mono border border-stone-900" style={{ width: c.w }}>
            {c.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {cols.map((c, j) => (
            <td key={j} className="border border-stone-400" style={{ height: rowHeight + 'px' }} />
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const TplHeader = ({ title }) => (
  <div className="border-b-4 border-stone-900 pb-3 mb-5 flex items-end justify-between">
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-orange-500 flex items-center justify-center">
        <Hammer className="w-7 h-7 text-stone-900" strokeWidth={2.5} />
      </div>
      <div>
        <div className="font-display text-xl leading-none">SLIDE & STONE SA</div>
        <div className="text-[9px] tracking-[0.3em] text-stone-600 mt-1.5">CONSTRUÇÃO CIVIL · TERRAPLANAGENS · REABILITAÇÃO</div>
      </div>
    </div>
    <div className="text-right">
      <div className="text-[9px] tracking-[0.3em] text-stone-500">DOCUMENTO</div>
      <div className="font-display text-lg leading-tight">{title}</div>
      <div className="text-[10px] text-stone-600 mt-1 font-mono">Ref. _________________</div>
    </div>
  </div>
);

const TplSig = ({ left = 'RESPONSÁVEL DE OBRA', right = 'CLIENTE / VALIDAÇÃO' }) => (
  <div className="grid grid-cols-2 gap-12 mt-10 pt-6">
    <div>
      <div className="border-t-2 border-stone-700 pt-1.5 text-[9px] tracking-[0.2em] text-stone-700 font-bold">{left}</div>
      <div className="text-[10px] text-stone-500 mt-2 font-mono">Data ___ / ___ / ______</div>
    </div>
    <div>
      <div className="border-t-2 border-stone-700 pt-1.5 text-[9px] tracking-[0.2em] text-stone-700 font-bold">{right}</div>
      <div className="text-[10px] text-stone-500 mt-2 font-mono">Data ___ / ___ / ______</div>
    </div>
  </div>
);

const TplFooter = () => (
  <div className="mt-6 pt-3 border-t border-stone-300 text-[8px] text-stone-400 font-mono tracking-wider flex justify-between">
    <span>SLIDE &amp; STONE SA · CONSTRUÇÃO CIVIL</span>
    <span>FOLHA MODELO · v1.0</span>
  </div>
);

const TEMPLATES = {
  obra: {
    label: 'FICHA DE OBRA',
    description: 'Folha para registo manual de uma nova obra: cliente, local, datas, valor de contrato, descrição dos trabalhos.',
    render: () => (
      <>
        <TplHeader title="FICHA DE OBRA" />
        <div className="grid grid-cols-2 gap-x-6">
          <div className="col-span-2"><TplLine label="NOME / DESIGNAÇÃO DA OBRA" /></div>
          <TplLine label="CLIENTE" />
          <TplLine label="CONTACTO DO CLIENTE" />
          <TplLine label="NIF / NIPC" />
          <TplLine label="REPRESENTANTE / DONO DE OBRA" />
          <div className="col-span-2"><TplLine label="LOCAL DA OBRA" /></div>
          <TplBox label="DATA DE INÍCIO" />
          <TplBox label="DATA FIM PREVISTA" />
          <TplBox label="VALOR DE CONTRATO (€)" />
          <TplBox label="PRAZO (DIAS)" />
          <div className="col-span-2">
            <TplCheckGroup label="ESTADO DA OBRA" options={['Planeada', 'Em curso', 'Suspensa', 'Concluída']} />
          </div>
          <div className="col-span-2"><TplLine label="DESCRIÇÃO DOS TRABALHOS A EXECUTAR" lines={6} /></div>
          <div className="col-span-2"><TplLine label="LICENÇAS / DOCUMENTOS ASSOCIADOS" lines={2} /></div>
          <div className="col-span-2"><TplLine label="OBSERVAÇÕES" lines={3} /></div>
        </div>
        <TplSig />
        <TplFooter />
      </>
    )
  },

  orcamento: {
    label: 'ORÇAMENTO',
    description: 'Folha para preencher um orçamento à mão: cliente, descrição de trabalhos, quantidades, preços, totais e condições.',
    render: () => (
      <>
        <TplHeader title="ORÇAMENTO" />
        <div className="grid grid-cols-3 gap-x-4 mb-2">
          <TplBox label="Nº ORÇAMENTO" />
          <TplBox label="DATA" />
          <TplBox label="VÁLIDO ATÉ" />
        </div>
        <div className="grid grid-cols-2 gap-x-6">
          <TplLine label="CLIENTE" />
          <TplLine label="CONTACTO" />
          <div className="col-span-2"><TplLine label="OBRA / LOCAL" /></div>
        </div>
        <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2 mt-3">DETALHE DOS TRABALHOS / MATERIAIS</div>
        <TplTable
          cols={[
            { label: 'DESCRIÇÃO', w: '50%' },
            { label: 'QTD', w: '10%' },
            { label: 'UN', w: '10%' },
            { label: 'PREÇO/UN (€)', w: '15%' },
            { label: 'TOTAL (€)', w: '15%' },
          ]}
          rows={14}
        />
        <div className="grid grid-cols-2 gap-x-6 mt-2">
          <div><TplLine label="CONDIÇÕES DE PAGAMENTO" lines={4} /></div>
          <div className="border-2 border-stone-900">
            <div className="bg-stone-900 text-white px-3 py-2 text-[9px] tracking-[0.2em] font-bold">RESUMO FINANCEIRO</div>
            <div className="p-3 space-y-3 text-xs">
              <div className="flex justify-between items-end"><span className="font-bold">SUBTOTAL</span><span className="border-b border-stone-500 inline-block" style={{ width: '120px', height: '20px' }} /></div>
              <div className="flex justify-between items-end"><span className="font-bold">IVA <span className="font-mono">(____%)</span></span><span className="border-b border-stone-500 inline-block" style={{ width: '120px', height: '20px' }} /></div>
              <div className="flex justify-between items-end pt-2 border-t-2 border-stone-900"><span className="font-display">TOTAL</span><span className="border-b-2 border-stone-900 inline-block" style={{ width: '120px', height: '24px' }} /></div>
            </div>
          </div>
        </div>
        <TplSig left="ELABORADO POR" right="ACEITAÇÃO DO CLIENTE" />
        <TplFooter />
      </>
    )
  },

  plano: {
    label: 'PLANO DIÁRIO',
    description: 'Folha de plano diário para o encarregado: equipa atribuída, tarefas previstas, equipamentos.',
    render: () => (
      <>
        <TplHeader title="PLANO DIÁRIO" />
        <div className="grid grid-cols-3 gap-x-4">
          <TplBox label="DATA" />
          <div className="col-span-2"><TplBox label="OBRA" /></div>
          <div className="col-span-2"><TplBox label="ENCARREGADO" /></div>
          <TplBox label="HORÁRIO" />
        </div>
        <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2 mt-3">EQUIPA ATRIBUÍDA</div>
        <TplTable
          cols={[
            { label: 'Nº', w: '6%' },
            { label: 'NOME', w: '35%' },
            { label: 'FUNÇÃO', w: '20%' },
            { label: 'TAREFA ATRIBUÍDA', w: '39%' },
          ]}
          rows={8}
        />
        <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2">EQUIPAMENTOS / MAQUINARIA</div>
        <TplTable
          cols={[
            { label: 'EQUIPAMENTO', w: '50%' },
            { label: 'OPERADOR', w: '30%' },
            { label: 'ESTADO', w: '20%' },
          ]}
          rows={4}
        />
        <TplLine label="TAREFAS PRIORITÁRIAS DO DIA" lines={4} />
        <TplLine label="OBSERVAÇÕES / RISCOS / EPI NECESSÁRIO" lines={3} />
        <TplSig left="ENCARREGADO" right="DIREÇÃO DE OBRA" />
        <TplFooter />
      </>
    )
  },

  parte: {
    label: 'PARTE DIÁRIA',
    description: 'Folha individual para o trabalhador registar horas, trabalho realizado e materiais utilizados no dia.',
    render: () => (
      <>
        <TplHeader title="PARTE DIÁRIA DE TRABALHADOR" />
        <div className="grid grid-cols-3 gap-x-4">
          <TplBox label="DATA" />
          <div className="col-span-2"><TplBox label="OBRA" /></div>
          <div className="col-span-2"><TplBox label="NOME DO TRABALHADOR" /></div>
          <TplBox label="FUNÇÃO" />
        </div>
        <div className="grid grid-cols-4 gap-x-4 mt-2">
          <TplBox label="HORA INÍCIO" />
          <TplBox label="HORA FIM" />
          <TplBox label="HORAS NORMAIS" />
          <TplBox label="HORAS EXTRA" />
        </div>
        <TplLine label="TRABALHO REALIZADO (DESCREVER COM DETALHE)" lines={6} />
        <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2 mt-3">MATERIAIS UTILIZADOS</div>
        <TplTable
          cols={[
            { label: 'MATERIAL', w: '55%' },
            { label: 'QTD', w: '15%' },
            { label: 'UN', w: '15%' },
            { label: 'OBSERVAÇÕES', w: '15%' },
          ]}
          rows={6}
        />
        <TplLine label="OCORRÊNCIAS / OBSERVAÇÕES" lines={3} />
        <TplSig left="TRABALHADOR" right="ENCARREGADO" />
        <TplFooter />
      </>
    )
  },

  tarefa: {
    label: 'FICHA DE TAREFA',
    description: 'Folha de cronograma para registar uma tarefa específica: prazos, responsável, dependências e estado.',
    render: () => (
      <>
        <TplHeader title="FICHA DE TAREFA" />
        <TplLine label="TÍTULO DA TAREFA" />
        <div className="grid grid-cols-2 gap-x-6">
          <TplBox label="OBRA" />
          <TplBox label="RESPONSÁVEL" />
          <TplBox label="DATA INÍCIO" />
          <TplBox label="DATA FIM PREVISTA" />
        </div>
        <TplCheckGroup label="ESTADO" options={['Pendente', 'Em curso', 'Concluída', 'Bloqueada']} />
        <TplCheckGroup label="PRIORIDADE" options={['Baixa', 'Normal', 'Alta', 'Urgente']} />
        <TplLine label="DESCRIÇÃO DETALHADA DA TAREFA" lines={5} />
        <TplLine label="RECURSOS NECESSÁRIOS (EQUIPA / EQUIPAMENTOS / MATERIAIS)" lines={3} />
        <TplLine label="DEPENDÊNCIAS DE OUTRAS TAREFAS" lines={2} />
        <TplLine label="CRITÉRIOS DE ACEITAÇÃO / VERIFICAÇÃO" lines={3} />
        <TplLine label="OBSERVAÇÕES" lines={2} />
        <TplSig left="ATRIBUÍDO POR" right="EXECUTANTE" />
        <TplFooter />
      </>
    )
  },

  material: {
    label: 'REQUISIÇÃO DE MATERIAL',
    description: 'Folha para inventário de estaleiro e requisição de novos materiais: existências, falhas, fornecedor.',
    render: () => (
      <>
        <TplHeader title="REQUISIÇÃO / INVENTÁRIO DE MATERIAL" />
        <div className="grid grid-cols-3 gap-x-4">
          <TplBox label="DATA" />
          <div className="col-span-2"><TplBox label="OBRA / ESTALEIRO" /></div>
          <div className="col-span-2"><TplBox label="REQUISITADO POR" /></div>
          <TplBox label="URGÊNCIA" />
        </div>
        <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2 mt-3">LISTAGEM DE MATERIAIS</div>
        <TplTable
          cols={[
            { label: 'DESIGNAÇÃO', w: '32%' },
            { label: 'EM ESTALEIRO', w: '13%' },
            { label: 'A ADQUIRIR', w: '13%' },
            { label: 'UN', w: '7%' },
            { label: 'FORNECEDOR', w: '20%' },
            { label: '€/UN', w: '15%' },
          ]}
          rows={12}
        />
        <TplLine label="ENTREGA / LOCAL DE DESCARGA" lines={2} />
        <TplLine label="OBSERVAÇÕES" lines={3} />
        <TplSig left="REQUISITADO POR" right="APROVADO POR" />
        <TplFooter />
      </>
    )
  },

  relatorio: {
    label: 'RELATÓRIO DE OBRA',
    description: 'Folha de relatório para entregar ao cliente: progresso, trabalhos executados, próximos passos.',
    render: () => (
      <>
        <TplHeader title="RELATÓRIO DE OBRA" />
        <div className="grid grid-cols-2 gap-x-6">
          <TplBox label="OBRA" />
          <TplBox label="CLIENTE" />
          <TplBox label="PERÍODO DE INÍCIO" />
          <TplBox label="PERÍODO DE FIM" />
          <div className="col-span-2"><TplBox label="DIRETOR DE OBRA" /></div>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="border-2 border-stone-900 p-3">
            <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold">PROGRESSO</div>
            <div className="text-2xl font-display mt-2">_____ %</div>
          </div>
          <div className="border-2 border-stone-900 p-3">
            <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold">HORAS NO PERÍODO</div>
            <div className="text-2xl font-display mt-2">_______ h</div>
          </div>
          <div className="border-2 border-stone-900 p-3">
            <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold">TAREFAS CONCLUÍDAS</div>
            <div className="text-2xl font-display mt-2">____ / ____</div>
          </div>
        </div>
        <TplLine label="TRABALHOS EXECUTADOS NO PERÍODO" lines={5} />
        <div className="text-[9px] tracking-[0.2em] text-stone-700 font-bold mb-2">RESUMO POR FRENTE DE TRABALHO</div>
        <TplTable
          cols={[
            { label: 'FRENTE / TAREFA', w: '60%' },
            { label: 'ESTADO', w: '20%' },
            { label: '% PROGRESSO', w: '20%' },
          ]}
          rows={6}
        />
        <TplLine label="PRÓXIMOS PASSOS" lines={4} />
        <TplLine label="PONTOS DE ATENÇÃO / RISCOS" lines={3} />
        <TplLine label="DESVIOS AO PLANO E JUSTIFICAÇÕES" lines={3} />
        <TplSig left="DIRETOR DE OBRA" right="VALIDAÇÃO DO CLIENTE" />
        <TplFooter />
      </>
    )
  },

  trabalhador: {
    label: 'REGISTO DE TRABALHADOR',
    description: 'Folha para cadastro inicial de trabalhador: dados pessoais, função, contactos, custo.',
    render: () => (
      <>
        <TplHeader title="REGISTO DE TRABALHADOR" />
        <div className="grid grid-cols-2 gap-x-6">
          <div className="col-span-2"><TplLine label="NOME COMPLETO" /></div>
          <TplLine label="DATA DE NASCIMENTO" />
          <TplLine label="NACIONALIDADE" />
          <TplLine label="DOCUMENTO DE IDENTIFICAÇÃO Nº" />
          <TplLine label="NIF / NÚMERO DE CONTRIBUINTE" />
          <TplLine label="NÚMERO DE SEGURANÇA SOCIAL" />
          <TplLine label="TELEFONE" />
          <div className="col-span-2"><TplLine label="MORADA" lines={2} /></div>
        </div>
        <TplCheckGroup label="FUNÇÃO" options={['Encarregado', 'Pedreiro', 'Servente', 'Carpinteiro', 'Armador de ferro', 'Manobrador', 'Eletricista', 'Canalizador', 'Pintor', 'Outro']} />
        <div className="grid grid-cols-3 gap-x-4">
          <TplBox label="DATA DE ADMISSÃO" />
          <TplBox label="CUSTO HORA (€)" />
          <TplBox label="TIPO DE CONTRATO" />
        </div>
        <TplLine label="QUALIFICAÇÕES / CERTIFICAÇÕES (CARTAS, FORMAÇÕES)" lines={3} />
        <TplLine label="EPI ATRIBUÍDO" lines={2} />
        <TplLine label="CONTACTO DE EMERGÊNCIA (NOME E TELEFONE)" lines={2} />
        <TplLine label="OBSERVAÇÕES" lines={2} />
        <TplSig left="TRABALHADOR" right="EMPRESA" />
        <TplFooter />
      </>
    )
  },
};

function TemplateOverlay({ type, onClose }) {
  const tmpl = TEMPLATES[type];
  if (!tmpl) return null;
  return (
    <div className="fixed inset-0 bg-stone-900/95 z-50 overflow-y-auto">
      <div className="no-print sticky top-0 z-10 bg-stone-900 text-white px-4 py-3 flex items-center justify-between gap-3 border-b-2 border-orange-500">
        <div className="flex items-center gap-3 min-w-0">
          <FileText className="w-5 h-5 text-orange-500 flex-shrink-0" />
          <div className="min-w-0">
            <div className="text-[9px] tracking-[0.3em] text-stone-400">FOLHA MODELO</div>
            <div className="font-display text-sm tracking-tight truncate">{tmpl.label}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Btn variant="accent" onClick={() => window.print()}><Download className="w-4 h-4" /> IMPRIMIR / PDF</Btn>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center hover:bg-stone-800"><X className="w-5 h-5" /></button>
        </div>
      </div>
      <div className="px-4 py-2 bg-stone-800 text-stone-300 text-xs no-print">
        <div className="max-w-4xl mx-auto">{tmpl.description} Pode imprimir para preencher à mão em obra.</div>
      </div>
      <div id="print-template" className="bg-white max-w-4xl mx-auto my-6 p-10 shadow-2xl text-stone-900 font-body">
        {tmpl.render()}
      </div>
    </div>
  );
}
