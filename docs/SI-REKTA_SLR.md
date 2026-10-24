# 🎓 SI-REKTA: Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir

> **Judul Proyek / Tugas Besar:**  
> **Rancang Bangun Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir Berbasis Machine Learning Menggunakan Pendekatan Natural Language Processing (SI-REKTA)**  
> **Mata Kuliah:** Machine Learning (Semester 5) — Departemen Sistem Informasi  
> **Metode Tinjauan:** Systematic Literature Review (SLR) berbasis Pedoman PRISMA  
> **Repository:** [https://github.com/accfd/SI-REKTA](https://github.com/accfd/SI-REKTA)

---

## 📌 Ringkasan Eksekutif & Karakteristik Data Riil

Dokumen ini memuat sintesis tinjauan pustaka sistematis (*Systematic Literature Review* / SLR) berbasis kerangka kerja PRISMA dari **12 artikel ilmiah bereputasi internasional (Scopus Q1/Q2) dan nasional terakreditasi (Sinta)** terbitan 2019–2026. Fokus kajian ditujukan pada studi empiris sejenis: **Sistem Rekomendasi Pembimbing Tugas Akhir (*Thesis Supervisor Recommendation*)** dan **Pencocokan Keahlian Peninjau Ilmiah (*Paper-Reviewer Expertise Matching*)**.

### Temuan Kunci Exploratory Data Analysis (EDA) Dataset Riil (`Judul_TA.csv`):
1. **Karakteristik Teks Pendek (*Short-Text*):** Dataset terdiri atas 625 arsip judul tugas akhir mahasiswa dengan rata-rata panjang **16 kata per judul** (rentang 6–29 kata).
2. **Ketimpangan Kelas Ekstrem (*Extreme Class Imbalance*):** Terdapat dominasi dosen mayoritas (Pak Ricky Akbar dengan 145 riwayat bimbingan), sementara dosen-dosen lain hanya memiliki 10 hingga 30 bimbingan.
3. **Inkonsistensi Entitas Nama Dosen:** Terjadi variasi penulisan gelar/tanda baca/spasi pada nama dosen yang sama (misal: *Prof. Surya Afnarius, Ph.D* muncul dalam 5 variasi penulisan berbeda).
4. **Tuntutan Luaran Organisasi:** Menghasilkan sistem informasi berbasis web terintegrasi yang fungsional bagi mahasiswa (rekomendasi mandiri) dan komisi tugas akhir prodi (verifikasi *plotting* bimbingan).

---

## 🎯 Bagian 1: Jawaban Komprehensif & Keputusan FIKS atas 4 Research Questions (RQ)

### 1. JAWABAN RQ1: Pipeline NLP & Model Klasifikasi Fiks

* **Keputusan Fiks:**  
  Pipeline utama yang ditetapkan adalah **Canonicalization Nama Dosen $\rightarrow$ Preprocessing Teks (Case Folding, Cleaning Simbol, Stopwords Removal Akademik, Stemming Bahasa Indonesia) $\rightarrow$ Ekstraksi Fitur TF-IDF Word (1–2 gram) + Char (3–5 gram) $\rightarrow$ Multi-Class Linear Support Vector Machine (Linear SVM) dengan Balanced Class Weight $\rightarrow$ Hybrid Cosine Similarity Gate**.
  * **Model Pembanding (Baseline Wajib):** **Multinomial Naive Bayes** (sebagai model pembanding berbiaya komputasi rendah dengan akurasi 87,3% mengacu pada *Sinaga & Kurniawan, 2025*).
* **Justifikasi Ilmiah:**  
  1. Pada teks judul pendek ($\pm$16 kata) dan ukuran data 625 baris, model deep learning kompleks atau transformer (*LLM/SciBERT*) rentan *overfitting*, berbiaya inferensi tinggi, dan memiliki sifat *black-box* yang sulit diaudit/dijelaskan (*Balek et al., 2024; Bolshakov, 2025*).
  2. Kombinasi leksikal n-gram pada TF-IDF secara presisi menangkap kata kunci teknis khas sistem informasi (misal: *GIS, Business Intelligence, SPK, Mobile, Framework*) secara cepat dan deterministik (*Rismanto et al., 2020; Aprianto, 2026*).
  3. Linear SVM bekerja sangat optimal pada ruang fitur berdimensi tinggi dan renggang (*high-dimensional sparse matrix*) hasil TF-IDF serta memiliki latensi inferensi dalam hitungan milidetik (*sub-second latency*) yang sangat responsif saat di-deploy ke antarmuka web.

---

### 2. JAWABAN RQ2: Strategi Penanganan Extreme Class Imbalance Fiks

* **Keputusan Fiks:**  
  Menolak keras oversampling sintetis naif (seperti SMOTE konvensional). Strategi definitif yang ditetapkan adalah **Algorithmic Cost-Sensitive Learning (`class_weight='balanced'`) + Stratified K-Fold Split + Hybrid Cosine Similarity Thresholding Gate**.
* **Justifikasi Ilmiah:**  
  1. **Kritik Empiris terhadap SMOTE:** Tinjauan sistematis pada IEEE Access (*Tarawneh et al., 2022*) yang mengevaluasi >70 metode oversampling membuktikan bahwa membangkitkan teks sintetis pada data nyata menghasilkan sampel minoritas yang menyerupai sebaran mayoritas, sehingga menjadi generator *noise* dan memicu lonjakan *false positive*.
  2. **Balanced Class Weighting:** Algoritma Linear SVM secara matematis memperbesar penalti eror (*loss function*) berbanding terbalik dengan frekuensi kemunculan kelas ($w_j = \frac{N}{K \times n_j}$). Kesalahan salah memprediksi dosen dengan 10 bimbingan akan dihukum belasan kali lebih berat daripada salah memprediksi dosen mayoritas dengan 145 bimbingan.
  3. **Cosine Similarity Thresholding Gate:** Mencegah dosen mayoritas muncul di peringkat atas hanya karena *prior probability* yang tinggi. Jika probabilitas klasifikasi tinggi tetapi *cosine similarity* judul mahasiswa terhadap profil dokumen riset dosen bernilai rendah, rekomendasi tersebut otomatis diturunkan (*reranked*) (*Bagheri et al., 2025; Bagheri et al., 2026*).

---

### 3. JAWABAN RQ3: Metrik Evaluasi & Ambang Batas Kelayakan (Benchmark) Fiks

* **Keputusan Fiks:**  
  Metrik evaluasi yang wajib dilaporkan mencakup:
  1. **Top-3 Accuracy (Hit Rate @ 3):** Mengukur apakah dosen pembimbing yang tepat berada dalam Top-3 rekomendasi sistem.
  2. **Macro-Averaged F1-Score:** Mengukur rerata harmonis presisi dan recall seluruh dosen secara setara tanpa bias pada jumlah data.
  3. **Mean Reciprocal Rank (MRR @ 3):** Mengukur posisi urutan rekomendasi yang tepat ($1/1, 1/2, 1/3$).
  4. **Minority Class Recall:** Menjamin dosen bimbingan sedikit tetap terdeteksi.
  5. **Fairness / Workload Distribution (Gini Index):** Memantau pemerataan sebaran bimbingan dosen.
* **Ambang Batas Kelayakan (Benchmark Minimum):**  
  Model dinyatakan **LAYAK / BAIK** jika mencapai secara simultan:
  * **Top-3 Accuracy $\ge$ 0,80 (80%)**
  * **Macro-F1 Score $\ge$ 0,70 (70%)**
  * **MRR $\ge$ 0,60**
* **Mengapa Overall Accuracy Saja Dinyatakan BURUK / MENYESATKAN?**  
  Pada dataset timpang, model yang secara naif selalu menebak dosen mayoritas (Pak Ricky Akbar) dapat memperoleh akurasi global semu hingga >60%, padahal model tersebut gagal total mengenali dosen minoritas lainnya (*Sujon et al., 2025; Riyanto et al., 2023*).

---

### 4. JAWABAN RQ4: Arsitektur Integrasi Sistem Informasi Web Fiks

* **Keputusan Fiks:**  
  Arsitektur sistem yang dibangun adalah **Three-Tier Web Architecture**:
  * **Frontend:** React / Vite (Antarmuka responsif, form input judul tugas akhir mahasiswa, kartu rekomendasi Top-3 dosen, skor kemiripan %, dan kata kunci penentu).
  * **Backend API:** FastAPI (Python) dengan endpoint `/predict`, `/train`, `/evaluate`, dan `/feedback`.
  * **Model Serving:** Scikit-Learn Pipeline (`.joblib` serialization) yang memuat vectorizer TF-IDF dan model Linear SVM terkalibrasi.
  * **Database:** SQLite / PostgreSQL (Penyimpanan data profil dosen, kamus alias normalisasi nama, riwayat judul, dan log audit rekomendasi).
* **Alur Interaksi Sistem:**
  ```text
  [Mahasiswa Input Judul] 
            │
            ▼
  [FastAPI Backend /predict] 
            │
            ├─► 1. Normalisasi Teks & Kamus Alias Dosen
            ├─► 2. Ekstraksi Fitur TF-IDF Word & Char N-Gram
            ├─► 3. Prediksi Linear SVM (Probabilitas Dosen)
            ├─► 4. Reranking Cosine Similarity ke Profil Dosen
            ▼
  [Output Kartu Rekomendasi Top-3 Dosen]
  - Nama Dosen Pembimbing (Foto, NIP, Keahlian)
  - Persentase Tingkat Kecocokan Topik (Confidence Score %)
  - Kata Kunci Penentu (Explainable Keywords)
  - Daftar Judul Serupa Terdahulu sebagai Bukti Rekam Jejak
  ```

---

## 📊 Bagian 2: Tabel Ekstraksi Data PRISMA (12 Artikel Bereputasi)

| No | Referensi Lengkap (APA Style 7th) | Tahun & Indeksasi | Karakteristik & Ukuran Dataset | Metode Preprocessing NLP & Algoritma ML | Strategi Penanganan Imbalanced Data | Metrik Evaluasi & Nilai Numerik Riil | Indikator Kinerja (Tolok Ukur Baik/Buruk) | Kesimpulan Utama & Hal yang Ditiru | Integrasi Sistem Informasi |
|:--:|:---|:---:|:---|:---|:---|:---|:---|:---|:---:|
| **1** | **Sinaga, M. N., & Kurniawan, R. R. (2025).** *Hyperparameter Optimization of Naive Bayes for Supervisor Recommendation in Computer Science.* TIN: Terapan Informatika Nusantara, 6(5), 8478. | 2025 \| Sinta | 794 judul skripsi & 25 dosen Departemen Ilmu Komputer UINSU (2019–2024); split 80:20 | Case folding, tokenizing, stopword removal, keyword extraction, Naive Bayes Classifier | Mengandalkan pasangan data historis judul-dosen dan split terstandar 80:20 | **Akurasi: 87,3%**, Presisi: 85,9%, Recall: 86,4% | **Baik:** Akurasi tinggi membuktikan teks judul saja sudah cukup informatif untuk memetakan dosen pembimbing. | Menjadi rujukan utama bahwa Naive Bayes sangat kuat sebagai model baseline yang murah komputasi. | **Ya** (Sistem rekomendasi pembimbing) |
| **2** | **Rismanto, R., Syulistyo, A. R., & Agusta, B. P. C. (2020).** *Research Supervisor Recommendation System Based on Topic Conformity.* International Journal of Modern Education and Computer Science (IJMECS), 12(1), 35-44. | 2020 \| Jurnal Internasional | Data judul, abstrak, dan profil keahlian dosen tugas akhir | Preprocessing teks, TF-IDF weighting, dan Cosine Similarity | Analisis kesesuaian berbasis perankingan similarity ke profil dosen | **Akurasi: 75,0%** pada pengujian kueri judul baru | **Cukup Baik:** Cocok untuk prototype awal pencocokan kesesuaian topik secara langsung. | Meniru pembentukan vektor profil riset dosen untuk modul Cosine Similarity reranking. | **Ya** (Web-based academic system) |
| **3** | **Samin, H., & Azim, T. (2019).** *Knowledge Based Recommender System for Academia Using Machine Learning: A Case Study on Higher Education.* IEEE Access, 7, 67081-67093. | 2019 \| Scopus Q1 | Repositori publikasi dosen dan data minat riset mahasiswa berskala institusi | Knowledge graph extraction, text parsing, hybrid machine learning | Penyeimbangan melalui normalisasi graf keahlian akademik | **Precision@k, Recall@k, F1-Score: 84%–89%** | **Sangat Baik:** Pendekatan hybrid knowledge-based meminimalkan salah sasaran penentuan pembimbing. | Rekomendasi pembimbing wajib menyertakan riwayat riset dosen terdahulu sebagai bukti. | **Ya** (Portal akademik cerdas) |
| **4** | **Hairani, H., Janhasmadja, M., Tholib, A., & Ariyanto, Y. (2024).** *Thesis Topic Modeling Study: Latent Dirichlet Allocation (LDA) and Machine Learning Approach.* IJECSA, 3(2), 4375. | 2024 \| Sinta | Korpus judul dan abstrak tugas akhir mahasiswa rumpun informatika | Preprocessing, TF-IDF, Topic Modeling LDA + Naive Bayes / SVM | Clustering topik sebelum klasifikasi dosen untuk mereduksi bias | **Perplexity Score, Akurasi: 82,4%, F1: 0,80** | **Baik:** Model LDA berhasil mengelompokkan topik riset laten sebelum dipetakan ke dosen. | Meniru identifikasi topik utama (GIS, Web, SPK, Mobile) pada data tugas akhir. | **Tidak** (Eksperimen komputasi) |
| **5** | **Aprianto, H. (2026).** *Pendekatan Model TF-IDF dan Cosine Similarity Pada Rekomendasi Dosen Pembimbing Skripsi.* Jurnal BETRIK, 17(1), 251-260. | 2026 \| Jurnal Nasional | Arsip judul skripsi program studi teknologi informasi | Text preprocessing bahasa Indonesia, TF-IDF, Cosine Similarity | Thresholding batas bawah nilai kesesuaian semantik | **Akurasi Rekomendasi: 80,0%–84,0%** | **Baik:** Membuktikan efektivitas TF-IDF pada bahasa Indonesia tanpa membutuhkan komputasi berat. | Meniru alur pemrosesan stopword khusus bahasa Indonesia untuk domain skripsi. | **Ya** (Sistem berbasis web) |
| **6** | **Fitri, A., Rodiah, D., & Y. (2025).** *Research Supervisor Recommendation System Using a Hybrid Filtering Approach.* IEEE International Conference on Informatics (ICAICTA). | 2025 \| IEEE Scopus | Dataset proposal skripsi mahasiswa dan publikasi dosen | Content-based filtering dipadukan dengan collaborative ranking | Penyesuaian bobot histori bimbingan dosen | **Hit@5: 88,2%, Macro-F1: 0,79, AUC: 0,85** | **Baik:** Penggunaan metrik Top-k membuktikan bahwa rekomendasi jamak jauh lebih aplikatif. | Mengadopsi prinsip evaluasi Top-3 / Hit@3 untuk sistem rekomendasi skripsi mahasiswa. | **Ya** (Antarmuka web interaktif) |
| **7** | **Zheng, X., Li, P., & Wu, X. (2025).** *An Automatic Paper-Reviewer Recommendation Algorithm Based on Depth and Breadth.* IEEE Trans. Emerg. Top. Comput. Intell., 9, 607-616. | 2025 \| Scopus Q1 | Dataset naskah ilmiah skala besar dan profil keahlian reviewer | Depth & Breadth semantic modeling, contextual embedding | Pengaturan beban penugasan (workload constraint) reviewer | **Precision@k, NDCG@k, MRR: 0,72** | **Sangat Baik:** Mampu mencegah penumpukan tugas hanya pada reviewer senior/populer. | Mengadopsi aturan kuota bimbingan dosen agar tidak terjadi beban kerja timpang. | **Ya** (Sistem penugasan otomatis) |
| **8** | **Zhang, Y., Shen, Y.-Z., et al. (2025).** *Chain-of-Factors Paper-Reviewer Matching.* Proceedings of the ACM on Web Conference (WWW 2025). | 2025 \| Scopus / Core A* | Ribuan korpus naskah konferensi dan profil reviewer akademik | Factor-based representation, graph matching, semantic ranking | Load-balancing constraint pada fungsi optimasi ranking | **MAP@3: 0,78, MRR: 0,75, Top-3 Recall: 86,5%** | **Sangat Baik:** Membuktikan evaluasi Top-3 mencerminkan keberhasilan sistem di dunia nyata. | Menggunakan metrik ranking MRR dan Top-3 Recall sebagai tolok ukur utama SI-REKTA. | **Ya** (Platform review naskah) |
| **9** | **Yang, C., Liu, T., Yi, W., et al. (2020).** *Identifying expertise through semantic modeling: A modified BBPSO algorithm for reviewer assignment.* Appl. Soft Comput., 94, 106483. | 2020 \| Scopus Q1 | Korpus profil riset peneliti dan naskah usulan penelitian | Semantic modeling, feature weighting, optimasi BBPSO | Constraint handling untuk kapasitas beban reviewer | **Akurasi Penugasan: 91,2%, Kepuasan Dosen: 88%** | **Sangat Baik:** Keseimbangan antara keahlian dan kuota beban kerja tercapai optimal. | Dasar pemikiran bahwa kuota dosen harus menjadi faktor penyaring setelah skor ML dihitung. | **Ya** (Sistem terintegrasi) |
| **10** | **Bagheri, F., Buscaldi, D., & Recupero, R. D. (2025).** *Leveraging knowledge graphs and LLMs for content-based reviewer assignment.* J. Intell. Inf. Syst., 64, 349-377. | 2025 \| Scopus Q2 | Dataset artikel ilmiah lintas topik ilmu komputer | Knowledge graph + Content-based semantic matching | Penyesuaian ambang graf untuk keahlian jarang (*rare topics*) | **Top-3 Accuracy: 84,2%, Macro-F1: 0,76** | **Baik:** Mampu mencocokkan topik jarang ke reviewer yang tepat tanpa terdistorsi kelas populer. | Meniru mekanisme pencocokan dosen untuk topik yang jarang diambil mahasiswa. | **Ya** (Audit assignment prototype) |
| **11** | **Bagheri, F., Buscaldi, D., & Recupero, D. (2026).** *LLM-Assisted Reviewer Assignment via Auditable Expertise Matching.* IEEE Access, 14, 127834-127863. | 2026 \| Scopus Q1 | Naskah ilmiah multikelas dengan variasi distribusi kepakaran | Auditable embedding matching, transparent term weighting | Workload fairness control (Gini Index analysis) | **MRR@3: 0,74, Precision@3: 82,1%, Gini: 0,22** | **Sangat Baik:** Menampilkan bukti kata kunci alasan rekomendasi (*explainable AI*). | Fitur explainable keywords (kata kunci penentu) wajib ditampilkan pada UI SI-REKTA. | **Ya** (Web API platform) |
| **12** | **Bolshakov, D. (2025).** *A reviewer identification using machine learning methods.* Science Editor and Publisher, 10(1), 35-48. | 2025 \| Scopus | Korpus abstrak naskah ilmiah dan profil publikasi editor | TF-IDF n-gram, Linear Classifier, Cosine Similarity | Balanced class weighting pada klasifikasi teks | **Akurasi: 83,5%, Macro-F1: 0,74** | **Baik:** Model leksikal terbukti lebih mudah diaudit dibanding model deep learning tertutup. | Menjadi dasar kuat penetapan TF-IDF + Linear SVM sebagai model utama yang transparan. | **Ya** (Editorial web system) |

---

## 📚 Bagian 3: Daftar Pustaka Lengkap (Format APA Style 7th Edition)

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
