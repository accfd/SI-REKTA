# SI-REKTA (Sistem Rekomendasi Dosen Pembimbing Tugas Akhir)
**Departemen Sistem Informasi (DSI) - 2025/2026**

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/accfd/SI-REKTA/blob/main/docs/SIREKTA.ipynb)

Aplikasi web berbasis Text Mining (**TF-IDF & Cosine Similarity**) untuk merekomendasikan maksimal 3 dosen pembimbing tugas akhir bagi mahasiswa Departemen Sistem Informasi berdasarkan kesesuaian judul/topik tugas akhir terhadap riwayat bimbingan TA dan publikasi ilmiah 17 dosen.

---

## 📓 Notebook Eksperimen Model (Tahap 1 - 9)
Seluruh proses pengembangan model Machine Learning (Tahap 1 hingga 9) terdokumentasi secara lengkap dan dapat dijalankan langsung di Google Colab:
- **Notebook File**: [`docs/SIREKTA.ipynb`](docs/SIREKTA.ipynb)
- **Akses Interaktif**: [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/accfd/SI-REKTA/blob/main/docs/SIREKTA.ipynb) *(dataset otomatis terunduh dari GitHub)*

---

## 🚀 Fitur Utama (6 Menu Sistem)
1. **Beranda**: Statistik ringkasan (17 Dosen, 706 Riwayat TA, 643 Publikasi), lencana metode, alur sistem, dan contoh judul cepat.
2. **Cari Dosen & Hasil Rekomendasi**:
   - Form input textarea dengan word counter (validasi minimal 6 kata).
   - Kartu rekomendasi Top-3 (#1, #2, #3), lencana peringkat, inisial, kata kunci cocok, dan tag keahlian.
   - Peringatan banner jika hasil kurang meyakinkan (*low confidence*).
   - Tabel komparasi 3 dosen terpilih.
   - **Sesuai Aturan SRS**: Skor/persentase kemiripan, kontak pribadi (NIP/HP/Email/Foto), dan kuota bimbingan dilarang ditampilkan.
3. **Daftar Dosen**: Direktori 17 dosen DSI, filter kelompok keahlian (RDBI, SD, SE, TKITI), pengurutan, dan tombol rincian dokumen bimbingan & publikasi.
4. **Dokumen Pedoman**: Penampil PDF resmi terintegrasi (Pedoman Tugas Akhir & Pedoman Topik TA DSI 2025).
5. **History**: Penyimpanan riwayat lokal di browser (**Local Storage**) tanpa akun/database server, snapshot hasil, fitur hapus satuan dan hapus semua.
6. **Informasi**: Transparansi alur kerja NLP/IR, rincian dataset, metrik evaluasi model (Hit Rate@3: 79.66%, Recall@3: 75.42%, MRR@3: 0.60), serta batasan akademik sistem.

---

## 🗄️ Arsitektur Basis Data (MySQL - Laragon)
Database `sirekta_db` dirancang dalam bentuk **Normalisasi 3NF** dengan 10 tabel:
- `kelompok_keahlian` (Master 4 Lab/KK: RDBI, SD, SE, TKITI)
- `dosen` (Master 17 Dosen DSI)
- `profil_dosen` (Agregat statistik TA & publikasi)
- `kata_kunci_dosen` (Kata kunci keahlian per dosen dari bobot TF-IDF bersih)
- `tugas_akhir` (625 riwayat judul TA terdahulu)
- `bimbingan_ta` (707 relasi bimbingan many-to-many dosen & TA)
- `publikasi` (643 judul publikasi ilmiah)
- `publikasi_dosen` (Relasi many-to-many dosen & publikasi)
- `dokumen_pedoman` (Master daftar berkas PDF panduan akademik)
- `model_versi` (Metadata & metrik performa model)

*File SQL DDL & DML lengkap tersedia di:* `sirekta.sql`.

---

## 🛠️ Cara Menjalankan Aplikasi Secara Manual

### 1. Prasyarat Lingkungan
- **Laragon**: Buka Laragon dan klik tombol **Start All** (pastikan modul **MySQL** aktif pada port 3306).
- Pastikan database `sirekta_db` sudah dibuat dan diimpor dari berkas `sirekta.sql`.

---

### 2. Menjalankan Backend API (FastAPI)
Buka terminal pertama (PowerShell atau Command Prompt), masuk ke direktori `backend`, dan jalankan server uvicorn:

```powershell
cd "D:\SEMESTER 5\ML\backend"
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

> **Verifikasi Backend:**
> - Server berjalan pada port `8000`: [http://localhost:8000](http://localhost:8000)
> - Dokumentasi Interaktif Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### 3. Menjalankan Frontend Web (React + Vite)
Buka terminal kedua (tab/jendela terminal terpisah), masuk ke direktori `frontend`, dan jalankan Vite:

```powershell
cd "D:\SEMESTER 5\ML\frontend"
npm run dev
```

> **Verifikasi Frontend:**
> - Aplikasi web berjalan pada port `5173`: [http://localhost:5173](http://localhost:5173)

---

### 4. Mengakses Aplikasi di Browser
Setelah kedua terminal di atas berjalan secara bersamaan, buka peramban (*browser*) Chrome / Edge dan akses:  
👉 **[http://localhost:5173](http://localhost:5173)**
