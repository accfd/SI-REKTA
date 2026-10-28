# 📊 LAPORAN EXPLORATORY DATA ANALYSIS (EDA) GABUNGAN
## PENELITIAN DUAL-DATASET SISTEM REKOMENDASI DOSEN PEMBIMBING (SI-REKTA)
### Departemen Sistem Informasi — Fakultas Teknologi Informasi — Universitas Andalas

> **Sumber Data:**  
> 1. **Dataset 1:** `docs/Judul_TA.csv` (625 riwayat usulan tugas akhir mahasiswa masa lalu)  
> 2. **Dataset 2:** `docs/Publikasi_Dosen.csv` (643 judul publikasi ilmiah terverifikasi dari 17 Dosen Tetap Aktif)  
> **Status Dokumen:** Laporan Audit Kualitas Data Resmi (Fase 2 CRISP-ML(Q)) sebagai dasar pembenaran empiris (*Empirical Grounding*) pada penulisan Systematic Literature Review (SLR).

---

## 1. Karakteristik Statistik Teks (Short-Text Comparison)

| Metrik Statistik | Dataset 1: Riwayat Judul TA (`Judul_TA.csv`) | Dataset 2: Publikasi Dosen (`Publikasi_Dosen.csv`) | Implikasi Metodologis |
| :--- | :---: | :---: | :--- |
| **Total Sampel** | 625 judul | 643 publikasi | Ukuran sampel seimbang dan representatif |
| **Rata-rata Jumlah Kata** | 16,60 kata | 13,73 kata | Keduanya bertipe teks sangat ringkas (*short-text*) |
| **Median Panjang Kata** | 16 kata | 13 kata | Sebaran data normal tanpa outlier teks panjang |
| **Panjang Minimum / Maksimum** | 6 kata / 30 kata | 1 kata / 34 kata | Membutuhkan representasi leksikal n-gram |
| **Standar Deviasi Kata** | 3,98 | 4,17 | Variasi panjang teks konsisten |
| **Rata-rata Jumlah Karakter** | 130,07 karakter | 103,87 karakter | Karakteristik ringkas cocok untuk TF-IDF & Cosine |

---

## 2. Analisis Distribusi Kelas: Masalah *Cold-Start* & Ketimpangan Bimbingan

Tabel di bawah membuktikan alasan mendasar mengapa pemodelan berbasis satu dataset saja (`Judul_TA.csv`) gagal memberikan rekomendasi yang adil:

| No | Nama Dosen Tetap Aktif | Kelompok Keahlian | Riwayat TA (P1) | Publikasi Riset | Korpus Gabungan | Status di Dataset TA | Status Dual-Dataset |
|:--:|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| 1 | **Prof. Surya Afnarius, Ph.D.** | RD-BI | 87 Judul | 26 Paper | 113 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 2 | **Febby Apri Wenando, M.Eng., Ph.D.** | RD-BI | **0 Judul** | **32 Paper** | **32 Dokumen** | ⚠️ **COLD-START (0)** | ✅ **Terpecahkan!** |
| 3 | **Rahmatika Pratama Santi, M.T.** | RD-BI | 30 Judul | 15 Paper | 45 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 4 | **Aina Hubby Aziira, M.Eng.** | RD-BI | **0 Judul** | **7 Paper** | **7 Dokumen** | ⚠️ **COLD-START (0)** | ✅ **Terpecahkan!** |
| 5 | **Nisa Dwi Angresti, M.Kom.** | SD | **0 Judul** | **11 Paper** | **11 Dokumen** | ⚠️ **COLD-START (0)** | ✅ **Terpecahkan!** |
| 6 | **Husnil Kamil, M.T.** | SD | 93 Judul | 24 Paper | 117 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 7 | **Afriyanti Dwi Kartika, S.Pd., M.T.** | SD | 13 Judul | 27 Paper | 40 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 8 | **Dwi Welly Sukma Nirad, M.T.** | SD | 18 Judul | 19 Paper | 37 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 9 | **Hafzatin Nurlatifa, M.Eng.** | SD | **0 Judul** | **9 Paper** | **9 Dokumen** | ⚠️ **COLD-START (0)** | ✅ **Terpecahkan!** |
| 10 | **Hafizah Hanim, M.Kom.** | SE | 1 Judul | 76 Paper | 77 Dokumen | Sangat Sedikit | ✅ Lengkap 100% |
| 11 | **Haris Suryamen, M.Sc.** | SE | 67 Judul | 25 Paper | 92 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 12 | **Ricky Akbar, M.Kom.** | SE | 149 Judul | 174 Paper | 323 Dokumen | Sangat Dominan | ✅ Lengkap 100% |
| 13 | **Jefril Rahmadoni, M.Kom.** | SE | 10 Judul | 29 Paper | 39 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 14 | **Ullya Mega Wahyuni, M.Kom.** | SE | 13 Judul | 21 Paper | 34 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 15 | **Adi Arga Arifnur, M.Kom.** | TK-ITI | **0 Judul** | **18 Paper** | **18 Dokumen** | ⚠️ **COLD-START (0)** | ✅ **Terpecahkan!** |
| 16 | **Fajril Akbar, M.Sc.** | TK-ITI | 38 Judul | 99 Paper | 137 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| 17 | **Hasdi Putra, M.T.** | TK-ITI | 49 Judul | 31 Paper | 80 Dokumen | Ada Riwayat | ✅ Lengkap 100% |
| **TOTAL** | **17 Dosen Tetap Aktif** | **4 KK** | **568 Judul** | **643 Paper** | **1.211 Dokumen** | **5 Dosen Nol Data** | **Semua 17 Ada Data** |

