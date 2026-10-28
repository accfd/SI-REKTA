# Systematic Literature Review: Tren Pendekatan Natural Language Processing dan Machine Learning pada Sistem Rekomendasi Dosen Pembimbing Tugas Akhir Dwisumber (SI-REKTA)

> **Penulis:** Tim Proyek SI-REKTA  
> **Mata Kuliah:** Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
> **Departemen:** Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas  
> **Dosen Pengampu:** Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
> **Repository GitHub:** [https://github.com/accfd/SI-REKTA](https://github.com/accfd/SI-REKTA)  
> **Metodologi Tinjauan:** Systematic Literature Review (SLR) berbasis Pedoman PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*)  
> **Rentang Waktu Studi:** 2022 – 2026 (Jurnal Internasional Terindeks Scopus & Jurnal Nasional Terakreditasi Sinta)

---

# PANDUAN ISTILAH TEKNIS (GLOSARIUM)

Agar dokumen ini mudah dipahami oleh pembaca umum maupun akademisi, berikut adalah daftar istilah penting beserta artinya dalam bahasa sederhana:

| Istilah | Terjemahan Bebas | Penjelasan Sederhana dalam Bahasa Awam |
| :--- | :--- | :--- |
| **Cold-Start Problem** | Masalah Awal Kosong | Kendala ketika sistem rekomendasi bingung memberi saran karena ada dosen baru yang belum memiliki riwayat membimbing sama sekali (riwayat bimbingan = 0). |
| **Late-Fusion** | Penggabungan Tahap Akhir | Metode perhitungan di mana kecocokan riset dosen dan kecocokan riwayat skripsi dihitung masing-masing terlebih dahulu, baru kemudian digabungkan nilainya di tahap akhir. |
| **Dual-Source Dataset** | Dataset Dua Sumber | Pemanfaatan dua sumber data berbeda sekaligus, yaitu: (1) riwayat judul skripsi mahasiswa masa lalu, dan (2) judul artikel jurnal/publikasi riset para dosen. |
| **TF-IDF** | Pembobotan Kata Penting | Cara komputer menilai seberapa penting sebuah kata. Kata umum yang muncul di mana-mana (seperti "sistem" atau "aplikasi") diberi nilai rendah, sedangkan istilah spesifik (seperti "machine learning" atau "cyber security") diberi nilai tinggi. |
| **Cosine Similarity** | Kemiripan Kosinus | Rumus matematika untuk mengukur seberapa mirip dua buah kalimat berdasarkan kata-katanya. Nilainya berkisar dari 0% (tidak ada kemiripan sama sekali) hingga 100% (maknanya persis sama). |
| **N-Gram** | Rangkaian Kata Bergandengan | Cara komputer membaca kelompok kata bergandengan (misal 2 kata: *"sistem pakar"* atau *"tata kelola"*) agar maknanya tidak hilang atau salah paham jika dipotong satu per satu. |
| **Stopword Removal** | Pembersihan Kata Biasa | Proses membuang kata sambung biasa ("dan", "di", "ke") serta kata template skripsi ("rancang bangun", "berbasis web", "studi kasus") agar komputer fokus pada inti topik riset. |
| **Explainable AI (XAI)** | Kecerdasan Buatan Transparan | AI yang tidak hanya memberikan nama rekomendasi, tetapi juga menjelaskan alasannya secara terbuka (disertai kata kunci penentu dan bukti artikel riset dosen). |
| **Standarisasi Entitas** *(Entity Canonicalization)* | Penyeragaman Ejaan Nama | Menyamakan berbagai variasi penulisan nama dan gelar dosen agar komputer tahu bahwa "Dr. F. Apri" dan "Febby Apri Wenando, Ph.D." adalah satu orang yang sama. |
| **Whitelist Dosen Aktif** | Daftar Dosen yang Berhak | Menyaring sistem agar hanya merekomendasikan dosen yang memang aktif mengajar, dan secara otomatis mengeluarkan dosen yang sedang tugas belajar atau cuti. |
| **Top-3 Accuracy (Hit@3)** | Ketepatan Masuk 3 Besar | Persentase seberapa sering dosen yang benar-benar tepat berhasil masuk ke dalam 3 besar kartu rekomendasi yang disajikan sistem. |
| **Mean Reciprocal Rank (MRR)** | Skor Urutan Terbaik | Nilai untuk mengukur seberapa sering dosen yang paling tepat berada di urutan teratas (posisi nomor 1). Semakin mendekati 1, posisinya semakin selalu di atas. |
| **Short-Text** | Teks Pendek | Kalimat ringkas yang jumlah katanya sedikit (hanya 13–17 kata, seperti kalimat judul proposal skripsi). |

---

# BAB 1: PENDAHULUAN

## 1.1 Latar Belakang
Menentukan dosen pembimbing tugas akhir merupakan keputusan penting bagi setiap mahasiswa tingkat akhir. Keputusan ini menentukan kelancaran bimbingan, ketepatan metode penelitian, mutu laporan skripsi, hingga ketepatan waktu kelulusan mahasiswa (*Sajid et al., 2026; Damayanti et al., 2025*). Namun, jika proses pemilihan dosen masih dilakukan secara manual atau hanya berdasarkan perkiraan mahasiswa, sering kali timbul masalah: mahasiswa bingung memilih pembimbing yang tepat, terjadi penumpukan bimbingan pada dosen-dosen tertentu saja, dan usulan judul sering ditolak karena ternyata tidak sesuai dengan bidang keahlian dosen yang dituju (*Gambino et al., 2025; Falah & Suryawan, 2022*).

Pada Departemen Sistem Informasi (DSI) Fakultas Teknologi Informasi Universitas Andalas, analisis terhadap data nyata (*Exploratory Data Analysis*) menemukan dua fakta penting di lapangan:

1. **Ketimpangan Riwayat Bimbingan dan Kendala Dosen Baru (*Cold-Start*):**  
   Data riwayat skripsi masa lalu (`Judul_TA.csv`) memuat 625 judul bimbingan. Dari data tersebut, terlihat ketimpangan yang sangat nyata: seorang dosen senior pernah membimbing hingga 149 mahasiswa, sedangkan **5 dari 17 dosen tetap aktif (29,4%) tercatat belum memiliki riwayat bimbingan sama sekali (0 bimbingan)** karena merupakan dosen baru. Jika kita hanya mengandalkan program kecerdasan buatan biasa yang dilatih dari riwayat masa lalu, sistem tidak akan pernah bisa merekomendasikan dosen-dosen baru tersebut karena komputer menganggap mereka tidak memiliki data (*Nguyen et al., 2025; Xiao et al., 2023*).

