import React, { useState } from 'react';
import { History, Trash2, ArrowLeft, RotateCcw, AlertTriangle, Calendar, Clock, Search, ShieldCheck } from 'lucide-react';
import type { HistoryItem } from '../types';
import { LecturerCard } from '../components/LecturerCard';

interface HistoryPageProps {
  history: HistoryItem[];
  onDeleteOne: (id: string) => void;
  onClearAll: () => void;
  onSearchAgain: (title: string) => void;
  setActiveTab: (tab: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onDeleteOne,
  onClearAll,
  onSearchAgain,
  setActiveTab,
}) => {
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return {
        date: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        time: d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
    } catch {
      return { date: isoString, time: '' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Riwayat Pencarian Rekomendasi</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Daftar seluruh pencarian judul tugas akhir yang tersimpan secara lokal di browser Anda.
        </p>
      </div>

      {/* Banner Privasi Local Storage */}
      <div className="flex items-start space-x-3 p-4 rounded-2xl bg-brand-50/70 border border-brand-200/80 text-brand-900 text-xs">
        <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Privasi Penyimpanan:</span> Riwayat pencarian ini hanya disimpan pada Local Storage di browser perangkat Anda, tanpa akun dan tanpa database cloud. Menghapus data/cache browser atau menggunakan jendela penyamaran (Incognito) akan menghapus riwayat ini.
        </div>
      </div>

      {/* DETAIL SNAPSHOT VIEW */}
      {selectedHistory ? (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedHistory(null)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  Snapshot Hasil Tersimpan
                </span>
                <h2 className="text-lg font-bold text-slate-900 mt-0.5">"{selectedHistory.search_title}"</h2>
                <p className="text-xs text-slate-400">
                  Waktu: {formatDate(selectedHistory.timestamp).date} pukul {formatDate(selectedHistory.timestamp).time} WIB
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => onSearchAgain(selectedHistory.search_title)}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 shadow-sm shadow-brand-600/20"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Cari Ulang dengan Judul Ini</span>
              </button>
              <button
                onClick={() => {
                  onDeleteOne(selectedHistory.id);
                  setSelectedHistory(null);
                }}
                className="p-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200"
                title="Hapus riwayat ini"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 3 Kartu Dosen Hasil Snapshot */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedHistory.results.map((lecturer) => (
              <LecturerCard key={lecturer.id_dosen} lecturer={lecturer} />
            ))}
          </div>
        </div>
      ) : (
        /* DAFTAR RIWAYAT */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total {history.length} Riwayat Tersimpan
            </span>
            {history.length > 0 && (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Semua Riwayat</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <History className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Belum Ada Riwayat Pencarian</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  Setiap kali Anda mencari rekomendasi dosen untuk judul tugas akhir, hasilnya akan otomatis tersimpan di sini.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('cari')}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-white bg-brand-600 hover:bg-brand-700 text-xs shadow-md shadow-brand-500/20"
              >
                <Search className="w-4 h-4" />
                <span>Mulai Cari Dosen Sekarang</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item) => {
                const { date, time } = formatDate(item.timestamp);
                return (
                  <div
                    key={item.id}
                    className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-medium">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{date}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{time} WIB</span>
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                        "{item.search_title}"
                      </h3>

                      {/* Chips 3 Dosen Rekomendasi */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {item.results.map((rec) => (
                          <span
                            key={rec.id_dosen}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            <span className="font-bold text-brand-600 mr-1">#{rec.peringkat}</span>
                            <span>{rec.nama_dosen}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 self-end md:self-center shrink-0">
                      <button
                        onClick={() => setSelectedHistory(item)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 transition-colors"
                      >
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => onDeleteOne(item.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        title="Hapus riwayat"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Modal Konfirmasi Hapus Semua */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">Hapus Seluruh Riwayat Pencarian?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini akan menghapus permanen seluruh riwayat pencarian judul tugas akhir yang tersimpan di browser ini. Data yang telah dihapus tidak dapat dipulihkan.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm"
              >
                Ya, Hapus Semua
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
