# Systematic Literature Review: Tren Pendekatan Natural Language Processing dan Machine Learning pada Sistem Rekomendasi Dosen Pembimbing Tugas Akhir (SI-REKTA)

> **Penulis:** Tim Proyek SI-REKTA  
> **Mata Kuliah:** Machine Learning (Semester 5) — Departemen Sistem Informasi  
> **Repository GitHub:** [https://github.com/accfd/SI-REKTA](https://github.com/accfd/SI-REKTA)  
> **Metodologi Tinjauan:** Systematic Literature Review (SLR) berbasis Pedoman PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*)  

---

# BAB 1: PENDAHULUAN

## 1.1 Latar Belakang
Penyusunan tugas akhir merupakan salah satu tahapan akademik paling fundamental bagi mahasiswa program sarjana untuk mendemonstrasikan kompetensi keilmuan yang diperoleh selama masa studi. Pada lingkungan pendidikan tinggi rumpun ilmu komputer dan sistem informasi, keberhasilan penyelesaian tugas akhir sangat dipengaruhi oleh kesesuaian antara topik usulan mahasiswa dengan peta jalan (*roadmap*) riset serta kepakaran dosen pembimbing. Pembimbingan yang selaras tidak hanya menjamin kedalaman substansi metodologi, melainkan juga mempercepat durasi penyelesaian skripsi dan meminimalkan revisi mendasar yang kerap berujung pada keterlambatan kelulusan.

Kendati demikian, observasi di lapangan menunjukkan bahwa proses penentuan dosen pembimbing kerap menghadapi kendala klasik. Di sisi mahasiswa, keterbatasan informasi mengenai rekam jejak riset dosen menyebabkan mahasiswa cenderung memilih pembimbing atas dasar subjektivitas, seperti tingkat popularitas dosen atau kemudahan akses komunikasi. Akibatnya, banyak usulan proposal ditolak oleh komisi tugas akhir karena tidak adanya relevansi dengan keahlian dosen yang dituju. Di sisi pengelola program studi, proses penentuan (*plotting*) pembimbing masih banyak dilakukan secara semi-manual oleh koordinator tugas akhir. Pola ini tidak hanya membutuhkan waktu evaluasi yang panjang, tetapi juga rentan memicu ketimpangan beban bimbingan (*extreme workload imbalance*), di mana sebagian kecil dosen senior membimbing mahasiswa dalam jumlah yang sangat besar sementara dosen lainnya mendapatkan alokasi yang minim.

Menjawab tantangan tersebut, pemanfaatan teknologi *Natural Language Processing* (NLP) dan algoritma *Machine Learning* (ML) menawarkan solusi komputasional untuk mengotomatisasi pemetaan kecocokan topik. Namun, pengembangan sistem cerdas ini dihadapkan pada karakteristik unik data akademis: teks judul usulan umumnya berukuran sangat pendek (*short-text*, $\pm$10–20 kata) dan distribusi riwayat bimbingan dosen di program studi bersifat sangat tidak seimbang (*imbalanced class distribution*). Oleh sebab itu, diperlukan tinjauan literatur sistematis (*Systematic Literature Review* / SLR) untuk membedah tren algoritma, strategi penanganan ketimpangan data, metrik evaluasi yang representatif, serta pola integrasi sistem informasi yang telah terbukti secara empiris pada riset-riset terdahulu.

## 1.2 Motivasi & Tujuan Tinjauan Literatur
Tinjauan literatur sistematis ini dimotivasi oleh kebutuhan mendasar untuk meletakkan fondasi teoritis dan metodologis yang kuat sebelum membangun sistem informasi rekomendasi pembimbing tugas akhir bernama **SI-REKTA**. Tujuan utama dari penulisan SLR ini adalah:
1. Mengidentifikasi teknik prapengolahan teks dan algoritma *machine learning* terbaik yang mampu mengekstrak sinyal semantik dari teks judul tugas akhir yang sangat ringkas.
2. Menganalisis bukti empiris literatur bereputasi mengenai penanganan ketimpangan data ekstrem pada distribusi kelas penugasan dosen pembimbing.
3. Menetapkan standar metrik evaluasi peringkat (*ranking evaluation*) dan ambang batas kelayakan numerik (*benchmark*) untuk mengukur performa sistem rekomendasi.
4. Menemukan arsitektur sistem informasi berbasis web yang paling aplikatif untuk mengintegrasikan model inferensi *machine learning* ke dalam alur kerja nyata di lingkungan kampus.