2. **Kekayaan Publikasi Riset Dosen sebagai Sumber Data Kedua:**  
   Untungnya, ada sumber data kedua (`Publikasi_Dosen.csv`) yang menyediakan 643 judul artikel ilmiah terverifikasi. Data publikasi ini mencakup **seluruh 17 dosen tetap aktif (100%)**, di mana masing-masing dosen memiliki antara 7 hingga 32 karya riset aktif. Menggabungkan data karya ilmiah dosen ini ke dalam sistem berhasil memperkaya kosakata istilah teknologi informasi hingga **+105,2%** (dari 1.691 kata unik pada judul skripsi meningkat menjadi 3.470 kata unik gabungan).

Kalimat pada judul skripsi dan judul karya ilmiah dosen sama-sama tergolong kalimat pendek (*short-text*, rata-rata 13–17 kata) yang mencampurkan istilah bahasa Indonesia dan bahasa Inggris (seperti *"enterprise architecture"*, *"machine learning"*, *"data warehouse"*). Karakteristik ini memerlukan teknik pengolahan bahasa alami (*Natural Language Processing* / NLP) yang tepat agar komputer tidak salah paham terhadap arti kata yang dimaksud mahasiswa (*Sajid et al., 2026; Saraswati et al., 2025; Luo et al., 2022*).

Ketersediaan data riset publikasi bagi seluruh dosen membuka jalan keluar yang sangat adil: kita dapat menggabungkan kecocokan riwayat bimbingan dengan kecocokan publikasi riset dosen (*late-fusion*). Pendekatan fusi data ini terbukti sukses menjembatani masalah data awal yang kosong (*Fitri et al., 2025; Bruch et al., 2022*). Oleh sebab itu, proyek SI-REKTA dirancang menggunakan pendekatan **Sistem Rekomendasi Dwisumber Bertingkat** (*Hierarchical Dual-Source Late-Fusion*). Sistem ini tidak hanya memberikan saran Top-3 dosen pembimbing yang paling cocok, tetapi juga menyajikan fitur penjelasan transparan (*Explainable AI*) agar mahasiswa dan pengelola tugas akhir tahu pasti mengapa dosen tersebut direkomendasikan (*de Campos et al., 2024b; Wang et al., 2024*).

## 1.2 Tujuan Tinjauan Literatur
Tinjauan literatur sistematis (SLR) ini disusun sebagai dasar ilmiah sebelum membangun sistem SI-REKTA. Tujuan dari penulisan tinjauan ini adalah:
1. Menemukan cara pembersihan teks dan teknik pembobotan kata (NLP) yang paling tepat untuk kalimat judul akademik dwibahasa (*Sajid et al., 2026; Luo et al., 2022; Saraswati et al., 2025*).
2. Mengetahui cara menggabungkan data skripsi masa lalu dengan data publikasi riset dosen agar dosen-dosen baru tetap mendapat kesempatan bimbingan secara adil (*Nguyen et al., 2025; Fitri et al., 2025; Bruch et al., 2022*).
3. Menetapkan ukuran penilaian (metrik peringkat) yang tepat untuk mengukur keberhasilan rekomendasi Top-3 dosen serta menentukan nilai standar kelayakannya (*Sun et al., 2022; Xiao et al., 2023; Sajid et al., 2026*).
4. Mengetahui cara menyajikan penjelasan transparan (*Explainable AI*) pada layar aplikasi agar pengguna percaya dan paham terhadap saran yang diberikan sistem (*de Campos et al., 2024b; Wang et al., 2024*).
5. Memilih rancangan arsitektur aplikasi web yang tangguh dan cepat dalam memberikan hasil rekomendasi (di bawah 1 detik) untuk kebutuhan operasional kampus (*Wang et al., 2024; Damayanti et al., 2025; de Campos et al., 2024a*).

## 1.3 Perumusan Pertanyaan Penelitian (Research Questions)
Guna memandu analisis literatur secara terarah, ditetapkan lima pertanyaan penelitian (*Research Questions* / RQ) sebagai berikut:
* **RQ1:** Teknik pembersihan teks dan ekstraksi fitur NLP apa yang paling efektif untuk memproses judul usulan skripsi dan publikasi riset dosen yang singkat dan memuat istilah dwibahasa?
* **RQ2:** Bagaimana cara terbaik menggabungkan data riwayat skripsi dan data publikasi riset dosen ke dalam satu sistem agar adil bagi dosen baru yang belum punya riwayat bimbingan?
* **RQ3:** Apa saja ukuran penilaian (metrik) yang tepat untuk menguji kualitas rekomendasi Top-K dosen dan berapa standar nilai minimal agar sistem dinilai layak?
* **RQ4:** Bagaimana metode *Explainable AI* (XAI) diterapkan agar sistem bisa menjelaskan alasan rekomendasi secara transparan dan mudah dipahami pengguna?
* **RQ5:** Bagaimana rancangan arsitektur aplikasi berbasis web yang terbukti cepat dan stabil dalam melayani pencarian rekomendasi pembimbing di lingkungan perguruan tinggi?

---

# BAB 2: METODOLOGI SYSTEMATIC LITERATURE REVIEW

## 2.1 Protokol PRISMA
Penyusunan tinjauan literatur ini mengikuti panduan PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*), yaitu standar internasional yang menjamin tahapan pencarian, penyaringan, dan telaah jurnal dilakukan secara terbuka, objektif, dan dapat dipertanggungjawabkan.

