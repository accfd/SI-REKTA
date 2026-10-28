# Kerangka Kerja & Metodologi Pengembangan Model Machine Learning Berbasis CRISP-ML(Q) (SI-REKTA)

> Penulis: Tim Proyek SI-REKTA  
> Mata Kuliah: Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
> Departemen: Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas  
> Dosen Pengampu: Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
> Repositori Proyek: https://github.com/accfd/SI-REKTA  
> Standar Metodologi: CRISP-ML(Q) (Cross-Industry Standard Process for the Development of Machine Learning Applications with Quality Assurance)  
> Landasan Teoretis: Systematic Literature Review (SLR) SI-REKTA 2022–2026 & Laporan Exploratory Data Analysis (EDA) Gabungan

# BAGIAN 1: PENGANTAR KONSEPTUAL NLP (NATURAL LANGUAGE PROCESSING)

## 1.1 Apa Itu NLP (Natural Language Processing)?
Natural Language Processing (NLP atau Pemrosesan Bahasa Alami) adalah cabang dari kecerdasan buatan (Artificial Intelligence / AI) dan pembelajaran mesin (Machine Learning) yang memungkinkan komputer untuk membaca, memahami, menginterpretasikan, dan merespons bahasa manusia, baik dalam bentuk teks maupun suara.

Tujuan utama NLP adalah menjembatani komunikasi antara manusia dan mesin agar komputer dapat mengerti konteks, maksud, serta struktur bahasa alami yang digunakan sehari-hari tanpa harus diubah menjadi kode perintah kaku.

## 1.2 Komponen dan Teknik Utama dalam NLP
Dalam praktik sains data dan rekayasa teks, terdapat beberapa komponen serta teknik mendasar NLP:
1. **Pembersihan Teks (Text Cleansing):** Menghilangkan karakter khusus, angka, tanda baca, dan tautan URL yang tidak memberikan nilai semantik terhadap konteks topik.
2. **Penyeragaman Huruf (Case Folding):** Mengubah seluruh huruf menjadi huruf kecil (lowercase) agar kata seperti "Sistem", "sistem", dan "SISTEM" dianggap sebagai entitas yang sama.
3. **Tokenisasi (Tokenization):** Memecah rangkaian kalimat panjang menjadi unit-unit kata atau sub-kata yang lebih kecil (token).
4. **Pembersihan Kata Henti (Stopword Removal):** Menyaring kata-kata fungsional umum (seperti "dan", "yang", "di", "ke") serta kata template formal yang tidak membedakan inti topik penelitian.
5. **Pemenggalan Kata Dasar (Stemming & Lemmatization):** Mengubah kata berimbuhan menjadi kata dasar aslinya. Stemming memotong imbuhan berdasarkan aturan pola kata (contoh: "pengembangan" menjadi "kembang"), sedangkan lemmatization memanfaatkan kamus kosakata baku untuk mencari bentuk lema kata.
6. **Rangkaian Kata Bergandengan (N-Gram):** Membaca potongan kata bergandengan (misalnya Unigram = 1 kata, Bigram = 2 kata) agar makna frasa penting seperti "machine learning" atau "sistem informasi" tidak terpecah menjadi kata terpisah yang maknanya berbeda.
7. **Vektorisasi TF-IDF (Term Frequency - Inverse Document Frequency):** Mengubah teks kalimat menjadi vektor angka berbobot statistik. Kata yang sering muncul di semua dokumen diberi bobot kecil, sedangkan kata khusus yang menjadi ciri khas topik tertentu diberi bobot tinggi.
8. **Pengukuran Kemiripan Kosinus (Cosine Similarity):** Menghitung nilai kedekatan sudut arah antara dua vektor teks untuk melihat persentase kemiripan maknanya (skala 0% hingga 100%).
9. **Penandaan Kelas Kata (Part of Speech / POS Tagging):** Mengidentifikasi fungsi gramatikal kata (kata benda, kata kerja, kata sifat) dalam struktur kalimat.
10. **Pengenalan Entitas Bernama (Named Entity Recognition / NER):** Mendeteksi entitas khusus seperti nama orang, nama organisasi, lokasi, atau istilah keilmuan tertentu di dalam korpus teks.

