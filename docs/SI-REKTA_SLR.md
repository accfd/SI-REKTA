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
Penentuan dosen pembimbing tugas akhir merupakan keputusan akademik paling kritis bagi mahasiswa program sarjana karena secara langsung memengaruhi keselarasan topik penelitian, kedalaman substansi metodologi, kualitas luaran ilmiah, serta ketepatan waktu kelulusan studi (*Sajid et al., 2026; Damayanti et al., 2025*). Kendati demikian, observasi lapangan membuktikan bahwa proses penentuan (*plotting*) pembimbing selama ini kerap menghadapi kendala klasik. Penentuan secara manual cenderung bersifat subjektif, memakan waktu verifikasi yang panjang, dan tidak konsisten ketika harus memetakan draf judul proposal usulan mahasiswa dengan peta jalan (*roadmap*) riset dosen (*Sajid et al., 2026; Damayanti et al., 2025*).

Pada konteks Departemen Sistem Informasi (DSI) FTI Universitas Andalas, audit *Exploratory Data Analysis* (EDA) lokal membuktikan adanya dua kendala struktural yang sangat nyata:
1. **Ketimpangan Ekstrem & *Zero-History Faculty Cold-Start*:**  
   Dataset riwayat tugas akhir masa lalu (`Judul_TA.csv`) hanya memuat 625 judul dengan rata-rata 16,6 kata per judul. Distribusinya bersifat sangat timpang (*extreme class imbalance*), di mana seorang dosen senior membimbing hingga 149 skripsi, sementara **5 dari 17 dosen tetap aktif (29,4%) sama sekali tidak memiliki riwayat bimbingan ($N=0$)**. Ketiadaan riwayat interaksi historis ini menyebabkan sistem rekomendasi terawasi (*supervised learning*) murni gagal total mengenali dosen baru (*Yuan & Hernandez, 2023; Jafri et al., 2022; Maurya et al., 2025*).
2. **Kekayaan Data Publikasi Riset Dosen sebagai Solusi Dwisumber (*Dual-Source*):**  
   Sebaliknya, audit terhadap dataset kedua (`Publikasi_Dosen.csv`) memuat **643 judul artikel ilmiah terverifikasi yang mencakup 100% dari seluruh 17 dosen tetap aktif**, termasuk dosen-dosen baru yang memiliki 7 hingga 32 judul publikasi riset. Integrasi kedua dataset ini terbukti memperluas perbendaharaan kosakata teknis domain sistem informasi sebesar **+105,2%** (dari 1.691 kata unik skripsi melonjak menjadi 3.470 kata unik gabungan, dengan *Jaccard lexical overlap* sebesar 19,57%).

Karakteristik teks pada kedua dataset SI-REKTA juga menuntut pendekatan *Natural Language Processing* (NLP) yang tepat. Judul tugas akhir dan judul publikasi riset dosen sama-sama berupa teks pendek (*short-text* $\pm$13–17 kata), bilingual (bahasa Indonesia dan istilah teknis bahasa Inggris), serta padat terminologi keilmuan. Literatur mutakhir menegaskan bahwa prapengolahan teks terstruktur, pembobotan fitur leksikal, dan representasi semantik modern mampu melipatgandakan akurasi pencocokan topik-kepakaran secara signifikan (*Sajid et al., 2026; Sinaga & Kurniawan, 2025; Nabila et al., 2025*). 

Lebih jauh, fakta bahwa publikasi ilmiah mencakup seluruh dosen aktif menjadikan sumber data ini sangat strategis sebagai pilar mitigasi *cold-start*. Bukti empiris membuktikan bahwa penggabungan data dwisumber (*multi-source data fusion*) dan penyesuaian domain mampu mendongkrak kualitas rekomendasi ketika data histori utama langka atau timpang (*Luo et al., 2026; Maurya et al., 2025; Jafri et al., 2022*). Oleh sebab itu, proyek SI-REKTA memerlukan arsitektur **Hierarchical Dual-Source Recommender** yang tidak hanya presisi, tetapi juga transparan dan dapat dijelaskan alasannya (*Explainable AI*) kepada mahasiswa, dosen, serta komisi tugas akhir demi menjamin akuntabilitas tata kelola perguruan tinggi (*Dwivedi et al., 2022; Bennetot et al., 2024*).