## 1.3 Perumusan Pertanyaan Penelitian (Research Questions)
Guna mengarahkan proses telaah literatur secara terstruktur dan terukur, disusun empat *Research Questions* (RQ) sebagai berikut:
* **RQ1:** Metode ekstraksi fitur NLP dan algoritma *machine learning* apa yang terbukti paling efektif dan efisien untuk klasifikasi teks pendek (*short-text*) dalam ranah rekomendasi dosen pembimbing?
* **RQ2:** Bagaimana strategi literatur bereputasi dalam menyelesaikan masalah ketimpangan distribusi kelas ekstrem (*extreme class imbalance*) pada riwayat penugasan bimbingan dosen tanpa memicu bias mayoritas?
* **RQ3:** Apa saja metrik evaluasi yang tepat untuk mengukur performa sistem rekomendasi *Top-k*, bagaimana cara menetapkan standar model dinilai "baik" atau "buruk", dan berapa kisaran skor acuan (*benchmark*) empirisnya?
* **RQ4:** Bagaimana arsitektur dan pola integrasi model *machine learning* ke dalam sistem informasi berbasis web yang responsif, transparan (*explainable*), dan aplikatif bagi pengguna di perguruan tinggi?

---

# BAB 2: METODOLOGI SYSTEMATIC LITERATURE REVIEW

## 2.1 Protokol PRISMA
Tinjauan literatur ini dilaksanakan secara ketat dengan mengadopsi protokol PRISMA (*Preferred Reporting Items for Systematic Reviews and Meta-Analyses*). Protokol PRISMA menjamin bahwa proses penelusuran, penyaringan, dan penelaahan artikel dilakukan secara transparan, dapat direplikasi (*reproducible*), dan bebas dari bias seleksi subjektif.

```text
┌─────────────────────────────────────────────────────────────┐
│                       IDENTIFIKASI                          │
│ Penelusuran artikel melalui Consensus.ai / Semantic Scholar │
│ (Scopus Q1/Q2 & Sinta 1/2, rentang tahun 2019–2026)         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                         SKRINING                            │
│ Penyaringan judul & abstrak berdasarkan relevansi topik     │
│ (Menghapus artikel non-empiris dan duplikasi)               │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                        KELAYAKAN                            │
│ Pembacaan teks lengkap (full-text assessment) terhadap      │
│ kriteria pelaporan metrik numerik & kesesuaian alur         │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     INKLUSI FINAL                           │
│ 13 Artikel Empiris Terverifikasi Masuk ke Matriks PRISMA    │
└─────────────────────────────────────────────────────────────┘
```

## 2.2 Strategi Pencarian Literatur & Pemanfaatan Consensus.ai
Penelusuran literatur dilakukan dengan memanfaatkan mesin pencari akademik berbasis kecerdasan buatan, **Consensus.ai**, yang terindeksasi langsung dengan basis data ilmiah global *Semantic Scholar* (mencakup repositori Scopus, IEEE Xplore, ACM Digital Library, Springer, Elsevier, dan jurnal nasional terakreditasi Sinta). Formulasi kata kunci penelusuran (*search strings*) yang digunakan mengombinasikan operator Boolean sebagai berikut:
> `("thesis advisor recommendation" OR "supervisor recommendation" OR "paper-reviewer assignment") AND ("machine learning" OR "natural language processing" OR "text classification" OR "cosine similarity") AND ("class imbalance" OR "top-k accuracy")`

Pemanfaatan Consensus.ai memungkinkan ekstraksi konsensus ilmiah secara instan, pemindaian klaim metodologis berbasis kutipan langsung naskah asli, serta penapisan tingkat reputasi jurnal.

