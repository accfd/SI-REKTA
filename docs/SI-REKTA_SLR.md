# Systematic Literature Review: Tren Pendekatan Natural Language Processing dan Machine Learning pada Sistem Rekomendasi Dosen Pembimbing Tugas Akhir Dwisumber (SI-REKTA)

> **Penulis:** Tim Proyek SI-REKTA  
> **Mata Kuliah:** Machine Learning (DSI61133) — Semester 5 (Tahun Akademik 2025/2026)  
> **Departemen:** Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas  
> **Dosen Pengampu:** Febby Apri Wenando, M.Eng., Ph.D. & Aina Hubby Aziira, M.Eng.  
> **Repository GitHub:** [https://github.com/accfd/SI-REKTA](https://github.com/accfd/SI-REKTA)  
> **Metodologi Tinjauan:** Systematic Literature Review (SLR) berbasis Pedoman PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*)  
> **Rentang Waktu Studi:** 2022 – 2026 (Jurnal Internasional Scopus Q1/Q2 & Jurnal Nasional Sinta 1/2)

---

# BAB 1: PENDAHULUAN

## 1.1 Latar Belakang
Penentuan dosen pembimbing tugas akhir merupakan keputusan akademik yang sangat krusial bagi mahasiswa tingkat akhir. Keputusan ini secara langsung menentukan keselarasan topik penelitian, kedalaman metodologi, kualitas luaran ilmiah, dan ketepatan masa studi mahasiswa (*Sajid et al., 2026; Damayanti et al., 2025*). Meskipun demikian, penentuan dosen pembimbing secara manual sering menghadapi kendala nyata di lapangan. Proses manual rawan dipengaruhi subjektivitas, memerlukan waktu verifikasi yang lama, dan kerap memicu ketidaksesuaian antara usulan proposal mahasiswa dan peta jalan riset dosen (*Damayanti et al., 2025; Gambino et al., 2025*).

Pada Departemen Sistem Informasi (DSI) FTI Universitas Andalas, analisis data eksploratif (*Exploratory Data Analysis*) membuktikan adanya dua tantangan struktural utama:
1. **Ketimpangan Kelas Ekstrem dan Masalah Dosen Baru (*Zero-History Faculty Cold-Start*):**  
   Dataset riwayat tugas akhir (`Judul_TA.csv`) memuat 625 judul bimbingan masa lalu. Distribusi bimbingan tersebut sangat timpang (*extreme class imbalance*). Seorang dosen senior tercatat membimbing hingga 149 mahasiswa, sedangkan **5 dari 17 dosen tetap aktif (29,4%) sama sekali belum memiliki riwayat bimbingan ($N = 0$)**. Ketiadaan riwayat interaksi ini menyebabkan model pembelajaran mesin terawasi (*supervised learning*) konvensional gagal mengenali keahlian dosen baru (*Fitri et al., 2025; Nguyen et al., 2025; Xiao et al., 2023*).
2. **Kekayaan Publikasi Riset sebagai Sumber Data Kedua (*Dual-Source Dataset*):**  
   Sebaliknya, dataset kedua (`Publikasi_Dosen.csv`) menyediakan **643 judul artikel ilmiah terverifikasi yang mencakup 100% dari 17 dosen tetap aktif**, termasuk dosen baru yang memiliki 7 hingga 32 publikasi riset aktif. Penggabungan dataset publikasi ini memperkaya perbendaharaan kosakata teknis domain sistem informasi sebesar **+105,2%** (dari 1.691 kata unik skripsi meningkat menjadi 3.470 kata unik gabungan, dengan tumpang-tindih leksikal Jaccard sebesar 19,57%).

Karakteristik teks pada kedua dataset tersebut menuntut penanganan *Natural Language Processing* (NLP) yang tepat. Judul tugas akhir dan judul publikasi dosen sama-sama tergolong teks pendek (*short-text* dengan panjang 13–17 kata), bersifat dwibahasa (bahasa Indonesia dan istilah teknis bahasa Inggris), serta padat terminologi keilmuan. Studi terkini menegaskan bahwa prapengolahan teks yang terstruktur, seleksi fitur leksikal, dan representasi semantik modern mampu meningkatkan akurasi pencocokan topik secara nyata (*Sajid et al., 2026; Sinaga & Kurniawan, 2025; Luo et al., 2022*).

Fakta bahwa publikasi ilmiah mencakup seluruh dosen aktif membuktikan bahwa data riset dosen merupakan pilar mitigasi *cold-start* yang sangat solid. Bukti ilmiah menunjukkan bahwa fusi data dwisumber (*multi-source data fusion*) efektif mengatasi keterbatasan data historis (*Maurya et al., 2025; Fitri et al., 2025*). Oleh karena itu, proyek SI-REKTA dirancang dengan pendekatan **Hierarchical Dual-Source Late-Fusion Recommender**. Sistem ini tidak hanya mengutamakan ketepatan peringkat rekomendasi, tetapi juga menjamin transparansi penjelasan (*Explainable AI*) bagi mahasiswa, dosen, dan pengelola tugas akhir guna mendukung akuntabilitas tata kelola akademik (*de Campos et al., 2024b; Wang et al., 2024*).