## 1.3 Relevansi NLP pada Proyek SI-REKTA
Pada sistem SI-REKTA, teknik NLP memegang peranan krusial karena data input berupa teks judul usulan skripsi mahasiswa (rata-rata 16,6 kata) dan judul publikasi riset dosen (rata-rata 13,7 kata). Keduanya tergolong teks pendek (short-text) dwibahasa yang memuat istilah komputasi bahasa Inggris dan bahasa Indonesia. Berdasarkan temuan Systematic Literature Review terbaru (Sajid et al., 2026; Saraswati et al., 2025; Luo et al., 2022), penerapan pembersihan teks yang cermat dan ekstraksi fitur TF-IDF n-gram terbukti paling tangguh mengidentifikasi keselarasan topik tanpa merusak istilah teknis asing.

# BAGIAN 2: KERANGKA KERJA METODOLOGI CRISP-ML(Q)

## 2.1 Mengapa Memilih CRISP-ML(Q)?
Pengembangan sistem rekomendasi pembimbing tugas akhir pada lingkungan perguruan tinggi memerlukan standar jaminan mutu (Quality Assurance) yang lebih ketat daripada proyek sains data biasa. Metodologi konvensional (seperti CRISP-DM standar) umumnya berhenti ketika model telah selesai dilatih di notebook, tanpa mengatur bagaimana model dikemas, dideploy, diuji keadilannya, dan dipantau kinerjanya saat operasional nyata.

SI-REKTA mengadopsi kerangka kerja CRISP-ML(Q) (Cross-Industry Standard Process for the Development of Machine Learning Applications with Quality Assurance, Studer et al., 2020) karena menyediakan enam tahapan siklus hidup ML terintegrasi:

1. **Business and Data Understanding:** Memahami tujuan proses akademik kampus dan karakteristik data riwayat skripsi serta publikasi dosen.
2. **Data Engineering / Data Preparation:** Menyiapkan data ganda, menyeragamkan entitas nama dosen, dan membangun pipeline NLP.
3. **Machine Learning Model Engineering:** Melatih algoritma klasifikasi dan pemeringkatan berbasis Dynamic Late-Fusion.
4. **ML Model Evaluation & Quality Assurance (QA):** Menguji model menggunakan tolok ukur metrik baku PRISMA (Top-3 Accuracy, MRR, dan Macro-F1).
5. **Model Deployment:** Mengemas model menjadi pipeline mandiri dan mengintegrasikannya ke arsitektur web REST API FastAPI.
6. **Monitoring and Maintenance:** Memantau kinerja rekomendasi di lingkungan kampus dan memperbarui model secara berkala.

# FASE 1: BUSINESS AND DATA UNDERSTANDING

## 1.1 Pemahaman Kebutuhan Organisasi & Perumusan Masalah
Pada Departemen Sistem Informasi (DSI) FTI Universitas Andalas, proses penentuan dosen pembimbing tugas akhir menghadapi tiga kendala utama:
1. **Ketidaksesuaian Topik (Topic Mismatch):** Mahasiswa kerap mengajukan usulan proposal yang tidak selaras dengan peta jalan riset dosen, memicu revisi berulang atau penolakan judul.
2. **Ketimpangan Beban Bimbingan (Workload Imbalance):** Penentuan pembimbing manual memicu penumpukan antrean pada dosen senior tertentu (hingga 149 mahasiswa), sedangkan dosen lain minim bimbingan.
3. **Kendala Dosen Baru (Zero-History Cold-Start):** Dosen baru yang belum pernah membimbing (riwayat bimbingan = 0) tidak akan pernah dikenali oleh model pembelajaran mesin biasa jika hanya dilatih dari data riwayat masa lalu.

## 1.2 Struktur Resmi Organisasi: 17 Dosen Tetap Aktif & 4 Kelompok Keahlian (KK)
Sesuai Pedoman Topik Tugas Akhir DSI 2025, ruang rekomendasi dibatasi secara ketat hanya pada 17 Dosen Tetap Aktif yang terbagi ke dalam 4 Kelompok Keahlian (KK) resmi:
1. **KK Rekayasa Data & Business Intelligence (RD-BI):**  
   Prof. Surya Afnarius, Ph.D.; Febby Apri Wenando, M.Eng., Ph.D.; Rahmatika Pratama Santi, M.T.; Aina Hubby Aziira, M.Eng.
2. **KK System Development (SD):**  
   Nisa Dwi Angresti, M.Kom.; Husnil Kamil, M.T.; Afriyanti Dwi Kartika, S.Pd., M.T.; Dwi Welly Sukma Nirad, M.T.; Hafzatin Nurlatifa, M.Eng.
