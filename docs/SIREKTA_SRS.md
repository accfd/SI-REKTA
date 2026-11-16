# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

## SI-REKTA

### Sistem Rekomendasi Dosen Pembimbing Tugas Akhir

**Versi Dokumen:** 4.4  
**Jenis Sistem:** Aplikasi Berbasis Web  
**Aktor Utama:** Mahasiswa  
**Status:** Rancangan Kebutuhan Sistem

## 1. PENDAHULUAN

### 1.1 Tujuan Dokumen

Dokumen Software Requirements Specification (SRS) ini disusun untuk menjelaskan kebutuhan fungsional dan nonfungsional dari SI-REKTA (Sistem Rekomendasi Dosen Pembimbing Tugas Akhir). Dokumen ini menjadi acuan dalam proses perancangan, pengembangan, implementasi, dan pengujian sistem.

SI-REKTA merupakan sistem berbasis web yang dirancang untuk membantu mahasiswa memperoleh rekomendasi dosen pembimbing tugas akhir berdasarkan kesesuaian topik atau judul tugas akhir yang diajukan dengan riwayat judul tugas akhir dan publikasi dosen.

Selain menyediakan rekomendasi dosen, sistem juga memungkinkan mahasiswa melihat kembali riwayat pencarian yang pernah dilakukan beserta hasil rekomendasi sebelumnya. Sistem juga menyediakan akses bagi mahasiswa untuk melihat dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF.

### 1.2 Latar Belakang

Dalam proses penentuan dosen pembimbing tugas akhir, mahasiswa perlu mempertimbangkan kesesuaian bidang keahlian dan pengalaman akademik dosen dengan topik penelitian yang akan dilakukan. Namun, mahasiswa terkadang mengalami kesulitan dalam memperoleh informasi yang dapat membantu mengidentifikasi dosen yang memiliki keterkaitan dengan topik tugas akhirnya.

SI-REKTA dikembangkan sebagai solusi berbasis sistem rekomendasi yang memanfaatkan data judul tugas akhir terdahulu dan publikasi dosen. Sistem menggunakan metode Term Frequency-Inverse Document Frequency (TF-IDF) dan Cosine Similarity untuk mengukur kemiripan teks antara judul yang dimasukkan mahasiswa dengan dokumen referensi yang telah disiapkan.

Berdasarkan hasil perhitungan tersebut, sistem menghasilkan rekomendasi maksimal tiga dosen yang memiliki tingkat relevansi tertinggi. Setiap rekomendasi dilengkapi dengan informasi dosen dan nomor peringkat sebagai bahan pertimbangan mahasiswa.

Sistem juga menyediakan fitur History yang memungkinkan mahasiswa menyimpan dan melihat kembali pencarian sebelumnya. Dengan demikian, mahasiswa dapat membandingkan hasil rekomendasi dari beberapa alternatif judul tugas akhir tanpa harus melakukan pencarian ulang.

Selain itu, sistem menyediakan dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF yang dapat diakses mahasiswa langsung melalui sistem. Dengan demikian, mahasiswa dapat memahami ketentuan dan topik tugas akhir sebelum menentukan judul maupun dosen pembimbing.

### 1.3 Ruang Lingkup Sistem

SI-REKTA memiliki ruang lingkup sebagai berikut:

1.  Sistem berbasis web dan ditujukan untuk mahasiswa.

2.  Mahasiswa dapat memasukkan judul atau rencana judul tugas akhir.

3.  Sistem melakukan validasi dan preprocessing terhadap input judul.

4.  Sistem memproses input menggunakan model rekomendasi berbasis TF-IDF dan Cosine Similarity.

5.  Sistem menampilkan maksimal tiga rekomendasi dosen berdasarkan hasil perankingan.

6.  Setiap rekomendasi dosen ditampilkan dengan nomor peringkat (ranking).

7.  Mahasiswa dapat melakukan pencarian kembali dengan judul yang berbeda.

8.  Sistem menyimpan riwayat pencarian mahasiswa beserta hasil rekomendasi yang diperoleh.

9.  Mahasiswa dapat melihat daftar riwayat pencarian dan membuka kembali detail hasil rekomendasi sebelumnya.

10. Mahasiswa dapat menghapus satu atau seluruh riwayat pencarian.

11. Sistem menyediakan dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF.

12. Mahasiswa dapat melihat kedua dokumen pedoman tersebut melalui sistem.

Sistem tidak mencakup pengelolaan dataset melalui dashboard admin. Seluruh data referensi dan artefak model telah disiapkan sebelum aplikasi digunakan. Demikian pula, dokumen pedoman berupa file PDF telah disiapkan sebelum aplikasi digunakan dan tidak dikelola melalui aplikasi. Judul tugas akhir terdahulu dan publikasi dosen hanya dimanfaatkan sebagai dokumen referensi pada proses perhitungan kemiripan dan tidak ditampilkan kepada mahasiswa.

### 1.4 Tujuan Sistem

Tujuan pengembangan SI-REKTA adalah:

1.  Membantu mahasiswa menemukan dosen yang memiliki keterkaitan dengan topik tugas akhir.

2.  Memberikan rekomendasi dosen berdasarkan analisis kemiripan teks.

3.  Menyediakan informasi dosen beserta nomor peringkat sebagai bahan pertimbangan mahasiswa.

4.  Mempermudah mahasiswa dalam memperoleh gambaran mengenai kesesuaian topik penelitian dengan bidang akademik dosen.

5.  Memungkinkan mahasiswa melihat dan membandingkan hasil pencarian sebelumnya.

6.  Menyediakan akses bagi mahasiswa terhadap dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI.

7.  Mengimplementasikan metode text mining dalam sistem rekomendasi akademik.

## 2. DESKRIPSI UMUM SISTEM

### 2.1 Perspektif Produk

SI-REKTA merupakan aplikasi berbasis web yang menggunakan model machine learning yang telah dibangun sebelumnya. Aplikasi berperan sebagai antarmuka bagi mahasiswa untuk memasukkan judul tugas akhir dan memperoleh hasil rekomendasi.

Sistem memanfaatkan artefak model yang telah disiapkan melalui proses pengembangan model menggunakan Python dan Scikit-learn. Artefak tersebut dimuat oleh layanan rekomendasi ketika aplikasi dijalankan.