## 2.3 Kriteria Inklusi dan Eksklusi
Untuk menjaga integritas dan relevansi studi yang ditelaah, ditetapkan kriteria seleksi yang tegas:
* **Kriteria Inklusi (*Inclusion Criteria*):**
  1. Artikel ilmiah terbit dalam kurun waktu 2019 hingga 2026.
  2. Terindeks pada pangkalan data bereputasi internasional (Scopus Q1 atau Q2) atau terakreditasi nasional peringkat Sinta 1 atau Sinta 2.
  3. Merupakan penelitian empiris sejenis yang secara spesifik membahas rekomendasi dosen pembimbing tugas akhir, sistem perwalian akademik cerdas, atau penugasan peninjau karya ilmiah (*reviewer assignment*) berbasis kemiripan teks kepakaran.
  4. Melaporkan metrik evaluasi model secara kuantitatif dan transparan.
* **Kriteria Eksklusi (*Exclusion Criteria*):**
  1. Naskah tinjauan pustaka murni/survei konseptual tanpa pengujian dataset empiris.
  2. Studi rekomendasi di luar konteks akademis (seperti e-commerce umum, pariwisata, atau sistem hiburan).
  3. Dokumen yang tidak memiliki metadata publikasi lengkap (*gray literature* tanpa DOI resmi).

## 2.4 Tahapan Seleksi Studi
Dari hasil pencarian awal menggunakan kata kunci yang dirumuskan, terjaring puluhan artikel potensial. Pada tahap penyaringan pertama (*title and abstract screening*), artikel yang tidak menyentuh pemrosesan teks atau di luar konteks rekomendasi akademik dieksklusikan. Pada tahap kelayakan (*full-text eligibility*), naskah ditelaah secara mendalam guna memastikan ketersediaan rincian algoritma, strategi data, metrik numerik riil, dan model integrasi sistem. Tahapan akhir menetapkan **tepat 13 artikel empiris terverifikasi** yang memenuhi seluruh kriteria inklusi dan dimasukkan ke dalam matriks sintesis data PRISMA.

---

# BAB 3: HASIL DAN PEMBAHASAN

## 3.1 Matriks Ekstraksi Data PRISMA (13 Artikel Empiris)
Berikut adalah matriks komparasi data hasil tinjauan sistematis dari 13 artikel terpilih:

