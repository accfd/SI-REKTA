import React from 'react';
import { Search, BookOpen, Users, FileText, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';

interface BerandaPageProps {
  setActiveTab: (tab: string) => void;
  onSelectSampleTitle: (title: string) => void;
}

export const BerandaPage: React.FC<BerandaPageProps> = ({ setActiveTab, onSelectSampleTitle }) => {
  const sampleTitles = [
    'Pembangunan Aplikasi Mobile GIS Wisata Sejarah Provinsi Sumatera Barat Berbasis Android',
    'Analisis Sentimen Opini Publik Mengenai Kebijakan Kampus Menggunakan Algoritma Machine Learning',
    'Perancangan Enterprise Architecture Sistem Informasi Pelayanan Rumah Sakit Menggunakan TOGAF ADM'
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-14 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold backdrop-blur-sm">
            <Cpu className="w-3.5 h-3.5 text-blue-400" />
            <span>Berbasis Text Mining (TF-IDF & Cosine Similarity)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Temukan Dosen Pembimbing Tugas Akhir yang Tepat
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            SI-REKTA menganalisis judul dan rencana penelitian Anda terhadap riwayat bimbingan tugas akhir dan publikasi ilmiah 17 dosen Departemen Sistem Informasi untuk merekomendasikan pembimbing yang paling relevan.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setActiveTab('cari')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-bold text-slate-900 bg-white hover:bg-slate-100 shadow-lg shadow-white/10 active:scale-95 transition-all"
            >
              <Search className="w-4 h-4 text-blue-600" />
              <span>Cari Dosen Sekarang</span>
            </button>
            <button
              onClick={() => setActiveTab('pedoman')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm active:scale-95 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Lihat Dokumen Pedoman</span>
            </button>
          </div>
        </div>

        {/* Decorative Grid Pattern */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
      </section>

      {/* 3 Angka Ringkasan */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">17</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Dosen DSI Terdaftar</p>
            <p className="text-xs text-slate-400 mt-1">Mencakup 4 Kelompok Keahlian</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">706</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Riwayat Bimbingan TA</p>
            <p className="text-xs text-slate-400 mt-1">Dataset tugas akhir terdahulu</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <div className="text-3xl font-extrabold text-slate-900">643</div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Publikasi Ilmiah</p>
            <p className="text-xs text-slate-400 mt-1">Karya ilmiah dosen terindeks</p>
          </div>
        </div>
      </section>

      {/* Alur Cara Kerja */}
      <section className="bg-slate-100/70 p-8 sm:p-10 rounded-3xl border border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">Alur Sistem</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">Bagaimana SI-REKTA Bekerja?</h2>
          <p className="text-sm text-slate-500 mt-2">Empat langkah mudah dari penulisan ide judul hingga rekomendasi siap pakai.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm mb-4">1</div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Tuliskan Judul TA</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Masukkan rencana judul tugas akhir minimal 6 kata dengan topik yang spesifik.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-4">2</div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Pembersihan Teks</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sistem melakukan lowercase, pembersihan tanda baca, URL, dan ekstraksi n-gram frasa.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm mb-4">3</div>
            <h3 className="font-bold text-slate-900 text-base mb-2">TF-IDF & Cosine Similarity</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Vektor judul dibandingkan dengan matriks profil gabungan seluruh 17 dosen DSI.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-sm mb-4">4</div>
            <h3 className="font-bold text-slate-900 text-base mb-2">Top-3 Rekomendasi</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sistem menampilkan 3 dosen paling relevan, kata kunci cocok, dan menyimpannya di riwayat lokal.
            </p>
          </div>
        </div>
      </section>

      {/* Contoh Judul Cepat */}
      <section className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Coba Contoh Judul Ini Langsung:</h3>
        <p className="text-xs text-slate-500 mb-4">Klik salah satu judul di bawah untuk langsung mencoba rekomendasi:</p>
        <div className="space-y-2.5">
          {sampleTitles.map((t, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectSampleTitle(t);
                setActiveTab('cari');
              }}
              className="group flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-900">{t}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