Proses pembangunan atau pembaruan artefak tidak dilakukan setiap kali mahasiswa melakukan pencarian. Dengan demikian, sistem menggunakan model dan dataset referensi yang telah ditetapkan pada saat deployment.

Selain fitur rekomendasi, SI-REKTA menyediakan fitur History untuk menyimpan hasil pencarian mahasiswa. Riwayat pencarian disimpan secara lokal menggunakan Local Storage pada browser sehingga tidak memerlukan akun atau autentikasi pengguna.

SI-REKTA juga menyediakan fitur Dokumen Pedoman yang menampilkan dua dokumen berformat PDF, yaitu Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI. Kedua dokumen disimpan sebagai file statis pada sisi server aplikasi dan dapat dilihat mahasiswa melalui browser tanpa memerlukan akun atau autentikasi pengguna.

### 2.2 Aktor Sistem

SI-REKTA hanya memiliki satu aktor utama, yaitu mahasiswa.

| **Aktor** | **Deskripsi**                                                                                                                                                                                                  |
|-----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mahasiswa | Pengguna yang memasukkan judul tugas akhir, memperoleh rekomendasi dosen beserta nomor peringkatnya, mengelola riwayat pencarian, serta melihat dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI. |

Tidak terdapat aktor admin dalam ruang lingkup aplikasi. Pengelolaan dan pembaruan dataset dilakukan di luar aplikasi sebagai bagian dari proses pengembangan dan pemeliharaan sistem. Hal yang sama berlaku untuk pengelolaan dan penggantian dokumen pedoman.

### 2.3 Karakteristik Pengguna

Pengguna sistem merupakan mahasiswa yang sedang merencanakan atau menyusun tugas akhir dan membutuhkan informasi mengenai dosen yang memiliki keterkaitan dengan topik penelitiannya.

Pengguna diharapkan mampu:

- Mengakses aplikasi melalui browser.

- Memasukkan judul atau rencana judul tugas akhir.

- Memahami informasi dosen dan hasil rekomendasi yang ditampilkan.

- Melihat riwayat pencarian sebelumnya.

- Mengelola riwayat pencarian yang tersimpan.

- Membuka dan membaca dokumen pedoman berformat PDF melalui browser.

### 2.4 Lingkungan Operasional

Sistem direncanakan berjalan pada lingkungan berikut:

- **Perangkat:** Laptop, komputer, atau perangkat lain yang mendukung browser.

- **Browser:** Google Chrome, Microsoft Edge, Mozilla Firefox, atau browser modern lainnya.

- **Sistem operasi:** Windows, Linux, macOS, Android, atau sistem operasi lain yang mendukung browser.

- **Koneksi:** Internet untuk mengakses aplikasi yang telah di-deploy.

- **Penyimpanan riwayat:** Local Storage pada browser yang digunakan mahasiswa.

- **Dokumen pedoman:** Browser atau perangkat mampu menampilkan berkas PDF, atau tersedia aplikasi pembaca PDF.

### 2.5 Asumsi dan Ketergantungan

Pengembangan SI-REKTA memiliki beberapa asumsi sebagai berikut:

1.  Dataset dosen, judul tugas akhir, dan publikasi telah tersedia sebelum aplikasi digunakan.

2.  Artefak model telah dibangun dan divalidasi sebelum proses deployment.

3.  Layanan rekomendasi dapat mengakses artefak model yang telah disimpan.

4.  Browser mahasiswa mendukung penggunaan Local Storage.

5.  Mahasiswa menggunakan browser yang sama apabila ingin mengakses riwayat pencarian sebelumnya.

6.  Informasi dosen dan dokumen referensi yang ditampilkan bergantung pada ketersediaan dataset.

7.  Dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF telah tersedia dan disiapkan sebelum aplikasi digunakan.

8.  Isi dan keabsahan kedua dokumen pedoman menjadi tanggung jawab pihak penyusun dokumen; sistem hanya menyajikan dokumen tersebut.

## 3. KEBUTUHAN FUNGSIONAL

Kebutuhan fungsional menjelaskan layanan dan fitur yang harus disediakan oleh SI-REKTA.

### 3.1 Fungsionalitas Mahasiswa

#### FR-01 – Mengakses Halaman Utama

Sistem harus menyediakan halaman utama yang menjelaskan fungsi SI-REKTA dan menyediakan akses menuju fitur pencarian rekomendasi, riwayat pencarian, serta dokumen pedoman.

#### FR-02 – Memasukkan Judul Tugas Akhir

Sistem harus menyediakan kolom input bagi mahasiswa untuk memasukkan judul atau rencana judul tugas akhir yang ingin dianalisis.

#### FR-03 – Validasi Input Judul

Sistem harus memvalidasi input sebelum proses rekomendasi dilakukan. Validasi mencakup:

- Input tidak boleh kosong.

- Input harus berupa teks.

- Input harus memenuhi ketentuan panjang minimum dan maksimum yang ditetapkan.

- Sistem menampilkan pesan kesalahan apabila input tidak memenuhi ketentuan.

#### FR-04 – Memproses Input Judul

Sistem harus memproses judul yang dimasukkan mahasiswa melalui tahapan preprocessing sesuai konfigurasi model yang telah dibangun.

#### FR-05 – Menghasilkan Rekomendasi Dosen

Sistem harus menghasilkan rekomendasi maksimal tiga dosen berdasarkan hasil perhitungan kemiripan dan metode perankingan yang digunakan.

#### FR-06 – Menampilkan Informasi Dosen

Sistem harus menampilkan informasi dosen yang direkomendasikan, seperti:

- Nama dosen.

- Informasi atau profil dosen yang tersedia.

- Nomor peringkat.

#### FR-07 – Menampilkan Hasil Pencarian

Sistem harus menampilkan hasil rekomendasi secara terstruktur sehingga mahasiswa dapat membandingkan dosen yang direkomendasikan beserta informasi dan nomor peringkatnya.

#### FR-08 – Mengulangi Pencarian

Sistem harus memungkinkan mahasiswa melakukan pencarian kembali dengan memasukkan judul tugas akhir yang berbeda tanpa harus memulai ulang aplikasi.

