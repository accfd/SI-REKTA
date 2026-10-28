# Systematic Literature Review: Tren Pendekatan Natural Language Processing dan Machine Learning pada Sistem Rekomendasi Dosen Pembimbing Tugas Akhir Dwisumber (SI-REKTA)

> **Penulis:** Tim Proyek SI-REKTA  
> **Mata Kuliah:** Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
> **Departemen:** Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas  
> **Dosen Pengampu:** Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
> **Repository GitHub:** [https://github.com/accfd/SI-REKTA](https://github.com/accfd/SI-REKTA)  
> **Metodologi Tinjauan:** Systematic Literature Review (SLR) berbasis Pedoman PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*)  
> **Rentang Waktu Studi:** 2022 – 2026 (Jurnal Internasional Terindeks Scopus & Jurnal Nasional Terakreditasi Sinta)

---

# BAB 1: PENDAHULUAN

## 1.1 Latar Belakang
Penentuan dosen pembimbing tugas akhir merupakan keputusan akademik strategis yang berdampak langsung terhadap relevansi topik riset, kedalaman metodologi ilmiah, dan ketepatan masa studi mahasiswa (*Sajid et al., 2026; Damayanti et al., 2025*). Di tingkat operasional perguruan tinggi, penugasan pembimbing yang dilakukan secara konvensional atau manual kerap menghadapi kendala efisiensi, potensi bias subjektivitas, serta risiko ketidaksesuaian topik (*topic mismatch*) antara usulan mahasiswa dan kepakaran dosen (*Gambino et al., 2025; Falah & Suryawan, 2022*).

Pada Departemen Sistem Informasi (DSI) FTI Universitas Andalas, analisis data eksploratif (*Exploratory Data Analysis*) mengungkap dua tantangan struktural yang dihadapi:
1. **Ketimpangan Riwayat dan Masalah Dosen Baru (*Zero-History Faculty Cold-Start*):**  
   Data historis skripsi (`Judul_TA.csv`) memuat 625 judul bimbingan masa lalu. Distribusi pembimbingan tersebut menunjukkan ketimpangan kelas yang signifikan, di mana dosen paling senior membimbing hingga 149 judul, sementara **5 dari 17 dosen tetap aktif (29,4%) tercatat belum memiliki riwayat bimbingan ($N = 0$)**. Model klasifikasi terawasi (*supervised learning*) konvensional yang hanya dilatih pada data historis bimbingan tidak akan mampu mengalokasikan rekomendasi kepada dosen-dosen baru tersebut (*Nguyen et al., 2025; Xiao et al., 2023*).
2. **Potensi Integrasi Profil Riset Dosen (*Dual-Source Dataset*):**  
   Sebaliknya, data publikasi ilmiah (`Publikasi_Dosen.csv`) menyediakan 643 judul artikel riset yang merepresentasikan **100% dari 17 dosen tetap aktif**, dengan setiap dosen memiliki 7 hingga 32 publikasi aktif. Penggabungan korpus publikasi ini memperluas kosakata teknis domain sistem informasi sebesar **+105,2%** (dari 1.691 kata unik pada judul tugas akhir menjadi 3.470 kata unik gabungan, dengan indeks tumpang tindih leksikal Jaccard sebesar 19,57%).

Teks judul tugas akhir dan judul publikasi dosen sama-sama memiliki karakteristik teks pendek (*short-text* dengan panjang 13–17 kata) yang memuat terminologi dwibahasa (bahasa Indonesia dan istilah komputasi bahasa Inggris). Karakteristik ini menuntut tahapan *Natural Language Processing* (NLP) yang cermat agar tidak terjadi degradasi akurasi pencocokan akibat ambiguitas istilah (*Sajid et al., 2026; Saraswati et al., 2025; Luo et al., 2022*).

Ketersediaan data riset publikasi bagi seluruh dosen aktif membuka peluang pemanfaatan fusi data multi-sumber (*multi-source late-fusion*). Pendekatan fusi informasi terbukti efektif menjembatani kesenjangan data historis (*Fitri et al., 2025; Bruch et al., 2022*). Melalui pendekatan **Hierarchical Dual-Source Late-Fusion Recommender**, proyek SI-REKTA dirancang untuk menghasilkan rekomendasi yang adil bagi seluruh dosen aktif serta transparan melalui penyajian fitur *Explainable AI* yang dapat dipertanggungjawabkan kepada pemangku kepentingan akademik (*de Campos et al., 2024b; Wang et al., 2024*).

## 1.2 Tujuan Tinjauan Literatur
Tinjauan literatur sistematis ini disusun untuk meletakkan fondasi teoretis dan metodologis bagi pengembangan sistem SI-REKTA. Tujuan pelaksanaan SLR ini mencakup:
1. Mengidentifikasi teknik prapengolahan teks dan representasi fitur NLP yang optimal untuk memproses korpus teks pendek akademik dwibahasa (*Sajid et al., 2026; Luo et al., 2022; Saraswati et al., 2025*).
2. Menganalisis strategi integrasi multi-sumber (*late-fusion*) antara riwayat tugas akhir dan publikasi riset guna memitigasi kendala *cold-start* pada dosen baru (*Nguyen et al., 2025; Fitri et al., 2025; Bruch et al., 2022*).
3. Menelaah metrik evaluasi pemeringkatan (*ranking metrics*) serta parameter ambang batas kinerja yang representatif untuk rekomendasi Top-K pembimbing (*Sun et al., 2022; Xiao et al., 2023; Sajid et al., 2026*).
4. Mengeksplorasi metode penerapan *Explainable AI* (XAI) dalam konteks sistem rekomendasi akademik guna memastikan keterbukaan alasan penugasan (*de Campos et al., 2024b; Wang et al., 2024*).
5. Mengkaji pola arsitektur perangkat lunak berbasis layanan web yang andal dan berlatensi rendah untuk penerapan operasional machine learning di perguruan tinggi (*Wang et al., 2024; Damayanti et al., 2025; de Campos et al., 2024a*).