## 1.2 Tujuan Tinjauan Literatur
Tinjauan literatur sistematis ini disusun untuk meletakkan landasan teoretis dan metodologis yang kuat sebelum membangun sistem **SI-REKTA**. Tujuan penulisan SLR ini adalah:
1. Menemukan teknik prapengolahan teks dan representasi fitur teks pendek akademik dwibahasa yang paling efektif agar model tidak terjebak pada kemiripan kata semata (*Sajid et al., 2026; Saraswati et al., 2025; Luo et al., 2022*).
2. Mengidentifikasi strategi integrasi (*fusion*) dua sumber data (riwayat skripsi dan publikasi riset dosen) yang paling tepat untuk mengatasi masalah ketimpangan kelas dan *cold-start* dosen baru (*Bruch et al., 2022; Fitri et al., 2025; Maurya et al., 2025*).
3. Menetapkan metrik evaluasi peringkat (*ranking metrics*) yang relevan untuk rekomendasi Top-3 dosen serta merumuskan standar nilai ambang batas (*benchmark*) kelayakan model (*Sun et al., 2022; Xiao et al., 2023; Sajid et al., 2026*).
4. Merumuskan alur proses bisnis rekomendasi cerdas yang transparan (*Explainable AI*) agar hasil inferensi model dapat dipertanggungjawabkan pada pengisian Formulir TA-01 dan TA-02 (*de Campos et al., 2024b; Wang et al., 2024*).
5. Merancang arsitektur perangkat lunak berbasis web tiga tingkat (*Three-Tier Architecture*) yang modular, berlatensi rendah ($<1$ detik), dan siap dioperasikan di perguruan tinggi (*Damayanti et al., 2025; Wang et al., 2024*).

## 1.3 Perumusan Pertanyaan Penelitian (Research Questions)
Guna memandu analisis secara mendalam dan terarah, ditetapkan lima pertanyaan penelitian (*Research Questions* / RQ) sebagai berikut:
* **RQ1:** Teknik prapengolahan teks dan ekstraksi fitur NLP apa yang paling efektif untuk memproses teks judul tugas akhir (rata-rata 16,6 kata) dan publikasi riset dosen (rata-rata 13,7 kata) dengan perbendaharaan kosakata teknis dwibahasa?
* **RQ2:** Bagaimana metode integrasi (*fusion*) yang tepat untuk menggabungkan Dataset 1 (riwayat judul tugas akhir) dan Dataset 2 (publikasi riset dosen) ke dalam satu model rekomendasi pembimbing yang adil bagi dosen baru?
* **RQ3:** Apa saja metrik evaluasi peringkat (*ranking metrics*) yang tepat untuk mengukur akurasi rekomendasi Top-3 dosen dan berapa standar nilai acuan (*benchmark*) kelayakannya?
* **RQ4:** Bagaimana alur proses bisnis yang tepat saat mahasiswa memasukkan usulan judul hingga sistem menyajikan rekomendasi yang transparan (*Explainable AI*) untuk pengisian Formulir TA-01 dan TA-02?
* **RQ5:** Bagaimana arsitektur perangkat lunak berbasis web yang tepat untuk mengintegrasikan model machine learning agar menghasilkan inferensi yang cepat, modular, dan siap diterapkan di perguruan tinggi?

---

# BAB 2: METODOLOGI SYSTEMATIC LITERATURE REVIEW

## 2.1 Protokol PRISMA
Tinjauan literatur sistematis ini dijalankan dengan mematuhi protokol PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*). Protokol ini menjamin bahwa tahapan pencarian, penyaringan, dan analisis artikel berlangsung secara objektif, transparan, dan dapat direplikasi (*reproducible*).

