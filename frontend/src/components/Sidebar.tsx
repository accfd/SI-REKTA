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
  Database,
  ArrowRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Compass, desc: 'Ringkasan & pengantar' },
    { id: 'cari', label: 'Cari Dosen', icon: Search, desc: 'Rekomendasi judul TA' },
    { id: 'dosen', label: 'Daftar Dosen', icon: Users, desc: '17 Dosen & karya ilmiah' },
    { id: 'pedoman', label: 'Dokumen Pedoman', icon: FileText, desc: 'Buku panduan PDF' },
    { id: 'history', label: 'History', icon: History, desc: 'Riwayat pencarian lokal' },
    { id: 'informasi', label: 'Informasi', icon: Info, desc: 'Metodologi & kinerja' },
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div
          onClick={() => handleSelectTab('beranda')}
          className="flex items-center space-x-2.5 cursor-pointer"
        >
          <img
            src="/logo.png"
            alt="SI-REKTA Logo"
            className="w-8 h-8 object-contain rounded-lg"
          />
          <span className="font-extrabold text-lg tracking-tight text-stone-900">SI-REKTA</span>
          <span className="text-[10px] font-bold px-2 py-0.5 bg-brand-50 text-brand-700 rounded-md border border-brand-200">
            DSI
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
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
          className="lg:hidden fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs"
        />
      )}

      {/* Sidebar Panel (Desktop: Fixed Left, Mobile: Slide-over Drawer) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-stone-200 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto p-5 scrollbar-thin">
          {/* Brand Header */}
          <div
            onClick={() => handleSelectTab('beranda')}
            className="flex items-center space-x-3 cursor-pointer group pb-6 border-b border-stone-100"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-50/70 border border-brand-200/80 p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img
                src="/logo.png"
                alt="SI-REKTA Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-xl tracking-tight text-stone-900">SI-REKTA</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-brand-50 text-brand-700 rounded border border-brand-200">
                  DSI 2025
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-tight mt-0.5">Rekomendasi Dosen TA</p>
            </div>
          </div>

          {/* Quick CTA Button */}
          <div className="mt-5 mb-4">
            <button
              onClick={() => handleSelectTab('cari')}
              className="w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-600/25 active:scale-98 transition-all group"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4" />
                <span>Mulai Cari Dosen</span>
              </div>
              <ArrowRight className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 flex-1 mt-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 mb-2">
              Menu Navigasi
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
                      ? 'bg-brand-50 text-brand-700 font-bold shadow-2xs border border-brand-200/60'
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
                    <div className="text-[11px] text-stone-400 font-normal truncate">
                      {item.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Info Box */}
        <div className="p-4 border-t border-stone-100 bg-stone-50 m-3 rounded-2xl">
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-700">
            <Database className="w-3.5 h-3.5 text-copper-600" />
            <span>MySQL (Laragon) Online</span>
          </div>
          <p className="text-[11px] text-stone-400 mt-1 leading-snug">
            17 Dosen • 706 Bimbingan • 643 Publikasi
          </p>
        </div>
      </aside>
    </>
  );
};
