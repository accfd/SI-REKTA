# Kerangka Kerja & Metodologi Pengembangan Model Machine Learning Berbasis CRISP-ML(Q) dan 12 Tahapan Proyek (SI-REKTA)

> Penulis: Tim Proyek SI-REKTA  
> Mata Kuliah: Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
> Departemen: Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas  
> Dosen Pengampu: Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
> Repositori Proyek: https://github.com/accfd/SI-REKTA  
> Standar Panduan: Panduan Resmi Project Machine Learning 2026 (12 Tahapan Pelaksanaan)  
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

# BAGIAN 2: PENYELARASAN 12 TAHAPAN PROYEK ML 2026 DENGAN CRISP-ML(Q)

Sesuai silabus resmi pada dokumen Project Machine Learning 2026, pengembangan proyek ini mencakup 12 tahapan terstruktur yang diselaraskan secara langsung ke dalam 6 fase siklus hidup CRISP-ML(Q) (Studer et al., 2020):

| No | 12 Tahapan Resmi Proyek ML 2026 | Fase CRISP-ML(Q) Terkait | Fokus Implementasi pada SI-REKTA |
|:--:|:---|:---|:---|
| 1 | **Problem Identification** | Fase 1: Business and Data Understanding | Identifikasi kendala pemilihan pembimbing, ketimpangan bimbingan, dan masalah dosen baru (cold-start). |
| 2 | **System Requirements Analysis** | Fase 1: Business and Data Understanding | Analisis kebutuhan pengguna (mahasiswa & prodi), batasan 17 dosen aktif, 4 KK, dan penetapan KPI kelayakan. |
| 3 | **Data Analysis** | Fase 1: Business and Data Understanding | Audit kualitas data riwayat skripsi (Judul_TA.csv) dan publikasi riset dosen (Publikasi_Dosen.csv) via EDA. |
| 4 | **Data Preprocessing** | Fase 2: Data Engineering / Preparation | Normalisasi teks, pembersihan tanda baca, case folding, stopword removal akademik, dan penanganan istilah asing. |
| 5 | **Data Processing Procedures** | Fase 2: Data Engineering / Preparation | Standarisasi ejaan nama dosen (entity canonicalization), pembagian stratified train-test split, dan TF-IDF N-gram. |
| 6 | **Machine Learning Algorithm Selection** | Fase 3: Machine Learning Model Engineering | Seleksi model pembanding Naive Bayes dan model utama Linear SVM dengan pembobotan kelas seimbang. |
| 7 | **Model Development** | Fase 3: Machine Learning Model Engineering | Pelatihan model klasifikasi KK, kalibrasi probabilitas Platt Scaling, dan perumusan formula Dynamic Late-Fusion. |
| 8 | **Model Evaluation** | Fase 4: ML Model Evaluation & QA | Pengujian performa metrik Top-3 Accuracy, MRR @ 3, Macro-F1, dan validasi silang Stratified 5-Fold CV. |
| 9 | **Model Storage** | Fase 5: Model Deployment | Serialisasi model, vectorizer, dan profil metadata 17 dosen ke satu berkas biner mandiri (si_rekta_pipeline.joblib). |
| 10 | **Information System Design** | Fase 5: Model Deployment | Perancangan arsitektur perangkat lunak berbasis layanan web tiga tingkat (Three-Tier Architecture). |
| 11 | **Model Integration into the System** | Fase 5: Model Deployment | Integrasi pipeline model ke dalam backend REST API FastAPI (Python) dengan waktu respons inferensi sub-detik. |
| 12 | **User Interface Implementation** | Fase 5: Model Deployment | Pembangunan antarmuka web interaktif yang menyajikan kartu rekomendasi Top-3 lengkap dengan fitur Explainable AI. |
| * | *Continuous Assurance* | Fase 6: Monitoring and Maintenance | Pemantauan umpan balik pengguna kampus, pencegahan data drift, dan jadwal pelatihan ulang berkala tiap semester. |

# FASE 1: BUSINESS AND DATA UNDERSTANDING

