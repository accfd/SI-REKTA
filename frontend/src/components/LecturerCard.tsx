import React from 'react';
import { Award, BookOpen, GraduationCap, Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import type { LecturerRecommendation } from '../types';
import { LecturerAvatar } from './LecturerAvatar';

interface LecturerCardProps {
  lecturer: LecturerRecommendation;
  isDetailed?: boolean;
  onSelectLecturer?: (lecturer: LecturerRecommendation) => void;
}

export const LecturerCard: React.FC<LecturerCardProps> = ({ lecturer, onSelectLecturer }) => {
  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return {
          bg: 'bg-brand-600 text-white shadow-brand-600/30',
          border: 'border-brand-300 ring-4 ring-brand-100',
          text: 'Peringkat #1 - Rekomendasi Utama',
        };
      case 2:
        return {
          bg: 'bg-copper-600 text-white shadow-copper-500/20',
          border: 'border-copper-300 ring-4 ring-copper-100',
          text: 'Peringkat #2 - Alternatif Relevan',
        };
      case 3:
        return {
          bg: 'bg-stone-700 text-white shadow-stone-600/20',
          border: 'border-stone-300 ring-4 ring-stone-100',
          text: 'Peringkat #3 - Alternatif Relevan',
        };
      default:
        return {
          bg: 'bg-brand-600 text-white',
          border: 'border-brand-200 ring-2 ring-brand-50',
          text: `Peringkat #${rank}`,
        };
    }
  };

  const badgeStyle = getRankBadge(lecturer.peringkat);

  return (
    <div
      onClick={onSelectLecturer ? () => onSelectLecturer(lecturer) : undefined}
      role={onSelectLecturer ? 'button' : undefined}
      tabIndex={onSelectLecturer ? 0 : undefined}
      onKeyDown={
        onSelectLecturer
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectLecturer(lecturer);
              }
            }
          : undefined
      }
      className={`relative bg-white rounded-3xl border transition-all duration-300 hover:shadow-lg ${badgeStyle.border} p-6 overflow-hidden flex flex-col justify-between ${
        onSelectLecturer ? 'cursor-pointer group hover:-translate-y-0.5' : ''
      }`}
    >
      <div>
      {/* Header Kartu: Peringkat & Inisial */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center space-x-3.5">
          {/* Avatar / Foto Dosen */}
          <LecturerAvatar
            idDosen={lecturer.id_dosen}
            nama={lecturer.nama_dosen}
            inisial={lecturer.inisial}
            className="w-13 h-13 rounded-2xl bg-gradient-to-br from-brand-700 to-copper-600 text-white font-extrabold text-lg shadow-md"
          />
          <div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm ${badgeStyle.bg}`}>
                <Award className="w-3.5 h-3.5 mr-1" />
                #{lecturer.peringkat}
              </span>
              {lecturer.kode_kk && (
                <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                  {lecturer.kode_kk}
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-stone-900 mt-1 leading-snug">
              {lecturer.nama_dosen}
            </h3>
            {lecturer.nama_kk && (
              <p className="text-xs text-stone-500 mt-0.5">{lecturer.nama_kk}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pill Komposisi Data & Label Khusus */}
      <div className="flex flex-wrap items-center gap-2 mb-4 pt-2 border-t border-stone-100">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-100">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>{lecturer.jumlah_ta} Riwayat TA</span>
        </span>
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-copper-50 text-copper-700 border border-copper-100">
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
        <div className="mb-3.5 bg-brand-50/70 p-3 rounded-2xl border border-brand-200/70">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-brand-900 mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
            <span>Kata Kunci Cocok dengan Topik Anda:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {lecturer.kata_kunci_cocok.map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-white text-brand-700 border border-brand-200 shadow-2xs"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Kata Kunci Keahlian Utama Dosen */}
      <div>
        <div className="flex items-center space-x-1 text-xs font-semibold text-stone-500 mb-1.5">
          <Tag className="w-3.5 h-3.5" />
          <span>Fokus Bidang & Keahlian:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {lecturer.kata_kunci_keahlian.map((kw, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
      </div>

      {onSelectLecturer && (
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-brand-700 group-hover:text-brand-900">
          <span>Lihat Profil &amp; Karya Lengkap</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      )}
    </div>
  );
};
