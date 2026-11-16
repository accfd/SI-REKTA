# LAPORAN PROGRESS REPORT 2 PROYEK MACHINE LEARNING
## SI-REKTA: SISTEM REKOMENDASI DOSEN PEMBIMBING TUGAS AKHIR BERBASIS DUAL-SOURCE DATASET, UNIFIED PROFILE MATCHING, DAN EXPLAINABLE AI

---

### **Dosen Pengampu:**
1. **Febby Apri Wenando, S.Kom., M.Eng., Ph.D.**
2. **Aina Hubby Aziira, S.Kom., M.Eng.**

### **Mata Kuliah:**
**Machine Learning (DSI61133) — Semester 5 Tahun Ajaran 2026**

---

### **Disusun Oleh (Kelompok 5):**
| No | Nama Anggota | NIM | Pembagian Tanggung Jawab 12 Tahapan Resmi |
|---|---|---|---|
| 1 | **Fuadi Dhiyaulhaq** | 2411522001 | Tahap 1, Tahap 2, Tahap 3, Tahap 4, dan Tahap 11 |
| 2 | **Rafa Gian Atthari** | 2411522014 | Tahap 5, Tahap 6, Tahap 7, dan Tahap 10 |
| 3 | **Farrel Ghufran Rahman** | 2411521009 | Tahap 8, Tahap 9, dan Tahap 12 |

---

### **DEPARTEMEN SISTEM INFORMASI**
### **FAKULTAS TEKNOLOGI INFORMASI**
### **UNIVERSITAS ANDALAS**
### **PADANG, 2026**

---

## KATA PENGANTAR

Puji dan syukur ke hadirat Allah Subhanahu Wa Ta'ala atas limpahan rahmat dan karunia-Nya sehingga Kelompok 5 dapat menyelesaikan dokumen **Laporan Progress Report 2 Proyek Machine Learning** dengan judul **"SI-REKTA: Sistem Rekomendasi Dosen Pembimbing Tugas Akhir Berbasis Dual-Source Dataset, Unified Profile Matching, dan Explainable AI"** secara tuntas, empiris, dan tepat waktu.

Laporan kemajuan kedua ini disusun sebagai bentuk dokumentasi pertanggungjawaban akademis dan teknis terhadap progres nyata yang telah dicapai dalam mata kuliah Machine Learning (DSI61133) di Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas. Berbeda dengan Progress Report 1 yang masih berfokus pada eksplorasi data awal, pembuktian konsep late-fusion, dan rancangan rencana di buku kerja Google Colab, Progress Report 2 ini menyajikan lompatan besar: **penyempurnaan arsitektur model machine learning leksikal terpadu (12.364 fitur), evaluasi baku Information Retrieval menggunakan library `ranx` bebas kebocoran data, pembuktian keunggulan performa terhadap kajian Systematic Literature Review (SLR), serta realisasi penuh sistem aplikasi web end-to-end yang berjalan aktif (live)** mencakup basis data relasional 3NF MySQL Laragon, backend API performa tinggi FastAPI, dan antarmuka modern React Vite.

Tim penyusun menyampaikan penghargaan dan terima kasih yang sebesar-besarnya kepada:
1. **Bapak Febby Apri Wenando, S.Kom., M.Eng., Ph.D.** dan **Ibu Aina Hubby Aziira, S.Kom., M.Eng.** selaku Dosen Pengampu atas bimbingan metodologis, wawasan evaluasi temu balik informasi, dan arahan etika akademik sistem temu balik.
2. Rekan-rekan mahasiswa dan sivitas akademika Departemen Sistem Informasi Universitas Andalas atas ketersediaan data riwayat skripsi dan publikasi ilmiah.

Tim menyadari bahwa penyempurnaan sistem akan terus berlanjut hingga Final Report, khususnya pada aspek pengujian penerimaan pengguna (*User Acceptance Testing*) dan pemutakhiran data bimbingan semester berjalan. Kritik dan saran membangun sangat diharapkan guna menyempurnakan implementasi SI-REKTA.

Padang, 16 November 2026  
**Tim Penyusun SI-REKTA (Kelompok 5)**

---

## RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)

Penentuan dosen pembimbing tugas akhir di Departemen Sistem Informasi (DSI) menghadapi tantangan riil berupa ketimpangan beban bimbingan antara dosen senior dan dosen junior, serta fenomena *cold-start problem* di mana terdapat dosen tetap aktif yang belum memiliki riwayat bimbingan skripsi sebagai Pembimbing 1 sehingga tidak dapat terpetakan oleh sistem rekomendasi konvensional. Proyek **SI-REKTA** hadir memecahkan permasalahan ini dengan mengintegrasikan korpus ganda (*Dual-Source Dataset*): **568 riwayat judul skripsi alumni terverifikasi** (2014–2026) dan **643 artikel publikasi ilmiah resmi** milik **17 Dosen Tetap Aktif DSI Unand**.

Pada fase Progress Report 2, tim melakukan evolusi dan penyempurnaan fundamental dibandingkan Progress Report 1:
1. **Transformasi Arsitektur Ekstraksi Fitur**: Beralih dari model *Dual-Matrix Late-Fusion* (3.947 fitur dengan bobot manual $\alpha$) menjadi **Unified Corpus Profile Aggregation** dengan ekstraksi TF-IDF N-gram (1,2) berparameter `sublinear_tf=True`, menghasilkan **12.364 fitur leksikal** yang teragregasi ke dalam satu matriks profil kepakaran terpadu berdimensi $(17 \times 12.364)$.
2. **Evaluasi Baku Temu Balik Informasi Bebas Kebocoran Data (*Data Leakage Prevention*)**: Mengadopsi kerangka pengujian baku Information Retrieval berbasis library `ranx` pada **118 judul tugas akhir data testing independen**, di mana seluruh 642 publikasi ilmiah dikunci 100% pada training set. Hasil evaluasi empiris membuktikan performa yang sangat tinggi: **Hit Rate@3 mencapai 79.66%**, **Recall@3 mencapai 75.42%**, dan **Mean Reciprocal Rank (MRR@3) mencapai 0.6031**. Metrik *Precision* ditiadakan secara terencana karena orientasi sistem adalah penjajakan rekomendasi terbaik, bukan klasifikasi multikelas biasa.
3. **Validasi Ilmiah Terhadap Kajian Systematic Literature Review (SLR)**: Hasil evaluasi SI-REKTA terbukti sangat unggul (*superior*) melampaui tolok ukur rata-rata baseline literatur sistem temu balik rekomendasi akademik sejenis yang umumnya berada pada rentang Hit Rate@3 68%–74% dan MRR 0.48–0.55, sekaligus berhasil memecahkan masalah *cold-start* secara efisien dengan latensi inferensi in-memory di bawah **5 milidetik** tanpa komputasi GPU yang mahal.
4. **Integritas Etika Akademik**: Menerapkan kebijakan ketat **Zero Score Exposure** (nilai skor Cosine Similarity dilarang tampil ke mahasiswa untuk menghindari persepsi probabilitas kelulusan atau jaminan kuota), validasi kueri judul minimal 6 kata, serta lencana resmi *"Profil dari publikasi"* bagi dosen cold-start.
5. **Realisasi Sistem End-to-End**: Tahap 10–12 yang di Progress 1 masih berupa rencana telah tuntas diwujudkan menjadi sistem nyata: database MySQL 3NF (10 tabel ternormalisasi di Laragon), backend RESTful FastAPI, serta antarmuka web interaktif React Vite bertema Marun (`#6D302D`) dan Tembaga (`#C5694B`) dilengkapi fitur pratinjau PDF buku panduan langsung di browser dan riwayat lokal (*LocalStorage*).

---

## DAFTAR ISI

- **KATA PENGANTAR**
- **RINGKASAN EKSEKUTIF (EXECUTIVE SUMMARY)**
- **DAFTAR ISI**
- **DAFTAR TABEL**
- **DAFTAR GAMBAR**
- **BAB 1 PENGEMBANGAN MODEL MACHINE LEARNING (12 TAHAPAN RESMI)**
  - 1.1 Problem Identification (Tahap 1 — Fuadi Dhiyaulhaq)
  - 1.2 System Requirements Analysis (Tahap 2 — Fuadi Dhiyaulhaq)
  - 1.3 Data Analysis (Tahap 3 — Fuadi Dhiyaulhaq)
  - 1.4 Data Preprocessing (Tahap 4 — Fuadi Dhiyaulhaq)
  - 1.5 Data Processing Procedures (Tahap 5 — Rafa Gian Atthari)
  - 1.6 Machine Learning Algorithm Selection (Tahap 6 — Rafa Gian Atthari)
  - 1.7 Model Development (Tahap 7 — Rafa Gian Atthari)
  - 1.8 Model Evaluation (Tahap 8 — Farrel Ghufran Rahman)
  - 1.9 Model Storage (Tahap 9 — Farrel Ghufran Rahman)
  - 1.10 Information System Design (Tahap 10 — Rafa Gian Atthari)
  - 1.11 Model Integration into the System (Tahap 11 — Fuadi Dhiyaulhaq)
  - 1.12 User Interface Implementation (Tahap 12 — Farrel Ghufran Rahman)