---

## 3. Distribusi Dokumen per Kelompok Keahlian (KK)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SEBARAN DOKUMEN PER KELOMPOK KEAHLIAN                           │
├───────────────┬──────────────────────────┬─────────────────────────┬───────────────────┤
│ Kelompok      │ Riwayat Tugas Akhir      │ Publikasi Riset Dosen   │ Total Korpus Teks │
│ Keahlian (KK) │ (Dataset 1)              │ (Dataset 2)             │ Gabungan          │
├───────────────┼──────────────────────────┼─────────────────────────┼───────────────────┤
│ RD-BI         │ 117 judul (20,6%)        │ 80 paper (12,4%)        │ 197 teks (16,3%)  │
│ SD            │ 124 judul (21,8%)        │ 90 paper (14,0%)        │ 214 teks (17,7%)  │
│ SE            │ 240 judul (42,3%)        │ 325 paper (50,5%)       │ 565 teks (46,7%)  │
│ TK-ITI        │ 87 judul (15,3%)         │ 148 paper (23,0%)       │ 235 teks (19,4%)  │
├───────────────┼──────────────────────────┼─────────────────────────┼───────────────────┤
│ TOTAL         │ 568 judul DSI (100%)     │ 643 paper DSI (100%)    │ 1.211 teks (100%) │
└───────────────┴──────────────────────────┴─────────────────────────┴───────────────────┘
```

---

## 4. Analisis Kosakata & Ekspansi Semantik (*Lexical Expansion*)

Penyatuan dua dataset ini terbukti memberikan lompatan kekayaan kosakata teknis yang sangat signifikan:

* **Total Kosakata Unik di Judul TA (Dataset 1):** 1.691 kata
* **Total Kosakata Unik di Publikasi Dosen (Dataset 2):** 2.458 kata
* **Total Kosakata Gabungan (*Vocabulary Pool*):** 3.470 kata unik
* **Irisan Kosakata Bersama (*Lexical Overlap*):** 679 kata
* **Jaccard Similarity Index:** 19,57%
* **Tingkat Ekspansi Kosakata (*Vocabulary Expansion*):** **+1.779 kata teknis baru (+105,2% lompatan kosakata!)**

### Perbandingan Kata Kunci Teknis Teratas:
- **Top Kata Kunci Dataset 1 (Gaya Bahasa Mahasiswa):**  
  `aplikasi`, `mobile`, `pendukung keputusan (SPK)`, `pengelolaan data`, `business intelligence`, `dashboard`, `sistem penjualan`, `pelayanan masyarakat`.
- **Top Kata Kunci Dataset 2 (Gaya Riset Dosen):**  
  `machine learning`, `generative adversarial networks (GANs)`, `deep learning`, `convolutional neural network`, `cobit 2019`, `spatial analysis`, `postgis`, `enterprise architecture`, `usability evaluation`, `network qos`.

---

## 5. Kesimpulan Kritis Hasil EDA untuk Landasan SLR

1. **Bukti Validasi Ilmiah Solusi Dual-Dataset:**  
   Dataset 1 (`Judul_TA.csv`) memiliki kelemahan struktural tidak terhindarkan berupa **5 dosen tetap aktif yang belum memiliki riwayat sebagai Pembimbing 1 (29,4% faculty cold-start pada peran P1)**. Dataset 2 (`Publikasi_Dosen.csv`) berhasil mengisi kekosongan tersebut secara 100% tanpa ada satu pun dosen yang terlewat.
2. **Kebutuhan Model *Late-Fusion Hybrid*:**  
   Karena karakteristik teks mahasiswa (Dataset 1) dan publikasi dosen (Dataset 2) saling melengkapi (Jaccard Index 19,57%), arsitektur rekomendasi yang ideal bukanlah *single-classifier*, melainkan **arsitektur dua tingkat (Hierarchical Two-Tier) dengan Late-Fusion**:
   - **Tingkat 1:** Memprediksi Kelompok Keahlian (KK).
   - **Tingkat 2:** Menghitung skor gabungan (*Hybrid Scoring*) antara probabilitas riwayat skripsi dan kemiripan kosinus publikasi riset dosen.