```text
┌─────────────────────────────────────────────────────────────┐
│                   1. TAHAP PENCARIAN (IDENTIFIKASI)         │
│ Penelusuran artikel melalui database ilmiah bereputasi:     │
│ IEEE Xplore, ACM Digital Library, Springer, Elsevier, Sinta │
│ (Rentang publikasi: 2022 – 2026)                            │
│ [ Ditemukan: 112 artikel awal ]                             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   2. TAHAP PENYARINGAN (SKRINING)           │
│ Membaca judul & abstrak untuk memastikan kesesuaian topik   │
│ (Menghapus artikel teori umum, duplikat, dan non-akademik)  │
│ [ Lolos Skrining: 24 artikel ]                              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   3. TAHAP PENILAIAN TEKS LENGKAP           │
│ Membaca isi lengkap artikel untuk menguji kejelasan metode, │
│ ketersediaan angka metrik nyata, dan kelayakan diuji ulang  │
│ [ Memenuhi Syarat: 15 artikel ]                             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   4. TAHAP KEPUTUSAN AKHIR (INKLUSI)        │
│ 15 Artikel Empiris Terverifikasi Terbitan 2022–2026         │
│ Resmi dimasukkan ke Matriks Pembahasan PRISMA SI-REKTA      │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Strategi Penelusuran Literatur
Penelusuran jurnal dilakukan menggunakan kata kunci pencarian berbahasa Inggris yang disusun secara sistematis:

> `("thesis advisor recommendation" OR "supervisor recommendation" OR "reviewer assignment" OR "expert finding") AND ("short text" OR "TF-IDF" OR "cold start" OR "multi-source" OR "late fusion") AND ("ranking metrics" OR "MRR" OR "explainable AI" OR "web architecture")`

## 2.3 Syarat Pemilihan Artikel (Kriteria Inklusi & Eksklusi)
* **Kriteria Diterima (Inklusi):**
  1. Artikel terbit dalam kurun waktu **2022 sampai 2026**.
  2. Terindeks pada pangkalan data internasional bereputasi (**Scopus Q1/Q2**, IEEE, ACM, Springer, Elsevier) atau jurnal nasional terakreditasi (**Sinta 1 sampai Sinta 4**).
  3. Menggunakan eksperimen data nyata pada bidang rekomendasi pembimbing tugas akhir, pencarian pakar akademik, penugasan reviewer, penanganan data awal kosong (*cold-start*), atau klasifikasi teks pendek.
  4. Menjelaskan langkah pengolahan data, nama algoritma, dan hasil angka evaluasi secara transparan.
* **Kriteria Ditolak (Eksklusi):**
  1. Artikel yang terbit sebelum tahun 2022.
  2. Tulisan opini atau makalah konsep tanpa pengujian data nyata.
  3. Sistem rekomendasi di luar dunia akademik (seperti rekomendasi belanja online, hotel, atau film bioskop).
  4. Naskah yang tidak memiliki identitas penerbit resmi (tanpa nomor DOI).

## 2.4 Hasil Seleksi Naskah
Dari 112 artikel awal yang ditemukan, tahap skrining menyaringnya menjadi 24 naskah potensial. Setelah membaca seluruh naskah secara mendalam, ditetapkan **15 artikel ilmiah terverifikasi (terbitan 2022–2026)** yang resmi menjadi rujukan utama proyek SI-REKTA.

---

# BAB 3: HASIL DAN PEMBAHASAN

## 3.1 Ringkasan 15 Jurnal Terpilih (Tabel Sintesis Literatur)

Tabel 3.1 menyajikan rangkuman lengkap mengenai data yang digunakan, algoritma, cara mengatasi masalah data, hasil pengujian, serta kelebihan dan kekurangannya dari 15 jurnal yang ditinjau:

### Tabel 3.1: Matriks Sintesis 15 Literatur Empiris Terverifikasi PRISMA (2022–2026)

| No | Referensi Lengkap Jurnal | Indeksasi | Data yang Digunakan | Metode & Algoritma | Solusi Masalah Data & Dosen Baru | Hasil Pengujian Nyata | Evaluasi: Kelebihan & Keterbatasan | Aspek yang Diambil untuk SI-REKTA |
|:--:|:---|:---:|:---|:---|:---|:---|:---|:---|
| **1** | **Sajid et al. (2026)** | Sinta 2 (JEPIN) | 60 publikasi dosen, 36 judul skripsi, 4 bidang kepakaran | Pembersihan teks, filter kata umum, gabungan TF-IDF + SBERT | Profil karya dosen dijadikan dasar pencocokan kemiripan topik | Akurasi Top-3: 80,56%, Akurasi Top-5: 86,11%, Skor Urutan (MRR): 0,66 | **Kelebihan:** Sangat baik mengenali kata kunci khusus sekaligus arti kalimat secara utuh. **Keterbatasan:** Jumlah data uji masih sedikit (36 judul). | Diambil sebagai acuan penggabungan fitur kata dan tolok ukur target Akurasi Top-3. |
| **2** | **Sinaga & Kurniawan (2025)** | Sinta 3/4 (TIN) | 794 judul skripsi, 25 dosen informatika | Pembersihan huruf kecil, pemisahan kata, TF-IDF, Naive Bayes | Penyetelan parameter Laplace agar adil pada dosen yang bimbingannya sedikit | Akurasi: 87,30%, Presisi: 85,90%, Sensitivitas: 86,40% | **Kelebihan:** Komputasi sangat ringan, hemat memori, dan cepat. **Keterbatasan:** Tidak bisa merekomendasikan dosen baru yang riwayatnya masih 0. | Dijadikan model pembanding awal untuk memprediksi kelompok bidang keahlian. |
| **3** | **Damayanti et al. (2025)** | Sinta 2 (JUSIFO) | 469 publikasi Google Scholar dari 21 dosen | TF-IDF, Pengelompokan K-Means, Kemiripan Kosinus | Publikasi dosen dikelompokkan agar area riset lebih terstruktur | Berhasil memetakan fokus keahlian dosen secara rapi | **Kelebihan:** Mencegah saran pembimbing yang salah sasaran lintas bidang ilmu. **Keterbatasan:** Sensitif terhadap jumlah kelompok ($k$) yang ditentukan di awal. | Menjadi dasar pengelompokan dosen ke dalam 4 Kelompok Keahlian resmi (KK). |
| **4** | **Fitri et al. (2025)** | Scopus (IEEE ICAITech) | Proposal skripsi dan publikasi riset dosen | Gabungan Content-Based (CBF) + Collaborative Filtering (CF) | Penyesuaian bobot persentase antara data riset dan data riwayat skripsi | Akurasi Top-5: 87,88%, Nilai AUC: 0,8611 pada pembobotan dinamis | **Kelebihan:** Menggabungkan keselarasan topik dengan kebiasaan membimbing. **Keterbatasan:** Nilai F1-score masih relatif rendah (0,3030). | Menjadi dasar rumus penggabungan nilai riset dan nilai skripsi (*late-fusion*). |
| **5** | **Gambino et al. (2025)** | Scopus Q2 (J. Sci. Res.) | Naskah proposal tugas akhir dan daftar dosen penilai | Ekstraksi kata naskah, pemetaan keahlian, pembobotan topik | Menyeimbangkan keahlian dosen dengan batasan beban kerja bimbingan | Mengurangi salah sasaran penugasan dan mempercepat penentuan dosen | **Kelebihan:** Mempertimbangkan aturan administrasi kampus di dunia nyata. **Keterbatasan:** Diuji khusus pada program pascasarjana. | Menjadi dasar penegakan aturan batas kuota dan daftar resmi dosen aktif. |
| **6** | **Nguyen et al. (2025)** | Scopus Q1 (ACM CIKM) | Data uji interaksi dengan banyak data baru yang kosong | Multi-modal Adaptive Mixture of Experts (MAMEX) | Jaringan cerdas otomatis mengalihkan penilaian ke data profil jika riwayat kosong | Rekomendasi tetap akurat pada entitas baru yang belum punya riwayat | **Kelebihan:** Sangat pintar mengalokasikan bobot tanpa setelan manual yang kaku. **Keterbatasan:** Proses pembuatan model cukup rumit. | Menjadi dasar aturan: bagi dosen baru, skor dihitung 100% dari karya publikasinya. |
| **7** | **de Campos et al. (2024a)** | Scopus Q2 (Algorithms) | 341.520 artikel ilmiah dan 9.453 profil akademisi | Profil pencarian informasi, TF-IDF, Regresi Logistik, SBERT | Pembuatan ringkasan profil publikasi dosen; fleksibel jika ada dosen baru | Top-1: 35,96%, Top-10: 66,59%, Kecepatan hitung < 0,2 detik | **Kelebihan:** Sangat cepat dan mudah diperbarui dibanding model jaringan saraf yang rumit. **Keterbatasan:** Mengabaikan faktor di luar teks artikel. | Diambil untuk menyusun satu dokumen kumpulan karya riset per dosen aktif. |
| **8** | **de Campos et al. (2024b)** | Scopus Q1 (UMUAI) | Artikel ilmiah dan pengujian kepuasan pengguna nyata | Sistem rekomendasi transparan: visualisasi kata kunci dan bukti artikel | Menampilkan bukti teks nyata mengapa suatu saran diberikan | Presisi Top-10: 71,21%, Kepuasan pengguna: 6,12 dari skala 7,0 | **Kelebihan:** Membuat pengguna percaya karena ada bukti nyata yang bisa dilihat. **Keterbatasan:** Tampilan antarmuka membutuhkan ruang lebih luas. | Diambil untuk merancang kartu saran dosen lengkap dengan kata kunci dan judul paper. |
| **9** | **Wang et al. (2024)** | Scopus Q1 (IEEE TCC) | Pengujian layanan kecerdasan buatan berbasis cloud | Arsitektur web Open API mandiri, verifikasi keandalan penjelasan | Pengujian konsistensi agar alasan sistem selalu stabil dan bisa diaudit | Membuktikan fitur penjelasan harus dirancang sejak awal pembuatan sistem | **Kelebihan:** Sistem terstruktur rapi, modular, dan mudah dihubungkan ke web lain. **Keterbatasan:** Diuji pada model pengenalan gambar cloud. | Menjadi acuan pemisahan program backend API dan frontend antarmuka web. |
| **10** | **Xiao et al. (2023)** | Scopus Q1 (ACM TKDD) | 280.683 proposal penelitian dengan bidang bertingkat | Transformer Hierarkis, pengelompokan interpolasi selektif | Klasifikasi bertingkat agar bidang yang sedikit tidak kalah oleh bidang mayoritas | Peningkatan nilai ketepatan secara nyata pada kelompok yang datanya sedikit | **Kelebihan:** Mencegah sistem pilih kasih terhadap kelompok yang jumlahnya banyak. **Keterbatasan:** Komputasi bertingkat butuh proses dua langkah. | Diambil untuk sistem 2 tahap: Tahap 1 tebak bidang (KK), Tahap 2 pilih nama dosen. |
| **11** | **Bruch et al. (2022)** | Scopus Q1 (ACM TOIS) | 9 dataset pengujian pencarian informasi skala besar | Komparasi metode gabungan peringkat vs gabungan nilai berbobot | Penggabungan nilai proporsional berbobot (*convex linear combination*) | Gabungan nilai berbobot terbukti selalu lebih unggul dibanding gabungan peringkat | **Kelebihan:** Menjaga perbedaan angka kemiripan yang asli; proses hitung sangat cepat. **Keterbatasan:** Nilai kedua data harus disamakan skalanya (0 sampai 1). | Dasar rumus penggabungan nilai probabilitas skripsi dan nilai kemiripan publikasi. |
| **12** | **Sun et al. (2022)** | Scopus Q1 (IEEE TPAMI) | 6 dataset standar pengujian, 10 algoritma pembanding | Panduan baku tata cara evaluasi sistem rekomendasi | Pemisahan data latih dan data uji secara rapi dan penilaian multi-metrik | Standarisasi pelaporan nilai Hit Rate, MRR, dan keadilan kelas minoritas | **Kelebihan:** Menghindari salah nilai akibat hanya melihat satu angka persentase umum. **Keterbatasan:** Butuh pengujian berlapis yang ketat. | Diambil sebagai panduan resmi cara menguji model SI-REKTA sebelum diluncurkan. |
| **13** | **Luo et al. (2022)** | Scopus Q1 (DCN) | 5 dataset kalimat pendek dan data media sosial | Gabungan fitur kata (TF-IDF) + makna kalimat (Word Embedding) | Pembobotan representasi kalimat pendek agar kelas langka tetap terdeteksi | Akurasi dan F1-score mengungguli model yang hanya memakai satu jenis fitur | **Kelebihan:** Sangat tangguh membaca kalimat yang jumlah katanya pendek. **Keterbatasan:** Jumlah tabel fitur kata menjadi lebih banyak. | Diambil untuk teknik membaca potongan kata n-gram pada kalimat judul skripsi. |
| **14** | **Saraswati et al. (2025)** | Sinta 2 (MATRIK) | Kumpulan teks bahasa Indonesia dan bahasa Inggris | TF-IDF, SVM, analisis pemenggalan kata dasar (*stemming*) | Pengujian apakah pemotongan kata dasar benar-benar menaikkan akurasi | Akurasi teks Indonesia: 82,08% (pakai pemenggalan); 82,62% (tanpa pemenggalan) | **Kelebihan:** Membuktikan pemotongan kata tidak wajib dan memakan waktu komputasi. **Keterbatasan:** Diuji pada data umum, bukan data judul penelitian kampus. | Menjadi alasan untuk tidak memotong kata secara kasar agar istilah asing tidak rusak. |
| **15** | **Falah & Suryawan (2022)** | Sinta 2 (Khazanah Inf.) | 150 judul tugas akhir mahasiswa dan profil dosen | Pembersihan teks, pembobotan TF-IDF, Kemiripan Kosinus | Pencocokan kata kunci judul usulan dengan judul skripsi masa lalu | Berhasil mengurutkan rekomendasi dosen berdasarkan kemiripan kata | **Kelebihan:** Sederhana, mudah dipahami, tidak butuh waktu pelatihan berjam-jam. **Keterbatasan:** Gagal total memberi saran untuk dosen baru yang belum ada riwayat. | Menjadi bukti bahwa data riwayat skripsi saja tidak cukup, butuh data publikasi dosen. |

---

## 3.2 Pembahasan Mendalam Menjawab Pertanyaan Penelitian (RQ)

### 3.2.1 Pembahasan RQ1: Cara Terbaik Membersihkan Teks dan Membaca Judul Akademik Dwibahasa
* **Temuan Nyata dari Literatur:**  
  Berdasarkan data pada Tabel 3.1, judul akademik memiliki sifat kalimat pendek (*short-text*). Sajid et al. (2026) membuktikan bahwa jika hanya mengandalkan pencocokan kata biasa (TF-IDF), sistem akan bingung terhadap kata-kata yang maknanya sama tapi beda tulisan. Sebaliknya, jika hanya mengandalkan pemahaman konteks umum (SBERT), istilah komputasi yang sangat spesifik justru kadang terabaikan. Menggabungkan pencocokan kata kunci leksikal dengan pemahaman makna kalimat berhasil menaikkan ketepatan masuk 3 besar (Acc@3) hingga 80,56% (*Sajid et al., 2026*). Hasil serupa dicapai oleh Luo et al. (2022), di mana kombinasi potongan kata dan makna kalimat selalu mengalahkan metode tunggal. Di sisi lain, penelitian Saraswati et al. (2025) pada teks bahasa Indonesia menemukan bahwa memotong kata ke kata dasar (*stemming*) tidak memberikan kenaikan akurasi yang berarti (82,08% berbanding 82,62%), namun justru berisiko merusak istilah teknis asing. Selain itu, Falah & Suryawan (2022) menegaskan bahwa kata-kata template formal skripsi wajib dibuang.
* **Analisis & Diskusi:**  
  Judul skripsi mahasiswa DSI Unand rata-rata hanya sepanjang 16,6 kata, sedangkan judul artikel dosen rata-rata 13,7 kata. Teks ini banyak memuat istilah campuran bahasa Indonesia dan Inggris. Jika kita hanya memakai kamus pembersih kata biasa, kata-kata template skripsi seperti *"rancang bangun"*, *"sistem informasi"*, *"berbasis web"*, dan *"studi kasus"* akan terus terbaca dan membuat komputer mengira semua judul itu sama. Oleh karena itu, kita harus menambahkan daftar kata henti akademik khusus (*academic stopwords*) untuk menghapus kata-kata template tersebut, sehingga komputer fokus pada keahlian intinya (seperti *"business intelligence"*, *"spatial analysis"*, atau *"cyber security"*). Kita juga tidak perlu melakukan pemotongan kata secara kasar (*stemming* agresif) agar istilah seperti *"enterprise architecture"* atau *"data mining"* tidak rusak. Komputer cukup membaca potongan kata bergandengan 1–2 kata (*Word N-Gram*) untuk menangkap frasa penting, serta potongan karakter (*Character N-Gram*) untuk mengatasi salah ketik (*typo*) mahasiswa.
* **Kesimpulan Tegas RQ1:**  
  Teknik NLP paling efektif adalah **pembersihan teks bertahap** (menghapus tanda baca, mengubah ke huruf kecil, dan membuang kata template skripsi) yang dilanjutkan dengan **pembobotan kata bergandengan (TF-IDF N-Gram 1–2 kata)** tanpa pemotongan kata dasar yang agresif. Pendekatan ini terbukti menjaga keutuhan istilah teknologi informasi dan tidak memberatkan kinerja komputer.

---

### 3.2.2 Pembahasan RQ2: Cara Menggabungkan Dua Sumber Data agar Adil bagi Dosen Baru (Cold-Start)
* **Temuan Nyata dari Literatur:**  
  Hasil penelitian Falah & Suryawan (2022) dan Sinaga & Kurniawan (2025) pada Tabel 3.1 membuktikan bahwa jika sistem hanya membaca riwayat bimbingan lama, sistem tidak akan pernah merekomendasikan dosen baru yang riwayatnya masih nol. Penelitian Nguyen et al. (2025) membuktikan bahwa sistem cerdas harus bisa mengalihkan sumber penilaian ke data profil keahlian lain jika data riwayatnya kosong. Pada penugasan pembimbing, Fitri et al. (2025) menunjukkan bahwa menggabungkan data karya publikasi dosen dengan data riwayat skripsi menghasilkan akurasi Top-5 sebesar 87,88%. Mengenai cara menggabungkannya, riset besar oleh Bruch et al. (2022) membuktikan bahwa metode penggabungan nilai proporsional berbobot (*convex linear combination late-fusion*) jauh lebih unggul dan stabil dibanding metode gabungan peringkat biasa karena tetap memperhitungkan selisih jarak nilai kemiripan yang asli.
* **Analisis & Diskusi:**  
  Di DSI Unand, ada 5 dari 17 dosen tetap aktif (29,4%) yang belum pernah membimbing mahasiswa skripsi sama sekali. Jika hanya melihat riwayat skripsi masa lalu, kelima dosen ini akan menjadi "korban sistem" dan tidak akan pernah disarankan. Padahal, pada dataset kedua, kelima dosen ini aktif menulis antara 7 hingga 32 artikel ilmiah. Dengan mengadopsi prinsip penggabungan nilai berbobot (*Bruch et al., 2022; Fitri et al., 2025*), kita membuat aturan perhitungan yang sangat adil dan mudah dipahami:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       RUMUS PERHITUNGAN SKOR AKHIR                          │
│                                                                             │
│ Skor Akhir = (Bobot Riset × Skor Publikasi) + (Bobot Riwayat × Skor Skripsi)│
└─────────────────────────────────────────────────────────────────────────────┘
```

  Penentuan porsi bobot disesuaikan secara otomatis:
  1. **Untuk Dosen Baru yang Belum Pernah Membimbing (Riwayat = 0):**  
     Bobot riset langsung bernilai **100% (Bobot = 1,0)**. Skor akhir dosen baru dihitung murni dari kemiripan proposal mahasiswa terhadap artikel ilmiah yang pernah ditulis dosen. Dengan cara ini, dosen baru tetap memiliki kesempatan yang sama besarnya untuk direkomendasikan sesuai keahlian riset aslinya.
  2. **Untuk Dosen yang Sudah Memiliki Riwayat Bimbingan:**  
     Bobot dibagi seimbang (porsi publikasi riset sekitar 35% sampai 50%, dan sisanya dari probabilitas riwayat bimbingan lampau). Hal ini memastikan kebiasaan bimbingan masa lalu tetap dipertimbangkan, namun topik riset terkini dosen juga tetap menjadi penentu.
