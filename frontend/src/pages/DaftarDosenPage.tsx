import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  Tag,
  Filter,
  ArrowRight,
} from 'lucide-react';
import type { DosenItem } from '../types';
import { api } from '../services/api';
import { LecturerAvatar } from '../components/LecturerAvatar';

interface DaftarDosenPageProps {
  onSelectLecturerTopic: (topicTitle: string) => void;
  setActiveTab: (tab: string) => void;
  onOpenDosenProfile?: (dosen: DosenItem) => void;
}

export const DaftarDosenPage: React.FC<DaftarDosenPageProps> = ({
  onSelectLecturerTopic: _onSelectLecturerTopic,
  setActiveTab: _setActiveTab,
  onOpenDosenProfile,
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

  const handleCardClick = (d: DosenItem) => {
    if (onOpenDosenProfile) {
      onOpenDosenProfile(d);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">Daftar Dosen Pembimbing DSI</h1>
        <p className="text-sm text-stone-500 mt-1.5">
          Eksplorasi 17 dosen pembimbing yang dicakup dalam model rekomendasi. Klik pada kartu dosen untuk melihat seluruh riwayat judul tugas akhir yang pernah dibimbing dan karya publikasi ilmiahnya.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Cari nama dosen atau kata kunci..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-4 focus:ring-brand-100 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Filter KK & Sort */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 w-full lg:w-auto lg:justify-end">
          <div className="flex items-center justify-between sm:justify-start space-x-1.5 text-xs text-stone-600 font-semibold">
            <span className="inline-flex items-center space-x-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5 text-stone-400" />
              <span>KK:</span>
            </span>
            <select
              value={selectedKk}
              onChange={(e) => setSelectedKk(e.target.value)}
              className="flex-1 sm:flex-initial px-2.5 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:border-brand-500"
            >
              <option value="all">Semua KK</option>
              <option value="RDBI">RDBI (Rekayasa Data dan BI)</option>
              <option value="SD">SD (System Development)</option>
              <option value="SE">SE (System Enterprise)</option>
              <option value="TKITI">TKITI (Tata Kelola ITI)</option>
            </select>
          </div>

          <div className="flex items-center justify-between sm:justify-start space-x-1.5 text-xs text-stone-600 font-semibold">
            <span className="shrink-0">Urutkan:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as 'nama' | 'ta' | 'pub')}
              className="flex-1 sm:flex-initial px-2.5 py-2 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:border-brand-500"
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
          <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-stone-500">Memuat direktori 17 dosen...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-stone-200">
          <Users className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <h3 className="font-bold text-stone-800">Dosen tidak ditemukan</h3>
          <p className="text-xs text-stone-500 mt-1">Coba sesuaikan kata kunci pencarian atau filter kelompok keahlian.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((d) => (
            <div
              key={d.id_dosen}
              onClick={() => handleCardClick(d)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(d);
                }
              }}
              className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Header Kartu */}
                <div className="flex items-start space-x-3.5 mb-3.5">
                  <LecturerAvatar
                    idDosen={d.id_dosen}
                    nama={d.nama_lengkap}
                    inisial={d.inisial}
                    className="w-13 h-13 rounded-2xl bg-brand-50 text-brand-700 font-extrabold text-lg border border-brand-100 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      {d.kode_kk && (
                        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-stone-100 text-stone-700 border border-stone-200">
                          {d.kode_kk}
                        </span>
                      )}
                      {d.is_publikasi_only && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                          Profil dari publikasi
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-stone-900 text-base mt-1 leading-snug">
                      {d.nama_lengkap}
                    </h3>
                    {d.nama_kk && (
                      <p className="text-xs text-stone-500 mt-0.5">{d.nama_kk}</p>
                    )}
                  </div>
                </div>

                {/* Angka Bimbingan & Publikasi */}
                <div className="grid grid-cols-2 gap-2 my-3 p-3 bg-stone-50 rounded-2xl text-center">
                  <div>
                    <div className="text-xs text-stone-500 flex items-center justify-center space-x-1">
                      <GraduationCap className="w-3.5 h-3.5 text-brand-600" />
                      <span>Riwayat TA</span>
                    </div>
                    <div className="text-base font-extrabold text-stone-800 mt-0.5">{d.jumlah_ta} judul</div>
                  </div>
                  <div className="border-l border-stone-200">
                    <div className="text-xs text-stone-500 flex items-center justify-center space-x-1">
                      <BookOpen className="w-3.5 h-3.5 text-copper-600" />
                      <span>Publikasi</span>
                    </div>
                    <div className="text-base font-extrabold text-stone-800 mt-0.5">{d.jumlah_publikasi} artikel</div>
                  </div>
                </div>

                {/* Kata Kunci Keahlian */}
                <div className="mb-4">
                  <div className="flex items-center space-x-1 text-[11px] font-semibold text-stone-500 mb-1.5">
                    <Tag className="w-3 h-3" />
                    <span>Kata Kunci Keahlian:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {d.kata_kunci.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 text-stone-600"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-brand-700 group-hover:text-brand-900">
                <span>Lihat Profil &amp; Karya Lengkap</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
