import React from 'react';
import { ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 p-1 flex items-center justify-center border border-white/20 shrink-0">
                <img src="/logo.png" alt="SI-REKTA Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-white text-lg">SI-REKTA</span>
              <span className="text-[10px] bg-brand-950 text-brand-300 border border-brand-800 px-2 py-0.5 rounded">v1.1</span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Sistem Rekomendasi Dosen Pembimbing Tugas Akhir berbasis Text Mining (TF-IDF & Cosine Similarity) Departemen Sistem Informasi (DSI).
            </p>
          </div>

          {/* Kolom 2 */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase">Cakupan Data</h4>
            <ul className="text-sm text-stone-400 space-y-1.5">
              <li>• 17 Dosen Pembimbing DSI</li>
              <li>• 707 Riwayat Bimbingan Tugas Akhir</li>
              <li>• 610 Publikasi Ilmiah Dosen</li>
              <li>• 4 Kelompok Keahlian (RDBI, SD, SE, TKITI)</li>
            </ul>
          </div>

          {/* Kolom 3 Disclaimer */}
          <div className="space-y-3">
            <div className="flex items-center space-x-1.5 text-copper-400 text-sm font-semibold">
              <ShieldAlert className="w-4 h-4" />
              <span>Catatan Akademik</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed bg-stone-800/60 p-3.5 rounded-xl border border-stone-800">
              Hasil rekomendasi sistem merupakan bahan pertimbangan berbasis kemiripan teks, bukan keputusan akademik resmi atau penetapan surat tugas pembimbing. Mahasiswa tetap wajib berkonsultasi dengan koordinator TA departemen.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500">
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
