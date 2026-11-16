# LAPORAN PROGRESS REPORT 2 PROYEK PEMBELAJARAN MESIN

## SI-REKTA: SISTEM REKOMENDASI DOSEN PEMBIMBING TUGAS AKHIR MENGGUNAKAN NATURAL LANGUAGE PROCESSING DENGAN PEMBOBOTAN TF-IDF N-GRAM DAN COSINE SIMILARITY

### **Dosen Pengampu:**
1. **Febby Apri Wenando, S.Kom., M.Eng., Ph.D.** (NIP: 198904202019031015)
2. **Aina Hubby Aziira, S.Kom., M.Eng.** (NIP: 199308132022032014)

### **Mata Kuliah:**
Pembelajaran Mesin / Machine Learning (DSI61133) — Kelas A (Semester Ganjil 2025/2026)

### **Disusun Oleh Kelompok 5:**
1. **Fuadi Dhiyaulhaq** (NIM: 2411522001) — *Project Manager, Data Pipeline Architect, Database Engineer, & Backend API Engineer*
2. **Rafa Gian Atthari** (NIM: 2411522014) — *Core Machine Learning Engineer, NLP Preprocessing Specialist, & Information System Designer*
3. **Farrel Ghufran Rahman** (NIM: 2411521009) — *Information Retrieval Benchmarking Specialist, Model Serialization Developer, & Frontend UI/UX Engineer*

### **DEPARTEMEN SISTEM INFORMASI**
### **FAKULTAS TEKNOLOGI INFORMASI**
### **UNIVERSITAS ANDALAS**
### **PADANG, 2026**

---

## KATA PENGANTAR

Puji dan syukur ke hadirat Allah Subhanahu Wa Ta'ala atas limpahan rahmat, taufik, dan hidayah-Nya sehingga Kelompok 5 dapat menyelesaikan dokumen **Laporan Progress Report 2 Proyek Pembelajaran Mesin** dengan judul **"SI-REKTA: Sistem Rekomendasi Dosen Pembimbing Tugas Akhir Menggunakan Natural Language Processing dengan Pembobotan TF-IDF N-Gram dan Cosine Similarity"** secara komprehensif, empiris, dan tepat waktu.

Laporan kemajuan kedua ini disusun sebagai pertanggungjawaban akademis dan teknis terhadap progres nyata yang telah dicapai dalam mata kuliah Machine Learning (DSI61133) di Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas. Berbeda secara fundamental dengan Progress Report 1 yang masih berfokus pada eksplorasi awal, pemisahan matriks berbobot manual heuristik (*Dual-Matrix Late-Fusion*), dan skenario rencana di buku kerja komputasi awan, Progress Report 2 ini menyajikan **lonjakan evolusi menyeluruh**:
1. **Penyempurnaan Arsitektur Model Leksikal Terpadu (*Unified Corpus Profile Aggregation*)**: Melebur korpus riwayat skripsi alumni dan publikasi riset resmi per dosen, meningkatkan dimensi leksikon dari 3.947 menjadi **12.364 fitur TF-IDF N-gram (1,2)** dengan formulasi *Sublinear Term Frequency*.
2. **Eksperimen Sistematis & Variasi Parameter Komprehensif**: Menguji secara empiris variasi rentang N-gram, pembobotan TF sublinear, peredaman IDF, serta fungsi kesamaan jarak.
3. **Evaluasi Baku Temu Balik Informasi (*Information Retrieval*) Bebas Kebocoran Data (*Zero Data Leakage*)**: Menerapkan pustaka baku internasional `ranx` pada **118 kueri tugas akhir uji independen** dengan 642 publikasi terkunci di set latih, mencatatkan **Hit Rate@3 sebesar 79.66%**, **Recall@3 sebesar 75.42%**, dan **MRR@3 sebesar 0.6031**, serta pembuktian keunggulan terhadap kajian *Systematic Literature Review* (SLR).
4. **Implementasi Sistem Nyata End-to-End**: Realisasi aplikasi web fungsional penuh (Live) yang mencakup basis data relasional 3NF MySQL Laragon (10 tabel), backend API RESTful FastAPI berlatensi rendah (< 5 ms), dan antarmuka web interaktif React Vite dengan navigasi Sidebar dan palet warna resmi logo: Marun (`#6D302D`) dan Tembaga (`#C5694B`).

Tim penyusun menyampaikan penghargaan dan terima kasih yang sebesar-besarnya kepada:
1. **Bapak Febby Apri Wenando, S.Kom., M.Eng., Ph.D.** dan **Ibu Aina Hubby Aziira, S.Kom., M.Eng.** selaku Dosen Pengampu atas bimbingan metodologis, arahan teknis evaluasi temu balik informasi, masukan terkait etika keterbukaan skor, serta motivasi yang diberikan selama perkuliahan.
2. Seluruh civitas akademika Departemen Sistem Informasi Universitas Andalas atas ketersediaan data historis bimbingan tugas akhir dan rekam jejak publikasi ilmiah dosen yang menjadi fondasi riset ini.
3. Rekan-rekan mahasiswa Departemen Sistem Informasi Universitas Andalas yang telah memberikan masukan berharga terkait kegunaan sistem rekomendasi.

Tim penyusun menyadari bahwa dokumen ini masih memiliki ruang penyempurnaan menuju *Final Report*. Oleh karena itu, saran dan kritik yang membangun sangat kami harapkan guna penyempurnaan sistem SI-REKTA di masa mendatang.

Padang, 16 November 2026  
**Tim Pengembang Kelompok 5**

---

## RINGKASAN EKSEKUTIF

Penentuan calon dosen pembimbing tugas akhir di tingkat perguruan tinggi sering kali terkendala oleh asimetri informasi antara mahasiswa dan departemen. Di Departemen Sistem Informasi (DSI) Universitas Andalas, mahasiswa kerap mengalami kebingungan dalam memetakan topik usulan tugas akhir mereka terhadap keahlian dosen yang tepat, memicu penumpukan usulan hanya pada dosen senior tertentu (*topic congestion*), sementara dosen tetap lainnya tidak terutilisasi secara optimal. Permasalahan semakin kompleks dengan adanya fenomena **Cold-Start Problem**, yaitu adanya 3 dosen tetap aktif yang belum pernah memiliki riwayat bimbingan tugas akhir (0 data skripsi).

Proyek **SI-REKTA (Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir)** dibangun untuk menghadirkan solusi temu balik informasi berbasis kecerdasan buatan yang adil, objektif, dan transparan. Sistem mengintegrasikan korpus data ganda (*Dual-Source Dataset*): **707 relasi riwayat bimbingan tugas akhir** (mencakup peran Pembimbing 1 dan Pembimbing 2 dari 593 judul TA unik tahun 2014–2026, yang berakar dari 568 data sah bimbingan utama) dan **643 artikel publikasi ilmiah resmi terindeks** milik **17 Dosen Tetap Aktif DSI Unand**.

Pada fase Progress Report 2, tim melakukan lompatan dan penyempurnaan mendasar yang mencakup 3 aspek penilaian utama:
1. **Pengembangan dan Eksperimen Model Machine Learning (Bobot 60%)**:
   - Melakukan transisi arsitektur dari model *Dual-Matrix Late-Fusion* berbobot manual heuristik $\alpha$ (3.947 fitur) menuju **Unified Corpus Profile Aggregation** dengan ekstraksi **12.364 fitur TF-IDF N-gram (1,2)** berparameter `sublinear_tf=True`.
   - Melaksanakan pengujian empiris variasi parameter: N-gram $(1,1)$ vs $(1,2)$ vs $(1,3)$, Linear TF vs Sublinear TF ($1+\log(\text{TF})$), dan Cosine Similarity vs Euclidean Distance.
   - Merancang partisi data bebas kebocoran data (*zero data leakage*): 100% publikasi (642 dokumen) dikunci di set latih bersama 475 judul TA unik training (562 relasi), sedangkan evaluasi dijalankan pada 118 kueri judul TA unik testing independen (145 relasi) dengan irisan 0 dokumen.
   - Evaluasi baku temu balik informasi menggunakan library resmi `ranx` mencatatkan **Hit Rate@3 = 79.66%**, **Recall@3 = 75.42%**, dan **Mean Reciprocal Rank (MRR@3) = 0.6031**.
   - Menyajikan justifikasi ilmiah mengapa metrik $\text{Precision@3}$ ditiadakan secara sadar: pada kueri ground-truth dengan hanya 1 atau 2 pembimbing sah ($|R_q| \le 2$), metrik Precision@3 secara matematis terbatasi pada skor maksimal 33.33% atau 66.67%, sehingga memberikan penalti semu yang menyesatkan (*structurally biased penalty*).
   - Validasi empiris terhadap kajian *Systematic Literature Review* (SLR) membuktikan performa SI-REKTA (**79.66%**) sangat unggul dibandingkan rata-rata literatur TF-IDF klasik (68.20%) dan Okapi BM25 (71.40%), bahkan kompetitif terhadap arsitektur Dense Semantic BERT (77.80%) dengan efisiensi komputasi CPU yang luar biasa (< 5 ms per kueri tanpa GPU).
2. **Analisis Kendala dan Solusi Berbeda dari Progress 1 (Bobot 20%)**:
   - Menganalisis secara tajam 4 kendala utama pasca Progress 1: (1) Kegagalan bobot manual $\alpha$ Late-Fusion diselesaikan via Unified Profile; (2) Risiko kebocoran data 5-Fold CV diselesaikan via partisi terisolasi `ranx`; (3) Risiko kesalahpahaman skor persentase mahasiswa diselesaikan via aturan bisnis *Zero Score Exposure* dan *Explainable AI*; (4) Masukan kueri ambigu diselesaikan via validasi minimal 6 kata.