## Tahap 1: Problem Identification (Identifikasi Masalah)
Pada Departemen Sistem Informasi (DSI) FTI Universitas Andalas, proses penentuan dosen pembimbing tugas akhir menghadapi tiga kendala nyata:
1. **Ketidaksesuaian Topik (Topic Mismatch):** Mahasiswa kerap mengajukan usulan proposal yang tidak selaras dengan keahlian dosen, memicu revisi berulang atau penolakan judul.
2. **Ketimpangan Beban Bimbingan (Workload Imbalance):** Penentuan pembimbing konvensional memicu penumpukan antrean pada dosen senior tertentu (hingga 149 mahasiswa), sedangkan dosen lain minim bimbingan.
3. **Kendala Dosen Baru (Zero-History Cold-Start):** Dosen baru yang belum pernah membimbing (riwayat bimbingan = 0) tidak akan pernah dikenali oleh model pembelajaran mesin biasa jika hanya dilatih dari data riwayat masa lalu.

## Tahap 2: System Requirements Analysis (Analisis Kebutuhan Sistem)
Sesuai Pedoman Topik Tugas Akhir DSI 2025 dan kebutuhan operasional perguruan tinggi:
1. **Batasan Entitas Dosen:** Sistem wajib membatasi rekomendasi akhir hanya kepada 17 Dosen Tetap Aktif DSI Unand yang berhak membimbing.
2. **Struktur 4 Kelompok Keahlian (KK):** Rekomendasi diselaraskan dengan 4 rumpun keahlian resmi:
   * KK Rekayasa Data & Business Intelligence (RD-BI): Prof. Surya Afnarius, Ph.D.; Febby Apri Wenando, M.Eng., Ph.D.; Rahmatika Pratama Santi, M.T.; Aina Hubby Aziira, M.Eng.
   * KK System Development (SD): Nisa Dwi Angresti, M.Kom.; Husnil Kamil, M.T.; Afriyanti Dwi Kartika, S.Pd., M.T.; Dwi Welly Sukma Nirad, M.T.; Hafzatin Nurlatifa, M.Eng.
   * KK System Enterprise (SE): Hafizah Hanim, M.Kom.; Haris Suryamen, M.Sc.; Ricky Akbar, M.Kom.; Jefril Rahmadoni, M.Kom.; Ullya Mega Wahyuni, M.Kom.
   * KK Tata Kelola & Infrastruktur TI (TK-ITI): Adi Arga Arifnur, M.Kom.; Fajril Akbar, M.Sc.; Hasdi Putra, M.T.
3. **Kebutuhan Fungsional Pengguna:** Mahasiswa memasukkan draf usulan judul dan memperoleh 3 kartu rekomendasi dosen teratas lengkap dengan persentase kecocokan, kata kunci keselarasan topik, dan bukti judul artikel ilmiah dosen (Explainable AI).
4. **Kriteria Keberhasilan Kinerja (KPI):**
   * Top-3 Accuracy (Hit@3) minimal mencapai 80% (0,80).
   * Mean Reciprocal Rank (MRR @ 3) minimal mencapai 0,60.
   * Macro-Averaged F1-Score minimal mencapai 70% (0,70) pada kelas bimbingan aktif.
   * Waktu inferensi rekomendasi di bawah 0,5 detik per kueri.

## Tahap 3: Data Analysis (Analisis Data Eksploratif / EDA)
Berdasarkan Laporan Exploratory Data Analysis (EDA) Gabungan pada dokumen EDA_Dual_Dataset.md:
1. **Dataset 1 (Judul_TA.csv):** Memuat 625 riwayat judul bimbingan masa lalu. Rata-rata panjang judul 16,6 kata. Sebanyak 5 dari 17 dosen tetap aktif (29,4%) memiliki data bimbingan nol (N = 0).
2. **Dataset 2 (Publikasi_Dosen.csv):** Memuat 643 judul artikel ilmiah terverifikasi dari Google Scholar/Sinta yang mencakup 100% dari 17 dosen aktif (7 hingga 32 paper per dosen). Rata-rata panjang judul 13,7 kata.
3. **Penyatuan Kosakata Semantik:** Penyatuan kedua dataset memperluas kosakata unik dari 1.691 kata menjadi 3.470 kata unik (+105,2%), dengan irisan leksikal Jaccard sebesar 19,57%. Publikasi riset dosen terbukti berhasil menutup kekosongan data dosen baru.

# FASE 2: DATA ENGINEERING / DATA PREPARATION