3. **KK System Enterprise (SE):**  
   Hafizah Hanim, M.Kom.; Haris Suryamen, M.Sc.; Ricky Akbar, M.Kom.; Jefril Rahmadoni, M.Kom.; Ullya Mega Wahyuni, M.Kom.
4. **KK Tata Kelola & Infrastruktur TI (TK-ITI):**  
   Adi Arga Arifnur, M.Kom.; Fajril Akbar, M.Sc.; Hasdi Putra, M.T.

## 1.3 Karakteristik Dual-Source Dataset (Hasil Audit EDA)
Berdasarkan Laporan Exploratory Data Analysis (EDA) Gabungan dan temuan SLR terbaru:
1. **Dataset 1 (Judul_TA.csv):** Memuat 625 riwayat judul bimbingan masa lalu. Rata-rata panjang judul 16,6 kata. Mengalami ketimpangan kelas ekstrem di mana 5 dari 17 dosen tetap aktif (29,4%) memiliki riwayat bimbingan nol (N = 0).
2. **Dataset 2 (Publikasi_Dosen.csv):** Memuat 643 judul artikel ilmiah terverifikasi yang mencakup 100% dari 17 dosen aktif (7 hingga 32 paper per dosen). Rata-rata panjang judul 13,7 kata.
3. **Ekspansi Kosakata Gabungan:** Penyatuan kedua dataset memperluas kosakata unik dari 1.691 kata menjadi 3.470 kata (+105,2%), dengan irisan leksikal Jaccard sebesar 19,57%.

## 1.4 Kriteria Keberhasilan & Key Performance Indicators (KPI)
* **Kualitas Peringkat Rekomendasi:** Top-3 Accuracy (Hit@3) minimal 80% (0,80).
* **Kualitas Urutan Peringkat:** Mean Reciprocal Rank (MRR @ 3) minimal 0,60.
* **Keadilan Antar Dosen:** Macro-Averaged F1-Score minimal 70% (0,70) pada kelas bimbingan aktif.
* **Kecepatan Respons Inferensi:** Waktu inferensi rekomendasi di bawah 0,5 detik per kueri.
* **Transparansi Sistem:** Menampilkan kata kunci penentu keselarasan dan bukti artikel publikasi asli dosen.

# FASE 2: DATA ENGINEERING / DATA PREPARATION

## 2.1 Penyeragaman Entitas Nama Dosen (Entity Canonicalization)
Membangun kamus pemetaan resmi (alias dictionary) guna menormalisasi seluruh variasi ejaan nama, spasi, singkatan, dan penulisan gelar dosen dari kedua dataset ke satu format baku resmi. Langkah ini mencegah komputer menganggap variasi penulisan nama sebagai orang yang berbeda.

## 2.2 Penyaringan Berbasis Keaktifan Departemen (Active Faculty Filtering)
Membatasi target rekomendasi akhir secara ketat hanya pada 17 Dosen Tetap Aktif DSI Unand. Dosen luar departemen yang pernah membimbing di masa lalu serta dosen yang sedang tugas belajar/cuti dikeluarkan dari daftar target rekomendasi demi menjamin kepatuhan administratif.

## 2.3 Pemetaan Dokumen ke 4 Kelompok Keahlian (KK)
Setiap judul tugas akhir dan publikasi dosen dipetakan secara terstruktur ke salah satu dari 4 Kelompok Keahlian (KK) resmi. Pemetaan ini membentuk profil kosakata representatif bagi masing-masing KK sebagai dasar inferensi hierarkis Tingkat 1.

## 2.4 Pipeline NLP Prapengolahan Teks Bertahap
Berdasarkan sintesis temuan SLR (Sajid et al., 2026; Saraswati et al., 2025; Falah & Suryawan, 2022):
1. **Case Folding:** Mengubah seluruh karakter huruf menjadi huruf kecil.
2. **Text Cleansing:** Menghapus tanda baca, angka, simbol matematika, dan spasi ganda.
3. **Academic Stopwords Removal:** Membuang kata-kata formal template skripsi yang tidak membedakan bidang keilmuan (seperti "rancang", "bangun", "aplikasi", "sistem", "informasi", "berbasis", "web", "mobile", "studi", "kasus", "padang", "andalas").
4. **Penanganan Istilah Asing:** Menghindari pemenggalan kata dasar agresif (stemming kasar) pada istilah teknologi informasi baku agar kosakata serapan (seperti "business intelligence", "deep learning", "enterprise architecture") tidak mengalami kerusakan leksikal.