#### FR-09 – Menangani Hasil Rekomendasi yang Tidak Memadai

Sistem harus memberikan informasi kepada mahasiswa apabila:

- Tidak ditemukan dokumen yang cukup relevan.

- Tidak tersedia rekomendasi dosen yang memenuhi batas relevansi yang ditentukan.

Sistem tidak boleh menampilkan informasi dosen yang tidak terdapat dalam dataset.

#### FR-10 – Menangani Kesalahan Sistem

Sistem harus menampilkan pesan yang sesuai apabila terjadi kesalahan dalam proses rekomendasi, seperti layanan rekomendasi tidak tersedia atau artefak model gagal dimuat.

#### FR-11 – Menyimpan Riwayat Pencarian

Sistem harus menyimpan riwayat pencarian mahasiswa setiap kali proses rekomendasi berhasil dilakukan.

Informasi yang disimpan meliputi:

- Judul tugas akhir yang dimasukkan.

- Tanggal dan waktu pencarian.

- Hasil rekomendasi dosen.

- Nomor peringkat setiap dosen.

Riwayat disimpan pada Local Storage browser sehingga tidak memerlukan akun pengguna maupun autentikasi.

Sistem hanya menyimpan pencarian yang berhasil menghasilkan respons rekomendasi. Pencarian yang gagal atau input yang tidak valid tidak perlu disimpan sebagai riwayat rekomendasi.

#### FR-12 – Melihat Riwayat Pencarian

Sistem harus menyediakan halaman atau bagian khusus yang memungkinkan mahasiswa melihat daftar pencarian yang pernah dilakukan.

Informasi yang ditampilkan meliputi:

- Judul tugas akhir yang pernah dicari.

- Tanggal dan waktu pencarian.

- Ringkasan hasil rekomendasi.

- Akses untuk melihat detail hasil pencarian.

Riwayat ditampilkan berdasarkan urutan waktu, mulai dari pencarian terbaru.

#### FR-13 – Melihat Detail Riwayat Pencarian

Sistem harus memungkinkan mahasiswa membuka kembali hasil rekomendasi dari riwayat pencarian sebelumnya tanpa harus melakukan proses pencarian ulang.

Detail yang ditampilkan harus sesuai dengan hasil yang tersimpan ketika pencarian dilakukan, termasuk informasi dosen dan nomor peringkat yang tersedia pada saat itu.

#### FR-14 – Menghapus Riwayat Pencarian

Sistem harus menyediakan fitur bagi mahasiswa untuk menghapus riwayat pencarian.

Penghapusan dapat dilakukan terhadap:

- Satu riwayat pencarian tertentu.

- Seluruh riwayat pencarian yang tersimpan.

Sistem harus meminta konfirmasi sebelum menghapus seluruh riwayat pencarian.

#### FR-15 – Menangani Riwayat yang Kosong

Sistem harus menampilkan informasi apabila mahasiswa belum memiliki riwayat pencarian.

Sistem juga harus menampilkan kondisi yang sesuai apabila data riwayat tidak dapat dibaca dari penyimpanan lokal browser.

#### FR-16 – Mengakses Dokumen Pedoman

Sistem harus menyediakan menu atau halaman Dokumen Pedoman yang dapat diakses mahasiswa dari halaman utama maupun navigasi aplikasi. Halaman tersebut menampilkan daftar dokumen pedoman yang tersedia, yaitu:

- Pedoman Tugas Akhir.

- Pedoman Topik Tugas Akhir DSI.

Setiap dokumen ditampilkan dengan nama dokumen, keterangan singkat, dan akses untuk membuka dokumen tersebut. Akses ke dokumen bersifat hanya-baca; mahasiswa tidak dapat mengubah, mengunggah, atau menghapus dokumen melalui aplikasi.

#### FR-17 – Melihat Pedoman Tugas Akhir

Sistem harus memungkinkan mahasiswa membuka dan membaca dokumen Pedoman Tugas Akhir dalam format PDF melalui sistem, tanpa harus mencari dokumen tersebut di luar aplikasi. Dokumen dapat ditampilkan langsung pada browser atau pada penampil PDF di dalam aplikasi.

#### FR-18 – Melihat Pedoman Topik Tugas Akhir DSI

Sistem harus memungkinkan mahasiswa membuka dan membaca dokumen Pedoman Topik Tugas Akhir DSI dalam format PDF melalui sistem, tanpa harus mencari dokumen tersebut di luar aplikasi. Dokumen dapat ditampilkan langsung pada browser atau pada penampil PDF di dalam aplikasi.

#### FR-19 – Menangani Dokumen Pedoman yang Tidak Tersedia

Sistem harus menampilkan pesan yang sesuai apabila dokumen pedoman gagal dimuat atau tidak ditemukan, misalnya karena file tidak tersedia pada server atau browser tidak dapat menampilkan PDF. Kegagalan tersebut tidak boleh memengaruhi fungsi pencarian rekomendasi maupun riwayat pencarian.

## 4. KEBUTUHAN NONFUNGSIONAL

### 4.1 NFR-01 – Kinerja Sistem

Sistem harus mampu memproses input dan menampilkan hasil rekomendasi dalam waktu yang wajar. Waktu respons ditargetkan maksimal lima detik pada kondisi penggunaan dan infrastruktur normal, dengan tetap mempertimbangkan ukuran dataset dan kapasitas server.

### 4.2 NFR-02 – Kemudahan Penggunaan

Antarmuka sistem harus mudah dipahami dan digunakan oleh mahasiswa. Informasi hasil rekomendasi dan riwayat pencarian harus disajikan secara terstruktur dan tidak membingungkan.

### 4.3 NFR-03 – Kompatibilitas

Sistem harus dapat diakses melalui browser modern dan mendukung tampilan responsif pada perangkat desktop maupun mobile.

### 4.4 NFR-04 – Keandalan

Sistem harus mampu menjalankan proses rekomendasi menggunakan artefak model yang telah disiapkan. Apabila terjadi kegagalan, sistem harus memberikan pesan kesalahan tanpa menampilkan hasil yang tidak valid.

### 4.5 NFR-05 – Keamanan

