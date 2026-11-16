import React, { useState, useEffect } from 'react';
import { Info, Cpu, CheckCircle2, Database, BarChart3, ShieldAlert } from 'lucide-react';
import type { ModelInfo } from '../types';
import { api } from '../services/api';

export const InformasiPage: React.FC = () => {
  const [info, setInfo] = useState<ModelInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInfo();
  }, []);

  const loadInfo = async () => {
    try {
      setLoading(true);
      const data = await api.getModelInfo();
      setInfo(data);
    } catch (e) {
      console.error('Gagal mengambil metadata model', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Transparansi & Metodologi Model</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Penjelasan lengkap mengenai tujuan, alur kerja Machine Learning, data referensi, metrik pengujian, dan batasan operasional SI-REKTA.
        </p>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-1" />
          <p className="text-xs text-slate-400">Sinkronisasi data model terkini...</p>
        </div>
      )}

      {/* Bagian 1: Tujuan Sistem */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-blue-600 font-bold text-sm uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Bagian 1 • Tujuan Sistem</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Membantu Penjajakan Topik & Rekomendasi Dosen Pembimbing</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          SI-REKTA dirancang untuk membantu mahasiswa Departemen Sistem Informasi dalam mengidentifikasi dosen yang memiliki keterkaitan bidang riset akademik terhadap ide atau rencana judul tugas akhir yang diajukan. Dengan sistem ini, mahasiswa dapat memperoleh gambaran awal mengenai relevansi topik penelitian sebelum mengajukan surat usulan bimbingan tugas akhir.
        </p>
      </section>

      {/* Bagian 2: Cara Kerja Model NLP */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 text-indigo-600 font-bold text-sm uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Bagian 2 • Cara Kerja Model Rekomendasi</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Alur Pemrosesan Teks (Text Mining Pipeline)</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-indigo-600">Langkah 1</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Input Judul</h4>
            <p className="text-xs text-slate-500 mt-1">Menerima judul tugas akhir (minimal 6 kata).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-indigo-600">Langkah 2</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Pembersihan Teks</h4>
            <p className="text-xs text-slate-500 mt-1">Lowercase, URL removal, sanitasi regex tanda baca, normalisasi spasi.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-indigo-600">Langkah 3</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">TF-IDF N-Gram</h4>
            <p className="text-xs text-slate-500 mt-1">Transformasi ke 12.364 fitur kata & frasa (unigram + bigram, sublinear_tf).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-indigo-600">Langkah 4</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Cosine Similarity</h4>
            <p className="text-xs text-slate-500 mt-1">Perhitungan sudut kosinus terhadap 17 vektor profil dosen.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-indigo-600">Langkah 5</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Top-3 Ranking</h4>
            <p className="text-xs text-slate-500 mt-1">Perangkingan urutan #1, #2, #3 serta pencocokan kata kunci.</p>
          </div>
        </div>
      </section>

      {/* Bagian 3: Dataset Referensi */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>Bagian 3 • Dataset Referensi Akademik</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Komposisi Data Pelatihan Model</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="text-2xl font-black text-emerald-900">17 Dosen</div>
            <p className="text-xs font-semibold text-emerald-700 mt-0.5">Departemen Sistem Informasi</p>
            <p className="text-xs text-slate-500 mt-2">Mencakup kelompok keahlian RD-BI, SE, SD, dan TK-ITI.</p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="text-2xl font-black text-blue-900">706 Riwayat Bimbingan</div>
            <p className="text-xs font-semibold text-blue-700 mt-0.5">Tugas Akhir Terdahulu</p>
            <p className="text-xs text-slate-500 mt-2">Data bimbingan pembimbing 1 dan 2 lulusan DSI.</p>
          </div>

          <div className="p-5 rounded-2xl bg-purple-50/60 border border-purple-100">
            <div className="text-2xl font-black text-purple-900">643 Publikasi Ilmiah</div>
            <p className="text-xs font-semibold text-purple-700 mt-0.5">Jurnal & Konferensi Dosen</p>
            <p className="text-xs text-slate-500 mt-2">Publikasi penelitian resmi dosen yang terindeks.</p>
          </div>
        </div>
      </section>

      {/* Bagian 4: Kinerja Model & Evaluasi */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 text-amber-600 font-bold text-sm uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Bagian 4 • Kinerja dan Evaluasi Model</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Hasil Evaluasi Pengujian Model (Uji Independen 118 Judul TA)</h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Model diuji pada 118 judul tugas akhir yang disisihkan secara terpisah (data testing) dan tidak pernah digunakan dalam proses pelatihan maupun pembentukan profil vektor dosen (mencegah data leakage).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">{info?.hit_rate_at_3 ?? 79.66}%</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Hit Rate@3</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Dosen pembimbing masuk di Top 3</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">{info?.recall_at_3 ?? 75.42}%</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Recall@3</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Proporsi dosen relevan yang tertangkap</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">{info?.mrr_at_3 ?? 0.60}</div>
            <div className="text-xs font-bold text-slate-800 mt-1">MRR@3</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Mean Reciprocal Rank</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-700">{info?.precision_at_3 ?? 30.51}%</div>
            <div className="text-xs font-bold text-slate-800 mt-1">Precision@3</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Kepadatan rekomendasi relevan</p>
          </div>
        </div>

        {/* Catatan Akademis mengenai Precision */}
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 text-xs text-blue-900 leading-relaxed space-y-1">
          <span className="font-bold">Penjelasan Akademis Terkait Nilai Precision@3 (30.51%):</span>
          <p>
            Nilai precision tampak berkisar ~30% adalah hal wajar dan terjustifikasi secara matematis, karena sebagian besar tugas akhir hanya memiliki 1 orang pembimbing (atau maksimal 2), sedangkan sistem selalu mengembalikan fixed 3 rekomendasi dosen. Secara teoritis, jika 1 dokumen hanya memiliki 1 dosen pembimbing relevan, batas maksimal precision@3 yang bisa dicapai adalah 1/3 (33.33%).
          </p>
        </div>
      </section>

      {/* Bagian 5: Batasan Sistem */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-rose-600 font-bold text-sm uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>Bagian 5 • Batasan Sistem (SRS Bab 10)</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">Batasan Ruang Lingkup dan Integritas Sistem</h2>

        <ul className="text-xs sm:text-sm text-slate-600 space-y-2.5">
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Bukan Penetapan Resmi:</strong> Hasil rekomendasi sistem merupakan alat bantu pertimbangan dan tidak menggantikan keputusan resmi komisi tugas akhir departemen.</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Cakupan Dosen:</strong> Model saat ini mencakup 17 dosen tetap Departemen Sistem Informasi yang memiliki riwayat publikasi/bimbingan.</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Peringkat Bukan Probabilitas:</strong> Nomor peringkat #1, #2, dan #3 menunjukkan urutan kemiripan teks, bukan jaminan persentase kecocokan atau ketersediaan dosen.</span>
          </li>
          <li className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span><strong>Penyimpanan Browser:</strong> Riwayat pencarian tersimpan lokal di browser masing-masing pengguna tanpa sinkronisasi cloud atau akun login.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