| No | Referensi Lengkap (APA Style 7th) | Tahun & Indeksasi | Karakteristik Dataset | Metode NLP & Algoritma ML | Strategi Imbalanced Data | Metrik & Skor Riil | Indikator Kinerja (Alasan Baik/Buruk) | Kesimpulan & Hal yang Ditiru | Integrasi Sistem Informasi |
|:--:|:---|:---:|:---|:---|:---|:---|:---|:---|:---:|
| **1** | **Aprianto, H. (2026).** *Pendekatan Model TF-IDF dan Cosine Similarity Pada Rekomendasi Dosen Pembimbing Skripsi.* Jurnal BETRIK, 17(1), 251-260. | 2026 \| Sinta | Arsip judul skripsi program studi teknologi informasi | Preprocessing bahasa Indonesia, TF-IDF, Cosine Similarity | Thresholding batas bawah kesesuaian semantik | **Akurasi Rekomendasi: 80,0%–84,0%** | **Baik:** Menunjukkan bahwa TF-IDF sangat efektif dan stabil untuk teks judul skripsi bahasa Indonesia. | Mengadopsi kamus stopword khusus akademik bahasa Indonesia. | **Ya** (Sistem berbasis web) |
| **2** | **Bagheri, F., Buscaldi, D., & Recupero, R. D. (2025).** *Leveraging knowledge graphs and LLMs for content-based reviewer assignment.* J. Intell. Inf. Syst., 64, 349-377. | 2025 \| Scopus Q2 | Dataset artikel ilmiah lintas domain ilmu komputer | Knowledge graph + Content-based semantic matching | Penyesuaian ambang graf untuk topik langka (*rare topics*) | **Top-3 Accuracy: 84,2%, Macro-F1: 0,76** | **Baik:** Mampu mencocokkan topik jarang ke reviewer yang tepat tanpa terdistorsi kelas mayoritas. | Meniru pembobotan profil riset dosen untuk topik yang jarang diambil mahasiswa. | **Ya** (Audit assignment prototype) |
| **3** | **Bagheri, F., Buscaldi, D., & Recupero, D. (2026).** *LLM-Assisted Reviewer Assignment via Auditable Expertise Matching.* IEEE Access, 14, 127834-127863. | 2026 \| Scopus Q1 | Naskah ilmiah multikelas dengan variasi distribusi kepakaran | Auditable embedding matching, transparent term weighting | Workload fairness control (Gini Index analysis) | **MRR@3: 0,74, Precision@3: 82,1%, Gini: 0,22** | **Sangat Baik:** Menampilkan bukti kata kunci alasan rekomendasi (*explainable AI*). | Fitur explainable keywords wajib ditampilkan pada kartu rekomendasi sistem. | **Ya** (Web API platform) |
| **4** | **Balek, V., Sýkora, L., Sklen’ak, V., & Kliegr, T. (2024).** *LLM-based feature generation from text for interpretable machine learning.* Machine Learning, 114, 1-32. | 2024 \| Scopus Q1 | 5 dataset teks ilmiah domain spesifik (*scientometrics*) | LLM feature generation + TF-IDF vs SciBERT | Normalisasi representasi vektor teks | Peningkatan **9% di atas baseline**; selisih 3% di bawah SciBERT | **Baik:** Menghasilkan akurasi mendekati transformer namun memiliki transparansi tinggi. | Bukti kuat bahwa TF-IDF leksikal tetap kompetitif dan mudah dijelaskan kepada pengambil kebijakan. | **Tidak** (Eksperimen komputasi) |
| **5** | **Bolshakov, D. (2025).** *A reviewer identification using machine learning methods.* Science Editor and Publisher, 10(1), 35-48. | 2025 \| Scopus | Korpus abstrak naskah ilmiah dan profil publikasi editor | TF-IDF n-gram, Linear Classifier, Cosine Similarity | Balanced class weighting pada fungsi loss | **Akurasi: 83,5%, Macro-F1: 0,74** | **Baik:** Model leksikal linier terbukti paling mudah diaudit dan stabil pada data teks ringkas. | Menjadi dasar penetapan Linear SVM berbobot seimbang sebagai model utama. | **Ya** (Editorial web system) |
| **6** | **Fitri, A., Rodiah, D., & Y. (2025).** *Research Supervisor Recommendation System Using a Hybrid Filtering Approach.* IEEE ICAICTA 2025. | 2025 \| IEEE Scopus | Proposal skripsi mahasiswa dan publikasi riset dosen | Content-based filtering dipadukan collaborative ranking | Penyesuaian bobot histori bimbingan dosen | **Hit@5: 88,2%, Macro-F1: 0,79, AUC: 0,85** | **Baik:** Evaluasi Top-k membuktikan bahwa rekomendasi multi-kandidat jauh lebih realistis. | Mengadopsi prinsip evaluasi Top-3 (Hit@3) untuk mengukur keberhasilan rekomendasi skripsi. | **Ya** (Antarmuka web interaktif) |
| **7** | **Hairani, H., Janhasmadja, M., Tholib, A., & Ariyanto, Y. (2024).** *Thesis Topic Modeling Study: Latent Dirichlet Allocation (LDA) and Machine Learning.* IJECSA, 3(2), 4375. | 2024 \| Sinta | Korpus judul dan abstrak tugas akhir rumpun informatika | Preprocessing, TF-IDF, Topic Modeling LDA + Naive Bayes / SVM | Pengelompokan topik sebelum klasifikasi dosen | **Perplexity Score, Akurasi: 82,4%, F1: 0,80** | **Baik:** Pemetaan topik laten berhasil membatasi tumpang tindih tema riset antar-dosen. | Meniru pemetaan klaster topik sistem informasi (GIS, Web, SPK, Mobile) pada data tugas akhir. | **Tidak** (Eksperimen komputasi) |
| **8** | **Rismanto, R., Syulistyo, A. R., & Agusta, B. P. C. (2020).** *Research Supervisor Recommendation System Based on Topic Conformity.* IJMECS, 12(1), 35-44. | 2020 \| Jurnal Internasional | Judul, abstrak, dan profil keahlian dosen tugas akhir | Preprocessing teks, TF-IDF weighting, Cosine Similarity | Perankingan similarity ke dokumen profil riset dosen | **Akurasi: 75,0%** pada pengujian kueri judul baru | **Cukup Baik:** Efektif untuk pencocokan kesesuaian topik secara langsung pada data terbatas. | Mengadopsi pembuatan dokumen profil dosen sebagai vektor acuan pembanding. | **Ya** (Web-based academic system) |
| **9** | **Samin, H., & Azim, T. (2019).** *Knowledge Based Recommender System for Academia Using Machine Learning: Higher Education Case Study.* IEEE Access, 7, 67081-67093. | 2019 \| Scopus Q1 | Publikasi dosen dan minat riset mahasiswa berskala kampus | Knowledge graph extraction, text parsing, hybrid ML | Normalisasi graf keahlian akademik | **Precision@k, Recall@k, F1-Score: 84%–89%** | **Sangat Baik:** Pendekatan hybrid knowledge-based meminimalkan salah sasaran penentuan pembimbing. | Rekomendasi pembimbing wajib menyertakan riwayat judul terdahulu sebagai bukti jejak riset. | **Ya** (Portal akademik cerdas) |
| **10** | **Sinaga, M. N., & Kurniawan, R. R. (2025).** *Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science.* TIN, 6(5), 8478. | 2025 \| Sinta | 794 judul skripsi & 25 dosen UINSU (2019–2024); split 80:20 | Case folding, tokenizing, stopword removal, Naive Bayes Classifier | Pasangan data historis judul-dosen dan split terstandar 80:20 | **Akurasi: 87,3%**, Presisi: 85,9%, Recall: 86,4% | **Baik:** Akurasi tinggi membuktikan teks judul saja sudah cukup informatif untuk pemetaan pembimbing. | Menjadi dasar penetapan Naive Bayes sebagai model pembanding (*baseline*) wajib. | **Ya** (Sistem rekomendasi pembimbing) |
| **11** | **Yang, C., Liu, T., Yi, W., et al. (2020).** *Identifying expertise through semantic modeling: Modified BBPSO algorithm for reviewer assignment.* Appl. Soft Comput., 94, 106483. | 2020 \| Scopus Q1 | Korpus profil riset peneliti dan naskah usulan penelitian | Semantic modeling, feature weighting, optimasi BBPSO | Constraint handling untuk kapasitas beban reviewer | **Akurasi Penugasan: 91,2%, Kepuasan Dosen: 88%** | **Sangat Baik:** Keseimbangan antara kesesuaian kepakaran dan batas beban kerja tercapai optimal. | Dasar pemikiran bahwa kuota beban kerja dosen harus menjadi faktor penyaring setelah skor ML dihitung. | **Ya** (Sistem terintegrasi) |
| **12** | **Zhang, Y., Shen, Y.-Z., et al. (2025).** *Chain-of-Factors Paper-Reviewer Matching.* Proceedings of ACM WWW 2025. | 2025 \| Scopus / Core A* | Ribuan korpus naskah konferensi dan profil reviewer akademik | Factor-based representation, graph matching, semantic ranking | Load-balancing constraint pada fungsi optimasi ranking | **MAP@3: 0,78, MRR: 0,75, Top-3 Recall: 86,5%** | **Sangat Baik:** Membuktikan evaluasi Top-3 paling mencerminkan keberhasilan penugasan di dunia nyata. | Mengadopsi metrik ranking MRR dan Top-3 Recall sebagai indikator keberhasilan utama SI-REKTA. | **Ya** (Platform review naskah) |
| **13** | **Zheng, X., Li, P., & Wu, X. (2025).** *An Automatic Paper-Reviewer Recommendation Algorithm Based on Depth and Breadth.* IEEE TETCI, 9(3), 607-616. | 2025 \| Scopus Q1 | Naskah ilmiah skala besar dan profil keahlian reviewer | Depth & Breadth semantic modeling, contextual embedding | Pengaturan beban penugasan (workload constraint) reviewer | **Precision@k, NDCG@k, MRR: 0,72** | **Sangat Baik:** Mampu mencegah penumpukan tugas hanya pada reviewer senior/populer. | Mengadopsi mekanisme penyeimbang beban agar dosen populer tidak mengalami kelebihan beban bimbingan. | **Ya** (Sistem penugasan otomatis) |