## Tahap 4: Data Preprocessing (Prapengolahan Teks NLP)
Berdasarkan sintesis temuan SLR (Sajid et al., 2026; Saraswati et al., 2025; Falah & Suryawan, 2022), teks judul diproses melalui tahapan bertingkat:
1. **Case Folding:** Mengubah seluruh karakter huruf menjadi huruf kecil.
2. **Text Cleansing:** Menghapus tanda baca, angka, simbol matematika, dan spasi ganda.
3. **Academic Stopwords Removal:** Menyaring kata-kata formal template skripsi yang tidak membedakan bidang keilmuan (seperti "rancang", "bangun", "aplikasi", "sistem", "informasi", "berbasis", "web", "mobile", "studi", "kasus", "padang", "andalas").
4. **Penanganan Istilah Asing:** Menghindari pemenggalan kata dasar kasar (stemming agresif) pada istilah teknologi informasi agar kosakata serapan baku (seperti "business intelligence", "deep learning", "enterprise architecture") tidak rusak maknanya.

## Tahap 5: Data Processing Procedures (Prosedur Pengolahan Data)
1. **Standarisasi Entitas Nama Dosen (Entity Canonicalization):** Membangun kamus pemetaan resmi guna menormalisasi seluruh variasi ejaan nama, spasi, singkatan, dan penulisan gelar dosen dari kedua dataset ke satu format baku resmi.
2. **Penyaringan Berbasis Keaktifan Departemen (Active Faculty Whitelist):** Menyaring keluar dosen luar departemen dan dosen yang sedang cuti/tugas belajar dari target rekomendasi.
3. **Ekstraksi Fitur Leksikal (TF-IDF N-Gram):** Menerapkan kombinasi pembobotan Word N-Gram (1–2 gram) untuk menangkap keutuhan frasa teknis dua kata, Character N-Gram (3–5 gram) untuk ketahanan terhadap salah ketik (typo), serta Sublinear TF Scaling.
4. **Pembagian Data Uji:** Menerapkan pembagian Stratified Train-Test Split (proporsi 80:20) guna mempertahankan rasio sebaran kelas dosen pada data latih dan data uji.

# FASE 3: MACHINE LEARNING MODEL ENGINEERING

## Tahap 6: Machine Learning Algorithm Selection (Pemilihan Algoritma)
1. **Model Baseline:** Multinomial Naive Bayes teroptimasi parameter Laplace smoothing (Sinaga & Kurniawan, 2025) sebagai pembanding awal berbobot ringan.
2. **Model Klasifikasi Utama:** Linear Support Vector Machine (Linear SVM) dengan kalibrasi probabilitas (CalibratedClassifierCV) dan penyesuaian bobot kelas seimbang (class_weight='balanced') guna mengatasi ketimpangan frekuensi bimbingan masa lalu.
3. **Mesin Kemiripan Semantik Konten:** Model Cosine Similarity berbasis representasi profil gabungan publikasi riset dosen (de Campos et al., 2024a; Damayanti et al., 2025).

## Tahap 7: Model Development (Pengembangan Model & Dynamic Late-Fusion)
Sistem dibangun menggunakan arsitektur inferensi bertingkat:
* **Tingkat 1 (Klasifikasi Kelompok Keahlian / KK):** Memprediksi probabilitas usulan judul mahasiswa ke dalam 4 Kelompok Keahlian resmi (RD-BI, SD, SE, TK-ITI) guna mempersempit ruang pencarian dan mencegah rekomendasi salah sasaran lintas rumpun ilmu (Xiao et al., 2023; Damayanti et al., 2025).
* **Tingkat 2 (Pemeringkatan Dosen Berbasis Dynamic Late-Fusion):** Menghitung skor akhir kecocokan setiap dosen aktif menggunakan rumus kombinasi linier berbobot proporsional (Bruch et al., 2022; Fitri et al., 2025; Nguyen et al., 2025):

Skor Akhir Rekomendasi = (Bobot Riset × Nilai Kemiripan Publikasi) + (Bobot Riwayat × Probabilitas Riwayat Skripsi)

Porsi bobot diatur secara dinamis:
1. **Bagi Dosen Baru (Riwayat Bimbingan = 0):** Bobot riset otomatis bernilai 100% (Bobot = 1,0). Skor dosen baru dihitung murni dari kemiripan semantik kosinus antara usulan mahasiswa dan karya publikasi riset dosen, sehingga masalah cold-start teratasi secara adil.
2. **Bagi Dosen Berpengalaman (Riwayat Bimbingan > 0):** Bobot dibagi seimbang (35% sampai 50% untuk publikasi riset terkini, dan sisanya untuk rekam jejak bimbingan masa lalu).

# FASE 4: ML MODEL EVALUATION & QUALITY ASSURANCE (QA)

