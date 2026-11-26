import React, { useState } from 'react';
import {
  Compass,
  Search,
  Users,
  FileText,
  History,
  Info,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setIsOpen((prev) => !prev);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Compass },
    { id: 'cari', label: 'Cari Dosen', icon: Search,  },
    { id: 'dosen', label: 'Daftar Dosen', icon: Users,  },
    { id: 'pedoman', label: 'Dokumen Pedoman', icon: FileText,  },
    { id: 'history', label: 'History', icon: History, },
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Edge detector (desktop): hover tepi kiri layar untuk buka sidebar */}
      {!isOpen && (
        <div
          className="hidden lg:block fixed inset-y-0 left-0 w-4 z-30 cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
        />
      )}

      {/* Mobile & Tablet Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 w-full bg-white/95 backdrop-blur-xs border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div
          onClick={() => handleSelectTab('beranda')}
          className="flex items-center space-x-2.5 cursor-pointer min-w-0"
        >
          <img src="/logo.png" alt="SI-REKTA Logo" className="w-8 h-8 object-contain rounded-lg shrink-0" />
          <div className="min-w-0">
            <span className="font-extrabold text-lg tracking-tight text-stone-900 block leading-none">SI-REKTA</span>
            <span className="text-[10px] text-stone-400 block leading-tight mt-0.5 truncate">Rekomendasi Dosen TA</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="p-2 rounded-xl text-stone-700 hover:bg-stone-100 active:scale-95 transition-all shrink-0"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs"
        />
      )}

      {/* Floating logo saat sidebar tertutup di desktop */}
      <div
        className={`hidden lg:flex fixed top-3 left-3 z-50 w-10 h-10 items-center justify-center rounded-xl bg-white border border-stone-200 shadow-md cursor-pointer hover:scale-105 transition-all duration-300 ease-out ${
          !isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      >
        <img src="/logo.png" alt="SI-REKTA Logo" className="w-7 h-7 object-contain" />
      </div>

      {/* Sidebar Panel — mobile slide-over (<lg) & desktop persistent/collapsible (>=lg) */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 sm:w-64 max-w-[85vw]
          bg-white border-r border-stone-200 shadow-2xl lg:shadow-none
          flex flex-col justify-between
          transition-all duration-300 lg:duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mobileOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full pointer-events-none'}
          ${isOpen ? 'lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto' : 'lg:-translate-x-full lg:opacity-0 lg:pointer-events-none'}
        `}
        onMouseLeave={() => {
          if (typeof window !== 'undefined' && window.innerWidth >= 1024) {
            setIsOpen(false);
          }
        }}
      >
          {/* Konten atas */}
          <div className="flex flex-col flex-1 overflow-y-auto p-5">

            {/* Brand Header */}
            <div className="flex items-center justify-between gap-2 pb-5 border-b border-stone-100">
              <div
                onClick={() => handleSelectTab('beranda')}
                className="flex items-center space-x-3 cursor-pointer group min-w-0"
              >
                <div className="w-11 h-11 rounded-2xl bg-brand-50/70 border border-brand-200/80 p-1.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                  <img src="/logo.png" alt="SI-REKTA Logo" className="w-full h-full object-contain" />
                </div>
                <div className="min-w-0">
                  <span className="font-extrabold text-xl tracking-tight text-stone-900 block">SI-REKTA</span>
                  <p className="text-[11px] text-stone-400 leading-tight mt-0.5 truncate">Rekomendasi Dosen TA</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CTA Button */}
            <div className="mt-5 mb-4">
              <button
                onClick={() => handleSelectTab('cari')}
                className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 active:scale-95 transition-all group"
              >
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4" />
                  <span>Mulai Cari Dosen</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Navigasi */}
            <nav className="space-y-1 flex-1 mt-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 mb-2">
                Menu Navigasi
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  activeTab === item.id || (activeTab === 'profil-dosen' && item.id === 'dosen');
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-left transition-all ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/60'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 font-medium'
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 shrink-0 transition-colors ${
                        isActive ? 'text-brand-600' : 'text-stone-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm leading-snug">{item.label}</div>
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer Info Box */}
          <div
            onClick={() => handleSelectTab('informasi')}
            className={`m-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
              activeTab === 'informasi'
                ? 'bg-brand-50 border-brand-300'
                : 'bg-stone-50 border-stone-200/80 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-800">
              <Info
                className={`w-4 h-4 shrink-0 ${
                  activeTab === 'informasi' ? 'text-brand-600' : 'text-stone-500'
                }`}
              />
              <span>Informasi</span>
            </div>
          </div>
        </aside>
    </>
  );
};