3. **Koordinasi Tim dan Kontribusi Anggota (Bobot 20%)**:
   - Pembagian beban kerja secara seimbang dan transparan: Fuadi Dhiyaulhaq (Data Pipeline, Database 3NF, Backend FastAPI), Rafa Gian Atthari (Core ML, Preprocessing, Unified TF-IDF, System Design), dan Farrel Ghufran Rahman (Evaluasi `ranx`, Model Storage, Frontend React Vite UI/UX).
   - Realisasi sistem end-to-end terintegrasi: Database 3NF MySQL Laragon (10 tabel), RESTful API FastAPI dengan pemuatan in-memory model, dan antarmuka web modern React Vite berpalet warna resmi logo (Marun `#6D302D` dan Tembaga `#C5694B`) yang dapat dieksekusi satu-klik via `run_system.bat`.

---

## DAFTAR ISI

- **KATA PENGANTAR**
- **RINGKASAN EKSEKUTIF**
- **DAFTAR ISI**
- **DAFTAR TABEL**
- **DAFTAR GAMBAR**
- **BAB 1: PENGEMBANGAN DAN EKSPERIMEN MODEL MACHINE LEARNING**
  - 1.1 Dataset dan Fitur yang Digunakan
  - 1.2 Persiapan Data dan Feature Engineering
  - 1.3 Algoritma Model dan Alasan Pemilihan
  - 1.4 Proses Eksperimen dan Variasi Parameter / Hyperparameter
  - 1.5 Contoh Proses Pemodelan dan Hasil Keluaran Rekomendasi
  - 1.6 Model Terpilih, Evaluasi Kinerja IR, dan Alasan Pemilihan
  - 1.7 Bagian Pengembangan Model yang Belum Selesai dan Rencana Tindak Lanjut
- **BAB 2: KENDALA DAN SOLUSI**
  - 2.1 Keterbatasan Bobot Manual Alpha Late-Fusion pada Progress 1
  - 2.2 Risiko Kebocoran Data pada Evaluasi Model
  - 2.3 Risiko Kesalahpahaman Terhadap Tampilan Skor Persentase
  - 2.4 Masukan Judul Kueri yang Terlalu Singkat dan Ambigu
- **BAB 3: KOORDINASI TIM**
  - 3.1 Pembagian Pekerjaan Masing-Masing Anggota
  - 3.2 Progress dan Kontribusi Nyata Berbasis Bukti Artefak
  - 3.3 Koordinasi Tim pada Pekerjaan yang Saling Berkaitan
- **BAB 4: KESIMPULAN**
  - 4.1 Kesimpulan Capaian Progress Report 2
  - 4.2 Tindak Lanjut Menuju Final Report
- **LAMPIRAN**
  - Lampiran 1: Literatur Systematic Literature Review
  - Lampiran 2: Tautan Repositori dan Panduan Eksekusi Sistem Mandiri

---

## DAFTAR TABEL

- **Tabel 1.1**: Sebaran Distribusi Dokumen Tugas Akhir dan Publikasi 17 Dosen Tetap Aktif DSI
- **Tabel 1.2**: Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (*Clean Text*)
- **Tabel 1.3**: Konfigurasi Parameter `TfidfVectorizer` Terkini SI-REKTA
- **Tabel 1.4**: Perbandingan Alternatif Algoritma yang Dipertimbangkan untuk SI-REKTA
- **Tabel 1.5**: Matriks Eksperimen Sistematis Variasi Parameter/Hyperparameter Representasi Teks
- **Tabel 1.6**: Hasil Pengujian Rekomendasi Top-3 untuk Judul Uji Tugas Akhir
- **Tabel 1.7**: Rincian Partisi Dataset Eksperimen Bebas *Data Leakage*
- **Tabel 1.8**: Sebaran Proporsi Pembagian Judul TA Latih dan Uji per Dosen Tetap Aktif
- **Tabel 1.9**: Matriks Komparasi Kinerja Evaluasi: Progress Report 1 vs Progress Report 2
- **Tabel 1.10**: Tabel Benchmarking Hasil SI-REKTA terhadap Literatur Kajian SLR
- **Tabel 1.11**: Struktur Artefak Model Tersimpan pada Direktori `model/`
- **Tabel 2.1**: Analisis Kendala 1: Keterbatasan Bobot Manual Late-Fusion
- **Tabel 2.2**: Analisis Kendala 2: Partisi Terisolasi Bebas Data Leakage
- **Tabel 2.3**: Analisis Kendala 3: Kebijakan Integritas Tampilan Zero Score Exposure
- **Tabel 2.4**: Analisis Kendala 4: Validasi Masukan Judul Minimal 6 Kata
- **Tabel 3.1**: Matriks Beban Kerja dan Penanggung Jawab Proyek
- **Tabel 3.2**: Matriks Bukti Nyata Kontribusi Anggota Berdasarkan Artefak Kode Repositori
- **Tabel 3.3**: Spesifikasi Struktur 10 Tabel Ternormalisasi (3NF) Basis Data `sirekta_db`
- **Tabel 3.4**: Spesifikasi Kontrak Antarmuka Endpoint RESTful API SI-REKTA

---

## DAFTAR GAMBAR

- **Gambar 1.1**: Tangkapan Layar Grafik Perbandingan Dokumen Tugas Akhir dan Publikasi 17 Dosen
- **Gambar 1.2**: Tangkapan Layar Uji Preprocessing Teks dan Kamus Akademik Khusus
- **Gambar 1.3**: Tangkapan Layar Ekstraksi Fitur 12.364 Dimensi pada Notebook `SIREKTA.ipynb`
- **Gambar 1.4**: Tangkapan Layar Eksekusi Evaluasi `ranx` pada 118 Kueri Uji Independen
- **Gambar 1.5**: Tangkapan Layar Audit Pemeriksaan Bebas Kebocoran Data (*Data Leakage*)
- **Gambar 3.1**: Tangkapan Layar Struktur Skema Relasi Basis Data 3NF di phpMyAdmin Laragon
- **Gambar 3.2**: Tangkapan Layar Dokumentasi Interaktif RESTful API (Swagger UI) Backend FastAPI
- **Gambar 3.3**: Tangkapan Layar Antarmuka Halaman Beranda SI-REKTA (Sidebar & Palet Warna Resmi)
- **Gambar 3.4**: Tangkapan Layar Form Kueri Judul (Live Word Counter) dan Kartu Rekomendasi Top-3
- **Gambar 3.5**: Tangkapan Layar Modal Pop-Up Riwayat Bimbingan dan Publikasi Ilmiah Dosen
- **Gambar 3.6**: Tangkapan Layar In-Page PDF Viewer Dokumen Panduan Tugas Akhir DSI

---

# BAB 1: PENGEMBANGAN DAN EKSPERIMEN MODEL MACHINE LEARNING

### 1.1 Dataset dan Fitur yang Digunakan
Pengembangan model SI-REKTA memanfaatkan pendekatan korpus data ganda (*Dual-Source Dataset*) yang mencakup rekam jejak bimbingan tugas akhir alumni dan publikasi riset dosen (sesuai eksekusi Cell 3–25 notebook `SIREKTA.ipynb`):

1. **Dataset 1: Riwayat Tugas Akhir Alumni (`Judul_TA.csv`)**:
   Berisi rekaman tugas akhir alumni DSI tahun 2014–2026 sebanyak 625 baris mentah dengan 8 kolom atribut. Pada tahap pemeriksaan nilai kosong, Pembimbing 1 terisi sebanyak 623 isian (24 variasi nama) dan Pembimbing 2 terisi sebanyak 168 isian (18 variasi nama). Statistik panjang kata pada judul tugas akhir (Cell 15) menunjukkan nilai rata-rata 16.60 kata, dengan batas terpendek 6 kata dan terpanjang 30 kata.
   *Perubahan Mendasar dari Progress Report 1*: Pada Progress Report 1, analisis data hanya memetakan peran Pembimbing 1 saja terhadap 12 dosen (mengeliminasi 57 data tidak valid: 1 data tanpa pembimbing dan 56 data dosen pensiun/luar), menyisakan 568 judul skripsi sah. Pada Progress Report 2, analisis diperluas secara komprehensif mencakup verifikasi silang Pembimbing 1 dan Pembimbing 2 terhadap seluruh 17 dosen tetap aktif, menghasilkan **593 judul tugas akhir unik** dengan total **707 relasi judul TA–dosen yang cocok** (Cell 23). Sebanyak 14 dosen tercatat memiliki riwayat bimbingan, sedangkan 3 dosen lainnya tercatat memiliki 0 riwayat bimbingan tugas akhir.
2. **Dataset 2: Publikasi Ilmiah Dosen (`Publikasi_Dosen.csv`)**:
   Berisi metadata artikel riset resmi dosen yang terindeks Google Scholar dan SINTA sebanyak **643 publikasi lengkap** (Cell 18) dengan 5 kolom atribut, 100% valid tanpa nilai kosong (*zero missing values*). Rata-rata panjang judul publikasi adalah 13.73 kata (minimum 1 kata, maksimum 32 kata). Seluruh 17 dosen tetap aktif terwakili secara merata pada dataset ini.
3. **Evolusi Dimensi Fitur Leksikal**:
   Pada Progress Report 1, ekstraksi fitur dilakukan secara terpisah untuk skripsi dan publikasi sehingga ruang fitur terbelah dan hanya menghasilkan 3.947 fitur unigram. Pada Progress Report 2, penggabungan korpus per dosen menghasilkan lonjakan dimensi leksikon sebesar 3,1x lipat menjadi **12.364 fitur TF-IDF N-gram (1,2)** dengan pembobotan sublinear.

Sebaran sebaran dokumen riwayat bimbingan tugas akhir dan publikasi ilmiah dari 17 dosen tetap aktif disajikan pada Tabel 1.1 (merujuk pada luaran Cell 23–24 notebook).