## 1.2 Motivasi & Tujuan Tinjauan Literatur
Tinjauan literatur sistematis ini dimotivasi oleh kebutuhan akademik mendasar untuk meletakkan fondasi metodologis yang kokoh sebelum membangun sistem **SI-REKTA**. Tujuan utama penulisan SLR ini adalah:
1. Mengekstrak praktik terbaik teknik prapengolahan dan representasi fitur teks pendek akademik bilingual agar model inferensi tidak terjebak pada kemiripan leksikal permukaan semata (*Sajid et al., 2026; Nabila et al., 2025*).
2. Mengidentifikasi strategi integrasi (*fusion*) dua sumber data (riwayat skripsi dan publikasi riset) yang paling efektif untuk memecahkan masalah ketimpangan data dan *cold-start* dosen baru (*Yuan & Hernandez, 2023; Kannout et al., 2024; Maurya et al., 2025*).
3. Menetapkan standar metrik evaluasi peringkat (*Top-k ranking metrics*) yang representatif—seperti *Hit@k*, *NDCG@k*, dan *Mean Reciprocal Rank* (MRR)—beserta ambang batas kelayakan numerik (*benchmark*) riil di lingkungan pendidikan tinggi (*Yang et al., 2025; Zhang et al., 2026; Rajesh & Kumar, 2025*).
4. Merumuskan alur proses bisnis rekomendasi cerdas yang transparan (*Explainable AI*), sehingga hasil inferensi dapat diaudit dan dipertanggungjawabkan untuk keperluan administrasi pengajuan Formulir TA-01 dan TA-02 (*Que et al., 2026; Atalla et al., 2023*).
5. Merancang pola arsitektur perangkat lunak berbasis web tiga tingkat (*Three-Tier Architecture*) yang modular, berlatensi rendah ($<1$ detik), dan siap dioperasionalkan di perguruan tinggi (*Damayanti et al., 2025; Sahoo et al., 2026; Luo et al., 2026*).

## 1.3 Perumusan Pertanyaan Penelitian (Research Questions)
Guna mengarahkan proses telaah literatur secara terstruktur dan terukur, dirumuskan lima *Research Questions* (RQ) sebagai berikut:
* **RQ1:** Teknik preprocessing teks dan ekstraksi fitur NLP apa yang paling optimal untuk menangani teks judul tugas akhir (rata-rata 16,6 kata) dan teks judul publikasi dosen (rata-rata 13,7 kata) dengan perbendaharaan kosakata teknis bilingual?
* **RQ2:** Bagaimana metode integrasi (*fusion*) yang tepat untuk menggabungkan Dataset 1 (riwayat judul tugas akhir) dan Dataset 2 (publikasi riset dosen) ke dalam satu model sistem rekomendasi pembimbing?
* **RQ3:** Apa metrik evaluasi peringkat (*ranking metrics*) yang tepat untuk mengukur akurasi rekomendasi Top-3 dosen dan berapa standar nilai ambang batas (*benchmark*) kelayakannya?
* **RQ4:** Bagaimana alur proses bisnis yang tepat saat mahasiswa memasukkan draf judul hingga sistem menghasilkan rekomendasi pembimbing yang dapat dijelaskan (*Explainable AI*) untuk pengisian Formulir TA-01 dan TA-02?
* **RQ5:** Bagaimana arsitektur perangkat lunak berbasis web yang tepat untuk mengintegrasikan model machine learning agar menghasilkan inferensi yang cepat, modular, dan siap digunakan di perguruan tinggi?

---

# BAB 2: METODOLOGI SYSTEMATIC LITERATURE REVIEW

## 2.1 Protokol PRISMA
Tinjauan literatur sistematis ini dilaksanakan secara ketat dengan mengadopsi protokol PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*). Protokol PRISMA menjamin bahwa proses penelusuran, penyaringan, dan penelaahan artikel dilakukan secara transparan, bebas dari bias seleksi, dan dapat direplikasi (*reproducible*) (*Yuan & Hernandez, 2023*).

