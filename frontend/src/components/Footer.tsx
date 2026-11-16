import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-lg">SI-REKTA</span>
              <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">v1.0</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Sistem Rekomendasi Dosen Pembimbing Tugas Akhir berbasis Text Mining (TF-IDF & Cosine Similarity) Departemen Sistem Informasi (DSI).
            </p>
          </div>

          {/* Kolom 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Cakupan Data</h4>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>• 17 Dosen Pembimbing DSI</li>
              <li>• 706 Riwayat Bimbingan Tugas Akhir</li>
              <li>• 643 Publikasi Ilmiah Dosen</li>
              <li>• 4 Kelompok Keahlian (RD-BI, SE, SD, TK-ITI)</li>
            </ul>
          </div>

          {/* Kolom 3 Disclaimer */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 text-amber-400 text-sm font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Catatan Akademik</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/60 p-3 rounded-xl border border-slate-800">
              Hasil rekomendasi sistem merupakan bahan pertimbangan berbasis kemiripan teks, bukan keputusan akademik resmi atau penetapan surat tugas pembimbing. Mahasiswa tetap wajib berkonsultasi dengan koordinator TA departemen.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2025-2026 Departemen Sistem Informasi. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-2 sm:mt-0">
            <span>Metode: TF-IDF + Cosine Similarity</span>
            <span>Database: MySQL (Laragon)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
