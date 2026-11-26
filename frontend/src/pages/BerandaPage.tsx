import React from 'react';
import { Search, BookOpen, Users, FileText, ArrowRight, CheckCircle2, Cpu, Sparkles, BarChart3 } from 'lucide-react';

interface BerandaPageProps {
  setActiveTab: (tab: string) => void;
  onSelectSampleTitle: (title: string) => void;
}

export const BerandaPage: React.FC<BerandaPageProps> = ({ setActiveTab, onSelectSampleTitle }) => {
  // Konfigurasi gambar untuk 3 Stats Card.
  // Cara ganti gambar: simpan file gambar di folder `frontend/public/assets/`
  // lalu isi properti `image` di bawah ini (contoh: '/assets/dosen.png').
  // Jika dikosongkan (''), tampilan akan memakai ilustrasi bawaan.
  const statsCards = [
    {
      id: 'dosen',
      title: '17 Dosen DSI Terdaftar',
      description: 'Mencakup 4 Kelompok Keahlian yang aktif membimbing tugas akhir mahasiswa.',
      image: '/assets/fti.jpeg',
    },
    {
      id: 'bimbingan',
      title: '707 Riwayat Bimbingan TA',
      description: 'Dataset tugas akhir terdahulu sebagai referensi pencocokan topik penelitian.',
      image: '/assets/dataset.jpg',
    },
    {
      id: 'publikasi',
      title: '610 Publikasi Ilmiah',
      description: 'Karya ilmiah dosen terindeks untuk memperkaya akurasi rekomendasi pembimbing.',
      image: '/assets/publikasi.jpg',
    },
  ];

  const sampleTitles = [
    'Pembangunan Aplikasi Mobile GIS Wisata Sejarah Provinsi Sumatera Barat Berbasis Android',
    'Analisis Sentimen Opini Publik Mengenai Kebijakan Kampus Menggunakan Algoritma Machine Learning',
    'Perancangan Enterprise Architecture Sistem Informasi Pelayanan Rumah Sakit Menggunakan TOGAF ADM'
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-stone-200/90 shadow-xl px-5 py-10 sm:px-12 sm:py-20">
        {/* Subtle Dot-Grid Background */}
        <div
          className="absolute inset-0 opacity-45 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#d4b3ac 1.25px, transparent 1.25px)',
            backgroundSize: '22px 22px',
          }}
        />
        {/* Soft Center Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0, 0, 0, 0.92)_35%,rgba(250,245,244,0.45)_100%)] pointer-events-none" />

        {/* Subtle Dotted Connecting Lines (Desktop) */}
        <svg
          viewBox="0 0 1000 500"
          className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none opacity-40"
          preserveAspectRatio="none"
        >
          <path d="M500 95 L230 95 L130 55" fill="none" stroke="#bc8a80" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M230 95 L135 200" fill="none" stroke="#bc8a80" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M500 95 L770 95 L870 55" fill="none" stroke="#bc8a80" strokeWidth="1.5" strokeDasharray="4 6" />
          <path d="M770 95 L865 200" fill="none" stroke="#bc8a80" strokeWidth="1.5" strokeDasharray="4 6" />
        </svg>

        {/* Floating Mini Cards - Left Top & Mid (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-10 left-8 z-10 bg-white/95 backdrop-blur-xs border border-stone-200/90 rounded-2xl px-3.5 py-2.5 shadow-md">
          <div className="w-8 h-8 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-stone-800">TF-IDF N-Gram</div>
            <div className="text-[10px] text-stone-400">8.332 Fitur Teks</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 absolute top-36 left-12 z-10 bg-white/95 backdrop-blur-xs border border-stone-200/90 rounded-2xl px-3.5 py-2.5 shadow-md">
          <div className="w-8 h-8 rounded-xl bg-copper-50 border border-copper-100 flex items-center justify-center text-copper-600">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-stone-800">Pembersihan Teks</div>
            <div className="text-[10px] text-stone-400">Normalisasi &amp; Frasa</div>
          </div>
        </div>

        {/* Floating Mini Cards - Right Top & Mid (Desktop) */}
        <div className="hidden lg:flex items-center gap-2.5 absolute top-10 right-8 z-10 bg-white/95 backdrop-blur-xs border border-stone-200/90 rounded-2xl px-3.5 py-2.5 shadow-md">
          <div className="w-8 h-8 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-700">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-stone-800">Cosine Similarity</div>
            <div className="text-[10px] text-stone-400">17 Profil Dosen DSI</div>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2.5 absolute top-36 right-12 z-10 bg-white/95 backdrop-blur-xs border border-stone-200/90 rounded-2xl px-3.5 py-2.5 shadow-md">
          <div className="w-8 h-8 rounded-xl bg-copper-50 border border-copper-100 flex items-center justify-center text-copper-600">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-stone-800">4 Kelompok Keahlian</div>
            <div className="text-[10px] text-stone-400">Terindeks Akademik</div>
          </div>
        </div>

        {/* Floating Tilted Preview Card - Bottom Left (Desktop) */}
        <div className="hidden xl:block absolute -bottom-5 left-6 z-10 w-60 -rotate-3 bg-white rounded-2xl border border-stone-200/90 shadow-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700">Top-3 Rekomendasi</span>
            <span className="px-1.5 py-0.5 rounded-md bg-brand-50 text-brand-700 text-[10px] font-bold">Instan</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-brand-50/70 border border-brand-100">
              <span className="text-[11px] font-semibold text-stone-800">#1 Pembimbing Utama</span>
              <span className="w-2 h-2 rounded-full bg-brand-600" />
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <span className="text-[11px] font-medium text-stone-600">#2 Alternatif Relevan</span>
              <span className="w-2 h-2 rounded-full bg-copper-500" />
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-stone-50 border border-stone-200/70">
              <span className="text-[11px] font-medium text-stone-600">#3 Alternatif Relevan</span>
              <span className="w-2 h-2 rounded-full bg-brand-300" />
            </div>
          </div>
        </div>

        {/* Floating Tilted Preview Card - Bottom Right (Desktop) */}
        <div className="hidden xl:block absolute -bottom-5 right-6 z-10 w-60 rotate-3 bg-white rounded-2xl border border-stone-200/90 shadow-lg p-3.5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Evaluasi Model</span>
            <span className="px-1.5 py-0.5 rounded-md bg-copper-50 text-copper-700 text-[10px] font-bold">79.65%</span>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[10px] text-stone-600 mb-1">
                <span>Hit Rate@3</span>
                <span className="font-bold text-brand-700">79.65%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full w-[80%] rounded-full bg-brand-600" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] text-stone-600 mb-1">
                <span>Recall@3</span>
                <span className="font-bold text-copper-600">75.22%</span>
              </div>
              <div className="h-1.5 rounded-full bg-stone-100 overflow-hidden">
                <div className="h-full w-[75%] rounded-full bg-copper-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Center Hero Content */}
        <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Center Logo Badge */}
          <div className="w-16 h-16 rounded-2xl bg-white border border-stone-200/90 shadow-lg p-2.5 flex items-center justify-center mb-7">
            <img
              src="/logo.png"
              alt="SI-REKTA Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-stone-900">
            Temukan Dosen Pembimbing
            <span className="block text-brand-600 mt-1">
              Tugas Akhir yang Tepat
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
            SI-REKTA menganalisis judul dan rencana penelitian Anda terhadap riwayat bimbingan tugas akhir dan publikasi ilmiah 17 dosen Departemen Sistem Informasi untuk merekomendasikan pembimbing yang paling relevan.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('cari')}
              className="inline-flex items-center justify-center space-x-2.5 px-6 sm:px-7 py-3.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-lg shadow-brand-600/25 active:scale-95 transition-all cursor-pointer"
            >
              <Search className="w-4 h-4 shrink-0" />
              <span>Cari Dosen Sekarang</span>
              <ArrowRight className="w-4 h-4 shrink-0 opacity-85" />
            </button>
            <button
              onClick={() => setActiveTab('pedoman')}
              className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-brand-600 shrink-0" />
              <span>Lihat Dokumen Pedoman</span>
            </button>
          </div>

          <p className="mt-3 text-[11px] text-stone-400">
            Rekomendasi instan berbasis TF-IDF &amp; Cosine Similarity.
          </p>
        </div>
      </section>

      {/* 3 Angka Ringkasan (Gaya Stats Card) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statsCards.map((card) => (
          <div key={card.id} className="bg-white rounded-2xl border border-stone-200/90 shadow-xs p-3 flex flex-col">
            {card.image ? (
              <div className="h-44 rounded-xl overflow-hidden bg-brand-50">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : card.id === 'dosen' ? (
              <div className="h-44 rounded-xl bg-gradient-to-b from-brand-200/75 via-brand-100/50 to-brand-50/20 relative overflow-hidden p-4 flex flex-col items-center justify-center gap-2.5">
                <div className="absolute top-3 left-4 w-6 h-6 rounded-md bg-white/80 shadow-2xs flex items-center justify-center text-brand-700">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-md bg-white/80 shadow-2xs flex items-center justify-center text-copper-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="w-44 bg-white rounded-lg shadow-xs border border-brand-100 px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-600 shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-700 truncate">17 Dosen Aktif</span>
                </div>
                <div className="w-36 bg-white rounded-lg shadow-xs border border-brand-100 px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-copper-500 shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-700 truncate">4 Kel. Keahlian</span>
                </div>
                <div className="w-28 bg-white rounded-lg shadow-xs border border-brand-100 px-3 py-1.5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                  <span className="text-[11px] font-semibold text-stone-700 truncate">Terindeks</span>
                </div>
              </div>
            ) : card.id === 'bimbingan' ? (
              <div className="h-44 rounded-xl bg-gradient-to-b from-copper-200/70 via-copper-100/45 to-copper-50/20 relative overflow-hidden p-3.5 flex items-center justify-center">
                <div className="w-full h-full bg-white/65 backdrop-blur-xs rounded-xl border border-white/80 p-3 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-lg font-extrabold text-brand-900 leading-none">707</div>
                      <div className="text-[10px] font-medium text-stone-500 mt-0.5">Riwayat TA</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-copper-100 text-copper-800 text-[10px] font-bold">
                      Dataset TA
                    </span>
                  </div>
                  <svg viewBox="0 0 200 70" className="w-full h-16 overflow-visible">
                    <line x1="190" y1="12" x2="190" y2="65" stroke="#c5694b" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.5" />
                    <polyline
                      fill="none"
                      stroke="#6d302d"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="8,56 52,32 96,44 142,28 190,12"
                    />
                    <circle cx="190" cy="12" r="4" fill="#b5573b" stroke="#fff" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="h-44 rounded-xl bg-gradient-to-b from-brand-200/75 via-brand-100/50 to-brand-50/20 relative overflow-hidden p-4 flex items-center justify-center">
                <svg viewBox="0 0 220 140" className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="110" y1="70" x2="55" y2="35" stroke="#bc8a80" strokeWidth="1.5" />
                  <line x1="110" y1="70" x2="170" y2="38" stroke="#bc8a80" strokeWidth="1.5" />
                  <line x1="110" y1="70" x2="45" y2="95" stroke="#bc8a80" strokeWidth="1.5" />
                  <line x1="110" y1="70" x2="165" y2="105" stroke="#bc8a80" strokeWidth="1.5" />
                </svg>
                <div className="relative z-10 w-10 h-10 rounded-full bg-brand-600 text-white shadow-md flex items-center justify-center border-2 border-white">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="absolute top-5 left-10 w-8 h-8 rounded-lg bg-white shadow-xs border border-brand-100 flex items-center justify-center text-brand-700">
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
                <div className="absolute top-6 right-9 w-8 h-8 rounded-lg bg-white shadow-xs border border-brand-100 flex items-center justify-center text-copper-600">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-6 left-8 w-8 h-8 rounded-lg bg-white shadow-xs border border-brand-100 flex items-center justify-center text-copper-700">
                  <Search className="w-3.5 h-3.5" />
                </div>
                <div className="absolute bottom-5 right-10 w-8 h-8 rounded-lg bg-white shadow-xs border border-brand-100 flex items-center justify-center text-brand-600">
                  <Cpu className="w-3.5 h-3.5" />
                </div>
              </div>
            )}

            <div className="px-2 pt-4 pb-2">
              <h3 className="text-lg font-bold text-stone-900">{card.title}</h3>
              <p className="text-xs text-stone-500 leading-relaxed mt-1.5">{card.description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Alur Cara Kerja */}
      <section className="py-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900">Cara Kerja SI-REKTA</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Kartu 01 */}
          <div className="bg-[#323232] text-white p-8 rounded-3xl shadow-md min-h-[290px] flex flex-col justify-between">
            <div className="flex justify-end">
              <span className="text-4xl font-bold text-white/90 tracking-tight">01</span>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white leading-snug mb-3">
                Tulis<br />Judul Skripsi
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed">
                Masukkan draft rencana judul atau rumusan topik tugas akhir ke dalam formulir pencarian cerdas.
              </p>
            </div>
          </div>

          {/* Kartu 02 */}
          <div className="bg-white text-stone-900 p-8 rounded-3xl border border-stone-200/70 shadow-md min-h-[290px] flex flex-col justify-between">
            <div className="flex justify-end">
              <span className="text-4xl font-bold text-stone-900 tracking-tight">02</span>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-stone-900 leading-snug mb-3">
                Analisis Topik Relevan
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                Sistem membandingkan korpus riwayat bimbingan &amp; publikasi dosen via TF-IDF &amp; Cosine Similarity secara instan.
              </p>
            </div>
          </div>

          {/* Kartu 03 */}
          <div className="bg-[#662b21] text-white p-8 rounded-3xl shadow-md min-h-[290px] flex flex-col justify-between">
            <div className="flex justify-end">
              <span className="text-4xl font-bold text-white/90 tracking-tight">03</span>
            </div>
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-white leading-snug mb-3">
                Lihat Tiga<br />Dosen Teratas
              </h3>
              <p className="text-sm text-stone-200 leading-relaxed">
                Dapatkan daftar rekomendasi Top-3 dosen pembimbing yang paling sesuai dengan fokus penelitian skripsimu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contoh Judul Cepat */}
      <section className="bg-white p-8 rounded-3xl border border-stone-200/90 shadow-xs">
        <h3 className="text-lg font-bold text-stone-900 mb-2">Coba Contoh Judul Ini Langsung:</h3>
        <p className="text-xs text-stone-500 mb-4">Klik salah satu judul di bawah untuk langsung mencoba rekomendasi:</p>
        <div className="space-y-2.5">
          {sampleTitles.map((t, idx) => (
            <div
              key={idx}
              onClick={() => {
                onSelectSampleTitle(t);
                setActiveTab('cari');
              }}
              className="group flex items-center justify-between p-3.5 rounded-2xl border border-stone-200 hover:border-brand-300 hover:bg-brand-50/50 cursor-pointer transition-all"
            >
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span className="text-sm font-medium text-stone-700 group-hover:text-brand-900">{t}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-brand-600 group-hover:translate-x-1 transition-all shrink-0 ml-2" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
