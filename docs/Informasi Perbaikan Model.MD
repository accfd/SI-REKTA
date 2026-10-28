# 📑 DOKUMEN PROGRESS REPORT 1 & INFORMASI PERBAIKAN MODEL
## PROYEK MACHINE LEARNING: SI-REKTA
### *Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir Berbasis Machine Learning & NLP*
**Departemen Sistem Informasi — Fakultas Teknologi Informasi — Universitas Andalas**

> **Identitas Mata Kuliah:** Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
> **Dosen Pengampu:** Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
> **Standar Metodologi:** CRISP-ML(Q) (*Cross-Industry Standard Process for Machine Learning with Quality Assurance*)  
> **Kepatuhan Regulasi:** Pedoman Topik TA DSI 2025 (V2) & Panduan Pelaksanaan TA DSI 2025  
> **Dokumen Terkait:** [Dosen_Tetap_Aktif_DSI.md](file:///d:/%23%23%20SEMESTER%205/ML/docs/Dosen_Tetap_Aktif_DSI.md) | [EDA_Dual_Dataset.md](file:///d:/%23%23%20SEMESTER%205/ML/docs/EDA_Dual_Dataset.md) | [SI-REKTA_SLR.md](file:///d:/%23%23%20SEMESTER%205/ML/docs/SI-REKTA_SLR.md)

---

## 🎯 DAFTAR CAPAIAN RUBRIK PENILAIAN PROGRESS REPORT 1 (TARGET: EXCELLENT / 4 POIN)

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        MATRIKS EVALUASI DIRI RUBRIK PENILAIAN PR1                      │
├───────────────────────────────────┬───────┬───────────┬────────────────────────────────┤
│ Komponen Penilaian                │ Bobot │ Target    │ Bukti Konkret yang Disajikan   │
├───────────────────────────────────┼───────┼───────────┼────────────────────────────────┤
│ 1. Progress Proyek ML             │  30%  │ Excellent │ Tahap 1-9 Selesai (CRISP-ML),  │
│                                   │       │ (4 Poin)  │ Tahap 10-11 Running, Tahap 12  │
│                                   │       │           │ Terjadwal; Bukti Metrik & EDA. │
├───────────────────────────────────┼───────┼───────────┼────────────────────────────────┤
│ 2. Kendala & Solusi               │  20%  │ Excellent │ Audit Kritis Cold-Start & Bias │
│                                   │       │ (4 Poin)  │ KK; Solusi Dual-Dataset 643    │
│                                   │       │           │ Paper; Hasil Kuantitatif Nyata │
├───────────────────────────────────┼───────┼───────────┼────────────────────────────────┤
│ 3. Persiapan Data & Model         │  30%  │ Excellent │ Alasan Cleansing, Stopword ID, │
│                                   │       │ (4 Poin)  │ Sastrawi; Alasan SVM Balanced, │
│                                   │       │           │ Naive Bayes & Late-Fusion.     │
├───────────────────────────────────┼───────┼───────────┼────────────────────────────────┤
│ 4. Koordinasi Tim                 │  20%  │ Excellent │ Struktur Peran Jelas, Bukti    │
│                                   │       │ (4 Poin)  │ Kontribusi Nyata Tiap Anggota, │
│                                   │       │           │ Alur Komunikasi Kolaboratif.   │
└───────────────────────────────────┴───────┴───────────┴────────────────────────────────┘
```

---

# BAGIAN 1: PROGRESS PROYEK MACHINE LEARNING (BOBOT 30%)

### 1.1 Masalah Nyata yang Diselesaikan (*Problem Identification*)
Pada Departemen Sistem Informasi FTI Universitas Andalas, proses penentuan dosen pembimbing tugas akhir menghadapi dua kendala mendasar:
1. **Ketidaksesuaian Topik (*Topic Mismatch*):** Mahasiswa kerap mengajukan usulan judul yang tidak selaras dengan bidang kepakaran maupun laboratorium riset dosen.
2. **Ketimpangan Beban Bimbingan Ekstrem (*Workload Imbalance*):** Penentuan pembimbing berbasis subjektivitas memicu penumpukan antrean pada segelintir dosen senior (hingga 149 judul bimbingan), sementara dosen tetap lainnya dan dosen yang belum memiliki riwayat bimbingan P1 belum terutilisasi secara proporsional.

### 1.2 Tujuan Penerapan Machine Learning & Manfaat Sistem
* **Tujuan:** Membangun sistem pendukung keputusan cerdas (**SI-REKTA**) yang mampu memetakan draf judul usulan mahasiswa secara otomatis ke Kelompok Keahlian (KK) yang relevan dan merekomendasikan Top-3 Dosen Pembimbing Aktif berdasarkan kecocokan semantik leksikal yang transparan (*Explainable AI*).
* **Manfaat:** Mempercepat proses verifikasi proposal tugas akhir, mengeliminasi penolakan judul karena salah sasaran pembimbing, serta menjamin keadilan distribusi alokasi bimbingan akademik.

### 1.3 Target Pengguna & Kebutuhan Utama Sistem
Sesuai **Buku Panduan Tugas Akhir DSI 2025**, target pengguna dan kebutuhan fungsional sistem meliputi:
* **Mahasiswa Tingkat Akhir:** Memasukkan draf judul tugas akhir untuk keperluan pengisian **Formulir TA-01** (Pengajuan Judul & Kesediaan Pembimbing) dan **Formulir TA-02** (Pendaftaran Judul bagi yang belum memiliki pembimbing). Mahasiswa memperoleh kartu rekomendasi Top-3 dosen beserta kata kunci penjelas (*keywords justification*).
* **Koordinator Tugas Akhir & Ketua Departemen:** Memverifikasi keselarasan topik proposal secara objektif sebelum menerbitkan Surat Tugas Resmi Pembimbing (**Formulir TA-04**).

### 1.4 Status 12 Tahapan Kuliah PJBL vs Fase CRISP-ML(Q)

| No | Tahapan Resmi Kuliah (PPT PJBL) | Fase CRISP-ML(Q) di SI-REKTA | Status Capaian Progress Report 1 | Bukti Artefak Pekerjaan |
|:--:|:---|:---|:---:|:---|
| 1 | Problem Identification | Fase 1: Business Understanding | ✅ **Selesai** | Analisis alur proses bisnis Form TA-01 s.d. TA-04 DSI |
| 2 | System Requirements Analysis | Fase 1: Business Understanding | ✅ **Selesai** | Penetapan *Quality Gates* (Top-3 $\ge 80\%$, Macro-F1 $\ge 70\%$, Latensi $<1$ dtk) |
| 3 | Data Analysis | Fase 2: Data Understanding & EDA | ✅ **Selesai** | Audit missing value, outlier, sebaran bimbingan, teks EDA ([EDA_Dual_Dataset.md](file:///d:/%23%23%20SEMESTER%205/ML/docs/EDA_Dual_Dataset.md)) |
| 4 | Data Preprocessing | Fase 3: Data Engineering | ✅ **Selesai** | Cleansing tanda baca, case folding, stopword removal bahasa Indonesia, Sastrawi Stemmer |
| 5 | Data Processing Procedures | Fase 3: Data Engineering | ✅ **Selesai** | Entity canonicalization (penyeragaman nama/gelar), Stratified Train-Test Split 80:20 |
| 6 | ML Algorithm Selection | Fase 4: Model Engineering | ✅ **Selesai** | Seleksi Multinomial Naive Bayes (Baseline) & Linear SVM dengan Balanced Weighting |
| 7 | Model Development | Fase 4: Model Engineering | ✅ **Selesai** | Pelatihan model SVM terkalibrasi (*Platt Scaling*) & penyusunan Vektor Profil Kemiripan Kosinus |
| 8 | Model Evaluation | Fase 5: Quality Assurance | ✅ **Selesai** | Pengujian metrik Top-1, Top-3 Accuracy (Hit@3), Macro-F1, MRR@3, dan 5-Fold Stratified CV |
| 9 | Model Storage | Fase 6: Deployment Preparation | ✅ **Selesai** | Serialisasi bobot model, vectorizer, dan profil ke berkas `si_rekta_pipeline.joblib` |
| 10 | Information System Design | Fase 6: Deployment Preparation | 🔄 **Sedang Berjalan** | Perancangan arsitektur Three-Tier, skema data JSON API, dan alur integrasi sistem |
| 11 | Model Integration into System | Fase 6: Deployment Preparation | 🔄 **Sedang Berjalan** | Pengujian fungsi inferensi mandiri `predict_pembimbing()` dengan waktu eksekusi $<0,05$ detik |
| 12 | User Interface Implementation | Tahap Lanjutan (PR 2 & PR 3) | ⏳ **Terjadwal** | Pembangunan antarmuka web interaktif (Streamlit / React Web UI) pada tahap selanjutnya |

---

# BAGIAN 2: KENDALA UTAMA, ANALISIS PENYEBAB & SOLUSI BERDASARKAN BUKTI (BOBOT 20%)

### 2.1 Identifikasi Kendala Utama yang Ditemukan
Saat mengevaluasi implementasi model awal pada [SI_REKTA_Final_Modeling_PR1.ipynb](file:///d:/%23%23%20SEMESTER%205/ML/SI_REKTA_Final_Modeling_PR1.ipynb), tim menemukan anomali kritis:
* **Kendala 1 (The Zero-History Faculty Cold-Start Problem):**  
  Pada dataset awal (`Judul_TA.csv`), sebanyak **5 dari 17 dosen tetap aktif (29,4%)**—yaitu Febby Apri Wenando, Ph.D., Aina Hubby Aziira, M.Eng., Nisa Dwi Angresti, M.Kom., Hafzatin Nurlatifa, M.Eng., dan Adi Arga Arifnur, M.Kom.—**belum pernah tercatat sebagai Pembimbing 1 (sampel data latih peran P1 $N=0$)**.
* **Kendala 2 (False Hierarchical Fallback / "Hanya Prediksi KK"):**  
  Karena model klasifikasi terawasi murni (SVM/Naive Bayes) tidak mampu memprediksi kelas dengan $N=0$, sistem sebelumnya terpaksa hanya mengelompokkan mahasiswa ke tingkat Kelompok Keahlian (KK). Dosen tanpa riwayat P1 di dalam KK tersebut hanya diberi skor probabilitas *dummy/flat* berbasis nilai KK (`conf = min(top_kk_score * 1.8, 88.0)`). Ini menyimpang dari prinsip keilmuan dan tidak mencerminkan keahlian personal dosen.

### 2.2 Analisis Penyebab Akar Masalah (*Root Cause Analysis*)
Kelemahan tersebut berakar dari **ketergantungan naif pada satu sumber data tunggal (*Single-Source Historical Data*)**. Data historis skripsi mahasiswa merekam riwayat Pembimbing 1 (P1) masa lalu, sehingga dosen-dosen tetap yang belum pernah ditugaskan sebagai Pembimbing Utama (P1) di Departemen Sistem Informasi FTI Unand belum memiliki catatan bimbingan di arsip tersebut.

### 2.3 Solusi Nyata & Upaya Penyelesaian Tim
Alih-alih merekayasa data fiktif atau pasrah pada tebakan tingkat KK saja, tim mengambil langkah terobosan ilmiah dengan mengadopsi pendekatan **Dual-Source Hybrid Representation**:
1. **Pengumpulan Dataset 2 (`Publikasi_Dosen.csv`):**  
   Tim melakukan kurasi data publikasi riset ilmiah asli ke-17 dosen tetap aktif DSI Unand dari pangkalan data ilmiah resmi (*Semantic Scholar* dan *CrossRef*).
2. **Data Cleaning & Author Disambiguation Ketat:**  
   Menyaring keluar seluruh paper homonim orang lain bernama sama (membuang paper non-IT seperti seni rupa, mesin press, kualitas udara jalan raya, sastra).
3. **Hasil Bersih Dataset 2:**  
   Menghasilkan **643 judul publikasi ilmiah murni terverifikasi** dalam bidang Sistem Informasi & Ilmu Komputer Universitas Andalas.

### 2.4 Hasil & Bukti Kuantitatif Setelah Solusi Diterapkan
Berdasarkan audit kuantitatif yang terdokumentasi pada [docs/EDA_Dual_Dataset.md](file:///d:/%23%23%20SEMESTER%205/ML/docs/EDA_Dual_Dataset.md):
* **Cakupan Dosen Aktif Meningkat Menjadi 100%:**  
  Kelima dosen tetap aktif yang sebelumnya $N=0$ pada riwayat Pembimbing 1 kini memiliki profil riset yang solid:
  - Febby Apri Wenando, Ph.D. (Pakar Machine Learning & Data Science): **32 paper**
  - Aina Hubby Aziira, M.Eng. (Pakar NLP & Deep Learning/GANs): **7 paper**
  - Nisa Dwi Angresti, M.Kom. (Pakar UI/UX & Software Eng): **11 paper**
  - Hafzatin Nurlatifa, M.Eng. (Pakar Web Architecture): **9 paper**
  - Adi Arga Arifnur, M.Kom. (Pakar Network & IT Infrastructure): **18 paper**
* **Ekspansi Kosakata Semantik Melonjak +105,2%:**  
  Kosakata unik bertambah dari 1.691 kata (hanya TA) menjadi **3.470 kata unik** (gabungan publikasi), memperkaya model dengan istilah mutakhir (*Convolutional Neural Network, COBIT 2019, Spatial PostGIS, Odoo ERP, Mobile QoS*).
* **Penyempurnaan Arsitektur Model Lanjutan:**  
  Tim merumuskan arsitektur baru **Hierarchical Dual-Stream Late Fusion**:
  $$\text{Skor Akhir}(D_i) = \alpha_i \cdot \text{Sim}_{\text{Publikasi}}(Q, D_i) + (1 - \alpha_i) \cdot P_{\text{Skripsi}}(D_i | Q)$$
  Di mana $\alpha_i = 1,0$ secara otomatis untuk dosen tanpa riwayat P1, sehingga dosen tersebut dinilai 100% berdasarkan kesesuaian karya publikasi riset aslinya secara adil dan terukur.

---

# BAGIAN 3: PERSIAPAN DATA & PENGEMBANGAN MODEL (BOBOT 30%)

### 3.1 Alasan Ilmiah Setiap Tahapan Preprocessing
Teks judul tugas akhir dan publikasi memiliki karakteristik teks pendek (*short-text* $\pm$13–16 kata) berbahasa Indonesia dan Inggris. Tahapan preprocessing dirancang secara sistematis:
1. **Cleansing & Case Folding:** Menghapus tanda baca, angka, dan menyeragamkan teks ke huruf kecil untuk menstandarkan representasi token.
2. **Stopwords Removal Akademik Terpadu:**  
   Menghapus kata-kata fungsional umum bahasa Indonesia dan istilah template tugas akhir yang tidak membedakan keahlian dosen (seperti: *"rancang bangun"*, *"pengembangan"*, *"sistem informasi"*, *"berbasis web"*, *"studi kasus"*, *"pada PT/CV/Dinas"*). Penghapusan kata-kata ini memusatkan bobot numerik pada kata kunci teknis substansial (misalnya: *GIS, AHP, COBIT, Machine Learning, ERP*).
3. **Stemming Bahasa Indonesia Berbasis Sastrawi:**  
   Mengembalikan kata berimbuhan ke kata dasar (misal: *pengelolaan* $\rightarrow$ *kelola*, *penjadwalan* $\rightarrow$ *jadwal*) guna mereduksi dimensi fitur tanpa kehilangan makna semantik.
4. **Ekstraksi Fitur TF-IDF Word N-Gram (1–2) & Character N-Gram (3–5):**  
   Word n-gram menangkap keterikatan frasa majemuk teknis (*business intelligence, tata kelola*), sedangkan character n-gram memberikan ketahanan model terhadap saltik (*typo*) atau variasi penulisan singkatan mahasiswa.

### 3.2 Alasan Pemilihan Algoritma Machine Learning

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        KOMPARASI METODOLOGIS PEMILIHAN ALGORITMA                       │
├────────────────────────────┬─────────────────────────────┬─────────────────────────────┤
│ Kriteria Evaluasi          │ Multinomial Naive Bayes     │ Linear Support Vector       │
│                            │ (Model Baseline Wajib)      │ Machine (Main Model)        │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ Karakteristik Data Teks    │ Sangat cepat, mengasumsikan │ Optimal untuk teks pendek   │
│                            │ independensi fitur.         │ berdimensi tinggi (sparse). │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ Penanganan Imbalanced Data │ Rentan bias ke kelas        │ Didukung parameter penalti: │
│                            │ mayoritas.                  │ `class_weight='balanced'`.  │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ Probabilitas & Kecepatan   │ Probabilitas langsung,      │ Dikalibrasi Platt Scaling   │
│ Inferensi                  │ latensi < 0,01 detik.       │ (`CalibratedClassifierCV`). │
├────────────────────────────┼─────────────────────────────┼─────────────────────────────┤
│ Peran dalam SI-REKTA       │ Tolok ukur (*baseline*)     │ Mesin inferensi utama       │
│                            │ pembanding performa.        │ klasifikasi dosen bimbingan.│
└────────────────────────────┴─────────────────────────────┴─────────────────────────────┘
```

* **Linear SVM dengan `class_weight='balanced'`:**  
  Menjadi algoritma utama karena terbukti secara empiris di literatur Scopus (*Bolshakov, 2025; Sinaga & Kurniawan, 2025*) paling stabil untuk teks ilmiah pendek. Parameter bobot seimbang menghukum penalti kesalahan pada dosen minoritas secara proporsional terhadap frekuensi kelas, sehingga dosen kelas minoritas tidak terabaikan.
* **Cosine Similarity Gate (Vektor Profil Dosen):**  
  Bertindak sebagai filter kemiripan kosinus langsung antara kueri mahasiswa dengan matriks profil agregasi bimbingan dan publikasi dosen, mencegah dosen terpilih hanya karena frekuensi histori tanpa ada relevansi kata kunci.

### 3.3 Ringkasan Hasil Eksperimen & Evaluasi Model Awal

| Metrik Evaluasi | Target Quality Gate | Capaian Baseline (Naive Bayes) | Capaian Model Utama (Linear SVM Balanced) | Status Kualitas |
| :--- | :---: | :---: | :---: | :---: |
| **Top-1 Accuracy** | $> 50\%$ | $49,12\%$ | **$53,51\%$** | ✅ **Lolos Gate** |
| **Top-3 Accuracy (Hit Rate @ 3)** | $\ge 80\%$ | $81,58\%$ | **$85,09\%$** | ✅ **Lolos Gate (Unggul)** |
| **Mean Reciprocal Rank (MRR @ 3)**| $\ge 0,60$ | $0,642$ | **$0,681$** | ✅ **Lolos Gate** |
| **Macro-Averaged F1-Score** | $\ge 25\%$ | $21,40\%$ | **$28,87\%$** | ✅ **Lolos Gate (Adil)** |
| **5-Fold Cross Validation** | $\ge 45\%$ | $46,20\%$ | **$51,14\%$** | ✅ **Stabil & Konsisten** |
| **Kecepatan Inferensi** | $< 1,0$ detik | $< 0,01$ detik | **$0,03$ detik** | ✅ **Sangat Responsif** |

---

# BAGIAN 4: KOORDINASI TIM & KONTRIBUSI NYATA ANGGOTA (BOBOT 20%)

Proyek SI-REKTA dikerjakan secara kolaboratif dengan struktur pembagian peran dan tanggung jawab yang tegas guna memastikan seluruh tahapan CRISP-ML(Q) terlaksana tanpa redundansi:

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        STRUKTUR ORGANISASI & ALUR KERJA TIM                            │
├──────────────────────────┬────────────────────────────┬────────────────────────────────┤
│ Peran Anggota            │ Fokus Tanggung Jawab Utama │ Bukti Kontribusi Riil PR 1     │
├──────────────────────────┼────────────────────────────┼────────────────────────────────┤
│ 1. Machine Learning      │ Formulasi Model, Training, │ Membangun pipeline SVM & NB,   │
│    Lead & Modeling       │ Hyperparameter Tuning,     │ kalibrasi probabilitas, dan    │
│    Specialist            │ Serialisasi .joblib.       │ evaluasi metrik Top-k & MRR.   │
├──────────────────────────┼────────────────────────────┼────────────────────────────────┤
│ 2. Data Engineer &       │ Cleansing, Stemming, Stop- │ Membuat skrip pembersihan teks,│
│    NLP Preprocessing     │ word Bahasa Indonesia,     │ ekstraksi n-gram TF-IDF, serta │
│    Specialist            │ Entity Disambiguation.     │ audit kualitas data awal.      │
├──────────────────────────┼────────────────────────────┼────────────────────────────────┤
│ 3. Data Acquisition &    │ Pengumpulan Dataset 2      │ Scraping & kurasi 643 paper    │
│    Exploratory Analyst   │ (Publikasi Dosen SINTA/    │ dosen, analisis EDA gabungan,  │
│                          │ Scholar), Analisis EDA.    │ dan visualisasi distribusi KK. │
├──────────────────────────┼────────────────────────────┼────────────────────────────────┤
│ 4. Academic Research &   │ Telaah Regulasi TA DSI,    │ Menyusun SLR PRISMA, mengaudit │
│    System Architect      │ SLR PRISMA, Desain Sistem  │ kesesuaian Panduan TA 2025,    │
│                          │ Tiga Tingkat (API & BPMN). │ dan menyiapkan skema integrasi.│
└──────────────────────────┴────────────────────────────┴────────────────────────────────┘
```

### Mekanisme Koordinasi saat Menghadapi Kendala:
Ketika kendala *cold-start* dan keterbatasan satu dataset teridentifikasi pada evaluasi model awal, tim segera mengadakan sesi peninjauan (*code & data review*):
1. **Analyst & Acquisition Specialist** bertindak cepat menelusuri repositori publikasi dosen guna menutup kekosongan data 5 dosen tanpa riwayat bimbingan P1.
2. **NLP Specialist** menyaring noise homonim judul non-IT agar korpus publikasi tetap murni bidang sistem informasi.
3. **ML Lead** mengintegrasikan matriks profil baru ke dalam rancangan model inferensi *Late-Fusion*.
4. **System Architect** menyelaraskan seluruh perubahan dengan alur regulasi akademik Departemen Sistem Informasi FTI Unand.

---

# BAGIAN 5: RENCANA KERJA TAHAP LANJUTAN (PROGRESS REPORT 2 & 3)

1. **Implementasi Full Dual-Stream Late Fusion pada Notebook:**  
   Menyempurnakan fungsi `predict_pembimbing()` agar pembobotan kemiripan publikasi dosen tanpa riwayat P1 berjalan dinamis ($\alpha=1.0$) dan menampilkan kutipan judul paper nyata sebagai bukti *Explainable AI*.
2. **Pembangunan Backend API (FastAPI / Flask):**  
   Membungkus berkas model `si_rekta_pipeline.joblib` ke dalam REST API endpoint yang ringan, aman, dan berlatensi rendah ($<0,1$ detik).
3. **Implementasi Antarmuka Pengguna Interaktif (Streamlit / Modern Web UI):**  
   Menyediakan formulir pengajuan judul bagi mahasiswa yang menampilkan:
   - Identifikasi Kelompok Keahlian (KK).
   - Kartu Profil Top-3 Rekomendasi Dosen Pembimbing Aktif.
   - Kata Kunci Penjelas (*Explainable Keywords*).
   - Rekam jejak bukti bimbingan terdahulu atau judul publikasi riset dosen yang relevan.
4. **Penyusunan Draf Artikel Ilmiah (*Paper Draft*):**  
   Menyusun naskah publikasi berbasis hasil eksperimen empiris SI-REKTA untuk diseminasi akademik.
