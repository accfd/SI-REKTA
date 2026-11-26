import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { BerandaPage } from './pages/BerandaPage';
import { CariDosenPage } from './pages/CariDosenPage';
import { DaftarDosenPage } from './pages/DaftarDosenPage';
import { DokumenPedomanPage } from './pages/DokumenPedomanPage';
import { HistoryPage } from './pages/HistoryPage';
import { InformasiPage } from './pages/InformasiPage';
import { ProfilDosenPage } from './pages/ProfilDosenPage';
import { useHistoryStorage } from './hooks/useLocalStorage';
import type { RecommendationResponse, LecturerRecommendation, DosenItem } from './types';
import {
  TAB_TO_PATH,
  parseRouteFromPathname,
  getDosenProfilePath,
  type AppTab,
  type LecturerProfileContext,
} from './utils/lecturerSlug';

interface HistoryRouteState {
  tab: AppTab;
  dosenSlug: string | null;
  dosenContext?: LecturerProfileContext | null;
}

export const App: React.FC = () => {
  const initialParsed =
    typeof window !== 'undefined'
      ? parseRouteFromPathname(window.location.pathname)
      : { tab: 'beranda' as AppTab, dosenSlug: null };

  const [activeTab, setActiveTabState] = useState<AppTab>(initialParsed.tab);
  const [dosenSlug, setDosenSlug] = useState<string | null>(initialParsed.dosenSlug);
  const [dosenContext, setDosenContext] = useState<LecturerProfileContext | null>(null);

  // State pencarian disimpan di App agar tidak hilang saat melihat Profil Dosen lalu Kembali
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [searchResult, setSearchResult] = useState<RecommendationResponse | null>(null);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sidebarOpen');
      return saved ? saved === 'true' : true;
    }
    return true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  // Sinkronkan tombol Back / Forward browser dengan History API
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const state = event.state as HistoryRouteState | null;
      if (state && state.tab) {
        setActiveTabState(state.tab);
        setDosenSlug(state.dosenSlug ?? null);
        setDosenContext(state.dosenContext ?? null);
      } else {
        const parsed = parseRouteFromPathname(window.location.pathname);
        setActiveTabState(parsed.tab);
        setDosenSlug(parsed.dosenSlug);
        setDosenContext(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateToTab = useCallback((tab: string) => {
    const targetTab = (tab in TAB_TO_PATH ? tab : 'beranda') as Exclude<AppTab, 'profil-dosen'>;
    const targetPath = TAB_TO_PATH[targetTab];

    setActiveTabState(targetTab);
    setDosenSlug(null);
    setDosenContext(null);

    if (window.location.pathname !== targetPath) {
      const state: HistoryRouteState = { tab: targetTab, dosenSlug: null, dosenContext: null };
      window.history.pushState(state, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openDosenProfile = useCallback(
    (slug: string, context: LecturerProfileContext) => {
      const targetPath = `/dosen/${slug}`;
      setActiveTabState('profil-dosen');
      setDosenSlug(slug);
      setDosenContext(context);

      if (window.location.pathname !== targetPath) {
        const state: HistoryRouteState = {
          tab: 'profil-dosen',
          dosenSlug: slug,
          dosenContext: context,
        };
        window.history.pushState(state, '', targetPath);
      }
    },
    []
  );

  const handleOpenFromRecommendation = useCallback(
    (
      lecturer: LecturerRecommendation,
      sourceTab: 'cari' | 'history',
      queryTitle?: string
    ) => {
      const path = getDosenProfilePath(lecturer.nama_dosen);
      const slug = path.replace('/dosen/', '');
      openDosenProfile(slug, {
        idDosen: lecturer.id_dosen,
        namaDosen: lecturer.nama_dosen,
        matchedKeywords: lecturer.kata_kunci_cocok,
        queryTitle,
        peringkat: lecturer.peringkat,
        sourceTab,
      });
    },
    [openDosenProfile]
  );

  const handleOpenFromDaftarDosen = useCallback(
    (dosen: DosenItem) => {
      const path = getDosenProfilePath(dosen.nama_lengkap);
      const slug = path.replace('/dosen/', '');
      openDosenProfile(slug, {
        idDosen: dosen.id_dosen,
        namaDosen: dosen.nama_lengkap,
        sourceTab: 'dosen',
      });
    },
    [openDosenProfile]
  );

  const handleBackFromProfile = useCallback(() => {
    const fallbackTab = dosenContext?.sourceTab || 'dosen';
    if (window.history.length > 1 && dosenContext?.sourceTab) {
      window.history.back();
      return;
    }
    navigateToTab(fallbackTab);
  }, [dosenContext, navigateToTab]);

  const { history, addHistory, deleteHistory, clearAllHistory } = useHistoryStorage();

  const handleSaveToHistory = (res: RecommendationResponse) => {
    addHistory(res.judul_input, res.rekomendasi, res.kata_kunci_kueri, res.is_low_confidence);
  };

  const handleSearchAgain = (title: string) => {
    setSelectedTitle(title);
    setSearchResult(null);
    navigateToTab('cari');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 flex flex-col lg:flex-row">
      {/* Sidebar Navigasi */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={navigateToTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          sidebarOpen ? 'lg:pl-64' : 'lg:pl-0'
        }`}
      >
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 lg:py-10">
          {activeTab === 'beranda' && (
            <BerandaPage
              setActiveTab={navigateToTab}
              onSelectSampleTitle={(title) => {
                setSelectedTitle(title);
                setSearchResult(null);
              }}
            />
          )}

          {activeTab === 'cari' && (
            <CariDosenPage
              initialTitle={selectedTitle}
              judul={selectedTitle}
              setJudul={setSelectedTitle}
              result={searchResult}
              setResult={setSearchResult}
              onSaveToHistory={handleSaveToHistory}
              setActiveTab={navigateToTab}
              onSelectLecturer={(lecturer, query) =>
                handleOpenFromRecommendation(lecturer, 'cari', query)
              }
            />
          )}

          {activeTab === 'dosen' && (
            <DaftarDosenPage
              onSelectLecturerTopic={(title) => {
                setSelectedTitle(title);
              }}
              setActiveTab={navigateToTab}
              onOpenDosenProfile={handleOpenFromDaftarDosen}
            />
          )}

          {activeTab === 'profil-dosen' && dosenSlug && (
            <ProfilDosenPage
              slug={dosenSlug}
              context={dosenContext}
              onBack={handleBackFromProfile}
              onGoToCari={() => navigateToTab('cari')}
            />
          )}

          {activeTab === 'pedoman' && <DokumenPedomanPage />}

          {activeTab === 'history' && (
            <HistoryPage
              history={history}
              selectedHistoryId={selectedHistoryId}
              setSelectedHistoryId={setSelectedHistoryId}
              onDeleteOne={deleteHistory}
              onClearAll={clearAllHistory}
              onSearchAgain={handleSearchAgain}
              setActiveTab={navigateToTab}
              onSelectLecturer={(lecturer, query) =>
                handleOpenFromRecommendation(lecturer, 'history', query)
              }
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
