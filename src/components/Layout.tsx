import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileUp, 
  Cpu, 
  Search, 
  CalendarCheck, 
  Settings, 
  Bell, 
  Menu, 
  X,
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  setView: (view: string) => void;
  onLogout: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  currentView, 
  setView,
  onLogout 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const menuItems = [
    { id: 'dashboard', name: 'Boshqaruv paneli', icon: LayoutDashboard },
    { id: 'upload', name: 'Hujjat yuklash', icon: FileUp },
    { id: 'analysis', name: 'AI Tahlil', icon: Cpu },
    { id: 'discovery', name: 'Advokatlar', icon: Search },
    { id: 'consultations', name: 'Maslahatlar', icon: CalendarCheck },
    { id: 'settings', name: 'Sozlamalar', icon: Settings },
  ];

  const getTitle = () => {
    switch (currentView) {
      case 'dashboard': return 'Boshqaruv paneli';
      case 'upload': return 'Hujjat yuklash';
      case 'analysis': return 'AI Ish tahlili';
      case 'discovery': return 'Advokat qidirish';
      case 'profile': return 'Advokat profili';
      case 'booking': return 'Maslahatni rejalashtirish';
      case 'consultations': return 'Mening uchrashuvlarim';
      case 'settings': return 'Tizim sozlamalari';
      default: return 'YO‘RIQCHI';
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-brand-navy bg-grid-pattern relative">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 border-r border-white/10 bg-brand-navy/60 backdrop-blur-xl p-6 sticky top-0 h-screen z-20">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer" onClick={() => setView('landing')}>
          <img src="/logo.png" alt="YO‘RIQCHI logo" className="w-10 h-10 rounded-xl object-cover shadow-lg" />
          <div>
            <h1 className="text-lg font-bold text-white tracking-wider">YO‘RIQCHI</h1>
            <p className="text-[10px] text-brand-blue font-medium uppercase tracking-widest -mt-1">AI Legal Hub</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id || (item.id === 'analysis' && currentView === 'analysis') || (item.id === 'discovery' && (currentView === 'profile' || currentView === 'booking'));
            return (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="pt-6 border-t border-white/5 flex items-center gap-3 mt-auto">
          <img 
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80&h=80" 
            alt="User avatar" 
            className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-white truncate">Sardor Bek</h4>
            <p className="text-[11px] text-slate-400 truncate">sardor@law.uz</p>
          </div>
          <button 
            onClick={onLogout}
            className="text-xs font-semibold text-slate-500 hover:text-rose-400 transition-colors"
          >
            Chiqish
          </button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-navy/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="flex items-center gap-2" onClick={() => setView('landing')}>
          <img src="/logo.png" alt="YO‘RIQCHI logo" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-bold text-white tracking-wider text-sm">YO‘RIQCHI</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white relative"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-blue" />
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/5 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[61px] bg-brand-navy/95 backdrop-blur-2xl z-40 md:hidden flex flex-col p-6 border-t border-white/5">
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setView(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-base font-medium transition-all ${
                    isActive 
                      ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={20} />
                  {item.name}
                </button>
              );
            })}
          </nav>
          
          <div className="pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=80&h=80" 
                alt="User avatar" 
                className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/10"
              />
              <div>
                <h4 className="text-sm font-medium text-white">Sardor Bekmurodov</h4>
                <p className="text-xs text-slate-400">sardor@law.uz</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onLogout();
              }}
              className="text-sm font-semibold text-rose-400"
            >
              Tizimdan chiqish
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop Topbar */}
        <header className="hidden md:flex items-center justify-between px-10 py-5 border-b border-white/5 bg-brand-navy/30 backdrop-blur-md sticky top-0 z-15">
          <div>
            <h2 className="text-xl font-semibold text-white tracking-wide">{getTitle()}</h2>
            <p className="text-xs text-slate-400">Tizim vaqti: 2026-06-04</p>
          </div>

          <div className="flex items-center gap-4 relative">
            {/* Search Input Mock */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Qidiruv..." 
                className="bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 w-48 focus:w-64 focus:outline-none focus:ring-1 focus:ring-brand-blue focus:border-transparent transition-all"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-slate-400" />
            </div>

            {/* Notifications */}
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors relative"
            >
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-brand-blue" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-12 w-80 glass-panel rounded-2xl border border-white/10 shadow-2xl p-4 z-50 mt-1">
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-white/5">
                  <h5 className="font-semibold text-xs text-white">Bildirishnomalar</h5>
                  <button className="text-[10px] text-brand-blue hover:underline">Hammasini o'qish</button>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                  <div className="text-xs p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <p className="text-white font-medium">Uchrashuv tasdiqlandi</p>
                    <p className="text-slate-400 mt-0.5">Alisher Qodirov bilan video uchrashuv belgilandi.</p>
                    <span className="text-[9px] text-slate-500 block mt-1">5 daqiqa oldin</span>
                  </div>
                  <div className="text-xs p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <p className="text-white font-medium">Hujjat AI Tahlili tayyor</p>
                    <p className="text-slate-400 mt-0.5">Nikoh shartnomasi tahlili yakunlandi.</p>
                    <span className="text-[9px] text-slate-500 block mt-1">10 daqiqa oldin</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
};
