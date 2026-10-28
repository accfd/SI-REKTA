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

## 2.5 Data Requirements (Kebutuhan Data Utama & Skema Relasional 3NF)

Untuk menjamin sistem siap diimplementasikan ke dalam basis data relasional (RDBMS) seperti PostgreSQL atau MySQL secara tangguh, kebutuhan data dimodelkan ke dalam 6 entitas yang telah dinormalisasi hingga **Third Normal Form (3NF)**. Standar penamaan entitas dan atribut menggunakan konvensi `snake_case` yang baku, eksplisit, dan siap digunakan langsung untuk *Data Definition Language* (DDL).

### 2.5.1 Tabel Spesifikasi Entitas dan Atribut Relasional (Database-Ready 3NF)

| Nama Entitas (Tabel) | Kolom Atribut & Tipe Data | Constraint & Kunci | Deskripsi & Peran bagi Sistem |
| :--- | :--- | :--- | :--- |
| **`kelompok_keahlian`** | `id_kk` (VARCHAR(10))<br>`nama_kk` (VARCHAR(100))<br>`deskripsi_fokus` (TEXT) | **PK:** `id_kk`<br>**NOT NULL:** semua | Tabel master 4 Kelompok Keahlian resmi DSI Unand (RD-BI, SD, SE, TK-ITI) sebagai kelas target klasifikasi Tingkat 1. |
| **`dosen`** | `nip` (VARCHAR(18))<br>`nama_lengkap` (VARCHAR(150))<br>`gelar_depan` (VARCHAR(20))<br>`gelar_belakang` (VARCHAR(50))<br>`email` (VARCHAR(100))<br>`jabatan_akademik` (VARCHAR(100))<br>`id_kk` (VARCHAR(10))<br>`status_aktif` (ENUM('aktif','cuti','tugas_belajar'))<br>`is_eligible_p1` (BOOLEAN) | **PK:** `nip`<br>**FK:** `id_kk` $\rightarrow$ `kelompok_keahlian.id_kk`<br>**UNIQUE:** `email`<br>**NOT NULL:** `nip`, `nama_lengkap`, `gelar_belakang`, `id_kk`, `status_aktif`, `is_eligible_p1` | Tabel master 17 Dosen Tetap Aktif DSI Unand yang berfungsi sebagai filter resmi (*whitelist*). Memisahkan status dosen tanpa riwayat P1 secara atomik. |
| **`publikasi_dosen`** | `id_publikasi` (INT AUTO_INCREMENT)<br>`nip_dosen` (VARCHAR(18))<br>`judul_publikasi` (TEXT)<br>`tahun_terbit` (INT)<br>`nama_sumber_indeks` (VARCHAR(100))<br>`url_dokumen` (VARCHAR(255)) | **PK:** `id_publikasi`<br>**FK:** `nip_dosen` $\rightarrow$ `dosen.nip`<br>**NOT NULL:** `id_publikasi`, `nip_dosen`, `judul_publikasi`, `tahun_terbit` | Korpus Dataset 2 (643 artikel ilmiah terverifikasi) untuk menghitung kemiripan kosinus riset aktual dosen dan mengatasi masalah dosen tanpa riwayat P1 (*cold-start*). |
| **`riwayat_skripsi`** | `id_skripsi` (INT AUTO_INCREMENT)<br>`judul_skripsi` (TEXT)<br>`tahun_lulus` (INT)<br>`nip_pembimbing_1` (VARCHAR(18))<br>`id_kk` (VARCHAR(10)) | **PK:** `id_skripsi`<br>**FK 1:** `nip_pembimbing_1` $\rightarrow$ `dosen.nip`<br>**FK 2:** `id_kk` $\rightarrow$ `kelompok_keahlian.id_kk`<br>**NOT NULL:** `id_skripsi`, `judul_skripsi`, `tahun_lulus`, `nip_pembimbing_1`, `id_kk` | Korpus Dataset 1 (625 riwayat skripsi masa lalu) untuk melatih model probabilitas Pembimbing 1 (*prior likelihood*) dan pola topik bimbingan lampau. |
| **`pengajuan_rekomendasi`** | `id_pengajuan` (VARCHAR(36))<br>`nim_mahasiswa` (VARCHAR(15))<br>`nama_mahasiswa` (VARCHAR(100))<br>`judul_usulan` (TEXT)<br>`ringkasan_ide` (TEXT)<br>`id_kk_terprediksi` (VARCHAR(10))<br>`waktu_pengajuan` (TIMESTAMP) | **PK:** `id_pengajuan`<br>**FK:** `id_kk_terprediksi` $\rightarrow$ `kelompok_keahlian.id_kk`<br>**NOT NULL:** `id_pengajuan`, `nim_mahasiswa`, `nama_mahasiswa`, `judul_usulan`, `id_kk_terprediksi`, `waktu_pengajuan` | Sesi transaksi pencarian rekomendasi oleh mahasiswa untuk keperluan draf pengisian Formulir TA-01 dan TA-02. |
| **`detail_rekomendasi_dosen`** | `id_detail` (INT AUTO_INCREMENT)<br>`id_pengajuan` (VARCHAR(36))<br>`ranking` (TINYINT)<br>`nip_dosen` (VARCHAR(18))<br>`skor_kecocokan` (DECIMAL(5,2))<br>`kata_kunci_keselarasan` (TEXT)<br>`id_publikasi_rujukan` (INT)<br>`status_konfirmasi` (ENUM('menunggu','disetujui','ditolak')) | **PK:** `id_detail`<br>**FK 1:** `id_pengajuan` $\rightarrow$ `pengajuan_rekomendasi.id_pengajuan`<br>**FK 2:** `nip_dosen` $\rightarrow$ `dosen.nip`<br>**FK 3:** `id_publikasi_rujukan` $\rightarrow$ `publikasi_dosen.id_publikasi`<br>**NOT NULL:** `id_detail`, `id_pengajuan`, `ranking`, `nip_dosen`, `skor_kecocokan` | Menyimpan 3 kartu rekomendasi dosen teratas (Top-3) per sesi pengajuan secara atomik beserta bukti transparansi *Explainable AI* (skor, kata kunci, artikel rujukan). |