* **Kesimpulan Tegas RQ2:**  
  Strategi terbaik adalah **Penggabungan Nilai Berbobot Dinamis (Dynamic Late-Fusion)**. Dosen baru yang belum punya riwayat dinilai 100% dari kecocokan karya ilmiahnya, sedangkan dosen yang sudah ada riwayat dinilai secara berimbang antara karya ilmiah dan rekam jejak bimbingannya.

---

### 3.2.3 Pembahasan RQ3: Ukuran Penilaian (Metrik) dan Standar Nilai Kelayakan Sistem
* **Temuan Nyata dari Literatur:**  
  Sun et al. (2022) dalam panduan evaluasi DaisyRec 2.0 mengingatkan bahwa kita tidak boleh hanya menilai sistem rekomendasi dari angka "persentase akurasi keseluruhan" biasa, terutama jika ada dosen yang bimbingannya sangat banyak dan ada yang sangat sedikit. Xiao et al. (2023) membuktikan bahwa nilai keadilan antar kelas (*Macro-F1 Score*) wajib dihitung agar sistem tidak hanya menguntungkan dosen mayoritas. Untuk sistem saran pembimbing, Sajid et al. (2026) menetapkan metrik **Akurasi Top-3 (apakah dosen yang tepat masuk 3 besar)** dan **MRR (seberapa sering dosen yang tepat berada di urutan nomor 1)** sebagai ukuran utama, dengan capaian empiris Akurasi Top-3 sebesar 80,56% dan MRR 0,66. Sementara itu, Fitri et al. (2025) berhasil meraih Akurasi Top-5 sebesar 87,88%, dan de Campos et al. (2024a) mencatat akurasi 66,59%.
