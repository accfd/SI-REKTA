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
      {/* Edge detector: hover tepi kiri layar untuk buka sidebar */}
      {!isOpen && (
        <div
          className="fixed inset-y-0 left-0 w-4 z-30 cursor-pointer"
          onMouseEnter={() => setIsOpen(true)}
        />
      )}

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm">
        <div
          onClick={() => handleSelectTab('beranda')}
          className="flex items-center space-x-2.5 cursor-pointer"
        >
          <img src="/logo.png" alt="SI-REKTA Logo" className="w-8 h-8 object-contain rounded-lg" />
          <span className="font-extrabold text-lg tracking-tight text-stone-900">SI-REKTA</span>
        </div>
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm"
        />
      )}

      {/* Floating logo saat sidebar tertutup */}
      <div
        className={`hidden md:flex fixed top-3 left-3 z-50 w-10 h-10 items-center justify-center rounded-xl bg-white border border-stone-200 shadow-md cursor-pointer hover:scale-105 transition-all duration-300 ease-out ${
          !isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      >
        <img src="/logo.png" alt="SI-REKTA Logo" className="w-7 h-7 object-contain" />
      </div>

      {/* Sidebar Panel — selalu ter-render agar animasi slide-in/out halus */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-64
          bg-white border-r border-stone-200
          flex flex-col justify-between
          transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isOpen ? 'md:translate-x-0 md:opacity-100' : 'md:-translate-x-full md:opacity-0 md:pointer-events-none'}
        `}
        onMouseLeave={() => setIsOpen(false)}
      >
          {/* Konten atas */}
          <div className="flex flex-col flex-1 overflow-y-auto p-5">

            {/* Brand Header */}
            <div
              onClick={() => handleSelectTab('beranda')}
              className="flex items-center space-x-3 cursor-pointer group pb-5 border-b border-stone-100"
            >
              <div className="w-11 h-11 rounded-2xl bg-brand-50/70 border border-brand-200/80 p-1.5 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <img src="/logo.png" alt="SI-REKTA Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-stone-900">SI-REKTA</span>
                <p className="text-[11px] text-stone-400 leading-tight mt-0.5">Rekomendasi Dosen TA</p>
              </div>
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
                
              </div>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
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