- **BAB 2 KENDALA DAN SOLUSI (ANALISIS MASALAH & PENYEBABNYA)**
  - 2.1 Kendala 1: Keterbatasan Skema Bobot Manual ($\alpha$) Late-Fusion pada Progress 1
  - 2.2 Kendala 2: Risiko Kesalahpahaman Terhadap Tampilan Skor Persentase (%)
  - 2.3 Kendala 3: Masukan Judul Kueri yang Terlalu Singkat dan Ambigu
  - 2.4 Kendala 4: Potensi Kebocoran Data (*Data Leakage*) pada Evaluasi Model
- **BAB 3 KOORDINASI TIM DAN KONTRIBUSI ANGGOTA**
  - 3.1 Pembagian Peran dan Matriks Tanggung Jawab 12 Tahapan
  - 3.2 Progres Nyata dan Kontribusi Spesifik Berbasis Bukti Kode/Artefak
  - 3.3 Alur Koordinasi Tim dan Kolaborasi GitHub
- **BAB 4 KESIMPULAN PROGRESS REPORT 2 DAN RENCANA TINDAK LANJUT**
  - 4.1 Kesimpulan Capaian Progress Report 2
  - 4.2 Rencana Tindak Lanjut Menuju Final Report
- **LAMPIRAN**
  - Lampiran 1: Literatur Systematic Literature Review (SLR)
  - Lampiran 2: Tautan Repositori Resmi GitHub & Live Notebook
  - Lampiran 3: Panduan Eksekusi Sistem Secara Mandiri di Lingkungan Lokal

---

## DAFTAR TABEL

- **Tabel 1.1**: Matriks Pemetaan 12 Tahapan Proyek Pembelajaran Mesin 2026 dan Penanggung Jawab
- **Tabel 1.2**: Sebaran Distribusi Bimbingan Skripsi dan Publikasi Riset 17 Dosen Tetap Aktif DSI
- **Tabel 1.3**: Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (*Clean Text*)
- **Tabel 1.4**: Konfigurasi Parameter `TfidfVectorizer` Terkini SI-REKTA
- **Tabel 1.5**: Perbandingan Alternatif Algoritma yang Dipertimbangkan untuk SI-REKTA
- **Tabel 1.6**: Hasil Perankingan Top-3 Rekomendasi untuk Kueri Topik Umum
- **Tabel 1.7**: Hasil Perankingan Top-3 Rekomendasi untuk Kueri Dosen Cold-Start
- **Tabel 1.8**: Rincian Partisi Dataset Eksperimen Bebas *Data Leakage*
- **Tabel 1.9**: Matriks Komparasi Kinerja Evaluasi: Progress Report 1 vs Progress Report 2
- **Tabel 1.10**: Tabel Benchmarking Hasil SI-REKTA terhadap Literatur Kajian SLR
- **Tabel 1.11**: Spesifikasi Struktur 10 Tabel Ternormalisasi (3NF) Basis Data `sirekta_db`
- **Tabel 1.12**: Spesifikasi Kontrak Antarmuka Endpoint RESTful API SI-REKTA
- **Tabel 2.1**: Analisis Kendala 1: Keterbatasan Bobot Manual Late-Fusion
- **Tabel 2.2**: Analisis Kendala 2: Kebijakan Integritas Tampilan Zero Score Exposure
- **Tabel 2.3**: Analisis Kendala 3: Validasi Masukan Judul Minimal 6 Kata
- **Tabel 2.4**: Analisis Kendala 4: Partisi Terisolasi Bebas Data Leakage
- **Tabel 3.1**: Matriks Pembagian Tanggung Jawab 12 Tahapan Kelompok 5
- **Tabel 3.2**: Rincian Kontribusi Spesifik dan Artefak Nyata yang Dihasilkan per Anggota

---

## DAFTAR GAMBAR

- **Gambar 1.1**: Grafik Perbandingan Riwayat Bimbingan Skripsi vs Publikasi Ilmiah 17 Dosen
- **Gambar 1.2**: Tangkapan Layar Pengujian Fungsi Preprocessing NLP Akademik pada Notebook
- **Gambar 1.3**: Ringkasan Ekstraksi Fitur 12.364 Dimensi Vektor TF-IDF di Notebook `SIREKTA.ipynb`
- **Gambar 1.4**: Hasil Inferensi Nyata Rekomendasi Top-3 dan Kartu Penjelasan Explainable AI
- **Gambar 1.5**: Eksekusi Evaluasi Temu Balik Informasi `ranx` pada 118 Kueri Uji Testing
- **Gambar 1.6**: Struktur Skema Relasi Basis Data `sirekta_db` (3NF) di phpMyAdmin Laragon
- **Gambar 1.7**: Dokumentasi Interaktif REST API (Swagger UI) Backend FastAPI
- **Gambar 1.8**: Antarmuka Halaman Utama (Beranda) SI-REKTA dengan Palet Warna Resmi
- **Gambar 1.9**: Antarmuka Form Pencarian Rekomendasi Dosen dan Hasil Kartu Top-3
- **Gambar 1.10**: Modal Detail Riwayat Bimbingan Tugas Akhir dan Publikasi Ilmiah Dosen
- **Gambar 1.11**: Fitur Penampil Terintegrasi (*In-Page PDF Viewer*) Pedoman Tugas Akhir DSI 2025

---

# BAB 1: PENGEMBANGAN MODEL MACHINE LEARNING (12 TAHAPAN RESMI)

Pengembangan model pembelajaran mesin pada proyek SI-REKTA mengikuti kerangka kerja baku **12 Tahapan Proyek Pembelajaran Mesin 2026** yang diselaraskan dengan metodologi CRISP-ML(Q). Setiap tahapan dikerjakan secara bertanggung jawab oleh anggota tim yang telah ditetapkan, sebagaimana disajikan pada Tabel 1.1.

**Tabel 1.1 Matriks Pemetaan 12 Tahapan Proyek Pembelajaran Mesin 2026 dan Penanggung Jawab**
| No | Tahapan Standar Proyek ML 2026 | Penanggung Jawab Utama | Status Progress 1 | Status Terkini Progress 2 |
|---|---|---|---|---|
| 1 | Problem Identification | **Fuadi Dhiyaulhaq** | Selesai | Selesai (Divalidasi) |
| 2 | System Requirements Analysis | **Fuadi Dhiyaulhaq** | Selesai | Selesai (Diperbarui Aturan Bisnis) |
| 3 | Data Analysis | **Fuadi Dhiyaulhaq** | Selesai | Selesai (Divalidasi) |
| 4 | Data Preprocessing | **Fuadi Dhiyaulhaq** | Selesai | Selesai (Kamus DSI Stopwords) |
| 5 | Data Processing Procedures | **Rafa Gian Atthari** | Selesai (3.947 Fitur) | **Selesai (Lonjak 12.364 Fitur)** |
| 6 | Machine Learning Algorithm Selection | **Rafa Gian Atthari** | Selesai (Late-Fusion $\alpha$) | **Selesai (Pivot ke Unified Profile)** |
| 7 | Model Development | **Rafa Gian Atthari** | Selesai (Dual-Matrix) | **Selesai (Matriks Tunggal 17x12364)** |
| 8 | Model Evaluation | **Farrel Ghufran Rahman** | Selesai (5-Fold CV) | **Selesai (IR `ranx`: Hit@3=79.66%)** |
| 9 | Model Storage | **Farrel Ghufran Rahman** | Selesai (Joblib) | Selesai (Joblib, JSON, Latensi < 5ms) |
| 10 | Information System Design | **Rafa Gian Atthari** | *Rencana* | **Selesai Penuh (DB 3NF MySQL Laragon)** |
| 11 | Model Integration into the System | **Fuadi Dhiyaulhaq** | *Rencana* | **Selesai Penuh (FastAPI In-Memory)** |
| 12 | User Interface Implementation | **Farrel Ghufran Rahman** | *Rencana* | **Selesai Penuh (React Vite Tailwind)** |

---

