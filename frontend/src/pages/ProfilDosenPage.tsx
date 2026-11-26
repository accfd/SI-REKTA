import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  FileText,
  Tag,
  CheckCircle2,
  Search,
  Calendar,
  UserCheck,
  Share2,
  Check,
  AlertCircle,
  Sparkles,
  Award,
} from 'lucide-react';
import type { LecturerDetailResponse } from '../types';
import { api } from '../services/api';
import { LecturerAvatar } from '../components/LecturerAvatar';
import {
  findDosenBySlug,
  getDosenProfilePath,
  type LecturerProfileContext,
} from '../utils/lecturerSlug';

interface ProfilDosenPageProps {
  slug: string;
  context?: LecturerProfileContext | null;
  onBack: () => void;
  onGoToCari: () => void;
}

export const ProfilDosenPage: React.FC<ProfilDosenPageProps> = ({
  slug,
  context,
  onBack,
  onGoToCari,
}) => {
  const [detail, setDetail] = useState<LecturerDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeDocTab, setActiveDocTab] = useState<'ta' | 'publikasi'>('ta');
  const [docSearch, setDocSearch] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      try {
        setLoading(true);
        setErrorMsg(null);
        setDocSearch('');

        let targetId = context?.idDosen;
        if (!targetId) {
          const allDosen = await api.getAllDosen();
          const matched = findDosenBySlug(allDosen, slug);
          if (!matched) {
            if (!cancelled) {
              setDetail(null);
              setErrorMsg('Profil dosen tidak ditemukan untuk tautan yang diminta.');
            }
            return;
          }
          targetId = matched.id_dosen;
        }

        const data = await api.getLecturerDetail(targetId);
        if (!cancelled) {
          setDetail(data);
          if (data.tugas_akhir.length === 0 && data.publikasi.length > 0) {
            setActiveDocTab('publikasi');
          } else {
            setActiveDocTab('ta');
          }
        }
      } catch (err) {
        console.error('Gagal memuat profil dosen', err);
        if (!cancelled) {
          setErrorMsg('Gagal memuat detail profil dosen. Pastikan server backend dan database berjalan.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadProfile();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      cancelled = true;
    };
  }, [slug, context?.idDosen]);

  const handleCopyLink = async () => {
    try {
      const url = detail
        ? `${window.location.origin}${getDosenProfilePath(detail.nama_lengkap)}`
        : window.location.href;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Abaikan jika clipboard API diblokir browser
    }
  };

  const backLabel =
    context?.sourceTab === 'cari'
      ? 'Kembali ke Hasil Rekomendasi'
      : context?.sourceTab === 'history'
      ? 'Kembali ke Riwayat Pencarian'
      : 'Kembali ke Daftar Dosen';

  const filteredTA =
    detail?.tugas_akhir.filter(
      (item) =>
        item.judul_ta.toLowerCase().includes(docSearch.toLowerCase()) ||
        (item.nama_mahasiswa && item.nama_mahasiswa.toLowerCase().includes(docSearch.toLowerCase())) ||
        (item.tahun && item.tahun.toString().includes(docSearch))
    ) || [];

  const filteredPub =
    detail?.publikasi.filter(
      (item) =>
        item.judul_publikasi.toLowerCase().includes(docSearch.toLowerCase()) ||
        (item.tahun && item.tahun.toString().includes(docSearch))
    ) || [];

  const matchedKeywords = context?.matchedKeywords || [];
  const totalTA = detail ? detail.tugas_akhir.length : 0;
  const totalPub = detail ? detail.publikasi.length : 0;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-stone-700 bg-white border border-stone-200 hover:bg-stone-100 shadow-2xs active:scale-95 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 shrink-0" />
          <span>{backLabel}</span>
        </button>

        {detail && (
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-600 bg-white border border-stone-200 hover:bg-stone-50 shadow-2xs transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Tautan Disalin!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-stone-500" />
                <span>Salin Tautan Profil</span>
              </>
            )}
          </button>
        )}
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 sm:p-20 text-center space-y-3 shadow-xs">
          <div className="w-9 h-9 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-stone-500">Memuat profil dan rekam jejak karya dosen...</p>
        </div>
      ) : errorMsg || !detail ? (
        <div className="bg-white rounded-3xl border border-red-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div className="max-w-md mx-auto space-y-1">
            <h2 className="text-lg font-bold text-stone-900">Profil Dosen Tidak Ditemukan</h2>
            <p className="text-xs sm:text-sm text-stone-500">{errorMsg}</p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{backLabel}</span>
          </button>
        </div>
      ) : (
        <>
          {/* Hero Header Profil Dosen */}
          <section className="rounded-3xl bg-brand-900 text-white p-5 sm:p-8 shadow-lg overflow-hidden relative">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <LecturerAvatar
                idDosen={detail.id_dosen}
                nama={detail.nama_lengkap}
                inisial={detail.inisial}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 text-white font-extrabold text-2xl sm:text-3xl border-2 border-white/20 shadow-md shrink-0"
              />

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {context?.peringkat && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-white text-brand-900 shadow-xs">
                      <Award className="w-3.5 h-3.5 mr-1 text-copper-600" />
                      Rekomendasi Peringkat #{context.peringkat}
                    </span>
                  )}
                  {detail.kode_kk && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-copper-500 text-white">
                      {detail.kode_kk}
                    </span>
                  )}
                  {detail.is_publikasi_only && (
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-purple-500 text-white">
                      Profil dari publikasi
                    </span>
                  )}
                </div>

                <h1 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug break-words">
                  {detail.nama_lengkap}
                </h1>

                {detail.nama_kk && (
                  <p className="text-xs sm:text-sm text-copper-200 font-medium">
                    Kelompok Keahlian: {detail.nama_kk}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Kartu Ringkasan Statistik */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs flex items-center space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-brand-50 text-brand-700 border border-brand-100 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-500">Riwayat Bimbingan TA</div>
                <div className="text-2xl font-extrabold text-stone-900">{totalTA} judul</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs flex items-center space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-copper-50 text-copper-700 border border-copper-100 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-500">Publikasi Ilmiah</div>
                <div className="text-2xl font-extrabold text-stone-900">{totalPub} artikel</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-xs flex items-center space-x-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-stone-500">Total Dokumen Referensi</div>
                <div className="text-2xl font-extrabold text-stone-900">{totalTA + totalPub} dokumen</div>
              </div>
            </div>
          </section>

          {/* Sorotan Kata Kunci Cocok (jika diakses dari hasil rekomendasi / history) */}
          {matchedKeywords.length > 0 && (
            <section className="bg-brand-50/80 p-5 sm:p-6 rounded-3xl border border-brand-200 space-y-3">
              <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-brand-900">
                <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0" />
                <span>Kata Kunci yang Cocok dengan Topik Anda</span>
              </div>
              {context?.queryTitle && (
                <p className="text-xs text-stone-600">
                  Berdasarkan kueri judul: <strong className="text-stone-800">"{context.queryTitle}"</strong>
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {matchedKeywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white text-brand-700 border border-brand-200 shadow-2xs"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Fokus Bidang & Kata Kunci Keahlian */}
          <section className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-200/90 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-stone-800">
              <Tag className="w-4 h-4 text-copper-600 shrink-0" />
              <span>Fokus Bidang &amp; Kata Kunci Keahlian</span>
            </div>
            {detail.kata_kunci.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {detail.kata_kunci.map((kw, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200/70"
                  >
                    {kw}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-400">Belum ada kata kunci keahlian yang tercatat.</p>
            )}
          </section>

          {/* Daftar Riwayat Bimbingan TA & Publikasi Ilmiah */}
          <section className="bg-white rounded-3xl border border-stone-200/90 shadow-xs overflow-hidden">
            {/* Subheader: Tabs & Search */}
            <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveDocTab('ta')}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDocTab === 'ta'
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  <span>Riwayat Bimbingan TA ({totalTA})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveDocTab('publikasi')}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeDocTab === 'publikasi'
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Publikasi Ilmiah ({totalPub})</span>
                </button>
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder={`Cari judul ${activeDocTab === 'ta' ? 'TA' : 'publikasi'}...`}
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-200 bg-white text-xs focus:ring-2 focus:ring-brand-100 focus:border-brand-500"
                />
              </div>
            </div>

            {/* List Container */}
            <div className="p-4 sm:p-6 space-y-3">
              {activeDocTab === 'ta' ? (
                filteredTA.length === 0 ? (
                  <div className="text-center py-12 text-stone-400 text-sm">
                    {totalTA === 0
                      ? 'Dosen ini belum memiliki riwayat pembimbingan tugas akhir (Profil berbasis data publikasi ilmiah).'
                      : 'Tidak ada judul tugas akhir yang sesuai dengan pencarian.'}
                  </div>
                ) : (
                  filteredTA.map((item, idx) => (
                    <div
                      key={item.id_ta}
                      className="bg-white p-4 rounded-2xl border border-stone-200/90 shadow-2xs hover:border-brand-200 transition-colors"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
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

                        <h3 className="font-bold text-stone-900 text-sm leading-snug break-words">
                          {item.judul_ta}
                        </h3>

                        {(item.nama_mahasiswa || item.nim) && (
                          <div className="flex items-center space-x-2 text-xs text-stone-500">
                            <UserCheck className="w-3.5 h-3.5 text-stone-400 shrink-0" />
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
              ) : filteredPub.length === 0 ? (
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
                    <div className="space-y-1 flex-1 min-w-0">
                      <h3 className="font-bold text-stone-900 text-sm leading-snug break-words">
                        {pub.judul_publikasi}
                      </h3>
                      {pub.tahun && (
                        <span className="inline-flex items-center space-x-1 text-stone-400 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>Tahun Publikasi: {pub.tahun}</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Section + Quick CTA */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-stone-500">
                Menampilkan {activeDocTab === 'ta' ? filteredTA.length : filteredPub.length} dari{' '}
                {activeDocTab === 'ta' ? totalTA : totalPub} dokumen
              </span>
              <button
                type="button"
                onClick={onGoToCari}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-xs transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-copper-300" />
                <span>Cari Kecocokan Topik Lainnya</span>
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