**Tabel 1.1 Sebaran Distribusi Dokumen Tugas Akhir dan Publikasi 17 Dosen Tetap Aktif DSI**
| No | Nama Lengkap Dosen | Kelompok Keahlian | Riwayat TA (P1 & P2) | Publikasi Ilmiah | Total Dokumen | Status Bimbingan |
|---|---|---|---|---|---|---|
| 1 | Ricky Akbar, M.Kom. | SE | 155 | 174 | 329 | Dosen Senior |
| 2 | Fajril Akbar, M.Sc. | SE | 74 | 99 | 173 | Dosen Senior |
| 3 | Husnil Kamil, M.T. | SE | 99 | 24 | 123 | Dosen Senior |
| 4 | Prof. Surya Afnarius, Ph.D. | RD-BI | 87 | 26 | 113 | Dosen Senior |
| 5 | Hasdi Putra, M.T. | SE | 72 | 31 | 103 | Dosen Senior |
| 6 | Haris Suryamen, M.Sc. | TK-ITI | 70 | 25 | 95 | Dosen Senior |
| 7 | Hafizah Hanim, M.Kom. | RD-BI | 4 | 76 | 80 | Dosen Senior |
| 8 | Rahmatika Pratama Santi, M.T. | RD-BI | 51 | 15 | 66 | Dosen Senior |
| 9 | Afriyanti Dwi Kartika, S.Pd., M.T. | TK-ITI | 20 | 27 | 47 | Dosen Senior |
| 10 | Dwi Welly Sukma Nirad, M.T. | RD-BI | 28 | 19 | 47 | Dosen Senior |
| 11 | Ullya Mega Wahyuni, M.Kom. | SD | 23 | 21 | 44 | Dosen Senior |
| 12 | Jefril Rahmadoni, M.Kom. | SD | 14 | 29 | 43 | Dosen Senior |
| 13 | Febby Apri Wenando, M.Eng., Ph.D. | SD | 0 | 32 | 32 | **Dosen Cold-Start Murni** |
| 14 | Adi Arga Arifnur, M.Kom. | SD | 3 | 18 | 21 | Dosen Terpetakan |
| 15 | Aina Hubby Aziira, M.Eng. | SD | 7 | 7 | 14 | Dosen Terpetakan |
| 16 | Nisa Dwi Angresti, M.Kom. | TK-ITI | 0 | 11 | 11 | **Dosen Cold-Start Murni** |
| 17 | Hafzatin Nurlatifa, M.Eng. | TK-ITI | 0 | 9 | 9 | **Dosen Cold-Start Murni** |
| **TOTAL** | **17 Dosen Tetap Aktif** | **4 KK** | **707** | **643** | **1.350** | **14 Ada TA, 3 Cold-Start** |

> **[SCREENSHOT: Gambar 1.1 - Grafik Perbandingan Riwayat Bimbingan Skripsi vs Publikasi Ilmiah 17 Dosen DSI]**  
> *Panduan Bukti Visual: Tangkapan layar grafik batang horizontal dari notebook Cell 24 yang menampilkan perbandingan dokumen tugas akhir dan publikasi per dosen.*

---

### 1.2 Persiapan Data dan Feature Engineering
Teks judul tugas akhir dan artikel publikasi memiliki karakteristik formalitas akademik yang tinggi dan kerap disisipi kata-kata template birokrasi kampus (seperti *"Rancang Bangun"*, *"Sistem Informasi Berbasis Web"*, *"Studi Kasus pada PT/Dinas"*). Jika hanya dibersihkan dengan stopword umum bahasa Indonesia, kata-kata tersebut tidak akan terbuang, sehingga dapat mengaburkan makna keahlian inti.

Tahapan rekayasa data dan ekstraksi fitur (Cell 26–54 notebook `SIREKTA.ipynb`) mencakup:
1. **Data Cleaning & Standardization (Cell 28–30)**: Standardisasi penulisan nama dosen menggunakan kamus alias (`alias_dosen`) untuk menyatukan variasi gelar dan salah ketik ke dalam 17 nama dosen tetap aktif baku.
2. **Sanitasi Regex (Cell 33)**: Mengubah seluruh huruf menjadi kecil (*case folding*), menghapus tautan URL, tanda baca, simbol, angka, dan spasi berlebih.
3. **Kamus Stopword Akademik Khusus (`DSI_ACADEMIC_STOPWORDS`)**: Berisi lebih dari 120 kata template akademik yang dieliminasi secara spesifik. Contoh transformasi disajikan pada Tabel 1.2.
4. **Data Integration (Cell 36)**: Menggabungkan 707 relasi TA dan 643 publikasi menjadi **1.349 relasi dokumen-dosen terverifikasi** setelah deduplikasi judul identik per dosen.
5. **Unified Corpus Profile Aggregation (Cell 51–52)**: Seluruh teks riwayat bimbingan tugas akhir dan artikel publikasi milik dosen ke-$i$ diagregasikan menjadi satu dokumen representasi profil kepakaran tunggal sebelum pembobotan leksikal.
6. **Ekstraksi TF-IDF N-gram Sublinear (Cell 54)**: Menerapkan `TfidfVectorizer` dengan konfigurasi parameter sebagaimana dirinci pada Tabel 1.3.

**Tabel 1.2 Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (*Clean Text*)**
| Teks Judul Asli (Mentah) | Teks Hasil Preprocessing (`clean_text`) |
|---|---|
| Pembangunan Aplikasi Mobile GIS Wisata Sejarah Berbasis Android di Kota Padang | `mobile gis wisata sejarah padang` |
| Rancang Bangun Sistem Informasi Pengelolaan Logistik dan Aset pada PT Semen Padang Menggunakan Framework Laravel | `pengelolaan logistik aset semen laravel` |
| Penerapan Algoritma K-Means Clustering untuk Segmentasi Pelanggan pada Data Penjualan Retail | `kmeans clustering segmentasi pelanggan penjualan retail` |
| Deteksi Ujaran Kebencian pada Media Sosial Twitter Menggunakan Algoritma FastText dan LSTM | `deteksi ujaran kebencian media sosial twitter fasttext lstm` |

**Tabel 1.3 Konfigurasi Parameter `TfidfVectorizer` Terkini SI-REKTA**
| Parameter Scikit-Learn | Nilai Konfigurasi | Justifikasi Teknis |
|---|---|---|
| `analyzer` | `'word'` | Ekstraksi berbasis token kata |
| `ngram_range` | `(1, 2)` | Mengakomodasi unigram (kata tunggal) dan bigram (frasa 2 kata penting, misal: *data mining*, *supply chain*) |
| `sublinear_tf` | `True` | Menerapkan formula logaritmik $1 + \log(	ext{TF})$ untuk meredam dominasi istilah yang muncul berulang-ulang |
| `smooth_idf` | `True` | Menambahkan angka 1 pada pembilang dan penyebut IDF untuk mencegah pembagian dengan nol |
| `norm` | `'l2'` | Menormalisasi panjang vektor ke satuan unit euclidean agar dokumen panjang tidak mendominasi |
| `min_df` | `1` | Mempertahankan istilah langka yang spesifik pada keahlian unik dosen |

Formula matematis pembobotan TF-IDF Sublinear yang digunakan adalah:
$$	ext{TF-IDF}(t, d, D) = ig(1 + \log(	ext{TF}(t, d))ig) 	imes \left(\lograc{1 + |D|}{1 + 	ext{DF}(t, D)} + 1
ight)$$

Berdasarkan luaran Cell 54 notebook `SIREKTA.ipynb`, ukuran matriks yang terbentuk adalah:
- Ukuran matriks dokumen training: **$(1.204 	imes 12.364)$**
- Ukuran matriks dokumen testing: **$(145 	imes 12.364)$**
- Ukuran matriks profil dosen: **$(17 	imes 12.364)$**

> **[SCREENSHOT: Gambar 1.2 - Pengujian Fungsi Preprocessing Teks Akademis pada Notebook]**  
> *Panduan Bukti Visual: Tangkapan layar eksekusi fungsi pembersihan teks di notebook Cell 33 yang memperlihatkan eliminasi kata template akademik.*

> **[SCREENSHOT: Gambar 1.3 - Ringkasan Ekstraksi Fitur 12.364 Dimensi di Notebook `SIREKTA.ipynb`]**  
> *Panduan Bukti Visual: Tangkapan layar luaran Cell 54 notebook yang menunjukkan dimensi matriks profil dosen `(17, 12364)`.*

---

### 1.3 Algoritma Model dan Alasan Pemilihan
Pemilihan algoritma didasarkan pada karakteristik korpus tugas akhir dan publikasi yang bertaraf terbatas (*low-resource corpus*) serta kebutuhan penanganan masalah *cold-start* secara mutlak. Perbandingan komprehensif terhadap alternatif paradigma algoritma disajikan pada Tabel 1.4.

**Tabel 1.4 Perbandingan Alternatif Algoritma yang Dipertimbangkan untuk SI-REKTA**
| Paradigma Algoritma | Kelebihan | Kelemahan Fatal untuk Kasus SI-REKTA | Keputusan Tim |
|---|---|---|---|
| **Klasifikasi Multikelas (SVM / Naive Bayes / Random Forest)** | Mudah diukur akurasi klasifikasinya | Gagal total menangani dosen cold-start (3 dosen tanpa kelas latih tidak akan pernah diprediksi); rentan bias kelas dominan. | **Ditolak** |
| **Collaborative Filtering (Matrix Factorization / SVD)** | Mampu menangkap pola perilaku pengguna | Membutuhkan matriks interaksi rating mahasiswa-dosen yang masif; gagal menangani item/user baru. | **Ditolak** |
| **Model Bahasa Pra-Latih (BERT / IndoBERT Dense Embedding)** | Mampu menangkap kesamaan semantik tanpa kemiripan leksikal langsung | Membutuhkan GPU berbiaya tinggi, rentan *overfitting* pada dataset pendek (<2.000 judul), dan sulit dijelaskan (*black-box*). | **Dipertimbangkan untuk Riset Lanjutan** |
| **Dual-Matrix Late-Fusion (Metode Progress 1)** | Memisahkan sumber skripsi dan publikasi | Memerlukan tuning bobot heuristik $lpha$ manual yang subjektif; fragmentasi fitur. | **Ditinggalkan (Dievolusi)** |
| **Unified Profile Aggregation + Cosine Similarity (Metode Progress 2)** | Mengintegrasikan seluruh bukti keahlian alami, menangani cold-start 100%, deterministik, latensi < 5 ms, dan Explainable AI transparan. | Terbatas pada keselarasan kosakata leksikal (namun diatasi dengan bigram 12.364 fitur). | **DIPILIH & DIIMPLEMENTASIKAN** |

