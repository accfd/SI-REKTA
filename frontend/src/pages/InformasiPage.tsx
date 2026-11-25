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
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Transparansi &amp; Metodologi Model
        </h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Penjelasan lengkap mengenai tujuan, alur kerja Machine Learning, data referensi, metrik pengujian resmi, dan batasan operasional SI-REKTA.
        </p>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-1" />
          <p className="text-xs text-slate-400">Sinkronisasi data model terkini...</p>
        </div>
      )}

      {/* Bagian 1: Tujuan Sistem */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-brand-600 font-bold text-sm uppercase tracking-wider">
          <Info className="w-4 h-4" />
          <span>Bagian 1 • Tujuan Sistem</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Membantu Penjajakan Topik &amp; Rekomendasi Dosen Pembimbing
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          SI-REKTA dirancang untuk membantu mahasiswa Departemen Sistem Informasi dalam mengidentifikasi dosen yang memiliki keterkaitan bidang riset akademik terhadap ide atau rencana judul tugas akhir yang diajukan. Dengan sistem ini, mahasiswa dapat memperoleh gambaran awal mengenai relevansi topik penelitian sebelum mengajukan surat usulan bimbingan tugas akhir.
        </p>
      </section>

{/* Alur Sistem – Bagaimana SI-REKTA Bekerja? */}
<section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
  <div className="flex items-center space-x-2 text-brand-600 font-bold text-sm uppercase tracking-wider">
    <Info className="w-4 h-4" />
    <span>Alur Sistem – Bagaimana SI-REKTA Bekerja?</span>
  </div>
  <h2 className="text-xl font-bold text-slate-900">Empat langkah mudah dari penulisan ide judul hingga rekomendasi siap pakai</h2>
  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
    <li><strong>Tuliskan Judul TA</strong> – Masukkan rencana judul tugas akhir minimal 6 kata dengan topik yang spesifik.</li>
    <li><strong>Pembersihan Teks</strong> – Sistem melakukan lowercase, pembersihan tanda baca, URL, dan ekstraksi n‑gram frasa.</li>
    <li><strong>TF‑IDF & Cosine Similarity</strong> – Vektor judul dibandingkan dengan matriks profil gabungan seluruh 17 dosen DSI.</li>
    <li><strong>Top‑3 Rekomendasi</strong> – Sistem menampilkan 3 dosen paling relevan, kata kunci cocok, dan menyimpannya di riapan lokal.</li>
  </ol>
</section>

      {/* Bagian 2: Cara Kerja Model NLP */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 text-copper-600 font-bold text-sm uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Bagian 2 • Cara Kerja Model Rekomendasi</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Alur Pemrosesan Teks (Text Mining Pipeline)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-copper-600">Langkah 1</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Input Judul</h4>
            <p className="text-xs text-slate-500 mt-1">Menerima judul tugas akhir (minimal 6 kata).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-copper-600">Langkah 2</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Pembersihan Teks</h4>
            <p className="text-xs text-slate-500 mt-1">Lowercase, URL removal, sanitasi regex tanda baca, normalisasi spasi.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-copper-600">Langkah 3</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">TF-IDF N-Gram</h4>
            <p className="text-xs text-slate-500 mt-1">Transformasi ke 10.130 fitur kata &amp; frasa (unigram + bigram, sublinear_tf, hybrid stopwords).</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-copper-600">Langkah 4</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Cosine Similarity</h4>
            <p className="text-xs text-slate-500 mt-1">Perhitungan sudut kosinus terhadap 17 vektor profil dosen.</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-xs font-bold text-copper-600">Langkah 5</span>
            <h4 className="font-bold text-slate-800 text-sm mt-1">Top-3 Ranking</h4>
            <p className="text-xs text-slate-500 mt-1">Perangkingan urutan #1, #2, #3 serta pencocokan kata kunci.</p>
          </div>
        </div>
      </section>

{/* Alur Sistem – Bagaimana SI-REKTA Bekerja? */}
<section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
  <div className="flex items-center space-x-2 text-brand-600 font-bold text-sm uppercase tracking-wider">
    <Info className="w-4 h-4" />
    <span>Alur Sistem – Bagaimana SI-REKTA Bekerja?</span>
  </div>
  <h2 className="text-xl font-bold text-slate-900">Empat langkah mudah dari penulisan ide judul hingga rekomendasi siap pakai</h2>
  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
    <li><strong>Tuliskan Judul TA</strong> – Masukkan rencana judul tugas akhir minimal 6 kata dengan topik yang spesifik.</li>
    <li><strong>Pembersihan Teks</strong> – Sistem melakukan lowercase, pembersihan tanda baca, URL, dan ekstraksi n‑gram frasa.</li>
    <li><strong>TF‑IDF & Cosine Similarity</strong> – Vektor judul dibandingkan dengan matriks profil gabungan seluruh 17 dosen DSI.</li>
    <li><strong>Top‑3 Rekomendasi</strong> – Sistem menampilkan 3 dosen paling relevan, kata kunci cocok, dan menyimpannya di riapan lokal.</li>
  </ol>
</section>

      {/* Bagian 3: Dataset Referensi */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center space-x-2 text-emerald-600 font-bold text-sm uppercase tracking-wider">
          <Database className="w-4 h-4" />
          <span>Bagian 3 • Dataset Referensi Akademik</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">Komposisi Data Pelatihan Model</h2>

        {/* Updated Stats Card – visual from design */}
        <div className="my-8">
          <img src="/assets/stats-card.png" alt="Statistik SI‑REKTA" className="w-full max-w-3xl mx-auto rounded-lg shadow" />
        </div>
      </section>

{/* Alur Sistem – Bagaimana SI-REKTA Bekerja? */}
<section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
  <div className="flex items-center space-x-2 text-brand-600 font-bold text-sm uppercase tracking-wider">
    <Info className="w-4 h-4" />
    <span>Alur Sistem – Bagaimana SI-REKTA Bekerja?</span>
  </div>
  <h2 className="text-xl font-bold text-slate-900">Empat langkah mudah dari penulisan ide judul hingga rekomendasi siap pakai</h2>
  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
    <li><strong>Tuliskan Judul TA</strong> – Masukkan rencana judul tugas akhir minimal 6 kata dengan topik yang spesifik.</li>
    <li><strong>Pembersihan Teks</strong> – Sistem melakukan lowercase, pembersihan tanda baca, URL, dan ekstraksi n‑gram frasa.</li>
    <li><strong>TF‑IDF & Cosine Similarity</strong> – Vektor judul dibandingkan dengan matriks profil gabungan seluruh 17 dosen DSI.</li>
    <li><strong>Top‑3 Rekomendasi</strong> – Sistem menampilkan 3 dosen paling relevan, kata kunci cocok, dan menyimpannya di riapan lokal.</li>
  </ol>
</section>

      {/* Bagian 4: Kinerja Model & Evaluasi */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center space-x-2 text-copper-600 font-bold text-sm uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Bagian 4 • Metrik Evaluasi Resmi Model</span>
        </div>

        <h2 className="text-xl font-bold text-slate-900">
          Hasil Pengujian Kinerja (Uji Independen 118 Judul TA)
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Evaluasi resmi dilakukan menggunakan pustaka <code>arx</code> pada 118 judul tugas akhir data testing yang disisihkan secara independen dari proses pelatihan model. Tiga metrik evaluasi utama yang digunakan:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-brand-50/70 border border-brand-200 text-center">
            <div className="text-4xl font-extrabold text-brand-700">{info?.hit_rate_at_3 ?? 76.92}%</div>
            <div className="text-sm font-bold text-slate-800 mt-2">Hit Rate@3</div>
            <p className="text-xs text-slate-500 mt-1">
              Sebanyak <strong>{info?.hit_rate_at_3 ?? 76.92}%</strong> judul uji berhasil mendapatkan minimal satu dosen pembimbing yang tepat di dalam Top 3 rekomendasi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-copper-50/70 border border-copper-200 text-center">
            <div className="text-4xl font-extrabold text-copper-700">{info?.recall_at_3 ?? 72.22}%</div>
            <div className="text-sm font-bold text-slate-800 mt-2">Recall@3</div>
            <p className="text-xs text-slate-500 mt-1">
              Sebanyak <strong>{info?.recall_at_3 ?? 72.22}%</strong> dari seluruh dosen relevan berhasil ditangkap oleh sistem pada Top 3 rekomendasi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200 text-center">
            <div className="text-4xl font-extrabold text-emerald-700">{info?.mrr_at_3 ?? 0.6}</div>
            <div className="text-sm font-bold text-slate-800 mt-2">MRR@3 (Mean Reciprocal Rank)</div>
            <p className="text-xs text-slate-500 mt-1">
              Skor <strong>{info?.mrr_at_3 ?? 0.6}</strong> menunjukkan dosen relevan konsisten berada pada posisi ranking teratas (#1 atau #2).
            </p>
          </div>
        </div>
      </section>

{/* Alur Sistem – Bagaimana SI-REKTA Bekerja? */}
<section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
  <div className="flex items-center space-x-2 text-brand-600 font-bold text-sm uppercase tracking-wider">
    <Info className="w-4 h-4" />
    <span>Alur Sistem – Bagaimana SI-REKTA Bekerja?</span>
  </div>
  <h2 className="text-xl font-bold text-slate-900">Empat langkah mudah dari penulisan ide judul hingga rekomendasi siap pakai</h2>
  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
    <li><strong>Tuliskan Judul TA</strong> – Masukkan rencana judul tugas akhir minimal 6 kata dengan topik yang spesifik.</li>
    <li><strong>Pembersihan Teks</strong> – Sistem melakukan lowercase, pembersihan tanda baca, URL, dan ekstraksi n‑gram frasa.</li>
    <li><strong>TF‑IDF & Cosine Similarity</strong> – Vektor judul dibandingkan dengan matriks profil gabungan seluruh 17 dosen DSI.</li>
    <li><strong>Top‑3 Rekomendasi</strong> – Sistem menampilkan 3 dosen paling relevan, kata kunci cocok, dan menyimpannya di riapan lokal.</li>
  </ol>
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

{/* Alur Sistem – Bagaimana SI-REKTA Bekerja? */}
<section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
  <div className="flex items-center space-x-2 text-brand-600 font-bold text-sm uppercase tracking-wider">
    <Info className="w-4 h-4" />
    <span>Alur Sistem – Bagaimana SI-REKTA Bekerja?</span>
  </div>
  <h2 className="text-xl font-bold text-slate-900">Empat langkah mudah dari penulisan ide judul hingga rekomendasi siap pakai</h2>
  <ol className="list-decimal list-inside space-y-2 text-sm text-slate-600">
    <li><strong>Tuliskan Judul TA</strong> – Masukkan rencana judul tugas akhir minimal 6 kata dengan topik yang spesifik.</li>
    <li><strong>Pembersihan Teks</strong> – Sistem melakukan lowercase, pembersihan tanda baca, URL, dan ekstraksi n‑gram frasa.</li>
    <li><strong>TF‑IDF & Cosine Similarity</strong> – Vektor judul dibandingkan dengan matriks profil gabungan seluruh 17 dosen DSI.</li>
    <li><strong>Top‑3 Rekomendasi</strong> – Sistem menampilkan 3 dosen paling relevan, kata kunci cocok, dan menyimpannya di riapan lokal.</li>
  </ol>
</section>
    </div>
  );
};