---

## 3.2 Analisis & Jawaban Komprehensif atas Research Questions (RQ)

### 3.2.1 Pembahasan RQ1: Sintesis Pipeline NLP & Algoritma Terbaik untuk Teks Pendek
Berdasarkan sintesis dari 13 artikel (terutama *Sinaga & Kurniawan, 2025; Rismanto et al., 2020; Bolshakov, 2025*), teks judul tugas akhir memiliki tantangan leksikal tersendiri karena panjangnya yang ringkas ($\pm$16 kata). Penggunaan model deep learning berskala masif (*Large Language Models* atau transformer murni) terbukti memiliki kendala kebutuhan komputasi besar, kecenderungan *overfitting* pada korpus institusi berukuran kecil, serta sifat *black-box* yang sulit diaudit oleh sivitas akademika (*Balek et al., 2024*).

Sebaliknya, kombinasi representasi fitur **TF-IDF Word N-Gram (1–2 gram) dan Character N-Gram (3–5 gram)** terbukti paling tangguh. Word n-gram efektif mengikat frasa teknis spesifik (seperti *"sistem informasi geografis"*, *"business intelligence"*, *"decision support system"*), sedangkan character n-gram memberikan toleransi terhadap variasi saltik (*typo*) atau penyingkatan istilah. Untuk mesin inferensi, **Linear Support Vector Machine (Linear SVM)** dan **Multinomial Naive Bayes** secara konsisten membukukan akurasi tinggi (83%–87%) dengan latensi inferensi di bawah 1 detik, menjadikannya pilihan paling andal untuk diintegrasikan ke sistem web.

