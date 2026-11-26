import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, AlertCircle, RotateCcw, History, CheckCircle2, AlertTriangle, Layers, ArrowRight } from 'lucide-react';
import { LecturerCard } from '../components/LecturerCard';
import type { RecommendationResponse, LecturerRecommendation } from '../types';
import { api } from '../services/api';

interface CariDosenPageProps {
  initialTitle: string;
  judul?: string;
  setJudul?: (val: string) => void;
  result?: RecommendationResponse | null;
  setResult?: (res: RecommendationResponse | null) => void;
  onSaveToHistory: (res: RecommendationResponse) => void;
  setActiveTab: (tab: string) => void;
  onSelectLecturer?: (lecturer: LecturerRecommendation, queryTitle: string) => void;
}

export const CariDosenPage: React.FC<CariDosenPageProps> = ({
  initialTitle,
  judul: controlledJudul,
  setJudul: setControlledJudul,
  result: controlledResult,
  setResult: setControlledResult,
  onSaveToHistory,
  setActiveTab,
  onSelectLecturer,
}) => {
  const [localJudul, setLocalJudul] = useState(initialTitle || '');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [localResult, setLocalResult] = useState<RecommendationResponse | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const judul = controlledJudul !== undefined ? controlledJudul : localJudul;
  const setJudul = setControlledJudul || setLocalJudul;
  const result = controlledResult !== undefined ? controlledResult : localResult;
  const setResult = setControlledResult || setLocalResult;

  const scrollToResults = () => {
    requestAnimationFrame(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  useEffect(() => {
    if (initialTitle && controlledJudul === undefined) {
      setLocalJudul(initialTitle);
    }
  }, [initialTitle, controlledJudul]);

  const words = judul.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const sampleTitles = [
    'Pembangunan Aplikasi Mobile GIS Wisata Sejarah Provinsi Sumatera Barat Berbasis Android',
    'Analisis Sentimen Opini Publik Mengenai Kebijakan Kampus Menggunakan Algoritma Machine Learning',
    'Perancangan Enterprise Architecture Sistem Informasi Pelayanan Rumah Sakit Menggunakan TOGAF ADM'
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);

    if (!judul.trim()) {
      setErrorMsg('Judul tidak boleh kosong.');
      return;
    }

    if (wordCount < 6) {
      setErrorMsg('Judul terlalu pendek, tulis minimal 6 kata.');
      return;
    }

    if (wordCount > 30) {
      setErrorMsg('Judul terlalu panjang, tulis maksimal 30 kata.');
      return;
    }

    setLoading(true);
    setTimeout(scrollToResults, 60);
    try {
      const data = await api.getRecommendations(judul.trim());
      setResult(data);
      onSaveToHistory(data);
      setTimeout(scrollToResults, 80);
    } catch (err: any) {
      const detail = err.response?.data?.detail || 'Layanan rekomendasi sedang tidak tersedia. Pastikan server backend dan database berjalan.';
      setErrorMsg(detail);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-8">
      {/* Title & Header */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">Cari Rekomendasi Dosen Pembimbing</h1>
        <p className="text-sm text-stone-500 mt-1.5">
          Tuliskan rencana judul atau ide tugas akhir Anda. Sistem akan membandingkan konteks kata dan topik dengan riwayat bimbingan serta publikasi dosen.
        </p>
      </div>

      {/* Input Form Box */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-4 sm:p-6 md:p-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              JUDUL TUGAS AKHIR
            </label>
            <textarea
              rows={4}
              value={judul}
              onChange={(e) => {
                setJudul(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  if (!loading) {
                    handleSearch();
                  }
                }
              }}
              placeholder="Contoh: Pembangunan Aplikasi Web GIS Pemetaan Sejarah Minangkabau Berbasis Leaflet..."
              className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:ring-4 focus:ring-brand-100 focus:border-brand-500 text-stone-800 placeholder-stone-400 text-base leading-relaxed transition-all resize-y"
            />

            {/* Word Counter & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-2 px-1 text-xs">
              <span
                className={`font-semibold ${
                  wordCount > 30
                    ? 'text-red-600'
                    : wordCount >= 6
                    ? 'text-emerald-700'
                    : 'text-stone-400'
                }`}
              >
                {wordCount} / 30 kata{' '}
                {wordCount > 30
                  ? `(melebihi batas maksimal 30 kata, kelebihan ${wordCount - 30})`
                  : wordCount >= 6
                  ? '(memenuhi syarat)'
                  : `(butuh minimal 6 kata, kurang ${Math.max(0, 6 - wordCount)})`}
              </span>
              <span className="text-stone-400 text-[11px]">Format: Bahasa Indonesia / Inggris</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="flex items-center space-x-2 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                disabled={loading || wordCount < 6 || wordCount > 30}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:bg-stone-300 disabled:cursor-not-allowed shadow-md shadow-brand-600/25 active:scale-95 transition-all"
              >
                {loading ? (
                  <>
                    <span>Menganalisis judul</span>
                    <span className="inline-flex items-center space-x-1 ml-1" aria-hidden="true">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/90 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-copper-300" />
                    <span>Cari Rekomendasi</span>
                  </>
                )}
              </button>

              {result && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-2xl text-sm font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Cari Lagi</span>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('history')}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
            >
              <History className="w-3.5 h-3.5" />
              <span>Buka Riwayat Pencarian</span>
            </button>
          </div>
        </form>

        {/* Contoh Judul yang Bisa Diklik */}
        <div className="mt-8 pt-6 border-t border-stone-100">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">Atau Coba Contoh Judul Ini Langsung:</p>
          <div className="flex flex-wrap gap-2">
            {sampleTitles.map((t, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setJudul(t);
                  setErrorMsg(null);
                }}
                className="w-full sm:w-auto text-left px-3.5 py-2.5 rounded-xl text-xs font-medium bg-stone-100 text-stone-700 hover:bg-brand-50 hover:text-brand-800 hover:border-brand-200 border border-transparent transition-all break-words"
              >
                "{t}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HASIL REKOMENDASI & LOADING SECTION */}
      <div ref={resultsRef} className="scroll-mt-6">
        {loading && (
          <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-10 flex flex-col items-center justify-center text-center space-y-4">
            <div className="flex items-center space-x-2.5" aria-label="Memuat rekomendasi">
              <span className="w-3.5 h-3.5 rounded-full bg-brand-600 animate-bounce shadow-xs" style={{ animationDelay: '0ms' }} />
              <span className="w-3.5 h-3.5 rounded-full bg-copper-500 animate-bounce shadow-xs" style={{ animationDelay: '160ms' }} />
              <span className="w-3.5 h-3.5 rounded-full bg-brand-400 animate-bounce shadow-xs" style={{ animationDelay: '320ms' }} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-stone-800">Sedang Mencocokkan Topik Penelitian...</p>
              <p className="text-xs text-stone-500">
                Membandingkan judul Anda dengan 17 profil dosen, 707 riwayat TA, dan 610 publikasi ilmiah.
              </p>
            </div>
          </div>
        )}

        {!loading && result && (
          <div className="space-y-6 pt-4 animate-in fade-in duration-500">
          {/* Banner Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-stone-200 shadow-xs">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-700">Hasil Analisis Kemiripan Topik</span>
              <h2 className="text-xl font-bold text-stone-900 mt-0.5">Top-3 Dosen Pembimbing yang Direkomendasikan</h2>
              <p className="text-xs text-stone-500 mt-1">
                Kueri: <span className="font-semibold text-stone-700">"{result.judul_input}"</span>
              </p>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold shrink-0">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Otomatis Tersimpan di History</span>
            </div>
          </div>

          {/* Low Confidence Banner jika skor rendah */}
          {result.is_low_confidence && (
            <div className="flex items-start space-x-3 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Hasil Kurang Meyakinkan</p>
                <p className="text-xs text-amber-700 mt-0.5">
                  Sistem mendeteksi sedikit istilah yang cocok dengan data referensi kami. Rekomendasi di bawah mungkin kurang representatif. Anda disarankan mencoba memperjelas kata kunci topik (misal: GIS, Machine Learning, ERP, Audit IT, dsb).
                </p>
              </div>
            </div>
          )}

          {/* Istilah yang Dikenali Model */}
          {result.kata_kunci_kueri && result.kata_kunci_kueri.length > 0 && (
            <div className="bg-stone-100/70 p-4 rounded-2xl border border-stone-200">
              <span className="text-xs font-semibold text-stone-600">Istilah yang Dikenali oleh Model TF-IDF:</span>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {result.kata_kunci_kueri.map((kw, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white text-stone-800 border border-stone-200 shadow-2xs">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 3 Kartu Dosen Teratas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {result.rekomendasi.map((lecturer) => (
              <LecturerCard
                key={lecturer.id_dosen}
                lecturer={lecturer}
                onSelectLecturer={
                  onSelectLecturer ? (l) => onSelectLecturer(l, result.judul_input) : undefined
                }
              />
            ))}
          </div>

          {/* Tabel Perbandingan Ringkas */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-4 sm:p-6 overflow-x-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Tabel Perbandingan 3 Rekomendasi Dosen</span>
            </h3>
            <table className="w-full min-w-[640px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-stone-600 font-semibold">
                  <th className="py-2.5 px-3">Peringkat</th>
                  <th className="py-2.5 px-3">Nama Dosen</th>
                  <th className="py-2.5 px-3">Kelompok Keahlian</th>
                  <th className="py-2.5 px-3">Riwayat Bimbingan TA</th>
                  <th className="py-2.5 px-3">Publikasi Ilmiah</th>
                  <th className="py-2.5 px-3">Kata Kunci Cocok</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {result.rekomendasi.map((lecturer) => (
                  <tr key={lecturer.id_dosen} className="hover:bg-stone-50">
                    <td className="py-3 px-3 font-bold text-stone-900">#{lecturer.peringkat}</td>
                    <td className="py-3 px-3 font-semibold text-stone-800">
                      {onSelectLecturer ? (
                        <button
                          type="button"
                          onClick={() => onSelectLecturer(lecturer, result.judul_input)}
                          className="inline-flex items-center space-x-1 text-left text-brand-700 hover:text-brand-900 hover:underline cursor-pointer"
                        >
                          <span>{lecturer.nama_dosen}</span>
                          <ArrowRight className="w-3 h-3 shrink-0" />
                        </button>
                      ) : (
                        lecturer.nama_dosen
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded bg-stone-100 text-stone-700 font-medium">
                        {lecturer.kode_kk || '-'}
                      </span>
                    </td>
                    <td className="py-3 px-3">{lecturer.jumlah_ta} judul</td>
                    <td className="py-3 px-3">{lecturer.jumlah_publikasi} artikel</td>
                    <td className="py-3 px-3">
                      <div className="flex flex-wrap gap-1">
                        {lecturer.kata_kunci_cocok.map((k, i) => (
                          <span key={i} className="px-1.5 py-0.5 bg-brand-50 text-brand-800 rounded text-[10px] font-medium border border-brand-200">
                            {k}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};