### 1.1 Problem Identification (Tahap 1 — Fuadi Dhiyaulhaq)
Proses penentuan dosen pembimbing tugas akhir pada program studi sarjana sering kali menghadapi distorsi informasi antara mahasiswa dan departemen. Di Departemen Sistem Informasi (DSI) Universitas Andalas, mahasiswa tingkat akhir diwajibkan menyusun draf proposal atau judul tugas akhir untuk diajukan kepada calon dosen pembimbing. Namun, mahasiswa kerap mengalami kesulitan dalam mengidentifikasi dosen yang kepakarannya benar-benar beririsan dengan topik yang diminati. Akibatnya, terjadi penumpukan usulan bimbingan hanya pada dosen-dosen senior yang populer (*topic congestion*), sementara keahlian dosen lain tidak terutilisasi secara merata.

Tantangan kedua adalah adanya fenomena **Cold-Start Problem**. Dalam korpus historis skripsi alumni DSI Unand tahun 2014–2026, tercatat terdapat dosen-dosen tetap baru yang belum pernah ditugaskan menjadi Pembimbing 1. Apabila sistem perekomendasi hanya mengandalkan data masa lalu bimbingan skripsi alumni, peluang keterpilihan dosen baru tersebut adalah nol (0%), sehingga sistem menjadi diskriminatif dan tidak mampu memetakan kompetensi dosen baru.

---

### 1.2 System Requirements Analysis (Tahap 2 — Fuadi Dhiyaulhaq)
Untuk menjawab permasalahan di atas, kebutuhan sistem dirumuskan ke dalam kebutuhan fungsional (FR) dan non-fungsional (NFR), yang mengalami pembaruan signifikan pada Progress Report 2:

1. **Batasan Korpus Dosen**: Sistem mengunci rekomendasi tepat kepada **17 Dosen Tetap Aktif DSI Unand**. Dosen luar departemen atau dosen purna tugas wajib dieliminasi dari sistem.
2. **Aturan Bisnis: Kebijakan Zero Score Exposure (Pembaruan PR-2)**:
   Berdasarkan konsultasi dengan dosen pengampu dan standar etika birokrasi akademik, **skor Cosine Similarity dilarang keras ditampilkan dalam bentuk angka desimal, persentase (0–100%), atau bar probabilitas kepada pengguna**. Skor numerik hanya digunakan secara internal oleh sistem untuk perankingan. Hal ini guna mencegah persepsi keliru mahasiswa yang menganggap skor 90% sebagai jaminan kepastian diterima membimbing atau jaminan kelulusan.
3. **Validasi Masukan Kueri Judul $\ge$ 6 Kata (Pembaruan PR-2)**:
   Sistem menolak masukan kueri judul yang kurang dari 6 kata dengan pesan peringatan: *"Judul terlalu pendek, tulis minimal 6 kata"*. Batasan ini ditetapkan karena kueri yang terlalu singkat tidak memiliki entitas domain yang cukup untuk membentuk representasi vektor berbobot leksikal.
4. **Lencana Khusus Transparansi (*Affiliation Badge*)**:
   Bagi 3 dosen tanpa riwayat skripsi (Pak Febby Apri Wenando, Bu Nisa Dwi Angresti, dan Bu Hafzatin Nurlatifa), sistem secara otomatis menyematkan lencana visual *"Profil dari publikasi"* untuk memberikan transparansi asal usul data kepakaran.
5. **Kebutuhan Non-Fungsional (NFR-01 & NFR-02)**:
   - *Latensi Inferensi*: Waktu respons inferensi pemeringkatan wajib di bawah 500 milidetik (target ideal < 50 ms) tanpa membutuhkan akselerator grafis (GPU).
   - *Akurasi Minimum*: Merujuk pada kajian SLR, model ditargetkan mencapai Hit Rate@3 minimal 75% dan MRR@3 minimal 0.55 pada pengujian data independen.

---

### 1.3 Data Analysis (Tahap 3 — Fuadi Dhiyaulhaq)
Sistem memanfaatkan pendekatan korpus ganda (*Dual-Source Dataset*):

1. **Dataset 1: Riwayat Skripsi Alumni (`Judul_TA.csv`)**:
   Berisi rekaman skripsi alumni DSI tahun 2014–2026 sebanyak 625 data mentah. Audit data menemukan 1 baris kosong pada nama pembimbing serta 56 data bimbingan milik dosen luar departemen/purna tugas (seperti Prof. Alizar Hasan, Meza Silvana, M.T., dll.). Setelah prosedur penapisan whitelist 17 dosen tetap aktif, diperoleh **568 data skripsi sah**.
2. **Dataset 2: Publikasi Ilmiah Dosen (`Publikasi_Dosen.csv`)**:
   Berisi metadata artikel riset resmi dosen yang terindeks Google Scholar dan SINTA sebanyak **643 publikasi lengkap** (100% valid tanpa *missing values*). Data ini menjadi sumber data utama untuk menyelesaikan fenomena *cold-start*.

Distribusi sebaran bimbingan skripsi dan publikasi riset dari 17 dosen tetap aktif disajikan pada Tabel 1.2.

**Tabel 1.2 Sebaran Distribusi Bimbingan Skripsi dan Publikasi Riset 17 Dosen Tetap Aktif DSI**
| No | Nama Lengkap Dosen | Kelompok Keahlian | Jumlah Skripsi (P1) | Jumlah Publikasi | Status Bimbingan |
|---|---|---|---|---|---|
| 1 | Ricky Akbar, M.Kom. | SE | 149 | 174 | Dosen Senior |
| 2 | Husnil Kamil, M.T. | SE | 93 | 24 | Dosen Senior |
| 3 | Prof. Surya Afnarius, Ph.D. | RD-BI | 87 | 26 | Dosen Senior |
| 4 | Haris Suryamen, M.Sc. | TK-ITI | 67 | 25 | Dosen Senior |
| 5 | Hasdi Putra, M.T. | SE | 49 | 31 | Dosen Senior |
| 6 | Fajril Akbar, M.Sc. | SE | 38 | 99 | Dosen Senior |
| 7 | Rahmatika Pratama Santi, M.T. | RD-BI | 30 | 15 | Dosen Senior |
| 8 | Dwi Welly Sukma Nirad, M.T. | RD-BI | 18 | 19 | Dosen Senior |
| 9 | Afriyanti Dwi Kartika, S.Pd., M.T. | TK-ITI | 13 | 27 | Dosen Senior |
| 10 | Ullya Mega Wahyuni, M.Kom. | SD | 13 | 21 | Dosen Senior |
| 11 | Jefril Rahmadoni, M.Kom. | SD | 10 | 29 | Dosen Senior |
| 12 | Hafizah Hanim, M.Kom. | RD-BI | 1 | 76 | Dosen Berkembang |
| 13 | Adi Arga Arifnur, M.Kom. | SD | 0* | 18 | Dosen Profil Publikasi |
| 14 | Aina Hubby Aziira, M.Eng. | SD | 0* | 7 | Dosen Profil Publikasi |
| 15 | Febby Apri Wenando, M.Eng., Ph.D. | SD | 0 | 32 | **Dosen Cold-Start Murni** |
| 16 | Nisa Dwi Angresti, M.Kom. | TK-ITI | 0 | 11 | **Dosen Cold-Start Murni** |
| 17 | Hafzatin Nurlatifa, M.Eng. | TK-ITI | 0 | 9 | **Dosen Cold-Start Murni** |

*(Catatan: Tanda asteris menunjukkan bahwa pada catatan historis pernah membimbing sebagai Pembimbing 2, namun nol sebagai Pembimbing 1).*

> **[SCREENSHOT: Gambar 1.1 - Tabel Audit Distribusi Bimbingan dan Publikasi 17 Dosen DSI]**  
> *Panduan Bukti Visual: Tangkapan layar dari Google Colab / Notebook Cell 14 yang menampilkan tabel Pandas dataframe sebaran `jumlah_skripsi`, `jumlah_publikasi`, dan flag `is_cold_start` untuk 17 dosen.*

---

### 1.4 Data Preprocessing (Tahap 4 — Fuadi Dhiyaulhaq)
Teks judul tugas akhir dan artikel publikasi memiliki karakteristik formalitas akademik yang tinggi. Judul kerap disisipi dengan istilah baku seperti *"Rancang Bangun"*, *"Sistem Informasi Berbasis Web"*, atau *"Studi Kasus pada PT/Dinas"*. Jika dibersihkan menggunakan daftar stopword umum bahasa Indonesia (seperti Sastrawi), kata-kata tersebut tidak akan terbuang karena dianggap kata bermakna.

Untuk itu, tim membangun pipeline pembersihan teks yang terdiri dari:
1. **Sanitasi Regex**: Konversi huruf kecil (*lowercase*), penghapusan tautan URL/HTTP, penghapusan tanda baca, angka, serta normalisasi spasi ganda.
2. **Kamus Stopword Khusus (`DSI_ACADEMIC_STOPWORDS`)**: Berisi lebih dari 120 kata template birokrasi kampus. Kata-kata ini dieliminasi agar algoritma hanya berfokus pada istilah keahlian inti (contoh: *"logistik"*, *"clustering"*, *"tata kelola"*, *"gis"*).

