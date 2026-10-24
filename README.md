# 🎓 SI-REKTA: Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir

[![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-orange.svg)](https://scikit-learn.org/)
[![NLP](https://img.shields.io/badge/NLP-TF--IDF%20%7C%20SVM-blue.svg)](https://github.com/accfd/SI-REKTA)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-61dafb.svg)](https://react.dev/)
[![PRISMA SLR](https://img.shields.io/badge/Review-PRISMA%20SLR-success.svg)](docs/SI-REKTA_SLR.md)
[![CRISP-ML(Q)](https://img.shields.io/badge/Methodology-CRISP--ML(Q)-purple.svg)](docs/SI-REKTA_CRISP_ML_Q.md)

**SI-REKTA** (*Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir*) adalah proyek tugas besar pada mata kuliah Machine Learning (Semester 5), Departemen Sistem Informasi. Sistem ini dibuat untuk menyelesaikan masalah nyata yang sering terjadi di jurusan, yaitu kebingungan mahasiswa dalam memilih dosen pembimbing yang tepat sesuai topik skripsi, serta proses pembagian (*plotting*) dosen yang memakan waktu lama dan membuat beban bimbingan antar-dosen menjadi tidak merata.

Cara kerja sistem ini menggunakan pemrosesan teks alami (*Natural Language Processing*) dan *Machine Learning*. Saat mahasiswa memasukkan usulan judul tugas akhir, sistem akan membersihkan teks tersebut, mengubah kata-kata menjadi representasi angka menggunakan TF-IDF (berdasarkan kata dan karakter), lalu memprediksi dosen yang cocok menggunakan model *Linear Support Vector Machine* (Linear SVM). Agar adil bagi dosen yang bimbingannya masih sedikit, model dilengkapi pembobotan kelas seimbang (*balanced class weighting*). Hasil prediksi kemudian diselaraskan dengan **riwayat judul tugas akhir yang pernah dibimbing oleh masing-masing dosen** untuk menghasilkan rekomendasi **Top-3 Dosen Pembimbing** yang paling sesuai, lengkap dengan persentase kecocokan dan kata kunci penentunya.

Sistem dirancang sebagai aplikasi web modern tiga tingkat (*Three-Tier Architecture*), yang menggabungkan tampilan web interaktif berbasis React/Vite, layanan API berbasis FastAPI (Python), dan basis data terstruktur. Seluruh kajian ilmiah dari 13 artikel bereputasi dapat dibaca pada [**`docs/SI-REKTA_SLR.md`**](docs/SI-REKTA_SLR.md), sedangkan panduan langkah kerja teknis model dijelaskan pada [**`docs/SI-REKTA_CRISP_ML_Q.md`**](docs/SI-REKTA_CRISP_ML_Q.md).

---

## 📂 Struktur Repositori

```text
SI-REKTA/
├── docs/
│   ├── Judul_TA.csv              # Dataset arsip 625 judul tugas akhir (2014-2026)
│   ├── SI-REKTA_SLR.md           # Laporan Tinjauan Pustaka PRISMA (Bab 1 - Bab 4)
│   ├── SI-REKTA_CRISP_ML_Q.md    # Kerangka Kerja & Metodologi CRISP-ML(Q)
│   ├── [FIKS] HASIL SLR 1.pdf    # Sumber ekstraksi literatur empiris (Part 1)
│   └── [FIKS] HASIL SLR 2.pdf    # Sumber ekstraksi literatur empiris & keputusan RQ (Part 2)
├── SI_REKTA_Modeling.ipynb       # Jupyter Notebook implementasi teknis CRISP-ML(Q)
├── README.md                     # Ringkasan proyek dan arsitektur sistem
└── .gitignore                    # Aturan pengabaian file cache & environment
```
