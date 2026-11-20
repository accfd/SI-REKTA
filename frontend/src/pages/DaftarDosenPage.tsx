import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  BookOpen,
  GraduationCap,
  Tag,
  Filter,
  X,
  FileText,
  UserCheck,
  Calendar,
  Sparkles
} from 'lucide-react';
import type { DosenItem, LecturerDetailResponse } from '../types';
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

  // Detail Modal State
  const [selectedDosenId, setSelectedDosenId] = useState<number | null>(null);
  const [dosenDetail, setDosenDetail] = useState<LecturerDetailResponse | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [activeModalTab, setActiveModalTab] = useState<'ta' | 'publikasi'>('ta');
  const [modalSearch, setModalSearch] = useState('');

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

  const handleOpenDetail = async (idDosen: number) => {
    setSelectedDosenId(idDosen);
    setActiveModalTab('ta');
    setModalSearch('');
    try {
      setLoadingDetail(true);
      const detail = await api.getLecturerDetail(idDosen);
      setDosenDetail(detail);
      if (detail.tugas_akhir.length === 0 && detail.publikasi.length > 0) {
        setActiveModalTab('publikasi');
      }
    } catch (err) {
      console.error('Gagal memuat detail karya dosen', err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedDosenId(null);
    setDosenDetail(null);
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

  const filteredTA = dosenDetail?.tugas_akhir.filter((item) =>
    item.judul_ta.toLowerCase().includes(modalSearch.toLowerCase()) ||
    (item.nama_mahasiswa && item.nama_mahasiswa.toLowerCase().includes(modalSearch.toLowerCase())) ||
    (item.tahun && item.tahun.toString().includes(modalSearch))
  ) || [];

  const filteredPub = dosenDetail?.publikasi.filter((item) =>
    item.judul_publikasi.toLowerCase().includes(modalSearch.toLowerCase()) ||
    (item.tahun && item.tahun.toString().includes(modalSearch))
  ) || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">Daftar Dosen Pembimbing DSI</h1>
        <p className="text-sm text-stone-500 mt-1.5">
          Eksplorasi 17 dosen pembimbing yang dicakup dalam model rekomendasi. Klik pada kartu dosen untuk melihat seluruh riwayat judul tugas akhir yang pernah dibimbing dan karya publikasi ilmiahnya.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
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
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center space-x-1.5 text-xs text-stone-600 font-semibold">
            <Filter className="w-3.5 h-3.5 text-stone-400" />
            <span>KK:</span>
            <select
              value={selectedKk}
              onChange={(e) => setSelectedKk(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:border-brand-500"
            >
              <option value="all">Semua KK</option>
              <option value="RDBI">RDBI (Rekayasa Data dan BI)</option>
              <option value="SD">SD (System Development)</option>
              <option value="SE">SE (System Enterprise)</option>
              <option value="TKITI">TKITI (Tata Kelola ITI)</option>
            </select>
          </div>

          <div className="flex items-center space-x-1.5 text-xs text-stone-600 font-semibold">
            <span>Urutkan:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 text-xs font-medium bg-stone-50 focus:border-brand-500"
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
              className="bg-white rounded-3xl border border-stone-200/90 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Kartu */}
                <div className="flex items-start space-x-3.5 mb-3.5">
                  <div className="w-13 h-13 rounded-2xl bg-brand-50 text-brand-700 font-extrabold flex items-center justify-center text-lg border border-brand-100 shrink-0 group-hover:scale-105 transition-transform">
                    {d.inisial}
                  </div>
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

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => handleOpenDetail(d.id_dosen)}
                  className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-stone-500" />
                  <span>Lihat Seluruh Riwayat TA & Publikasi</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const sampleKw = d.kata_kunci.slice(0, 3).join(' ');
                    const queryTopic = `Pembangunan Sistem Informasi dan Analisis Terkait ${sampleKw} Berbasis Web`;
                    onSelectLecturerTopic(queryTopic);
                    setActiveTab('cari');
                  }}
                  className="w-full inline-flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 transition-colors border border-brand-200"
                >
                  <Sparkles className="w-3 h-3 text-copper-600" />
                  <span>Cari Rekomendasi Topik Dosen Ini</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAIL MODAL: DAFTAR SELURUH TA & PUBLIKASI DOSEN */}
      {selectedDosenId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-6 bg-brand-900 text-white flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-white font-extrabold text-xl flex items-center justify-center border border-white/20 shrink-0">
                  {dosenDetail?.inisial || 'DS'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    {dosenDetail?.kode_kk && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-copper-500 text-white">
                        {dosenDetail.kode_kk}
                      </span>
                    )}
                    {dosenDetail?.is_publikasi_only && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-purple-500 text-white">
                        Profil dari publikasi
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-white mt-1">
                    {dosenDetail?.nama_lengkap || 'Memuat...'}
                  </h2>
                  <p className="text-xs text-copper-200 mt-0.5">{dosenDetail?.nama_kk}</p>
                </div>
              </div>

              <button
                onClick={handleCloseDetail}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            {loadingDetail ? (
              <div className="text-center py-20">
                <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-stone-500">Mengambil seluruh riwayat judul TA dan publikasi...</p>
              </div>
            ) : dosenDetail ? (
              <div className="flex flex-col flex-1 overflow-hidden">
                {/* Modal Subheader: Tabs & Search */}
                <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Tabs */}
                  <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <button
                      onClick={() => setActiveModalTab('ta')}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeModalTab === 'ta'
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span>Riwayat Bimbingan TA ({dosenDetail.tugas_akhir.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveModalTab('publikasi')}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                        activeModalTab === 'publikasi'
                          ? 'bg-brand-600 text-white shadow-xs'
                          : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                      }`}
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Publikasi Ilmiah ({dosenDetail.publikasi.length})</span>
                    </button>
                  </div>

                  {/* Filter Search inside modal */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder={`Cari judul ${activeModalTab === 'ta' ? 'TA' : 'publikasi'}...`}
                      value={modalSearch}
                      onChange={(e) => setModalSearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 text-xs focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
                    />
                  </div>
                </div>

                {/* Tab Content List Container */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
                  {activeModalTab === 'ta' ? (
                    filteredTA.length === 0 ? (
                      <div className="text-center py-12 text-stone-400 text-sm">
                        {dosenDetail.tugas_akhir.length === 0
                          ? 'Dosen ini belum memiliki riwayat pembimbingan tugas akhir (Profil berbasis data publikasi ilmiah).'
                          : 'Tidak ada judul tugas akhir yang sesuai dengan pencarian.'}
                      </div>
                    ) : (
                      filteredTA.map((item, idx) => (
                        <div
                          key={item.id_ta}
                          className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-brand-200 transition-colors flex items-start justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="w-6 h-6 rounded-md bg-stone-100 text-stone-700 font-bold text-xs flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  item.posisi_pembimbing === 1
                                    ? 'bg-brand-50 text-brand-700 border border-brand-200'
                                    : 'bg-copper-50 text-copper-700 border border-copper-200'
                                }`}
                              >
                                Pembimbing {item.posisi_pembimbing}
                              </span>
                              {item.tahun && (
                                <span className="inline-flex items-center space-x-1 text-stone-400 text-xs">
                                  <Calendar className="w-3 h-3" />
                                  <span>{item.tahun}</span>
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-stone-900 text-sm leading-snug">
                              {item.judul_ta}
                            </h4>

                            {(item.nama_mahasiswa || item.nim) && (
                              <div className="flex items-center space-x-2 text-xs text-stone-500">
                                <UserCheck className="w-3.5 h-3.5 text-stone-400" />
                                <span>
                                  Mahasiswa: <strong className="text-stone-700">{item.nama_mahasiswa || '-'}</strong>
                                  {item.nim ? ` (${item.nim})` : ''}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )
                  ) : (
                    /* Tab Publikasi */
                    filteredPub.length === 0 ? (
                      <div className="text-center py-12 text-stone-400 text-sm">
                        Tidak ada publikasi yang sesuai dengan pencarian.
                      </div>
                    ) : (
                      filteredPub.map((pub, idx) => (
                        <div
                          key={pub.id_publikasi}
                          className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-copper-200 transition-colors flex items-start space-x-3"
                        >
                          <span className="w-6 h-6 rounded-md bg-copper-50 text-copper-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <div className="space-y-1 flex-1">
                            <h4 className="font-bold text-stone-900 text-sm leading-snug">
                              {pub.judul_publikasi}
                            </h4>
                            {pub.tahun && (
                              <span className="inline-flex items-center space-x-1 text-stone-400 text-xs">
                                <Calendar className="w-3 h-3" />
                                <span>Tahun Publikasi: {pub.tahun}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    )
                  )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
                  <span className="text-xs text-stone-500">
                    Total ditampilkan: {activeModalTab === 'ta' ? filteredTA.length : filteredPub.length} dokumen
                  </span>
                  <button
                    onClick={handleCloseDetail}
                    className="px-5 py-2 rounded-xl text-xs font-bold text-stone-700 bg-white border border-stone-200 hover:bg-stone-100"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
