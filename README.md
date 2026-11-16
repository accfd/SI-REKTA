# SI-REKTA (Sistem Rekomendasi Dosen Pembimbing Tugas Akhir)
**Departemen Sistem Informasi (DSI) - 2025/2026**

Aplikasi web berbasis Text Mining (**TF-IDF & Cosine Similarity**) untuk merekomendasikan maksimal 3 dosen pembimbing tugas akhir bagi mahasiswa Departemen Sistem Informasi berdasarkan kesesuaian judul/topik tugas akhir terhadap riwayat bimbingan TA dan publikasi ilmiah 17 dosen.

---

## 🚀 Fitur Utama (6 Menu Sistem)
1. **Beranda**: Statistik ringkasan (17 Dosen, 706 Riwayat TA, 643 Publikasi), lencana metode, alur sistem, dan contoh judul cepat.
2. **Cari Dosen & Hasil Rekomendasi**:
   - Form input textarea dengan word counter (validasi minimal 6 kata).
   - Kartu rekomendasi Top-3 (#1, #2, #3), lencana peringkat, inisial, kata kunci cocok, dan tag keahlian.
   - Peringatan banner jika hasil kurang meyakinkan (*low confidence*).
   - Tabel komparasi 3 dosen.
   - **Sesuai Aturan SRS**: Skor/persentase kemiripan, kontak pribadi (NIP/HP/Email/Foto), dan kuota bimbingan dilarang ditampilkan.
3. **Daftar Dosen**: Direktori 17 dosen DSI, filter kelompok keahlian (RD-BI, SE, SD, TK-ITI), pengurutan, dan tombol "Cari dengan topik dosen ini".
4. **Dokumen Pedoman**: Penampil PDF resmi terintegrasi (Pedoman Tugas Akhir & Pedoman Topik TA DSI 2025).
5. **History**: Penyimpanan riwayat lokal di browser (**Local Storage**) tanpa akun/database server, snapshot hasil, fitur hapus satuan dan hapus semua (dengan modal konfirmasi).
6. **Informasi**: Transparansi alur kerja NLP, rincian dataset, metrik evaluasi model (Hit Rate@3: 79.66%, Recall@3: 75.42%, MRR@3: 0.60), serta batasan akademik sistem.

---

## 🗄️ Arsitektur Basis Data (MySQL - Laragon)
Database `sirekta_db` telah dirancang dalam bentuk **Normalisasi 3NF** dengan 10 tabel:
- `kelompok_keahlian` (Master KK: RD-BI, SE, SD, TK-ITI)
- `dosen` (Master 17 Dosen DSI)
- `profil_dosen` (Agregat statistik TA & publikasi)
- `kata_kunci_dosen` (Kata kunci keahlian per dosen dari bobot TF-IDF)
- `tugas_akhir` (625 riwayat judul TA)
- `bimbingan_ta` (707 relasi bimbingan many-to-many dosen & TA)
- `publikasi` (643 judul publikasi ilmiah)
- `publikasi_dosen` (Relasi many-to-many dosen & publikasi)
- `dokumen_pedoman` (Master daftar berkas PDF panduan akademik)
- `model_versi` (Metadata & metrik performa model)

*File SQL DDL & DML lengkap tersedia di:* `sirekta.sql`.

---

## 🛠️ Cara Menjalankan Aplikasi

### 1. Prasyarat
- **Laragon**: Pastikan service **MySQL** dan **Apache** sudah berjalan (**Start All**).
- **Python**: 3.10+ (sudah disiapkan di `backend/.venv`).
- **Node.js**: 18+ & npm (sudah diuji dengan Node 24 & Vite).

### 2. Jalankan Sistem Otomatis
Cukup klik dua kali berkas:
```cmd
run_system.bat
```
Berkas ini akan membuka dua jendela terminal:
- **Backend API**: `http://localhost:8000` (Dokumentasi Swagger: `http://localhost:8000/docs`)
- **Frontend Web**: `http://localhost:5173`

### 3. Menjalankan Manual
- **Backend**:
  ```cmd
  cd backend
  .\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
  ```
- **Frontend**:
  ```cmd
  cd frontend
  npm run dev
  ```