Sistem harus melakukan validasi terhadap input pengguna dan menerapkan mekanisme keamanan pada komunikasi antara frontend, backend, dan layanan rekomendasi.

Data yang disimpan pada Local Storage tidak boleh berisi informasi sensitif yang tidak diperlukan untuk fungsi riwayat.

### 4.6 NFR-06 – Pemeliharaan

Struktur kode harus dibuat modular agar proses pemeliharaan dan pengembangan fitur dapat dilakukan tanpa harus mengubah keseluruhan sistem.

### 4.7 NFR-07 – Konsistensi Model

Sistem harus menggunakan versi artefak model yang telah ditetapkan pada saat deployment. Proses pencarian mahasiswa tidak boleh mengubah vocabulary, nilai IDF, maupun parameter model yang sedang digunakan.

### 4.8 NFR-08 – Ketersediaan

Sistem harus dapat diakses selama layanan aplikasi dan layanan rekomendasi berjalan dengan baik.

### 4.9 NFR-09 – Integritas Informasi

Informasi dosen yang ditampilkan harus sesuai dengan dataset referensi yang digunakan oleh sistem. Dokumen pedoman yang ditampilkan harus sesuai dengan berkas PDF yang telah ditetapkan pada saat deployment.

Data hasil rekomendasi yang tersimpan pada riwayat harus mempertahankan informasi sesuai hasil pencarian ketika riwayat dibuat.

### 4.10 NFR-10 – Skalabilitas

Arsitektur sistem harus memungkinkan peningkatan kapasitas layanan apabila jumlah pengguna atau ukuran dataset bertambah pada pengembangan berikutnya.

### 4.11 NFR-11 – Penyimpanan Riwayat

Sistem harus menyimpan riwayat pencarian secara lokal menggunakan Local Storage browser. Data riwayat harus dapat diakses kembali selama data pada browser belum dihapus dan penyimpanan masih tersedia.

### 4.12 NFR-12 – Privasi Riwayat

Riwayat pencarian disimpan pada browser yang digunakan mahasiswa. Riwayat tidak disinkronisasikan secara otomatis antarperangkat atau antarbrowser.

Sistem harus memberikan informasi bahwa penghapusan data browser, penggunaan mode privat, atau penggunaan perangkat lain dapat menyebabkan riwayat tidak tersedia.

### 4.13 NFR-13 – Aksesibilitas Dokumen Pedoman

Dokumen pedoman harus dapat dibuka melalui browser modern pada perangkat desktop maupun mobile tanpa memerlukan akun pengguna. Dokumen harus dapat ditampilkan dalam waktu yang wajar pada kondisi koneksi normal, dan ukuran berkas perlu dipertimbangkan agar tidak membebani pengguna. Berkas dokumen hanya dapat dibaca dan tidak dapat diubah melalui aplikasi.

## 5. SPESIFIKASI MODEL REKOMENDASI

### 5.1 Metode yang Digunakan

SI-REKTA menggunakan metode TF-IDF dan Cosine Similarity untuk mengukur tingkat kemiripan antara judul tugas akhir yang dimasukkan mahasiswa dengan dokumen referensi.

#### A. Term Frequency-Inverse Document Frequency (TF-IDF)

TF-IDF digunakan untuk mengubah dokumen teks menjadi representasi numerik berdasarkan tingkat kepentingan suatu kata dalam dokumen terhadap keseluruhan kumpulan dokumen.

Representasi tersebut digunakan sebagai dasar perhitungan kemiripan antara judul yang dimasukkan mahasiswa dan dokumen referensi.

#### B. Cosine Similarity

Cosine Similarity digunakan untuk mengukur tingkat kemiripan antara dua vektor dokumen.

Nilai kemiripan berada pada rentang 0 sampai 1 untuk representasi teks dengan bobot nonnegatif. Semakin tinggi nilainya, semakin mirip representasi teks yang dibandingkan.

### 5.2 Dataset Referensi

Sistem menggunakan dataset yang telah disiapkan sebelum proses deployment, yang terdiri atas:

| **Dataset**      | **Keterangan**                                                                                                                                                                                |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Data dosen       | Informasi identitas dan profil dosen yang diperlukan untuk menampilkan hasil rekomendasi.                                                                                                     |
| Data tugas akhir | Kumpulan judul tugas akhir terdahulu beserta informasi dosen pembimbing yang terkait. Digunakan sebagai dokumen referensi dalam perhitungan kemiripan dan tidak ditampilkan kepada mahasiswa. |
| Data publikasi   | Kumpulan publikasi dosen yang digunakan sebagai dokumen referensi pendukung dalam perhitungan kemiripan dan tidak ditampilkan kepada mahasiswa.                                               |

Dataset tersebut menjadi sumber data tetap bagi artefak model yang digunakan aplikasi. Dokumen pedoman bukan bagian dari dataset model dan disimpan secara terpisah sebagai file PDF.

### 5.3 Proses Rekomendasi

Proses rekomendasi secara umum terdiri atas:

1.  Mahasiswa memasukkan judul tugas akhir.

2.  Sistem melakukan validasi input.

3.  Sistem melakukan preprocessing sesuai konfigurasi model.

4.  Sistem mengubah input menjadi representasi TF-IDF menggunakan vectorizer yang telah disimpan.

5.  Sistem menghitung Cosine Similarity terhadap dokumen referensi.

6.  Sistem menggabungkan atau mengolah skor sesuai mekanisme perankingan yang telah ditentukan dalam implementasi model.

7.  Sistem menghitung atau memperoleh skor kemiripan dosen sebagai dasar perankingan. Skor ini hanya digunakan secara internal dan tidak ditampilkan kepada mahasiswa.

8.  Sistem mengurutkan dosen berdasarkan skor tersebut dan menetapkan nomor peringkat.

9.  Sistem mengambil maksimal tiga dosen dengan peringkat tertinggi sesuai ketentuan model.

10. Sistem mengirimkan hasil kepada frontend untuk ditampilkan kepada mahasiswa.

11. Frontend menyimpan hasil pencarian ke Local Storage sebagai riwayat.

