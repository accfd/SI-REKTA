import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  AlertCircle,
  RotateCcw,
  History,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Trophy,
  Medal,
  Crown,
  Award,
  Cpu,
  ArrowDown,
  Check
} from 'lucide-react';
import { LecturerCard } from '../components/LecturerCard';
import type { RecommendationResponse } from '../types';
import { api } from '../services/api';

interface CariDosenPageProps {
  initialTitle: string;
  onSaveToHistory: (res: RecommendationResponse) => void;
  setActiveTab: (tab: string) => void;
}

export const CariDosenPage: React.FC<CariDosenPageProps> = ({
  initialTitle,
  onSaveToHistory,
  setActiveTab,
}) => {
  const [judul, setJudul] = useState(initialTitle || '');
  const [loading, setLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<RecommendationResponse | null>(null);

  useEffect(() => {
    if (initialTitle) {
      setJudul(initialTitle);
    }
  }, [initialTitle]);

  const words = judul.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const sampleTitles = [
    'Pembangunan Aplikasi Mobile GIS Wisata Sejarah Provinsi Sumatera Barat Berbasis Android',
    'Analisis Sentimen Opini Publik Mengenai Kebijakan Kampus Menggunakan Algoritma Machine Learning',
    'Perancangan Enterprise Architecture Sistem Informasi Pelayanan Rumah Sakit Menggunakan TOGAF ADM'
  ];

  const analysisSteps = [
    'Ekstraksi token kueri & penyaringan stop words bilingual...',
    'Transformasi matriks TF-IDF pada 12.364 fitur kosakata...',
    'Komputasi kemiripan Cosine Similarity terhadap 1.349 dokumen korpus...',
    'Menyusun pemeringkatan dan podium gamifikasi Top-3 Dosen Pembimbing...'
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

    setLoading(true);
    setLoadingProgress(10);
    setLoadingStep(0);
    setResult(null);

    // Timers for realistic, satisfying multi-stage loading animation
    const stepTimer1 = setTimeout(() => {
      setLoadingStep(1);
      setLoadingProgress(40);
    }, 350);

    const stepTimer2 = setTimeout(() => {
      setLoadingStep(2);
      setLoadingProgress(70);
    }, 750);

    const stepTimer3 = setTimeout(() => {
      setLoadingStep(3);
      setLoadingProgress(92);
    }, 1200);

    try {
      // Pastikan ada waktu minimal 1.5 detik agar pengguna merasakan proses analisis ML
      const [data] = await Promise.all([
        api.getRecommendations(judul.trim()),
        new Promise((resolve) => setTimeout(resolve, 1500))
      ]);
      setLoadingProgress(100);
      setTimeout(() => {
        setResult(data);
        onSaveToHistory(data);
        setLoading(false);
      }, 250);
    } catch (err: any) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      const detail =
        err.response?.data?.detail ||
        'Layanan rekomendasi sedang tidak tersedia. Pastikan server backend dan database berjalan.';
      setErrorMsg(detail);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMsg(null);
  };

  const scrollToCards = () => {
    const el = document.getElementById('detailed-cards');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const rank1 = result?.rekomendasi.find((r) => r.peringkat === 1) || result?.rekomendasi[0];
  const rank2 = result?.rekomendasi.find((r) => r.peringkat === 2) || result?.rekomendasi[1];
  const rank3 = result?.rekomendasi.find((r) => r.peringkat === 3) || result?.rekomendasi[2];

  return (
    <div className="space-y-8">
      {/* Title & Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Cari Rekomendasi Dosen Pembimbing</h1>
        <p className="text-sm text-stone-500 mt-1.5">
          Tuliskan rencana judul atau ide tugas akhir Anda. Sistem akan membandingkan konteks kata dan topik dengan riwayat bimbingan serta publikasi dosen.
        </p>
      </div>

      {/* Input Form Box */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-md p-6 sm:p-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-2">
              Judul Tugas Akhir (Minimal 6 Kata)
            </label>
            <textarea
              rows={4}
              value={judul}
              disabled={loading}
              onChange={(e) => {
                setJudul(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Contoh: Pembangunan Aplikasi Web GIS Pemetaan Sejarah Minangkabau Berbasis Leaflet..."
              className="w-full px-4 py-3.5 rounded-2xl border border-stone-200 focus:ring-4 focus:ring-brand-100 focus:border-brand-500 text-stone-800 placeholder-stone-400 text-base leading-relaxed transition-all resize-y disabled:bg-stone-50"
            />

            {/* Word Counter & Status */}
            <div className="flex items-center justify-between mt-2 px-1 text-xs">
              <span className={`font-semibold ${wordCount >= 6 ? 'text-emerald-700' : 'text-stone-400'}`}>
                {wordCount} kata {wordCount >= 6 ? '(memenuhi syarat)' : `(butuh minimal 6 kata, kurang ${Math.max(0, 6 - wordCount)})`}
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
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center space-x-3">
              <button
                type="submit"
                disabled={loading || wordCount < 6}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:bg-stone-300 disabled:cursor-not-allowed shadow-md shadow-brand-600/25 active:scale-95 transition-all"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Menganalisis teks judul...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-copper-300" />
                    <span>Cari Rekomendasi</span>
                  </>
                )}
              </button>

              {result && !loading && (
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
                disabled={loading}
                onClick={() => {
                  setJudul(t);
                  setErrorMsg(null);
                }}
                className="text-left px-3.5 py-2 rounded-xl text-xs font-medium bg-stone-100 text-stone-700 hover:bg-brand-50 hover:text-brand-800 hover:border-brand-200 border border-transparent transition-all disabled:opacity-50"
              >
                "{t}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* LOADING SCREEN / ANALYZING STATE */}
      {loading && (
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-xl p-8 sm:p-12 text-center space-y-7 animate-in fade-in duration-300">
          {/* Animated Glowing Radar Icon */}
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-brand-500/20 animate-ping" />
            <div className="absolute -inset-2 rounded-full bg-copper-500/10 animate-pulse" />
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-brand-600 to-copper-600 flex items-center justify-center shadow-lg shadow-brand-600/30 text-white">
              <Cpu className="w-10 h-10 animate-pulse" />
            </div>
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-black text-stone-900 tracking-tight">
              Menganalisis Relevansi Topik...
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Model TF-IDF sedang membandingkan judul Anda dengan{' '}
              <span className="font-semibold text-stone-800">1.349 dokumen korpus</span> (706 riwayat TA dan 643 publikasi 17 dosen DSI).
            </p>
          </div>

          {/* Dynamic Progress Bar */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="w-full bg-stone-100 rounded-full h-3 overflow-hidden p-0.5 border border-stone-200">
              <div
                className="bg-gradient-to-r from-brand-600 to-copper-500 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-bold text-stone-400">
              <span>Proses Komputasi</span>
              <span className="text-brand-700">{loadingProgress}%</span>
            </div>
          </div>

          {/* Stepper Checklist */}
          <div className="max-w-md mx-auto bg-stone-50/80 border border-stone-200/80 rounded-2xl p-4 text-left space-y-2.5">
            {analysisSteps.map((stepText, idx) => {
              const isDone = loadingStep > idx;
              const isCurrent = loadingStep === idx;
              return (
                <div key={idx} className="flex items-center space-x-3 text-xs">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-brand-600 text-white animate-bounce'
                        : 'bg-stone-200 text-stone-500'
                    }`}
                  >
                    {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                  </div>
                  <span
                    className={`${
                      isDone
                        ? 'text-stone-700 font-medium'
                        : isCurrent
                        ? 'text-brand-900 font-bold'
                        : 'text-stone-400'
                    }`}
                  >
                    {stepText}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* HASIL REKOMENDASI & GAMIFIKASI PODIUM */}
      {result && !loading && (
        <div className="space-y-8 pt-2 animate-in fade-in duration-500">
          {/* Banner Status Header */}
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

          {/* GAMIFIKASI PODIUM TOP-3 DOSEN PEMBIMBING */}
          <div className="bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-stone-800">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-12 right-12 w-48 h-48 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header Gamifikasi */}
            <div className="text-center relative z-10 max-w-xl mx-auto space-y-2 mb-8">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold tracking-wide">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>PODIUM KEPAKARAN DOSEN</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Top-3 Dosen Pembimbing Terpilih
              </h2>
              <p className="text-xs sm:text-sm text-stone-400">
                Berdasarkan derajat kemiripan bobot keahlian dengan judul penelitian yang diajukan.
              </p>
            </div>

            {/* Grid 3 Podium: Juara 2 (Kiri), Juara 1 (Tengah-Tinggi), Juara 3 (Kanan) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end max-w-4xl mx-auto relative z-10 pt-4">
              {/* JUARA 2 - PERAK (SILVER) */}
              {rank2 && (
                <div className="order-2 md:order-1 flex flex-col items-center">
                  <div className="w-full bg-stone-800/90 border border-slate-400/40 rounded-3xl p-5 shadow-lg backdrop-blur-xs flex flex-col items-center text-center space-y-3 relative hover:border-slate-300 transition-all">
                    {/* Badge Medali */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-slate-300 text-slate-900 font-extrabold text-[11px] shadow-sm">
                      <Medal className="w-3 h-3 text-slate-800" />
                      <span>PERINGKAT #2</span>
                    </div>

                    {/* Avatar Inisial */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md ring-4 ring-slate-300/30 mt-2">
                      {rank2.inisial}
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white leading-snug line-clamp-2">
                        {rank2.nama_dosen}
                      </h3>
                      <span className="inline-block px-2 py-0.5 bg-stone-700/80 text-stone-300 rounded text-[10px] font-semibold mt-1">
                        {rank2.kode_kk || 'DSI'}
                      </span>
                    </div>

                    {/* Rekomendasi Level */}
                    <div className="text-[11px] text-slate-300 font-medium">
                      ⭐⭐ Alternatif Kuat
                    </div>

                    {/* Kata Kunci Cocok */}
                    <div className="pt-2 border-t border-stone-700/80 w-full">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                        Kata Kunci Cocok:
                      </span>
                      <div className="flex flex-wrap justify-center gap-1">
                        {rank2.kata_kunci_cocok.slice(0, 3).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-400/20 text-slate-200 text-[10px] font-medium border border-slate-400/30">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Podium Base #2 */}
                  <div className="w-full h-16 bg-gradient-to-b from-slate-600 to-slate-800 rounded-b-2xl border-t border-slate-400/40 flex items-center justify-center shadow-inner mt-1">
                    <span className="font-black text-2xl text-slate-300/80">#2</span>
                  </div>
                </div>
              )}

              {/* JUARA 1 - EMAS (GOLD / CHAMPION) */}
              {rank1 && (
                <div className="order-1 md:order-2 flex flex-col items-center md:-mt-6">
                  <div className="w-full bg-gradient-to-b from-amber-950/70 via-stone-800/95 to-stone-900 border-2 border-amber-400/80 rounded-3xl p-6 shadow-2xl shadow-amber-500/20 backdrop-blur-xs flex flex-col items-center text-center space-y-3 relative hover:scale-102 transition-transform">
                    {/* Crown Floating Icon */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <Crown className="w-9 h-9 text-amber-400 fill-amber-400 drop-shadow-md animate-bounce" />
                    </div>

                    {/* Badge Juara 1 */}
                    <div className="inline-flex items-center space-x-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-stone-950 font-black text-xs shadow-md mt-2">
                      <Trophy className="w-3.5 h-3.5 text-stone-950" />
                      <span>#1 REKOMENDASI UTAMA</span>
                    </div>

                    {/* Avatar Inisial */}
                    <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 text-stone-950 font-black text-2xl flex items-center justify-center shadow-lg ring-4 ring-amber-300/60">
                      {rank1.inisial}
                    </div>

                    <div>
                      <h3 className="font-extrabold text-base text-amber-200 leading-snug line-clamp-2">
                        {rank1.nama_dosen}
                      </h3>
                      <span className="inline-block px-2.5 py-0.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded text-[11px] font-bold mt-1">
                        {rank1.kode_kk || 'DSI'}
                      </span>
                    </div>

                    {/* Rekomendasi Level */}
                    <div className="text-xs text-amber-300 font-bold flex items-center justify-center space-x-1">
                      <span>⭐⭐⭐</span>
                      <span>Kecocokan Tertinggi</span>
                    </div>

                    {/* Kata Kunci Cocok */}
                    <div className="pt-2 border-t border-amber-500/30 w-full">
                      <span className="text-[10px] uppercase font-bold text-amber-300/80 block mb-1">
                        Kata Kunci Cocok Terkuat:
                      </span>
                      <div className="flex flex-wrap justify-center gap-1.5">
                        {rank1.kata_kunci_cocok.slice(0, 4).map((kw, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded bg-amber-400/25 text-amber-200 text-[10px] font-semibold border border-amber-400/40">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Podium Base #1 (Tertinggi) */}
                  <div className="w-full h-24 bg-gradient-to-b from-amber-500 via-amber-600 to-yellow-700 rounded-b-2xl border-t border-amber-300 flex flex-col items-center justify-center shadow-lg mt-1 text-stone-950">
                    <Trophy className="w-5 h-5 opacity-80" />
                    <span className="font-black text-3xl">#1</span>
                  </div>
                </div>
              )}

              {/* JUARA 3 - PERUNGGU (BRONZE) */}
              {rank3 && (
                <div className="order-3 md:order-3 flex flex-col items-center">
                  <div className="w-full bg-stone-800/90 border border-copper-500/40 rounded-3xl p-5 shadow-lg backdrop-blur-xs flex flex-col items-center text-center space-y-3 relative hover:border-copper-400 transition-all">
                    {/* Badge Medali */}
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center space-x-1 px-3 py-0.5 rounded-full bg-copper-400 text-stone-950 font-extrabold text-[11px] shadow-sm">
                      <Award className="w-3 h-3 text-stone-950" />
                      <span>PERINGKAT #3</span>
                    </div>

                    {/* Avatar Inisial */}
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-copper-500 to-amber-700 text-white font-extrabold text-xl flex items-center justify-center shadow-md ring-4 ring-copper-400/30 mt-2">
                      {rank3.inisial}
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white leading-snug line-clamp-2">
                        {rank3.nama_dosen}
                      </h3>
                      <span className="inline-block px-2 py-0.5 bg-stone-700/80 text-stone-300 rounded text-[10px] font-semibold mt-1">
                        {rank3.kode_kk || 'DSI'}
                      </span>
                    </div>

                    {/* Rekomendasi Level */}
                    <div className="text-[11px] text-copper-300 font-medium">
                      ⭐ Alternatif Relevan
                    </div>

                    {/* Kata Kunci Cocok */}
                    <div className="pt-2 border-t border-stone-700/80 w-full">
                      <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">
                        Kata Kunci Cocok:
                      </span>
                      <div className="flex flex-wrap justify-center gap-1">
                        {rank3.kata_kunci_cocok.slice(0, 3).map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-copper-400/20 text-copper-200 text-[10px] font-medium border border-copper-400/30">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Podium Base #3 */}
                  <div className="w-full h-12 bg-gradient-to-b from-stone-700 to-stone-850 rounded-b-2xl border-t border-copper-500/30 flex items-center justify-center shadow-inner mt-1">
                    <span className="font-black text-2xl text-copper-400/80">#3</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Button to Scroll down to details */}
            <div className="text-center pt-8 relative z-10">
              <button
                type="button"
                onClick={scrollToCards}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
              >
                <span>Lihat rincian riwayat bimbingan & publikasi lengkap</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>
          </div>

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
          <div id="detailed-cards" className="space-y-4 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-600 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <span>Kartu Rincian Kepakaran Top-3 Dosen Pembimbing</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.rekomendasi.map((lecturer) => (
                <LecturerCard key={lecturer.id_dosen} lecturer={lecturer} />
              ))}
            </div>
          </div>

          {/* Tabel Perbandingan Ringkas */}
          <div className="bg-white rounded-3xl border border-stone-200 shadow-xs p-6 overflow-x-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-700 mb-4 flex items-center space-x-2">
              <Layers className="w-4 h-4 text-brand-600" />
              <span>Tabel Perbandingan 3 Rekomendasi Dosen</span>
            </h3>
            <table className="w-full text-left text-xs border-collapse">
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
                    <td className="py-3 px-3 font-semibold text-stone-800">{lecturer.nama_dosen}</td>
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
  );
};
