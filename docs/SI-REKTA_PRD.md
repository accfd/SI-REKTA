# PROJECT PRD
## Product Requirements Document: SI-REKTA

Project Name: SI-REKTA (Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir Dwisumber)  
Team: Tim Proyek SI-REKTA  
Course: Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
Institution: Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas  
Dosen Pengampu: Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
Version: 1.0  
Date: 28 Oktober 2026  

# Tujuan Dokumen
Dokumen Product Requirements Document (PRD) ini disusun untuk menjelaskan secara lugas apa yang akan dibangun, siapa target penggunanya, mengapa sistem ini sangat dibutuhkan, dan apa saja kebutuhan fungsional serta kualitas yang harus dipenuhi oleh SI-REKTA. Dokumen ini berfokus pada kebutuhan produk dan alur kerja pengguna tanpa membahas detail kode pemrograman.

# 1. Problem & Users

## 1.1 Problem Statement
Proses penentuan dosen pembimbing tugas akhir di Departemen Sistem Informasi FTI Unand masih sering mengalami ketidaksesuaian topik (topic mismatch), penumpukan bimbingan pada segelintir dosen senior, serta ketidakmampuan sistem konvensional dalam merekomendasikan 5 dosen tetap aktif yang belum memiliki riwayat bimbingan sebagai Pembimbing 1 (cold-start problem).

## 1.2 Target Users
Target pengguna utama sistem SI-REKTA mencakup:
1. **Mahasiswa Tingkat Akhir DSI Unand:** Mahasiswa yang sedang menyusun draf proposal tugas akhir dan membutuhkan panduan objektif mengenai dosen pembimbing yang paling sesuai dengan topik risetnya untuk pengisian Formulir TA-01 dan TA-02.
2. **Koordinator Tugas Akhir & Komisi TA:** Tim dosen pengelola yang bertugas memverifikasi keselarasan topik proposal mahasiswa secara objektif dan meratakan alokasi bimbingan sebelum menerbitkan Surat Tugas Pembimbing resmi (Formulir TA-04).
3. **Ketua Departemen Sistem Informasi:** Pengambil keputusan tingkat jurusan yang memerlukan visibilitas beban bimbingan dan kepatuhan distribusi topik riset di lingkungan 4 Kelompok Keahlian (KK).

## 1.3 User Needs / Pain Points
1. **Kebingungan Mahasiswa Menentukan Pembimbing:** Mahasiswa kesulitan mengetahui fokus riset terbaru dosen secara akurat, sehingga sering salah sasaran mengajukan topik.
2. **Tingginya Risiko Penolakan Judul:** Proposal tugas akhir mahasiswa sering ditolak saat verifikasi karena tidak selaras dengan peta jalan riset laboratorium departemen.
3. **Ketimpangan Beban Bimbingan Ekstrem:** Terjadi penumpukan beban bimbingan pada dosen-dosen senior (hingga 149 judul), sementara dosen aktif lainnya minim bimbingan.
4. **Dosen Tanpa Riwayat Pembimbing 1 "Tidak Terlihat" oleh Sistem:** Dosen tetap aktif yang belum pernah menjabat sebagai Pembimbing 1 (0 riwayat bimbingan P1 di arsip skripsi) tidak pernah disarankan ke mahasiswa jika hanya menggunakan model berbasis riwayat masa lalu, padahal mereka memiliki rekam jejak publikasi ilmiah yang aktif dan kompeten.
5. **Kurangnya Transparansi Alasan Penugasan:** Penentuan pembimbing sebelumnya tidak disertai bukti keterkaitan topik yang jelas (efek kotak hitam / black-box).

## 1.4 Project Goal
Membangun sistem informasi rekomendasi pembimbing tugas akhir cerdas yang mampu memetakan draf judul mahasiswa ke Kelompok Keahlian yang tepat dan menyajikan rekomendasi Top-3 dosen pembimbing aktif secara adil, cepat (di bawah 1 detik), serta transparan berbasis bukti karya ilmiah nyata (Explainable AI).

# 2. Product Requirements