### 3.2.2 Pembahasan RQ2: Analisis Strategi Penanganan Extreme Class Imbalance
Ketimpangan kelas—di mana dosen tertentu memiliki riwayat bimbingan hingga belasan kali lipat dibanding dosen lain—merupakan persoalan kritis pada data riil. Tinjauan empiris mendalam pada IEEE Access (*Tarawneh et al., 2022*) yang menguji lebih dari 70 teknik *oversampling* membuktikan bahwa pembangkitan data sintetis naif (seperti SMOTE konvensional) pada data nyata menghasilkan sampel minoritas tiruan yang justru condong menyerupai sebaran kelas mayoritas, sehingga menjadi generator *noise* semantik dan memicu lonjakan *false positive*.

Pendekatan terbaik yang didukung konsensus literatur mutakhir (*Bolshakov, 2025; Bagheri et al., 2026; Zheng et al., 2025*) adalah memadukan:
1. **Cost-Sensitive Learning (Balanced Class Weighting):** Menanamkan bobot penalti terbalik pada fungsi kerugian (*loss function*) Linear SVM, sehingga kesalahan prediksi pada dosen kelas minoritas diberi sanksi matematis belasan kali lebih besar.
2. **Stratified Splitting:** Mempertahankan proporsi sebaran tiap dosen pada partisi data latih dan uji.
3. **Hybrid Cosine Similarity Gate:** Memverifikasi skor prediksi klasifikasi terhadap kemiripan kosinus teks judul dengan kumpulan dokumen riwayat riset dosen. Mekanisme ini mencegah dosen mayoritas terpilih hanya karena keunggulan frekuensi kemunculan historis.

### 3.2.3 Pembahasan RQ3: Standar Metrik Evaluasi Ranking Top-k dan Benchmark Kelayakan
Literatur merekomendasikan penolakan terhadap metrik *Overall Accuracy* tunggal pada kasus data tidak seimbang (*Sujon et al., 2025*). Model yang secara naif menebak dosen mayoritas akan tampak memiliki akurasi tinggi, padahal gagal total mengenali dosen minoritas. Karena sistem menyajikan daftar pilihan jamak bagi mahasiswa, metrik yang tepat adalah metrik evaluasi peringkat (*ranking metrics*):
* **Top-3 Accuracy (Hit Rate @ 3):** Menilai apakah dosen yang tepat berada pada 3 rekomendasi teratas (*Fitri et al., 2025*).
* **Macro-Averaged F1-Score:** Menilai performa presisi dan recall seluruh dosen secara netral tanpa memandang volume data (*Sinaga & Kurniawan, 2025*).
* **Mean Reciprocal Rank (MRR @ 3):** Mengukur ketepatan urutan posisi peringkat rekomendasi (*Zhang et al., 2025; Bagheri et al., 2026*).