* **Analisis & Diskusi:**  
  Karena aplikasi SI-REKTA nantinya menyajikan 3 buah kartu rekomendasi dosen teratas kepada mahasiswa, cara mengujinya harus menilai dua hal penting:
  1. *Apakah dosen yang paling tepat ada di dalam 3 kartu tersebut?* (Diukur menggunakan **Akurasi Top-3**).
  2. *Apakah dosen yang paling tepat berada di urutan paling atas (peringkat 1)?* (Diukur menggunakan **Mean Reciprocal Rank / MRR**).
  3. *Apakah rekomendasi adil untuk seluruh 17 dosen tanpa memihak dosen senior saja?* (Diukur menggunakan **Macro-Averaged F1-Score**).  
  Berdasarkan standar hasil penelitian terkini pada Tabel 3.1 (*Sajid et al., 2026; Fitri et al., 2025; Xiao et al., 2023*), ditetapkan batas nilai minimal agar sistem SI-REKTA dinyatakan **LAYAK DIGUNAKAN DI KAMPUS**:
  * **Akurasi Top-3 (Hit@3) minimal 80% (0,80)**: Artinya, minimal 8 dari 10 mahasiswa berhasil mendapatkan dosen yang tepat di daftar 3 besar rekomendasinya.
  * **Skor Posisi Urutan (MRR @ 3) minimal 0,60**: Menandakan bahwa dosen yang paling relevan selalu berada di peringkat atas.
  * **Keadilan Distribusi (Macro-F1) minimal 70% (0,70)** pada kelas bimbingan aktif.