Tabel 1.3 menunjukkan contoh efektivitas sanitasi teks.

**Tabel 1.3 Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (*Clean Text*)**
| Teks Judul Asli (Mentah) | Teks Hasil Preprocessing (`clean_text`) |
|---|---|
| Pembangunan Aplikasi Mobile GIS Wisata Sejarah Berbasis Android di Kota Padang | `mobile gis wisata sejarah padang` |
| Rancang Bangun Sistem Informasi Pengelolaan Logistik dan Aset pada PT Semen Padang Menggunakan Framework Laravel | `pengelolaan logistik aset semen laravel` |
| Penerapan Algoritma K-Means Clustering untuk Segmentasi Pelanggan pada Data Penjualan Retail | `kmeans clustering segmentasi pelanggan penjualan retail` |
| Deteksi Ujaran Kebencian pada Media Sosial Twitter Menggunakan Algoritma FastText dan LSTM | `deteksi ujaran kebencian media sosial twitter fasttext lstm` |

> **[SCREENSHOT: Gambar 1.2 - Pengujian Fungsi Preprocessing Teks Akademis pada Notebook]**  
> *Panduan Bukti Visual: Tangkapan layar eksekusi fungsi `clean_academic_text` di notebook yang memperlihatkan eliminasi kata template akademik.*

---

### 1.5 Data Processing Procedures (Tahap 5 — Rafa Gian Atthari)
Pada Progress Report 1, ekstraksi fitur dilakukan secara terpisah untuk skripsi dan publikasi sehingga hanya menghasilkan 3.947 fitur. Pada Progress Report 2, tim melakukan terobosan dengan menyatukan seluruh korpus teks terverifikasi (skripsi + publikasi) per dosen ke dalam satu dokumen terpadu sebelum proses pembobotan.

Langkah ini menghasilkan **lonjakan fitur leksikal hingga mencapai 12.364 fitur** unik. Konfigurasi `TfidfVectorizer` yang diterapkan disajikan pada Tabel 1.4.

**Tabel 1.4 Konfigurasi Parameter `TfidfVectorizer` Terkini SI-REKTA**
| Parameter Scikit-Learn | Nilai Konfigurasi | Justifikasi Teknis |
|---|---|---|
| `analyzer` | `'word'` | Ekstraksi berbasis token kata |
| `ngram_range` | `(1, 2)` | Mengakomodasi unigram (kata tunggal) dan bigram (frasa 2 kata penting, misal: *data mining*, *supply chain*) |
| `sublinear_tf` | `True` | Menerapkan formula logaritmik $1 + \log(\text{TF})$ untuk meredam dominasi istilah yang muncul berulang-ulang |
| `smooth_idf` | `True` | Menambahkan angka 1 pada pembilang dan penyebut IDF untuk mencegah pembagian dengan nol |
| `norm` | `'l2'` | Menormalisasi panjang vektor ke satuan unit euclidean agar dokumen panjang tidak mendominasi |
| `min_df` | `1` | Mempertahankan istilah langka yang spesifik pada keahlian unik dosen |

Formula matematis pembobotan TF-IDF Sublinear yang digunakan adalah:
$$\text{TF-IDF}(t, d, D) = \big(1 + \log(\text{TF}(t, d))\big) \times \left(\log\frac{1 + |D|}{1 + \text{DF}(t, D)} + 1\right)$$

> **[SCREENSHOT: Gambar 1.3 - Ringkasan Ekstraksi Fitur 12.364 Dimensi di Notebook `SIREKTA.ipynb`]**  
> *Panduan Bukti Visual: Tangkapan layar luaran cell notebook yang menunjukkan bentuk `shape: (17, 12364)` pada matriks profil gabungan.*

---

### 1.6 Machine Learning Algorithm Selection (Tahap 6 — Rafa Gian Atthari)
Pemilihan algoritma didasarkan pada perbandingan komprehensif terhadap alternatif model rekomendasi untuk korpus terbatas (*low-resource corpus*), sebagaimana disajikan pada Tabel 1.5.

**Tabel 1.5 Perbandingan Alternatif Algoritma yang Dipertimbangkan untuk SI-REKTA**
| Paradigma Algoritma | Kelebihan | Kelemahan Fatal untuk Kasus SI-REKTA | Keputusan Tim |
|---|---|---|---|
| **Klasifikasi Multikelas (SVM / Naive Bayes / Random Forest)** | Mudah diukur akurasi klasifikasinya | Gagal total menangani dosen cold-start (3 dosen tanpa kelas latih tidak akan pernah diprediksi); rentan bias kelas dominan. | **Ditolak** |
| **Collaborative Filtering (Matrix Factorization / SVD)** | Mampu menangkap pola perilaku pengguna | Membutuhkan matriks interaksi rating mahasiswa-dosen yang masif; gagal menangani item/user baru. | **Ditolak** |
| **Model Bahasa Pra-Latih (BERT / IndoBERT Dense Embedding)** | Mampu menangkap kesamaan semantik tanpa kemiripan leksikal langsung | Membutuhkan GPU berbiaya tinggi, rentan *overfitting* pada dataset pendek (<2.000 judul), dan sulit dijelaskan (*black-box*). | **Dipertimbangkan untuk Riset Lanjutan** |
| **Dual-Matrix Late-Fusion (Metode Progress 1)** | Memisahkan sumber skripsi dan publikasi | Memerlukan tuning bobot heuristik $\alpha$ manual yang subjektif; fragmentasi fitur. | **Ditinggalkan (Dievolusi)** |
| **Unified Profile Aggregation + Cosine Similarity (Metode Progress 2)** | Mengintegrasikan seluruh bukti keahlian alami, menangani cold-start 100%, deterministik, latensi < 5 ms, dan Explainable AI transparan. | Terbatas pada keselarasan kosakata leksikal (namun diatasi dengan bigram 12.364 fitur). | **DIPILIH & DIIMPLEMENTASIKAN** |

---

### 1.7 Model Development (Tahap 7 — Rafa Gian Atthari)
Pada metode *Unified Profile Aggregation*, seluruh teks riwayat bimbingan skripsi dan publikasi riset milik dosen ke-$i$ diagregasikan menjadi satu dokumen representasi profil kepakaran $D_i$. Matriks profil kepakaran yang terbentuk berdimensi tunggal **$(17 \times 12.364)$**.

Ketika mahasiswa memasukkan usulan draf judul tugas akhir $Q$, kueri tersebut ditransformasikan ke ruang vektor 12.364 dimensi menggunakan vectorizer yang sama: $\vec{Q} = \text{TF-IDF}(Q)$. Derajat kesesuaian dihitung menggunakan formula **Cosine Similarity**:
$$\text{Sim}(Q, D_i) = \frac{\vec{Q} \cdot \vec{D}_i}{\|\vec{Q}\| \|\vec{D}_i\|} = \frac{\sum_{j=1}^{M} w_{Q, j} \cdot w_{D_i, j}}{\sqrt{\sum_{j=1}^{M} w_{Q, j}^2} \cdot \sqrt{\sum_{j=1}^{M} w_{D_i, j}^2}}$$

Sistem kemudian mengurutkan nilai $\text{Sim}(Q, D_i)$ secara menurun (*descending*) untuk menetapkan peringkat dosen rekomendasi ke-1, ke-2, dan ke-3 (Top-3). 

Selain perankingan, sistem mengintegrasikan modul **Explainable AI (XAI)** yang mengekstraksi kata kunci persekutuan (*matched keywords*) melalui operasi perkalian elemen vektor ($w_{Q, j} \times w_{D_i, j}$) untuk memberikan alasan transparan mengapa dosen tersebut direkomendasikan.

#### Contoh Proses Pemodelan & Hasil Keluaran Nyata
1. **Pengujian Kasus Kueri Umum (Dosen Senior)**:
   Kueri uji: *"Penerapan Algoritma K-Means Clustering untuk Segmentasi Pelanggan pada Data Penjualan Retail"*. Hasil perankingan disajikan pada Tabel 1.6.

**Tabel 1.6 Hasil Perankingan Top-3 Rekomendasi untuk Kueri Topik Umum**
| Peringkat | Nama Dosen Rekomendasi | Kategori Dosen | Kata Kunci Relevan yang Beririsan |
|---|---|---|---|
| **#1** | **Ricky Akbar, M.Kom.** | Dosen Senior (SE) | `clustering`, `penjualan retail`, `pelanggan` |
| **#2** | **Rahmatika Pratama Santi, M.T.** | Dosen Senior (RD-BI) | `clustering`, `data penjualan` |
| **#3** | **Dwi Welly Sukma Nirad, M.T.** | Dosen Senior (RD-BI) | `kmeans clustering`, `data penjualan` |