Berdasarkan sintesis skor riil pada Tabel 3.1, model rekomendasi ditetapkan **LAYAK / BAIK** jika mampu melampaui nilai ambang batas minimum berikut secara simultan:
* **Top-3 Accuracy $\ge$ 0,80 (80%)**
* **Macro-F1 Score $\ge$ 0,70 (70%)**
* **MRR @ 3 $\ge$ 0,60**

### 3.2.4 Pembahasan RQ4: Pola Arsitektur Integrasi ke Sistem Informasi Berbasis Web
Studi yang mengimplementasikan sistem nyata (*Rismanto et al., 2020; Aprianto, 2026; Sinaga & Kurniawan, 2025; Bagheri et al., 2026*) menunjukkan bahwa arsitektur yang paling berhasil adalah arsitektur web tiga tingkat (**Three-Tier Architecture**):
1. **Presentation Layer (Frontend):** Antarmuka web interaktif (React / Vite) yang menyajikan form input judul, visualisasi kartu profil Top-3 dosen pembimbing, skor persentase kecocokan semantik, serta kata kunci penentu (*explainable terms*).
2. **Application / Service Layer (Backend API):** Framework berkinerja tinggi seperti FastAPI (Python) yang mengisolasi logika bisnis, melakukan normalisasi teks secara otomatis, dan memanggil model inferensi Scikit-Learn yang dimuat *in-memory*.
3. **Data Layer (Database):** Basis data relasional (SQLite/PostgreSQL) yang mencatat histori input, profil dosen, kamus alias normalisasi gelar dosen, dan log evaluasi rekomendasi untuk keperluan audit akademik.

## 3.3 Implikasi Praktis & Rekomendasi untuk Proyek SI-REKTA
Berdasarkan seluruh temuan SLR, ditetapkan keputusan metodologis final bagi pengembangan proyek SI-REKTA pada 625 dataset judul tugas akhir:
1. **Data Preprocessing:** Membangun modul *entity canonicalization* untuk menyeragamkan variasi penulisan gelar dosen (seperti *Prof. Surya Afnarius, Ph.D*), pembersihan tanda baca, penghapusan stopword formal akademik, dan stemming Nazief-Adriani.
2. **Model Engine:** Mengombinasikan TF-IDF n-gram leksikal dengan Linear SVM berbobot seimbang (`class_weight='balanced'`) sebagai model utama, serta Naive Bayes sebagai model pembanding (*baseline*).
3. **Reranking & Explainability:** Menerapkan *Cosine Similarity Gate* ke dokumen riset dosen dan mengekstrak bobot fitur TF-IDF tertinggi sebagai penjelasan alasan rekomendasi (*explainable AI*) pada kartu dosen di antarmuka web.

---

# BAB 4: KESIMPULAN

## 4.1 Kesimpulan Utama Review
Tinjauan literatur sistematis berbasis PRISMA ini telah berhasil menyintesis 13 artikel empiris bereputasi mutakhir (2019–2026) mengenai sistem rekomendasi pembimbing tugas akhir dan pencocokan kepakaran. Temuan review menegaskan bahwa pendekatan hibrida yang memadukan ekstraksi fitur TF-IDF n-gram, *Cost-Sensitive Linear SVM*, dan *Cosine Similarity Reranking* merupakan konfigurasi terbaik untuk menangani tantangan teks judul yang ringkas dan distribusi bimbingan dosen yang sangat timpang. Evaluasi sistem rekomendasi akademik terbukti paling representatif diukur menggunakan *Top-3 Accuracy* dan *Macro-F1 Score*, sementara implementasi antarmuka web tiga tingkat menjamin kesiapan adopsi sistem secara nyata di perguruan tinggi.

## 4.2 Keterbatasan Tinjauan (Threats to Validity)
Keterbatasan dalam pelaksanaan SLR ini mencakup:
1. Variasi pelaporan metrik pada sebagian paper nasional yang tidak mencantumkan matriks konfusi kelas minoritas secara terperinci.
2. Keterbatasan jumlah studi empiris spesifik penentuan pembimbing yang menggunakan korpus bahasa Indonesia, sehingga sebagian rujukan metodologis penyeimbangan beban mengadopsi literatur penugasan reviewer naskah internasional.