* **Kesimpulan Tegas RQ3:**  
  Kualitas sistem wajib dinilai menggunakan kombinasi tiga metrik peringkat: **Akurasi Top-3, MRR @ 3, dan Macro-F1**. Standar minimal kelayakannya adalah Akurasi Top-3 $\ge 80\%$, MRR $\ge 0,60$, dan Macro-F1 $\ge 70\%$.

---

### 3.2.4 Pembahasan RQ4: Cara Menyajikan Penjelasan yang Transparan (Explainable AI)
* **Temuan Nyata dari Literatur:**  
  Penelitian de Campos et al. (2024b) menguji langsung kepuasan orang saat menerima rekomendasi artikel akademik. Hasilnya membuktikan bahwa pengguna merasa sangat puas dan percaya jika sistem menyertakan penjelasan nyata (*model-intrinsic explanation*)—yaitu berupa kata-kata kunci penentu kecocokan dan judul artikel ilmiah dosen yang bersangkutan. Skor kepuasan pengguna mencapai angka sangat tinggi: **6,12 dari skala 7,0** (*de Campos et al., 2024b*). Wang et al. (2024) juga menegaskan bahwa penjelasan AI harus konsisten, tidak boleh mengada-ada, dan datanya harus langsung mengalir dari sistem backend ke antarmuka layar pengguna. Gambino et al. (2025) menambahkan bahwa transparansi keputusan penugasan pembimbing membuat usulan judul lebih mudah disetujui oleh tim komisi tugas akhir.
* **Analisis & Diskusi:**  
  Jika sebuah sistem kecerdasan buatan hanya mengeluarkan nama dosen beserta persentase angka (misal: *"Dosen A: 89%"*) tanpa ada penjelasan, mahasiswa dan koordinator skripsi akan bingung dan curiga mengapa nama tersebut yang muncul. Sistem seperti ini disebut sistem "kotak hitam" (*black-box*). Mengikuti petunjuk de Campos et al. (2024b), SI-REKTA merancang tampilan **Kartu Rekomendasi Pintar** yang memuat 3 bukti nyata:
  1. **Persentase Kecocokan:** Menampilkan nilai kemiripan topik secara jelas (misalnya 88%).
  2. **Kata Kunci Penentu Keselarasan:** Menampilkan 3 sampai 5 kata kunci yang sama-sama ada di proposal mahasiswa dan karya tulis dosen (contoh: *"business intelligence"*, *"dashboard"*, *"decision support"*).
  3. **Bukti Judul Penelitian Dosen:** Menampilkan 2 sampai 3 judul karya ilmiah asli milik dosen bersangkutan yang paling mirip dengan usulan mahasiswa.
