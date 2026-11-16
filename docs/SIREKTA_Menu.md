# Informasi Menu SI-REKTA

SI-REKTA punya enam menu pada bilah navigasi, dan lima di antaranya sudah ada di SRS v4.4. Menu **Daftar Dosen** adalah usulan baru yang belum ada di SRS. Sistem tidak punya login, sehingga semua menu terbuka untuk mahasiswa.

## Ringkasan menu

| Menu | Fungsi utama | Tabel data yang dipakai | Rujukan SRS |
| --- | --- | --- | --- |
| Beranda | Pengantar sistem dan pintu masuk ke fitur lain | DOSEN, PROFIL_DOSEN (angka ringkasan) | FR-01, 9.1 |
| Cari Dosen | Input judul TA, lalu tampil 3 dosen teratas | MODEL_VERSI, PROFIL_DOSEN, KATA_KUNCI_DOSEN, DOSEN | FR-02 s.d. FR-10, 9.2, 9.3 |
| Daftar Dosen (usulan) | Daftar 17 dosen yang dicakup model | DOSEN, KELOMPOK_KEAHLIAN, PROFIL_DOSEN, KATA_KUNCI_DOSEN | Belum ada |
| Dokumen Pedoman | Membaca dua PDF pedoman | DOKUMEN_PEDOMAN | FR-16 s.d. FR-19, 9.6 |
| History | Daftar, detail, dan hapus riwayat pencarian | RIWAYAT_PENCARIAN, HASIL_REKOMENDASI (Local Storage) | FR-11 s.d. FR-15, 9.4, 9.5 |
| Informasi | Penjelasan tujuan, cara kerja, data, kinerja, dan batasan model | MODEL_VERSI, PROFIL_DOSEN | 9.7, Bab 10 |

Tombol **Mulai Cari Dosen** di kanan atas membuka menu Cari Dosen dari halaman mana pun.

## 1. Beranda

Beranda menjelaskan apa itu SI-REKTA dan mengarahkan mahasiswa ke pencarian, riwayat, dan pedoman.

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Memperkenalkan sistem dan menjadi pintu masuk ke semua fitur (FR-01). |
| Isi halaman | Lencana metode (TF-IDF dan Cosine Similarity); judul utama dan subteks; tombol "Cari Dosen Sekarang" dan "Lihat Dokumen Pedoman"; contoh kartu hasil dengan peringkat #1 sampai #3; tiga angka ringkasan (17 dosen, 706 riwayat bimbingan TA, 643 publikasi); empat kartu fitur; langkah "Cara Kerja"; catatan kaki. |
| Aksi pengguna | Membuka Cari Dosen, Dokumen Pedoman, History, atau Daftar Dosen lewat tombol dan kartu fitur. |
| Data | Hanya angka ringkasan dari tabel DOSEN dan PROFIL_DOSEN; tidak ada input dan tidak ada penyimpanan. |
| Aturan isi | Tidak ada testimoni, jumlah pengguna, atau rating. Catatan kaki wajib menyebut bahwa hasil hanya bahan pertimbangan dan cakupan saat ini 17 dosen. |

## 2. Cari Dosen dan Hasil Rekomendasi

Menu ini adalah fitur inti: mahasiswa menulis judul, lalu sistem menampilkan paling banyak tiga dosen berurutan.

**Halaman Cari Dosen**

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Menerima judul atau rencana judul TA (FR-02). |
| Isi halaman | Kolom teks besar dengan penghitung kata; tiga contoh judul yang bisa diklik; tiga tips penulisan; tombol "Cari Rekomendasi"; tautan "Lihat History". |
| Validasi | Judul tidak boleh kosong; minimal 6 kata. Pesan galat: "Judul tidak boleh kosong" dan "Judul terlalu pendek, tulis minimal 6 kata" (FR-03). |
| Status tombol | Saat diproses, tombol berubah menjadi "Menganalisis judul..."; respons ditargetkan paling lama 5 detik (NFR-01). |

**Halaman Hasil Rekomendasi**

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Menampilkan 3 dosen teratas beserta alasan singkatnya (FR-05 s.d. FR-07). |
| Isi halaman | Ringkasan judul dan istilah yang dikenali model; tiga kartu dosen (lencana peringkat, inisial, nama, pill "riwayat TA" dan "publikasi", kata kunci keahlian, kata kunci yang cocok dengan judul); tabel perbandingan; tombol "Cari Lagi"; penanda "Tersimpan di History". |
| Aksi pengguna | Mencari ulang dengan judul lain (FR-08); membuka History. |
| Kondisi khusus | Hasil kurang meyakinkan: banner kuning karena sedikit istilah dikenali. Dosen tanpa riwayat TA: lencana "Profil dari publikasi". Tidak ada dosen relevan: halaman "Rekomendasi tidak ditemukan" (FR-09). Layanan gagal: "Layanan rekomendasi sedang tidak tersedia" (FR-10). |
| Data | Model TF-IDF dari MODEL_VERSI; profil dari PROFIL_DOSEN; chip dari KATA_KUNCI_DOSEN. Skor kemiripan hanya dipakai internal. |
| Penyimpanan | Setiap pencarian berhasil disimpan ke History (FR-11); pencarian gagal atau tidak valid tidak disimpan. |
| Larangan | Tanpa skor, persentase, bar progres, judul TA, judul publikasi, foto, NIP, email, atau kuota. Peringkat bukan probabilitas. |

## 3. Daftar Dosen (usulan baru)