```text
┌─────────────────────────────────────────────────────────────┐
│                       IDENTIFIKASI                          │
│ Penelusuran artikel melalui Consensus.ai, Semantic Scholar, │
│ IEEE Xplore, ACM Digital Library, dan Repositori Bereputasi │
│ (Rentang publikasi: 2022 – 2026)                            │
│ [ Total Rekod Ditemukan: n = 109 artikel unik ]             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         SKRINING                            │
│ Penyaringan judul & abstrak berdasarkan relevansi topik     │
│ (Menghapus artikel non-empiris, duplikasi, & di luar tema)  │
│ [ Rekod Tersaring: n = 20 artikel potensial ]               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        KELAYAKAN                            │
│ Pembacaan teks lengkap (Full-Text Assessment) terhadap      │
│ metodologi empiris, metrik numerik, dan integrasi sistem    │
│ [ Rekod Memenuhi Syarat: n = 13 artikel layak ]             │
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
Penelusuran literatur dilakukan dengan memanfaatkan mesin pencari akademik berbasis kecerdasan buatan, **Consensus.ai**, yang terindeksasi langsung dengan basis data ilmiah global *Semantic Scholar* (mencakup Scopus, IEEE Xplore, ACM Digital Library, Springer, Elsevier, dan jurnal nasional Sinta). Formulasi kata kunci penelusuran (*search strings*) menggabungkan operator Boolean sebagai berikut:

> `("thesis advisor recommendation" OR "supervisor recommendation" OR "reviewer assignment") AND ("publication profile" OR "dual-source" OR "cold-start" OR "expertise matching") AND ("machine learning" OR "TF-IDF" OR "cosine similarity" OR "late fusion")`

Kata kunci penelusuran pelengkap untuk aspek evaluasi peringkat dan integrasi web mencakup:
> `("top-k ranking" OR "Hit@K" OR "MRR" OR "NDCG") AND ("recommender system" OR "offline evaluation")`  
> `("explainable AI" OR "XAI" OR "FastAPI" OR "web architecture") AND ("academic advising" OR "recommendation system")`

Pemanfaatan Consensus.ai memungkinkan ekstraksi konsensus ilmiah secara instan, pemindaian klaim metodologis berbasis kutipan langsung naskah asli, serta penapisan reputasi jurnal secara terverifikasi (*Yuan & Hernandez, 2023*).

## 2.3 Kriteria Inklusi dan Eksklusi
Untuk menjaga integritas dan relevansi studi yang ditelaah, ditetapkan kriteria seleksi yang tegas:
* **Kriteria Inklusi (*Inclusion Criteria*):**
  1. Artikel ilmiah terbit dalam kurun waktu **2022 hingga 2026**.
  2. Terindeks pada pangkalan data internasional bereputasi (**Scopus Q1 atau Q2**, IEEE, ACM, Springer, Elsevier) atau terakreditasi nasional peringkat **Sinta 1 atau Sinta 2**.
  3. Menyajikan pengujian empiris kuantitatif pada domain rekomendasi pembimbing tugas akhir, *expert finding*, penugasan reviewer naskah (*reviewer assignment*), mitigasi *cold-start*, atau klasifikasi teks pendek.
  4. Melaporkan arsitektur model, prosedur preprocessing, dan metrik evaluasi secara transparan.
* **Kriteria Eksklusi (*Exclusion Criteria*):**
  1. Artikel yang terbit sebelum tahun 2022.
  2. Naskah tinjauan pustaka murni (*literature review survey*) tanpa pengujian dataset empiris.
  3. Studi rekomendasi di luar konteks akademis (seperti e-commerce komersial umum, pariwisata, atau sistem hiburan).
  4. Naskah yang tidak memiliki metadata publikasi lengkap (*gray literature* tanpa DOI resmi).

## 2.4 Tahapan Seleksi Studi
Dari total 109 rekod unik hasil penelusuran awal, tahap penyaringan judul dan abstrak mempertahankan 20 artikel potensial. Pada tahap penilaian kelayakan teks lengkap (*full-text eligibility*), artikel ditelaah secara mendalam guna memastikan ketersediaan rincian algoritma, strategi fusi dwisumber, metrik numerik riil, dan model integrasi sistem. Tahapan akhir menetapkan **tepat 13 artikel empiris terverifikasi (2022–2026)** yang memenuhi seluruh kriteria inklusi dan dimasukkan ke dalam matriks sintesis data PRISMA.

---

# BAB 3: HASIL DAN PEMBAHASAN

## 3.1 Matriks Ekstraksi Data PRISMA (13 Artikel Empiris Terbitan 2022–2026)

Berikut adalah matriks komparasi data hasil tinjauan sistematis dari 13 artikel terpilih (*Sajid et al., 2026; Sun et al., 2022; De Campos et al., 2024; Nguyen et al., 2025; Fitri et al., 2025; Saraswati et al., 2025; Xiao et al., 2023; Bruch et al., 2022; Gambino et al., 2025; Falah & Suryawan, 2022; Wang et al., 2024; Luo et al., 2022; Sinaga & Kurniawan, 2025*):

| No | Referensi Lengkap (APA Style 7th) | Tahun & Indeksasi (2022-2026) | Karakteristik Dataset | Metode NLP & Algoritma ML | Strategi Imbalanced Data & Cold-Start | Metrik & Skor Riil | Indikator Kinerja (Alasan Baik/Buruk) | Kesimpulan & Hal yang Ditiru | Integrasi Sistem Informasi |
|:--:|:---|:---:|:---|:---|:---|:---|:---|:---|:---:|
| **1** | **Sajid, S., Fadil, N., Mtd, A. H., & Ajiwinata, H. G. (2026).** *Hybrid TF-IDF and Sentence-BERT for Academic Advisor Recommendation Enhancing Topic Matching in Undergraduate Theses.* JEPIN, 12(2). | 2026 \| Jurnal Nasional Sinta | 60 publikasi dosen, 36 judul TA, 4 area kepakaran | Preprocessing, stemming, stopword removal, TF-IDF + SBERT hybrid | Publikasi riset dosen digunakan sebagai profil kepakaran | **Acc@3: 80,56%, Acc@5: 86,11%, MRR: 0,6607** | **Sangat Baik:** Menggabungkan ketajaman leksikal istilah teknis dengan kedalaman semantik kontekstual. | Ditiru sebagai layer inti pencocokan semantik judul kueri terhadap kepakaran dosen. | **Ya** (Engine similarity backend) |
| **2** | **Sinaga, M. N., & Kurniawan, R. (2025).** *Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science.* TIN, 6(5), 8478. | 2025 \| Jurnal Nasional Sinta | 794 judul skripsi, 25 dosen rumpun informatika | Preprocessing bahasa Indonesia, TF-IDF, Hyperparameter Naive Bayes | Data latih historis dengan optimasi parameter smoothing Laplace | **Akurasi: 87,30%, Presisi: 85,9%, Recall: 86,4%** | **Baik:** Model sangat ringan, cepat, dan berkinerja tinggi pada teks judul bahasa Indonesia. | Dijadikan model pembanding (*baseline*) dan pengklasifikasi awal Kelompok Keahlian. | **Ya** (Serialisasi model .joblib) |
| **3** | **Damayanti, A., Purwani, F., & Kadafi, M. (2025).** *A Content-Based Thesis Supervisor Recommendation System Based on Research Interest Clustering and Cosine Similarity.* JUSIFO, 11(2). | 2025 \| Jurnal Nasional Sinta | 469 publikasi riset, 21 dosen, judul dan abstrak artikel | TF-IDF, K-Means Clustering, Cosine Similarity | Klasterisasi publikasi dosen untuk menstrukturkan area riset | Klasterisasi menghasilkan pemetaan kepakaran yang presisi dan konsisten | **Baik:** Pengelompokan publikasi dosen mencegah pencocokan salah sasaran lintas bidang ilmu. | Menjadi dasar pengelompokan dosen ke dalam 4 Kelompok Keahlian (KK). | **Ya** (Sistem berbasis web Flask) |
| **4** | **Maurya, M., Raut, A., Kumar, M., Satakshi, & Kumar, M. (2025).** *A Domain-Aware Data Fusion Scheme for Cold Start Problem.* IEEE CSNT 2025. | 2025 \| IEEE Scopus | Korpus multi-domain dengan keterbatasan data histori | Domain-aware data fusion, representasi lintas sumber data | Fusi data dwisumber mentransfer sinyal kepakaran dari domain kaya ke domain langka | Peningkatan akurasi awal secara konsisten dibanding pendekatan *single-source* | **Sangat Baik:** Membuktikan fusi data dwisumber merupakan solusi paling efektif untuk *cold-start*. | Ditiru untuk memadukan Dataset 1 (riwayat TA) dan Dataset 2 (publikasi dosen). | **Ya** (Service-layer fusion scoring) |
| **5** | **Fitri, A., Rodiah, D., & Yunita. (2025).** *Research Supervisor Recommendation System Using a Hybrid Filtering Approach.* IEEE ICAITech 2025. | 2025 \| IEEE Scopus | Proposal skripsi mahasiswa dan publikasi riset dosen pembimbing | Hybrid Content-Based Filtering (CBF) + Collaborative Filtering (CF) | Penyesuaian bobot linier antara sinyal konten publikasi dan matriks bimbingan | **Hit@5: 87,88%, AUC: 0,8611** pada bobot $w_{\text{CBF}}=0,2$ dan $w_{\text{CF}}=0,8$ | **Sangat Baik:** Membuktikan bobot optimal fusi tidak harus 50:50, melainkan dinamis. | Menjadi dasar perumusan formula *Dynamic Late-Fusion* SI-REKTA. | **Ya** (Layer perangkingan akhir) |
| **6** | **de Campos, L. D., Fernández-Luna, J. M., Huete, J. F., et al. (2024).** *Information Retrieval and Machine Learning Methods for Academic Expert Finding.* Algorithms, 17(2), 51. | 2024 \| Scopus Q2 / MDPI | 341.520 artikel ilmiah & 9.453 profil penulis akademik | IR profile/subprofile matching, TF-IDF, Logistic Regression, SBERT | Pembentukan sub-profil publikasi; adaptif saat ada author/dosen baru | **Top-1: 35,96%, Top-10: 66,59%, Waktu inferensi < 0,2 detik/dokumen** | **Sangat Baik:** Metode berbasis IR profil jauh lebih tangguh dan mudah di-update dibanding model black-box. | Ditiru untuk membangun dokumen profil gabungan keahlian masing-masing dosen aktif. | **Ya** (Arsitektur modular update cepat) |
| **7** | **de Campos, L. D., Fernández-Luna, J. M., & Huete, J. F. (2024).** *An explainable content-based approach for recommender systems.* User Model. User-Adapt. Interact., 34. | 2024 \| Scopus Q1 / Springer | Korpus teks naskah ilmiah dan evaluasi kepuasan pengguna akademik | Model-intrinsic explanation: tag clouds, similarity score, similar papers | Transparansi berbasis bukti leksikal nyata (*scrutability*) | **Top-10 Precision: 71,21%, Rata-rata kepuasan penjelasan: 6,12 / 7,0** | **Sangat Baik:** Penjelasan transparan meningkatkan kepercayaan dan adopsi pengguna secara nyata. | Wajib menampilkan kartu rekomendasi berisi kata kunci penentu dan judul paper relevan. | **Ya** (Komponen Explainable UI) |
| **8** | **Wang, Z., Liu, Y., & Huang, J. (2024).** *An Open API Architecture to Discover the Trustworthy Explanation of Cloud AI Services.* IEEE TCC, 12. | 2024 \| Scopus Q1 / IEEE | Evaluasi layanan inferensi machine learning multi-cloud | Open API microservice architecture, evaluasi konsistensi penjelasan XAI | Penilaian stabilitas metrik penjelasan (*trustworthiness explanation*) | Membuktikan penjelasan model harus konsisten dan dapat diaudit secara komputasi | **Baik:** Mengonfirmasi bahwa XAI harus dirancang sejak level arsitektur backend API. | Menjadi pedoman perancangan REST API FastAPI pada Service Layer SI-REKTA. | **Ya** (Arsitektur Open-API modular) |
| **9** | **Xiao, M., Wu, M., Qiao, Z.-Y., et al. (2023).** *Interdisciplinary Fairness in Imbalanced Research Proposal Topic Inference.* ACM TKDD, 19. | 2023 \| Scopus Q1 / ACM | 280.683 proposal penelitian dengan hierarki disiplin ilmu bertingkat | Hierarchical Transformer, selective interpolation clustering | Pengelompokan bertingkat untuk mencegah distorsi kelas mayoritas | **Macro-F1, Precision, Recall@k meningkat signifikan pada disiplin minoritas** | **Sangat Baik:** Klasifikasi bertingkat (*hierarchical inference*) jauh lebih adil dibanding satu level datar. | Mengadopsi arsitektur hierarkis: Tingkat 1 (KK) lalu Tingkat 2 (Dosen Aktif). | **Ya** (Klasifikasi berjenjang) |
| **10** | **Bruch, S., Gai, S.-Y., & Ingber, A. (2022).** *An Analysis of Fusion Functions for Hybrid Retrieval.* ACM TOIS, 42. | 2022 \| Scopus Q1 / ACM | 9 benchmark dataset information retrieval skala besar | Analisis fungsi fusi hibrida leksikal (BM25/TF-IDF) + semantik (Dense) | Kombinasi cembung linier (*convex combination*) vs Reciprocal Rank Fusion | Kombinasi linier berbobot (*weighted late-fusion*) mengungguli metode fusi non-parametrik | **Sangat Baik:** Membuktikan *weighted late-fusion* paling efisien komputasi dan mudah di-tuning. | Landasan matematis penggabungan skor klasifikasi TA dan skor kemiripan publikasi. | **Ya** (Scoring engine backend) |
| **11** | **Sun, Z., Fang, H., Yang, J., et al. (2022).** *DaisyRec 2.0: Benchmarking Recommendation for Rigorous Evaluation.* IEEE TPAMI, 45. | 2022 \| Scopus Q1 / IEEE | 6 dataset benchmark recommender system, 10 algoritma baseline | Benchmarking protokol evaluasi sistem rekomendasi terstandar | Prosedur split data terstandar dan evaluasi metrik multi-dimensi | Standar pelaporan Hit Rate, MRR, NDCG, Precision, Recall pada Top-k | **Sangat Baik:** Mencegah bias evaluasi yang tidak adil akibat metrik akurasi tunggal (*Overall Accuracy*). | Menjadi acuan protokol evaluasi QA Gates SI-REKTA (Top-1, Top-3, MRR, Macro-F1). | **Ya** (Pipeline evaluasi offline) |
| **12** | **Luo, X., Yu, Z., Zhao, Z., et al. (2022).** *Effective short text classification via the fusion of hybrid features.* Digit. Commun. Netw., 8(5). | 2022 \| Scopus Q1 / Elsevier | 5 dataset populer teks ringkas dan korpus data sosial IoT | Fusi fitur hibrida statistik (TF-IDF) + semantik kontekstual (Embeddings) | Pembobotan representasi teks pendek untuk menyeimbangkan kelas langka | **Akurasi dan F1-Score mengungguli seluruh model representasi fitur tunggal** | **Sangat Baik:** Fusi fitur leksikal dan semantik paling tangguh menangani teks sangat pendek. | Mengadopsi kombinasi ekstraksi fitur leksikal n-gram pada teks judul akademik. | **Ya** (Feature extraction engine) |
| **13** | **Saraswati, N. W. S., Yanti, C. P., et al. (2025).** *Evaluation Analysis of the Necessity of Stemming and Lemmatization in Text Classification.* MATRIK, 24(2). | 2025 \| Jurnal Nasional Sinta | Korpus teks bahasa Indonesia dan Inggris, skenario seimbang vs timpang | TF-IDF, Support Vector Machine (SVM), uji perbandingan variasi stemming | Meneliti dampak preprocessing morfologis pada data teks tidak seimbang | **Akurasi teks Indonesia seimbang: 82,08% (dengan stemming); timpang: 82,62%** | **Baik:** Membuktikan bahwa penerapan stemming harus dievaluasi secara terukur sesuai karakteristik data. | Menjadi dasar pengujian *ablation study* pipeline Sastrawi pada korpus SI-REKTA. | **Ya** (Pipeline preprocessing teks) |

---

## 3.2 Analisis & Jawaban Komprehensif atas Research Questions (RQ)

### 3.2.1 Pembahasan RQ1: Sintesis Preprocessing & Ekstraksi Fitur Teks Pendek Dwisumber
Karakteristik teks pada SI-REKTA memiliki keunikan tersendiri: teks judul tugas akhir mahasiswa memiliki rata-rata **16,6 kata**, sedangkan judul publikasi riset dosen memiliki rata-rata **13,7 kata**. Keduanya merupakan teks pendek (*short-text*) yang bilingual dan padat istilah teknis. 

Sintesis literatur mutakhir (*Sajid et al., 2026; Luo et al., 2022; Saraswati et al., 2025*) membuktikan bahwa pendekatan terbaik bukanlah mengandalkan representasi tunggal, melainkan memadukan:
1. **Prapengolahan Teks Bertahap:**  
   Pembersihan karakter non-alfanumerik, *case folding*, dan penghapusan kata fungsional melalui *stopword removal* akademik khusus. Literatur membuktikan bahwa kata-kata template skripsi (*"rancang bangun"*, *"pengembangan"*, *"berbasis web"*, *"studi kasus"*) harus dieliminasi agar bobot numerik terfokus murni pada kata kunci pembeda keahlian (*Sajid et al., 2026; Damayanti et al., 2025*). Untuk stemming bahasa Indonesia, studi empiris *Saraswati et al. (2025)* menunjukkan bahwa stemming memberikan akurasi 82,08% pada data seimbang, namun harus diuji secara hati-hati pada data tidak seimbang agar tidak merusak istilah teknis asing.
2. **Representasi Fitur Hibrida (Leksikal + Semantik):**  
   Penggunaan **TF-IDF Word N-Gram (1–2 gram)** terbukti sangat tangguh mengikat frasa teknis spesifik (*"business intelligence"*, *"sistem pendukung keputusan"*, *"deep learning"*), sementara **Character N-Gram (3–5 gram)** memberikan toleransi terhadap variasi saltik (*typo*) atau singkatan mahasiswa (*Luo et al., 2022; Sinaga & Kurniawan, 2025*). Dipadukan dengan kemiripan kosinus (*Cosine Similarity*), representasi ini menghasilkan akurasi pencocokan Top-3 mencapai 80,56% dan MRR 0,6607 (*Sajid et al., 2026*).

### 3.2.2 Pembahasan RQ2: Metode Integrasi (Fusion) Kedua Dataset ke Model Rekomendasi
Kelemahan terbesar pemodelan berbasis data historis tugas akhir tunggal (`Judul_TA.csv`) adalah fenomena *cold-start* ekstrem di mana 5 dari 17 dosen tetap aktif (29,4%) memiliki nilai bimbingan nol ($N=0$). Literatur penugasan akademik (*Fitri et al., 2025; Maurya et al., 2025; De Campos et al., 2024*) menegaskan bahwa integrasi data dwisumber (*dual-source fusion*) adalah solusi ilmiah paling elegan. Publikasi dosen (`Publikasi_Dosen.csv`) yang mencakup 643 paper riil 17 dosen aktif menyediakan *ground-truth* kepakaran yang kaya.

Konsensus literatur mengenai fusi data (*Bruch et al., 2022; Fitri et al., 2025; Nguyen et al., 2025*) membuktikan bahwa kombinasi cembung linier (*convex combination late-fusion*) mengungguli metode fusi non-parametrik. Oleh sebab itu, SI-REKTA menetapkan formulasi matematis **Dynamic Late-Fusion Scorer**:

$$\text{Final\_Score}(D_i) = \alpha_i \cdot \text{Sim}_{\text{Publikasi}}(Q, D_i) + (1 - \alpha_i) \cdot P_{\text{Historis}}(D_i | Q)$$

Keterangan mekanisme dinamis bobot $\alpha_i$:
* **Untuk Dosen Baru (*Zero-History Cold-Start*, $N_{\text{hist}} = 0$):**  
  Nilai bobot ditetapkan $\alpha_i = 1,0$ secara otomatis. Skor rekomendasi murni dihitung 100% dari kemiripan semantik kosinus antara kueri mahasiswa dengan profil publikasi riset dosen tersebut, tanpa rekayasa data fiktif.
* **Untuk Dosen Senior / Memiliki Riwayat ($N_{\text{hist}} > 0$):**  
  Nilai bobot ditetapkan seimbang ($\alpha_i = 0,35$ hingga $0,50$), menggabungkan probabilitas klasifikasi bimbingan masa lalu (*Linear SVM Balanced*) dengan fokus riset terkininya (*Fitri et al., 2025*).

### 3.2.3 Pembahasan RQ3: Standar Metrik Evaluasi Ranking Top-k dan Benchmark Kelayakan
Literatur recommender system menolak keras penggunaan metrik *Overall Accuracy* tunggal pada kasus data akademik yang timpang (*Sun et al., 2022; Xiao et al., 2023*). Model yang secara naif selalu menebak dosen mayoritas akan tampak memiliki akurasi tinggi, padahal gagal total mengenali dosen minoritas. Karena sistem menyajikan daftar pilihan jamak bagi mahasiswa, metrik yang tepat adalah metrik evaluasi peringkat (*ranking metrics*):
1. **Top-3 Accuracy (Hit Rate @ 3):** Mengukur apakah dosen yang tepat berada di dalam 3 rekomendasi kartu teratas (*Fitri et al., 2025; Sajid et al., 2026*).
2. **Mean Reciprocal Rank (MRR @ 3):** Mengukur ketepatan urutan posisi peringkat dosen yang paling relevan pada daftar rekomendasi (*Sajid et al., 2026; Sun et al., 2022*).
3. **Macro-Averaged F1-Score:** Mengukur keadilan performa presisi dan recall secara netral untuk seluruh 17 dosen tanpa terdistorsi volume data kelas mayoritas (*Xiao et al., 2023*).

Berdasarkan sintesis skor riil pada Tabel 3.1 (*Sajid et al., 2026; Fitri et al., 2025; Sinaga & Kurniawan, 2025*), ditetapkan standar ambang batas (*benchmark*) minimum agar sistem rekomendasi dinilai **LAYAK / BAIK**:
* **Top-3 Accuracy (Hit@3) $\ge 0,80$ (80%)**
* **Mean Reciprocal Rank (MRR @ 3) $\ge 0,60$**
* **Macro-Averaged F1-Score $\ge 0,70$ (70%)** pada evaluasi klasifikasi seimbang.

### 3.2.4 Pembahasan RQ4: Alur Proses Bisnis Rekomendasi & Transparansi Explainable AI
Penerapan machine learning pada lingkungan akademik wajib mendukung proses bisnis organisasi yang nyata (*Pedoman Topik TA DSI 2025; Panduan Pelaksanaan TA 2025*). Literatur inferensi dokumen (*Xiao et al., 2023; De Campos et al., 2024*) merekomendasikan alur kerja bertingkat yang transparan:

```text
┌────────────────────────┐
│ Mahasiswa Input Draf   │
│ Judul & Deskripsi TA   │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│ Prapengolahan NLP &    │
│ Ekstraksi TF-IDF Ngram │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ TINGKAT 1: Klasifikasi Kelompok Keahlian (KK)          │
│ Memetakan usulan ke 4 KK resmi: RD-BI, SD, SE, TK-ITI  │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ TINGKAT 2: Dynamic Late-Fusion Perankingan Dosen       │
│ Menggabungkan Skor Publikasi & Riwayat Bimbingan       │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ KELUARAN SISTEM (EXPLAINABLE AI):                      │
│ • Kartu Profil Top-3 Dosen Pembimbing Aktif            │
│ • Persentase Skor Kecocokan Semantik                   │
│ • Kata Kunci Penentu (Explainable Keywords)            │
│ • Contoh Bukti Judul Publikasi Riset Asli Dosen        │
└───────────┬────────────────────────────────────────────┘
            │
            ▼