## 2.5 Ekstraksi Fitur Teks (TF-IDF N-Gram Hibrida)
Menerapkan kombinasi pembobotan kata bergandengan:
* **Word N-Gram (1–2 gram):** Menangkap keutuhan frasa teknis dua kata.
* **Character N-Gram (3–5 gram):** Memberikan ketahanan terhadap variasi singkatan atau kesalahan pengetikan (typo) mahasiswa.
* **Sublinear TF Scaling:** Menggunakan penskalaan logaritmik frekuensi kata guna meredam dominasi istilah yang muncul berulang kali.

# FASE 3: MACHINE LEARNING MODEL ENGINEERING

## 3.1 Penolakan Sintetis SMOTE Naif
Mengacu pada telaah literatur temu kembali teks (Xiao et al., 2023), penambahan data sintetis sembarangan (SMOTE konvensional) pada teks pendek berisiko menghasilkan kombinasi kata yang menyimpang ke kelas mayoritas dan memicu kenaikan false positive. Oleh karena itu, penanganan ketimpangan kelas diselesaikan melalui pendekatan pembobotan matematis pada algoritma.

## 3.2 Pemilihan Model Klasifikasi & Baseline
1. **Model Baseline:** Multinomial Naive Bayes teroptimasi parameter Laplace smoothing (Sinaga & Kurniawan, 2025).
2. **Model Utama:** Linear Support Vector Machine (Linear SVM) dengan kalibrasi probabilitas (CalibratedClassifierCV) dan penyesuaian bobot kelas seimbang (class_weight='balanced').

## 3.3 Mekanisme Pembobotan Kelas Seimbang (Balanced Class Weighting)
Linear SVM menghitung bobot sanksi kesalahan secara berbanding terbalik dengan frekuensi data kelas dosen:

Bobot Kelas = Total Data / (Jumlah Dosen × Jumlah Data Dosen Tersebut)

Melalui pembobotan ini, kesalahan sistem saat memprediksi dosen minoritas diberi penalti matematis jauh lebih berat daripada dosen senior mayoritas.

## 3.4 Arsitektur Rekomendasi Dua Tingkat & Dynamic Late-Fusion
Sistem bekerja melalui dua langkah terstruktur:
* **Tingkat 1 (Klasifikasi Kelompok Keahlian / KK):** Memprediksi probabilitas usulan judul mahasiswa ke dalam 4 Kelompok Keahlian resmi (RD-BI, SD, SE, TK-ITI) guna mempersempit ruang pencarian dan mencegah rekomendasi salah sasaran lintas rumpun ilmu (Xiao et al., 2023; Damayanti et al., 2025).
* **Tingkat 2 (Pemeringkatan Dosen Berbasis Dynamic Late-Fusion):** Menghitung skor akhir kecocokan setiap dosen aktif menggunakan rumus kombinasi linier berbobot proporsional (Bruch et al., 2022; Fitri et al., 2025; Nguyen et al., 2025):

Skor Akhir Rekomendasi = (Bobot Riset × Nilai Kemiripan Publikasi) + (Bobot Riwayat × Probabilitas Riwayat Skripsi)

Porsi bobot diatur secara dinamis:
1. **Bagi Dosen Baru (Riwayat Bimbingan = 0):** Bobot riset otomatis bernilai 100% (Bobot = 1,0). Skor dosen baru dihitung murni dari kemiripan semantik kosinus antara usulan mahasiswa dan karya publikasi riset dosen.
2. **Bagi Dosen Berpengalaman (Riwayat Bimbingan > 0):** Bobot dibagi seimbang (35% sampai 50% untuk publikasi riset terkini, dan sisanya untuk rekam jejak bimbingan masa lalu).

# FASE 4: ML MODEL EVALUATION & QUALITY ASSURANCE (QA)

## 4.1 Protokol Validasi Ilmiah
* **Stratified 5-Fold Cross Validation:** Membagi data menjadi 5 lipatan seimbang untuk menguji kestabilan performa model di setiap partisi.
* **Hold-Out Test Evaluation (80:20):** Pengujian akhir pada data uji independen (20%) yang belum pernah dilihat model saat proses pelatihan.

## 4.2 Matriks Pengujian Jaminan Kualitas (QA Gates) Berbasis Temuan SLR
Sesuai sintesis literatur empiris (Sun et al., 2022; Sajid et al., 2026; Xiao et al., 2023), ditetapkan 4 gerbang jaminan mutu (QA Gates):