**Catatan implementasi:** Detail penggabungan skor, jumlah vectorizer, serta struktur matriks harus mengikuti implementasi model yang sebenarnya. Dokumen ini tidak menetapkan rumus fusion tertentu sebelum mekanisme tersebut dipastikan dari notebook pengembangan.

### 5.4 Informasi Hasil Rekomendasi

Hasil rekomendasi sekurang-kurangnya memuat:

- Nomor peringkat dosen (1 sampai 3).

- Nama dosen.

Nomor peringkat menunjukkan urutan kesesuaian dosen berdasarkan perhitungan model, bukan probabilitas bahwa dosen tersebut pasti cocok atau akan menjadi pembimbing. Skor kemiripan hanya digunakan secara internal untuk menentukan peringkat dan tidak ditampilkan kepada mahasiswa.

### 5.5 Penanganan Data yang Tidak Memadai

Apabila jumlah dosen yang memenuhi batas relevansi kurang dari tiga, sistem hanya menampilkan dosen yang tersedia. Sistem tidak diwajibkan menampilkan tiga dosen apabila jumlah dosen yang memenuhi kriteria relevansi tidak mencukupi.

Judul tugas akhir terdahulu dan publikasi dosen hanya digunakan sebagai dokumen referensi dalam proses perhitungan dan tidak ditampilkan sebagai bagian dari hasil rekomendasi.

### 5.6 Penyimpanan Snapshot Hasil Rekomendasi

Sistem menyimpan snapshot hasil rekomendasi setiap kali pencarian berhasil.

Snapshot merupakan salinan informasi hasil pencarian pada waktu tertentu yang mencakup:

- Judul input mahasiswa.

- Waktu pencarian.

- Informasi dosen yang direkomendasikan.

- Nomor peringkat.

Penyimpanan snapshot bertujuan agar hasil pencarian lama tetap dapat dilihat meskipun artefak model atau dataset referensi diperbarui pada masa mendatang.

Membuka riwayat tidak menjalankan ulang proses rekomendasi. Apabila mahasiswa ingin mendapatkan hasil berdasarkan model terbaru, mahasiswa harus melakukan pencarian baru.

## 6. ARSITEKTUR SISTEM

### 6.1 Gambaran Umum Arsitektur

SI-REKTA direncanakan menggunakan arsitektur yang memisahkan antarmuka pengguna, backend aplikasi, layanan rekomendasi, penyimpanan riwayat pada browser, serta penyajian dokumen pedoman.

Komponen utama terdiri atas:

1.  **Frontend:** Menyediakan antarmuka bagi mahasiswa untuk memasukkan judul, melihat hasil rekomendasi, mengakses riwayat pencarian, dan melihat dokumen pedoman.

2.  **Backend:** Mengelola komunikasi antara frontend dan layanan rekomendasi, melakukan validasi, mengatur respons aplikasi, serta menyajikan file dokumen pedoman.

3.  **Recommendation Service:** Menjalankan preprocessing, TF-IDF, Cosine Similarity, dan proses perankingan menggunakan Python.

4.  **Model Artifacts:** Menyimpan vectorizer, matriks TF-IDF, mapping dokumen, dan komponen lain yang dibutuhkan oleh model.

5.  **Dataset Referensi:** Menyediakan informasi dosen, tugas akhir, dan publikasi yang digunakan dalam hasil rekomendasi.

6.  **Local Storage:** Menyimpan riwayat pencarian mahasiswa pada browser, termasuk judul pencarian, waktu pencarian, dan snapshot hasil rekomendasi.

7.  **Dokumen Pedoman:** Menyimpan file PDF Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI yang disajikan kepada mahasiswa melalui aplikasi.

### 6.2 Teknologi yang Direncanakan

| **Komponen**           | **Teknologi**                                               | **Fungsi**                                                                              |
|------------------------|-------------------------------------------------------------|-----------------------------------------------------------------------------------------|
| Frontend               | React                                                       | Membangun antarmuka aplikasi web berbasis komponen.                                     |
| Backend                | Node.js dan Express.js                                      | Mengelola request, validasi, dan komunikasi antarlayanan.                               |
| Recommendation Service | Python dan FastAPI                                          | Menjalankan proses rekomendasi.                                                         |
| Machine Learning       | Scikit-learn                                                | Implementasi TF-IDF dan Cosine Similarity.                                              |
| Penyimpanan Artefak    | Joblib dan format matriks yang sesuai                       | Menyimpan dan memuat artefak model.                                                     |
| Penyimpanan Riwayat    | Browser Local Storage                                       | Menyimpan dan mengambil riwayat pencarian mahasiswa.                                    |
| Dokumen Pedoman        | File PDF statis yang disajikan oleh backend atau web server | Menyimpan dan menyajikan dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI. |
| Pengembangan Model     | Google Colab / Jupyter Notebook                             | Preprocessing, eksperimen, evaluasi, dan pembangunan artefak.                           |

### 6.3 Mekanisme Penggunaan Artefak Model

Artefak model dibangun sebelum aplikasi digunakan melalui proses pengembangan model.

Tahapan yang dilakukan:

1.  Mengumpulkan dan menyiapkan dataset referensi.

2.  Melakukan preprocessing terhadap data.

3.  Membentuk representasi TF-IDF.

4.  Membentuk matriks dokumen yang dibutuhkan.

5.  Menyimpan vectorizer, matriks, mapping, dan konfigurasi model yang diperlukan.

6.  Memindahkan artefak ke lingkungan deployment.

7.  Memuat artefak saat layanan rekomendasi dijalankan.

8.  Menggunakan artefak tersebut untuk memproses setiap pencarian mahasiswa.

Artefak model tidak dibangun ulang setiap kali mahasiswa melakukan pencarian.

### 6.4 Mekanisme Pembaruan Artefak

Pembaruan artefak bukan merupakan fitur yang dapat dilakukan melalui aplikasi SI-REKTA.

Apabila terdapat perubahan dataset, pembaruan dilakukan melalui proses pemeliharaan sistem di luar aplikasi dengan tahapan:

1.  Memperbarui dataset sumber.

2.  Melakukan preprocessing ulang apabila diperlukan.

3.  Membangun kembali artefak model menggunakan dataset terbaru.

4.  Melakukan validasi terhadap artefak yang dihasilkan.