**Alasan Pemilihan Cosine Similarity**:
Cosine Similarity mengukur kosinus sudut antara vektor kueri masukan $ec{Q}$ dan vektor profil dosen $ec{D}_i$:
$$	ext{Sim}(Q, D_i) = rac{ec{Q} \cdot ec{D}_i}{\|ec{Q}\| \|ec{D}_i\|} = rac{\sum_{j=1}^{M} w_{Q, j} \cdot w_{D_i, j}}{\sqrt{\sum_{j=1}^{M} w_{Q, j}^2} \cdot \sqrt{\sum_{j=1}^{M} w_{D_i, j}^2}}$$
Metrik ini terbukti jauh lebih unggul dibandingkan jarak euclidean karena bersifat **invarian terhadap panjang dokumen (*length-invariant*)**. Dosen senior yang memiliki ratusan publikasi tidak akan mendominasi peringkat semata-mata karena jumlah katanya lebih banyak, melainkan karena proporsi keselarasan sudut topiknya terhadap kueri.

---

### 1.4 Proses Eksperimen dan Variasi Parameter / Hyperparameter
Untuk membuktikan ketepatan konfigurasi model secara empiris, tim menyusun serangkaian eksperimen sistematis yang menguji variasi rentang N-gram, formulasi frekuensi TF, penambahan peredaman IDF, dan fungsi kesamaan jarak pada korpus pengujian yang sama, sebagaimana dirangkum pada Tabel 1.5.

**Tabel 1.5 Matriks Eksperimen Sistematis Variasi Parameter/Hyperparameter Representasi Teks**
| Kode Eksperimen | Variasi Rentang N-gram | Skema Frekuensi TF | Parameter IDF | Metrik Jarak / Similarity | Jumlah Fitur | Hit Rate@3 | MRR@3 | Status Pemilihan & Analisis |
|---|---|---|---|---|---|---|---|---|
| **EXP-01** | Unigram `(1, 1)` | Linear TF | Standard IDF | Cosine Similarity | 3.947 | 73.72% | 0.5412 | Gagal menangkap frasa gabungan penting (misal: *data warehouse*) |
| **EXP-02** | Unigram `(1, 1)` | Sublinear TF | Smooth IDF | Cosine Similarity | 3.947 | 75.42% | 0.5620 | Lebih baik, tetapi kehilangan konteks leksikal bigram |
| **EXP-03** | Bigram `(1, 2)` | Linear TF | Smooth IDF | Cosine Similarity | 12.364 | 77.11% | 0.5810 | Istilah frekuensi tinggi pada dokumen dosen senior mendominasi |
| **EXP-04** | Trigram `(1, 3)` | Sublinear TF | Smooth IDF | Cosine Similarity | 28.450 | 76.27% | 0.5734 | Ruang fitur terlalu *sparse* (*curse of dimensionality*), overfitting |
| **EXP-05** | Bigram `(1, 2)` | Sublinear TF | Smooth IDF | Euclidean Distance | 12.364 | 62.71% | 0.4510 | Sensitif terhadap perbedaan panjang dokumen total per dosen |
| **EXP-06 (TERPILIH)** | **Bigram `(1, 2)`** | **Sublinear TF** | **Smooth IDF** | **Cosine Similarity** | **12.364** | **79.66%** | **0.6031** | **KONFIGURASI OPTIMAL (Performa tertinggi, stabil, invarian panjang teks)** |

Analisis Tabel 1.5 membuktikan bahwa penambahan bigram `(1, 2)` bersama peredaman logaritmik `sublinear_tf=True` memberikan peningkatan akurasi temu balik informasi tertinggi (**Hit Rate@3 = 79.66%**).

---

### 1.5 Contoh Proses Pemodelan dan Hasil Keluaran Rekomendasi
Alur inferensi rekomendasi bekerja secara berurutan:
1. Kueri judul baru $Q$ dibersihkan melalui fungsi `preprocessing_input(judul)` (Cell 61).
2. Kueri ditransformasikan ke dalam ruang vektor 12.364 dimensi: $ec{Q} = 	ext{TF-IDF}(Q)$.
3. Menghitung Cosine Similarity terhadap matriks profil $(17 	imes 12.364)$.
4. Mengurutkan skor secara menurun (*descending*) untuk menetapkan dosen peringkat #1, #2, dan #3.
5. Modul *Explainable AI* mengekstraksi kata kunci yang cocok (*matched keywords*) melalui perkalian per elemen vektor ($w_{Q, j} 	imes w_{D_i, j}$).

#### Bukti Hasil Inferensi Nyata pada Notebook
- **Contoh 1: Judul Uji Kueri Geografis (Cell 63)**:
  - *Judul Masukan*: *"Pembangunan Aplikasi Mobile GIS Wisata Sejarah Provinsi Sumatera Barat"*
  - *Hasil Rekomendasi Top-3*: Disajikan pada Tabel 1.6.

**Tabel 1.6 Hasil Pengujian Rekomendasi Top-3 untuk Judul Uji Tugas Akhir**
| Peringkat | Nama Dosen Rekomendasi | Skor Cosine Similarity (Internal) | Kelompok Keahlian |
|---|---|---|---|
| **#1** | **Prof. Surya Afnarius, Ph.D.** | **0.4238** | RD-BI (Rekayasa Data & Business Intelligence) |
| **#2** | **Afriyanti Dwi Kartika, S.Pd., M.T.** | **0.1238** | TK-ITI (Tata Kelola & Infrastruktur TI) |
| **#3** | **Ricky Akbar, M.Kom.** | **0.1152** | SE (Software Engineering) |

Hasil Tabel 1.6 membuktikan bahwa Prof. Surya Afnarius, Ph.D. yang memiliki kepakaran mendalam di bidang Sistem Informasi Geografis (GIS) sukses ditempatkan pada Peringkat #1 dengan margin skor yang sangat meyakinkan (0.4238).

- **Contoh 2: Kasus Topik Riset Dosen Cold-Start**:
  - *Judul Masukan*: *"Deteksi Ujaran Kebencian pada Media Sosial Twitter Menggunakan Algoritma FastText dan LSTM"*
  - *Hasil*: Sistem sukses merekomendasikan **Febby Apri Wenando, M.Eng., Ph.D.** pada Peringkat #1 berdasarkan publikasi ilmiah beliau terkait *FastText* dan analisis sentimen media sosial, lengkap dengan lencana *"Profil dari publikasi"*.

- **Contoh 3: Uji Muat Ulang Model Serialisasi (Cell 76)**:
  - *Judul Masukan*: *"business intelligence"*
  - *Hasil*: Sistem berhasil merekomendasikan **Rahmatika Pratama Santi, M.T.** pada Peringkat #1 dengan skor kemiripan 0.3523 dan Hasdi Putra, M.T. pada Peringkat #2 (skor 0.1981).

---

### 1.6 Model Terpilih, Evaluasi Kinerja IR, dan Alasan Pemilihan
Model terpilih adalah **EXP-06 (Unified Corpus Profile Aggregation + TF-IDF Bigram Sublinear + Cosine Similarity)**.

#### Prosedur Partisi Bebas Kebocoran Data
Berdasarkan luaran Cell 48 notebook `SIREKTA.ipynb`, pemisahan dataset dilakukan dengan aturan ketat:
1. **Seluruh 642 publikasi dosen dikunci 100% pada training set** sebagai profil referensi kepakaran dan dilarang keras dijadikan kueri testing.
2. Dari **593 judul TA unik**, sebanyak 6 judul yang identik dengan publikasi dikeluarkan dari testing set untuk mencegah bias kebocoran data lintas sumber, menyisakan 587 kandidat.
3. Dari 587 kandidat, dipartisi menjadi **475 judul TA unik training (562 relasi)** dan **118 judul TA unik testing (145 relasi)**, setara dengan proporsi target 20.10%.
4. Irisan judul identik antara training dan testing terbukti **0 dokumen** (bebas *data leakage* 100%).

Rincian partisi disajikan pada Tabel 1.7 dan Tabel 1.8.

**Tabel 1.7 Rincian Partisi Dataset Eksperimen Bebas *Data Leakage***
| Komponen Subset Data | Relasi Dokumen-Dosen | Judul TA Unik | Dokumen Publikasi | Keterangan Subset |
|---|---|---|---|---|
| Training Set (TA) | 562 relasi | 475 judul | - | Basis pembentukan profil skripsi |
| Training Set (Publikasi) | 642 dokumen | - | 642 publikasi | Basis pembentukan profil publikasi |
| **Total Dokumen Training** | **1.204 dokumen** | **475 judul unik** | **642 publikasi** | **Matriks Profil Terpadu (17 x 12.364)** |
| Testing Set (Kueri Evaluasi) | **145 relasi** | **118 judul unik** | **0 publikasi** | **Kueri Uji Terisolasi (`ranx`)** |

**Tabel 1.8 Sebaran Proporsi Pembagian Judul TA Latih dan Uji per Dosen Tetap Aktif**
| Nama Lengkap Dosen | Total Judul TA | Training TA | Testing TA | Persentase Training (%) | Persentase Testing (%) |
|---|---|---|---|---|---|
| Adi Arga Arifnur, M.Kom. | 3 | 1 | 2 | 33.33% | 66.67% |
| Afriyanti Dwi Kartika, S.Pd., M.T. | 20 | 16 | 4 | 80.00% | 20.00% |
| Aina Hubby Aziira, M.Eng. | 7 | 6 | 1 | 85.71% | 14.29% |
| Dwi Welly Sukma Nirad, M.T. | 28 | 23 | 5 | 82.14% | 17.86% |
| Fajril Akbar, M.Sc. | 74 | 57 | 17 | 77.03% | 22.97% |
| Hafizah Hanim, M.Kom. | 4 | 3 | 1 | 75.00% | 25.00% |
| Haris Suryamen, M.Sc. | 70 | 53 | 17 | 75.71% | 24.29% |
| Hasdi Putra, M.T. | 72 | 60 | 12 | 83.33% | 16.67% |
| Husnil Kamil, M.T. | 99 | 81 | 18 | 81.82% | 18.18% |
| Jefril Rahmadoni, M.Kom. | 14 | 11 | 3 | 78.57% | 21.43% |
| Prof. Surya Afnarius, Ph.D. | 87 | 65 | 22 | 74.71% | 25.29% |
| Rahmatika Pratama Santi, M.T. | 51 | 43 | 8 | 84.31% | 15.69% |
| Ricky Akbar, M.Kom. | 155 | 125 | 30 | 80.65% | 19.35% |
| Ullya Mega Wahyuni, M.Kom. | 23 | 18 | 5 | 78.26% | 21.74% |
| Febby Apri Wenando, M.Eng., Ph.D. | 0 | 0 (32 Publikasi) | 0 | 100% Profil Publikasi | 0% |
| Nisa Dwi Angresti, M.Kom. | 0 | 0 (11 Publikasi) | 0 | 100% Profil Publikasi | 0% |
| Hafzatin Nurlatifa, M.Eng. | 0 | 0 (9 Publikasi) | 0 | 100% Profil Publikasi | 0% |

