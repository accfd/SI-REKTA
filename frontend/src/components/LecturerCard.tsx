import React from 'react';
import { Award, BookOpen, GraduationCap, Tag, CheckCircle2 } from 'lucide-react';
import type { LecturerRecommendation } from '../types';

interface LecturerCardProps {
  lecturer: LecturerRecommendation;
  isDetailed?: boolean;
}

export const LecturerCard: React.FC<LecturerCardProps> = ({ lecturer }) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-amber-500 text-white shadow-amber-500/30',
          border: 'border-amber-300 ring-4 ring-amber-100',
          text: 'Peringkat #1 - Rekomendasi Utama',
        };
      case 2:
        return {
          bg: 'bg-slate-600 text-white shadow-slate-500/20',
          border: 'border-slate-300 ring-4 ring-slate-100',
          text: 'Peringkat #2 - Alternatif Relevan',
        };
      case 3:
        return {
          bg: 'bg-amber-700 text-white shadow-amber-700/20',
          border: 'border-amber-600/30 ring-4 ring-amber-50',
          text: 'Peringkat #3 - Alternatif Relevan',
        };
      default:
        return {
          bg: 'bg-blue-600 text-white',
          border: 'border-blue-200 ring-2 ring-blue-50',
          text: `Peringkat #${rank}`,
        };
    }
  };

  const badgeStyle = getRankBadge(lecturer.peringkat);

  return (
    <div className={`relative bg-white rounded-2xl border transition-all duration-300 hover:shadow-lg ${badgeStyle.border} p-6 overflow-hidden`}>
      {/* Header Kartu: Peringkat & Inisial */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3.5">
          {/* Avatar Inisial */}
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 flex items-center justify-center text-white font-extrabold text-lg shadow-md shrink-0">
            {lecturer.inisial}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm ${badgeStyle.bg}`}>
                <Award className="w-3.5 h-3.5 mr-1" />
                #{lecturer.peringkat}
              </span>
              {lecturer.kode_kk && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {lecturer.kode_kk}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1 leading-snug">
              {lecturer.nama_dosen}
            </h3>
            {lecturer.nama_kk && (
              <p className="text-xs text-slate-500 mt-0.5">{lecturer.nama_kk}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pill Komposisi Data & Label Khusus */}
      <div className="flex flex-wrap items-center gap-2 mb-4 pt-2 border-t border-slate-100">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{lecturer.jumlah_ta} Riwayat TA</span>
        </span>
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{lecturer.jumlah_publikasi} Publikasi</span>
        </span>

        {lecturer.is_publikasi_only && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Profil dari publikasi
          </span>
        )}
      </div>

      {/* Kata Kunci yang Cocok dengan Judul */}
      {lecturer.kata_kunci_cocok && lecturer.kata_kunci_cocok.length > 0 && (
        <div className="mb-3.5 bg-blue-50/70 p-3 rounded-xl border border-blue-100/80">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-900 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Kata Kunci Cocok dengan Topik Anda:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {lecturer.kata_kunci_cocok.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white text-blue-700 border border-blue-200 shadow-xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Kata Kunci Keahlian Utama Dosen */}
      <div>
        <div className="flex items-center space-x-1 text-xs font-semibold text-slate-500 mb-1.5">
          <Tag className="w-3.5 h-3.5" />
          <span>Fokus Bidang & Keahlian:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {lecturer.kata_kunci_keahlian.map((kw, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