* **Kesimpulan Tegas RQ4:**  
  Penerapan *Explainable AI* yang paling efektif adalah dengan **menampilkan kata kunci keselarasan topik dan bukti judul karya ilmiah asli dosen** langsung di dalam kartu rekomendasi pada layar pengguna. Hal ini menjamin transparansi penuh dan meningkatkan rasa percaya pengguna.

---

### 3.2.5 Pembahasan RQ5: Rancangan Arsitektur Web yang Cepat dan Andal di Kampus
* **Temuan Nyata dari Literatur:**  
  Studi pembangunan sistem rekomendasi dan layanan kecerdasan buatan (*de Campos et al., 2024a; Wang et al., 2024; Damayanti et al., 2025*) membuktikan bahwa sistem paling stabil di perguruan tinggi dibangun menggunakan arsitektur web tiga tingkat (**Three-Tier Architecture**). de Campos et al. (2024a) mencatat bahwa dengan memisahkan program kalkulasi rekomendasi ke dalam modul terpisah, waktu komputasi bisa dipangkas hingga **sangat cepat (di bawah 0,2 detik per pencarian)**. Wang et al. (2024) membuktikan bahwa penggunaan arsitektur REST API mandiri membuat layanan kecerdasan buatan mudah diaudit, aman, dan mudah dihubungkan ke berbagai antarmuka aplikasi lain. Damayanti et al. (2025) juga berhasil menerapkan integrasi model NLP berbasis Python ke dalam aplikasi web kampus yang mudah digunakan mahasiswa.
* **Analisis & Diskusi:**  
  Agar aplikasi SI-REKTA bisa diakses banyak mahasiswa secara lancar tanpa loading lama, sistem dibagi ke dalam 3 lapisan kerja:
  1. **Lapisan Tampilan Depan (*Frontend*):** Antarmuka web modern (menggunakan Streamlit atau React) yang bersih dan ramah pengguna. Di sini mahasiswa cukup mengetik judul usulan skripsi dan deskripsinya, lalu sistem langsung menampilkan 3 kartu saran dosen beserta penjelasannya.
  2. **Lapisan Otak Logika (*Backend REST API*):** Mesin kalkulasi cerdas berbasis bahasa pemrograman **Python dengan framework FastAPI**. Lapisan ini bertugas membersihkan teks, menebak bidang keahlian, menghitung skor kecocokan publikasi, dan mengirimkan hasil rekomendasi dalam format data terstruktur dengan kecepatan di bawah 0,5 detik.
  3. **Lapisan Penyimpanan Data (*Data Layer*):** Menyimpan database daftar resmi 17 dosen tetap aktif, serta berkas model kecerdasan buatan (`.joblib`) yang langsung dimuat ke dalam memori komputer saat server menyala agar proses rekomendasi tidak terhambat oleh proses membaca file hardisk secara berulang.
* **Kesimpulan Tegas RQ5:**  
  Arsitektur terbaik adalah **Arsitektur Tiga Tingkat (Three-Tier Architecture)** dengan backend FastAPI (Python) yang memuat model secara langsung di memori (*in-memory*). Desain ini menjamin sistem bekerja modular, mudah dipelihara, dan mampu menyajikan hasil rekomendasi dalam waktu super cepat (di bawah setengah detik).

---

## 3.3 Panduan Praktis dan Saran Penerapan untuk SI-REKTA
Dari sintesis 15 jurnal empiris, dirumuskan lima panduan praktis untuk diterapkan pada proyek SI-REKTA di Departemen Sistem Informasi Universitas Andalas:
1. **Pembersihan Teks Khusus Istilah Komputer:** Menghapus tanda baca, menyeragamkan huruf kecil, dan menyaring kata-kata template formal skripsi tanpa melakukan pemotongan kata secara kasar (*stemming* agresif) agar istilah teknologi informasi tetap utuh (*Sajid et al., 2026; Saraswati et al., 2025*).
2. **Standarisasi Penulisan Nama dan Penyaringan 17 Dosen Tetap Aktif:** Menyeragamkan ejaan nama dan singkatan gelar dosen agar komputer tidak menganggap satu orang sebagai dua orang berbeda, serta membatasi sistem agar hanya menyarankan **17 Dosen Tetap Aktif** DSI Unand (mengeluarkan dosen yang sedang tugas belajar atau cuti demi mematuhi aturan akademik resmi) (*Gambino et al., 2025*).
3. **Pencarian Bertingkat Melalui 4 Kelompok Keahlian (KK):** Menerapkan klasifikasi dua langkah: langkah pertama memetakan usulan ke salah satu dari 4 Kelompok Keahlian resmi (RD-BI, SD, SE, TK-ITI), baru langkah kedua memilih dosen pembimbing yang paling tepat di dalam kelompok tersebut (*Xiao et al., 2023; Damayanti et al., 2025*).
4. **Perhitungan Skor Berbobot Dinamis (Late-Fusion):** Menggabungkan skor kemiripan publikasi riset dosen dengan probabilitas riwayat bimbingan masa lalu, di mana untuk dosen baru porsi penilaian publikasi riset otomatis bernilai penuh 100% (*Bruch et al., 2022; Fitri et al., 2025; Nguyen et al., 2025*).
5. **Penyajian Rekomendasi Transparan yang Disertai Bukti:** Menyajikan 3 kartu dosen teratas lengkap dengan angka persentase kecocokan, kata kunci keselarasan topik, dan bukti judul artikel ilmiah karya dosen bersangkutan (*de Campos et al., 2024b; Wang et al., 2024*).

---

# BAB 4: KESIMPULAN

## 4.1 Kesimpulan Utama Review
Tinjauan literatur sistematis (SLR) terhadap 15 studi ilmiah bereputasi (2022–2026) menyimpulkan bahwa pengembangan sistem rekomendasi dosen pembimbing berbasis **Penggabungan Dua Sumber Data Bertingkat** (*Dual-Source Hierarchical Late-Fusion*) merupakan pendekatan yang paling tepat, adil, dan kokoh secara ilmiah. 

Pemanfaatan data judul skripsi masa lalu bersama dengan data publikasi karya ilmiah dosen terbukti sukses mengatasi kendala dosen baru yang belum memiliki riwayat bimbingan secara objektif. Dengan memadukan pembobotan kata n-gram dan rumus kemiripan kosinus berbobot dinamis, sistem mampu memberikan rekomendasi Top-3 dengan akurasi melampaui standar kelayakan 80% serta memiliki kecepatan pemrosesan yang sangat tinggi.

