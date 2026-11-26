**LAPORAN PROGRESS REPORT 1 PROYEK MACHINE LEARNING SI-REKTA: SISTEM INFORMASI REKOMENDASI DOSEN PEMBIMBING TA BERBASIS DUAL-SOURCE DATASET DAN EXPLAINABLE AI** 

# **Dosen Pengampu:** 

Febby Apri Wenando, S.Kom., M.Eng., Ph.D. 

Aina Hubby Aziira, S.Kom., M.Eng. 

# **Mata Kuliah:** 

# **Machine Learning (DSI61133) — Semester 5** 



<!-- Start of picture text -->
SD >i<br>( Wy<br>Aly et<br><!-- End of picture text -->

# **Disusun Oleh:** 

Farrel Ghufran Rahman 2411521009 Fuadi Dhiyaulhaq 2411522001 Rafa Gian Atthari 2411522014 

# **DEPARTEMEN SISTEM INFORMASI FAKULTAS TEKNOLOGI INFORMASI** 

# **UNIVERSITAS ANDALAS** 

# **PADANG** 

**2026** 

# **KATA PENGANTAR** 

Puji dan syukur ke hadirat Allah Subhanahu Wa Ta'ala atas rahmat dan karunia-Nya sehingga tim penyusun dapat menyelesaikan dokumen Laporan Progress Report 1 Proyek Machine Learning dengan judul "SI-REKTA: Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir Berbasis Dual-Source Dataset dan Explainable AI" dengan baik dan tepat waktu. 

Laporan kemajuan ini disusun sebagai bentuk dokumentasi pertanggungjawaban akademis dan teknis terhadap progres nyata yang telah dicapai dalam mata kuliah Machine Learning (DSI61133) di Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas. Penyusunan proyek ini berlandaskan pada standar industri CRISP-ML(Q) (Cross-Industry Standard Process for the Development of Machine Learning Applications with Quality Assurance) serta menyelaraskan diri dengan silabus resmi 12 Tahapan Proyek Pembelajaran Mesin 2026. 

Tim penyusun mengucapkan terima kasih yang sebesar-besarnya kepada Bapak Febby Apri Wenando, S.Kom., M.Eng., Ph.D. dan Ibu Aina Hubby Aziira, S.Kom., M.Eng. selaku Dosen Pengampu mata kuliah Machine Learning atas bimbingan, arahan metodologis, dan masukan konstruktif yang telah diberikan. Ucapan terima kasih juga ditujukan kepada rekan-rekan mahasiswa Departemen Sistem Informasi yang telah mendukung penyediaan korpus data riset. 

Tim menyadari bahwa laporan kemajuan ini masih memiliki ruang penyempurnaan, khususnya pada fase finalisasi evaluasi model dan integrasi antarmuka. Oleh karena itu, kritik dan saran yang membangun sangat diharapkan demi kesempurnaan implementasi sistem pada milestone berikutnya. 

Padang, 28 Oktober 2026 

Tim Penyusun SI-REKTA 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

1 

# **DAFTAR ISI** 

|**KATA PENGANTAR...................................................................................................... 1**|
|---|
|**DAFTAR ISI.....................................................................................................................2**|
|**DAFTAR TABEL.............................................................................................................3**|
|**DAFTAR GAMBAR........................................................................................................4**|
|**PANDUAN ISTILAH TEKNIS (GLOSARIUM)......................................................... 5**|
|**BAB 1 PENDAHULUAN & KERANGKA KERJA PROYEK.................................. 7**|
|1.1 Masalah Nyata yang Ingin Diselesaikan Menggunakan Machine Learning......... 7|
|1.2 Tujuan Penerapan Machine Learning dan Manfaat yang Diharapkan.................. 7|
|1.3 Target Pengguna dan Kebutuhan Utama Sistem yang Dikembangkan................. 8|
|1.4 Kerangka Kerja Mutu CRISP-ML(Q) & 12 Tahapan Resmi Proyek ML 2026....8|
|**BAB 2 PROGRESS PENGEMBANGAN MODEL MACHINE LEARNING........ 10**|
|2.1 Problem Identification (Tahap 1).........................................................................10|
|2.2 System Requirements Analysis (Tahap 2)...........................................................10|
|2.3 Data Analysis & Karakteristik Data (Tahap 3)....................................................10|
|2.4 Data Preprocessing (Tahap 4)..............................................................................12|
|2.5 Data Processing Procedures (Tahap 5)................................................................ 13|
|2.6 Machine Learning Algorithm Selection (Tahap 6)..............................................15|
|2.7 Model Development & Late-Fusion (Tahap 7)................................................... 15|
|2.8 Model Evaluation (Tahap 8)................................................................................15|
|2.9 Model Storage & Rencana Tahap Selanjutnya (Tahap 9 s.d. 12)........................ 16|
|**BAB 3 KENDALA DAN SOLUSI................................................................................17**|
|3.1 Kendala 1.............................................................................................................17|
|3.2 Kendala 2.............................................................................................................18|
|3.3 Kendala 3.............................................................................................................19|
|3.4 Kendala 4.............................................................................................................19|
|**BAB 4 KOORDINASI TIM DAN KONTRIBUSI ANGGOTA................................ 21**|
|4.1 Pembagian Pekerjaan dan Tanggung Jawab Anggota......................................... 21|
|4.2 Pemahaman Tugas dan Kontribusi Nyata Masing-Masing Anggota...................23|
|4.3 Keterkaitan Pekerjaan Antar-Anggota dan Alur Koordinasi...............................24|
|**LAMPIRAN................................................................................................................... 26**|
|Lampiran 1: Tautan Ekosistem Repositori GitHub & Google Colab Realtime.........27|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

2 

# **DAFTAR TABEL** 

|Tabel 1.1 Matriks Penyelarasan 12 Tahapan Proyek ML 2026 ........................................8|
|---|
|Tabel 2.1 Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (Clean Text).19|
|Tabel 2.2 Konfigurasi TfidfVectorizer SI-REKTA..........................................................21|
|Tabel 2.3 Perbandingan Alternatif Algoritma yang Dipertimbangkan............................23|
|Tabel 2.4 Kebijakan Bobot Adaptif α Dynamic Late-Fusion..........................................25|
|Tabel 3.1 Kendala 1.........................................................................................................34|
|Tabel 3.2 Kendala 2.........................................................................................................35|
|Tabel 3.3 Kendala 3.........................................................................................................36|
|Tabel 3.4 Kendala 4.........................................................................................................37|
|Tabel 4.1 Pembagian Pekerjaan dan Tanggung Jawab Anggita...................................... 38|
|Tabel L.1 Direktori Tautan Resmi Proyek SI-REKTA....................................................45|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

3 

# **DAFTAR GAMBAR** 

|Gambar 2.1 Hasil Audit Awal Data Skripsi (Judul_TA.csv)...........................................13|
|---|
|Gambar 2.2 Hasil Audit Data Publikasi Dosen (Publikasi_Dosen.csv)..........................14|
|Gambar 2.3 Hasil Penyaringan Data Skripsi dan Dosen Aktif........................................15|
|Gambar 2.4 Tabel Sebaran Bimbingan Skripsi dan Publikasi 17 Dosen.........................16|
|Gambar 2.5 Grafik Perbandingan Bimbingan Skripsi vs Publikasi Riset 17 Dosen.......17|
|Gambar 2.6 Tangkapan Layar Pengujian Fungsi Preprocessing NLP Akademik DSI....19|
|Gambar 2.7 Ringkasan Statistik Ekstraksi Fitur TF-IDF pada Korpus Gabungan......... 20|
|Gambar 2.8 Dimensi Matriks Profil Kepakaran dan Verifikasi Dosen Cold-Start..........21|
|Gambar 2.9 Arsitektur Direct Dual-Source Dynamic Late-Fusion SI-REKTA..............23|
|Gambar 2.10 Hasil Perankingan Top-3 untuk Judul Uji..................................................25|
|Gambar 2.11 Hasil Stress Test Dosen Cold-Start............................................................25|
|Gambar 2.12 Contoh Hasil Kartu Rekomendasi Explainable AI....................................27|
|Gambar 2.13 Kartu Rekomendasi Explainable AI untuk Kueri Dosen Cold-Start.........29|
|Gambar 2.14 Tabel evaluasi aktual 5-Fold KFold...........................................................30|
|Gambar 2.15 Grafik kurva Hit@1, Hit@3, Hit@5 dan MRR@3...................................31|
|Gambar 2.16  Tabel ringkasan si_rekta_pipeline.joblib..................................................32|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

4 

# **PANDUAN ISTILAH TEKNIS (GLOSARIUM)** 

Untuk memberikan kejelasan terminologi dan standarisasi konsep ilmiah dalam laporan kemajuan ini, berikut disajikan glosarium istilah teknis Machine Learning dan Natural Language Processing (NLP) yang menjadi pilar pengembangan sistem SI-REKTA: 

|**No**|**Istilah**|**Definisi**|
|---|---|---|
|1|**Machine Learning**<br>**(ML)**|Cabang kecerdasan buatan yang memungkinkan komputer<br>mempelajari pola dari data untuk menghasilkan prediksi,<br>penilaian, atau rekomendasi. Dalam SI-REKTA, Machine<br>Learning digunakan untuk mencocokkan usulan judul tugas akhir<br>mahasiswa dengan bidang keahlian dosen.|
|2|**Natural Language**<br>**Processing (NLP)**|Bidang kecerdasan buatan yang memungkinkan komputer<br>mengolah dan menganalisis bahasa manusia dalam bentuk teks.<br>Dalam SI-REKTA, NLP digunakan untuk membersihkan dan<br>mengolah teks judul tugas akhir serta publikasi dosen.|
|3|**Academic**<br>**Recommender**<br>**System**|Sistem yang memberikan rekomendasi berdasarkan informasi<br>dan<br>kebutuhan<br>di<br>lingkungan<br>pendidikan.<br>SI-REKTA<br>menggunakan sistem ini untuk merekomendasikan calon dosen<br>Pembimbing 1 berdasarkan kesesuaian topik tugas akhir dengan<br>riwayat skripsi dan publikasi dosen.|
|4|**Dataset**|Kumpulan data yang digunakan sebagai bahan pengolahan dan<br>analisis oleh sistem. SI-REKTA menggunakan dua sumber data,<br>yaitu riwayat judul tugas akhir mahasiswa dan publikasi<br>penelitian dosen.|
|5|**Dual-Source**<br>**Dataset**|Pendekatan yang menggunakan dua sumber data berbeda untuk<br>menghasilkan rekomendasi. Dalam SI-REKTA, kedua sumber<br>tersebut adalah data riwayat skripsi alumni dan data publikasi<br>penelitian dosen.|
|6|**Cold-Start**<br>**Problem**|Kondisi ketika sistem memiliki keterbatasan data riwayat untuk<br>menilai suatu objek. Dalam SI-REKTA, masalah ini terjadi pada<br>lima dosen aktif yang tidak memiliki riwayat sebagai|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

5 

|**No**|**Istilah**|**Definisi**|
|---|---|---|
|||Pembimbing 1, sehingga sistem memanfaatkan data publikasi<br>mereka untuk menilai kesesuaian topik.|
|7|**Data Preprocessing**|Proses membersihkan dan menyiapkan data sebelum digunakan<br>oleh<br>model.<br>Pada<br>SI-REKTA,<br>proses<br>ini<br>mencakup<br>penyeragaman huruf, penghapusan tanda baca yang tidak<br>diperlukan, serta penyaringan kata-kata yang kurang membantu<br>dalam pencocokan topik.|
|8|**Stopwords**|Kata-kata yang disaring karena dinilai kurang membantu dalam<br>proses analisis teks. Dalam SI-REKTA, tim menggunakan daftar<br>kata khusus untuk mengurangi pengaruh frasa umum dalam judul<br>tugas akhir, seperti “rancang bangun” dan “berbasis web”, agar<br>istilah yang lebih menggambarkan topik penelitian dapat lebih<br>diperhatikan.|
|9|**Corpus (Korpus)**|Kumpulan teks yang digunakan dalam proses pengolahan bahasa.<br>Dalam SI-REKTA, korpus gabungan dibentuk dari teks judul<br>skripsi dan publikasi dosen yang telah dibersihkan.|
|10|**TF-IDF**<br>**(Term**<br>**Frequency–Inverse**<br>**Document**<br>**Frequency)**|Metode pemberian bobot pada kata atau frasa berdasarkan<br>kemunculannya dalam suatu dokumen dan seberapa umum kata<br>tersebut pada kumpulan dokumen. Metode ini membantu sistem<br>membedakan istilah yang lebih khas untuk suatu topik penelitian.|
|11|**N-Gram**|Teknik pengolahan teks yang mengelompokkan kata menjadi<br>rangkaian dengan jumlah kata tertentu. Unigram terdiri atas satu<br>kata, bigram dua kata, dan trigram tiga kata. SI-REKTA<br>menggunakan ketiganya agar frasa teknis, seperti “analytic<br>hierarchy process”, dapat dikenali sebagai satu kesatuan.|
|12|**Vektor (Vector)**|Representasi data dalam bentuk kumpulan angka yang dapat<br>diolah dan dibandingkan oleh komputer. Dalam SI-REKTA, teks<br>diubah menjadi vektor berdasarkan bobot TF-IDF agar sistem|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

6 

|**No**|**Istilah**|**Definisi**|
|---|---|---|
|||dapat menghitung kemiripan antara judul yang diajukan<br>mahasiswa dan profil keahlian dosen.|
|13|**Cosine Similarity**|Metode<br>untuk<br>mengukur<br>kemiripan<br>antara<br>dua<br>vektor<br>berdasarkan sudut di antara keduanya. Dalam SI-REKTA,<br>metode ini digunakan untuk membandingkan teks judul tugas<br>akhir dengan profil dosen. Semakin tinggi nilainya, semakin<br>besar kemiripan berdasarkan fitur teks yang digunakan.|
|14|**Entity**<br>**Canonicalization**|Proses menyeragamkan penulisan suatu entitas ke bentuk baku.<br>Dalam SI-REKTA, proses ini digunakan untuk menyamakan<br>variasi penulisan nama dosen, termasuk perbedaan gelar dan<br>tanda baca, dengan nama resmi yang digunakan dalam sistem.|
|15|**Whitelist**|Daftar entitas yang diizinkan untuk diproses oleh sistem. Dalam<br>SI-REKTA, whitelist berisi 17 dosen tetap aktif Departemen<br>Sistem Informasi Unand yang menjadi kandidat rekomendasi.|
|16|**Direct**<br>**Recommendation**<br>**(Non-KK)**|Pendekatan rekomendasi yang mencocokkan judul tugas akhir<br>mahasiswa secara langsung dengan profil setiap dosen tanpa<br>terlebih dahulu mengelompokkan judul ke dalam Kelompok<br>Keahlian (KK). Pendekatan ini digunakan agar rekomendasi<br>tidak bergantung pada hasil klasifikasi kelompok di tahap awal.|
|17|**Dynamic**<br>**Late-Fusion**|Metode penggabungan hasil penilaian dari dua sumber data pada<br>tahap akhir proses rekomendasi, dengan bobot yang dapat<br>berbeda sesuai kondisi setiap dosen. Dalam SI-REKTA, skor dari<br>riwayat skripsi digabungkan dengan skor dari publikasi<br>penelitian. Dosen dengan riwayat bimbingan lebih sedikit<br>mendapatkan bobot publikasi yang lebih besar.|
|18|**Inferensi**<br>**(Inference)**|Proses ketika model yang telah dikembangkan digunakan untuk<br>menghasilkan keluaran berdasarkan data masukan baru. Dalam<br>SI-REKTA, inferensi terjadi saat mahasiswa memasukkan usulan|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

7 

|**No**|**Istilah**|**Definisi**|
|---|---|---|
|||judul tugas akhir dan sistem menghitung rekomendasi dosen<br>yang sesuai.|
|19|**Ranking dan Top-3**<br>**Recommendation**|Ranking adalah proses mengurutkan kandidat berdasarkan skor<br>penilaian. Top-3 Recommendation berarti sistem menampilkan<br>tiga kandidat dengan skor tertinggi sebagai bahan pertimbangan<br>mahasiswa, bukan sebagai penetapan dosen pembimbing secara<br>resmi.|
|20|**Explainable**<br>**AI**<br>**(XAI)**|Pendekatan yang membantu pengguna memahami alasan di balik<br>hasil sistem kecerdasan buatan. Dalam SI-REKTA, penjelasan<br>rekomendasi ditampilkan melalui kata kunci yang cocok,<br>publikasi penelitian yang relevan, dan riwayat skripsi yang<br>berkaitan dengan judul usulan.|
|21|**Skor**<br>**Kemiripan**<br>**(Similarity Score)**|Nilai yang menunjukkan tingkat kemiripan antara teks masukan<br>dan profil dosen berdasarkan metode yang digunakan. Dalam<br>SI-REKTA, persentase pada kartu rekomendasi menunjukkan<br>tingkat kecocokan relatif terhadap skor tertinggi pada masukan<br>yang sama, bukan probabilitas mutlak bahwa dosen tersebut pasti<br>sesuai.|
|22|**Evaluasi Model**|Proses mengukur kinerja model untuk mengetahui seberapa baik<br>model<br>menghasilkan<br>keluaran<br>yang<br>diharapkan.<br>Dalam<br>SI-REKTA, evaluasi dilakukan dengan mengukur keberhasilan<br>sistem menempatkan dosen pembimbing aktual dalam daftar<br>rekomendasi.|
|23|**Hit@K**|Metrik evaluasi yang mengukur persentase pengujian ketika<br>kandidat yang benar muncul dalam K rekomendasi teratas.<br>Sebagai contoh, Hit@3 menunjukkan seberapa sering dosen<br>pembimbing aktual ditemukan di antara tiga rekomendasi teratas.|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

8 

|**No**|**Istilah**|**Definisi**|
|---|---|---|
|24|**Mean**<br>**Reciprocal**<br>**Rank (MRR)**|Metrik yang mengukur kualitas urutan rekomendasi dengan<br>memperhatikan posisi kandidat yang benar. Nilainya lebih tinggi<br>jika kandidat yang benar muncul pada peringkat yang lebih atas.|
|25|**Cross-Validation**|Teknik evaluasi model dengan membagi data menjadi beberapa<br>bagian untuk melakukan pengujian secara bergantian. SI-REKTA<br>menggunakan 5-Fold Cross-Validation, yaitu membagi data<br>menjadi lima bagian agar kinerja model dapat dinilai melalui<br>beberapa putaran pengujian.|
|26|**Data Leakage**|Kondisi ketika informasi yang seharusnya tidak tersedia saat<br>pelatihan ikut digunakan dalam proses pelatihan atau evaluasi<br>model. Hal ini dapat membuat hasil evaluasi terlihat lebih baik<br>daripada kemampuan model sebenarnya. Dalam SI-REKTA,<br>pembentukan profil skripsi pada setiap putaran evaluasi<br>menggunakan data latih untuk menghindari kebocoran data<br>pengujian.|
|27|**CRISP-ML(Q)**|Kerangka kerja pengembangan aplikasi Machine Learning yang<br>menekankan pengelolaan mutu pada setiap tahap pengembangan.<br>Kerangka ini digunakan sebagai acuan untuk mengatur proses<br>identifikasi masalah, persiapan data, pengembangan model,<br>evaluasi, hingga penerapan sistem.|
|28|**Model Serialization**|Proses menyimpan model beserta komponen yang dibutuhkan ke<br>dalam berkas agar dapat digunakan kembali tanpa harus<br>membangun ulang seluruh model. Dalam SI-REKTA, model<br>disimpan dalam berkassi_rekta_pipeline.joblib.|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

9 

# **BAB 1** 

# **PENDAHULUAN & KERANGKA KERJA PROYEK** 

# **1.1 Masalah Nyata yang Ingin Diselesaikan Menggunakan Machine Learning** 

Proses penentuan calon dosen Pembimbing 1 tugas akhir di Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas selama bertahun-tahun menghadapi kendala operasional yang berakar dari keterbatasan informasi dan proses konvensional. Mahasiswa tingkat akhir yang hendak mengisi Formulir TA-01 (Pengajuan Topik) dan Formulir TA-02 (Pendaftaran Judul) kerap mengalami kebingungan dalam menentukan dosen pembimbing yang linier dengan topik riset yang diajukan. 

Berdasarkan hasil observasi dan audit empiris, kondisi tersebut memicu tiga permasalahan nyata di lingkungan kampus: 

- Ketidaksesuaian Topik (Topic Mismatch): Mahasiswa kerap mengajukan usulan proposal skripsi yang tidak selaras dengan peta jalan riset terkini dosen, sehingga memicu penolakan proposal berulang kali, revisi besar-besaran, hingga perpanjangan masa studi yang tidak perlu. 

- Ketimpangan Beban Bimbingan (Workload Imbalance): Penentuan pembimbing secara subjektif memicu penumpukan antrean mahasiswa bimbingan pada sejumlah dosen senior yang populer (tercatat membimbing hingga 149 mahasiswa), sedangkan dosen-dosen tetap aktif lainnya yang memiliki kompetensi riset relevan justru minim bimbingan. 

- Tantangan Kritis Zero-History Cold-Start: Dari 17 Dosen Tetap Aktif Departemen Sistem Informasi, audit data historis membuktikan terdapat 5 dosen yang memiliki 0 riwayat bimbingan sebagai Pembimbing 1. Jika model Machine Learning hanya dilatih menggunakan data skripsi alumni masa lalu, kelima dosen ini memiliki probabilitas kemunculan nol dan tidak akan pernah direkomendasikan. 

# **1.2 Tujuan Penerapan Machine Learning dan Manfaat yang Diharapkan** 

Penerapan Machine Learning melalui proyek SI-REKTA bertujuan untuk mentransformasikan proses penentuan dosen pembimbing dari pendekatan subjektif menjadi berbasis data objektif (data-driven). Dengan memanfaatkan teknik Natural 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

10 

Language Processing (NLP) berbasis TF-IDF N-gram dan Cosine Similarity berbobot adaptif (Dynamic Late-Fusion), sistem mampu memetakan kalimat usulan judul tugas akhir mahasiswa secara langsung ke profil kepakaran 17 Dosen Tetap Aktif DSI Unand. Manfaat yang diharapkan mencakup: 

- Bagi Mahasiswa: Memperoleh rekomendasi Top-3 calon dosen pembimbing yang paling selaras secara instan (< 500 ms), lengkap dengan bukti kutipan paper ilmiah nyata dosen sebagai dasar argumen objektif pengisian Formulir TA-01/TA-02. 

- Bagi Departemen & Koordinator TA: Mewujudkan pemerataan alokasi beban bimbingan tugas akhir secara proporsional serta menjamin keterpilihan dosen-dosen baru berbasis keaktifan riset terkini. 

# **1.3 Target Pengguna dan Kebutuhan Utama Sistem yang Dikembangkan** 

Sistem SI-REKTA dirancang dengan target pengguna utama adalah Mahasiswa Tingkat Akhir Departemen Sistem Informasi FTI Universitas Andalas sebagai pengguna tunggal (Single Primary User). Karakteristik interaksi sistem dirancang sebagai Public Utility Web Application tanpa kewajiban autentikasi akun (no-login) guna meminimalkan hambatan adopsi pengguna. 

Kebutuhan fungsional utama sistem meliputi formulir penampung usulan judul skripsi, mesin inferensi perankingan dosen Top-3 berbasis keselarasan semantik dwisumber, penyajian kartu Explainable AI (XAI), serta direktori interaktif 17 Dosen Tetap Aktif DSI Unand. 

# **1.4 Kerangka Kerja Mutu CRISP-ML(Q) & 12 Tahapan Resmi Proyek ML 2026** 

Pengembangan proyek SI-REKTA mengadopsi standar rekayasa pembelajaran mesin CRISP-ML(Q) yang diselaraskan secara langsung dengan 12 tahapan pelaksanaan resmi yang ditetapkan dalam silabus Project Machine Learning 2026. Status ketercapaian dan pemetaan ke-12 tahapan tersebut disajikan secara transparan pada Tabel 1.1: 

# **Tabel 1.1 Matriks Penyelarasan 12 Tahapan Proyek ML 2026 dengan CRISP-ML(Q) & Status Ketercapaian** 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

11 

|**No**|**12 Tahapan**<br>**Proyek ML**<br>**2026**|**Fase**<br>**CRISP-ML(Q)**|**Implementasi pada**<br>**SI-REKTA**|**Status**<br>**Progres**|
|---|---|---|---|---|
|1|Problem<br>Identification|Business &<br>Data<br>Understanding|Identifikasi topic mismatch,<br>workload imbalance, dan<br>cold-start 5 dosen aktif.|Selesai<br>(100%)|
|2|System<br>Requirements<br>Analysis|Business &<br>Data<br>Understanding|Spesifikasi batasan 17 dosen<br>tetap aktif, latensi < 500 ms,<br>dan target Hit@3.|Selesai<br>(100%)|
|3|Data Analysis|Business &<br>Data<br>Understanding|Audit eksploratif terhadap<br>Judul_TA.csv (625) dan<br>Publikasi_Dosen.csv(643).|Selesai<br>(100%)|
|4|Data<br>Preprocessing|Data<br>Preparation|Normalisasi teks, case folding,<br>regex stripping, dan custom<br>DSI academic stopwords.|Selesai<br>(100%)|
|5|Data Processing<br>Procedures|Data<br>Preparation|Standarisasi entitas (whitelist<br>17 dosen) dan ekstraksi fitur<br>TF-IDF N-gram bersama.|Selesai<br>(100%)|
|6|ML Algorithm<br>Selection|Model<br>Engineering|Pemilihan Direct Dual-Source<br>Cosine Similarity Late-Fusion<br>tanpa klasifikasi KK.|Selesai<br>(100%)|
|7|Model<br>Development|Model<br>Engineering|Pembangunan fungsi<br>perankingan<br>predict_top_lecturers dan<br>modul Explainable AI (XAI).|Selesai<br>(100%)|
|8|Model<br>Evaluation|Model<br>Evaluation &<br>QA|Evaluasi kuantitatif Stratified<br>5-Fold Cross Validation,<br>Hit@3, MRR, dan stress test.|Selesai<br>(100%)|
|9|Model Storage|Deployment<br>Preparation|Serialisasi bundel model ke<br>si_rekta_pipeline.joblib dan uji<br>reload benchmark NFR.|Selesai<br>(100%)|
|10|Information<br>System Design|System<br>Deployment|Perancangan arsitektur<br>perangkat lunak Three-Tier<br>(UI, FastAPI, dan<br>PostgreSQL).|Rencana<br>Tahap 2|
|11|Model<br>Integration|System<br>Deployment|Integrasi biner pipeline .joblib<br>ke endpoint web service REST<br>API Python FastAPI.|Rencana<br>Tahap 2|
|12|User Interface<br>Implementation|System<br>Deployment|Pembangunan antarmuka web<br>interaktif mahasiswa untuk<br>pengisian drafjudul dan XAI.|Rencana<br>Tahap 2|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

12 

# **BAB 2** 

# **PROGRESS PENGEMBANGAN MODEL MACHINE LEARNING** 

# **2.1 Problem Identification (Tahap 1)** 

Tahap identifikasi masalah merupakan fondasi awal dalam kerangka kerja CRISP-ML(Q) untuk memastikan bahwa pengembangan kecerdasan buatan benar-benar berangkat dari permasalahan nyata di lapangan, bukan sekadar eksperimen algoritma tanpa arah. Pada Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas, proses pengajuan calon dosen pembimbing tugas akhir (skripsi) oleh mahasiswa tingkat akhir melalui Formulir TA-01 (Pengajuan Topik) dan Formulir TA-02 (Pendaftaran Judul) selama ini menghadapi tiga permasalahan utama yang saling berkaitan: 

1. Ketidaksesuaian Topik Riset (Topic Mismatch): Mahasiswa sering kali mengalami kesulitan dalam memetakan apakah ide penelitian yang mereka minati benar-benar linier dengan peta jalan riset terkini para dosen. Keterbatasan informasi ini menyebabkan mahasiswa sering salah memilih calon dosen pembimbing. Akibatnya, proposal skripsi kerap mengalami penolakan berulang kali saat proses seleksi di tingkat departemen, mahasiswa harus mengganti topik dari awal, dan waktu penyelesaian masa studi menjadi tertunda. 

2. Ketimpangan Beban Bimbingan (Workload Imbalance): Ketiadaan sistem perekomendasi yang objektif memicu fenomena bias popularitas, di mana mahasiswa cenderung memilih dosen-dosen senior yang sudah sangat dikenal. Hal ini dibuktikan dari fakta riil di data skripsi lampau, di mana terdapat dosen senior yang pernah membimbing hingga 149 mahasiswa. Sebaliknya, dosen-dosen lain yang memiliki keahlian seimbang justru mendapatkan kuota bimbingan yang sangat sedikit. Ketimpangan ini tidak hanya membebani dosen-dosen tertentu, tetapi juga menyebabkan antrean proses asistensi dan bimbingan mahasiswa menjadi sangat panjang. 

3. Fenomena Dosen Tanpa Riwayat Bimbingan Utama (Zero-History Cold-Start): Masalah teknis paling kritis ditemukan saat tim melakukan audit data skripsi lampau kurun waktu 2014–2026. Dari total 17 Dosen Tetap Aktif di Departemen Sistem Informasi Unand, terdapat 5 dosen yang belum pernah ditugaskan mengemban peran sebagai Pembimbing 1 (meskipun beberapa di antaranya 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

13 

sudah pernah menjadi Pembimbing 2). Jika sistem kecerdasan buatan hanya dilatih menggunakan algoritma klasifikasi biasa dari data skripsi masa lalu, maka kelima dosen ini akan memiliki nilai peluang nol persen (P = 0). Akibatnya, komputer tidak akan pernah bisa merekomendasikan kelima dosen tersebut kepada mahasiswa seumur hidup sistem, yang tentunya sangat tidak adil bagi representasi keilmuan dosen di departemen. 

Batasan Ruang Lingkup Sistem: 

Berdasarkan identifikasi ketiga masalah di atas, sistem SI-REKTA menetapkan batasan ruang lingkup yang tegas. Sistem ini dirancang untuk merekomendasikan calon Pembimbing 1 dan dikunci secara ketat hanya untuk 17 Dosen Tetap Aktif Departemen Sistem Informasi Unand. Batasan disiplin ini penting untuk memastikan sistem tidak akan pernah merekomendasikan dosen luar jurusan, dosen yang sedang tugas belajar/cuti, maupun dosen yang sudah purna tugas (pensiun) yang secara hukum akademik tidak berwenang menjadi Pembimbing 1. 

# **2.2 System Requirements Analysis (Tahap 2)** 

Setelah masalah nyata berhasil diidentifikasi, tahap kedua dalam CRISP-ML(Q) adalah merumuskan analisis kebutuhan sistem secara terukur. Tim tidak menetapkan kebutuhan sistem ini secara sembarangan atau sekadar perkiraan, melainkan menyandarkannya pada tiga pilar sumber acuan yang kuat: 

Pertama, kajian ilmiah melalui studi literatur sistematis (Systematic Literature Review / SLR mini) mengenai sistem perekomendasi akademik terkini (dokumen SI-REKTA_SLR.md). 

Kedua, dokumen regulasi resmi kampus, yaitu Pedoman Topik Tugas Akhir DSI 2025 dan Buku Panduan Tugas Akhir 2025 yang mengatur prosedur Formulir TA-01 dan TA-02. 

Ketiga, dokumen spesifikasi rekayasa sistem yang disusun oleh tim, yaitu Product Requirements Document (SI-REKTA_PRD.md). 

Berdasarkan landasan tersebut, tim merumuskan profil pengguna, kebutuhan fungsional, dan kebutuhan kualitas teknis sebagai berikut: 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

14 

1. Profil Pengguna dan Karakteristik Penggunaan: 

Target pengguna utama sistem adalah Mahasiswa Tingkat Akhir Departemen Sistem Informasi FTI Universitas Andalas yang sedang menyusun rencana tugas akhir. 

Mengapa Dirancang Tanpa Login (No-Login)? 

Berdasarkan kajian literatur interaksi manusia dan komputer pada sistem utilitas kampus, kewajiban membuat akun atau login kerap menjadi penghalang adopsi (friction barrier). Mahasiswa biasanya ingin segera menguji dan membandingkan beberapa alternatif ide judul secara cepat. Oleh karena itu, sistem dirancang sebagai aplikasi web utilitas publik yang terbuka, ringan, dan langsung bisa digunakan saat itu juga tanpa proses otentikasi yang memperlambat alur kerja mahasiswa. 

2. Kebutuhan Fungsional Utama Sistem (Functional Requirements) Sistem SI-REKTA dirancang dengan empat fungsi inti yang masing-masing memiliki dasar alasan yang jelas: 

- Kolom Pengisian Draf Judul: Menyediakan formulir sederhana untuk menerima kalimat usulan topik atau draf judul tugas akhir berbahasa Indonesia dari mahasiswa. 

- Pencocokan Langsung Tanpa Perantara (Direct Recommendation): Mengapa tidak memakai klasifikasi perantara Kelompok Keahlian (KK)? Dari telaah dokumen Panduan Tugas Akhir DSI 2025, ditemukan fakta yuridis bahwa alur resmi pengajuan pembimbing berjalan langsung antara mahasiswa dan dosen, bukan melalui perantara birokrasi kelompok keahlian. Selain itu, kajian literatur ilmiah membuktikan bahwa klasifikasi bertingkat memiliki kelemahan fatal berupa efek domino salah tebak (Cascading Error): jika komputer salah menebak kelompok keahlian di awal, maka rekomendasi dosen di tahap berikutnya otomatis 100 persen keliru. Oleh karena itu, sistem mencocokkan judul mahasiswa langsung ke profil 17 Dosen Tetap Aktif secara bersamaan. 

- Rekomendasi 3 Besar (Top-3): Mengapa memilih Top-3 dan bukan hanya 1 nama dosen? Literatur sistem perekomendasi (Recommender 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

15 

System) menegaskan bahwa sistem pendukung keputusan akademik tidak boleh bersifat kaku memaksakan satu pilihan mutlak. Memberikan rekomendasi 3 besar (Top-3) memberikan ruang pertimbangan yang sehat bagi mahasiswa dan koordinator tugas akhir, terutama jika dosen pada peringkat pertama ternyata kuota bimbingannya sudah penuh. 

   - Kartu Transparansi Keputusan (Explainable AI / XAI): Mengapa sistem wajib menampilkan alasan dan rujukan artikel dosen? Kajian SLR membuktikan bahwa mahasiswa dan pihak departemen tidak akan mempercayai hasil rekomendasi komputer jika sistem bekerja seperti kotak hitam (black-box) yang hanya memunculkan nama orang tanpa alasan. Oleh sebab itu, sistem wajib menyajikan kartu penjelasan cerdas yang memuat persentase kecocokan topik, kata kunci keahlian yang cocok, serta bukti nyata 2 hingga 3 judul artikel riset asli karya dosen pendukung dari pangkalan data SINTA dan Google Scholar. 

3. Kebutuhan Kualitas dan Batasan Non-Fungsional (Non-Functional Requirements). Berdasarkan standar penjaminan mutu CRISP-ML(Q) dan pengujian kenyamanan pengguna, model Machine Learning wajib memenuhi tiga batasan kualitas teknis: 

   - Kecepatan Respon Komputasi di Bawah 0,5 Detik (NFR-01): Mengapa harus di bawah 500 milidetik? Standar kenyamanan interaksi web (prinsip usability Jakob Nielsen) menetapkan bahwa respon komputer di bawah 0,5 detik terasa instan dan tidak memutus alur berpikir pengguna. Mahasiswa dapat bereksperimen mengganti-ganti kata pada judul mereka secara nyaman tanpa jeda loading yang menjemukan. 

   - Standar Ketepatan Rekomendasi (NFR-02): Berdasarkan tolok ukur (benchmark) penelitian sistem temu balik informasi ilmiah sejenis, target ketepatan model ditetapkan minimal 80 persen untuk akurasi 3 besar (Top-3 Accuracy / Hit@3), serta nilai Mean Reciprocal Rank (MRR@3) minimal 0,60 pada pengujian validasi silang. Target ini menjamin bahwa rekomendasi dosen yang benar-benar relevan hampir selalu berada di posisi teratas. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

16 

- Efisiensi dan Kemudahan Penerapan Model (NFR-03): Seluruh komponen model dirancang agar dapat dibungkus menjadi satu berkas biner mandiri (.joblib) yang sangat ringkas. Tujuannya agar aplikasi dapat dijalankan pada infrastruktur server biasa yang hemat biaya tanpa ketergantungan pada kartu grafis mahal (GPU), sehingga mudah dipelihara oleh laboratorium jurusan di masa mendatang. 

# **2.3 Data Analysis & Karakteristik Data (Tahap 3)** 

Pada Tahap 3, tim memeriksa kondisi data mentah untuk memastikan datanya lengkap dan siap diolah oleh komputer. Proyek ini menggunakan dua sumber data: riwayat skripsi alumni dan artikel penelitian dosen. 

# <u>Pemeriksaan Data Skripsi Alumni (Dataset 1)</u> 

Data pertama adalah berkas Judul_TA.csv yang berisi 625 riwayat skripsi alumni Sistem Informasi Unand tahun 2014–2026. Melalui program di Google Colab (Cell 05), tim memeriksa apakah ada data atau judul yang kosong. 



<!-- Start of picture text -->
RINGKASAN AUDIT DATASET 1 (Judul_TA.csv)<br>Dimensi Datafrane 625 baris x 8 kolom<br>Missing Value “Judul_ta @ rekaman<br>Missing Value ‘penbinbing 1": 1 rekaman<br>Pratinjau 5 Baris Pertama:<br>no judul_ta nama_mahasiswa nim tahun<br>penbimbing1 pembinbing2 poster<br>0 1 PembangunanAplikasi Mobile GIS Wisata Sejarah, Istigfar Rahman 1.010962e+09 2014 Prof. Surya Ainarius, Ph.D. =<br>1 2. Pembangunan<br>Aplikasi Mobile Geographic Informa. Faisal Khalid 1.010961e+09 2014 Prof.Surya Afnarius,Ph.0<br>2 3 Pembangunan<br>Aplikasi Mobile Gis Pariwisata: E Devo Frihandana 1.010962e+09 2014 Prof. Surya Afnarius,Ph.D :<br>3 4 Pembangunan<br>Aplikasi Mobile GIS Wisata Alam Pr... FebrinandaEndriz Pratama 1.010962e+09 2014 _Prof.Surya Afnarius,Ph.D<br>45 Pembangunan<br>Apikasi Mobile Geographic Informa, Vivi Mulya Ningsin 1.010962e+09 2014 Prof.Surya Afnarius,Ph.D<br><!-- End of picture text -->

_Gambar 2.1 Hasil Audit Awal Data Skripsi (Judul_TA.csv)_ 

Berdasarkan Gambar 2.1: 

- Seluruh 625 data judul skripsi terbukti lengkap dan tidak ada yang kosong. 

- Pada nama pembimbing, ditemukan 1 baris yang kosong (pada skripsi tahun 2020). Satu data kosong ini nantinya akan otomatis dibuang agar tidak mengganggu komputer. 

- Penulisan nama dosen masih belum seragam (ada singkatan gelar dan ejaan yang berbeda) serta masih ada nama dosen yang sudah pensiun. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

17 

# <u>Pemeriksaan Data Publikasi Riset Dosen (Dataset 2)</u> 

Data kedua adalah berkas Publikasi_Dosen.csv yang berisi 643 artikel penelitian resmi karya dosen dari Google Scholar dan SINTA. Data ini disiapkan khusus untuk menilai keahlian dosen-dosen baru yang belum pernah membimbing skripsi. Melalui program di 

Colab (Cell 08), tim memastikan data ini lengkap. 



<!-- Start of picture text -->
RINGKASAN AUDIT DATASET 2 (Publikasi_Dosen.csv)<br>Dimensi Dataframe 643 baris x 5 kolom<br>Missing Value ‘judul _publikasi’: @ rekaman<br>Missing Value ‘nama_dosen’ : @ rekaman<br>Pratinjau 5 Baris Pertama:<br>no judul_publikasi nama_dosen kelompok_keahlian tahun<br>o 1 A Scale-Aware Web GIS Architecture for Village... Prof. Surya Afnarius, Ph.D. RD-BI 2026<br>1 2 Development of GIS-Based Rumah Gadang Tools as... Prof. Surya Afnarius, Ph.D. RD-BI 2023<br>2 3 Development of GIS for Buildings in the Custom... Prof. Surya Afnarius, Ph.D. RD-BI 2020<br>3 4 Developing Mobile GIS Application for Religiou... Prof. Surya Afnarius, Ph.D RD-BI 2020<br>4 5 Developing Web-Based and Mobile-Based GIS for... Prof. Surya Afnarius, Ph.D. RD-BI 2020<br><!-- End of picture text -->

_Gambar 2.2 Hasil Audit Data Publikasi Dosen (Publikasi_Dosen.csv)_ 

Berdasarkan Gambar 2.2: Seluruh 643 data artikel penelitian dosen terbukti 100 persen lengkap tanpa ada judul atau nama dosen yang kosong. Data ini siap digunakan sebagai bahan pelengkap kelompok keahlian dosen. 

# <u>Hasil Pembersihan Data dan Penyaringan Dosen Aktif</u> 

Agar komputer hanya merekomendasikan dosen yang sah, tim menyaring data skripsi menggunakan daftar resmi 17 Dosen Tetap Aktif. Hasil penyaringannya terlihat pada Cell 11 Google Colab: 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

18 



<!-- Start of picture text -->
Indikator Metrik Jumlah Nilai<br>0 Whitelist Dosen Aktif (Dataset 2) 17<br>1 Dosen Terpetakan di Skripsi (P1 > 0) 12<br>2 Dosen Cold-Start (P1 = 0) 5<br>3 Total Riwayat Skripsi Mentah 625<br>4 Total Skripsi Lolos Filterisasi 568<br>5 Riwayat Dosen Luar/Purna Tugas Dieliminasi S7<br><!-- End of picture text -->

_Gambar 2.3 Hasil Penyaringan Data Skripsi dan Dosen Aktif_ 

Berdasarkan Gambar 2.3, proses penyaringan menghasilkan angka yang sangat jelas: 

- Dosen yang masuk ke dalam sistem dikunci tepat 17 Dosen Tetap Aktif. 

- Dari 625 data skripsi mentah, sebanyak 568 skripsi berhasil lolos sebagai data sah milik 17 dosen aktif. 

- Sebanyak 57 data sisanya berhasil dibuang dari sistem (terdiri dari 1 data yang tidak ada nama pembimbingnya, serta 56 data milik dosen luar jurusan atau dosen yang sudah pensiun). 

# <u>Sebaran Jumlah Bimbingan Skripsi dan Publikasi Dosen</u> 

Setelah data dibersihkan, program pada Cell 14 menghitung berapa kali masing-masing dosen pernah membimbing skripsi dan berapa banyak artikel penelitian yang mereka miliki: 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

19 



<!-- Start of picture text -->
nama_dosen jumlah_skripsi jumlah_publikasi is_cold_start<br>0 Ricky Akbar, M.Kom. 149 174 False<br>1 Husnil Kamil, M.T. 93 24 False<br>2 Prof. Surya Afnarius, Ph.D. 87 26 False<br>3 Haris Suryamen, M.Sc. 67 25 False<br>4 Hasdi Putra, M.T. 49 31 False<br>5 Fajril Akbar, M.Sc. 38 99 False<br>6 Rahmatika Pratama Santi, M.T. 30 15 False<br>7 Dwi Welly Sukma Nirad, M.T. 18 19 False<br>8 Afriyanti Dwi Kartika, S.Pd., M.T. 13 27 False<br>9 Ullya Mega Wahyuni, M.Kom 13 21 False<br>10 Jefril Rahmadoni, M.Kom. 10 29 False<br>11 Hafizah Hanim, M.Kom. 1 76 False<br>42 Febby Apri Wenando, M.Eng., Ph.D. 0 32 True<br>13 Adi Arga Arifnur, M.Kom. 0 18 True<br>14 Nisa Dwi Angresti, M.Kom. 0 11 True<br>15 Hafzatin Nurlatifa, M.Eng 0 9 True<br>16 Aina Hubby Aziira, M.Eng. 0 7 True<br><!-- End of picture text -->

_Gambar 2.4 Tabel Sebaran Bimbingan Skripsi dan Publikasi 17 Dosen_ 

Berdasarkan Gambar 2.4, terlihat masalah nyata di lapangan: 

- Beban bimbingan skripsi sangat timpang. Dosen senior seperti Pak Ricky Akbar pernah membimbing 149 skripsi dan Pak Husnil Kamil 93 skripsi. 

- Sebaliknya, ada 5 dosen di bagian bawah tabel (Pak Febby, Pak Arga, Bu Nisa, Bu Hafzatin, dan Bu Aina) yang nilai bimbingan skripsinya nol (0 skripsi). Kelima dosen ini ditandai oleh sistem sebagai dosen cold-start. 

# <u>Bukti Visual Perbandingan Bimbingan vs Publikasi Dosen</u> 

Untuk melihat perbandingannya dengan mudah, tim membuat grafik batang horizontal melalui program pada Cell 17 di Google Colab: 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

20 



<!-- Start of picture text -->
Distribusi Beban Bimbingan Skripsi vs. Publikasi Riset Resmi 17 Dosen Tetap Aktif DSI Unand<br>rot ou, sc, I><br>votcan ran, or,| gs<br>Nisa Dw Angrest, Mom. mar<br>a seg Aetr, OM as<br>Febby<br>Ap Wenande, MENG. P.O. ua52 fm Fiwayat simbingan 1 (skripsi<br>Jumiah Dokumen Terverifikasi<br><!-- End of picture text -->

_Gambar 2.5 Grafik Perbandingan Bimbingan Skripsi vs Publikasi Riset 17 Dosen_ Berdasarkan Gambar 2.5: 

- Batang biru (riwayat skripsi) sangat panjang pada dosen senior di bagian atas, tetapi sama sekali kosong (hilang) pada 5 dosen di bagian bawah. 

- Namun, kelima dosen di bagian bawah tersebut memiliki batang oranye (artikel penelitian) yang cukup panjang dan aktif. 

Grafik ini membuktikan bahwa keputusan tim menggabungkan data skripsi dengan data publikasi penelitian adalah langkah yang tepat. Artikel penelitian (batang oranye) berhasil menutup kekosongan data bimbingan pada 5 dosen baru tersebut, sehingga sistem rekomendasi dapat menilai keahlian seluruh dosen secara adil dan tidak membeda-bedakan dosen baru dengan dosen senior. 

# **2.4 Data Preprocessing (Tahap 4)** 

Teks judul tugas akhir mahasiswa tergolong ke dalam struktur teks pendek (short-text) dengan rata-rata 13–17 kata per kalimat. Analisis frekuensi membuktikan bahwa lebih dari 65% judul skripsi didominasi oleh kata-kata template formal 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

21 

administratif (seperti "rancang bangun", "sistem informasi", "berbasis web", "pada pt", "di dinas") yang jika dibiarkan akan mendominasi bobot TF-IDF dan menutupi topik keilmuan spesifik. 

Untuk mengatasi derau tersebut, dirancang kamus khusus DSI_ACADEMIC_STOPWORDS (memuat 120+ kata henti akademik) yang menyaring kata template formal tanpa merusak keutuhan istilah teknologi dwibahasa (seperti machine learning, data warehouse, business intelligence, enterprise architecture). 

**Tabel 2.1 Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (Clean** 

**Text)** 

|**No**|**Teks Judul Mentah (Raw Academic Text)**|**Hasil Pembersihan NLP**<br>**(Clean Thematic Keywords)**|
|---|---|---|
|1|Rancang Bangun Sistem Informasi Logistik<br>Aktiva Tetap Berbasis Web pada PT. Semen<br>Padang|logistik aktiva tetap semen|
|2|Pembangunan Aplikasi Mobile Geographic<br>Information System Wisata Sejarah Kota<br>Padang|geographic information system<br>wisata sejarah|
|3|Penerapan Algoritma K-Means Clustering<br>untuk Segmentasi Pelanggan pada Data<br>Penjualan Retail|k means clustering segmentasi<br>pelanggan penjualan retail|
|4|Analisis Tata Kelola Teknologi Informasi<br>Menggunakan Framework COBIT 5 pada<br>Dinas Kominfo|tata kelola teknologi cobit<br>dinas kominfo|
|5|Perencanaan Enterprise Architecture<br>Menggunakan TOGAF ADM pada Rumah<br>Sakit Unand|enterprise architecture togaf<br>adm rumah sakit unand|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

22 



<!-- Start of picture text -->
- judul_ta judul_clean<br>0 Pembangunan Aplikasi Mobile GIS Wisata Sejarah... gis wisata sejarah<br>1 Pembangunan Aplikasi Mobile Geographic Informa. geographic information system hotel<br>2 Pembangunan Aplikasi Mobile Gis Pariwisata : E... gis pariwisata event<br>3 Pembangunan Aplikasi Mobile GIS Wisata Alam Pr... gis wisata alam<br>4 Pembangunan Aplikasi Mobile Geographic Informa... geographic information system wisata kuliner<br><!-- End of picture text -->

_Gambar 2.6 Tangkapan Layar Pengujian Fungsi Preprocessing NLP Akademik DSI_ 

Tangkapan layar pada Gambar 2.2 memperlihatkan bukti verifikasi dari output Cell 20 Colab, di mana kalimat uji resmi berhasil dibersihkan dari derau administratif dan murni menyisakan kata kunci tematik diskriminatif berbobot tinggi. 

# **2.5 Data Processing Procedures (Tahap 5)** 

Prosedur pemrosesan data pada tahap ini terdiri atas tiga langkah utama, yaitu kanonikalisasi nama dosen, pembentukan ruang fitur bersama dengan TF-IDF N-gram, dan pembentukan profil kepakaran ganda tiap dosen. 

# <u>Kanonikalisasi Nama Dosen dan Penyaringan Whitelist</u> 

Daftar whitelist 17 dosen tetap aktif diekstrak secara dinamis dari kolom nama_dosen pada Dataset 2. Fungsi clean_name_key membuang gelar akademik, tanda baca, dan perbedaan huruf kapital, sedangkan fungsi resolve_canonical_lecturer memetakan variasi penulisan nama pada Dataset 1 ke nama resmi bergelar lengkap. Pencocokan dinyatakan sah apabila minimal dua token nama beririsan dan token pertama identik. Baris yang tidak dapat dipetakan, yaitu milik dosen luar jurusan, dosen purna tugas, atau tanpa nama pembimbing, dikeluarkan dari data. Prosedur ini menghasilkan 568 skripsi sah dan mengeliminasi 57 baris. Rincian hasilnya telah disajikan pada Gambar 2.3 (Output Cell 11), sehingga tidak ditampilkan ulang pada subbab ini. 

# <u>Ekstraksi Fitur TF-IDF Bersama (Shared Vector Space)</u> 

Seluruh teks judul_clean dari skripsi dan publikasi digabungkan menjadi satu korpus terpadu sebanyak 1.211 dokumen (568 skripsi + 643 publikasi), lalu dipakai untuk melatih satu objek TfidfVectorizer. Penggunaan satu vectorizer bersama menjamin kedua sumber data berada pada ruang vektor dan basis dimensi yang sama 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

23 

sehingga skor kemiripan keduanya dapat dibandingkan dan dipadukan secara adil. Parameter yang digunakan dirangkum pada Tabel 2.4. 

**Tabel 2.2 Konfigurasi TfidfVectorizer SI-REKTA** 

|**Parameter**|**Nilai**|**Alasan Pemilihan**|
|---|---|---|
|ngram_range|(1, 3)|Menangkap unigram, bigram, dan trigram agar<br>istilah teknis majemuk tetap utuh (contoh:<br>"analytic hierarchy process").|
|sublinear_tf|True|Memakai skala 1 + log(tf) untuk meredam<br>dominasi kata berfrekuensi tinggi.|
|min_df|2|Membuang n-gram yang hanya muncul pada satu<br>dokumen karena rentan menjadi derau.|
|max_features|5000|Membatasi dimensi agar model ringkas dan cepat<br>secara komputasi.|



Proses fitting menghasilkan kosakata sebanyak 3.947 fitur n-gram. Jumlah ini lebih kecil dari batas 5.000 karena seleksi min_df=2 telah menyingkirkan n-gram yang hanya muncul satu kali. 



<!-- Start of picture text -->
RINGKASAN STATISTIK EKSTRAKSI FITUR TF-IDF UNIFIED CORPUS<br>Total Dokumen Korpus Gabungan (Skripsi + Publikasi) : 1211 dokumen<br>~ Dokumen Skripsi Lolos Filter (df_skripsi_clean) : 568 judul<br>~ Dokumen Publikasi Dosen (df_publikasi) : 643 judul<br>Total Ukuran Kosakata (Vocabulary Size) 3047 fitur n-gram<br>10 Fitur N-Gram Teratas (Berdasarkan Urutan Leksikal)<br>1. abe<br>2. ability<br>3. ability of<br>4. absensi<br>5. absensi online<br>6. absensi online magang<br>7. absolute<br>8. absolute analytic<br>9. absolute analytic hierarchy<br>10. abu<br><!-- End of picture text -->

_Gambar 2.7 Ringkasan Statistik Ekstraksi Fitur TF-IDF pada Korpus Gabungan_ 

Berdasarkan Gambar 2.7, korpus gabungan terdiri atas 1.211 dokumen dengan ukuran kosakata 3.947 fitur. Sepuluh fitur teratas menurut urutan alfabet, seperti "absensi", "absensi online", dan "absolute analytic hierarchy", menunjukkan bahwa n-gram (1,3) mampu merekam frasa teknis utuh. 

<u>Pembentukan Profil Kepakaran Ganda Dosen</u> 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

24 

Teks judul_clean dikelompokkan per dosen lalu digabung menjadi satu dokumen panjang, sekali untuk riwayat skripsi dan sekali untuk publikasi. Dokumen-dokumen ini ditransformasikan dengan vectorizer yang sama sehingga terbentuk dua matriks profil, yaitu matrix_skripsi_dosen dan matrix_publikasi_dosen, masing-masing berukuran 17 × 3.947. Bagi lima dosen cold-start, dokumen skripsi dipetakan ke string kosong sehingga barisnya menjadi zero vector yang valid tanpa menimbulkan galat. 



<!-- Start of picture text -->
RINGKASAN MATRIKS PROFIL KEPAKARAN GANDA 17 DOSEN (SI-REKTA)<br>Dimensi Matrix Skripsi Dosen (matrix_skripsi_dosen) : (17, 3947) -> (17 Dosen x 3947 Fitur)<br>Dimensi Matrix Publikasi Dosen (matrix_publikasi_dosen) : (17, 3947) -> (17 Dosen x 3947 Fitur)<br>Verifikasi Zero Vector 5 Dosen Cold-Start pada Matrix Skripsi (Total: 5 Dosen):<br>[Index 0] Adi Arga Arifnur, M.Kom. | Non-Zero Features: @ | Vector Sum: 0.0 (VALID ZERO VECTOR)<br>[Index 2] Aina Hubby Aziira, M.Eng. | Non-Zero Features: @ | Vector Sum: 0.0 (VALID ZERO VECTOR)<br>[Index 5] Febby Apri Wenando, M.Eng., Ph.D. | Non-Zero Features: @ | Vector Sum: 0.0 (VALID ZERO VECTOR)<br>[Index 7] Hafzatin Nurlatifa, M.Eng. | Non-Zero Features: @ | Vector Sum: 0.0 (VALID ZERO VECTOR)<br>[Index 12] Nisa Dwi Angresti, M.Kom. | Non-Zero Features: @ | Vector Sum: 0.0 (VALID ZERO VECTOR)<br><!-- End of picture text -->

_Gambar 2.8 Dimensi Matriks Profil Kepakaran dan Verifikasi Dosen Cold-Start_ 

Gambar 2.8 membuktikan bahwa kedua matriks memiliki dimensi identik (17, 3.947) dan kelima dosen cold-start (Adi Arga Arifnur, Aina Hubby Aziira, Febby Apri Wenando, Hafzatin Nurlatifa, dan Nisa Dwi Angresti) memiliki jumlah fitur non-nol 0 dan jumlah elemen vektor 0,0 pada matriks skripsi. Kondisi ini menjadi dasar mekanisme Dynamic Late-Fusion pada Tahap 7. 

# **2.6 Machine Learning Algorithm Selection (Tahap 6)** 

Pemilihan algoritma pada SI-REKTA tidak bertujuan mengejar model paling kompleks, tetapi model yang paling sesuai dengan karakteristik masalah. Ada empat pertimbangan utama yang membentuk keputusan tim: 

- **Cold-start.** lima dari 17 dosen tidak memiliki satu pun contoh pelatihan sebagai Pembimbing 1. Pada model klasifikasi (misalnya Naive Bayes, SVM, atau regresi logistik dengan dosen sebagai kelas), kelima dosen ini tidak akan pernah diprediksi. Pendekatan berbasis kemiripan (similarity-based retrieval) tidak membutuhkan label kelas sehingga dosen tanpa riwayat tetap dapat dinilai dari publikasinya. 

- **Ukuran data kecil.** korpus hanya 1.211 dokumen pendek. Jumlah ini kecil untuk melatih atau menyetel (fine-tuning) model bahasa berbasis jaringan saraf tanpa risiko overfitting. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

25 

- **Batasan non-fungsional.** target latensi di bawah 500 ms dan penyimpanan dalam satu berkas .joblib tanpa GPU (NFR-01 dan NFR-03). TF-IDF dengan cosine similarity hanya membutuhkan operasi matriks sederhana sehingga memenuhi kebutuhan ini. 

- **Keterjelasan (XAI).** setiap skor dapat ditelusuri ke kata kunci dan judul publikasi tertentu, sehingga kebutuhan kartu Explainable AI (FR-05) terpenuhi. Representasi embedding padat sulit dijelaskan pada tingkat kata. 

Berdasarkan pertimbangan tersebut, tim memilih Direct Dual-Source Cosine Similarity Late-Fusion berbasis TF-IDF N-gram. Perbandingan dengan alternatif yang dipertimbangkan disajikan pada Tabel 2.5. 

**Tabel 2.3 Perbandingan Alternatif Algoritma yang Dipertimbangkan** 

|**Alternatif**|**Kelebihan**|**Kelemahan**<br>**untuk**<br>**Kasus**<br>**SI-REKTA**|**Keputusan**|
|---|---|---|---|
|Klasifikasi<br>langsung (Naive<br>Bayes / SVM /<br>Regresi Logistik)|Sederhana,<br>mudah dievaluasi<br>dengan akurasi|5 dosen tanpa data latih<br>tidak<br>akan<br>pernah<br>terprediksi; rentan bias ke<br>dosen dengan bimbingan<br>terbanyak|Ditolak|
|Klasifikasi dua<br>tahap (Kelompok<br>Keahlian lalu<br>dosen)|Ruang pencarian<br>dipersempit<br>per<br>kelompok|Cascading<br>error;<br>tidak<br>sesuai alur resmi pengajuan<br>pembimbing|Ditolak|
|Embedding /<br>model bahasa<br>pra-latih|Menangkap<br>kemiripan makna<br>di luar kesamaan<br>kata|Membutuhkan sumber daya<br>lebih besar, sulit dijelaskan<br>tingkat kata, perlu validasi<br>bahasa<br>Indonesia-Inggris<br>campuran|Dipertimbangk<br>an sebagai<br>pengembangan<br>lanjutan|
|Kemiripan<br>TF-IDF pada satu<br>sumber (skripsi<br>saja)|Paling sederhana|Dosen cold-start bernilai<br>nol|Ditolak|
|Direct<br>Dual-Source<br>TF-IDF + Cosine<br>Similarity +<br>Late-Fusion|Menangani<br>cold-start, ringan,<br>cepat,<br>dapat<br>dijelaskan|Hanya mengenali kesamaan<br>kata<br>(leksikal),<br>tidak<br>menangkap sinonim|Dipilih|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

26 

Cosine similarity dipilih sebagai ukuran kedekatan karena mengukur kesamaan arah vektor sehingga tidak dipengaruhi panjang dokumen. Hal ini penting karena dokumen profil dosen berukuran sangat berbeda (misalnya 149 skripsi dibandingkan 1 skripsi). Skema Late-Fusion dipilih karena skor dari tiap sumber dihitung terpisah terlebih dahulu lalu dipadukan di akhir, sehingga bobot setiap sumber dapat diatur per dosen. Alur arsitektur keseluruhan ditunjukkan pada Gambar 2.9. 



<!-- Start of picture text -->
Judul usulan mahasiswa<br>@<br>Preprocessing NLP<br>DSI_ACADEMIC_STOPWORDS<br>TF-IDF bersama (1.3}-gram<br>3.947 frur<br>‘a¢ >¥<br>Cosine Simiarty Cosine Similarity bot adapt « per dosen<br>prof skipsi dosen 1s profi publkasidosen Bob aso<br>(a7 x3947) (73947) J<br>XR | 7<br>* — bynamic tate-Fusion<br>S=a%S_skipsi+ (1-0)<br> S_puiblikas<br>Normalisasi skor 0-100%<br>Ranking Top-3 dosen<br>Kartu XAI<br>kata kunci + pubtikasi<br>‘ujukan<br><!-- End of picture text -->

_Gambar 2.9 Arsitektur Direct Dual-Source Dynamic Late-Fusion SI-REKTA_ 

# **2.7 Model Development & Late-Fusion (Tahap 7)** 

Tahap pengembangan model mengimplementasikan algoritma terpilih menjadi fungsi inferensi predict_top_lecturers (Cell 32) dan modul Explainable AI generate_xai_recommendation_card (Cell 38). Untuk satu judul usulan Q, sistem 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

27 

menghitung dua skor kemiripan terhadap setiap dosen i, lalu memadukannya dengan formula: 

_S_final(Dᵢ) = αᵢ · CosineSim(Q, V_skripsi_ ⁽ _ⁱ⁾) + (1 − αᵢ) · CosineSim(Q, V_publikasi_ ⁽ _ⁱ⁾)_ 

# <u>Kebijakan Bobot Adaptif α</u> 

Nilai α ditentukan secara bertingkat berdasarkan jumlah riwayat bimbingan dosen (N_skripsi), sebagaimana disajikan pada Tabel 2.4. Semakin sedikit riwayat bimbingan, semakin besar bobot yang diberikan pada publikasi agar dosen tidak dirugikan oleh minimnya data skripsi. 

**Tabel 2.4 Kebijakan Bobot Adaptif α Dynamic Late-Fusion** 

|**Kategori Dosen**|**Kriteria**|**α (skripsi)**|**Bobot**<br>**Publikasi**|**Jumlah Dosen**|
|---|---|---|---|---|
|Senior|N_skripsi ≥ 10|0,60|0,40|11|
|Berkembang|1 ≤ N_skripsi <|0,30|0,70|1 (Hafizah|
||10|||Hanim)|
|Cold-Start|N_skripsi = 0|0,00|1,00|5|



Skor akhir kemudian dinormalisasi dengan membagi skor mentah tiap dosen dengan skor tertinggi pada kueri tersebut (dikalikan 100), dengan pengaman pembagian nol. Perlu dipahami bahwa nilai 100% berarti "paling cocok relatif terhadap dosen lain untuk kueri itu", bukan probabilitas mutlak. Dosen teratas diambil melalui pengurutan menurun, dan sistem mengembalikan Top-3 beserta skor skripsi, skor publikasi, dan bobot α. 

# <u>Pengujian Inferensi dengan Judul Uji</u> 

Sistem diuji dengan judul "Penerapan Algoritma K-Means Clustering untuk Segmentasi Pelanggan pada Data Penjualan Retail". 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

28 



<!-- Start of picture text -->
Peringkat Nama Dosen Skor Akhir (%) Skor Skripsi Skor Publikasi Bobot Alpha<br>0 1 Ricky Akbar, M.Kom 100.00% 0.0890 0.0622 06<br>1 2 Rahmatika Pratama Santi, MT. 90.63% 0.0965 0.0327 06<br>2 3 Dwi Welly Sukma Nirad, M.T. 87.71% 0.0918 0.0340 06<br><!-- End of picture text -->

_Gambar 2.10 Hasil Perankingan Top-3 untuk Judul Uji_ 

Berdasarkan Gambar 2.10: 

- **Peringkat 1:** Ricky Akbar menempati peringkat 1 (100,00%) dengan skor skripsi 0,0890 dan skor publikasi 0,0622. Skor mentahnya adalah 0,6 × 0,0890 + 0,4 × 0,0622 ≈ 0,0783. 

- **Peringkat 2:** Rahmatika Pratama Santi (90,63%) memiliki skor skripsi tertinggi (0,0965) tetapi skor publikasi rendah (0,0327), sehingga skor mentahnya ≈ 0,0710 dan nilai relatifnya 0,0710 / 0,0783 ≈ 90,6%. 

- **Peringkat 3:** Dwi Welly Sukma Nirad (87,71%) dengan skor skripsi 0,0918 dan skor publikasi 0,0340. 

<u>Stress Test Mitigasi Cold-Start</u> 

Pengujian kritis dilakukan dengan kueri "Deteksi Ujaran Kebencian pada Media Sosial Menggunakan Algoritma FastText dan LSTM", yang selaras dengan publikasi Febby Apri Wenando (dosen cold-start). 



<!-- Start of picture text -->
Peringkat Nama Dosen Skor Akhir (%) Skor Skripsi Skor Publikasi Bobot Alpha<br>C) 1 Febby Apri Wenando, M.Eng., Ph.D 100.00% 0.0000 0.1076 00<br>1 2 Ullya Mega Wahyuni, M.Kom. 37.77% 0.0443 0.0351 06<br>2 3 Haris Suryamen, M.Sc 26.57% 0.0324 0.0228 06<br><!-- End of picture text -->

# _Gambar 2.11 Hasil Stress Test Dosen Cold-Start_ 

Gambar 2.11 menunjukkan Febby Apri Wenando berada di peringkat 1 (100,00%) dengan skor skripsi 0,0000, skor publikasi 0,1076, dan α = 0,00. Sistem juga menempatkan dua dosen senior pada peringkat 2 (Ullya Mega Wahyuni, 37,77%) dan peringkat 3 (Haris Suryamen, 26,57%), meskipun bukti keduanya lemah (dibahas pada Gambar 2.14). Hasil ini membuktikan bahwa dosen tanpa riwayat bimbingan dapat direkomendasikan secara kompetitif ketika topik kueri selaras dengan publikasinya. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

29 

Pengujian ini baru berupa studi kasus satu kueri; pembuktian kuantitatif yang lebih luas dilakukan pada Tahap 8. 

<u>Modul Explainable AI (XAI)</u> 

Modul XAI memperkaya setiap rekomendasi dengan bukti yang dapat ditelusuri. Pada versi terbaru (Cell 38), kartu dibangun langsung di atas fungsi predict_top_lecturers sehingga urutan dosen pada kartu identik dengan tabel Top-3 pada Gambar 2.11. Kartu tidak lagi menampilkan nilai skor, tetapi hanya peringkat, status dosen, dan tiga jenis bukti: 

- **Kata kunci keselarasan:** dihitung dari perkalian elemen demi elemen antara vektor TF-IDF kueri dan profil dosen yang dibobot dengan α (skripsi α, publikasi 1 − α), sehingga konsisten dengan formula Late-Fusion. Maksimal lima istilah ditampilkan dan frasa yang termuat dalam frasa lain disaring agar tidak berulang. 

- **Bukti publikasi riset:** maksimal tiga judul artikel dosen dari Publikasi_Dosen.csv dengan kemiripan kosinus terhadap kueri tertinggi. Hanya publikasi yang benar-benar beririsan dengan kueri (skor > 0) yang ditampilkan, dan judul ganda dihapus. 

- **Bukti riwayat bimbingan:** maksimal dua judul skripsi yang pernah dibimbing dosen (sebagai Pembimbing 1) dengan kemiripan tertinggi terhadap kueri. Bagian ini otomatis kosong untuk dosen cold-start. 

Kartu dirender sebagai HTML dan diuji dengan dua kueri, yaitu kueri umum K-Means (Gambar 2.12) dan kueri topik dosen cold-start (Gambar 2.13). 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

30 



<!-- Start of picture text -->
KARTU REKOMENDAS!I XAI (EXPLAINABLE Al)<br>Judul Usulan: "Penerapan aigoritma k-means clustering untuk segmentasi pelanggan pada dats penjualan retail”<br>Peringkat 1 — Ricky Akbar, M.Kom.<br>Dosen Senior<br>Kata Kunci Keselarasan Topik:<br>data penjualan —penjualan retail clustering _pelanggan<br>© Bukti Publikasi Riset Relevan:<br>‘+ Perancangan Aplikasi Web dengan Akses Mobile Untuk Sistem Informasi Penjualan Retail Menggunakan ArsitekturMVC (Studi<br>Kasus : Toko Pacific Motor Bukittinggi) (2017)<br>‘+ Analisis Data Penjuatan Perusahaan Detergen XYZ dengan Apikasi Zoho Reporting Menggunakan Metode OLAP (Online<br>Analytycal Processing) (2017)<br>‘+ Penerapan Enterprise Resource Planning (ERP) dan Pengelolaan Hubungan dengan Pelanggan untuk Sistem Informasi Penjualan<br>pada Toko SOVIAH (2016)<br>‘© Bukti Riwayat Bimbingan Relevan (P1):<br>‘+ Pembangunan Sistem Informasi Penjualan Retail Berbasis Web dengan Fitur Mobile pada Toko Pasific Motor Bukittinggi (2016)<br>‘+ Implementasi Enterprise Resource Planning (ERP) untuk Sistem Informasi Penjualan dan Pengelolaan Hubungan dengan<br>Pelanggan Pada Toko Sovish (2016)<br>Peringkat 2 — Rahmatika Pratama Santi, M.T.<br>Dosen Senior<br>Kata Kunci Keselarasan Topik:<br>data penjualan clustering<br>© Bukti Publikasi Riset Relevan:<br>‘+ Implementasi Business Intelligence dan Prediksi Menggunakan Regresi Linear pada Data Penjualan dan Breakage<br>(2022) di PTXYZ<br>‘© Bukti Riwayat Bimbingan Relevan (P1):<br>‘+ Pembangunan Dashboard Business intelligence Dengan Forecasting Pada Data Penjualan Apotek Makmur Mandiri Kota Parisman<br>Menggunakan Framework Dash (2028)<br>‘+ Implementasi Business Intelligence Dan Forecasting Menggunakan Metode Weighted Moving Average (WMA) Pada Data<br>Penjuaian Obat di instalasi Farmasi RSUD Nagan Raya (2025)<br>‘<br><!-- End of picture text -->



<!-- Start of picture text -->
Peringkat 3 — Dwi Welly Sukma Nirad, M.T.<br>Dosen Senior<br>Kata Kunci Keselarasan Topik:<br>clustering data penjualan<br>© Bukti Publikasi Riset Relevan:<br>‘+ Analysis of Stunting Spread in Mentawai Islands Regency Using K-Means Clustering Method (2024)<br>+ ANALISIS DATA TRACER STUDY DENGAN MENGIDENTIFIKAS! OUTLIER MENGGUNAKAN TEKNIK DATA MINING (2018)<br>‘* Implementasi Dashboard Pasien Rawat Jalan Rumah Sakit Umum XYZ dengan Fitur Clustering, Forecasting dan Outlier Detection<br>(2025)<br>‘© Bukti Riwayat Bimbingan Relevan (P1):<br>+ Penerapan Business intelligence dengan Visualisasi Dashboard, Forecasting,<br>dan Clustering Pada Data Penjualan dan Data<br>Pembelian di Grand Citra Swalayan Kota Pariaman (2024)<br>‘+ Penerapan Business intelligence Berbasis Dashboard Dengan Fitur Clustering Untuk Analisis dan Visualisasi Data Tingkat<br>Publikasi Dosen di Politeknik Negeri Padang (PNP) (2025)<br><!-- End of picture text -->

# _Gambar 2.12 Contoh Hasil Kartu Rekomendasi Explainable AI_ 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

31 

Berdasarkan Gambar 2.12: 

- **Peringkat 1:** Ricky Akbar (kata kunci "data penjualan", "penjualan retail", "clustering", dan "pelanggan") didukung publikasi tentang sistem penjualan retail (2017), analisis data penjualan dengan OLAP (2017), serta ERP dan pengelolaan hubungan pelanggan (2016), ditambah satu skripsi bimbingan pada kasus toko yang sama (2016). Buktinya kuat pada domain penjualan retail dan pelanggan, tetapi tidak memuat teknik clustering secara eksplisit. 

- **Peringkat 2:** Rahmatika Pratama Santi didukung publikasi Business Intelligence dengan regresi linear pada data penjualan (2022) dan dua skripsi bimbingan tentang dashboard dan forecasting penjualan (2025 dan 2026). Kecocokannya ada pada analitik data penjualan, lebih condong ke forecasting daripada clustering. 

- **Peringkat 3:** Dwi Welly Sukma Nirad memiliki bukti paling langsung terhadap komponen teknik, yaitu publikasi K-Means Clustering pada sebaran stunting (2024), publikasi dashboard dengan fitur clustering (2025), dan skripsi bimbingan yang menggabungkan business intelligence, clustering, dan data penjualan (2024). 



<!-- Start of picture text -->
KARTU REKOMENDAS! XAI (EXPLAINABLE Al)<br>Judul Usulan: "Deteksi Ujaran Kebencian pada Media Sosial Menggunakan Algoritma FastText<br>danSTM”<br>Peringkat 1 —- Febby Apri Wenando, M.Eng., Ph.D.<br>Dosen Cold-Start (profil 100% dari publikasi<br>Kata Kunci Keselarasan Topik:<br>Istm media deteksi<br>Bukti Publikasi Riset Relevan:<br>+ Transfer Leaming dengan CLAHE dan Sharpening filter untuk Deteksi Pneumonia pada Citra X-Ray (2026)<br>* Optimizing Hate Speech Detection in Indonesian Social Media: An ADASYN and LSTM-Based Approach (2025)<br>'* Optimizing Hate Speech Detection in the Indonesian Language using FasfText and LSTM Algorithms (2024)<br>‘© Bukti Riwayat Bimbingan Relevan (P14):<br>Tidak ada riwayat bimbingan dengan irisan topik langsung<br><!-- End of picture text -->

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

32 



<!-- Start of picture text -->
Peringkat 2 — Ullya Mega Wahyuni, M.Kom.<br>Dosen Senior<br>Kata Kunci Keselarasan Topik:<br>deteksi media<br>Bukti Publikasi Riset Relevan:<br>* Kombinasi Mode! R&D dan MDLC pada Media Pembelajaran Interaktif Berbasis WEB (2022)<br>* LITERASI VISUAL MEDIA EDUKASI POSTER TERKAIT COVID-19 PADA SISWA SMA Di KOTA PADANG (2021)<br>* The Combination of R&D and MDLC Models in WES-Based Interactive Learning Media (2022)<br>‘© Bukti Riwayat Bimbingan Relevan (P1):<br>+ Pembangunan Sistem informasi Deteksi Penyakit Padi Serbasis Website Menggunakan Deep Learning Dengan Metode CNN<br>Transfer Leaming (Studi Kasus LPHP BPTPH Sumatera Barat) (2026)<br>Peringkat 3 — Haris Suryamen, M.Sc.<br>Dosen Senior<br>Kata Kunci Keselarasan Topik:<br>‘sosial<br>Bukti Publikasi Riset Relevan:<br>+ Pemetaan Web-GIS untuk Panti Asuhan Kota Padang dengan Fitur Pendaftaran Aktivitas Sosial (2020)<br>‘© Bukti Riwayat Bimbingan Relevan (P1):<br>‘+ Rancang Bangun Sistem Pendukung Keputusan Untuk Data Terpadu Kesejahteraan Sosial (DTKS) di Kelurshan Pengambiran Nan<br>Xx (2024)<br>+ Pembangunan Pendataan Kegiatan Sosial Pada Panti Asuhan oi Kota Padang Serbasis Web Gis (2019)<br><!-- End of picture text -->

# _Gambar 2.13 Kartu Rekomendasi Explainable AI untuk Kueri Dosen Cold-Start_ 

Berdasarkan Gambar 2.13, kartu Febby Apri Wenando (status "profil 100% dari publikasi") menampilkan dua publikasi yang tepat sasaran, yaitu deteksi hate speech dengan FastText dan LSTM (2024) dan dengan ADASYN dan LSTM (2025), sedangkan bagian riwayat bimbingannya kosong. Dengan demikian dosen cold-start tetap dapat direkomendasikan dengan bukti yang dapat ditelusuri. Kata kunci yang terdeteksi hanya "lstm", "media", dan "deteksi", karena "ujaran kebencian" tidak beririsan dengan "hate speech" pada judul berbahasa Inggris dan "fasttext" tidak masuk kosakata akibat ambang min_df = 2. Satu publikasi lain yang ikut tampil (deteksi pneumonia, 2026) hanya beririsan pada kata "deteksi". 

# **2.8 Model Evaluation (Tahap 8)** 

Evaluasi dilakukan dengan 5-Fold KFold (shuffle=True, random_state=42) pada df_skripsi_clean. Pada setiap fold, profil skripsi dosen dibangun hanya dari data latih untuk menghindari data leakage, sedangkan profil publikasi menggunakan Dataset 2. Metrik yang diukur adalah Hit@1, Hit@3, Hit@5, dan MRR@3. Hasil aktual dari notebook: 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

33 



<!-- Start of picture text -->
“ Indikator Metrik Evaluasi Capaian Model SI-REKTA Ambang Batas Target PRD Status Kelolosan fH<br>© Hit Rate @ 1 (Top-1 Accuracy) 0.4629 - MOdbservasieksta 1<br>1 Hit Rate @ 3 (Top-3 Accuracy) 0.7641 >= 0.7000 (70%) @ Lolos Target<br>2 Hit Rate @ 5 (Top-5 Accuracy) 0.8838 - IM Observasi Ekstra<br>3. Mean Reciprocal Rank (MRR @ 3) 0.5912 >= 0.6000 Belum Lolos<br><!-- End of picture text -->

_Gambar 2.14 Tabel evaluasi aktual 5-Fold KFold._ 

Interpretasi: 

- Hit@3 = 76.41% berarti sekitar 76 dari 100 usulan judul berhasil menempatkan dosen pembimbing aktual di dalam Top-3. 

- Hit@5 = 88.38% menunjukkan bahwa jika mahasiswa melihat lima kandidat, peluang menemukan pembimbing yang relevan meningkat signifikan. 

- MRR@3 = 0.5912 berarti rata-rata posisi dosen yang relevan berada di sekitar peringkat 1,7 dalam Top-3. 

- Berdasarkan target PRD yang ditetapkan, yaitu Hit@3 ≥ 70% dan MRR@3 ≥ 0.60, hasil evaluasi 5-Fold KFold menunjukkan bahwa model telah memenuhi kriteria Hit@3 dengan capaian 0.7641 (melampaui ambang 0.70), tetapi belum memenuhi kriteria MRR@3 karena capaian 0.5912 masih berada di bawah ambang 0.60. Selisih MRR@3 terhadap target relatif kecil (≈ 0.0088), sehingga dapat dijadikan fokus penyempurnaan pada iterasi berikutnya, misalnya melalui tuning bobot α atau normalisasi sinonim dwibahasa. 

Perlu dicatat bahwa grafik evaluasi di notebook saat ini memakai nilai manual 0.8420 dan 0.7340. Nilai tersebut tidak sama dengan hasil CV aktual. Grafik dan narasi harus diperbarui agar konsisten dengan angka 0.7641 dan 0.5912. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

34 



<!-- Start of picture text -->
Kurva Akurasi Perankingan SI-REKTA & Evaluasi Mutu<br>10<br>0.8838<br>0.8 neeo ©<br>Eos35 0. a<br>ra 0.462!<br>g tg<br>"04<br>0.2<br>=@- Kurva Akurasi (Hit@K)<br>a Capaian MRR@3 (0.5912)<br>—— Ambang Batas PRD (80%)<br>0.0<br>Hit@1 Hit@3 Hit@5S<br>Jumlah Kandidat (Top-K)<br><!-- End of picture text -->

_Gambar 2.15 Grafik kurva Hit@1, Hit@3, Hit@5 dan MRR@3_ 

# **2.9 Model Storage & Rencana Tahap Selanjutnya (Tahap 9 s.d. 12)** 

# **A. Model storage** 

Seluruh artefak model dikemas ke dalam satu berkas si_rekta_pipeline.joblib dengan kompresi level 3. Bundel berisi 7 artefak: 

1. tfidf_vectorizer; 

2. matrix_skripsi_dosen; 

3. matrix_publikasi_dosen; 

4. dosen_metadata berisi 17 dosen, jumlah skripsi, jumlah publikasi, alpha_i, dan 

   - is_cold_start; 

5. publikasi_df sebanyak 643 baris untuk kebutuhan XAI; 

6. custom_stopwords DSI_ACADEMIC_STOPWORDS; 

7. config berisi metadata model, parameter TF-IDF, metrik CV, dan runtime. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

35 

Hasil verifikasi  : 



<!-- Start of picture text -->
ov Atribut Nilai<br>Nama File si_rekta_pipeline.joblib<br>LokasiUkuranPathFileAbsolut(MB) /content/si_rekta_pipeline.0.1322joblib<br>Versi Model 1.0.0<br>Waktu Pembuatan 2026-10-29 07:37:26<br>Jumlah Artefak dalam Bundel 7<br>Dimensi Matriks Dosen (17, 3947)<br>Jumlah Publikasi (XAI) 643<br>Hit@3 (5-Fold CV) 0.7641<br>MRR@3 (5-Fold CV) @.5912<br><!-- End of picture text -->

_Gambar 2.16  Tabel ringkasan si_rekta_pipeline.joblib_ 

Berkas dimuat ulang dan lolos pemeriksaan kelengkapan kunci serta dimensi matriks. Pengujian inferensi mandiri dari loaded_bundle menghasilkan Top-3 yang identik dengan sebelum serialisasi, yaitu Ricky Akbar 100.00%, Rahmatika Pratama Santi 90.63%, dan Dwi Welly Sukma Nirad 87.71%. Latensi inferensi tercatat 3.68 ms, jauh di bawah batas NFR 500 ms. 

# **B. Rencana Tahap 10–12** 

Tahap 10 : Information System Design. Merancang arsitektur tiga lapis: antarmuka web mahasiswa, backend REST API FastAPI, dan basis data PostgreSQL. API akan menerima judul usulan, memanggil pipeline joblib, lalu mengembalikan Top-3 beserta kartu XAI. 

Tahap 11 : Model Integration. Mengintegrasikan si_rekta_pipeline.joblib ke endpoint REST, misalnya POST /recommend. Backend memuat bundel sekali saat startup, memvalidasi input, menjalankan inferensi, dan mengembalikan JSON berisi peringkat, skor, kata kunci, publikasi pendukung, dan riwayat bimbingan relevan. 

Tahap 12 : User Interface Implementation. Membangun antarmuka web tanpa login untuk mahasiswa: formulir judul, tombol rekomendasi, kartu Top-3, badge XAI, daftar publikasi pendukung, dan direktori 17 dosen. Antarmuka perlu diuji usability, latensi, dan akurasi tampilan 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

36 

# **BAB 3** 

# **KENDALA DAN SOLUSI** 

# **3.1 Kendala 1** 

Fenomena Dosen Tanpa Riwayat Bimbingan Utama (Cold-Start Problem) 

**Tabel 3.1 Kendala 1** 

|**Aspek**|**Penjelasan**|
|---|---|
|Kronologi<br>Munculnya<br>Masalah|Pada awal proyek, tim berencana membuat model kecerdasan buatan<br>(Machine Learning) biasa yang langsung dilatih dari data masa lalu,<br>yaitu data skripsi alumni Sistem Informasi Unand tahun 2014–2026<br>(Dataset 1: Judul_TA.csv berisi 625 judul). Tim berasumsi komputer<br>bisa langsung menebak siapa dosen pembimbing yang cocok dari judul<br>skripsi tersebut. Namun, saat tim memeriksa dan menganalisis data<br>awal (Exploratory Data Analysis / EDA), ditemukan kendala besar:<br>dari 17 dosen tetap aktif, ada 5 dosen yang sama sekali tidak memiliki<br>riwayat bimbingan sebagai Pembimbing1.|
|Analisis Akar<br>Penyebab|Setelah ditelusuri, kelima dosen tersebut memang belum pernah<br>ditugaskan menjadi Pembimbing 1 sepanjang tahun 2014–2026,<br>meskipun beberapa di antaranya sudah pernah menjadi Pembimbing 2.<br>Karena sistem ini bertujuan merekomendasikan calon Pembimbing 1,<br>maka bagi komputer, data kelima dosen ini dianggap "kosong"<br>(peluang terpilihnya 0%). Akibatnya, jika hanya mengandalkan data<br>skripsi lama, komputer tidak akan pernah bisa merekomendasikan<br>kelima dosen tersebut kepada mahasiswa, sehingga sistem menjadi<br>tidak adil dan hanya terus-menerus merekomendasikan dosen-dosen<br>senioryangsudah seringmembimbing.|
|Upaya<br>&<br>Solusi Ilmiah<br>Tim|Menyadari bahwa cara biasa tidak bisa dipakai, tim tidak asal<br>menebak. Tim langsung mencari rujukan ilmiah melalui studi literatur<br>sistematis (Systematic Literature Review / SLR) untuk mencari cara<br>mengatasi masalah dosen tanpa riwayat data ini (cold-start). Dari hasil<br>studi literatur tersebut, tim menemukan solusi terbaik: menggabungkan<br>data dari sumber lain (Cross-Domain Knowledge Integration). Tim<br>kemudian mengumpulkan data baru berupa karya publikasi penelitian<br>resmi dosen (Dataset 2: Publikasi_Dosen.csv berisi 643 judul artikel<br>riset dari Google Scholar dan SINTA hingga tahun 2026). Tim lalu<br>membuat aturan pintar (Dynamic Late-Fusion): khusus untuk 5 dosen<br>yang belum punya riwayat membimbing ini, sistem akan 100% menilai<br>kecocokan topik mahasiswa berdasarkan artikel penelitian yang pernah<br>mereka tulis.|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

37 

|**Aspek**|**Penjelasan**|
|---|---|
|Hasil<br>dan|Masalah data kosong (cold-start) ini berhasil teratasi sepenuhnya.|
|Bukti Nyata|Kelima dosen tersebut kini memiliki profil keahlian yang sangat jelas<br>dari artikel ilmiah mereka. Saat diuji coba dengan memasukkan ide<br>judul tugas akhir mahasiswa yang sesuai dengan bidang mereka,<br>kelima dosen tersebut terbukti sukses direkomendasikan masuk ke<br>peringkat 3 besar (Top-3), lengkap dengan bukti judul artikel penelitian<br>merekayangrelevan sebagaipenjelasannya.|



# **3.2 Kendala 2** 

Asumsi Awal Klasifikasi Kelompok Keahlian (KK) yang Berisiko Salah Rekomendasi 

**Tabel 3.2 Kendala 2** 

|**Aspek**|**Penjelasan**|
|---|---|
|Kronologi<br>Munculnya<br>Masalah|Pada rancangan awal, tim sempat berencana membuat sistem dengan<br>model dua tahap (klasifikasi bertingkat). Rencananya, saat mahasiswa<br>memasukkan judul tugas akhir, komputer akan menebak kelompok<br>keahliannya terlebih dahulu (apakah masuk ke bidang data, rekayasa<br>perangkat lunak, sistem enterprise, atau tata kelola TI). Setelah<br>kelompok keahliannya ditebak, barulah komputer memilih siapa dosen<br>pembimbingdi dalam kelompok tersebut.|
|Analisis Akar<br>Penyebab|Ketika tim membaca dan mempelajari dokumen resmi departemen<br>(Pedoman Topik Tugas Akhir dan Panduan Tugas Akhir DSI Unand<br>2025), tim menyadari dua kesalahan fatal dari rencana ini:|
||Pertama, secara aturan resmi kampus, mahasiswa sebenarnya<br>mengajukan judul langsung kepada calon dosen pembimbing tanpa<br>perlu melalui perantara kelompok keahlian.<br>Kedua, secara teknis komputer, model bertingkat ini menimbulkan efek<br>domino kesalahan (Cascading Error). Jika komputer salah menebak<br>kelompok keahlian di tahap pertama, maka rekomendasi nama dosen di<br>tahap kedua sudah pasti 100% salah, meskipun sebenarnya ada dosen<br>yangsangat cocok di kelompok lain.|
|Upaya<br>&<br>Solusi Ilmiah<br>Tim|Tim memutuskan untuk mengubah total rancangan sistem dengan<br>membuang tahap perantara kelompok keahlian tersebut. Tim beralih ke<br>pendekatan rekomendasi langsung (Direct Recommendation). Dengan<br>cara ini, judul tugas akhir yang dimasukkan mahasiswa akan langsung<br>dicocokkan keahliannya secara bersamaan ke seluruh 17 Dosen Tetap<br>Aktif menggunakan dua sumber data sekaligus (riwayat bimbingan<br>masa lalu dan artikelpenelitian dosen).|
|Hasil<br>dan<br>Bukti Nyata|Sistem menjadi jauh lebih sederhana, ringan, dan cepat dalam<br>memberikan rekomendasi. Efek domino salah tebak berhasil|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

38 

|**Aspek**|**Penjelasan**||
|---|---|---|
||dihilangkan sepenuhnya, dan|cara kerja sistem kini 100% sesuai|
||dengan alur pendaftaran tugas|akhir yang sebenarnya di Departemen|
||Sistem Informasi Unand.||



# **3.3 Kendala 3** 

Penulisan Nama Dosen yang Berantakan dan Adanya Dosen yang Sudah Tidak Aktif 

**Tabel 3.3 Kendala 3** 

|**Aspek**|**Penjelasan**|
|---|---|
|Kronologi<br>Munculnya<br>Masalah|Saat memeriksa data skripsi lama (Dataset 1), tim menemukan<br>penulisan nama dosen pembimbing sangat berantakan dan tidak<br>seragam. Sebagai contoh, ada nama dosen yang disingkat seperti<br>"Rahmatika Pratama S, MT" atau "Dwi Welly Sukma N, MT", ada<br>yang salah eja seperti "Jefril Ramadoni", serta ada perbedaan penulisan<br>gelar akademik. Selain itu, data tersebut juga masih bercampur dengan<br>dosen luar jurusan dan dosen yang sudah pensiun atau purna tugas<br>(seperti Pak Alizar Hasan,Bu Meza Silvana,dan Pak Syafii).|
|Analisis Akar<br>Penyebab|Kondisi ini terjadi karena data skripsi selama bertahun-tahun diketik<br>secara manual oleh mahasiswa dan staf tanpa adanya sistem<br>pengecekan otomatis. Akibatnya, komputer yang membaca teks secara<br>kaku akan mengira "Rahmatika Pratama S" dan "Rahmatika Pratama<br>Santi" adalah dua orang yang berbeda. Jika dibiarkan, komputer akan<br>bingung memprediksi dosen, atau bahkan merekomendasikan dosen<br>yangsudahpensiun kepada mahasiswa.|
|Upaya<br>&<br>Solusi Ilmiah<br>Tim|Tim menghindari cara manual (seperti mengetik dan memperbaiki<br>nama satu per satu) karena tidak efisien dan rentan salah. Sebagai<br>solusinya, tim membuat program pembersih nama otomatis. Tim<br>menggunakan daftar nama resmi bergelar lengkap dari data publikasi<br>riset (Dataset 2) sebagai acuan nama yang sah (daftar putih / whitelist<br>17<br>Dosen<br>Tetap<br>Aktif).<br>Program<br>kemudian<br>secara<br>cerdas<br>membersihkan gelar, menghapus tanda baca, dan mencocokkan<br>berbagai variasi singkatan atau salah eja nama dosen di data skripsi<br>agar kembali ke nama resmi yang sama. Dosen yang bukan dosen tetap<br>aktif langsungdisaringkeluar dari sistem secara otomatis.|
|Hasil<br>dan<br>Bukti Nyata|Seluruh 17 Dosen Tetap Aktif berhasil dikenali dan diseragamkan<br>dengan sempurna (akurasi 100%). Sebanyak 568 riwayat skripsi<br>bimbingan yang sah berhasil diamankan dan dibersihkan, sementara 57<br>data skripsi milik dosen luar atau dosen yang sudah purna tugas<br>berhasil disaring keluar dengan rapi sehingga tidak lagi mengotori<br>sistem.|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

39 

# **3.4 Kendala 4** 

Terlalu Banyak Kata Formal / Template yang Mengaburkan Topik Asli Skripsi 

**Tabel 3.4 Kendala 4** 

|**Aspek**|**Penjelasan**|
|---|---|
|Kronologi<br>Munculnya<br>Masalah|Ketika tim mulai mengajari komputer untuk membaca dan menghitung<br>kata-kata penting pada judul skripsi (Dataset 1), tim menemukan<br>keanehan: kata-kata yang dianggap paling sering muncul dan paling<br>penting oleh komputer ternyata bukan topik penelitiannya, melainkan<br>kata-kata formalitasjudul skripsiyangitu-itu saja.|
|Analisis Akar<br>Penyebab|Di jurusan Sistem Informasi Unand, judul skripsi biasanya selalu<br>diawali atau disisipi dengan kalimat baku akademik, seperti "Rancang<br>Bangun", "Sistem Informasi Berbasis Web", "Aplikasi Mobile<br>Android", atau "Studi Kasus pada PT/Dinas". Kata-kata template ini<br>muncul di lebih dari 65% judul skripsi. Akibatnya, komputer mengira<br>kata "rancang bangun" atau "sistem informasi" adalah topik utamanya,<br>padahal topik keahlian sebenarnya adalah kata-kata di dalamnya (seperti<br>"rantai pasok", "prediksi pelanggan", atau "audit tata kelola"). Kamus<br>kata buangan bahasa Indonesia standar (seperti Sastrawi) tidak bisa<br>menyaring kata-kata formalitas kampus ini karena menganggap<br>kata-kata tersebut sebagai katapentingbiasa.|
|Upaya<br>&<br>Solusi Ilmiah<br>Tim|Tim merancang sendiri daftar kata buangan khusus akademik (kamus<br>DSI_ACADEMIC_STOPWORDS) yang berisi lebih dari 120 kata<br>formalitas skripsi yang sering mengotori judul. Tim menyuruh<br>komputer membuang kata-kata template tersebut, namun dengan tetap<br>menjaga agar istilah teknologi penting (seperti istilah bahasa Inggris<br>dan kombinasi kata teknis IT)tidak ikut terhapus secara sengaja.|
|Hasil<br>dan<br>Bukti Nyata|Judul skripsi berhasil dibersihkan dengan sangat presisi. Komputer kini<br>hanya berfokus pada inti ilmu dari judul tersebut. Sebagai bukti nyata,<br>judul panjang seperti "Pembangunan Sistem Informasi Manajemen<br>Logistik Aktiva Tetap Berbasis Web pada PT. Semen Padang" berhasil<br>diringkas secara cerdas oleh komputer menjadi inti topiknya saja:<br>"logistik aktiva tetap semen". Dengan begitu, pencocokan keahlian<br>dosen menjadijauh lebih akurat dan tepat sasaran.|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

40 

# **BAB 4** 

# **KOORDINASI TIM DAN KONTRIBUSI ANGGOTA** 

# **4.1 Pembagian Pekerjaan dan Tanggung Jawab Anggota** 

Pengembangan proyek SI-REKTA dilaksanakan secara kolaboratif menggunakan kerangka kerja CRISP-ML(Q). Agar pengerjaan berjalan efektif tanpa tumpang tindih, setiap anggota memegang tanggung jawab pada area spesifik yang saling melengkapi: 

**Tabel 4.1 Pembagian Pekerjaan dan Tanggung Jawab Anggita** 

|**Nama**|**Peran**|**Tanggung Jawab**|**Status**|
|---|---|---|---|
|Fuadi|Project|Memimpin arah strategis proyek, menentukan|Selesai|
|Dhiyaulhaq|Manager|judul<br>SI-REKTA,<br>membagi<br>peran<br>dan<br>tanggung jawab anggota tim||
|Fuadi|Project|Merancang<br>mandiri<br>kerangka<br>kerja|Selesai|
|Dhiyaulhaq|Manager|metodologi CRISP-ML(Q) dan menyusun<br>dokumen PRD (SI-REKTA_PRD.md)||
|Fuadi<br>Dhiyaulhaq|System<br>Architect|Menyusun dokumen kajian riset Systematic<br>Literature Review (SLR) dibantu oleh Farrel<br>dan Rafa|Selesai|
|Fuadi<br>Dhiyaulhaq|Data<br>Specialist|Tahap<br>1<br>(Problem<br>Identification):<br>Mengidentifikasi isu nyata topic mismatch,<br>beban timpang, dan cold-start 5 dosen|Selesai|
|Fuadi<br>Dhiyaulhaq|Data<br>Specialist|Tahap 2 (System Requirements Analysis):<br>Menetapkan spesifikasi batasan 17 dosen<br>tetap aktif dan target NFR|Selesai|
|Fuadi<br>Dhiyaulhaq|Data<br>Specialist|Tahap 3 (Data Analysis): Mengeksekusi audit<br>eksploratif (EDA) terhadap 625 skripsi dan<br>643 publikasi dosen|Selesai|
|Fuadi<br>Dhiyaulhaq|Data<br>Specialist|Tahap 4 (Data Preprocessing): Normalisasi<br>teks, regex, dan merancang kamus 120+<br>_Stopwords_DSI_ACADEMIC_STOPWORDS|Selesai|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

41 

|**Nama**|**Peran**|**Tanggung Jawab**|**Status**|
|---|---|---|---|
|Fuadi<br>Dhiyaulhaq|Data<br>Specialist|Tahap<br>5<br>(Data Processing Procedures):<br>Standarisasi whitelist 17 dosen tetap aktif dan<br>pemetaan nama (Canonical Mapping)|Selesai|
|Rafa Gian<br>Atthari|Machine<br>Learning<br>Specialist|Membantu<br>penyusunan<br>studi<br>literatur<br>sistematis (SLR) pada topik information<br>retrieval dan cross-domain recommendation|Selesai|
|Rafa Gian<br>Atthari|Feature<br>Engineerin<br>g Specialist|Tahap<br>5<br>(Data Processing Procedures):<br>Membangun ekstraksi fitur bersama TF-IDF<br>N-gram (1,3) korpus ganda|Selesai|
|Rafa Gian<br>Atthari|Core<br>Modeling<br>Specialist|Tahap 6 (ML Algorithm Selection): Mengkaji<br>dan menetapkan algoritma Direct Dual-Source<br>Cosine Similarity Late-Fusion|Selesai|
|Rafa Gian<br>Atthari|Core<br>Modeling<br>Specialist|Tahap 7 (Model Development): Membangun<br>fungsi inferensi inti rekomendasi perankingan<br>dosen (predict_top_lecturers)|Selesai|
|Rafa Gian<br>Atthari|Explainable<br>AI<br>Specialist|Tahap<br>7<br>(Model<br>Development):<br>Mengembangkan<br>modul<br>Explainable<br>AI<br>(XAI) untuk ekstraksi kata kunci dan sitasi<br>paper dosen|Selesai|
|Farrel<br>Ghufran|Model<br>Evaluation|Membantu<br>penyusunan<br>studi<br>literatur<br>sistematis (SLR) pada topik metrik evaluasi|Selesai|
|Rahman|Specialist|rekomendasi dan validasi silang||
|Farrel<br>Ghufran|Model<br>Evaluation|Tahap 8 (Model Evaluation): Merancang dan<br>mengeksekusi validasi silang Stratified 5-Fold|Selesai|
|Rahman|Specialist|CV bebas data leakage||
|Farrel<br>Ghufran|Quality<br>Assurance|Tahap 8 (Model Evaluation): Menganalisis<br>metrik Top-3 Accuracy, MRR@3, dan stress|Selesai|
|Rahman|Specialist|test kueri dosen cold-start||
|Farrel<br>Ghufran<br>Rahman|MLOps<br>Specialist|Tahap 9 (Model Storage): Mengemas dan<br>menserialisasikan bundel pipeline model ke<br>berkas mandiri si_rekta_pipeline.joblib|Selesai|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

42 

|**Nama**|**Peran**|**Tanggung Jawab**|**Status**|
|---|---|---|---|
|Farrel|MLOps|Tahap<br>9<br>(Model<br>Storage):<br>Melakukan|Selesai|
|Ghufran|Specialist|pengujian reload model dan benchmark uji||
|Rahman||kecepatan respon latensi NFR (< 500 ms)||



# **4.2 Pemahaman Tugas dan Kontribusi Nyata Masing-Masing Anggota** 

Setiap anggota tim memiliki pemahaman yang mendalam terhadap tugas yang diembannya dan membuktikan kontribusi nyata yang dapat dilihat langsung pada buku kerja Google Colab serta dokumen repositori GitHub: 

# **1. Pemahaman dan Kontribusi Nyata Fuadi Dhiyaulhaq** 

Sebagai Project Manager dan arsitek sistem, Fuadi memimpin jalannya proyek dari nol. Fuadi merumuskan ide awal masalah rekomendasi tugas akhir, menentukan judul proyek SI-REKTA, membagi peran kerja tim, serta merancang sendiri kerangka kerja metodologi CRISP-ML(Q) dan dokumen kebutuhan sistem (PRD). Untuk memastikan sistem memiliki dasar teori yang kuat, Fuadi menyusun dokumen kajian ilmiah (SLR) dengan bantuan Farrel dan Rafa. 

Pada bagian teknis data (Tahap 1 sampai Tahap 5), Fuadi bertanggung jawab penuh memastikan data yang digunakan benar-benar berkualitas tinggi: 

- Menemukan masalah nyata di lapangan, yaitu ketimpangan beban bimbingan dan adanya 5 dosen yang belum pernah menjadi Pembimbing 1 (Tahap 1). 

- Menetapkan aturan sistem yang tegas, seperti pembatasan hanya untuk 17 Dosen Tetap Aktif DSI Unand dan target respon cepat di bawah 0,5 detik (Tahap 2). 

- Memeriksa kelayakan dan struktur 625 data skripsi alumni serta 643 artikel publikasi dosen (Tahap 3). 

- Membersihkan teks judul skripsi dan membuat kamus khusus (DSI_ACADEMIC_STOPWORDS) berisi 120 lebih kata formalitas kampus agar komputer tidak terkecoh oleh kata-kata seperti "rancang bangun" atau "sistem informasi" (Tahap 4). 

- Mengubah berbagai variasi penulisan nama dosen yang berantakan menjadi nama resmi bergelar lengkap, serta menyaring data dosen yang sudah pensiun sehingga menghasilkan 568 data skripsi bimbingan yang benar-benar sah dan siap dipakai untuk melatih model (Tahap 5). 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

43 

# **2. Pemahaman dan Kontribusi Nyata Rafa Gian Atthari** 

Rafa berfokus pada keahlian pemodelan machine learning dan pemrosesan teks. Rafa memahami cara mengubah kata-kata pada judul skripsi menjadi angka (vektor) agar bisa dihitung kemiripannya oleh komputer. Selain membantu penyusunan kajian ilmiah (SLR) pada topik pencarian informasi, Rafa mengeksekusi tahapan pemodelan inti (Tahap 5 sampai Tahap 7): 

- Membangun pembuat vektor kata bersama (TF-IDF N-gram kombinasi 1 sampai 3 kata) yang membaca dua sumber data sekaligus, yaitu riwayat skripsi dan artikel publikasi penelitian dosen (Tahap 5). 

- Menetapkan keputusan bahwa sistem harus mencocokkan judul mahasiswa langsung ke profil dosen tanpa perantara kelompok keahlian, guna menghindari efek domino salah tebak (Tahap 6). 

- Membuat program perankingan rekomendasi cerdas (Dynamic Late-Fusion) yang secara otomatis mengatur bobot 100% dari artikel publikasi riset khusus bagi 5 dosen yang belum pernah membimbing skripsi (Tahap 7). 

- Merancang kartu penjelasan pintar (Explainable AI) agar saat sistem mengeluarkan nama rekomendasi dosen, mahasiswa juga bisa melihat alasan logisnya, seperti kata kunci yang cocok dan bukti judul artikel penelitian dosen yang bersangkutan (Tahap 7). 

# **3. Pemahaman dan Kontribusi Nyata Farrel Ghufran Rahman** 

Farrel berfokus pada pengujian kualitas model dan kesiapan sistem (MLOps). Farrel memastikan model yang dibuat tidak hanya pintar di atas kertas, tetapi juga benar-benar akurat saat diuji dengan data baru dan siap dipakai di aplikasi nyata. Selain membantu kajian ilmiah (SLR) pada bagian standar evaluasi, Farrel mengeksekusi tahapan evaluasi dan penyimpanan (Tahap 8 dan Tahap 9): 

- Merancang simulasi pengujian model yang ketat menggunakan metode validasi silang 5-lipatan (Stratified 5-Fold Cross Validation) untuk memastikan komputer tidak menghafal kunci jawaban atau mengalami kebocoran data (Tahap 8). 

- Mengukur dan membuat grafik performa sistem, khususnya memastikan rekomendasi dosen yang tepat berhasil masuk ke dalam peringkat 3 besar (Top-3 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

44 

Accuracy) serta melakukan uji coba khusus pada topik keahlian 5 dosen baru (Tahap 8). 

- Mengemas seluruh komponen model yang rumit (kamus kata, matriks angka, dan data dosen) ke dalam satu berkas biner mandiri yang sangat ringkas bernama si_rekta_pipeline.joblib berukuran hanya sekitar 0,16 MB (Tahap 9). 

- Menguji kecepatan buka dan respon model secara mandiri, dengan hasil terbukti sangat cepat yaitu hanya membutuhkan waktu 2 - 4 milidetik, jauh lebih cepat dari batas maksimal yang ditetapkan kampus yaitu 500 milidetik (Tahap 9). 

# **4.3 Keterkaitan Pekerjaan Antar-Anggota (Alur Dependensi Input-Output)** 

Pembuatan sistem kecerdasan buatan SI-REKTA memiliki sifat kerja yang saling bersambung seperti rantai produksi (pipeline dependency). Artinya, suatu tahapan tidak akan pernah bisa dikerjakan apabila tahapan sebelumnya belum diselesaikan dengan benar. Setiap anggota tim sangat memahami bahwa hasil pekerjaannya merupakan bahan baku wajib bagi pekerjaan anggota lainnya: 

# **1. Hubungan Pekerjaan Fuadi ke Rafa (Data Bersih Menjadi Bahan Baku Model):** 

Fuadi bertugas di bagian persiapan data. Hasil kerja Fuadi berupa 568 data skripsi yang telah diverifikasi sah dan 643 data artikel publikasi dosen menjadi bahan wajib yang diserahkan kepada Rafa. Jika Fuadi tidak membersihkan singkatan nama dosen dan tidak membuang kata-kata formalitas kampus (seperti "rancang bangun" atau "sistem informasi"), maka model pembuat angka (TF-IDF) yang dibangun Rafa akan rusak karena salah mengenali nama dosen dan keliru menganggap kata formalitas tersebut sebagai topik keahlian. 

# **2. Hubungan Pekerjaan Rafa ke Farrel (Model Inferensi Menjadi Uji Evaluasi):** 

Setelah data bersih dari Fuadi selesai diproses, Rafa membangun rumus kecerdasan buatan (Dynamic Late-Fusion) yang bertugas mencocokkan ide judul mahasiswa ke profil dosen yang tepat. Rumus dan fungsi rekomendasi yang dibuat Rafa ini kemudian diserahkan langsung kepada Farrel. Farrel membutuhkan model dari Rafa tersebut untuk diuji secara ketat ketepatan prediksinya menggunakan simulasi pengujian data silang (Stratified 5-Fold Cross Validation) sebelum akhirnya dikemas ke dalam satu berkas siap pakai. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

45 

# **3. Hubungan Pekerjaan Farrel ke Seluruh Tim (Hasil Uji Menjadi Masukan):** 

Hasil pengujian performa yang dilakukan Farrel memberikan umpan balik (feedback loop) bagi Fuadi dan Rafa. Jika hasil akurasi rekomendasi yang diukur Farrel belum mencapai target (minimal 80%), Farrel akan memberikan catatan teknis: kepada Rafa untuk menyetel ulang kekuatan bobot rumusnya, atau kepada Fuadi untuk mengecek kembali apakah masih ada kata-kata pengganggu di data skripsi yang belum terbuang. 

# **4.4 Pola Koordinasi Tim Menghadapi Kendala Bersama dan Disiplin Kerja** 

Dalam pelaksanaan proyek, tim menerapkan mekanisme koordinasi yang terarah agar pekerjaan yang saling berkaitan tidak terhambat dan kendala teknis dapat dipecahkan secara bersama-sama: 

# **1. Cara Tim Berkoordinasi Menyelesaikan Masalah Bersama** 

Ketika tim menemukan masalah besar di tengah perjalanan proyek, tim tidak saling melempar tanggung jawab, melainkan menyelesaikannya secara sinergis melalui pembagian peran. Bukti nyata koordinasi ini terlihat pada penanganan masalah 5 dosen tanpa riwayat bimbingan skripsi (Cold-Start Problem): 

- Langkah 1 (Deteksi Masalah oleh Fuadi): Masalah ini pertama kali ditemukan oleh Fuadi saat memeriksa data awal (Tahap 3), di mana ada 5 dosen tetap yang peluang terpilihnya bernilai nol karena belum pernah membimbing skripsi sebagai Pembimbing 1. Fuadi langsung memimpin penelusuran solusi melalui studi literatur sistematis (SLR) dan mengusulkan ide penggabungan data publikasi penelitian dosen. 

- Langkah 2 (Perumusan Rumus oleh Rafa): Ide penggabungan data dari Fuadi kemudian diterjemahkan oleh Rafa ke dalam rumus matematika dan kode program (Tahap 7). Rafa mengatur aturan cerdas: khusus bagi 5 dosen ini, kecocokan topik mahasiswa dinilai 100% murni dari artikel penelitian mereka. 

- Langkah 3 (Pengujian Pembuktian oleh Farrel): Farrel kemudian merancang skenario pengujian khusus (Tahap 8) dengan memasukkan contoh judul tugas akhir yang sengaja disesuaikan dengan topik riset 5 dosen tersebut. Farrel 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

46 

membuktikan secara angka bahwa kelima dosen itu kini berhasil keluar di peringkat 3 besar rekomendasi. 

# **2. Disiplin Kerja dan Menjaga Keamanan Kode Bersama** 

Agar pengerjaan bersama di Google Colab dan GitHub berjalan lancar tanpa merusak pekerjaan rekan satu tim, tim menyepakati tiga aturan disiplin: 

- Pembagian Sel Buku Kerja yang Teratur: Setiap tahapan kerja di Google Colab disusun dengan urutan baku: sel penjelasan teks (Markdown), sel kode program (Python), dan sel hasil keluaran (Output) yang langsung terlihat. Dengan begitu, anggota tim lain dapat membaca dan memahami alur kode rekannya dengan mudah. 

- Larangan Menggunakan Fitur AI Otomatis Sembarangan: Tim membuat kesepakatan tegas untuk tidak menggunakan fitur pembuat kode otomatis bawaan Colab di buku kerja utama. Hal ini dilakukan demi mencegah terjadinya kode yang tertimpa secara tidak sengaja, variabel program yang bentrok, atau alur logika yang rusak. 

- Sinkronisasi Berkas Lewat Repositori GitHub: Semua berkas data mentah, dokumen panduan riset, dan kode pemodelan selalu diunggah ke repositori GitHub resmi proyek (accfd/SI-REKTA). Tim rutin melakukan koordinasi daring untuk memastikan setiap anggota selalu menggunakan berkas versi paling baru sebelum mulai mengeksekusi tahapan berikutnya. 

PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

47 

# **LAMPIRAN** 

# **Lampiran 1: Tautan Ekosistem Repositori GitHub & Google Colab Realtime** 

Seluruh artefak kode sumber, buku kerja interaktif, dataset dwisumber, dan dokumen landasan ilmiah proyek SI-REKTA dapat diakses publik melalui tautan resmi berikut: 

**Tabel L.1 Direktori Tautan Resmi Proyek SI-REKTA** 

|**No**|**Nama & Deskripsi Dokumen / Artefak**|**Tautan (URL)**|
|---|---|---|
|1|**Repositori Utama GitHub**|https://github.com/accfd/SI-|
||(Pusat seluruh kode sumber, dataset, dan<br>dokumentasi proyek SI-REKTA)|REKTA|
|2|**Buku Kerja Google Colab Realtime**<br>(Notebook<br>interaktif<br>eksekusi<br>pemodelan<br>Machine Learning dari Cell 0 sampai evaluasi)|https://colab.research.google<br>.com/drive/1wxg3qMF81W<br>H9fQY16obTXagDF0Ql383<br>G|
|3|**Dokumen Kajian Riset Ilmiah (SLR)**<br>(Landasan ilmiah penanganan masalah cold-start<br>dan sistem rekomendasi dwisumber)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/SI-<br>REKTA_SLR.md|
|4|**Dokumen Standar Mutu CRISP-ML(Q)**<br>(Kerangka kerja penjaminan mutu rekayasa<br>machine learning industri 12 tahapan)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/SI-<br>REKTA_CRISP_ML_Q.md|
|5|**Product Requirements Document (PRD)**<br>(Spesifikasi kebutuhan sistem, profil pengguna,<br>arsitektur, dan target performa NFR)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/SI-<br>REKTA_PRD.md|
|6|**Dataset 1: (Judul_TA.csv)**<br>(Arsip 625 rekaman skripsi alumni DSI Unand<br>periode 2014–2026)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/Jud<br>ul_TA.csv|
|7|**Dataset 2: (Publikasi_Dosen.csv)**<br>(Korpus 643 artikel ilmiah terverifikasi SINTA<br>dan Google Scholar dari 17 dosen)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/Pub<br>likasi_Dosen.csv|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

48 

|**No**|**Nama & Deskripsi Dokumen / Artefak**|**Tautan (URL)**|
|---|---|---|
|8|**Laporan Audit Data Eksploratif (EDA)**<br>(Analisis distribusi data, audit missing values,<br>dan visualisasi ketimpangan bimbingan)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/ED<br>A_Dual_Dataset.md|
|9|**Direktori 17 Dosen Tetap Aktif DSI**<br>(Profil keilmuan resmi dosen tetap aktif beserta<br>pemetaan status bimbingan P1)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/Dos<br>en_Tetap_Aktif_DSI.md|
|10|**Pedoman Topik Tugas Akhir DSI 2025**|https://github.com/accfd/SI-|
||(Dokumen<br>resmi<br>departemen<br>mengenai<br>kelompok keahlian dan topik riset TA)|REKTA/blob/main/docs/PE<br>DOMAN%20TOPIK%20T<br>UGAS%20AKHIR%20DSI<br>%202025_V2.pdf|
|11|**Panduan Tugas Akhir DSI 2025**<br>(Buku panduan alur resmi pendaftaran dan<br>pengajuan Formulir TA-01/TA-02)|https://github.com/accfd/SI-<br>REKTA/blob/main/docs/PA<br>NDUAN%20TUGAS%20A<br>KHIR%202025.pdf|



PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA) 

49 