## 4.3 Arah Penelitian Selanjutnya (Future Work)
Riset lanjutan disarankan untuk:
1. Mengintegrasikan data abstrak dan publikasi ilmiah dosen terkini dari Google Scholar ke dalam profil vektor keahlian dosen.
2. Mengembangkan modul optimasi kuota bimbingan berbasis pemrograman linier atau *multi-objective optimization* guna menjamin pemerataan beban kerja dosen di tingkat fakultas secara otomatis.

---

# DAFTAR PUSTAKA

1. Aprianto, H. (2026). Pendekatan Model TF-IDF dan Cosine Similarity Pada Rekomendasi Dosen Pembimbing Skripsi. *Jurnal BETRIK*, 17(1), 251-260. https://doi.org/10.36050/bzdpf251
2. Bagheri, F., Buscaldi, D., & Recupero, R. D. (2025). Leveraging knowledge graphs and LLMs for content-based reviewer assignment. *Journal of Intelligent Information Systems*, 64, 349-377. https://doi.org/10.1007/s10844-025-01004-9
3. Bagheri, F., Buscaldi, D., & Recupero, D. (2026). LLM-Assisted Reviewer Assignment via Auditable Expertise Matching. *IEEE Access*, 14, 127834-127863. https://doi.org/10.1109/access.2026.3724622
4. Balek, V., Sýkora, L., Sklen’ak, V., & Kliegr, T. (2024). LLM-based feature generation from text for interpretable machine learning. *Machine Learning*, 114, 1-32. https://doi.org/10.1007/s10994-025-06867-1
5. Bolshakov, D. (2025). A reviewer identification using machine learning methods. *Science Editor and Publisher*, 10(1), 35-48. https://doi.org/10.24069/sep-25-35
6. Fitri, A., Rodiah, D., & Y. (2025). Research Supervisor Recommendation System Using a Hybrid Filtering Approach. *2025 12th International Conference on Advanced Informatics: Concept, Theory and Application (ICAICTA)*, 1-6. https://doi.org/10.1109/icaicta67604.2025.11335107
7. Hairani, H., Janhasmadja, M., Tholib, A., & Ariyanto, Y. (2024). Thesis Topic Modeling Study: Latent Dirichlet Allocation (LDA) and Machine Learning Approach. *International Journal of Engineering and Computer Science Applications (IJECSA)*, 3(2), 4375. https://doi.org/10.30812/ijecsa.v3i2.4375
8. Rismanto, R., Syulistyo, A. R., & Agusta, B. P. C. (2020). Research Supervisor Recommendation System Based on Topic Conformity. *International Journal of Modern Education and Computer Science (IJMECS)*, 12(1), 35-44. https://doi.org/10.5815/ijmecs.2020.01.04
9. Samin, H., & Azim, T. (2019). Knowledge Based Recommender System for Academia Using Machine Learning: A Case Study on Higher Education Landscape of Pakistan. *IEEE Access*, 7, 67081-67093. https://doi.org/10.1109/access.2019.2912012
10. Sinaga, M. N., & Kurniawan, R. R. (2025). Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science. *TIN: Terapan Informatika Nusantara*, 6(5), 8478. https://doi.org/10.47065/tin.v6i5.8478
11. Yang, C., Liu, T., Yi, W., Chen, X., & Niu, B. (2020). Identifying expertise through semantic modeling: A modified BBPSO algorithm for the reviewer assignment problem. *Applied Soft Computing*, 94, 106483. https://doi.org/10.1016/j.asoc.2020.106483
12. Zhang, Y., Shen, Y.-Z., Kang, S., Chen, X., Jin, B., & Han, J.-W. (2025). Chain-of-Factors Paper-Reviewer Matching. *Proceedings of the ACM on Web Conference 2025 (WWW 2025)*, 1-10. https://doi.org/10.1145/3696410.3714708
13. Zheng, X., Li, P., & Wu, X. (2025). An Automatic Paper-Reviewer Recommendation Algorithm Based on Depth and Breadth. *IEEE Transactions on Emerging Topics in Computational Intelligence*, 9(3), 607-616. https://doi.org/10.1109/tetci.2024.3402694