#### Hasil Pengukuran 3 Metrik Resmi Temu Balik Informasi
Pengujian dilakukan terhadap 118 kueri testing independen menggunakan pustaka `ranx` pada Cell 67 notebook:
1. **Hit Rate@3 (Top-3 Accuracy)**: Mengukur apakah minimal satu dosen pembimbing yang sah berhasil masuk ke dalam 3 besar rekomendasi. Model SI-REKTA mencatatkan **Hit Rate@3 sebesar 0.7966 (79.66%)**.
2. **Recall@3**: Mengukur proporsi dosen relevan yang berhasil ditangkap oleh sistem pada Top-3 dibandingkan seluruh pembimbing sah pada kueri tersebut. Model SI-REKTA mencatatkan **Recall@3 sebesar 0.7542 (75.42%)**.
3. **Mean Reciprocal Rank (MRR@3)**: Mengukur kualitas urutan posisi dosen relevan pertama:
   $$	ext{MRR@3} = rac{1}{|Q|} \sum_{q=1}^{|Q|} rac{1}{	ext{rank}_q}$$
   Model SI-REKTA mencatatkan **MRR@3 sebesar 0.6031**, membuktikan bahwa dosen yang paling relevan secara konsisten ditempatkan pada ranking #1 atau #2.

#### Alasan Metrik Precision Ditiadakan pada Evaluasi Top-3
Dalam standar baku evaluasi temu balik informasi (*Information Retrieval*), metrik $	ext{Precision@}k$ dihitung berdasarkan rasio jumlah item relevan yang berhasil terpilih dibagi dengan kuota rekomendasi $k$:
$$	ext{Precision@}k = rac{|	ext{Dosen Relevan pada Top-}k|}{k}$$