## 2.1 Functional Requirements (Kebutuhan Fungsional)
Kebutuhan fungsional mendefinisikan apa saja kemampuan dan perilaku yang wajib dijalankan oleh sistem dari sudut pandang pengguna:

* **FR-01 (Input Usulan Judul & Rencana Riset):** Mahasiswa dapat memasukkan draf kalimat judul tugas akhir dan ringkasan rencana riset melalui formulir web yang mudah digunakan.
* **FR-02 (Pembersihan Teks Otomatis):** Sistem secara otomatis membersihkan tanda baca, menyeragamkan huruf kecil, dan menyaring kata-kata template formal skripsi (seperti "rancang bangun", "berbasis web").
* **FR-03 (Prediksi Kelompok Keahlian / KK):** Sistem dapat mengidentifikasi dan menampilkan 1 dari 4 Kelompok Keahlian resmi (RD-BI, SD, SE, TK-ITI) yang paling sesuai dengan topik mahasiswa (Klasifikasi Tingkat 1).
* **FR-04 (Penyajian Rekomendasi Top-3 Dosen):** Sistem menyajikan 3 kartu nama calon dosen pembimbing teratas yang paling relevan di dalam Kelompok Keahlian tersebut (Pemeringkatan Tingkat 2).
* **FR-05 (Fitur Transparansi / Explainable AI Card):** Setiap kartu rekomendasi dosen wajib menampilkan persentase kecocokan topik, daftar 3–5 kata kunci penentu keselarasan, serta 2–3 rujukan judul artikel publikasi asli karya dosen bersangkutan.
* **FR-06 (Penanganan Dosen Tanpa Riwayat P1 yang Adil):** Sistem secara otomatis menghitung skor kecocokan dosen yang belum memiliki riwayat bimbingan Pembimbing 1 secara murni 100% dari data publikasi karya ilmiahnya, sehingga mereka tetap berpeluang adil masuk rekomendasi Top-3.
* **FR-07 (Penyaringan Dosen Tetap Aktif / Whitelist):** Sistem membatasi ruang rekomendasi hanya pada 17 Dosen Tetap Aktif DSI Unand dan secara otomatis mengeluarkan dosen yang sedang cuti, tugas belajar, atau berasal dari luar departemen.
* **FR-08 (Ekspor / Cetak Rekomendasi Administratif):** Mahasiswa dan koordinator tugas akhir dapat mengunduh atau mencetak ringkasan hasil rekomendasi sebagai lampiran pendukung resmi pengisian Formulir TA-01 dan TA-02.

## 2.2 Non-Functional Requirements (Kebutuhan Kualitas & Batasan Sistem)
Kebutuhan non-fungsional mendefinisikan standar mutu, performa, dan batasan operasional sistem:

* **NFR-01 (Kecepatan Respons / Latensi):** Hasil rekomendasi Top-3 dan kartu penjelasannya wajib tampil di layar pengguna dalam waktu kurang dari 1 detik (target inferensi model di bawah 0,5 detik).
* **NFR-02 (Akurasi Peringkat Model):** Kinerja rekomendasi model wajib memenuhi standar kelayakan ilmiah SLR: Akurasi Top-3 (Hit@3) minimal 80%, skor urutan peringkat (MRR @ 3) minimal 0,60, dan keadilan distribusi (Macro-F1) minimal 70%.
* **NFR-03 (Ketersediaan & Aksesibilitas Web):** Antarmuka web dapat diakses dengan lancar melalui peramban web modern di perangkat laptop maupun ponsel pintar (mobile-friendly).
* **NFR-04 (Kemudahan Penggunaan / Usability):** Antarmuka dirancang bersih, intuitif, dan bebas dari istilah teknis rumit sehingga mudah dipahami oleh mahasiswa dan dosen.
* **NFR-05 (Keamanan & Integritas Data):** Sistem tidak mengubah basis data riwayat akademik dan hanya menggunakan koneksi aman (HTTPS) serta membatasi akses konfigurasi backend.
* **NFR-06 (Modularitas Arsitektur):** Logika model kecerdasan buatan terpisah secara independen dari tampilan antarmuka web melalui perantara REST API terstruktur.

