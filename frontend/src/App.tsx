import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { BerandaPage } from './pages/BerandaPage';
import { CariDosenPage } from './pages/CariDosenPage';
import { DaftarDosenPage } from './pages/DaftarDosenPage';
import { DokumenPedomanPage } from './pages/DokumenPedomanPage';
import { HistoryPage } from './pages/HistoryPage';
import { InformasiPage } from './pages/InformasiPage';
import { useHistoryStorage } from './hooks/useLocalStorage';
import type { RecommendationResponse } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedTitle, setSelectedTitle] = useState<string>('');

  const { history, addHistory, deleteHistory, clearAllHistory } = useHistoryStorage();

  const handleSaveToHistory = (res: RecommendationResponse) => {
    addHistory(res.judul_input, res.rekomendasi, res.kata_kunci_kueri, res.is_low_confidence);
  };

  const handleSearchAgain = (title: string) => {
    setSelectedTitle(title);
    setActiveTab('cari');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex">
      {/* Sidebar Navigasi */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
          {activeTab === 'beranda' && (
            <BerandaPage
              setActiveTab={setActiveTab}
              onSelectSampleTitle={(title) => {
                setSelectedTitle(title);
              }}
            />
          )}

          {activeTab === 'cari' && (
            <CariDosenPage
              initialTitle={selectedTitle}
              onSaveToHistory={handleSaveToHistory}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'dosen' && (
            <DaftarDosenPage
              onSelectLecturerTopic={(title) => {
                setSelectedTitle(title);
              }}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'pedoman' && <DokumenPedomanPage />}

          {activeTab === 'history' && (
            <HistoryPage
              history={history}
              onDeleteOne={deleteHistory}
              onClearAll={clearAllHistory}
              onSearchAgain={handleSearchAgain}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'informasi' && <InformasiPage />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