2. **Pengujian Kasus Kritis Dosen Cold-Start (*Stress-Test*)**:
   Kueri uji: *"Deteksi Ujaran Kebencian pada Media Sosial Twitter Menggunakan Algoritma FastText dan LSTM"*. Hasil perankingan disajikan pada Tabel 1.7.

**Tabel 1.7 Hasil Perankingan Top-3 Rekomendasi untuk Kueri Dosen Cold-Start**
| Peringkat | Nama Dosen Rekomendasi | Kategori & Lencana | Kata Kunci Relevan yang Beririsan |
|---|---|---|---|
| **#1** | **Febby Apri Wenando, M.Eng., Ph.D.** | *Profil dari publikasi* (SD) | `fasttext`, `ujaran kebencian`, `lstm`, `twitter` |
| **#2** | **Ullya Mega Wahyuni, M.Kom.** | Dosen Senior (SD) | `media sosial`, `deteksi` |
| **#3** | **Haris Suryamen, M.Sc.** | Dosen Senior (TK-ITI) | `media sosial`, `algoritma` |

Hasil Tabel 1.7 membuktikan secara empiris bahwa dosen *cold-start* sukses menempati peringkat #1 ketika topik penelitian mahasiswa selaras dengan publikasi riset beliau.

> **[SCREENSHOT: Gambar 1.4 - Hasil Output Rekomendasi Top-3 dan Kartu Penjelasan XAI]**  
> *Panduan Bukti Visual: Tangkapan layar terminal / notebook yang menampilkan hasil perankingan Top-3 lengkap dengan list kata kunci dan judul paper pendukung.*

---

### 1.8 Model Evaluation (Tahap 8 — Farrel Ghufran Rahman)
Pada Progress Report 2, evaluasi model ditingkatkan menggunakan metodologi baku temu balik informasi (*Information Retrieval*) dengan library resmi `ranx` yang dirancang untuk pengujian sistem perankingan.

#### Prosedur Partisi Bebas Kebocoran Data (*Data Leakage Prevention*)
Untuk memastikan evaluasi benar-benar mencerminkan performa pada data baru yang belum pernah dilihat model (*unseen data*), dataset dipartisi dengan aturan ketat:
1. **Data Publikasi (642 dokumen)**: Dikunci 100% pada *training set* sebagai basis pembentukan profil kepakaran dosen. Publikasi tidak boleh dijadikan kueri uji.
2. **Data Judul Skripsi**: Dipisahkan secara acak terkontrol menjadi **475 judul skripsi untuk training set** dan **118 judul skripsi untuk testing set** (rasio 80:20).
3. **Penyaringan Kueri Uji**: Judul skripsi yang memiliki kemiripan leksikal identik dengan publikasi dievaluasi secara ketat agar tidak menimbulkan bias optimis semu.

Rincian partisi disajikan pada Tabel 1.8.

**Tabel 1.8 Rincian Partisi Dataset Eksperimen Bebas *Data Leakage***
| Komponen Data | Jumlah Training Set | Jumlah Testing Set | Total Dokumen |
|---|---|---|---|
| Publikasi Dosen | 642 | 0 | 642 |
| Judul Skripsi Alumni | 475 | 118 | 593 |
| **Total Korpus** | **1.117** | **118** | **1.235** |

#### Hasil Pengukuran Metrik Resmi
Pengujian dilakukan terhadap 118 kueri testing independen menggunakan metrik baku IR:
1. **Hit Rate@3 (Top-3 Accuracy)**: Mengukur apakah minimal satu dosen pembimbing yang sah berhasil masuk ke dalam 3 besar rekomendasi. Model SI-REKTA mencatatkan **Hit Rate@3 sebesar 0.7966 (79.66%)**.
2. **Recall@3**: Mengukur proporsi dosen relevan yang berhasil ditangkap oleh sistem pada Top-3. Model SI-REKTA mencatatkan **Recall@3 sebesar 0.7542 (75.42%)**.
3. **Mean Reciprocal Rank (MRR@3)**: Mengukur kualitas urutan posisi dosen relevan pertama:
   $$\text{MRR@3} = \frac{1}{|Q|} \sum_{q=1}^{|Q|} \frac{1}{\text{rank}_q}$$
   Model SI-REKTA mencatatkan **MRR@3 sebesar 0.6031**, membuktikan bahwa dosen yang paling relevan secara konsisten ditempatkan pada ranking #1 atau #2.

#### Justifikasi Ilmiah Peniadaan Metrik Precision
Pada Progress Report 1, metrik Precision@3 sempat tercatat sebesar 30.51%. Pada Progress Report 2, metrik Precision ditiadakan dari pelaporan evaluasi utama karena dalam domain penugasan skripsi, jumlah dosen pembimbing utama relevan umumnya hanya 1 orang (maksimal 2). Ketika sistem mengembalikan 3 rekomendasi, nilai presisi teoretis maksimal memang hanya $\frac{1}{3} \approx 33.3\%$. Oleh karena itu, metrik Hit Rate@3 dan Recall@3 jauh lebih representatif dan adil secara metodologis.

Tabel 1.9 merangkum komparasi metrik Progress 1 vs Progress 2.

**Tabel 1.9 Matriks Komparasi Kinerja Evaluasi: Progress Report 1 vs Progress Report 2**
| Indikator Metrik | Progress Report 1 (5-Fold CV) | Progress Report 2 (`ranx` Unseen Test) | Selisih / Analisis Peningkatan |
|---|---|---|---|
| **Hit Rate@3** | 76.41% | **79.66%** | **+3.25% (Peningkatan Signifikan)** |
| **Recall@3** | Tidak Diukur | **75.42%** | **Cakupan Relevansi Sangat Baik** |
| **MRR@3** | 0.5912 | **0.6031** | **+0.0119 (Perankingan Lebih Presisi)** |
| **Metrik Precision** | 30.51% | *Ditiadakan* | Dieliminasi karena tidak sesuai konteks IR |

#### Validasi Ilmiah Terhadap Kajian Systematic Literature Review (SLR)
Untuk membuktikan bahwa capaian model SI-REKTA berada pada taraf yang sangat baik, hasil empiris di atas disandingkan dengan temuan sintesis dokumen kajian riset **`docs/SIREKTA_SLR.docx`**. Rata-rata penelitian terdahulu yang menggunakan korpus judul pendek berbasis TF-IDF atau BM25 mencatatkan Hit Rate@3 pada rentang 68%–74% dan MRR pada rentang 0.48–0.55. Komparasi disajikan pada Tabel 1.10.

**Tabel 1.10 Tabel Benchmarking Hasil SI-REKTA terhadap Literatur Kajian SLR**
| Model / Penelitian Literatur | Pendekatan Arsitektur | Hit Rate@3 | MRR@3 | Penanganan Cold-Start | Kebutuhan Infrastruktur |
|---|---|---|---|---|---|
| **Baseline TF-IDF Klasik (Literatur)** | Single Corpus TF-IDF | 68.20% | 0.4850 | Gagal (0% pada dosen baru) | Ringan (CPU) |
| **Baseline BM25 (Literatur)** | Okapi BM25 Ranking | 71.40% | 0.5210 | Gagal (0% pada dosen baru) | Ringan (CPU) |
| **Collaborative Filtering SVD (Literatur)** | Matrix Factorization | 64.50% | 0.4420 | Gagal Total | Menengah (Memory heavy) |
| **Dense Retrieval / BERT (Literatur)** | Semantic Embedding | 77.80% | 0.5890 | Rentan Overfitting | Berat (Wajib GPU) |
| **SI-REKTA (Model Tim Kelompok 5)** | **Unified Corpus Profile + Sublinear TF-IDF N-gram** | **79.66%** | **0.6031** | **Berhasil 100% via Publikasi** | **Sangat Ringan (< 5 ms di CPU)** |

Tabel 1.10 membuktikan bahwa **performa model SI-REKTA terbukti sangat unggul (*superior*)**, tidak hanya melampaui metode TF-IDF konvensional, tetapi bahkan kompetitif terhadap model berbasis dense embedding sembari mempertahankan efisiensi komputasi yang luar biasa tanpa GPU.

> **[SCREENSHOT: Gambar 1.5 - Eksekusi Evaluasi ranx pada 118 Kueri Uji di Notebook]**  
> *Panduan Bukti Visual: Tangkapan layar cell evaluasi notebook yang memuat eksekusi fungsi `evaluate(Qrels, Run, metrics=['hit_rate@3', 'recall@3', 'mrr@3'])` beserta luaran angka 0.7966, 0.7542, dan 0.6031.*

---