## 2.3 Core Features (Fitur Utama Produk)

| No | Fitur Utama | Manfaat dan Nilai bagi Pengguna |
|:--:|:---|:---|
| 1 | **Smart Title Input & Preprocessing** | Mahasiswa cukup mengetik draf judul usulan; sistem otomatis memilah kata kunci penting tanpa terganggu kata umum formal skripsi. |
| 2 | **Two-Tier Hierarchical Inference** | Mencegah salah sasaran dengan terlebih dahulu memetakan topik ke Kelompok Keahlian (KK) yang tepat sebelum memilih nama dosen perorangan. |
| 3 | **Dual-Source Dynamic Late-Fusion** | Menghasilkan penilaian yang adil dan akurat dengan memadukan rekam jejak bimbingan masa lalu dan karya publikasi riset terkini dosen. |
| 4 | **Zero-History Cold-Start Resolver** | Memberikan kesempatan yang setara bagi 5 dosen tetap aktif yang belum pernah menjadi Pembimbing 1 untuk direkomendasikan berdasarkan kepakaran karya ilmiah aslinya. |
| 5 | **Explainable AI (XAI) Justification Cards** | Memberikan rasa percaya bagi mahasiswa dan pengelola tugas akhir karena rekomendasi disertai bukti kata kunci dan judul paper asli dosen. |
| 6 | **Administrative Summary Export** | Memudahkan integrasi proses bisnis kampus untuk pengisian Formulir TA-01 (Pengajuan Judul) dan TA-02 (Pendaftaran Judul). |

## 2.4 User Flow (Alur Perjalanan Pengguna)
Alur interaksi pengguna dari awal hingga tujuan tercapai:

1. **Akses Sistem:** Mahasiswa membuka laman web aplikasi SI-REKTA.
2. **Input Usulan Riset:** Mahasiswa memasukkan draf kalimat judul skripsi dan memilih bidang minat sementara.
3. **Proses Inferensi Cerdas (Sistem Otomatis):**  
   * Sistem membersihkan teks usulan melalui pipeline NLP (Case Folding, Cleansing, Academic Stopword Removal, N-Gram).
   * Tingkat 1: Sistem memprediksi Kelompok Keahlian resmi yang paling selaras (RD-BI, SD, SE, atau TK-ITI).
   * Tingkat 2: Sistem menghitung skor kecocokan dosen menggunakan formula Dynamic Late-Fusion (kombinasi bimbingan lampau dan publikasi riset).
4. **Penyajian Hasil (Tampilan XAI):** Mahasiswa melihat kartu hasil rekomendasi: nama Kelompok Keahlian terprediksi dan 3 kartu calon dosen pembimbing teratas lengkap dengan persentase kecocokan, kata kunci topik, dan bukti judul artikel dosen.
5. **Tindak Lanjut Administratif:** Mahasiswa menggunakan rekomendasi tersebut sebagai dasar diskusi pra-proposal bersama dosen untuk pengisian Formulir TA-01 atau TA-02 ke Departemen.

## 2.5 Data Requirements (Kebutuhan Data Utama)

