import React, { useState, useEffect } from 'react';
import { Users, Search, BookOpen, GraduationCap, Tag, ArrowRight, Filter } from 'lucide-react';
import type { DosenItem } from '../types';
import { api } from '../services/api';

interface DaftarDosenPageProps {
  onSelectLecturerTopic: (topicTitle: string) => void;
  setActiveTab: (tab: string) => void;
}

export const DaftarDosenPage: React.FC<DaftarDosenPageProps> = ({
  onSelectLecturerTopic,
  setActiveTab,
}) => {
  const [dosenList, setDosenList] = useState<DosenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<'nama' | 'ta' | 'pub'>('nama');
  const [selectedKk, setSelectedKk] = useState<string>('all');

  useEffect(() => {
    loadDosen();
  }, []);

  const loadDosen = async () => {
    try {
      setLoading(true);
      const data = await api.getAllDosen();
      setDosenList(data);
    } catch (e) {
      console.error('Gagal mengambil data dosen', e);
    } finally {
      setLoading(false);
    }
  };

  // Filter & Sort
  const filtered = dosenList
    .filter((d) => {
      const matchSearch =
        d.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (d.kode_kk && d.kode_kk.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.kata_kunci.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchKk = selectedKk === 'all' || d.kode_kk === selectedKk;
      return matchSearch && matchKk;
    })
    .sort((a, b) => {
      if (sortOption === 'ta') return b.jumlah_ta - a.jumlah_ta;
      if (sortOption === 'pub') return b.jumlah_publikasi - a.jumlah_publikasi;
      return a.nama_lengkap.localeCompare(b.nama_lengkap);
    });


  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Daftar Dosen Pembimbing DSI</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Eksplorasi 17 dosen pembimbing yang dicakup dalam model rekomendasi SI-REKTA beserta kelompok keahlian dan riwayat dokumen akademiknya.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari nama dosen atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Filter KK & Sort */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>KK:</span>
            <select
              value={selectedKk}
              onChange={(e) => setSelectedKk(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium bg-slate-50 focus:border-blue-500"
            >
              <option value="all">Semua KK</option>
              <option value="RD-BI">RD-BI (Data & BI)</option>
              <option value="SE">SE (Software Eng)</option>
              <option value="SD">SD (Sistem Digital)</option>
              <option value="TK-ITI">TK-ITI (Tata Kelola)</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-semibold">
            <span>Urutkan:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium bg-slate-50 focus:border-blue-500"
            >
              <option value="nama">Nama (A - Z)</option>
              <option value="ta">Riwayat TA Terbanyak</option>
              <option value="pub">Publikasi Terbanyak</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid Dosen */}
      {loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Memuat direktori 17 dosen...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="font-bold text-slate-800">Dosen tidak ditemukan</h3>
          <p className="text-xs text-slate-500 mt-1">Coba sesuaikan kata kunci pencarian atau filter kelompok keahlian.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <div
              key={d.id_dosen}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Header Kartu */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 font-extrabold flex items-center justify-center text-base border border-blue-100 shrink-0">
                    {d.inisial}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      {d.kode_kk && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                          {d.kode_kk}
                        </span>
                      )}
                      {d.is_publikasi_only && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          Profil dari publikasi
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base mt-1 leading-snug">
                      {d.nama_lengkap}
                    </h3>
                    {d.nama_kk && (
                      <p className="text-xs text-slate-500 mt-0.5">{d.nama_kk}</p>
                    )}
                  </div>
                </div>

                {/* Angka Bimbingan & Publikasi */}
                <div className="grid grid-cols-2 gap-2 my-3 p-2.5 bg-slate-50 rounded-xl text-center">
                  <div>
                    <div className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Riwayat TA</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-800 mt-0.5">{d.jumlah_ta}</div>
                  </div>
                  <div className="border-l border-slate-200">
                    <div className="text-xs text-slate-500 flex items-center justify-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Publikasi</span>
                    </div>
                    <div className="text-base font-extrabold text-slate-800 mt-0.5">{d.jumlah_publikasi}</div>
                  </div>
                </div>

                {/* Kata Kunci Keahlian */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 mb-1.5">
                    <Tag className="w-3 h-3" />
                    <span>Kata Kunci Keahlian:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {d.kata_kunci.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action: Cari dengan topik dosen ini */}
              <button
                type="button"
                onClick={() => {
                  const sampleKw = d.kata_kunci.slice(0, 3).join(' ');
                  const queryTopic = `Pembangunan Sistem Informasi dan Analisis Terkait ${sampleKw} Berbasis Web`;
                  onSelectLecturerTopic(queryTopic);
                  setActiveTab('cari');
                }}
                className="w-full mt-2 inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <span>Cari dengan topik dosen ini</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