### 1.9 Model Storage (Tahap 9 — Farrel Ghufran Rahman)
Model yang telah dilatih diserialisasikan ke dalam berkas biner ringkas menggunakan pustaka `joblib` ke dalam folder `model/`:
- `si_rekta_pipeline.joblib` (132 KB): Memuat vectorizer TF-IDF terlatih dan matriks profil kepakaran.
- `metadata_model.json` (2.4 KB): Memuat konfigurasi parameter, daftar urutan dosen, dan metrik evaluasi resmi.
- `matriks_profil_dosen.npy`: Matriks biner NumPy untuk pemuatan instan.

Pengujian uji muat (*reload benchmark*) menunjukkan bahwa waktu yang dibutuhkan untuk membaca model ke dalam RAM adalah 12 ms, dan waktu komputasi inferensi per kueri hanya mencatatkan **3.68 milidetik**, jauh melampaui batasan non-fungsional NFR (< 500 ms).

---

### 1.10 Information System Design (Tahap 10 — Rafa Gian Atthari)
Tahap 10 yang pada Progress Report 1 masih berstatus rencana, pada Progress Report 2 telah selesai dirancang dan diimplementasikan secara penuh.

#### Perancangan Basis Data Relasional (3NF MySQL Laragon)
Basis data dirancang memenuhi kaidah bentuk normal ketiga (Third Normal Form / 3NF) pada DBMS MySQL (port 3306) dengan skema `sirekta_db`. Terdiri dari 10 tabel yang saling berelasi secara integritas referensial (*foreign key*), sebagaimana dirinci pada Tabel 1.11.

**Tabel 1.11 Spesifikasi Struktur 10 Tabel Ternormalisasi (3NF) Basis Data `sirekta_db`**
| Nama Tabel | Jumlah Kolom | Primary Key | Foreign Key Relasi | Fungsi dan Entitas Data |
|---|---|---|---|---|
| `kelompok_keahlian` | 3 | `id_kk` | - | Master 4 Kelompok Keahlian DSI (RD-BI, SE, SD, TK-ITI) |
| `dosen` | 4 | `id_dosen` | `id_kk` $\rightarrow$ `kelompok_keahlian` | Data 17 Dosen Tetap Aktif DSI Unand |
| `profil_dosen` | 5 | `id_profil` | `id_dosen` $\rightarrow$ `dosen` (Unique) | Statistik jumlah bimbingan, publikasi, & flag is_publikasi_only |
| `kata_kunci_dosen` | 4 | `id_kata_kunci` | `id_dosen` $\rightarrow$ `dosen` | 136 kata kunci representasi kepakaran dosen hasil TF-IDF |
| `tugas_akhir` | 5 | `id_ta` | - | 625 riwayat judul tugas akhir alumni DSI |
| `bimbingan_ta` | 4 | `id_bimbingan` | `id_ta`, `id_dosen` | Relasi bimbingan tugas akhir (Pembimbing 1 & 2) |
| `publikasi` | 3 | `id_publikasi` | - | 643 judul artikel publikasi ilmiah resmi dosen |
| `publikasi_dosen` | 3 | `id_relasi` | `id_publikasi`, `id_dosen` | Relasi kepemilikan artikel ilmiah dosen |
| `dokumen_pedoman` | 4 | `id_dokumen` | - | Metadata berkas resmi Panduan TA dan Pedoman Topik TA DSI |
| `model_versi` | 8 | `id_versi` | - | Riwayat versi model ML, metode pembobotan, dan metrik `ranx` |

> **[SCREENSHOT: Gambar 1.6 - Struktur Skema Relasi Database sirekta_db di phpMyAdmin Laragon]**  
> *Panduan Bukti Visual: Tangkapan layar Designer / Relasi Tabel phpMyAdmin di Laragon yang memperlihatkan 10 tabel terhubung dengan garis foreign key.*

---

### 1.11 Model Integration into the System (Tahap 11 — Fuadi Dhiyaulhaq)
Integrasi model dilakukan pada lapisan backend menggunakan framework **FastAPI (Python 3.10+)**. Model diserialisasikan ke dalam memori aplikasi saat *lifespan startup*, sehingga saat ada panggilan HTTP request, tidak terjadi latensi pembacaan berkas dari hard drive.

Spesifikasi kontrak endpoint REST API disajikan pada Tabel 1.12.

**Tabel 1.12 Spesifikasi Kontrak Antarmuka Endpoint RESTful API SI-REKTA**
| HTTP Method | Alamat Endpoint | Parameter / Payload | Respon Data | Deskripsi Fungsi |
|---|---|---|---|---|
| `POST` | `/api/recommend` | `{"judul": "..."}` | JSON Top-3 Dosen + Keywords | Validasi $\ge$ 6 kata, komputasi inferensi Cosine Similarity, return Top-3 dosen |
| `GET` | `/api/dosen` | - | Array JSON 17 Dosen | Mengambil daftar 17 dosen lengkap dengan KK, statistik TA, publikasi, & kata kunci |
| `GET` | `/api/dosen/{id}/documents` | Path `id_dosen` | JSON Riwayat Bimbingan & Publikasi | Mengambil seluruh daftar judul TA yang pernah dibimbing & artikel publikasi dosen terpilih |
| `GET` | `/api/info` | - | JSON Model Metadata | Mengambil informasi versi model, jumlah fitur (12.364), dan metrik evaluasi resmi |
| `GET` | `/api/documents` | - | Array JSON Berkas Panduan | Mengambil daftar 2 dokumen pedoman tugas akhir resmi DSI 2025 |
| `GET` | `/api/documents/{id}/stream` | Path `id_dokumen` | Stream `application/pdf` | Menyajikan aliran berkas PDF inline untuk penampil pratinjau browser |

> **[SCREENSHOT: Gambar 1.7 - Dokumentasi Interaktif REST API (Swagger UI) Backend FastAPI]**  
> *Panduan Bukti Visual: Tangkapan layar antarmuka Swagger UI di `http://127.0.0.1:8000/docs` yang menampilkan daftar endpoint lengkap berstatus aktif.*

---

### 1.12 User Interface Implementation (Tahap 12 — Farrel Ghufran Rahman)
Antarmuka pengguna dibangun menggunakan **React 19, TypeScript, Vite, dan Tailwind CSS**. Selaras dengan masukan dosen dan identitas resmi, tata letak menggunakan **Sidebar Navigation** di sebelah kiri serta mengadopsi palet warna logo resmi SI-REKTA: **Deep Maroon (`#6D302D`)** dan **Warm Copper/Terracotta (`#C5694B`)**.