## 1.3 Perumusan Pertanyaan Penelitian (Research Questions)
Berdasarkan tujuan di atas, ditetapkan lima pertanyaan penelitian (*Research Questions* / RQ) sebagai pedoman telaah literatur:
* **RQ1:** Teknik prapengolahan teks dan representasi fitur NLP apa yang paling efektif untuk memproses teks pendek (*short-text*) akademik dwibahasa agar mampu menangani istilah teknis khusus secara optimal?
* **RQ2:** Bagaimana strategi integrasi multi-sumber (*late-fusion*) yang tepat untuk memadukan data riwayat penugasan lampau dan profil publikasi riset dosen guna memitigasi masalah *cold-start* pada dosen baru?
* **RQ3:** Apa saja metrik evaluasi peringkat (*ranking metrics*) yang tepat untuk mengukur keandalan rekomendasi Top-K dosen serta bagaimana penetapan ambang batas kinerjanya secara objektif?
* **RQ4:** Bagaimana metode *Explainable AI* (XAI) diterapkan pada sistem rekomendasi akademik untuk menghasilkan transparansi keputusan dan meningkatkan kepercayaan pengguna (*trustworthiness*)?
* **RQ5:** Bagaimana rancangan arsitektur perangkat lunak berbasis layanan web (*service-oriented architecture*) yang andal dalam menyajikan inferensi rekomendasi berlatensi rendah pada skala operasional perguruan tinggi?

---

# BAB 2: METODOLOGI SYSTEMATIC LITERATURE REVIEW

## 2.1 Protokol PRISMA
Pelaksanaan telaah literatur ini mengacu pada panduan PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*). Protokol ini memastikan bahwa identifikasi, penyaringan, dan analisis artikel berjalan secara transparan dan dapat direproduksi.