| Entitas Data | Informasi Kunci | Alasan dan Kegunaan bagi Sistem |
| :--- | :--- | :--- |
| **Data Usulan Mahasiswa** | Teks judul skripsi, teks deskripsi rencana riset, timestamp pengajuan. | Menjadi teks kueri utama yang dianalisis oleh modul NLP untuk dicocokkan dengan kepakaran dosen. |
| **Data Riwayat Skripsi (Dataset 1)** | 625 judul skripsi masa lalu, nama dosen pembimbing, tahun bimbingan. | Menjadi korpus data latih untuk mengenali pola topik bimbingan skripsi mahasiswa di masa lampau. |
| **Data Publikasi Dosen (Dataset 2)** | 643 judul artikel ilmiah terverifikasi, nama dosen penulis, bidang keahlian. | Menjadi korpus data kepakaran riset aktual untuk menyelesaikan masalah dosen tanpa riwayat Pembimbing 1 (cold-start). |
| **Entitas 17 Dosen Tetap Aktif** | NIP, nama lengkap dan gelar baku, Kelompok Keahlian resmi, status aktif mengajar. | Menjadi daftar filter resmi (whitelist) agar rekomendasi tidak salah sasaran ke dosen luar atau dosen non-aktif. |
| **Data 4 Kelompok Keahlian (KK)** | Kode KK (RD-BI, SD, SE, TK-ITI), deskripsi fokus keahlian, daftar dosen anggota. | Menjadi acuan klasifikasi hierarkis Tingkat 1 untuk mengelompokkan bidang keilmuan secara terstruktur. |
| **Log Hasil Rekomendasi** | Rekam jejak usulan mahasiswa, Top-3 dosen terprediksi, konfirmasi persetujuan dosen. | Digunakan untuk evaluasi operasional berkala dan pelatihan ulang model (monitoring & retraining). |

## 2.6 Constraints & Assumptions (Batasan dan Asumsi)
* **Batasan Entitas:** Ruang rekomendasi dibatasi disiplin hanya untuk 17 Dosen Tetap Aktif Departemen Sistem Informasi FTI Unand sesuai rujukan dokumen resmi Dosen_Tetap_Aktif_DSI.md.
* **Batasan Sumber Data:** Korpus riset dosen bersumber dari judul artikel ilmiah yang terindeks resmi di Google Scholar dan Sinta.
* **Karakteristik Teks:** Sistem dioptimalkan untuk masukan kalimat pendek (short-text berkisar 10–30 kata) berbahasa Indonesia yang memuat istilah komputasi bahasa Inggris.
* **Asumsi Operasional:** Mahasiswa mengajukan judul tugas akhir yang berorientasi pada konteks organisasi nyata sesuai Pedoman Topik Tugas Akhir DSI 2025.
* **Batasan Infrastruktur:** Model machine learning dikemas dalam bentuk berkas serialisasi mandiri (.joblib) yang dimuat secara in-memory untuk menjamin kecepatan inferensi di bawah 0,5 detik.

## 2.7 Success Criteria (Kriteria Keberhasilan Produk)
1. **Penyelesaian Masalah Cold-Start 100%:** Seluruh dosen tetap aktif yang belum memiliki riwayat bimbingan Pembimbing 1 (5 dosen dengan 0 riwayat skripsi P1) berhasil memiliki profil kepakaran dan berpeluang direkomendasikan secara proporsional.
2. **Kualitas Peringkat Rekomendasi Teruji:** Sistem meraih Akurasi Top-3 (Hit@3) $\ge 80\%$ dan MRR $\ge 0,60$ pada data uji independen.
3. **Keadilan Distribusi Bimbingan Terjamin:** Model mencapai nilai Macro-Averaged F1-Score $\ge 70\%$ pada evaluasi kelas bimbingan aktif tanpa terdistorsi oleh tingginya data dosen senior.
4. **Kepuasan Pengguna Tinggi:** Kartu Explainable AI dinilai transparan, jelas, dan membantu mahasiswa serta komisi tugas akhir dalam pengisian Formulir TA-01 dan TA-02.
5. **Kecepatan Inferensi Optimal:** Sistem memberikan respon hasil rekomendasi secara stabil di bawah 1 detik per pencarian pada lingkungan web.

# 3. Scope (Ruang Lingkup Proyek)

## 3.1 In Scope (Termasuk dalam Pekerjaan Proyek)
* Analisis data eksploratif (EDA) terhadap dataset ganda (riwayat skripsi dan publikasi dosen).
* Pembangunan pipeline prapengolahan NLP bertahap (cleansing, case folding, academic stopwords, n-gram).
* Pengembangan model klasifikasi Kelompok Keahlian (Tingkat 1) dan Dynamic Late-Fusion perankingan dosen (Tingkat 2).
* Pengujian metrik performa ilmiah (Top-3 Accuracy, MRR, Macro-F1, Stratified 5-Fold Cross Validation).
* Serialisasi model mandiri ke format berkas `.joblib`.
* Perancangan arsitektur berorientasi layanan web (REST API backend FastAPI dan antarmuka web).
* Penyajian kartu penjelasan rekomendasi transparan berbasis Explainable AI (skor, kata kunci, dan bukti judul paper dosen).