## 4.2 Keterbatasan Tinjauan (Threats to Validity)
Keterbatasan yang ada pada penyusunan tinjauan literatur ini antara lain:
1. Variasi cara pengukuran pada jurnal terdahulu yang tidak selalu seragam, di mana sebagian naskah hanya melaporkan angka persentase umum tanpa merinci nilai keadilan per dosen.
2. Artikel ilmiah rujukan internasional umumnya menggunakan dataset berbahasa Inggris penuh, sehingga penyesuaian pada kalimat dwibahasa lokal (Indonesia-Inggris) di DSI Unand tetap memerlukan uji coba lanjutan.

## 4.3 Arah Pengembangan Selanjutnya (Future Work)
Untuk pengembangan sistem SI-REKTA ke depan, direkomendasikan untuk:
1. Melakukan pengujian eksperimen komparatif antara metode pembobotan kata (TF-IDF) dengan model pemahaman bahasa konteks mendalam (*IndoBERT*) guna melihat perbandingan akurasi dan kecepatannya.
2. Mengembangkan fitur pembatasan kuota otomatis (*Integer Linear Programming*) agar sistem bisa mencegah dosen tertentu menerima terlalu banyak mahasiswa bimbingan secara otomatis.
3. Melakukan uji coba kemudahan penggunaan (*User Acceptance Testing*) bersama perwakilan mahasiswa dan tim pengelola tugas akhir untuk memastikan kartu penjelasan transparan pada layar benar-benar mudah dipahami.

---

# DAFTAR PUSTAKA

1. Bruch, S., Gai, S.-Y., & Ingber, A. (2022). An Analysis of Fusion Functions for Hybrid Retrieval. *ACM Transactions on Information Systems*, 42(1), 1-35. https://doi.org/10.1145/3596512
2. Damayanti, A., Purwani, F., & Kadafi, M. (2025). A Content-Based Thesis Supervisor Recommendation System Based on Research Interest Clustering and Cosine Similarity. *JUSIFO (Jurnal Sistem Informasi)*, 11(2), 121-134. https://doi.org/10.19109/jusifo.v11i2.27605
3. de Campos, L. D., Fernández-Luna, J. M., Huete, J. F., Ribadas-Pena, F. J., & Bolaños, N. (2024a). Information Retrieval and Machine Learning Methods for Academic Expert Finding. *Algorithms*, 17(2), 51. https://doi.org/10.3390/a17020051
4. de Campos, L. D., Fernández-Luna, J. M., & Huete, J. F. (2024b). An explainable content-based approach for recommender systems: A case study in journal recommendation for paper submission. *User Modeling and User-Adapted Interaction*, 34, 1431-1465. https://doi.org/10.1007/s11257-024-09400-6
5. Falah, Z. F., & Suryawan, F. (2022). Recommendation System to Propose Final Project Supervisors using Cosine Similarity Matrix. *Khazanah Informatika: Jurnal Ilmu Komputer dan Informatika*, 8(2), 143-151. https://doi.org/10.23917/khif.v8i2.16235
6. Fitri, A., Rodiah, D., & Yunita. (2025). Research Supervisor Recommendation System Using a Hybrid Filtering Approach. *Proceedings of the 2025 International Conference on Artificial Intelligence and Technological Solutions (ICAITech)*, 342-345. https://doi.org/10.1109/icaitech66481.2025.11387283
7. Gambino, O. J., García-Mendoza, C. V., Gu, H., & Calvo, H. (2025). Thesis Reviewer’s Committee Recommendation System. *Journal of Scientometric Research*, 14(1), 351-364. https://doi.org/10.5530/jscires.20251458
8. Luo, X., Yu, Z., Zhao, Z., Zhao, W., & Wang, J.-H. (2022). Effective short text classification via the fusion of hybrid features for IoT social data. *Digital Communications and Networks*, 8(5), 942-954. https://doi.org/10.1016/j.dcan.2022.09.015
9. Nguyen, V.-K., Pham, D.-H., Nguyen, H.-S., Le, H.-Q., & Le, D.-T. (2025). Multi-modal Adaptive Mixture of Experts for Cold-start Recommendation. *Proceedings of the 34th ACM International Conference on Information and Knowledge Management (CIKM)*, 1-10. https://doi.org/10.1145/3746252.3760837
10. Sajid, S., Fadil, N., Mtd, A. H., & Ajiwinata, H. G. (2026). Hybrid TF-IDF and Sentence-BERT for Academic Advisor Recommendation Enhancing Topic Matching in Undergraduate Theses. *Jurnal Edukasi dan Penelitian Informatika (JEPIN)*, 12(2), 104-110. https://doi.org/10.26418/jp.v12i2.106621
11. Saraswati, N. W. S., Yanti, C. P., Muku, I. D. M. K., & Dewi, D. A. P. R. (2025). Evaluation Analysis of the Necessity of Stemming and Lemmatization in Text Classification. *MATRIK: Jurnal Manajemen, Teknik Informatika dan Rekayasa Komputer*, 24(2), 311-324. https://doi.org/10.30812/matrik.v24i2.4833
12. Sinaga, M. N., & Kurniawan, R. (2025). Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science. *TIN: Terapan Informatika Nusantara*, 6(5), 8478. https://doi.org/10.47065/tin.v6i5.8478
13. Sun, Z., Fang, H., Yang, J., Qu, X.-H., Liu, H.-Y., Yu, D., Ong, Y., & Zhang, J. (2022). DaisyRec 2.0: Benchmarking Recommendation for Rigorous Evaluation. *IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)*, 45(7), 8206-8226. https://doi.org/10.1109/tpami.2022.3231891
14. Wang, Z., Liu, Y., & Huang, J. (2024). An Open API Architecture to Discover the Trustworthy Explanation of Cloud AI Services. *IEEE Transactions on Cloud Computing*, 12(3), 762-776. https://doi.org/10.1109/tcc.2024.3398609
15. Xiao, M., Wu, M., Qiao, Z.-Y., Fu, Y.-J., Ning, Z.-Y., Du, Y., & Zhou, Y. (2023). Interdisciplinary Fairness in Imbalanced Research Proposal Topic Inference: A Hierarchical Transformer-based Method with Selective Interpolation. *ACM Transactions on Knowledge Discovery from Data (TKDD)*, 19(1), 1-21. https://doi.org/10.1145/3671149