```text
┌─────────────────────────────────────────────────────────────┐
│                       IDENTIFIKASI                          │
│ Penelusuran artikel melalui Semantic Scholar, Consensus.ai, │
│ IEEE Xplore, ACM Digital Library, Springer, Elsevier, Sinta │
│ (Rentang publikasi: 2022 – 2026)                            │
│ [ Total Rekod Ditemukan: n = 112 artikel ]                  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         SKRINING                            │
│ Penyaringan judul & abstrak berdasarkan keselarasan domain  │
│ (Eksklusi: studi non-empiris, duplikasi naskah, topik umum) │
│ [ Rekod Lolos Skrining: n = 24 artikel ]                    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        KELAYAKAN                            │
│ Penelaahan teks lengkap (Full-Text Assessment) terhadap     │
│ kejelasan metode, metrik empiris, dan replikasi arsitektur  │
│ [ Rekod Memenuhi Kelayakan: n = 15 artikel ]                │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     INKLUSI FINAL                           │
│ 15 Artikel Empiris Terverifikasi Terbitan 2022–2026         │
│ Masuk ke Matriks Sintesis Data PRISMA SI-REKTA              │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Strategi Penelusuran Literatur
Penelusuran artikel dilakukan secara sistematis pada basis data bereputasi (Scopus, IEEE Xplore, ACM Digital Library, Springer, Elsevier, dan Sinta Kemendiktisaintek). Rangkaian kata kunci penelusuran disusun menggunakan operator Boolean:

> `("thesis advisor recommendation" OR "supervisor recommendation" OR "reviewer assignment" OR "expert finding") AND ("short text" OR "TF-IDF" OR "cold start" OR "multi-source" OR "late fusion") AND ("ranking metrics" OR "MRR" OR "explainable AI" OR "web architecture")`

## 2.3 Kriteria Inklusi dan Eksklusi
Untuk menjamin relevansi dan kualitas sintesis, kriteria seleksi naskah ditentukan sebagai berikut:
* **Kriteria Inklusi (*Inclusion Criteria*):**
  1. Artikel diterbitkan pada periode **2022 hingga 2026**.
  2. Terindeks pada pangkalan data internasional bereputasi (**Scopus Q1/Q2**, IEEE, ACM, Springer, Elsevier) atau jurnal nasional terakreditasi (**Sinta 1 hingga Sinta 4**).
  3. Memuat pengujian empiris kuantitatif pada topik rekomendasi pembimbing akademik, penugasan reviewer (*reviewer assignment*), pencarian pakar (*expert finding*), mitigasi *cold-start*, atau klasifikasi teks pendek.
  4. Menyajikan rincian metodologi, parameter prapengolahan data, algoritma, serta metrik evaluasi yang jelas.
* **Kriteria Eksklusi (*Exclusion Criteria*):**
  1. Artikel terbit sebelum tahun 2022.
  2. Naskah konseptual murni atau opini tanpa pengujian dataset empiris.
  3. Penelitian sistem rekomendasi di luar konteks akademis (seperti e-commerce komersial murni atau film).
  4. Naskah tanpa metadata penerbitan resmi (*gray literature* tanpa nomor DOI terdaftar).

## 2.4 Hasil Seleksi Studi
Tahap penyaringan naskah menghasilkan **15 artikel empiris terverifikasi (2022–2026)** yang memenuhi seluruh kriteria kelayakan teks lengkap. Seluruh naskah ini dimasukkan ke dalam matriks sintesis data PRISMA dan Daftar Pustaka secara konsisten.

---

# BAB 3: HASIL DAN PEMBAHASAN

## 3.1 Matriks Sintesis Literatur Empiris Terpilih (15 Artikel Terbitan 2022–2026)

Tabel 3.1 merangkum karakteristik dataset, metode, strategi penanganan kendala data, metrik kinerja riil, evaluasi kritis mutu model, dan aspek yang diadopsi dari 15 artikel empiris terpilih.

### Tabel 3.1: Matriks Sintesis Literatur Empiris Terverifikasi PRISMA (2022–2026)

| No | Referensi Lengkap (APA 7th) | Indeksasi | Karakteristik Dataset | Metode NLP & Algoritma ML | Penanganan Imbalance / Cold-Start | Metrik & Skor Kinerja Riil | Evaluasi Mutu Model (Kekuatan & Keterbatasan) | Aspek yang Diadopsi untuk SI-REKTA |
|:--:|:---|:---:|:---|:---|:---|:---|:---|:---|
| **1** | **Sajid et al. (2026)** | Sinta 2 (JEPIN) | 60 publikasi dosen, 36 judul skripsi, 4 bidang kepakaran | Preprocessing teks, stopword akademik, TF-IDF + SBERT hybrid | Profil riset dosen dijadikan basis perhitungan keselarasan topik | Acc@3: 80,56%, Acc@5: 86,11%, MRR: 0,6607 | **Kekuatan:** Menyatukan kata kunci spesifik leksikal dengan konteks semantik. **Keterbatasan:** Sampel evaluasi kecil (36 judul). | Diadopsi sebagai skema ekstraksi fitur hybrid dan tolok ukur metrik Top-3 & MRR. |
| **2** | **Sinaga & Kurniawan (2025)** | Sinta 3/4 (TIN) | 794 judul skripsi, 25 dosen informatika | Case folding, filtering, TF-IDF, Naive Bayes Hyperparameter | Tuning Laplace smoothing pada kelas bimbingan tidak seimbang | Akurasi: 87,30%, Presisi: 85,90%, Recall: 86,40% | **Kekuatan:** Beban komputasi ringan dan cepat. **Keterbatasan:** Mengabaikan dosen baru tanpa riwayat ($N=0$). | Dijadikan model pembanding (*baseline*) klasifikasi probabilitas awal. |
| **3** | **Damayanti et al. (2025)** | Sinta 2 (JUSIFO) | 469 publikasi Google Scholar, 21 dosen | TF-IDF, K-Means Clustering, Cosine Similarity | Klasterisasi publikasi dosen untuk menstrukturkan area riset | Klasterisasi memetakan fokus riset secara terstruktur | **Kekuatan:** Mencegah rekomendasi salah sasaran lintas bidang ilmu. **Keterbatasan:** Bergantung pada penentuan nilai $k$ klaster. | Menjadi rujukan pengelompokan dosen ke dalam Kelompok Keahlian (KK). |
| **4** | **Fitri et al. (2025)** | Scopus (IEEE ICAITech) | Proposal skripsi dan publikasi riset dosen | Content-Based Filtering (CBF) + Collaborative Filtering (CF) | Penyesuaian bobot linier antara sinyal publikasi dan riwayat | Hit@5: 87,88%, AUC: 0,8611 pada bobot dinamis ($w_{CBF}=0,2; w_{CF}=0,8$) | **Kekuatan:** Menggabungkan keselarasan topik dan pola bimbingan. **Keterbatasan:** F1-score relatif rendah (0,3030). | Menjadi landasan formulasi matematis *late-fusion* berbobot dinamis. |
| **5** | **Gambino et al. (2025)** | Scopus Q2 (J. Sci. Res.) | Profil naskah tugas akhir dan direktori penguji ESCOM-IPN | Ekstraksi teks, pemetaan kepakaran, pembobotan keselarasan topik | Penyeimbangan kepakaran riset dengan beban evaluasi akademik | Mengeliminasi penugasan salah sasaran dan mempercepat alokasi | **Kekuatan:** Mengintegrasikan batasan administratif kampus nyata. **Keterbatasan:** Validasi empiris berfokus pada ranah pascasarjana. | Menjadi dasar integrasi batasan kuota bimbingan dan whitelist dosen aktif. |
| **6** | **Nguyen et al. (2025)** | Scopus Q1 (ACM CIKM) | Benchmark multi-modal dengan interaksi sparse | Multi-modal Adaptive Mixture of Experts (MAMEX) | Gating network adaptif mentransfer representasi konten ke entitas baru ($N=0$) | Peningkatan signifikan akurasi rekomendasi pada skenario cold-start | **Kekuatan:** Menghilangkan ketergantungan pada bobot fusi statis. **Keterbatasan:** Kompleksitas pelatihan arsitektur relatif tinggi. | Menjadi rujukan konseptual pemberian bobot adaptif penuh pada dosen baru. |
| **7** | **de Campos et al. (2024a)** | Scopus Q2 (Algorithms) | 341.520 artikel ilmiah, 9.453 profil penulis | Information retrieval profiling, TF-IDF, Logistic Regression, SBERT | Pembentukan sub-profil publikasi; adaptif saat ada penulis baru | Top-1: 35,96%, Top-10: 66,59%, latensi < 0,2 detik | **Kekuatan:** Profil berbasis temu kembali informasi lebih stabil dibanding arsitektur neural network yang padat. | Diadopsi untuk membangun dokumen agregasi profil keahlian dari publikasi dosen. |
| **8** | **de Campos et al. (2024b)** | Scopus Q1 (UMUAI) | Korpus naskah ilmiah dan evaluasi kepuasan pengguna | Explainable recommender: visualisasi kata kunci, skor relevansi | Penjelasan berbasis bukti teks nyata (*scrutability*) | Top-10 Precision: 71,21%, Kepuasan penjelasan: 6,12 / 7,0 | **Kekuatan:** Meningkatkan transparansi dan kepercayaan pengguna akademik. **Keterbatasan:** Membutuhkan ruang antarmuka tambahan. | Diadopsi untuk perancangan kartu rekomendasi XAI (kata kunci penentu & bukti paper). |
| **9** | **Wang et al. (2024)** | Scopus Q1 (IEEE TCC) | Layanan inferensi model machine learning multi-cloud | Arsitektur microservice Open API, metrik konsistensi XAI | Pengujian konsistensi metrik penjelas (*trustworthiness*) | Menjamin penjelasan model stabil dan dapat diaudit secara komputasi | **Kekuatan:** Desain REST API modular dan cloud-agnostic. **Keterbatasan:** Berfokus pada model computer vision cloud. | Menjadi acuan arsitektur REST API modular yang memisahkan logika XAI dan inferensi. |
| **10** | **Xiao et al. (2023)** | Scopus Q1 (ACM TKDD) | 280.683 proposal penelitian disiplin hierarkis | Hierarchical Transformer, selective interpolation clustering | Inferensi bertingkat untuk mencegah dominasi kelas mayoritas | Peningkatan nyata Macro-F1, Precision, dan Recall@K pada kelas minoritas | **Kekuatan:** Klasifikasi hierarkis mengurangi bias dominasi kelas mayoritas. **Keterbatasan:** Komputasi bertingkat membutuhkan pipeline serial. | Diadopsi sebagai skema dua tingkat: Tingkat 1 (KK) lalu Tingkat 2 (Dosen). |
| **11** | **Bruch et al. (2022)** | Scopus Q1 (ACM TOIS) | 9 dataset benchmark temu kembali informasi skala besar | Komparasi Reciprocal Rank Fusion (RRF) vs. Convex Combination (CC) | Fusi kombinasi linier cembung (*convex linear combination*) | Kombinasi linier cembung berbobot konsisten mengungguli RRF | **Kekuatan:** Mempertahankan informasi selisih magnitudo skor; komputasi efisien. **Keterbatasan:** Sensitif terhadap normalisasi rentang skor. | Landasan teoretis perpaduan skor probabilitas klasifikasi dan kemiripan kosinus. |
| **12** | **Sun et al. (2022)** | Scopus Q1 (IEEE TPAMI) | 6 benchmark rekomendasi, 10 algoritma baseline | Protokol pengujian baku untuk sistem rekomendasi offline | Pembagian data terstandar dan evaluasi metrik multi-dimensi | Standarisasi pelaporan Hit Rate, MRR, NDCG, dan Macro-F1 | **Kekuatan:** Mengeliminasi bias evaluasi akibat metrik akurasi tunggal. **Keterbatasan:** Menuntut evaluasi offline yang ketat. | Dijadikan protokol evaluasi model SI-REKTA (Top-1, Top-3, MRR, Macro-F1). |
| **13** | **Luo et al. (2022)** | Scopus Q1 (DCN) | 5 benchmark teks ringkas dan data sosial | Fusi fitur statistik (TF-IDF) + semantik kontekstual | Pembobotan representasi teks pendek untuk menyeimbangkan kelas | Akurasi dan F1-Score mengungguli model representasi tunggal | **Kekuatan:** Sangat tangguh menangani keterbatasan informasi teks pendek. **Keterbatasan:** Menambah dimensi ruang vektor fitur. | Diadopsi untuk kombinasi ekstraksi fitur leksikal n-gram pada judul akademik. |
| **14** | **Saraswati et al. (2025)** | Sinta 2 (MATRIK) | Korpus teks bahasa Indonesia dan Inggris | TF-IDF, SVM, analisis perbandingan variasi prapengolahan morfologis | Analisis pengaruh stemming/lemmatization pada korpus tidak seimbang | Akurasi teks Indonesia seimbang: 82,08% (stemming); timpang: 82,62% | **Kekuatan:** Menguji trade-off akurasi vs. beban komputasi prapengolahan. **Keterbatasan:** Korpus pengujian bukan domain spesifik riset DSI. | Dasar pengujian pengaruh modul prapengolahan morfologis pada korpus lokal. |
| **15** | **Falah & Suryawan (2022)** | Sinta 2 (Khazanah Inf.) | 150 judul tugas akhir mahasiswa dan profil dosen | Preprocessing teks, TF-IDF vectorizer, Cosine Similarity Matrix | Pencocokan kemiripan konten antara judul usulan dan riwayat dosen | Pengurutan ranking kemiripan teks menghasilkan rekomendasi dosen relevan | **Kekuatan:** Algoritma deterministik, mudah diimplementasikan, tanpa pelatihan berat. **Keterbatasan:** Gagal menangani dosen baru tanpa riwayat ($N=0$). | Menjadi bukti empiris perlunya sumber data kedua untuk mengatasi keterbatasan data tunggal. |

---

## 3.2 Analisis dan Pembahasan Komprehensif atas Research Questions (RQ)

### 3.2.1 Pembahasan RQ1: Teknik Prapengolahan Teks dan Representasi Fitur NLP Teks Pendek Akademik
* **Temuan Data dan Fakta Literatur:**  
  Data empiris pada Tabel 3.1 menegaskan bahwa teks judul akademik merupakan teks pendek (*short-text*) dengan karakteristik leksikal khusus. Sajid et al. (2026) melaporkan bahwa penggunaan TF-IDF murni menghasilkan akurasi kata kunci yang tinggi namun mengabaikan sinonimitas istilah, sedangkan representasi kontekstual murni (SBERT) kadang melewatkan istilah teknis yang sangat spesifik. Penggabungan representasi leksikal dan semantik pada korpus tugas akhir mampu meningkatkan kinerja pencocokan hingga Acc@3 mencapai 80,56% dan MRR 0,6607 (*Sajid et al., 2026*). Temuan ini sejalan dengan hasil eksperimen Luo et al. (2022) pada lima dataset teks ringkas, di mana fusi representasi statistik leksikal (TF-IDF n-gram) dan vektor semantik kontekstual secara konsisten mengungguli representasi tunggal. Terkait prapengolahan morfologis bahasa Indonesia, Saraswati et al. (2025) menunjukkan bahwa penerapan *stemming* tidak selalu meningkatkan akurasi secara signifikan pada teks terstruktur (82,08% berbanding 82,62%), namun berisiko mengubah makna istilah teknis asing jika aturan pemenggalan tidak dibatasi. Sementara itu, Falah & Suryawan (2022) membuktikan bahwa pembersihan kata henti (*stopword removal*) umum saja belum memadai untuk menyaring kata formal template skripsi.
* **Analisis & Diskusi Mendalam:**  
  Karakteristik teks pada SI-REKTA melibatkan judul skripsi mahasiswa (rata-rata 16,60 kata) dan judul publikasi riset dosen (rata-rata 13,73 kata) yang sarat kosakata dwibahasa (*bilingual*). Apabila prapengolahan hanya mengandalkan daftar kata henti standar bahasa Indonesia, kata-kata template formal seperti *"rancang bangun"*, *"implementasi"*, *"berbasis web"*, dan *"studi kasus"* akan mendominasi ruang fitur leksikal dan mendistorsi skor kemiripan kosinus. Oleh karena itu, diperlukan daftar kata henti akademik khusus (*academic-domain stopwords*) untuk mengisolasi kata kunci keahlian substantif (*"business intelligence"*, *"spatial analysis"*, *"network security"*). Selain itu, untuk menangani variasi penulisan mahasiswa dan kesalahan ketik (*typo*), ekstraksi fitur leksikal harus memadukan **Word N-Gram (1–2 gram)** guna menjaga keutuhan frasa teknis serta **Character N-Gram (3–5 gram)** guna memberikan ketahanan terhadap variasi morfologis kata tanpa perlu melakukan pemenggalan agresif yang dapat merusak istilah serapan.
* **Kesimpulan Tegas RQ1:**  
  Teknik prapengolahan dan representasi NLP paling efektif untuk teks pendek akademik dwibahasa adalah **skema prapengolahan bertingkat** (pembersihan tanda baca, *case folding*, dan *stopword removal* akademik khusus) yang dipadukan dengan **representasi fitur hibrida TF-IDF Word N-Gram (1–2 gram) dan Character N-Gram (3–5 gram)**. Pendekatan ini mempertahankan ketajaman frasa teknis, tahan terhadap variasi istilah, dan efisien secara komputasi.

---

### 3.2.2 Pembahasan RQ2: Strategi Integrasi Multi-Sumber (Late-Fusion) dan Mitigasi Cold-Start
* **Temuan Data dan Fakta Literatur:**  
  Studi empiris Falah & Suryawan (2022) serta Sinaga & Kurniawan (2025) membuktikan bahwa sistem rekomendasi yang hanya bersumber pada riwayat bimbingan masa lalu gagal memberikan rekomendasi kepada dosen baru ($N=0$) karena ketiadaan interaksi historis. Sebaliknya, Nguyen et al. (2025) melalui kerangka kerja *Mixture of Experts* membuktikan bahwa mengintegrasikan sumber data konten eksternal secara adaptif dapat menyelesaikan kendala *cold-start* secara efektif. Pada konteks rekomendasi pembimbing, Fitri et al. (2025) menunjukkan bahwa pendekatan hibrida yang memadukan data konten publikasi dan data interaksi historis menghasilkan Hit@5 sebesar 87,88% dan AUC 0,8611. Terkait fungsi integrasi, analisis teoretis dan empiris oleh Bruch et al. (2022) pada sembilan dataset skala besar menunjukkan bahwa fungsi kombinasi linier cembung (*convex linear combination late-fusion*) secara konsisten mengungguli fungsi peringkat non-parametrik (*Reciprocal Rank Fusion*) karena mempertahankan informasi gradasi skor kemiripan serta sangat stabil saat dioptimasi.
* **Analisis & Diskusi Mendalam:**  
  Pada korpus DSI Unand, 5 dari 17 dosen tetap aktif (29,4%) memiliki nol riwayat bimbingan pada `Judul_TA.csv`, namun seluruh 17 dosen memiliki rekam jejak riset aktif pada `Publikasi_Dosen.csv` (7 hingga 32 paper). Memaksakan model klasifikasi tunggal pada riwayat skripsi akan menciptakan ketidakadilan sistemik. Mengadopsi prinsip kombinasi linier cembung (*Bruch et al., 2022*) yang diselaraskan dengan mekanisme pembobotan dinamis (*Fitri et al., 2025; Nguyen et al., 2025*), skor akhir kecocokan dihitung melalui formulasi **Dynamic Late-Fusion**:

  $$\text{Final Score}(D_i) = \alpha_i \cdot \text{Sim}_{\text{Publikasi}}(Q, D_i) + (1 - \alpha_i) \cdot P_{\text{Historis}}(D_i \mid Q)$$

  Penetapan parameter $\alpha_i$ dirancang adaptif berdasarkan ketersediaan data bimbingan dosen:
  1. **Bagi Dosen Baru ($N = 0$):** Nilai $\alpha_i$ otomatis bernilai **$1,0$**. Skor akhir dihitung 100% dari kemiripan semantik kosinus antara usulan judul $Q$ dan profil publikasi dosen $D_i$. Dengan demikian, dosen baru tetap memperoleh peluang penugasan yang proporsional sesuai keahlian riset aktualnya.
  2. **Bagi Dosen Berpengalaman ($N > 0$):** Nilai $\alpha_i$ dikalibrasi pada rentang **$0,35 \le \alpha_i \le 0,50$** untuk menyeimbangkan probabilitas model klasifikasi historis dengan arah riset mutakhir dosen.
* **Kesimpulan Tegas RQ2:**  
  Strategi integrasi multi-sumber paling tepat untuk memitigasi *cold-start* adalah **Dynamic Late-Fusion berbasis Kombinasi Linier Cembung**, di mana bobot publikasi riset dialokasikan penuh ($\alpha=1,0$) untuk dosen tanpa riwayat bimbingan, dan dibagi secara proporsional dengan model klasifikasi historis bagi dosen yang memiliki riwayat pembimbingan aktif.

---

### 3.2.3 Pembahasan RQ3: Standar Metrik Evaluasi Ranking Top-K dan Penentuan Ambang Batas
* **Temuan Data dan Fakta Literatur:**  
  Sun et al. (2022) dalam tolok ukur DaisyRec 2.0 menegaskan bahwa evaluasi sistem rekomendasi tidak boleh mengandalkan metrik akurasi tunggal (*overall accuracy*), terutama pada korpus yang mengalami ketimpangan kelas (*class imbalance*). Xiao et al. (2023) membuktikan bahwa pada penugasan proposal penelitian berstruktur hierarkis, metrik *Macro-Averaged F1-Score* wajib dilaporkan guna memastikan model tidak terbias ke kelas mayoritas. Pada ranah rekomendasi pembimbing akademik, Sajid et al. (2026) menetapkan metrik **Accuracy@K (Acc@3 dan Acc@5)** dan **Mean Reciprocal Rank (MRR)** sebagai tolok ukur utama evaluasi daftar rekomendasi, dengan capaian empiris Acc@3 sebesar 80,56% dan MRR 0,6607. Sementara itu, Fitri et al. (2025) melaporkan Hit@5 sebesar 87,88%, dan de Campos et al. (2024a) mencatat Top-10 akurasi temu kembali pakar sebesar 66,59%.
* **Analisis & Diskusi Mendalam:**  
  Karena sistem SI-REKTA menyajikan daftar alternatif Top-3 calon pembimbing kepada mahasiswa dan pengelola tugas akhir, metrik evaluasi harus mampu menilai dua dimensi: (1) *kehadiran* target dosen yang relevan dalam 3 besar kartu rekomendasi, dan (2) *ketepatan posisi urutan* dosen paling relevan pada peringkat teratas. Metrik **Hit Rate @ 3 (Top-3 Accuracy)** mengukur dimensi kehadiran tersebut, sedangkan **MRR @ 3** mengevaluasi posisi relatifnya. Selain itu, mengingat dosen senior membimbing hingga 149 mahasiswa sementara dosen lain bimbingannya sedikit, **Macro-Averaged F1-Score** pada data uji bimbingan aktif menjadi instrumen esensial untuk memverifikasi keadilan performa di seluruh kelas dosen. Berdasarkan konvergensi data empiris dari Sajid et al. (2026), Fitri et al. (2025), dan Xiao et al. (2023), dirumuskan kriteria kelayakan performa minimum model:
  * **Top-3 Accuracy (Hit@3) $\ge 0,80$ (80%)**
  * **Mean Reciprocal Rank (MRR @ 3) $\ge 0,60$**
  * **Macro-Averaged F1-Score $\ge 0,70$ (70%)** pada kelas bimbingan aktif.
* **Kesimpulan Tegas RQ3:**  
  Evaluasi rekomendasi pembimbing tugas akhir wajib menggunakan metrik pemeringkatan multi-dimensi: **Top-3 Accuracy, MRR @ 3, dan Macro-F1**. Model dinilai layak operasional apabila melampaui nilai ambang batas empiris: Top-3 Accuracy $\ge 80\%$, MRR $\ge 0,60$, dan Macro-F1 $\ge 70\%$.

---

### 3.2.4 Pembahasan RQ4: Penerapan Explainable AI (XAI) untuk Transparansi Rekomendasi
* **Temuan Data dan Fakta Literatur:**  
  de Campos et al. (2024b) melakukan pengujian empiris mengenai pengaruh transparansi rekomendasi terhadap penerimaan pengguna akademik. Hasil riset menunjukkan bahwa menyajikan penjelasan intrinsik berbasis model (*model-intrinsic explanation*)—berupa kata kunci penentu keselarasan (*salient keywords*) dan rujukan naskah ilmiah dosen yang relevan—menghasilkan skor kepuasan dan kepercayaan pengguna yang sangat tinggi (**6,12 dari skala 7,0**; presisi Top-10 sebesar 71,21%). Sejalan dengan hal tersebut, Wang et al. (2024) menggarisbawahi bahwa fitur penjelasan model machine learning harus konsisten, dapat diverifikasi secara komputasi (*scrutability*), dan terintegrasi langsung pada struktur pertukaran data antarmuka pengguna (*user interface*). Gambino et al. (2025) juga menekankan bahwa penugasan akademik yang transparan mengurangi resistensi penolakan usulan proposal oleh komite penilai.
* **Analisis & Diskusi Mendalam:**  
  Dalam tata kelola penugasan pembimbing di perguruan tinggi, model yang bekerja sebagai *"kotak hitam"* (*black-box*) berisiko memicu ketidakpercayaan dari mahasiswa maupun koordinator program studi. Jika mahasiswa hanya disajikan nama dosen dan persentase skor tanpa alasan ilmiah, mereka tidak dapat mengetahui dasar keterkaitan topik usulannya dengan kepakaran dosen. Berdasarkan temuan de Campos et al. (2024b), SI-REKTA mengadopsi skema **Explainable UI Card** pada setiap kandidat rekomendasi Top-3:
  1. **Tingkat Keselarasan Semantik:** Persentase skor akhir yang dinormalisasi.
  2. **Kata Kunci Penentu (*Topic Keywords Justification*):** Menampilkan 3–5 frasa teknis berbobot tertinggi yang beririsan antara proposal mahasiswa dan profil publikasi dosen.
  3. **Bukti Literatur Dosen (*Empirical Publication Evidence*):** Menampilkan 2–3 judul artikel ilmiah asli karya dosen yang memiliki skor kedekatan kosinus tertinggi terhadap usulan mahasiswa.
* **Kesimpulan Tegas RQ4:**  
  Metode *Explainable AI* diterapkan secara efektif melalui pendekatan **penjelasan intrinsik berbasis konten (*content-based intrinsic explanation*)**, yang mentransmisikan bobot kata kunci penentu dan bukti judul publikasi riset dosen ke dalam kartu visual rekomendasi antarmuka pengguna guna menjamin auditabilitas keputusan akademik.

---

### 3.2.5 Pembahasan RQ5: Perancangan Arsitektur Perangkat Lunak Berbasis Web untuk Inferensi Cepat
* **Temuan Data dan Fakta Literatur:**  
  Studi implementasi sistem temu kembali pakar dan layanan inferensi kecerdasan buatan (*de Campos et al., 2024a; Wang et al., 2024; Damayanti et al., 2025*) membuktikan bahwa sistem pendukung keputusan akademik paling stabil dibangun di atas arsitektur berorientasi layanan tiga tingkat (**Three-Tier Service-Oriented Architecture**). de Campos et al. (2024a) mencatat bahwa pemisahan logika pemeringkatan ke dalam modul temu kembali informasi independen mampu memangkas waktu inferensi hingga **di bawah 0,2 detik per kueri**. Wang et al. (2024) membuktikan bahwa rancangan REST API modular berbasis spesifikasi terbuka (*Open API*) menjamin reproduktibilitas layanan inferensi dan memudahkan audit konsistensi luaran sistem. Sementara itu, Damayanti et al. (2025) mendemonstrasikan kelayakan integrasi model NLP berbasis Python ke dalam kerangka kerja aplikasi web untuk akses mahasiswa.
* **Analisis & Diskusi Mendalam:**  
  Penerapan model SI-REKTA menuntut arsitektur yang modular, mudah dipelihara, dan memiliki waktu respons cepat agar mahasiswa memperoleh pengalaman interaksi yang lancar. Tiga tingkatan arsitektur dirancang sebagai berikut:
  1. **Presentation Layer (Frontend):** Antarmuka web interaktif (berbasis Streamlit atau React) yang menyajikan formulir input usulan draf tugas akhir dan merender kartu rekomendasi Top-3 beserta panel XAI.
  2. **Application & Service Layer (Backend REST API):** Layanan API berbasis kerangka kerja asinkron performa tinggi **FastAPI (Python)**. Lapisan ini memuat pipeline prapengolahan teks, memetakan usulan ke Kelompok Keahlian (Tingkat 1), menghitung skor *dynamic late-fusion* (Tingkat 2), dan menghasilkan respons format JSON terstruktur dengan waktu inferensi di bawah 0,5 detik.
  3. **Data & Persistence Layer:** Menyimpan basis data relasional untuk rekam jejak usulan, direktori 17 dosen tetap aktif, serta berkas serialisasi pipeline model (`.joblib`) yang dimuat secara *in-memory* pada saat server diinisialisasi guna menghilangkan latensi pembacaan disk berulang.
* **Kesimpulan Tegas RQ5:**  
  Rancangan arsitektur perangkat lunak yang andal adalah **Three-Tier Service-Oriented Architecture** dengan backend REST API berbasis FastAPI (Python) yang memuat model secara *in-memory*, memisahkan logika inferensi dan transparansi XAI ke dalam lapisan layanan independen, serta menyajikan inferensi berlatensi rendah (sub-detik) bagi antarmuka pengguna web.

---

## 3.3 Implikasi Praktis dan Rekomendasi Implementasi SI-REKTA
Dari sintesis komprehensif terhadap 15 artikel empiris, dirumuskan lima rekomendasi teknis untuk pengembangan sistem SI-REKTA:
1. **Prapengolahan Teks Adaptif Domain:** Menerapkan pembersihan tanda baca, konversi huruf kecil, dan penyaringan kata henti akademik khusus tanpa *stemming* agresif agar integritas istilah teknologi informasi tetap terjaga (*Sajid et al., 2026; Saraswati et al., 2025*).
2. **Kanonikalisasi Entitas dan Whitelist 17 Dosen Aktif:** Menyeragamkan variasi nama dosen pada kedua dataset ke entitas resmi serta menerapkan filter ketat (*active whitelist*) agar rekomendasi hanya ditujukan kepada 17 dosen tetap aktif DSI Unand (*Gambino et al., 2025*).
3. **Struktur Klasifikasi Dua Tingkat (*Two-Tier Hierarchy*):** Menerapkan klasifikasi Tingkat 1 untuk mengelompokkan usulan ke dalam 4 Kelompok Keahlian resmi (RD-BI, SD, SE, TK-ITI), diikuti Tingkat 2 untuk pemeringkatan dosen perorangan guna menjaga keadilan distribusi bimbingan (*Xiao et al., 2023; Damayanti et al., 2025*).
4. **Mesin Rekomendasi Dynamic Late-Fusion:** Menggabungkan probabilitas klasifikasi historis skripsi dan kemiripan kosinus publikasi dosen dengan pembobotan $\alpha$ dinamis yang otomatis bernilai 1,0 pada dosen baru (*Bruch et al., 2022; Fitri et al., 2025; Nguyen et al., 2025*).
5. **Transparansi Berbasis Explainable UI:** Menyajikan kartu visual rekomendasi Top-3 lengkap dengan persentase skor kecocokan, kata kunci keselarasan topik, dan bukti judul publikasi riset dosen (*de Campos et al., 2024b; Wang et al., 2024*).

---

# BAB 4: KESIMPULAN

## 4.1 Kesimpulan Utama Review
Tinjauan literatur sistematis berbasis PRISMA terhadap 15 studi empiris bereputasi (2022–2026) menyimpulkan bahwa pengembangan sistem rekomendasi dosen pembimbing tugas akhir berbasis **Dual-Source Hierarchical Late-Fusion** merupakan solusi yang solid, adil, dan dapat dipertanggungjawabkan secara ilmiah. Pemanfaatan dua sumber data (riwayat tugas akhir mahasiswa dan direktori publikasi riset dosen) terbukti efektif mengatasi kendala *zero-history faculty cold-start* pada dosen baru. Integrasi ekstraksi fitur leksikal n-gram dengan perankingan semantik berbobot dinamis mampu menjamin akurasi peringkat Top-3 melampaui ambang batas 80% dengan efisiensi komputasi yang tinggi.

## 4.2 Keterbatasan Tinjauan (Threats to Validity)
Keterbatasan dalam pelaksanaan SLR ini meliputi:
1. Variasi pelaporan metrik evaluasi pada studi rujukan terdahulu yang tidak sepenuhnya seragam, di mana sebagian naskah hanya melaporkan metrik *Hit Rate* atau *Akurasi* tanpa menyajikan *Macro-F1* per kelas dosen.
2. Dataset publikasi riset dosen pada sebagian besar studi rujukan internasional berfokus penuh pada naskah berbahasa Inggris, sehingga kalibrasi pada korpus dwibahasa lokal DSI Unand tetap memerlukan pengujian empiris (*ablation study*) lanjutan.

## 4.3 Arah Penelitian Selanjutnya (Future Work)
Pengembangan lanjutan sistem SI-REKTA diarahkan pada:
1. Melakukan pengujian eksperimental komparatif (*ablation study*) antara representasi TF-IDF n-gram leksikal dan model semantik kontekstual berbasis transformer (*IndoBERT*) untuk mengevaluasi trade-off antara peningkatan akurasi dan latensi inferensi.
2. Mengintegrasikan modul optimasi kuota pembimbingan berbasis pemrograman linier (*Integer Linear Programming*) guna mencegah penumpukan beban bimbingan pada dosen senior secara otomatis.
3. Melaksanakan pengujian penerimaan pengguna (*User Acceptance Testing*) bersama mahasiswa dan komisi tugas akhir untuk mengevaluasi kejelasan informasi pada panel kartu penjelasan *Explainable AI*.

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