| No | Metrik Jaminan Kualitas (QA Gate) | Standar Nilai Minimal Kelayakan | Rasional Metodologis Ilmiah |
|:--:|:---|:---:|:---|
| **1** | **Top-3 Accuracy (Hit Rate @ 3)** | **>= 80% (0,80)** | Memastikan dosen yang tepat berada dalam daftar 3 besar kartu rekomendasi yang disajikan kepada mahasiswa. |
| **2** | **Mean Reciprocal Rank (MRR @ 3)** | **>= 0,60** | Mengukur ketepatan urutan peringkat (posisi 1 bernilai 1,0; posisi 2 bernilai 0,5; posisi 3 bernilai 0,33). |
| **3** | **Top-1 Accuracy** | **> 50%** | Memastikan ketepatan peringkat pertama mutlak melampaui jauh batas tebakan acak (baseline acak = 5,88%). |
| **4** | **Macro-Averaged F1-Score** | **>= 70% (0,70)** | Menilai keadilan deteksi secara merata di seluruh kelas dosen tanpa terdistorsi oleh tingginya data dosen senior. |

# FASE 5: MODEL DEPLOYMENT

## 5.1 Serialisasi Pipeline Terpadu (si_rekta_pipeline.joblib)
Seluruh rantai komponen prapengolahan NLP, vektorizer TF-IDF n-gram, model SVM terkalibrasi, metadata 17 dosen tetap aktif, matriks publikasi riset, dan profil 4 Kelompok Keahlian dikemas ke dalam satu berkas biner mandiri (.joblib) berukuran ringkas di bawah 2 MB.

## 5.2 Arsitektur Sistem Informasi Web Tiga Tingkat (Three-Tier Architecture)
Berdasarkan rujukan arsitektur web modern (Wang et al., 2024; Damayanti et al., 2025; de Campos et al., 2024a), sistem dibagi menjadi tiga tingkatan:
1. **Presentation Layer (Frontend Web):** Antarmuka pengguna interaktif (React / Streamlit) yang menyediakan formulir input usulan draf skripsi dan menampilkan visualisasi kartu rekomendasi Top-3 dosen pembimbing.
2. **Application & Service Layer (Backend REST API):** Layanan API berbasis kerangka kerja performa tinggi FastAPI (Python) yang memuat model secara in-memory di RAM server dan melayani rute inferensi (/predict, /dosen, /explain) dengan waktu respons di bawah 0,5 detik.
3. **Data Layer (Penyimpanan Relasional):** Basis data relasional untuk mencatat rekam jejak usulan mahasiswa, data keaktifan dosen, dan log evaluasi sistem.

## 5.3 Implementasi Explainable UI (XAI)
Setiap kartu rekomendasi yang disajikan pada layar antarmuka pengguna dilengkapi dengan 3 komponen bukti transparan (de Campos et al., 2024b):
1. Persentase skor keselarasan topik usulan terhadap dosen.
2. Daftar 3 hingga 5 kata kunci teknis penentu kecocokan (Topic Keywords Justification).
3. Rujukan 2 hingga 3 judul artikel publikasi asli dosen yang paling relevan dengan ide skripsi mahasiswa (Empirical Publication Evidence).

# FASE 6: MONITORING AND MAINTENANCE

## 6.1 Mekanisme Umpan Balik Pengguna (Feedback Loop)
Aplikasi menyediakan tombol konfirmasi hasil bagi mahasiswa dan tim komisi tugas akhir untuk mencatat apakah rekomendasi sistem disetujui, dipertimbangkan, atau diubah. Rekam jejak ini tersimpan sebagai data audit operasional berkelanjutan.

## 6.2 Mitigasi Perubahan Data & Penurunan Kualitas (Concept Drift)
Seiring waktu, tren topik skripsi mahasiswa dan keahlian riset dosen akan terus berkembang. Sistem memantau potensi pergeseran pola kata (data drift) dan degradasi akurasi rekomendasi.

## 6.3 Pemicu Pelatihan Ulang (Retraining Triggers)
Model dijadwalkan untuk dilatih ulang (retraining) secara otomatis pada setiap akhir semester akademik dengan:
1. Memasukkan arsip judul tugas akhir mahasiswa yang baru lulus ke dalam Dataset 1.
2. Memperbarui daftar artikel ilmiah dosen terbaru dari profil Google Scholar/Sinta ke dalam Dataset 2.
3. Memperbarui status keaktifan dosen pada whitelist resmi Departemen Sistem Informasi Universitas Andalas.