5.  Mengganti artefak lama dengan versi terbaru melalui proses deployment.

Selama proses tersebut belum dilakukan, aplikasi tetap menggunakan artefak yang sebelumnya telah di-deploy.

### 6.5 Mekanisme Penyimpanan Riwayat

Penyimpanan riwayat dilakukan setelah proses rekomendasi berhasil.

Tahapan penyimpanan:

1.  Mahasiswa memasukkan judul tugas akhir.

2.  Sistem memproses permintaan dan menghasilkan rekomendasi.

3.  Backend mengirimkan hasil rekomendasi kepada frontend.

4.  Frontend membentuk data riwayat yang berisi judul pencarian, waktu pencarian, dan snapshot hasil rekomendasi.

5.  Frontend menyimpan data tersebut ke Local Storage.

6.  Data riwayat dapat diakses kembali melalui halaman History.

Riwayat disimpan di sisi browser sehingga tidak membutuhkan database khusus maupun autentikasi pengguna.

Sistem perlu memberikan identitas unik untuk setiap riwayat agar satu pencarian dapat dibuka atau dihapus secara terpisah.

Jika penyimpanan lokal mencapai batas kapasitas atau gagal dilakukan, sistem harus menangani kondisi tersebut dengan pesan yang sesuai. Kegagalan penyimpanan riwayat tidak boleh mengubah atau membatalkan hasil rekomendasi yang telah berhasil diperoleh mahasiswa.

### 6.6 Mekanisme Penyajian Dokumen Pedoman

Dokumen pedoman disiapkan sebelum aplikasi digunakan dan disajikan kepada mahasiswa sebagai file PDF statis.

Tahapan penyajian:

1.  Dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF disiapkan dan ditempatkan pada penyimpanan aplikasi pada saat deployment.

2.  Mahasiswa membuka menu Dokumen Pedoman.

3.  Sistem menampilkan daftar dokumen pedoman yang tersedia.

4.  Mahasiswa memilih salah satu dokumen.

5.  Backend atau web server menyajikan file PDF yang dipilih kepada browser.

6.  Browser atau penampil PDF pada aplikasi menampilkan dokumen kepada mahasiswa.

Dokumen pedoman disimpan terpisah dari dataset referensi, artefak model, dan riwayat pencarian. Penyajian dokumen tidak melibatkan Recommendation Service.

Pembaruan dokumen pedoman dilakukan di luar aplikasi dengan mengganti file PDF melalui proses deployment atau pemeliharaan sistem. Aplikasi tidak menyediakan fitur unggah atau pengubahan dokumen.

## 7. ALUR PROSES SISTEM

### 7.1 Alur Pencarian Rekomendasi Mahasiswa

1.  Mahasiswa membuka aplikasi SI-REKTA.

2.  Sistem menampilkan halaman utama.

3.  Mahasiswa memasukkan judul tugas akhir.

4.  Mahasiswa menekan tombol pencarian.

5.  Sistem melakukan validasi input.

6.  Apabila input tidak valid, sistem menampilkan pesan kesalahan.

7.  Apabila input valid, backend meneruskan permintaan ke Recommendation Service.

8.  Recommendation Service memproses input menggunakan artefak model yang tersedia.

9.  Sistem menghitung kemiripan dan menentukan peringkat dosen.

10. Sistem mengambil informasi dosen yang direkomendasikan.

11. Hasil rekomendasi dikirimkan kepada frontend.

12. Frontend menampilkan hasil rekomendasi kepada mahasiswa.

13. Frontend menyimpan riwayat pencarian beserta snapshot hasil rekomendasi ke Local Storage.

14. Mahasiswa dapat membuka riwayat pencarian atau melakukan pencarian kembali dengan judul berbeda.

### 7.2 Alur Melihat Riwayat Pencarian

1.  Mahasiswa membuka menu History.

2.  Sistem mengambil data riwayat dari Local Storage.

3.  Sistem memeriksa apakah terdapat riwayat pencarian.

4.  Apabila tidak ada, sistem menampilkan informasi bahwa riwayat masih kosong.

5.  Apabila tersedia, sistem menampilkan daftar riwayat berdasarkan waktu pencarian terbaru.

6.  Mahasiswa memilih salah satu riwayat.

7.  Sistem mengambil snapshot hasil rekomendasi yang tersimpan.

8.  Sistem menampilkan detail hasil rekomendasi sebelumnya.

9.  Mahasiswa dapat kembali ke daftar riwayat atau halaman pencarian.

### 7.3 Alur Menghapus Riwayat Pencarian

1.  Mahasiswa membuka menu History.

2.  Sistem menampilkan daftar riwayat pencarian.

3.  Mahasiswa memilih riwayat yang ingin dihapus atau memilih opsi hapus seluruh riwayat.

4.  Sistem meminta konfirmasi apabila mahasiswa memilih hapus seluruh riwayat.

5.  Setelah dikonfirmasi, sistem menghapus data yang dipilih dari Local Storage.

6.  Sistem memperbarui tampilan daftar riwayat.

7.  Apabila seluruh riwayat telah dihapus, sistem menampilkan kondisi riwayat kosong.

### 7.4 Alur Mengakses Dokumen Pedoman

1.  Mahasiswa membuka aplikasi SI-REKTA.

2.  Mahasiswa membuka menu Dokumen Pedoman.

3.  Sistem menampilkan daftar dokumen pedoman, yaitu Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI.

4.  Mahasiswa memilih salah satu dokumen.

5.  Sistem memuat file PDF dari penyimpanan aplikasi.

6.  Apabila file berhasil dimuat, sistem menampilkan dokumen kepada mahasiswa.

7.  Apabila file tidak tersedia atau gagal dimuat, sistem menampilkan pesan kesalahan.

8.  Mahasiswa dapat kembali ke daftar dokumen atau berpindah ke menu lain.

### 7.5 Alur Pengembangan dan Pembaruan Model

Proses ini merupakan kegiatan pengembangan dan pemeliharaan di luar aplikasi, bukan alur penggunaan oleh mahasiswa.

1.  Dataset referensi dikumpulkan.

2.  Dataset diproses melalui preprocessing.