## Tahap 8: Model Evaluation (Evaluasi Model & Penjaminan Mutu)
Evaluasi kinerja model dijalankan secara ketat mengacu pada tolok ukur sintesis 15 jurnal PRISMA:
1. **Skema Pengujian Ilmiah:** Menggunakan Stratified 5-Fold Cross Validation pada data latih dan evaluasi akhir pada 20% Hold-Out Test Dataset.
2. **Pencapaian 4 Gerbang Jaminan Mutu (QA Gates):**
   * **Top-3 Accuracy (Hit Rate @ 3) >= 80%:** Memastikan dosen pembimbing yang tepat berada dalam daftar 3 besar kartu rekomendasi yang disajikan sistem.
   * **Mean Reciprocal Rank (MRR @ 3) >= 0,60:** Memastikan dosen yang paling tepat berada di peringkat teratas (urutan pertama).
   * **Top-1 Accuracy > 50%:** Memastikan ketepatan tebakan pertama jauh melampaui peluang tebakan acak.
   * **Macro-Averaged F1-Score >= 70%:** Menilai keadilan deteksi secara merata di seluruh kelas dosen tanpa terdistorsi oleh tingginya data dosen senior.

# FASE 5: MODEL DEPLOYMENT

## Tahap 9: Model Storage (Penyimpanan & Serialisasi Model)
Seluruh rantai prapengolahan NLP, vektorizer TF-IDF n-gram, model SVM terkalibrasi, metadata 17 dosen tetap aktif, matriks publikasi riset, dan profil 4 Kelompok Keahlian dikemas ke dalam satu berkas biner mandiri (.joblib) berukuran ringkas di bawah 2 MB. Berkas ini dimuat secara in-memory di RAM server saat startup agar inferensi tidak terhambat pembacaan disk.

## Tahap 10: Information System Design (Perancangan Sistem Informasi Web)
Sistem dirancang menggunakan Arsitektur Berorientasi Layanan Tiga Tingkat (Three-Tier Architecture) (Wang et al., 2024; Damayanti et al., 2025):
1. **Presentation Layer (Frontend Web):** Antarmuka pengguna interaktif (React / Streamlit).
2. **Application & Service Layer (Backend REST API):** Layanan API berbasis framework performa tinggi FastAPI (Python) yang memuat model secara in-memory dan melayani endpoint /predict, /dosen, dan /explain.
3. **Data Layer (Penyimpanan Relasional):** Basis data relasional untuk mencatat rekam jejak pengajuan mahasiswa, data keaktifan dosen, dan log evaluasi sistem.

## Tahap 11: Model Integration into the System (Integrasi Model ke Layanan API)
Fungsi inferensi mandiri diintegrasikan ke rute REST API FastAPI. Ketika mahasiswa memasukkan draf usulan judul, sistem menjalankan seluruh alur pra-pemrosesan teks, inferensi klasifikasi KK, dan pemeringkatan Dynamic Late-Fusion secara terintegrasi dengan waktu eksekusi di bawah 0,5 detik.

## Tahap 12: User Interface Implementation (Implementasi Antarmuka & Explainable AI)
Antarmuka pengguna menampilkan 3 kartu saran dosen teratas yang dilengkapi fitur Explainable AI (de Campos et al., 2024b):
1. **Persentase Kecocokan Semantik:** Nilai kemiripan topik usulan terhadap kepakaran dosen.
2. **Kata Kunci Penentu Keselarasan (Topic Keywords Justification):** Menampilkan 3–5 frasa teknis berbobot tertinggi yang beririsan antara proposal mahasiswa dan profil riset dosen.
3. **Bukti Judul Penelitian Asli Dosen (Empirical Publication Evidence):** Menampilkan 2–3 rujukan judul artikel ilmiah asli karya dosen yang paling relevan dengan ide tugas akhir mahasiswa.

# FASE 6: MONITORING AND MAINTENANCE

## Pemantauan Berkelanjutan & Retraining
1. **Mekanisme Umpan Balik Pengguna (Feedback Loop):** Antarmuka sistem menyediakan tombol konfirmasi hasil bagi mahasiswa dan komisi tugas akhir untuk mencatat persetujuan atau perubahan dosen pembimbing sebagai data audit operasional.
2. **Mitigasi Concept Drift:** Memantau potensi pergeseran tren kata kunci teknologi informasi pada judul tugas akhir dari tahun ke tahun.
3. **Jadwal Pelatihan Ulang (Retraining Triggers):** Model diperbarui secara berkala pada setiap akhir semester akademik dengan menambahkan arsip judul skripsi mahasiswa yang baru lulus dan memperbarui rekam jejak publikasi ilmiah dosen.