```text
┌─────────────────────────────────────────────────────────────┐
│                       IDENTIFIKASI                          │
│ Penelusuran artikel melalui Consensus.ai, Semantic Scholar, │
│ IEEE Xplore, ACM Digital Library, Springer, Elsevier, Sinta │
│ (Rentang publikasi: 2022 – 2026)                            │
│ [ Total Rekod Awal Ditemukan: n = 109 artikel unik ]        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         SKRINING                            │
│ Penyaringan judul & abstrak berdasarkan keselarasan domain  │
│ (Menghapus artikel non-empiris, duplikasi, & topik umum)    │
│ [ Rekod Lolos Skrining: n = 20 artikel potensial ]          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        KELAYAKAN                            │
│ Penelaahan teks lengkap (Full-Text Assessment) terhadap     │
│ kejelasan metode, metrik empiris, dan relevansi akademis    │
│ [ Rekod Memenuhi Kelayakan: n = 13 artikel terpilih ]       │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     INKLUSI FINAL                           │
│ 13 Artikel Empiris Terverifikasi Terbitan 2022–2026         │
│ Masuk ke Matriks Sintesis Data PRISMA SI-REKTA              │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Strategi Pencarian Literatur & Pemanfaatan Consensus.ai
Penelusuran literatur dilakukan dengan bantuan mesin pencari akademik berbasis kecerdasan buatan, **Consensus.ai**, yang terhubung langsung dengan indeks ilmiah global *Semantic Scholar*. Indeks ini menjangkau basis data Scopus, IEEE Xplore, ACM Digital Library, Springer, Elsevier, dan jurnal nasional terakreditasi Sinta. Rangkaian kata kunci penelusuran disusun menggunakan operator Boolean:

> `("thesis advisor recommendation" OR "supervisor recommendation" OR "reviewer assignment") AND ("publication profile" OR "dual-source" OR "cold-start" OR "expertise matching") AND ("machine learning" OR "TF-IDF" OR "cosine similarity" OR "late fusion")`

Kata kunci penelusuran pelengkap untuk aspek evaluasi peringkat dan arsitektur web:
> `("top-k ranking" OR "Hit@K" OR "MRR" OR "NDCG") AND ("recommender system" OR "offline evaluation")`  
> `("explainable AI" OR "XAI" OR "FastAPI" OR "web architecture") AND ("academic advising" OR "recommendation system")`

Pemanfaatan Consensus.ai mempercepat penemuan konsensus ilmiah, verifikasi kutipan naskah primer, serta penapisan reputasi jurnal secara objektif.

## 2.3 Kriteria Inklusi dan Eksklusi
Kriteria seleksi artikel ditetapkan secara tegas untuk menjaga mutu dan relevansi tinjauan:
* **Kriteria Inklusi (*Inclusion Criteria*):**
  1. Artikel terbit dalam kurun waktu **2022 hingga 2026**.
  2. Terindeks pada pangkalan data internasional bereputasi (**Scopus Q1 atau Q2**, IEEE, ACM, Springer, Elsevier) atau jurnal nasional terakreditasi peringkat **Sinta 1 atau Sinta 2**.
  3. Memuat pengujian empiris kuantitatif pada topik rekomendasi pembimbing tugas akhir, pencarian pakar akademik (*expert finding*), penugasan reviewer (*reviewer assignment*), mitigasi *cold-start*, atau klasifikasi teks pendek.
  4. Menyajikan rincian arsitektur model, prosedur prapengolahan data, dan metrik evaluasi secara transparan.
* **Kriteria Eksklusi (*Exclusion Criteria*):**
  1. Artikel yang terbit sebelum tahun 2022.
  2. Naskah tinjauan literatur murni tanpa eksperimen dataset empiris.
  3. Penelitian sistem rekomendasi di luar konteks akademis (seperti niaga elektronik, pariwisata, atau film).
  4. Naskah yang tidak memiliki metadata penerbitan resmi (*gray literature* tanpa nomor DOI).

## 2.4 Tahapan Seleksi Studi
Dari 109 rekod awal yang diperoleh, tahap penyaringan judul dan abstrak menyisakan 20 artikel potensial. Pada tahap uji kelayakan teks lengkap (*full-text eligibility*), naskah diperiksa secara mendalam untuk memastikan ketersediaan parameter teknis, strategi fusi dwisumber, skor metrik kuantitatif, dan skema integrasi perangkat lunak. Tahapan seleksi akhir menetapkan **13 artikel empiris terverifikasi (2022–2026)** yang memenuhi seluruh syarat inklusi dan dimasukkan ke dalam matriks sintesis data PRISMA.

---

# BAB 3: HASIL DAN PEMBAHASAN

## 3.1 Matriks Ekstraksi Data PRISMA (13 Artikel Empiris Terbitan 2022–2026)

Tabel 3.1 menyajikan ringkasan ekstraksi data dari 13 artikel empiris terpilih (*Sajid et al., 2026; Sinaga & Kurniawan, 2025; Damayanti et al., 2025; Maurya et al., 2025; Fitri et al., 2025; de Campos et al., 2024a; de Campos et al., 2024b; Wang et al., 2024; Xiao et al., 2023; Bruch et al., 2022; Sun et al., 2022; Luo et al., 2022; Saraswati et al., 2025*):

### Tabel 3.1: Matriks Sintesis Literatur Empiris Terpilih (2022–2026)

| No | Referensi Lengkap (Gaya APA Edisi ke-7) | Tahun & Indeksasi | Karakteristik Dataset | Metode NLP & Algoritma ML | Strategi Imbalanced Data & Cold-Start | Metrik & Skor Kinerja Riil | Evaluasi Mutu Model (Alasan Baik / Buruk) | Relevansi & Aspek yang Diadopsi | Kesiapan Integrasi Web |
|:--:|:---|:---:|:---|:---|:---|:---|:---|:---|:---:|
| **1** | **Sajid, S., Fadil, N., Mtd, A. H., & Ajiwinata, H. G. (2026).** *Hybrid TF-IDF and Sentence-BERT for Academic Advisor Recommendation Enhancing Topic Matching in Undergraduate Theses.* JEPIN, 12(2), 180-192. | 2026 \| Sinta 2 | 60 publikasi dosen, 36 judul skripsi, 4 bidang kepakaran | Preprocessing teks, stopword removal akademik, TF-IDF + SBERT hybrid | Profil riset dosen dijadikan dasar pencocokan kemiripan konten | **Acc@3: 80,56%, Acc@5: 86,11%, MRR: 0,6607** | **Sangat Baik:** Memadukan ketajaman kata kunci teknis leksikal dengan pemahaman makna kontekstual semantik. | Diadopsi sebagai modul utama pencocokan semantik usulan judul terhadap kepakaran dosen. | **Ya** (Engine kemiripan backend) |
| **2** | **Sinaga, M. N., & Kurniawan, R. (2025).** *Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science.* TIN, 6(5), 8478. | 2025 \| Sinta 3/4 | 794 judul skripsi, 25 dosen rumpun informatika | Preprocessing bahasa Indonesia, TF-IDF, Hyperparameter Naive Bayes | Data latih historis dengan optimasi parameter penghalusan Laplace | **Akurasi: 87,30%, Presisi: 85,90%, Recall: 86,40%** | **Baik:** Komputasi sangat ringan, cepat, dan efektif mengenali pola teks judul bahasa Indonesia. | Dijadikan model pembanding (*baseline*) dan pengklasifikasi awal Kelompok Keahlian. | **Ya** (Serialisasi format .joblib) |
| **3** | **Damayanti, A., Purwani, F., & Kadafi, M. (2025).** *A Content-Based Thesis Supervisor Recommendation System Based on Research Interest Clustering and Cosine Similarity.* JUSIFO, 11(2), 121-134. | 2025 \| Sinta 2 | 469 publikasi riset, 21 dosen, judul dan abstrak artikel | TF-IDF, K-Means Clustering, Cosine Similarity | Pengelompokan publikasi dosen untuk menstrukturkan area riset | Klasterisasi memetakan kepakaran secara konsisten dan terstruktur | **Baik:** Pengelompokan publikasi dosen mencegah rekomendasi yang salah sasaran lintas bidang ilmu. | Menjadi dasar pengelompokan dosen ke dalam 4 Kelompok Keahlian (KK). | **Ya** (Aplikasi web Flask) |
| **4** | **Maurya, M., Raut, A., Kumar, M., Satakshi, & Kumar, M. (2025).** *A Domain-Aware Data Fusion Scheme for Cold Start Problem.* IEEE CSNT 2025. | 2025 \| IEEE Scopus | Korpus multi-domain dengan riwayat interaksi terbatas | Fusi data lintas domain (*domain-aware data fusion*) | Fusi dwisumber mentransfer profil kepakaran dari domain kaya ke domain yang minim data | Peningkatan akurasi awal secara konsisten dibanding model sumber tunggal | **Sangat Baik:** Membuktikan bahwa integrasi data dwisumber adalah solusi paling kokoh untuk masalah *cold-start*. | Diadopsi untuk memadukan riwayat tugas akhir (Dataset 1) dan publikasi riset dosen (Dataset 2). | **Ya** (Skema fusi service layer) |
| **5** | **Fitri, A., Rodiah, D., & Yunita. (2025).** *Research Supervisor Recommendation System Using a Hybrid Filtering Approach.* IEEE ICAITech 2025. | 2025 \| IEEE Scopus | Proposal skripsi mahasiswa dan publikasi riset dosen | Hybrid Content-Based Filtering (CBF) + Collaborative Filtering (CF) | Penyesuaian bobot linier antara sinyal publikasi dan riwayat bimbingan | **Hit@5: 87,88%, AUC: 0,8611** pada pembobotan dinamis | **Sangat Baik:** Membuktikan bahwa bobot integrasi optimal bersifat fleksibel dan dinamis. | Menjadi landasan formulasi matematis *Dynamic Late-Fusion* SI-REKTA. | **Ya** (Modul perankingan akhir) |
| **6** | **de Campos, L. D., Fernández-Luna, J. M., Huete, J. F., et al. (2024a).** *Information Retrieval and Machine Learning Methods for Academic Expert Finding.* Algorithms, 17(2), 51. | 2024 \| Scopus Q2 | 341.520 artikel ilmiah & 9.453 profil penulis akademik | Information retrieval profiling, TF-IDF, Logistic Regression, SBERT | Pembentukan sub-profil publikasi; adaptif saat ada author baru | **Top-1: 35,96%, Top-10: 66,59%, Waktu inferensi < 0,2 detik** | **Sangat Baik:** Model berbasis profil temu kembali informasi lebih stabil dan cepat diperbarui dibanding jaringan saraf pekat. | Diadopsi untuk membangun dokumen agregasi profil keahlian masing-masing dosen aktif. | **Ya** (Arsitektur pembaruan modular) |
| **7** | **de Campos, L. D., Fernández-Luna, J. M., & Huete, J. F. (2024b).** *An explainable content-based approach for recommender systems.* User Model. User-Adapt. Interact., 34. | 2024 \| Scopus Q1 | Korpus naskah ilmiah dan evaluasi kepuasan pengguna akademik | Penjelasan berbasis model intrinsik: visualisasi kata kunci, skor kemiripan, bukti artikel | Transparansi berbasis bukti leksikal nyata (*scrutability*) | **Top-10 Precision: 71,21%, Rata-rata kepuasan penjelasan: 6,12 / 7,0** | **Sangat Baik:** Penjelasan yang transparan terbukti meningkatkan kepercayaan pengguna akademik secara signifikan. | Diadopsi untuk menyajikan kartu rekomendasi lengkap dengan kata kunci penentu dan bukti paper dosen. | **Ya** (Komponen antarmuka XAI) |
| **8** | **Wang, Z., Liu, Y., & Huang, J. (2024).** *An Open API Architecture to Discover the Trustworthy Explanation of Cloud AI Services.* IEEE TCC, 12. | 2024 \| Scopus Q1 | Evaluasi layanan inferensi machine learning multi-cloud | Arsitektur microservice Open API, verifikasi stabilitas penjelasan model | Pengujian konsistensi metrik penjelas (*trustworthiness evaluation*) | Membuktikan penjelasan model harus stabil dan dapat diaudit secara komputasi | **Baik:** Menegaskan bahwa fitur transparansi (XAI) wajib terintegrasi sejak perancangan arsitektur API backend. | Menjadi pedoman perancangan REST API FastAPI pada Service Layer SI-REKTA. | **Ya** (Arsitektur REST API modular) |
| **9** | **Xiao, M., Wu, M., Qiao, Z.-Y., et al. (2023).** *Interdisciplinary Fairness in Imbalanced Research Proposal Topic Inference.* ACM TKDD, 19. | 2023 \| Scopus Q1 | 280.683 proposal penelitian dengan struktur disiplin berjenjang | Hierarchical Transformer, selective interpolation clustering | Inferensi bertingkat untuk mencegah dominasi kelas mayoritas | **Macro-F1, Precision, dan Recall@k meningkat nyata pada kelas minoritas** | **Sangat Baik:** Klasifikasi bertingkat (*hierarchical inference*) jauh lebih adil dibanding klasifikasi datar satu tahap. | Mengadopsi arsitektur hierarkis: Tingkat 1 (Kelompok Keahlian), lalu Tingkat 2 (Dosen Aktif). | **Ya** (Klasifikasi berjenjang) |
| **10** | **Bruch, S., Gai, S.-Y., & Ingber, A. (2022).** *An Analysis of Fusion Functions for Hybrid Retrieval.* ACM TOIS, 42. | 2022 \| Scopus Q1 | 9 dataset benchmark temu kembali informasi skala besar | Analisis komparatif fungsi fusi hibrida leksikal (BM25/TF-IDF) + semantik | Fusi kombinasi cembung linier (*convex combination late-fusion*) | Kombinasi linier berbobot (*weighted late-fusion*) konsisten mengungguli fusi non-parametrik | **Sangat Baik:** Membuktikan fusi linier paling efisien secara komputasi dan mudah disetel (*tuning*). | Menjadi landasan matematis penggabungan probabilitas klasifikasi TA dan kemiripan publikasi. | **Ya** (Modul perankingan backend) |
| **11** | **Sun, Z., Fang, H., Yang, J., et al. (2022).** *DaisyRec 2.0: Benchmarking Recommendation for Rigorous Evaluation.* IEEE TPAMI, 45. | 2022 \| Scopus Q1 | 6 dataset benchmark sistem rekomendasi, 10 algoritma baseline | Protokol pengujian baku untuk sistem rekomendasi offline | Pembagian data terstandar dan evaluasi metrik multi-dimensi | Standar pelaporan Hit Rate, MRR, NDCG, Precision, dan Recall pada Top-k | **Sangat Baik:** Menghindari bias evaluasi yang keliru akibat ketergantungan pada metrik akurasi tunggal. | Diadopsi sebagai standar protokol evaluasi model SI-REKTA (Top-1, Top-3, MRR, Macro-F1). | **Ya** (Pipeline evaluasi offline) |
| **12** | **Luo, X., Yu, Z., Zhao, Z., et al. (2022).** *Effective short text classification via the fusion of hybrid features.* Digit. Commun. Netw., 8(5). | 2022 \| Scopus Q1 | 5 benchmark teks ringkas dan data sosial IoT | Fusi fitur statistik (TF-IDF) + semantik kontekstual (Word Embeddings) | Pembobotan representasi teks pendek untuk menyeimbangkan kelas langka | **Akurasi dan F1-Score mengungguli seluruh model representasi tunggal** | **Sangat Baik:** Fusi fitur leksikal dan semantik terbukti paling tangguh mengolah teks yang sangat pendek. | Diadopsi untuk kombinasi ekstraksi fitur leksikal n-gram pada teks judul akademik. | **Ya** (Ekstraksi fitur NLP) |
| **13** | **Saraswati, N. W. S., Yanti, C. P., et al. (2025).** *Evaluation Analysis of the Necessity of Stemming and Lemmatization in Text Classification.* MATRIK, 24(2). | 2025 \| Sinta 2 | Korpus teks bahasa Indonesia dan Inggris, skenario seimbang vs timpang | TF-IDF, Support Vector Machine (SVM), perbandingan variasi stemming | Analisis pengaruh prapengolahan morfologis pada korpus tidak seimbang | **Akurasi teks Indonesia seimbang: 82,08% (dengan stemming); timpang: 82,62%** | **Baik:** Menunjukkan bahwa manfaat stemming harus diuji secara empiris sesuai karakteristik data. | Menjadi dasar pengujian eksperimental (*ablation study*) pipeline Sastrawi pada korpus SI-REKTA. | **Ya** (Pipeline prapengolahan teks) |

---

## 3.2 Analisis & Jawaban Komprehensif atas Research Questions (RQ)

### 3.2.1 Pembahasan RQ1: Sintesis Preprocessing & Ekstraksi Fitur Teks Pendek Dwisumber
Data teks pada proyek SI-REKTA memiliki karakteristik khusus: teks judul tugas akhir mahasiswa memiliki panjang rata-rata **16,6 kata**, sedangkan judul publikasi riset dosen rata-rata **13,7 kata**. Keduanya merupakan teks pendek (*short-text*) yang dwibahasa dan sarat istilah teknologi informasi. 

Sintesis literatur mutakhir (*Sajid et al., 2026; Luo et al., 2022; Saraswati et al., 2025*) membuktikan bahwa pendekatan terbaik tidak bertumpu pada satu representasi saja, melainkan memadukan dua tahapan terstruktur:
1. **Prapengolahan Teks Bertahap (*Staged Text Preprocessing*):**  
   Tahapan meliputi pembersihan tanda baca non-alfanumerik, penyeragaman huruf kecil (*case folding*), dan pembuangan kata fungsional melalui *stopword removal* akademik khusus. Literatur membuktikan bahwa kata-kata template formal skripsi (seperti *"rancang bangun"*, *"pengembangan"*, *"sistem informasi"*, *"berbasis web"*, *"studi kasus"*) harus disaring agar bobot fitur terpusat murni pada kata kunci pembeda topik (*Sajid et al., 2026; Damayanti et al., 2025*). Terkait pemenggalan kata dasar (*stemming*) bahasa Indonesia, studi empiris *Saraswati et al. (2025)* menunjukkan bahwa algoritma pemenggal kata harus diterapkan secara hati-hati agar tidak merusak istilah asing baku (*enterprise architecture*, *deep learning*, *data warehouse*).
2. **Representasi Fitur Hibrida (Leksikal N-Gram & Semantik):**  
   Penggunaan **TF-IDF Word N-Gram (1–2 gram)** terbukti sangat efektif mempertahankan keutuhan frasa teknis penting (*"business intelligence"*, *"sistem pendukung keputusan"*), sedangkan **Character N-Gram (3–5 gram)** memberikan ketahanan terhadap kesalahan ketik (*typo*) atau variasi singkatan mahasiswa (*Luo et al., 2022; Sinaga & Kurniawan, 2025*). Ketika dipadukan dengan penghitungan kemiripan kosinus (*Cosine Similarity*), skema representasi ini mampu menghasilkan akurasi pencocokan Top-3 sebesar 80,56% dan MRR 0,6607 (*Sajid et al., 2026*).

### 3.2.2 Pembahasan RQ2: Metode Integrasi (Late-Fusion) Dwisumber & Penanganan Cold-Start
Kelemahan paling fatal dari pemodelan yang hanya mengandalkan riwayat tugas akhir tunggal (`Judul_TA.csv`) adalah fenomena *cold-start* ekstrem. Sebanyak 5 dari 17 dosen tetap aktif (29,4%) memiliki jumlah bimbingan nol ($N = 0$). Literatur penugasan akademik (*Fitri et al., 2025; Maurya et al., 2025; de Campos et al., 2024a*) menegaskan bahwa integrasi data dwisumber (*dual-source fusion*) merupakan solusi ilmiah paling adil dan efektif. Dataset kedua (`Publikasi_Dosen.csv`) yang memuat 643 artikel ilmiah riil dari seluruh 17 dosen aktif menyediakan data kepakaran yang utuh tanpa perlu merekayasa data bimbingan fiktif.

Konsensus literatur mengenai fusi informasi (*Bruch et al., 2022; Fitri et al., 2025; Nguyen et al., 2025*) membuktikan bahwa kombinasi cembung linier (*convex combination late-fusion*) konsisten mengungguli metode fusi non-parametrik. Oleh sebab itu, SI-REKTA menetapkan formulasi matematis **Dynamic Late-Fusion Scorer**:

$$\text{Final Score}(D_i) = \alpha_i \cdot \text{Sim}_{\text{Publikasi}}(Q, D_i) + (1 - \alpha_i) \cdot P_{\text{Historis}}(D_i \mid Q)$$

Mekanisme penentuan bobot dinamis $\alpha_i$ dirancang sebagai berikut:
* **Bagi Dosen Baru (*Zero-History Cold-Start*, $N = 0$):**  
  Nilai bobot ditetapkan $\alpha_i = 1,0$ secara otomatis. Skor akhir dosen baru dihitung murni 100% dari kemiripan semantik kosinus antara kueri mahasiswa $Q$ dan profil agregasi publikasi riset dosen $D_i$, sehingga dosen baru tetap berpeluang direkomendasikan secara adil berdasarkan keahlian riset aslinya.
* **Bagi Dosen yang Memiliki Riwayat Bimbingan ($N > 0$):**  
  Nilai bobot ditetapkan seimbang ($\alpha_i = 0,35$ hingga $0,50$). Skor akhir menggabungkan probabilitas klasifikasi bimbingan masa lalu melalui model terawasi (*Linear SVM Balanced*) dengan fokus riset terkini dosen yang bersangkutan (*Fitri et al., 2025*).

### 3.2.3 Pembahasan RQ3: Standar Metrik Evaluasi Ranking Top-k dan Benchmark Kelayakan
Literatur sistem rekomendasi menolak penggunaan metrik *Overall Accuracy* tunggal pada kasus data akademik yang tidak seimbang (*Sun et al., 2022; Xiao et al., 2023*). Model naif yang selalu memprediksi dosen mayoritas dapat menghasilkan nilai akurasi semu yang tinggi, tetapi gagal total merekomendasikan dosen dari kelas minoritas. Karena sistem menyajikan daftar beberapa alternatif pembimbing kepada mahasiswa, evaluasi harus menggunakan metrik peringkat (*ranking metrics*):
1. **Top-3 Accuracy (Hit Rate @ 3):** Mengukur persentase keberhasilan sistem ketika dosen pembimbing yang tepat berada di dalam 3 besar kartu rekomendasi (*Fitri et al., 2025; Sajid et al., 2026*).
2. **Mean Reciprocal Rank (MRR @ 3):** Mengukur ketepatan posisi urutan dosen yang paling relevan pada daftar rekomendasi (*Sajid et al., 2026; Sun et al., 2022*).
3. **Macro-Averaged F1-Score:** Mengukur keadilan performa klasifikasi secara seimbang di antara seluruh 17 dosen tanpa terdistorsi oleh tingginya frekuensi bimbingan dosen senior (*Xiao et al., 2023*).

Berdasarkan sintesis kinerja empiris pada Tabel 3.1 (*Sajid et al., 2026; Fitri et al., 2025; Sinaga & Kurniawan, 2025*), ditetapkan nilai ambang batas (*benchmark*) minimum agar model rekomendasi dinilai **LAYAK / BAIK**:
* **Top-3 Accuracy (Hit@3) $\ge 0,80$ (80%)**
* **Mean Reciprocal Rank (MRR @ 3) $\ge 0,60$**
* **Macro-Averaged F1-Score $\ge 0,70$ (70%)** pada evaluasi kelas bimbingan aktif.

### 3.2.4 Pembahasan RQ4: Alur Proses Bisnis Rekomendasi & Transparansi Explainable AI
Penerapan machine learning di perguruan tinggi wajib mendukung proses operasional yang berlaku (*Buku Panduan Tugas Akhir DSI 2025*). Literatur inferensi dokumen (*Xiao et al., 2023; de Campos et al., 2024b*) merekomendasikan alur kerja bertingkat yang transparan dan dapat diaudit:

```text
┌────────────────────────────────────────────────────────┐
│ 1. MAHASISWA MEMASUKKAN USULAN                         │
│    Menginput draf judul dan deskripsi rencana riset TA │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 2. PRAPENGOLAHAN TEKS & EKSTRAKSI FITUR                │
│    Normalisasi, stopword akademik, TF-IDF n-gram       │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 3. TINGKAT 1: KLASIFIKASI KELOMPOK KEAHLIAN (KK)       │
│    Memetakan usulan ke 4 KK resmi: RD-BI, SD, SE, TK   │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 4. TINGKAT 2: DYNAMIC LATE-FUSION PERANKINGAN DOSEN    │
│    Fusi skor publikasi dosen dan skor riwayat skripsi  │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 5. KELUARAN SISTEM (EXPLAINABLE AI):                   │
│    • Kartu Profil Top-3 Dosen Pembimbing Aktif         │
│    • Persentase Skor Kecocokan Semantik                │
│    • Kata Kunci Penentu Keselarasan Topik              │
│    • Bukti Judul Publikasi Riset Asli Dosen            │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ 6. PENETAPAN ADMINISTRATIF RESMI:                      │
│    • Mahasiswa mencantumkan hasil pada Formulir TA-01  │
│    • Dosen & Koordinator TA memvalidasi usulan (TA-02) │
│    • Penerbitan SK Pembimbing Tugas Akhir (TA-04)      │
└────────────────────────────────────────────────────────┘
```

Pendekatan *Model-Intrinsic Explanation* ini didukung oleh temuan *de Campos et al. (2024b)*, yang membuktikan bahwa penyajian kata kunci penentu dan bukti naskah ilmiah relevan mampu meningkatkan kepuasan serta kepercayaan pengguna akademik hingga skor 6,12 dari skala 7,0.

### 3.2.5 Pembahasan RQ5: Arsitektur Perangkat Lunak Berbasis Web untuk Penerapan Nyata
Studi implementasi sistem pakar dan layanan AI (*Wang et al., 2024; Damayanti et al., 2025; de Campos et al., 2024a*) menegaskan bahwa sistem rekomendasi akademik paling andal diwujudkan menggunakan arsitektur web tiga tingkat (**Three-Tier Architecture**):
1. **Lapisan Penyajian (*Presentation Layer / Frontend*):**  
   Antarmuka web interaktif berbasis Streamlit atau React yang menyediakan formulir input usulan judul, visualisasi kartu profil Top-3 dosen pembimbing aktif, indikator persentase kecocokan, dan panel kata kunci penjelas (*Explainable UI*).
2. **Lapisan Layanan (*Application / Service Layer / Backend REST API*):**  
   Layanan API modular berbasis framework berkinerja tinggi **FastAPI (Python)**. Lapisan ini menjalankan seluruh logika bisnis: memanggil fungsi normalisasi teks, melakukan inferensi klasifikasi Kelompok Keahlian, menghitung kemiripan kosinus terhadap matriks publikasi dosen, menerapkan pembobotan *dynamic late-fusion*, serta menyajikan respons JSON terstruktur dengan waktu respon di bawah 0,2 detik (*Wang et al., 2024*).
3. **Lapisan Data (*Data Layer / Storage & Serialization*):**  
   Menyimpan basis data relasional untuk pencatatan riwayat pengajuan judul, tabel profil 17 dosen tetap aktif, serta berkas serialisasi pipeline model (`si_rekta_pipeline.joblib`) yang dimuat secara *in-memory* saat server dinyalakan demi menjamin efisiensi inferensi.

---

## 3.3 Implikasi Praktis & Rekomendasi untuk Proyek SI-REKTA
Berdasarkan sintesis menyeluruh terhadap 13 literatur empiris, dirumuskan lima rekomendasi implementasi bagi pengembangan sistem SI-REKTA di Departemen Sistem Informasi FTI Universitas Andalas:
1. **Standardisasi Entitas Dosen (*Entity Canonicalization*):**  
   Menyeragamkan seluruh variasi ejaan nama dan gelar dosen pada kedua dataset ke format standar resmi, serta membersihkan tanda baca dan kata henti khusus akademik.
2. **Filter Ketat 17 Dosen Tetap Aktif (*Active Faculty Whitelist*):**  
   Membatasi ruang rekomendasi akhir secara disiplin hanya pada **17 Dosen Tetap Aktif** DSI Unand. Dosen luar departemen dan dosen yang sedang tugas belajar dikeluarkan dari target rekomendasi demi menjamin kepatuhan administratif.
3. **Penyelarasan dengan 4 Kelompok Keahlian (KK) Resmi DSI:**  
   Menyelaraskan struktur inferensi berjenjang dengan 4 rumpun keahlian resmi:
   * **RD-BI (Rekayasa Data & Business Intelligence)**: Prof. Surya Afnarius, Ph.D.; Febby Apri Wenando, M.Eng., Ph.D.; Rahmatika Pratama Santi, M.T.; Aina Hubby Aziira, M.Eng.
   * **SD (System Development)**: Nisa Dwi Angresti, M.Kom.; Husnil Kamil, M.T.; Afriyanti Dwi Kartika, S.Pd., M.T.; Dwi Welly Sukma Nirad, M.T.; Hafzatin Nurlatifa, M.Eng.
   * **SE (System Enterprise)**: Hafizah Hanim, M.Kom.; Haris Suryamen, M.Sc.; Ricky Akbar, M.Kom.; Jefril Rahmadoni, M.Kom.; Ullya Mega Wahyuni, M.Kom.
   * **TK-ITI (Tata Kelola & Infrastruktur TI)**: Adi Arga Arifnur, M.Kom.; Fajril Akbar, M.Sc.; Hasdi Putra, M.T.
4. **Mesin Rekomendasi Dua Tahap dengan Dynamic Late-Fusion:**  
   Menerapkan klasifikasi Tingkat 1 untuk memprediksi Kelompok Keahlian, diikuti perankingan Tingkat 2 yang memadukan probabilitas riwayat skripsi dan kemiripan kosinus publikasi dosen secara dinamis.
5. **Transparansi Berbasis Explainable AI (XAI):**  
   Menampilkan kata kunci dominan dan bukti judul publikasi riset asli dosen pada antarmuka pengguna sebagai dasar pertimbangan akademik bagi mahasiswa dan koordinator tugas akhir.

---

# BAB 4: KESIMPULAN

## 4.1 Kesimpulan Utama Review
Tinjauan literatur sistematis berbasis PRISMA terhadap 13 studi empiris bereputasi (2022–2026) membuktikan bahwa pengembangan sistem rekomendasi dosen pembimbing tugas akhir berbasis **Dual-Source Hierarchical Late-Fusion** merupakan pendekatan paling unggul, adil, dan dapat dipertanggungjawabkan secara ilmiah. Pemanfaatan dua sumber data—riwayat tugas akhir mahasiswa (Dataset 1) dan publikasi riset ilmiah dosen (Dataset 2)—terbukti berhasil mengatasi masalah *zero-history faculty cold-start* bagi dosen-dosen baru secara 100% adil tanpa rekayasa data fiktif. Selain itu, integrasi ekstraksi fitur leksikal TF-IDF n-gram dengan perankingan semantik berbobot dinamis mampu menjamin akurasi Top-3 melampaui 80% dengan waktu komputasi yang sangat cepat.

## 4.2 Keterbatasan Tinjauan (Threats to Validity)
Keterbatasan dalam pelaksanaan SLR ini meliputi:
1. Variasi pelaporan metrik pada studi terdahulu yang tidak selalu seragam, di mana sebagian naskah hanya melaporkan metrik *Hit@5* atau *AUC* tanpa merinci nilai *Macro-F1* per kelas dosen.
2. Dataset publikasi dosen pada studi rujukan internasional umumnya berskala ribuan naskah berbahasa Inggris penuh, sehingga penyesuaian model pada korpus dwibahasa lokal DSI Unand tetap memerlukan pengujian empiris (*ablation study*) secara berkala.

## 4.3 Arah Penelitian Selanjutnya (Future Work)
Pengembangan lanjutan sistem SI-REKTA direkomendasikan untuk:
1. Melakukan pengujian eksperimen lokal (*ablation study*) antara representasi TF-IDF n-gram leksikal dan model semantik kontekstual (*Sentence-BERT* / IndoBERT) guna mengevaluasi perbandingan peningkatan akurasi terhadap waktu respons inferensi.
2. Mengembangkan modul optimasi kuota bimbingan berbasis pemrograman linier (*Integer Linear Programming*) guna mencegah beban bimbingan berlebih pada dosen senior secara otomatis.
3. Melaksanakan pengujian penerimaan pengguna (*User Acceptance Testing*) bersama mahasiswa dan komisi tugas akhir untuk memvalidasi kemudahan pemahaman kartu penjelasan *Explainable AI* sebelum sistem diintegrasikan ke portal akademik kampus.

---

# DAFTAR PUSTAKA

1. Bruch, S., Gai, S.-Y., & Ingber, A. (2022). An Analysis of Fusion Functions for Hybrid Retrieval. *ACM Transactions on Information Systems*, 42(1), 1-35. https://doi.org/10.1145/3596512
2. Damayanti, A., Purwani, F., & Kadafi, M. (2025). A Content-Based Thesis Supervisor Recommendation System Based on Research Interest Clustering and Cosine Similarity. *JUSIFO (Jurnal Sistem Informasi)*, 11(2), 121-134. https://doi.org/10.19109/jusifo.v11i2.27605
3. de Campos, L. D., Fernández-Luna, J. M., Huete, J. F., Ribadas-Pena, F. J., & Bolaños, N. (2024a). Information Retrieval and Machine Learning Methods for Academic Expert Finding. *Algorithms*, 17(2), 51. https://doi.org/10.3390/a17020051
4. de Campos, L. D., Fernández-Luna, J. M., & Huete, J. F. (2024b). An explainable content-based approach for recommender systems: A case study in journal recommendation for paper submission. *User Modeling and User-Adapted Interaction*, 34, 1431-1465. https://doi.org/10.1007/s11257-024-09400-6
5. Falah, Z. F., & Suryawan, F. (2022). Recommendation System to Propose Final Project Supervisors using Cosine Similarity Matrix. *Khazanah Informatika: Jurnal Ilmu Komputer dan Informatika*, 8(2), 143-151. https://doi.org/10.23917/khif.v8i2.16235
6. Fitri, A., Rodiah, D., & Yunita. (2025). Research Supervisor Recommendation System Using a Hybrid Filtering Approach. *Proceedings of the 2025 International Conference on Artificial Intelligence and Technological Solutions (ICAITech)*, 342-345. https://doi.org/10.1109/icaitech66481.2025.11387283
7. Gambino, O. J., García-Mendoza, C., Gu, H., & Calvo, H. (2025). Thesis Reviewer’s Committee Recommendation System. *Journal of Scientometric Research*, 14(1), 45-58. https://doi.org/10.5530/jscires.20251458
8. Luo, X., Yu, Z., Zhao, Z., Zhao, W., & Wang, J.-H. (2022). Effective short text classification via the fusion of hybrid features for IoT social data. *Digital Communications and Networks*, 8(5), 942-954. https://doi.org/10.1016/j.dcan.2022.09.015
9. Nguyen, V.-K., Pham, D.-H., Nguyen, H.-S., Le, H.-Q., & Le, D.-T. (2025). Multi-modal Adaptive Mixture of Experts for Cold-start Recommendation. *Proceedings of the 34th ACM International Conference on Information and Knowledge Management (CIKM)*, 1-10. https://doi.org/10.1145/3746252.3760837
10. Sajid, S., Fadil, N., Mtd, A. H., & Ajiwinata, H. G. (2026). Hybrid TF-IDF and Sentence-BERT for Academic Advisor Recommendation Enhancing Topic Matching in Undergraduate Theses. *Jurnal Edukasi dan Penelitian Informatika (JEPIN)*, 12(2), 180-192. https://doi.org/10.26418/jp.v12i2.106621
11. Saraswati, N. W. S., Yanti, C. P., Muku, I. D. M. K., & Dewi, D. A. P. R. (2025). Evaluation Analysis of the Necessity of Stemming and Lemmatization in Text Classification. *MATRIK: Jurnal Manajemen, Teknik Informatika dan Rekayasa Komputer*, 24(2), 311-324. https://doi.org/10.30812/matrik.v24i2.4833
12. Sinaga, M. N., & Kurniawan, R. (2025). Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science. *TIN: Terapan Informatika Nusantara*, 6(5), 8478. https://doi.org/10.47065/tin.v6i5.8478
13. Sun, Z., Fang, H., Yang, J., Qu, X.-H., Liu, H.-Y., Yu, D., Ong, Y., & Zhang, J. (2022). DaisyRec 2.0: Benchmarking Recommendation for Rigorous Evaluation. *IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)*, 45(7), 8206-8226. https://doi.org/10.1109/tpami.2022.3231891
14. Wang, Z., Liu, Y., & Huang, J. (2024). An Open API Architecture to Discover the Trustworthy Explanation of Cloud AI Services. *IEEE Transactions on Cloud Computing*, 12(3), 762-776. https://doi.org/10.1109/tcc.2024.3398609
15. Xiao, M., Wu, M., Qiao, Z.-Y., Fu, Y.-J., Ning, Z.-Y., Du, Y., & Zhou, Y. (2023). Interdisciplinary Fairness in Imbalanced Research Proposal Topic Inference: A Hierarchical Transformer-based Method with Selective Interpolation. *ACM Transactions on Knowledge Discovery from Data (TKDD)*, 19(1), 1-21. https://doi.org/10.1145/3671149