3.  Model dibangun menggunakan metode yang ditetapkan.

4.  Artefak model disimpan.

5.  Artefak diuji dan divalidasi.

6.  Artefak yang valid dipasang pada lingkungan deployment.

7.  Layanan rekomendasi memuat artefak tersebut untuk melayani pencarian mahasiswa.

## 8. SPESIFIKASI DATA

### 8.1 Data Dosen

Data dosen digunakan untuk menampilkan identitas dan informasi dosen yang direkomendasikan.

Atribut yang dapat digunakan:

- ID dosen.

- Nama dosen.

- Informasi profil atau bidang keahlian, apabila tersedia.

### 8.2 Data Tugas Akhir

Data tugas akhir digunakan sebagai dokumen referensi utama dalam proses rekomendasi. Data ini tidak ditampilkan kepada mahasiswa sebagai hasil rekomendasi.

Atribut yang dapat digunakan:

- ID tugas akhir.

- Judul tugas akhir.

- Tahun tugas akhir, apabila tersedia.

- Identitas dosen pembimbing.

Satu tugas akhir dapat memiliki lebih dari satu dosen pembimbing. Oleh karena itu, relasi antara tugas akhir dan dosen perlu mendukung hubungan many-to-many apabila sesuai dengan struktur dataset.

### 8.3 Data Publikasi

Data publikasi digunakan sebagai dokumen referensi pendukung dalam perhitungan kemiripan antara topik yang dimasukkan mahasiswa dan dosen. Data ini tidak ditampilkan kepada mahasiswa sebagai hasil rekomendasi.

Atribut yang dapat digunakan:

- ID publikasi.

- Judul publikasi.

- Tahun publikasi.

- Sumber atau tautan publikasi, apabila tersedia.

- Identitas dosen yang terkait.

Satu publikasi dapat memiliki lebih dari satu penulis atau dosen yang terkait.

### 8.4 Data Riwayat Pencarian

Data riwayat pencarian digunakan untuk menyimpan dan menampilkan kembali pencarian yang pernah dilakukan mahasiswa.

Atribut yang disimpan meliputi:

| **Atribut**            | **Keterangan**                               |
|------------------------|----------------------------------------------|
| History ID             | Identitas unik setiap riwayat pencarian.     |
| Search Title           | Judul tugas akhir yang dimasukkan mahasiswa. |
| Search Date            | Tanggal pencarian dilakukan.                 |
| Search Time            | Waktu pencarian dilakukan.                   |
| Recommendation Results | Snapshot hasil rekomendasi dosen.            |
| Ranking                | Nomor peringkat masing-masing dosen.         |

Data riwayat disimpan dalam bentuk terstruktur pada Local Storage browser. Implementasi dapat menggunakan JSON agar data mudah disimpan, dibaca, dan diperbarui.

### 8.5 Penyimpanan Data

Data referensi dapat disimpan dalam file atau struktur penyimpanan yang sesuai dengan implementasi model. Data yang diperlukan untuk menampilkan hasil rekomendasi harus dapat dihubungkan dengan artefak melalui mapping atau identitas dokumen yang konsisten.

Penggunaan MySQL bersifat opsional dan tidak diwajibkan apabila kebutuhan penyimpanan dapat dipenuhi oleh file dataset dan artefak model.

Riwayat pencarian disimpan secara terpisah dari dataset referensi dan artefak model menggunakan Local Storage browser. Data riwayat tidak digunakan untuk melatih ulang model maupun memengaruhi hasil rekomendasi berikutnya.

Dokumen pedoman disimpan sebagai file PDF statis secara terpisah dari dataset referensi, artefak model, dan riwayat pencarian.

### 8.6 Data Dokumen Pedoman

Dokumen pedoman merupakan file PDF yang disediakan oleh sistem dan dapat dilihat oleh mahasiswa. Sistem menyediakan dua dokumen berikut:

| **Nama Dokumen**              | **Format** | **Keterangan**                           |
|-------------------------------|------------|------------------------------------------|
| Pedoman Tugas Akhir           | PDF        | Dokumen pedoman pelaksanaan tugas akhir. |
| Pedoman Topik Tugas Akhir DSI | PDF        | Dokumen pedoman topik tugas akhir DSI.   |

Dokumen disimpan sebagai file statis pada penyimpanan aplikasi dan dihubungkan dengan menu Dokumen Pedoman melalui nama berkas atau identitas dokumen yang konsisten.

## 9. RANCANGAN HALAMAN SISTEM

Halaman yang direncanakan dalam SI-REKTA meliputi:

### 9.1 Halaman Utama

Berisi:

- Nama dan deskripsi singkat SI-REKTA.

- Penjelasan fungsi sistem.

- Tombol atau akses menuju fitur rekomendasi.

- Akses menuju menu History.

- Akses menuju menu Dokumen Pedoman.

### 9.2 Halaman Pencarian Rekomendasi

Berisi:

- Kolom input judul tugas akhir.

- Petunjuk pengisian judul.

- Tombol pencarian.

- Validasi dan pesan kesalahan input.

### 9.3 Halaman Hasil Rekomendasi

Berisi:

- Judul yang dimasukkan mahasiswa.

- Daftar maksimal tiga dosen yang direkomendasikan.

- Nomor peringkat setiap dosen.

- Informasi dosen.

- Opsi untuk melakukan pencarian kembali.

### 9.4 Halaman History

Halaman History digunakan untuk menampilkan daftar pencarian yang pernah dilakukan mahasiswa.

Halaman ini berisi:

- Daftar judul tugas akhir yang pernah dicari.

- Tanggal dan waktu pencarian.

- Ringkasan hasil rekomendasi.

- Akses untuk melihat detail hasil pencarian.

- Opsi menghapus satu riwayat.

- Opsi menghapus seluruh riwayat.

Riwayat ditampilkan dari pencarian terbaru ke pencarian terlama.

Apabila belum terdapat riwayat, sistem menampilkan informasi bahwa mahasiswa belum memiliki riwayat pencarian.

### 9.5 Halaman Detail History

Halaman Detail History digunakan untuk menampilkan kembali hasil rekomendasi dari pencarian sebelumnya.

Informasi yang ditampilkan meliputi:

- Judul tugas akhir yang pernah dicari.

- Tanggal dan waktu pencarian.

- Daftar dosen yang direkomendasikan.

- Nomor peringkat dosen.

Informasi yang ditampilkan merupakan snapshot hasil rekomendasi ketika pencarian dilakukan dan tidak dihitung ulang menggunakan model terbaru.

### 9.6 Halaman Dokumen Pedoman

Halaman Dokumen Pedoman digunakan untuk menampilkan dokumen pedoman yang dapat diakses mahasiswa.

Halaman ini berisi:

- Daftar dokumen pedoman, yaitu Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI.

- Nama dan keterangan singkat setiap dokumen.

- Akses untuk membuka dan membaca dokumen PDF.

- Pesan informasi apabila dokumen tidak dapat dimuat.

Dokumen ditampilkan dalam bentuk file PDF yang disediakan sistem dan bersifat hanya-baca.

### 9.7 Halaman Informasi Sistem

Berisi penjelasan mengenai:

- Tujuan pengembangan SI-REKTA.

- Metode rekomendasi yang digunakan.

- Cara kerja sistem secara umum.

- Batasan hasil rekomendasi.

- Penjelasan mengenai penyimpanan riwayat pencarian.

## 10. BATASAN SISTEM

SI-REKTA memiliki batasan sebagai berikut:

1.  Sistem hanya ditujukan untuk membantu mahasiswa memperoleh informasi rekomendasi dosen pembimbing.

2.  Sistem tidak menentukan atau menetapkan dosen pembimbing secara resmi.

3.  Hasil rekomendasi hanya merupakan bahan pertimbangan dan bukan keputusan akademik.

4.  Sistem menggunakan dataset referensi yang telah ditetapkan sebelum deployment.

5.  Mahasiswa tidak dapat menambahkan, mengubah, atau menghapus data referensi melalui aplikasi.

6.  Sistem tidak menyediakan dashboard admin maupun fitur pengelolaan dataset.

7.  Pembaruan dataset dan artefak dilakukan di luar aplikasi melalui proses pemeliharaan sistem.

8.  Kualitas rekomendasi bergantung pada kelengkapan, kualitas, dan relevansi dataset yang digunakan.

9.  Dosen yang tidak memiliki data referensi yang cukup mungkin tidak muncul dalam hasil rekomendasi.

10. Sistem tidak menampilkan judul tugas akhir terdahulu maupun publikasi dosen sebagai bagian dari hasil rekomendasi.

11. Nomor peringkat tidak dapat diartikan sebagai probabilitas keberhasilan penelitian atau kepastian kecocokan dosen.

12. Riwayat pencarian disimpan secara lokal pada browser menggunakan Local Storage.

13. Riwayat pencarian tidak tersinkronisasi secara otomatis antarperangkat atau antarbrowser.

14. Riwayat dapat hilang apabila pengguna menghapus data browser, menggunakan mode privat, atau penyimpanan lokal mengalami penghapusan.

15. Riwayat yang ditampilkan merupakan snapshot hasil rekomendasi ketika pencarian dilakukan, bukan hasil rekomendasi terbaru yang dihitung ulang.

16. Sistem tidak menyediakan akun pengguna atau autentikasi untuk menghubungkan riwayat pencarian dengan identitas mahasiswa.

17. Riwayat pencarian hanya tersedia pada browser dan perangkat tempat pencarian dilakukan.

18. Dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI disediakan dalam bentuk file PDF yang telah ditetapkan sebelum deployment.

19. Mahasiswa hanya dapat melihat dokumen pedoman dan tidak dapat mengubah, mengunggah, atau menghapusnya melalui aplikasi.

20. Pembaruan dokumen pedoman dilakukan di luar aplikasi melalui proses pemeliharaan sistem, dan isi dokumen menjadi tanggung jawab pihak penyusun dokumen.

## Evaluasi Model Rekomendasi

Evaluasi model dilakukan untuk mengetahui kualitas hasil rekomendasi yang dihasilkan.

Metrik evaluasi yang dapat digunakan meliputi:

- Precision@K.

- Recall@K.

- Mean Reciprocal Rank (MRR).

- Hit Rate@K.

Pemilihan metrik dan nilai K harus disesuaikan dengan rancangan eksperimen serta ketersediaan data relevansi aktual.

Evaluasi model dilakukan secara terpisah dari pengujian fungsional aplikasi. Tujuannya adalah memastikan bahwa model tidak hanya berjalan secara teknis, tetapi juga menghasilkan rekomendasi yang relevan.

## 12. PENUTUP

SI-REKTA dirancang sebagai sistem rekomendasi dosen pembimbing tugas akhir yang berfokus pada kebutuhan mahasiswa. Sistem memanfaatkan metode TF-IDF dan Cosine Similarity untuk menganalisis kemiripan antara judul yang dimasukkan mahasiswa dengan dataset referensi yang telah disiapkan.

Dengan menggunakan artefak model yang telah dibangun sebelumnya, sistem dapat menjalankan proses rekomendasi tanpa harus membangun ulang model setiap kali terdapat permintaan pencarian. Pendekatan ini membuat ruang lingkup aplikasi lebih terfokus pada proses rekomendasi dan penyajian informasi dosen.

Selain fitur rekomendasi, SI-REKTA menyediakan fitur History yang memungkinkan mahasiswa menyimpan dan melihat kembali hasil pencarian sebelumnya. Penyimpanan dilakukan secara lokal melalui Local Storage browser sehingga tidak memerlukan akun pengguna maupun database khusus untuk riwayat pencarian.

SI-REKTA juga menyediakan akses terhadap dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF sehingga mahasiswa dapat memperoleh acuan mengenai ketentuan dan topik tugas akhir langsung melalui sistem.

Dengan demikian, SI-REKTA memiliki tiga fungsi utama, yaitu pencarian rekomendasi dosen, pengelolaan riwayat pencarian mahasiswa, serta penyediaan dokumen Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI dalam format PDF.

Dokumen SRS ini menjadi acuan dalam proses perancangan dan pengembangan SI-REKTA, serta dapat disesuaikan kembali apabila terdapat perubahan kebutuhan sistem pada tahap pengembangan berikutnya.