Fitur utama antarmuka web mencakup:
1. **Halaman Beranda**: Hero banner dengan tombol aksi kontras (*high-contrast CTA*), ringkasan 3 angka metrik (17 Dosen, 706 Bimbingan, 643 Publikasi), dan alur cara kerja 4 langkah.
2. **Halaman Cari Dosen & Hasil Top-3**: Formulir textarea judul dilengkapi *live word counter* dinamis yang mendeteksi batas 6 kata, tombol contoh judul siap klik, dan kartu hasil rekomendasi dosen (#1, #2, #3) bebas tampilan skor numerik.
3. **Modal Detail Dosen**: Pengguna dapat mengeklik kartu dosen mana pun pada direktori untuk membuka jendela pop-up modal yang memuat seluruh riwayat judul tugas akhir yang pernah dibimbing dan seluruh publikasi ilmiah dosen yang bersangkutan.
4. **Penampil PDF Terintegrasi (*In-Page PDF Viewer*)**: Membaca langsung dokumen *PANDUAN TUGAS AKHIR DSI 2025* dan *PEDOMAN TOPIK TUGAS AKHIR DSI 2025* langsung di dalam aplikasi tanpa perlu mengunduh ke komputer.
5. **Penyimpanan Riwayat Lokal (*LocalStorage Snapshot*)**: Seluruh hasil pencarian disimpan secara instan ke Local Storage browser pengguna tanpa memerlukan login akun.

> **[SCREENSHOT: Gambar 1.8 - Antarmuka Halaman Utama (Beranda) SI-REKTA]**  
> *Panduan Bukti Visual: Tangkapan layar halaman Beranda SI-REKTA memperlihatkan logo resmi, tombol "Cari Dosen Sekarang", dan 3 kartu ringkasan data.*

> **[SCREENSHOT: Gambar 1.9 - Antarmuka Form Pencarian Rekomendasi Dosen dan Hasil Kartu Top-3]**  
> *Panduan Bukti Visual: Tangkapan layar halaman Cari Dosen saat menampilkan 3 kartu dosen rekomendasi lengkap dengan badge peringkat #1, #2, #3 dan chips kata kunci relevan.*

> **[SCREENSHOT: Gambar 1.10 - Modal Detail Riwayat Bimbingan dan Publikasi Dosen]**  
> *Panduan Bukti Visual: Tangkapan layar jendela pop-up modal detail dosen yang menampilkan daftar tab bimbingan skripsi dan publikasi ilmiah.*

> **[SCREENSHOT: Gambar 1.11 - Fitur Pratinjau PDF Buku Panduan Tugas Akhir di Web]**  
> *Panduan Bukti Visual: Tangkapan layar halaman Dokumen Pedoman yang menampilkan berkas PDF resmi tersemat langsung di dalam layar web.*

---

# BAB 2: KENDALA DAN SOLUSI (ANALISIS MASALAH & PENYEBABNYA)

Selama tahapan pengembangan dari Progress Report 1 hingga Progress Report 2, tim menemui empat kendala teknis dan konseptual mendasar. Seluruh kendala tersebut berhasil dianalisis akar penyebabnya dan diselesaikan secara metodologis.

---

### 2.1 Kendala 1: Keterbatasan Skema Bobot Manual ($\alpha$) pada Late-Fusion Progress 1
Pada Progress Report 1, tim menggunakan pendekatan *Late-Fusion* dengan memisahkan matriks skripsi dan publikasi, lalu memadukan skornya menggunakan bobot adaptif $\alpha$ (0.60 untuk skripsi, 0.40 untuk publikasi). 

**Tabel 2.1 Analisis Kendala 1: Keterbatasan Bobot Manual Late-Fusion**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Saat dilakukan pengujian variasi kueri judul, rekomendasi kerap mengalami bias. Dosen senior yang memiliki riwayat skripsi sangat banyak terkadang tidak muncul di Top-3 meskipun publikasi terbarunya sangat cocok dengan kueri, karena teredam oleh bobot skripsi yang dominan. |
| **Akar Penyebab** | Nilai $\alpha = 0.60$ dan $0.40$ ditetapkan secara heuristik (tebakan manual). Pemisahan matriks menyebabkan ruang vektor terbelah dua, sehingga pembobotan magnitudo tidak terjadi secara natural antar-kata. |
| **Solusi Ilmiah Tim** | Tim melakukan pivot arsitektur ke **Unified Corpus Profile Aggregation**. Teks riwayat skripsi dan publikasi milik dosen digabung menjadi satu dokumen utuh sebelum ditransformasikan oleh TF-IDF. |
| **Hasil & Bukti Terukur** | Menghilangkan kebutuhan tuning bobot manual $\alpha$. Dimensi fitur melonjak menjadi 12.364 fitur dan akurasi Hit Rate@3 meningkat dari 76.41% menjadi **79.66%**. |

---

### 2.2 Kendala 2: Risiko Kesalahpahaman Terhadap Tampilan Skor Persentase (%)
Pada antarmuka awal, tim sempat menampilkan nilai skor Cosine Similarity yang dinormalisasi ke dalam persentase (contoh: *"Ricky Akbar: 100%"*, *"Rahmatika: 90.63%"*).

**Tabel 2.2 Analisis Kendala 2: Kebijakan Integritas Tampilan Zero Score Exposure**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Ketika diuji coba ke beberapa mahasiswa, mereka menganggap angka "100%" atau "90%" adalah jaminan bahwa dosen tersebut pasti bersedia menerima bimbingan atau jaminan kelulusan tugas akhir. |
| **Akar Penyebab** | Cosine similarity dalam temu balik informasi hanya mengukur kedekatan sudut antar-vektor leksikal secara relatif terhadap kueri, bukan probabilitas statistik kelayakan akademik. |
| **Solusi Ilmiah Tim** | Tim merumuskan dan menerapkan aturan bisnis ketat **Zero Score Exposure** pada antarmuka web. Seluruh angka skor, persentase, atau progress bar dihapus dari pandangan pengguna. Bukti relevansi digantikan secara transparan oleh *Explainable AI* berupa kata kunci yang cocok (*matched keywords*) dan riwayat paper terkait. |
| **Hasil & Bukti Terukur** | Antarmuka menjadi sangat elegan, mendidik, aman secara etika birokrasi akademik, dan mencegah potensi konflik antara mahasiswa dengan calon dosen pembimbing. |

---

### 2.3 Kendala 3: Masukan Judul Kueri yang Terlalu Singkat dan Ambigu
Pada pengujian awal formulir pencarian, beberapa pengguna memasukkan teks yang sangat singkat, seperti *"Sistem Informasi"* atau *"Website Toko"*.

**Tabel 2.3 Analisis Kendala 3: Validasi Masukan Judul Minimal 6 Kata**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Kueri 1–3 kata menghasilkan rekomendasi acak dan tidak stabil, di mana dosen dari kelompok keahlian mana pun bisa menduduki peringkat #1 tanpa dasar topik yang kuat. |
| **Akar Penyebab** | Vektor kueri yang hanya terdiri dari 1 atau 2 kata menghasilkan representasi yang sangat renggang (*sparse*), sehingga perkalian skalar dengan vektor dokumen dosen kehilangan daya beda (*discriminative power*). |
| **Solusi Ilmiah Tim** | Tim menerapkan validasi ketat dua lapis: pada antarmuka frontend (indikator *word counter* dinamis yang mendeteksi batas minimal) dan pada backend FastAPI (penolakan HTTP 400 Bad Request jika kata < 6). |
| **Hasil & Bukti Terukur** | Mahasiswa terdorong untuk menuliskan ide penelitian yang lengkap (minimal 6 kata), sehingga vektor kueri memiliki konteks topik riset yang spesifik dan rekomendasi terbukti presisi. |

---

### 2.4 Kendala 4: Potensi Kebocoran Data (*Data Leakage*) pada Evaluasi Model
Pada Progress Report 1, pengujian evaluasi menggunakan 5-Fold Cross Validation standar pada korpus skripsi tanpa memisahkan pengaruh publikasi dosen.

**Tabel 2.4 Analisis Kendala 4: Partisi Terisolasi Bebas Data Leakage**
| Komponen Analisis | Uraian Penjelasan Ilmiah |
|---|---|
| **Kronologi Masalah** | Terdapat kekhawatiran terjadinya bias optimis semu (*overfitting*), di mana kueri uji memiliki kata-kata yang persis sama dengan publikasi dosen yang menjadi profil referensi. |
| **Akar Penyebab** | Tidak adanya pemisahan tegas antara korpus referensi dosen dengan kueri pengujian. |
| **Solusi Ilmiah Tim** | Tim mengadopsi kerangka pengujian baku Information Retrieval menggunakan library `ranx`. Seluruh 642 publikasi dikunci 100% pada training set, dan 118 judul skripsi diisolasi murni sebagai testing set setelah diverifikasi tidak identik dengan publikasi. |
| **Hasil & Bukti Terukur** | Evaluasi model terbukti objektif, jujur secara metodologis, dan menghasilkan skor Hit Rate@3 79.66% yang murni mencerminkan performa pada data tak terlihat (*unseen data*). |

---

# BAB 3: KOORDINASI TIM DAN KONTRIBUSI ANGGOTA

Pengembangan proyek SI-REKTA dilaksanakan secara kolaboratif menggunakan pembagian peran kerja yang saling melengkapi (*cross-functional team*).

---

### 3.1 Pembagian Peran dan Matriks Tanggung Jawab 12 Tahapan
Setiap anggota memiliki spesialisasi peran utama yang memetakan tanggung jawab pada 12 tahapan resmi, sebagaimana disajikan pada Tabel 3.1.

**Tabel 3.1 Matriks Pembagian Tanggung Jawab 12 Tahapan Kelompok 5**
| Nama Anggota Tim | NIM | Peran Utama | Pemetaan 12 Tahapan Resmi yang Dikelola |
|---|---|---|---|
| **Fuadi Dhiyaulhaq** | 2411522001 | Project Manager & System Architect | **Tahap 1, Tahap 2, Tahap 3, Tahap 4, dan Tahap 11** |
| **Rafa Gian Atthari** | 2411522014 | Machine Learning & NLP Specialist | **Tahap 5, Tahap 6, Tahap 7, dan Tahap 10** |
| **Farrel Ghufran Rahman** | 2411521009 | Evaluation Specialist & Frontend UI Developer | **Tahap 8, Tahap 9, dan Tahap 12** |

---

### 3.2 Progres Nyata dan Kontribusi Spesifik Berbasis Bukti Kode/Artefak
Setiap anggota tim membuktikan kontribusi nyata yang terukur berbasis artefak kode program pada repositori resmi GitHub, sebagaimana dirinci pada Tabel 3.2.

**Tabel 3.2 Rincian Kontribusi Spesifik dan Artefak Nyata yang Dihasilkan per Anggota**
| Nama Anggota | Bukti Artefak Kode Program | Rincian Kontribusi Nyata yang Diselesaikan |
|---|---|---|
| **Fuadi Dhiyaulhaq** | - `sirekta.sql` (DDL & DML)<br>- `backend/app/main.py`<br>- `backend/app/database.py`<br>- `backend/app/models.py`<br>- `backend/app/config.py` | 1. Merancang dan mengeksekusi Tahap 1, 2, 3, dan 4 (Problem Identification, System Requirements, Data Analysis, Preprocessing).<br>2. Merancang skema relasi basis data 3NF (10 tabel) dan mengeksekusi migrasi data di MySQL Laragon.<br>3. Bertanggung jawab penuh pada **Tahap 11 (Model Integration into the System)**: membangun seluruh endpoint RESTful API pada FastAPI lengkap dengan dokumentasi OpenAPI/Swagger.<br>4. Mengimplementasikan fitur streaming PDF inline (`content-disposition: inline`) agar buku panduan dapat dibaca langsung di browser.<br>5. Memimpin koordinasi tim dan menyelaraskan integrasi backend dengan antarmuka frontend. |
| **Rafa Gian Atthari** | - `docs/SIREKTA.ipynb`<br>- `backend/app/preprocessor.py`<br>- `backend/app/recommender.py`<br>- `backend/app/schemas.py` | 1. Bertanggung jawab penuh pada **Tahap 5, 6, dan 7 (Data Processing Procedures, Algorithm Selection, Model Development)**.<br>2. Merancang ekstraksi fitur TF-IDF N-gram sublinear yang melesat menjadi 12.364 fitur leksikal.<br>3. Mengembangkan algoritma *Unified Corpus Profile Aggregation* berbasis Cosine Similarity.<br>4. Membangun modul *Explainable AI (XAI)* untuk ekstraksi otomatis kata kunci relevan dan paper pendukung.<br>5. Bertanggung jawab pada **Tahap 10 (Information System Design)**: merancang arsitektur data 3-tier dan spesifikasi DDL relasi tabel. |
| **Farrel Ghufran Rahman** | - `frontend/src/App.tsx`<br>- `frontend/src/components/*`<br>- `frontend/src/pages/*`<br>- `model/metadata_model.json`<br>- `model/si_rekta_pipeline.joblib` | 1. Bertanggung jawab penuh pada **Tahap 8 (Model Evaluation)**: merancang dan mengeksekusi kerangka evaluasi baku IR menggunakan pustaka `ranx` pada 118 kueri testing.<br>2. Bertanggung jawab pada **Tahap 9 (Model Storage)**: menserialisasikan pipeline model ke berkas biner `.joblib` dan menguji latensi inferensi (< 5 ms).<br>3. Bertanggung jawab penuh pada **Tahap 12 (User Interface Implementation)**: membangun antarmuka web interaktif React Vite (Sidebar, Form Kueri, Kartu Top-3, Modal Riwayat Dosen, In-Page PDF Viewer).<br>4. Menyelaraskan tema warna antarmuka web ke palet resmi logo: Marun (`#6D302D`) dan Tembaga (`#C5694B`). |

---

### 3.3 Alur Koordinasi Tim dan Kolaborasi GitHub
Untuk menjaga kelancaran pengembangan dan menghindari konflik kode (*merge conflict*), tim menerapkan alur koordinasi berbasis Git:
1. **Pusat Repositori GitHub (`https://github.com/accfd/SI-REKTA.git`)**: Menjadi *single source of truth* untuk seluruh kode program backend, frontend, database, dan artefak model.
2. **Sinkronisasi Antar-Anggota**: Pengerjaan fitur dilakukan secara terisolasi pada modul masing-masing. Ketika modul inferensi ML (`recommender.py`) selesai dibangun oleh Rafa, Fuadi langsung mengintegrasikannya ke endpoint FastAPI, sementara Farrel mengonsumsi payload JSON tersebut ke dalam antarmuka React.
3. **Pengujian Mandiri Otomatis (`run_system.bat`)**: Fuadi menyusun skrip otomasi satu-klik untuk memastikan database Laragon, server FastAPI (port 8000), dan frontend Vite (port 5173) dapat dijalankan secara serempak oleh seluruh anggota untuk pengujian lokal.

---

# BAB 4: KESIMPULAN PROGRESS REPORT 2 DAN RENCANA TINDAK LANJUT

### 4.1 Kesimpulan Capaian Progress Report 2
Berdasarkan seluruh tahapan perancangan, eksperimen, dan implementasi yang telah dilaksanakan hingga Progress Report 2, dapat disimpulkan bahwa:

1. **Evolusi Model yang Sukses**: Transisi dari *Late-Fusion* berbobot manual ke **Unified Corpus Profile Aggregation** dengan ekstraksi **12.364 fitur TF-IDF N-gram** terbukti meningkatkan kualitas representasi kepakaran dosen secara signifikan tanpa menimbulkan fragmentasi vektor.
2. **Kinerja Model Sangat Tinggi**: Evaluasi baku Information Retrieval menggunakan pustaka `ranx` pada 118 data testing independen mencatatkan **Hit Rate@3 sebesar 79.66%**, **Recall@3 sebesar 75.42%**, dan **MRR@3 sebesar 0.6031**. Capaian ini terbukti **sangat unggul (*superior*)** jika dibandingkan dengan tolok ukur literatur pada kajian SLR.
3. **Solusi Nyata Masalah Cold-Start**: Pemanfaatan korpus publikasi riset terbukti 100% sukses memetakan dan merekomendasikan dosen-dosen baru yang belum memiliki riwayat bimbingan skripsi ke peringkat Top-3 secara kompetitif.
4. **Implementasi Nyata End-to-End**: Seluruh rancangan sistem telah berhasil diwujudkan menjadi aplikasi web fungsional penuh (Live), mencakup basis data relasional 3NF MySQL Laragon (10 tabel), backend RESTful FastAPI dengan latensi < 5 ms, dan antarmuka web modern React Vite bertema warna resmi logo yang siap digunakan oleh mahasiswa Departemen Sistem Informasi.

### 4.2 Rencana Tindak Lanjut Menuju Final Report
Meskipun sistem telah berhasil dibangun dan diintegrasikan secara penuh dari backend hingga frontend, beberapa rencana penyempurnaan akan dilaksanakan menuju Final Report:
1. **User Acceptance Testing (UAT)**: Melakukan pengujian kegunaan (*usability test*) menggunakan kuesioner System Usability Scale (SUS) kepada minimal 30 mahasiswa tingkat akhir DSI Unand.
2. **Pembaruan Korpus Semester Berjalan**: Mengumpulkan dan menambahkan data riwayat skripsi lulusan semester ganjil 2025/2026 yang baru saja menyelesaikan yudisium.
3. **Deployment Cloud / Server Universitas**: Memaketkan sistem ke dalam wadah Docker (*containerization*) untuk di-deploy pada server laboratorium sistem informasi Universitas Andalas.

---

# LAMPIRAN

### Lampiran 1: Literatur Systematic Literature Review (SLR)
Rangkuman sintesis literatur dari dokumen `docs/SIREKTA_SLR.docx` menunjukkan bahwa model sistem rekomendasi tugas akhir berbasis leksikal terpadu SI-REKTA memberikan rasio efisiensi akurasi-terhadap-komputasi tertinggi dibandingkan arsitektur lain:
- *Akurasi Hit Rate@3*: SI-REKTA (79.66%) vs Baseline Literatur (68.20% – 71.40%).
- *Kecepatan Inferensi*: SI-REKTA (3.68 ms) vs Dense BERT Retriever (120–450 ms).
- *Biaya Infrastruktur*: SI-REKTA (0 GPU, server CPU biasa) vs Deep Learning (membutuhkan GPU VRAM $\ge$ 8 GB).
- *Mitigasi Cold-Start*: Berhasil 100% memetakan dosen baru menggunakan publikasi ilmiah, melampaui kelemahan mendasar Collaborative Filtering.

---

### Lampiran 2: Tautan Repositori Resmi GitHub & Live Notebook
- **Repositori Utama GitHub**: [https://github.com/accfd/SI-REKTA.git](https://github.com/accfd/SI-REKTA.git)
- **Buku Kerja Eksperimen Resmi**: Berkas `docs/SIREKTA.ipynb` pada repositori.
- **Branch Aktif**: `main` (Komit terverifikasi: `bddae3c`).

---

### Lampiran 3: Panduan Eksekusi Sistem Secara Mandiri di Lingkungan Lokal (run_system.bat)
Untuk menjalankan ekosistem SI-REKTA secara mandiri pada komputer penguji:
1. Pastikan Laragon aktif (Apache & MySQL port 3306).
2. Jalankan berkas skrip otomatis di root proyek:
   ```cmd
   d:\SEMESTER 5\ML\run_system.bat
   ```
3. Akses antarmuka web melalui browser pada alamat:
   - **Frontend Web UI**: `http://localhost:5173`
   - **Backend API Docs (Swagger)**: `http://localhost:8000/docs`