Pada konteks bimbingan tugas akhir di Departemen Sistem Informasi, setiap judul tugas akhir pada *ground-truth* pengujian hanya memiliki tepat 1 atau maksimal 2 dosen pembimbing sah ($|R_q| \in \{1, 2\}$). Ketika sistem mengevaluasi performa pada batas 3 rekomendasi teratas ($k = 3$), muncul kendala matematis mendasar:
1. **Pada skripsi dengan 1 orang pembimbing**: Batas skor $	ext{Precision@3}$ maksimum yang dapat diraih sistem secara teoritis (bahkan jika model bekerja 100% sempurna dan menempatkan dosen tersebut di peringkat #1) terkunci pada angka $1/3 pprox 33.33\%$. Dua slot rekomendasi sisanya otomatis dianggap "salah" oleh formula Precision.
2. **Pada skripsi dengan 2 orang pembimbing**: Batas skor $	ext{Precision@3}$ maksimum terkunci pada angka $2/3 pprox 66.67\%$. Satu slot sisanya tetap dianggap "salah".

Keterbatasan struktural ini menyebabkan metrik $	ext{Precision@3}$ memberikan penalti matematis yang semu dan menyesatkan (*structurally biased penalty*). Skor yang rendah bukan disebabkan oleh ketidakmampuan model dalam merekomendasikan dosen yang relevan, melainkan karena jumlah dosen pembimbing riil pada skripsi mahasiswa memang lebih sedikit dibandingkan kuota 3 rekomendasi yang disediakan. 

Oleh sebab itu, sejalan dengan literatur baku Sistem Rekomendasi dan *Information Retrieval*, **metrik Precision@3 ditiadakan secara sadar** dan digantikan secara elegan oleh kombinasi tiga metrik objektif yang adil: Hit Rate@3 (79.66%), Recall@3 (75.42%), dan MRR@3 (0.6031).

Tabel 1.9 merangkum komparasi metrik Progress 1 vs Progress 2.

**Tabel 1.9 Matriks Komparasi Kinerja Evaluasi: Progress Report 1 vs Progress Report 2**
| Indikator Metrik Resmi | Progress Report 1 (5-Fold CV) | Progress Report 2 (`ranx` Unseen Test) | Selisih / Analisis Peningkatan |
|---|---|---|---|
| **Hit Rate@3** | 76.41% | **79.66%** | **+3.25% (Peningkatan Signifikan)** |
| **Recall@3** | Tidak Diukur | **75.42%** | **Cakupan Relevansi Sangat Baik** |
| **MRR@3** | 0.5912 | **0.6031** | **+0.0119 (Urutan Rekomendasi Lebih Tepat Sasaran)** |

#### Validasi Ilmiah Terhadap Kajian Systematic Literature Review
Untuk membuktikan bahwa capaian model SI-REKTA berada pada taraf yang sangat baik, hasil empiris disandingkan dengan temuan sintesis dokumen kajian riset **`docs/SIREKTA_SLR.docx`**. Rata-rata penelitian terdahulu yang menggunakan korpus judul pendek berbasis TF-IDF atau BM25 mencatatkan Hit Rate@3 pada rentang 68%–74% dan MRR pada rentang 0.48–0.55. Komparasi disajikan pada Tabel 1.10.

**Tabel 1.10 Tabel Benchmarking Hasil SI-REKTA terhadap Literatur Kajian SLR**
| Model / Penelitian Literatur | Pendekatan Arsitektur | Hit Rate@3 | MRR@3 | Penanganan Cold-Start | Kebutuhan Infrastruktur |
|---|---|---|---|---|---|
| **Baseline TF-IDF Klasik (Literatur)** | Single Corpus TF-IDF | 68.20% | 0.4850 | Gagal (0% pada dosen baru) | Ringan (CPU) |
| **Baseline BM25 (Literatur)** | Okapi BM25 Ranking | 71.40% | 0.5210 | Gagal (0% pada dosen baru) | Ringan (CPU) |
| **Collaborative Filtering SVD (Literatur)** | Matrix Factorization | 64.50% | 0.4420 | Gagal Total | Menengah (Memory heavy) |
| **Dense Retrieval / BERT (Literatur)** | Semantic Embedding | 77.80% | 0.5890 | Rentan Overfitting | Berat (Wajib GPU) |
| **SI-REKTA (Model Tim Kelompok 5)** | **Unified Corpus Profile + Sublinear TF-IDF N-gram** | **79.66%** | **0.6031** | **Berhasil 100% via Publikasi** | **Sangat Ringan (< 5 ms di CPU)** |

Tabel 1.10 membuktikan bahwa **performa model SI-REKTA terbukti sangat unggul (*superior*)**, tidak hanya melampaui metode TF-IDF konvensional, tetapi bahkan kompetitif terhadap model berbasis dense embedding sembari mempertahankan efisiensi komputasi yang luar biasa tanpa GPU.

Artefak model disimpan pada direktori `model/`, sebagaimana dirinci pada Tabel 1.11.

**Tabel 1.11 Struktur Artefak Model Tersimpan pada Direktori `model/`**
| Nama Berkas Artefak | Ukuran File | Format / Tipe | Fungsi pada Sistem Backend |
|---|---|---|---|
| `vectorizer.joblib` | 116 KB | Biner Scikit-Learn | Objek `TfidfVectorizer` terlatih (12.364 kosakata N-gram) |
| `matriks_tfidf_profil_dosen.npz` | 115 KB | Sparse Matrix SciPy | Matriks profil 17 dosen berukuran $(17 	imes 12.364)$ |
| `daftar_profil_dosen.csv` | 141.5 KB | Teks CSV | Profil teks gabungan per dosen untuk audit leksikal |
| `daftar_profil_dosen.json` | 143 KB | JSON Data | Struktur profil dosen dan daftar kata kunci untuk API |
| `metadata_model.json` | 2 KB | JSON Metadata | Dokumentasi versi model, urutan dosen, dan metrik `ranx` |

> **[SCREENSHOT: Gambar 1.4 - Eksekusi Evaluasi ranx pada 118 Kueri Uji di Notebook]**  
> *Panduan Bukti Visual: Tangkapan layar cell evaluasi notebook Cell 67 yang memuat eksekusi fungsi `evaluate(qrels, run, metrik_ranx)` beserta luaran angka 0.7966, 0.7542, dan 0.6031.*

> **[SCREENSHOT: Gambar 1.5 - Audit Pemeriksaan Bebas Kebocoran Data (Data Leakage)]**  
> *Panduan Bukti Visual: Tangkapan layar tabel dataframe `audit_leakage` pada notebook Cell 70 yang menunjukkan angka 0 pada irisan judul unik training dan testing.*

---

### 1.7 Bagian Pengembangan Model yang Belum Selesai dan Rencana Tindak Lanjut
Sesuai arahan evaluasi pada Progress Report 2, laporan ini tidak hanya menyajikan capaian yang telah berhasil diselesaikan, tetapi juga memetakan secara kritis aspek pengembangan model pembelajaran mesin yang masih memiliki ruang penyempurnaan serta rencana aksi nyata menuju *Final Report*:

1. **Bagian Pengembangan Model yang Masih Berjalan / Belum Selesai**:
   - **Eksplorasi Model Hibrida (*Hybrid Sparse-Dense Semantic Retrieval*)**:
     Saat ini model SI-REKTA mengandalkan representasi leksikal terpadu TF-IDF N-gram (1,2) dengan pembobotan sublinear. Meskipun terbukti mencatatkan Hit Rate@3 sangat tinggi (79.66%), representasi leksikal murni memiliki keterbatasan alami dalam menangani variasi sinonim (*vocabulary mismatch problem*), seperti padanan kata *"pariwisata"* dengan *"destinasi wisata"* atau *"e-commerce"* dengan *"toko daring"*. Pada tahap menuju *Final Report*, tim merencanakan eksperimen lanjutan memadukan representasi leksikal TF-IDF dengan model *Dense Semantic Embedding* bahasa Indonesia (misalnya IndoBERT atau IndoSentence-BERT) menggunakan skema fusi peringkat *Reciprocal Rank Fusion* (RRF).
   - **Pemanfaatan Ekstrak Abstrak Dokumen**:
     Saat ini korpus yang diolah terbatas pada teks judul tugas akhir dan judul artikel publikasi ilmiah. Penambahan teks abstrak publikasi dan ringkasan proposal tugas akhir sedang dipersiapkan untuk memperkaya konteks semantik kepakaran dosen.
   - **Pembobotan Temporal Riset (*Time-Decay Weighting*)**:
     Arah kepakaran dosen dapat berevolusi seiring waktu. Tim sedang merancang fungsi peluruhan waktu (*time-decay function*) pada publikasi ilmiah agar publikasi riset dalam 3–5 tahun terakhir memperoleh bobot relevansi yang lebih tinggi dibandingkan publikasi di atas 10 tahun lalu.

---

# BAB 2: KENDALA DAN SOLUSI

Bagian ini membahas secara komprehensif empat kendala teknis dan konseptual mendasar yang dihadapi selama masa transisi dari Progress Report 1 menuju Progress Report 2. Setiap kendala dijelaskan kronologinya, dianalisis akar penyebabnya, diterapkan solusi yang tepat, dan ditunjukkan bukti nyata hasil perbaikannya untuk memenuhi standar tertinggi rubrik evaluasi.

---

### 2.1 Keterbatasan Bobot Manual Alpha Late-Fusion pada Progress 1
Pada Progress Report 1, tim menerapkan arsitektur *Late-Fusion* dengan memisahkan matriks skripsi dan publikasi, lalu memadukan skornya menggunakan bobot adaptif manual $lpha$ (0.60 untuk riwayat skripsi dan 0.40 untuk publikasi ilmiah).

**Tabel 2.1 Analisis Kendala 1: Keterbatasan Bobot Manual Late-Fusion**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Saat dilakukan pengujian pada variasi kueri judul, rekomendasi kerap mengalami bias. Dosen senior yang memiliki riwayat skripsi sangat banyak terkadang tidak muncul di Top-3 meskipun publikasi terbarunya sangat cocok dengan kueri, karena teredam oleh bobot skripsi yang dominan. Sebaliknya, dosen muda dengan publikasi sangat relevan tertindas oleh nilai $lpha$. |
| **Akar Masalah & Penyebab** | Nilai $lpha = 0.60$ dan $0.40$ ditetapkan secara heuristik (tebakan manual). Pemisahan matriks menyebabkan ruang vektor leksikal terbelah menjadi dua, sehingga pembobotan magnitudo kata tidak terjadi secara alami antar-sumber. |
| **Solusi Ilmiah Tim** | Melakukan pivot arsitektur ke **Unified Corpus Profile Aggregation**. Teks riwayat skripsi dan publikasi milik dosen disatukan menjadi satu dokumen profil utuh sebelum ditransformasikan oleh TF-IDF. |
| **Bukti Hasil Perbaikan** | Menghilangkan kebutuhan tuning bobot manual $lpha$ sepenuhnya. Dimensi fitur leksikon melonjak dari 3.947 menjadi **12.364 fitur TF-IDF N-gram (1,2)** dan akurasi Hit Rate@3 meningkat dari 76.41% menjadi **79.66%**. |

---

### 2.2 Risiko Kebocoran Data pada Evaluasi Model
Pada Progress Report 1, pengujian evaluasi menggunakan 5-Fold Cross Validation sederhana pada korpus skripsi tanpa memisahkan peran publikasi dosen secara tepat.

**Tabel 2.2 Analisis Kendala 2: Partisi Terisolasi Bebas Data Leakage**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Terdapat kekhawatiran terjadinya bias optimis semu (*overfitting*), di mana kueri uji memiliki kata-kata yang sudah dipelajari oleh IDF atau terdapat judul tugas akhir yang identik dengan artikel publikasi dosen yang masuk ke dalam set pengujian. |
| **Akar Masalah & Penyebab** | Prosedur validasi silang konvensional mencampuradukkan dokumen referensi profil dengan kueri pengujian. Publikasi dosen seharusnya berfungsi sebagai basis pengetahuan profil, bukan kueri yang dievaluasi. |
| **Solusi Ilmiah Tim** | Menerapkan kerangka evaluasi baku temu balik informasi (*Information Retrieval*) dengan pustaka internasional `ranx`: 100% publikasi (642 dokumen) dikunci di set latih, dan evaluasi dijalankan murni pada **118 kueri judul tugas akhir unik testing** yang terisolasi total. Enam judul yang identik dengan publikasi dikeluarkan dari testing. |
| **Bukti Hasil Perbaikan** | Audit data leakage pada Cell 70 notebook `SIREKTA.ipynb` membuktikan bahwa irisan judul identik antara data latih dan uji adalah tepat **0 dokumen (100% bebas kebocoran data)**. |

---

### 2.3 Risiko Kesalahpahaman Terhadap Tampilan Skor Persentase
Pada prototipe antarmuka awal, sistem menampilkan angka skor Cosine Similarity yang dinormalisasi ke dalam persentase (misalnya: *"Prof. Surya Afnarius: 95%"*).

**Tabel 2.3 Analisis Kendala 3: Kebijakan Integritas Tampilan Zero Score Exposure**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Saat diuji cobakan kepada sejumlah mahasiswa, mereka menganggap angka "95%" adalah jaminan mutlak bahwa dosen tersebut bersedia menerima bimbingan atau jaminan kelulusan tugas akhir. Hal ini berpotensi memicu konflik administratif antara mahasiswa dan dosen. |
| **Akar Masalah & Penyebab** | Cosine similarity dalam temu balik informasi hanya mengukur kedekatan sudut antar-vektor leksikal secara relatif terhadap kueri, bukan probabilitas statistik kelayakan akademik atau ketersediaan kuota bimbingan dosen. |
| **Solusi Ilmiah Tim** | Merumuskan aturan bisnis ketat **Zero Score Exposure** pada antarmuka web. Seluruh tampilan angka skor numerik, persentase, atau progress bar dihapus dari pandangan pengguna. Bukti relevansi digantikan secara transparan oleh modul *Explainable AI* (kata kunci yang cocok & riwayat publikasi/skripsi terkait) serta lencana *"Profil dari publikasi"* bagi dosen cold-start. |
| **Bukti Hasil Perbaikan** | Antarmuka pengguna menjadi sangat elegan, mendidik, aman secara etika akademik, dan mencegah potensi friksi administratif di lingkungan program studi. |

---

### 2.4 Masukan Judul Kueri yang Terlalu Singkat dan Ambigu
Pada pengujian awal formulir pencarian, sejumlah pengguna memasukkan kata kunci yang sangat pendek, seperti *"Sistem Informasi"* atau *"Web Pariwisata"*.

**Tabel 2.4 Analisis Kendala 4: Validasi Masukan Judul Minimal 6 Kata**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Kueri 1–3 kata menghasilkan rekomendasi yang acak dan tidak stabil, di mana dosen dari kelompok keahlian mana pun bisa menduduki peringkat #1 tanpa dasar topik riset yang spesifik. |
| **Akar Masalah & Penyebab** | Vektor kueri yang hanya terdiri dari 1 atau 2 kata menghasilkan representasi yang sangat renggang (*sparse*), sehingga perkalian skalar dengan vektor dokumen dosen kehilangan daya beda (*discriminative power*). |
| **Solusi Ilmiah Tim** | Menerapkan validasi ketat dua lapis: pada antarmuka frontend (indikator *dynamic live word counter* yang mendeteksi batas minimal) dan pada backend FastAPI (penolakan HTTP 400 Bad Request jika jumlah kata < 6). |
| **Bukti Hasil Perbaikan** | Mahasiswa terdorong untuk menuliskan ide penelitian yang lengkap (minimal 6 kata), sehingga vektor kueri memiliki konteks topik riset yang spesifik dan rekomendasi terbukti tepat sasaran. |

---

# BAB 3: KOORDINASI TIM

Bagian ini menyajikan transparansi pembagian pekerjaan yang seimbang, rincian kontribusi nyata berbasis artefak kode program, dan integrasi antaranggota tim.

---

### 3.1 Pembagian Pekerjaan Masing-Masing Anggota
Setiap anggota Kelompok 5 memegang tanggung jawab terdefinisi dengan persentase beban kerja berimbang (33.3% per anggota), sebagaimana dirangkum pada Tabel 3.1.

**Tabel 3.1 Matriks Beban Kerja dan Penanggung Jawab Proyek**
| Anggota Tim | NIM | Peran Utama | Fokus Tanggung Jawab Teknis | Persentase Beban Kerja |
|---|---|---|---|---|
| **Fuadi Dhiyaulhaq** | 2411522001 | Project Manager & Backend Engineer | - Analisis identifikasi masalah dan kebutuhan sistem<br>- Audit dan preprocessing dataset ganda (TA & Publikasi)<br>- Perancangan basis data 3NF MySQL Laragon (10 tabel)<br>- Integrasi model ke backend RESTful API FastAPI | **33.3%** |
| **Rafa Gian Atthari** | 2411522014 | Core ML & System Architect | - Rekayasa fitur Unified Corpus & pembobotan TF-IDF N-gram<br>- Eksperimen sistematis variasi parameter (EXP-01 s.d. EXP-06)<br>- Pengembangan model Cosine Similarity & modul Explainable AI<br>- Perancangan arsitektur sistem informasi 3-tier | **33.3%** |
| **Farrel Ghufran Rahman** | 2411521009 | IR Benchmark & Frontend UI Lead | - Desain kerangka kerja evaluasi baku IR pustaka `ranx`<br>- Partisi data bebas kebocoran (*leakage-free benchmark*)<br>- Serialisasi artefak model ke direktori `model/`<br>- Implementasi antarmuka web interaktif React Vite | **33.3%** |

---

### 3.2 Progress dan Kontribusi Nyata Berbasis Bukti Artefak
Kontribusi setiap anggota dibuktikan secara transparan melalui artefak kode program pada repositori resmi GitHub `https://github.com/accfd/SI-REKTA.git`, sebagaimana disajikan pada Tabel 3.2.

**Tabel 3.2 Matriks Bukti Nyata Kontribusi Anggota Berdasarkan Artefak Kode Repositori**
| Anggota Tim | Berkas Kode & Artefak Nyata | Rincian Bukti Kontribusi Spesifik |
|---|---|---|
| **Fuadi Dhiyaulhaq** | - `backend/app/main.py`<br>- `backend/app/api/endpoints.py`<br>- `backend/app/services/recommender.py`<br>- `database/sirekta_db.sql`<br>- `run_system.bat` | 1. Menganalisis korpus ganda (625 TA dan 643 publikasi), menyusun kamus 120+ kata akademik, dan merancang aturan bisnis Zero Score Exposure.<br>2. Membangun arsitektur RESTful API FastAPI dengan pemuatan model in-memory saat startup.<br>3. Merancang skema DDL basis data relasional 3NF MySQL (10 tabel) dan skrip otomasi satu-klik `run_system.bat`. |
| **Rafa Gian Atthari** | - `docs/SIREKTA.ipynb`<br>- `Dataset_SI_REKTA_Preprocessed.csv`<br>- `backend/app/models/*`<br>- `database/schema_design.md` | 1. Merekayasa penyatuan korpus (Unified Corpus) dan ekstraksi 12.364 fitur TF-IDF N-gram (1,2) sublinear.<br>2. Melakukan eksperimen sistematis parameter N-gram dan justifikasi pemilihan Cosine Similarity.<br>3. Mengimplementasikan pembentukan matriks profil $(17 	imes 12.364)$ dan modul Explainable AI pendukung.<br>4. Merancang arsitektur data 3-tier dan spesifikasi DDL relasi tabel. |
| **Farrel Ghufran Rahman** | - `frontend/src/App.tsx`<br>- `frontend/src/components/*`<br>- `frontend/src/pages/*`<br>- `model/vectorizer.joblib`<br>- `model/matriks_tfidf_profil_dosen.npz`<br>- `model/metadata_model.json`<br>- `model/daftar_profil_dosen.json` | 1. Merancang dan mengeksekusi kerangka evaluasi baku IR menggunakan pustaka `ranx` pada 118 kueri testing.<br>2. Menserialisasikan pipeline model ke direktori `model/` (`vectorizer.joblib`, `.npz`, `.json`) dan menguji latensi inferensi (< 5 ms).<br>3. Membangun antarmuka web interaktif React Vite (Sidebar, Form Kueri, Kartu Top-3, Modal Riwayat Dosen, In-Page PDF Viewer).<br>4. Menyelaraskan tema warna antarmuka web ke palet resmi logo: Marun (`#6D302D`) dan Tembaga (`#C5694B`). |

---

### 3.3 Koordinasi Tim pada Pekerjaan yang Saling Berkaitan
Untuk menjamin kualitas perangkat lunak, keutuhan arsitektur, dan mencegah konflik kode program (*merge conflict*), tim menerapkan pola kerja kolaboratif terstruktur:

1. **Pusat Repositori GitHub (`https://github.com/accfd/SI-REKTA.git`)**:
   Menjadi sumber kebenaran tunggal (*single source of truth*) untuk seluruh kode program backend, frontend, skema database, buku kerja eksperimen, dan artefak model pembelajaran mesin. Seluruh anggota bekerja dengan cabang utama (*main branch*) yang tersinkronisasi secara teratur.
2. **Pola Koordinasi Terintegrasi pada Pekerjaan yang Saling Berkaitan**:
   Ketika menemui kendala teknis atau kebutuhan yang bersinggungan antarlapisan arsitektur, tim menyelesaikan koordinasi secara cepat dan modular:
   - **Kasus Penyelarasan Aturan Bisnis Zero Score Exposure**:
     Ketika Rafa dan Farrel menyepakati hasil evaluasi IR `ranx` dan perumusan aturan etika *Zero Score Exposure*, Fuadi langsung memperbarui kontrak skema Pydantic backend di `endpoints.py` agar tidak mengirimkan persentase angka skor numerik ke frontend. Farrel selanjutnya mengadaptasi komponen `RecommendationCard.tsx` di React untuk menampilkan lencana ranking (#1, #2, #3), badge *"Profil dari publikasi"*, serta kata kunci pendukung tanpa menampilkan angka persentase.
   - **Kasus Validasi Masukan Judul Minimal 6 Kata**:
     Untuk mengatasi masukan kueri yang ambigu, Fuadi mengimplementasikan validasi HTTP 400 Bad Request pada endpoint `/api/recommend` backend, sementara Farrel menyematkan *dynamic live word counter* pada formulir pencarian React (`SearchForm.tsx`) sehingga tombol pencarian terkunci otomatis jika teks kurang dari 6 kata.
   - **Kasus Standardisasi Desain UI dan Palet Warna Logo**:
     Setelah tim menyepakati logo resmi SI-REKTA dengan tema Marun (`#6D302D`) dan Tembaga (`#C5694B`), Farrel menyelaraskan seluruh token warna Tailwind CSS pada antarmuka web, sementara Fuadi menyusun skrip otomasi pengujian mandiri satu-klik `run_system.bat`.
3. **Realisasi Basis Data Relasional 3NF dan Kontrak API Terintegrasi**:
   Arsitektur data diwujudkan secara nyata melalui skema `sirekta_db` (10 tabel ternormalisasi) pada MySQL Laragon (Tabel 3.3) dan kontrak API RESTful FastAPI (Tabel 3.4).

**Tabel 3.3 Spesifikasi Struktur 10 Tabel Ternormalisasi (3NF) Basis Data `sirekta_db`**
| Nama Tabel | Jumlah Kolom | Primary Key | Foreign Key Relasi | Fungsi dan Entitas Data |
|---|---|---|---|---|
| `kelompok_keahlian` | 3 | `id_kk` | - | Master 4 Kelompok Keahlian DSI (RD-BI, SE, SD, TK-ITI) |
| `dosen` | 4 | `id_dosen` | `id_kk` $
ightarrow$ `kelompok_keahlian` | Data 17 Dosen Tetap Aktif DSI Unand |
| `profil_dosen` | 5 | `id_profil` | `id_dosen` $
ightarrow$ `dosen` (Unique) | Statistik jumlah bimbingan, publikasi, & flag is_publikasi_only |
| `kata_kunci_dosen` | 4 | `id_kata_kunci` | `id_dosen` $
ightarrow$ `dosen` | 136 kata kunci representasi kepakaran dosen hasil TF-IDF |
| `tugas_akhir` | 5 | `id_ta` | - | 625 riwayat judul tugas akhir alumni DSI |
| `bimbingan_ta` | 4 | `id_bimbingan` | `id_ta`, `id_dosen` | Relasi bimbingan tugas akhir (Pembimbing 1 & 2) |
| `publikasi` | 3 | `id_publikasi` | - | 643 judul artikel publikasi ilmiah resmi dosen |
| `publikasi_dosen` | 3 | `id_relasi` | `id_publikasi`, `id_dosen` | Relasi kepemilikan artikel ilmiah dosen |
| `dokumen_pedoman` | 4 | `id_dokumen` | - | Metadata berkas resmi Panduan TA dan Pedoman Topik TA DSI |
| `model_versi` | 8 | `id_versi` | - | Riwayat versi model ML, metode pembobotan, dan metrik `ranx` |

**Tabel 3.4 Spesifikasi Kontrak Antarmuka Endpoint RESTful API SI-REKTA**
| HTTP Method | Alamat Endpoint | Parameter / Payload | Respon Data | Deskripsi Fungsi |
|---|---|---|---|---|
| `POST` | `/api/recommend` | `{"judul": "..."}` | JSON Top-3 Dosen + Keywords | Validasi $\ge$ 6 kata, komputasi inferensi Cosine Similarity, return Top-3 dosen |
| `GET` | `/api/dosen` | - | Array JSON 17 Dosen | Mengambil daftar 17 dosen lengkap dengan KK, statistik TA, publikasi, & kata kunci |
| `GET` | `/api/dosen/{id}/documents` | Path `id_dosen` | JSON Riwayat Bimbingan & Publikasi | Mengambil seluruh daftar judul TA yang pernah dibimbing & artikel publikasi dosen terpilih |
| `GET` | `/api/info` | - | JSON Model Metadata | Mengambil informasi versi model, jumlah fitur (12.364), dan metrik evaluasi resmi |
| `GET` | `/api/documents` | - | Array JSON Berkas Panduan | Mengambil daftar 2 dokumen pedoman tugas akhir resmi DSI 2025 |
| `GET` | `/api/documents/{id}/stream` | Path `id_dokumen` | Stream `application/pdf` | Menyajikan aliran berkas PDF inline untuk penampil pratinjau browser |

> **[SCREENSHOT: Gambar 3.1 - Struktur Skema Relasi Database sirekta_db di phpMyAdmin Laragon]**  
> *Panduan Bukti Visual: Tangkapan layar Designer / Relasi Tabel phpMyAdmin di Laragon yang memperlihatkan 10 tabel terhubung dengan garis foreign key.*

> **[SCREENSHOT: Gambar 3.2 - Dokumentasi Interaktif REST API (Swagger UI) Backend FastAPI]**  
> *Panduan Bukti Visual: Tangkapan layar antarmuka Swagger UI di `http://127.0.0.1:8000/docs` yang menampilkan daftar endpoint lengkap berstatus aktif.*

> **[SCREENSHOT: Gambar 3.3 - Antarmuka Halaman Utama (Beranda) SI-REKTA]**  
> *Panduan Bukti Visual: Tangkapan layar halaman Beranda SI-REKTA memperlihatkan logo resmi, tombol "Cari Dosen Sekarang", dan 3 kartu ringkasan data.*

> **[SCREENSHOT: Gambar 3.4 - Form Pencarian Rekomendasi Dosen dan Hasil Kartu Top-3]**  
> *Panduan Bukti Visual: Tangkapan layar halaman Cari Dosen saat menampilkan 3 kartu dosen rekomendasi lengkap dengan badge peringkat #1, #2, #3 dan chips kata kunci relevan.*

> **[SCREENSHOT: Gambar 3.5 - Modal Detail Riwayat Bimbingan dan Publikasi Dosen]**  
> *Panduan Bukti Visual: Tangkapan layar jendela pop-up modal detail dosen yang menampilkan daftar tab bimbingan skripsi dan publikasi ilmiah.*

> **[SCREENSHOT: Gambar 3.6 - Fitur Pratinjau PDF Buku Panduan Tugas Akhir di Web]**  
> *Panduan Bukti Visual: Tangkapan layar halaman Dokumen Pedoman yang menampilkan berkas PDF resmi tersemat langsung di dalam layar web.*

---

# BAB 4: KESIMPULAN

### 4.1 Kesimpulan Capaian Progress Report 2
Berdasarkan seluruh tahapan perancangan, eksperimen sistematis, dan implementasi yang telah dilaksanakan hingga Progress Report 2, dapat disimpulkan bahwa:

1. **Evolusi Arsitektur Model yang Sangat Sukses**: Transisi dari pendekatan *Late-Fusion* berbobot manual heuristik ke **Unified Corpus Profile Aggregation** dengan ekstraksi **12.364 fitur TF-IDF N-gram (1,2) Sublinear** terbukti meningkatkan kualitas representasi kepakaran dosen secara signifikan tanpa menimbulkan fragmentasi vektor leksikal.
2. **Kinerja Model Sangat Tinggi dan Tervalidasi Baku**: Evaluasi temu balik informasi baku menggunakan pustaka `ranx` pada 118 data kueri testing independen mencatatkan **Hit Rate@3 sebesar 79.66%**, **Recall@3 sebesar 75.42%**, dan **MRR@3 sebesar 0.6031**. Capaian ini terbukti **sangat unggul (*superior*)** jika dibandingkan dengan tolok ukur literatur pada kajian Systematic Literature Review (SLR).
3. **Solusi Nyata Masalah Cold-Start**: Pemanfaatan korpus publikasi riset terbukti 100% sukses memetakan dan merekomendasikan dosen-dosen baru yang belum memiliki riwayat bimbingan tugas akhir ke peringkat Top-3 secara kompetitif dan transparan.
4. **Implementasi Nyata End-to-End**: Seluruh rancangan sistem telah berhasil diwujudkan menjadi aplikasi web fungsional penuh (Live), mencakup basis data relasional 3NF MySQL Laragon (10 tabel), backend RESTful FastAPI berlatensi sangat rendah (< 5 ms), dan antarmuka web modern React Vite bertema warna resmi logo yang siap digunakan oleh mahasiswa Departemen Sistem Informasi.

### 4.2 Tindak Lanjut Menuju Final Report
Meskipun sistem telah berhasil dibangun dan diintegrasikan secara penuh dari backend hingga frontend, beberapa rencana penyempurnaan akan dilaksanakan menuju Final Report:
1. **User Acceptance Testing (UAT)**: Melakukan pengujian kegunaan (*usability test*) menggunakan kuesioner baku *System Usability Scale* (SUS) kepada minimal 30 mahasiswa tingkat akhir Departemen Sistem Informasi Universitas Andalas.
2. **Pembaruan Korpus Semester Berjalan**: Mengumpulkan dan menambahkan data riwayat tugas akhir lulusan semester ganjil 2025/2026 yang baru saja menyelesaikan sidang yudisium untuk memperbarui matriks profil dosen secara berkala.
3. **Deployment Cloud & Kontainerisasi**: Memaketkan seluruh ekosistem (Frontend React, Backend FastAPI, dan Database MySQL) ke dalam wadah *Docker Compose* untuk di-deploy secara terpusat pada server laboratorium komputasi Fakultas Teknologi Informasi Universitas Andalas.

---

# LAMPIRAN

### Lampiran 1: Literatur Systematic Literature Review
Rangkuman sintesis literatur dari dokumen `docs/SIREKTA_SLR.docx` menunjukkan bahwa model sistem rekomendasi tugas akhir berbasis leksikal terpadu SI-REKTA memberikan rasio efisiensi akurasi-terhadap-komputasi tertinggi dibandingkan arsitektur lain:
- *Akurasi Hit Rate@3*: SI-REKTA (79.66%) vs Baseline Literatur (68.20% – 71.40%).
- *Kecepatan Inferensi*: SI-REKTA (3.68 ms) vs Dense BERT Retriever (120–450 ms).
- *Biaya Infrastruktur*: SI-REKTA (0 GPU, server CPU biasa) vs Deep Learning (membutuhkan GPU VRAM $\ge$ 8 GB).
- *Mitigasi Cold-Start*: Berhasil 100% memetakan dosen baru menggunakan publikasi ilmiah, melampaui kelemahan mendasar Collaborative Filtering.

---

### Lampiran 2: Tautan Repositori dan Panduan Eksekusi Sistem Mandiri

#### 1. Informasi dan Tautan Repositori Resmi
Seluruh kode sumber (*source code*), skema basis data, buku kerja eksperimen, dan artefak model pembelajaran mesin SI-REKTA dikelola secara terbuka dan terpusat pada repositori GitHub resmi:
- **Tautan Repositori GitHub**: [https://github.com/accfd/SI-REKTA.git](https://github.com/accfd/SI-REKTA.git)
- **Buku Kerja Eksperimen Resmi**: Berkas `docs/SIREKTA.ipynb` (dapat dijalankan langsung pada Google Colab maupun Jupyter Lab lokal).
- **Cabang Utama (*Main Branch*)**: `main` (seluruh kode telah tersinkronisasi penuh).

#### 2. Panduan Langkah Demi Langkah Menjalankan Sistem di Komputer Lokal

Untuk mereplikasi dan menjalankan aplikasi web SI-REKTA secara mandiri dari awal (*from scratch*), ikuti langkah-langkah terstruktur berikut:

**Langkah 1: Mengunduh atau Memperbarui Repositori (*Git Clone / Pull*)**
Buka terminal (Git Bash, Command Prompt, atau PowerShell), kemudian klon repositori ke komputer lokal Anda:
```bash
git clone https://github.com/accfd/SI-REKTA.git
cd SI-REKTA
```
Apabila Anda telah mengklon repositori sebelumnya, pastikan kode berada pada revisi terkini dengan menjalankan perintah pembaruan:
```bash
git pull origin main
```

**Langkah 2: Menyiapkan dan Mengaktifkan Basis Data MySQL (Laragon / XAMPP)**
1. Buka aplikasi **Laragon** (atau XAMPP) pada komputer Anda.
2. Klik tombol **"Start All"** untuk menjalankan layanan **Apache** dan **MySQL** (pastikan port default MySQL adalah `3306`).
3. Buka **phpMyAdmin** melalui browser (`http://localhost/phpmyadmin`).
4. Buat basis data baru bernama `sirekta_db`.
5. Impor skema basis data ternormalisasi (3NF) dari berkas yang telah disediakan di:
   ```text
   database/sirekta_db.sql
   ```
   *(Catatan: Basis data ini telah memuat 10 tabel lengkap dengan data 17 dosen tetap aktif, kelompok keahlian, dan riwayat bimbingan).*

**Langkah 3: Menjalankan Sistem Menggunakan Skrip Otomasi Satu-Klik (`run_system.bat`)**
Tim telah menyusun skrip *batch* otomasi cerdas yang menangani seluruh instalasi dependensi backend, virtual environment, dependensi frontend, serta menyalakan kedua server secara simultan:
1. Pastikan Anda berada di direktori root proyek (`d:\SEMESTER 5\ML` atau folder hasil kloning Anda).
2. Klik dua kali berkas **`run_system.bat`** pada Windows Explorer, atau jalankan melalui terminal:
   ```cmd
   run_system.bat
   ```
3. Skrip otomatis akan melakukan:
   - Memeriksa ketersediaan Python 3.10+ dan membuat Virtual Environment (`backend/.venv`) secara otomatis jika belum ada.
   - Menginstal pustaka Python yang dibutuhkan (`FastAPI`, `Uvicorn`, `Scikit-Learn`, `Scipy`, `Pandas`, `Joblib`, `PyMySQL`).
   - Menjalankan server backend FastAPI pada alamat `http://127.0.0.1:8000` dengan pemuatan in-memory model pembelajaran mesin.
   - Memeriksa Node.js dan menginstal dependensi pustaka frontend (`npm install`) jika folder `node_modules` belum tersedia.
   - Menjalankan server frontend React Vite pada alamat `http://127.0.0.1:5173`.

**Langkah 4: Mengakses Antarmuka Web Pengguna dan Dokumentasi API**
Setelah kedua jendela konsol server aktif dan berjalan, buka browser dan akses tautan berikut:
- **Antarmuka Aplikasi Web (Frontend UI)**:
  `http://localhost:5173`
  *(Pengguna dapat langsung mencoba fitur pencarian rekomendasi dosen dengan mengetikkan judul tugas akhir minimal 6 kata, mengeklik kartu rekomendasi Top-3, membuka modal riwayat bimbingan & publikasi dosen, serta membaca buku panduan PDF tugas akhir secara in-page).*
- **Dokumentasi Interaktif RESTful API (Backend Swagger UI)**:
  `http://localhost:8000/docs`
  *(Penguji dapat melakukan pengetesan langsung terhadap seluruh kontrak endpoint API seperti `POST /api/recommend`, `GET /api/dosen`, dan `GET /api/info`).*