┌────────────────────────────────────────────────────────┐
│ PEMANFAATAN REGULASI AKADEMIK RESMI:                   │
│ • Mahasiswa mengisi Formulir TA-01 / Formulir TA-02    │
│ • Verifikasi & Penerbitan SK Pembimbing Form TA-04     │
│   oleh Koordinator TA / Ketua Departemen               │
└────────────────────────────────────────────────────────┘
```

Pendekatan *Model-Intrinsic Explanation* ini didukung kuat oleh *de Campos et al. (2024)*, di mana penyajian kata kunci dominan (*tag clouds*) dan kutipan artikel riset serupa terbukti mendongkrak skor kepuasan serta kepercayaan sivitas akademika hingga 6,12 dari skala 7,0.

### 3.2.5 Pembahasan RQ5: Arsitektur Perangkat Lunak Berbasis Web untuk Penerapan Nyata
Studi implementasi sistem pakar dan layanan AI (*Wang et al., 2024; Falah & Suryawan, 2022; De Campos et al., 2024*) menegaskan bahwa sistem rekomendasi akademik paling andal diimplementasikan menggunakan arsitektur web tiga tingkat (**Three-Tier Architecture**):
1. **Presentation Layer (Frontend):**  
   Antarmuka web interaktif (menggunakan Streamlit atau React) yang menyediakan formulir input draf judul, visualisasi kartu profil Top-3 dosen pembimbing aktif, bar tingkat kecocokan numerik, serta panel kata kunci penjelas (*Explainable UI*).
2. **Application / Service Layer (Backend REST API):**  
   Layanan API modular berbasis framework berkinerja tinggi **FastAPI (Python)**. Service layer ini mengisolasi seluruh logika bisnis: memanggil modul normalisasi teks, menjalankan inferensi klasifikasi KK, menghitung kemiripan kosinus terhadap matriks publikasi dosen, menghitung bobot *dynamic late-fusion*, serta menyajikan respons JSON terstruktur dengan latensi inferensi di bawah 0,1 detik (*Wang et al., 2024*).
3. **Data Layer (Storage & Serialization):**  
   Menyimpan basis data relasional (SQLite/PostgreSQL) untuk pencatatan riwayat pengajuan judul, tabel profil 17 dosen tetap aktif, serta berkas serialisasi pipeline model pembelajaran mesin terkompresi (`si_rekta_pipeline.joblib`) yang dimuat secara *in-memory* saat server dinyalakan.

## 3.3 Implikasi Praktis & Rekomendasi untuk Proyek SI-REKTA
Berdasarkan seluruh hasil sintesis literatur, ditetapkan lima keputusan metodologis final bagi pengembangan sistem SI-REKTA di Departemen Sistem Informasi FTI Universitas Andalas:
1. **Entity Canonicalization & Data Cleansing:**  
   Menyeragamkan variasi penulisan nama dan gelar dosen pada kedua dataset ke standar entitas resmi, serta membersihkan tanda baca dan stopword formal akademik.
2. **Active Faculty Whitelist (17 Dosen Tetap Aktif):**  
   Membatasi semesta rekomendasi akhir secara ketat hanya pada **17 Dosen Tetap Aktif** DSI Unand. Dosen luar departemen dan dosen yang telah mutasi tugas difilter keluar dari target rekomendasi.
3. **Penyelarasan dengan 4 Kelompok Keahlian (KK):**  
   Menyelaraskan rekomendasi berjenjang dengan 4 rumpun keahlian resmi:
   * **RD-BI (Rekayasa Data & Business Intelligence)**: Prof. Surya Afnarius, Ph.D.; Febby Apri Wenando, M.Eng., Ph.D.; Rahmatika Pratama Santi, M.T.; Aina Hubby Aziira, M.Eng.
   * **SD (System Development)**: Nisa Dwi Angresti, M.Kom.; Husnil Kamil, M.T.; Afriyanti Dwi Kartika, S.Pd., M.T.; Dwi Welly Sukma Nirad, M.T.; Hafzatin Nurlatifa, M.Eng.
   * **SE (System Enterprise)**: Hafizah Hanim, M.Kom.; Haris Suryamen, M.Sc.; Ricky Akbar, M.Kom.; Jefril Rahmadoni, M.Kom.; Ullya Mega Wahyuni, M.Kom.
   * **TK-ITI (Tata Kelola & Infrastruktur TI)**: Adi Arga Arifnur, M.Kom.; Fajril Akbar, M.Sc.; Hasdi Putra, M.T.
4. **Two-Tier Engine dengan Dynamic Late-Fusion:**  
   Menerapkan klasifikasi Tingkat 1 (Kelompok Keahlian) dan perankingan Tingkat 2 menggunakan fusi linier dinamis antara probabilitas riwayat skripsi dan kemiripan kosinus publikasi riset dosen.
5. **Transparansi & Explainable AI (XAI):**  
   Menampilkan bobot kata kunci TF-IDF tertinggi serta contoh judul publikasi riset asli dosen pada antarmuka sistem sebagai bukti rasionalitas akademik bagi mahasiswa dan koordinator tugas akhir.

---

# BAB 4: KESIMPULAN

## 4.1 Kesimpulan Utama Review
Tinjauan literatur sistematis berbasis PRISMA terhadap 13 studi empiris mutakhir (2022–2026) membuktikan bahwa pengembangan sistem rekomendasi dosen pembimbing tugas akhir berbasis **Dual-Source Hierarchical Late-Fusion** merupakan konfigurasi paling unggul dan defensibel secara ilmiah. Integrasi dua dataset—riwayat tugas akhir mahasiswa (Dataset 1) dan publikasi riset ilmiah dosen (Dataset 2)—terbukti berhasil memecahkan persoalan *zero-history faculty cold-start* bagi dosen-dosen baru secara 100% adil tanpa merekayasa data fiktif. Lebih lanjut, pemaduan ekstraksi fitur TF-IDF n-gram leksikal dengan perankingan semantik kosinus berbobot dinamis mampu menjamin akurasi Top-3 di atas 80% dengan waktu komputasi yang sangat cepat.

## 4.2 Keterbatasan Tinjauan (Threats to Validity)
Keterbatasan dalam pelaksanaan SLR ini mencakup:
1. Variasi pelaporan metrik pada studi terdahulu yang tidak selalu seragam, di mana sebagian paper hanya melaporkan metrik *Hit@5* atau *AUC* tanpa mencantumkan rincian *Macro-F1* per kelas dosen.
2. Karakteristik dataset publikasi dosen yang diuji di literatur internasional umumnya berukuran ribuan naskah dalam bahasa Inggris penuh, sehingga tingkat transferabilitas performa pada korpus dwibahasa lokal DSI Unand tetap memerlukan pengujian *ablation study* secara berkala.

## 4.3 Arah Penelitian Selanjutnya (Future Work)
Pengembangan lanjutan proyek SI-REKTA direkomendasikan untuk:
1. Melakukan pengujian eksperimen lokal (*ablation study*) antara representasi TF-IDF n-gram leksikal murni vs representasi *Sentence-BERT* (IndoBERT/SciBERT) untuk mengukur rasio trade-off antara peningkatan akurasi dan latensi inferensi komputasi.
2. Mengembangkan modul optimasi kendala kapasitas kuota bimbingan dosen berbasis *Integer Linear Programming* (ILP) guna mencegah penumpukan bimbingan pada dosen senior secara otomatis pada tingkat fakultas.
3. Melakukan studi kegunaan pengguna (*user acceptance testing*) bersama mahasiswa dan komisi tugas akhir untuk memvalidasi tingkat keterbacaan penjelasan *Explainable AI* sebelum sistem diintegrasikan penuh ke portal akademik kampus.

---

# DAFTAR PUSTAKA

1. Bruch, S., Gai, S.-Y., & Ingber, A. (2022). An Analysis of Fusion Functions for Hybrid Retrieval. *ACM Transactions on Information Systems*, 42(1), 1-35. https://doi.org/10.1145/3596512
2. Damayanti, A., Purwani, F., & Kadafi, M. (2025). A Content-Based Thesis Supervisor Recommendation System Based on Research Interest Clustering and Cosine Similarity. *JUSIFO (Jurnal Sistem Informasi)*, 11(2), 121-134. https://doi.org/10.19109/jusifo.v11i2.27605
3. de Campos, L. D., Fernández-Luna, J. M., Huete, J. F., Ribadas-Pena, F. J., & Bolaños, N. (2024). Information Retrieval and Machine Learning Methods for Academic Expert Finding. *Algorithms*, 17(2), 51. https://doi.org/10.3390/a17020051
4. de Campos, L. D., Fernández-Luna, J. M., & Huete, J. F. (2024). An explainable content-based approach for recommender systems: A case study in journal recommendation for paper submission. *User Modeling and User-Adapted Interaction*, 34, 1431-1465. https://doi.org/10.1007/s11257-024-09400-6
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