## 3.2 Out of Scope (Tidak Termasuk dalam Pekerjaan Proyek)
* Sistem tidak mengambil alih kewenangan administratif formal Ketua Departemen dalam menerbitkan SK pembimbing (sistem hanya bertindak sebagai alat bantu rekomendasi).
* Sistem tidak mengelola bimbingan mingguan, presensi, logbook skripsi, atau pendaftaran sidang sarjana.
* Sistem tidak melakukan pemrosesan dokumen naskah proposal skripsi utuh ratusan halaman (sistem berfokus pada analisis teks judul dan ringkasan ide riset).
* Sistem tidak melayani rekomendasi untuk mahasiswa atau dosen di luar Departemen Sistem Informasi FTI Universitas Andalas.

# 4. AI Prompt Context
Bagian ini dapat dijadikan konteks instruksi ringkas saat meminta bantuan kecerdasan buatan untuk pengembangan teknis:

> SI-REKTA adalah sistem pendukung keputusan cerdas berbasis Machine Learning dan Natural Language Processing (NLP) untuk merekomendasikan Top-3 Dosen Pembimbing Tugas Akhir di Departemen Sistem Informasi FTI Universitas Andalas. Target pengguna utamanya adalah mahasiswa tingkat akhir (pengisian Form TA-01/TA-02) dan Komisi Tugas Akhir (verifikasi keselarasan proposal untuk Form TA-04). Masalah inti yang diselesaikan adalah ketidakcocokan topik, ketimpangan bimbingan, dan masalah dosen tanpa riwayat Pembimbing 1 (cold-start problem). Sistem menggunakan pendekatan Dual-Source Dataset (625 riwayat skripsi dan 643 publikasi riset dosen) yang diproses melalui dua tahap inferensi: Tingkat 1 memprediksi 4 Kelompok Keahlian resmi (RD-BI, SD, SE, TK-ITI), dan Tingkat 2 melakukan Dynamic Late-Fusion (menggabungkan kemiripan publikasi dan riwayat skripsi secara proporsional). Sistem dibatasi secara disiplin hanya untuk 17 Dosen Tetap Aktif DSI Unand. Kriteria keberhasilan mencakup Top-3 Accuracy minimal 80%, MRR minimal 0,60, Macro-F1 minimal 70%, latensi di bawah 0,5 detik, serta penyajian kartu Explainable AI yang memuat persentase kecocokan, kata kunci keselarasan topik, dan bukti judul artikel ilmiah asli dosen.

# PRD Checklist
* [x] Problem statement jelas dan berfokus pada kendala nyata pengguna di kampus.
* [x] Target users spesifik (mahasiswa tingkat akhir, koordinator TA, ketua departemen).
* [x] Project goal menjawab langsung masalah penentuan pembimbing dan cold-start.
* [x] Core features berjumlah 6 fitur inti yang relevan dan bernilai nyata.
* [x] User flow utama tertulis runtut dari input judul hingga tindak lanjut administratif.
* [x] Data utama teridentifikasi secara lengkap (Judul_TA, Publikasi_Dosen, 17 Dosen, 4 KK).
* [x] Constraints dan assumptions tercatat jelas mengacu pada regulasi DSI Unand 2025.
* [x] Success criteria memiliki tolok ukur kuantitatif baku (Hit@3 >= 80%, MRR >= 0,60, Macro-F1 >= 70%).
* [x] In Scope dan Out of Scope terdefinisi dengan batas yang tegas.
* [x] Functional requirements (FR-01 s.d. FR-08) menjelaskan perilaku fungsional yang dapat diuji.
* [x] Non-functional requirements (NFR-01 s.d. NFR-06) terukur dan realistis.
* [x] Functional requirements selaras dengan core features.
* [x] Non-functional requirements tidak ditulis sebagai fitur baru.