Menu ini belum ada di SRS v4.4, jadi putuskan dulu apakah dimasukkan. Jika ya, SRS perlu tambahan FR dan rancangan halaman.

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Membantu mahasiswa melihat dosen yang dicakup model sebelum menulis judul. |
| Isi halaman | Kotak cari nama; urutan Nama A-Z, Riwayat TA terbanyak, atau Publikasi terbanyak; kartu 17 dosen dengan inisial, nama, pill jumlah, proporsi TA dan publikasi, serta tiga kata kunci. |
| Halaman detail | Awan kata kunci keahlian, grafik donat TA dan publikasi, dan tombol "Cari dengan topik dosen ini". |
| Data | DOSEN (hanya `termasuk_model = TRUE`), KELOMPOK_KEAHLIAN, PROFIL_DOSEN, KATA_KUNCI_DOSEN. |
| Catatan | Tiga dosen tidak punya riwayat TA (Febby Apri Wenando, Nisa Dwi Angresti, Hafzatin Nurlatifa) dan memakai lencana "Profil dari publikasi". Kata kunci perlu diekspor dari model karena belum dihasilkan notebook. |
| Larangan | Tanpa foto, NIP, email, telepon, ketersediaan, dan daftar judul TA atau publikasi. |

## 4. Dokumen Pedoman

Menu ini menyajikan dua PDF statis yang hanya bisa dibaca.

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Memberi akses ke Pedoman Tugas Akhir dan Pedoman Topik Tugas Akhir DSI tanpa mencari di luar aplikasi (FR-16 s.d. FR-18). |
| Isi halaman | Daftar: dua kartu dengan nama, keterangan, chip "PDF", dan tombol "Buka Dokumen". Penampil: tombol kembali, judul dokumen, bingkai PDF, dan toolbar halaman sebelumnya, berikutnya, serta zoom. |
| Aksi pengguna | Membuka, membaca, memperbesar, dan berpindah halaman. Tidak ada unggah, ubah, atau hapus. |
| Data | Tabel DOKUMEN_PEDOMAN (nama, keterangan, nama file, format). File PDF disimpan statis di server, terpisah dari dataset, model, dan riwayat. |
| Kondisi khusus | File hilang atau gagal dimuat: "Dokumen tidak dapat dimuat" dengan tombol "Coba Lagi". Galat ini tidak boleh mengganggu pencarian dan History (FR-19). |
| Pembaruan | Ganti file PDF lewat deployment, bukan lewat aplikasi. |

## 5. History dan Detail History

History menyimpan pencarian di browser, tanpa akun dan tanpa database server.

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Melihat, membuka ulang, dan menghapus pencarian sebelumnya (FR-11 s.d. FR-15). |
| Daftar riwayat | Judul pencarian, tanggal dan jam, tiga chip peringkat dan nama dosen, tombol "Lihat Detail" dan ikon hapus. Urutan dari yang terbaru. |
| Banner info | "Riwayat disimpan di browser ini"; menghapus data browser atau mode privat dapat menghilangkannya (NFR-12). |
| Hapus | Hapus satu riwayat langsung; "Hapus Semua" wajib lewat modal konfirmasi (FR-14). |
| Detail History | Tiga kartu dosen yang sama dengan halaman hasil, lencana "Snapshot hasil pencarian", tombol "Cari Ulang dengan Judul Ini" dan "Hapus Riwayat Ini". Hasil tidak dihitung ulang (FR-13). |
| Kondisi khusus | Kosong: "Belum ada riwayat pencarian" dengan tombol "Mulai Cari Dosen". Data tak terbaca: "Riwayat tidak dapat dibaca dari penyimpanan browser" (FR-15). Penyimpanan penuh: peringatan "Gagal menyimpan riwayat", dan hasil pencarian tetap tampil. |
| Data | RIWAYAT_PENCARIAN dan HASIL_REKOMENDASI dalam JSON di Local Storage. Isinya salinan snapshot, bukan relasi ke tabel DOSEN. |

## 6. Informasi

Menu ini menjelaskan sistem secara transparan, termasuk batas kemampuan model.

| Aspek | Keterangan |
| --- | --- |
| Tujuan | Menjelaskan tujuan, cara kerja, data, kinerja, dan batasan SI-REKTA (9.7). |
| Bagian 1: Tujuan | Dua kalimat tentang bantuan pemilihan dosen pembimbing. |
| Bagian 2: Cara Kerja | Lima langkah: Judul Masukan, Pembersihan Teks, TF-IDF (kata dan frasa), Cosine Similarity terhadap 17 profil dosen, 3 Dosen Teratas. |
| Bagian 3: Data Referensi | 17 dosen, 706 riwayat bimbingan TA, 643 publikasi, dan grafik komposisi dokumen per dosen. |
| Bagian 4: Kinerja Model | Diuji pada 118 judul yang tidak dipakai melatih model: Hit Rate@3 79,66%, Recall@3 75,85%, MRR@3 0,60, Precision@3 30,51%. Precision rendah karena sebagian besar judul hanya punya 1 atau 2 pembimbing, sedangkan sistem menampilkan 3 dosen. |
| Bagian 5: Batasan | Hasil bukan keputusan akademik; cakupan hanya 17 dosen; kualitas bergantung pada data referensi; peringkat bukan probabilitas; riwayat hanya di browser ini. |
| Data | MODEL_VERSI dan PROFIL_DOSEN. Angka kinerja berasal dari evaluasi notebook, bukan dari hitungan langsung. |