### 2.5.2 Diagram Relasi Entitas (Entity-Relationship Diagram / ERD)

```mermaid
erDiagram
    kelompok_keahlian ||--o{ dosen : "menaungi"
    kelompok_keahlian ||--o{ riwayat_skripsi : "diklasifikasikan_ke"
    kelompok_keahlian ||--o{ pengajuan_rekomendasi : "diprediksi_sebagai"
    dosen ||--o{ publikasi_dosen : "menulis"
    dosen ||--o{ riwayat_skripsi : "membimbing_p1"
    dosen ||--o{ detail_rekomendasi_dosen : "direkomendasikan_sebagai"
    pengajuan_rekomendasi ||--|{ detail_rekomendasi_dosen : "menghasilkan_top3"
    publikasi_dosen ||--o{ detail_rekomendasi_dosen : "menjadi_rujukan_xai"

    kelompok_keahlian {
        varchar id_kk PK
        varchar nama_kk
        text deskripsi_fokus
    }

    dosen {
        varchar nip PK
        varchar nama_lengkap
        varchar gelar_depan
        varchar gelar_belakang
        varchar email UK
        varchar jabatan_akademik
        varchar id_kk FK
        enum status_aktif
        boolean is_eligible_p1
    }

    publikasi_dosen {
        int id_publikasi PK
        varchar nip_dosen FK
        text judul_publikasi
        int tahun_terbit
        varchar nama_sumber_indeks
        varchar url_dokumen
    }

    riwayat_skripsi {
        int id_skripsi PK
        text judul_skripsi
        int tahun_lulus
        varchar nip_pembimbing_1 FK
        varchar id_kk FK
    }

    pengajuan_rekomendasi {
        varchar id_pengajuan PK
        varchar nim_mahasiswa
        varchar nama_mahasiswa
        text judul_usulan
        text ringkasan_ide
        varchar id_kk_terprediksi FK
        timestamp waktu_pengajuan
    }

    detail_rekomendasi_dosen {
        int id_detail PK
        varchar id_pengajuan FK
        tinyint ranking
        varchar nip_dosen FK
        decimal skor_kecocokan
        text kata_kunci_keselarasan
        int id_publikasi_rujukan FK
        enum status_konfirmasi
    }
```

### 2.5.3 Pembuktian Pemenuhan Third Normal Form (3NF)

1. **Pemenuhan 1NF (Bentuk Normal Pertama):**  
   Seluruh nilai atribut bersifat atomik (tidak ada atribut bernilai jamak / *multivalued attributes* seperti array nama dosen di tabel pengajuan). Hasil rekomendasi Top-3 dipisahkan menjadi entitas mandiri `detail_rekomendasi_dosen` di mana setiap baris mewakili 1 rekomendasi dosen per peringkat.
2. **Pemenuhan 2NF (Bentuk Normal Kedua):**  
   Skema telah memenuhi 1NF dan seluruh Primary Key berupa *single-column key* (misal `nip`, `id_publikasi`, `id_skripsi`, `id_pengajuan`). Hal ini memastikan tidak ada ketergantungan fungsional sebagian (*partial dependency*) dari atribut non-kunci terhadap kunci utama.
3. **Pemenuhan 3NF (Bentuk Normal Ketiga):**  
   Skema telah memenuhi 2NF dan tidak memiliki ketergantungan transitif (*transitive dependency*) di antara atribut non-kunci. Seluruh atribut non-kunci hanya bergantung langsung pada Primary Key tabelnya:
   * Nama dan deskripsi Kelompok Keahlian tidak diduplikasi di tabel `dosen`, `riwayat_skripsi`, maupun `pengajuan_rekomendasi`, melainkan direferensikan melalui *foreign key* `id_kk`.
   * Data dosen penulis tidak disimpan di tabel `publikasi_dosen`, melainkan ditautkan melalui `nip_dosen`.
   * Nilai skor dan kata kunci penjelas melekat pada transaksi hasil rekomendasi (`detail_rekomendasi_dosen`), bukan pada profil master dosen.

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
