# 🎓 SI-REKTA: Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir

[![Machine Learning](https://img.shields.io/badge/ML-Scikit--Learn-orange.svg)](https://scikit-learn.org/)
[![NLP](https://img.shields.io/badge/NLP-TF--IDF%20%7C%20SVM-blue.svg)](https://github.com/accfd/SI-REKTA)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-teal.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-61dafb.svg)](https://react.dev/)
[![PRISMA SLR](https://img.shields.io/badge/Review-PRISMA%20SLR-success.svg)](docs/SI-REKTA_SLR.md)
[![CRISP-ML(Q)](https://img.shields.io/badge/Methodology-CRISP--ML(Q)-purple.svg)](docs/SI-REKTA_CRISP_ML_Q.md)

**SI-REKTA** (*Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir*) adalah proyek tugas besar terintegrasi pada mata kuliah Machine Learning (Semester 5), Departemen Sistem Informasi. Sistem ini dirancang untuk memecahkan permasalahan nyata di perguruan tinggi, yaitu ketidakcocokan antara rencana topik tugas akhir mahasiswa dengan kepakaran riset dosen serta proses penentuan (*plotting*) pembimbing yang sering kali memakan waktu lama dan menimbulkan ketimpangan beban bimbingan.

Sistem bekerja dengan memanfaatkan pendekatan *Natural Language Processing* (NLP) dan *Supervised Machine Learning*. Ketika mahasiswa memasukkan usulan draf judul tugas akhir berbahasa Indonesia, sistem melakukan prapengolahan teks, ekstraksi fitur leksikal berbasis TF-IDF (*word & character n-gram*), dan klasifikasi menggunakan model *Linear Support Vector Machine* (Linear SVM) dengan pembobotan kelas seimbang (*balanced class weighting*). Hasil prediksi kemudian diperhalus melalui *hybrid cosine similarity gate* terhadap dokumen rekam jejak riset dosen untuk menghasilkan rekomendasi **Top-3 Dosen Pembimbing** yang paling relevan secara semantik, objektif, dan transparan.

Pengembangan sistem dipandu oleh metodologi modern **CRISP-ML(Q)** (*Cross-Industry Standard Process for Machine Learning with Quality Assurance*), mencakup arsitektur web modern tiga tingkat (*Three-Tier Architecture*) yang terdiri atas antarmuka interaktif berbasis React/Vite, layanan RESTful API cepat berbasis FastAPI (Python), dan basis data terstruktur. Seluruh landasan ilmiah dapat ditinjau pada [**`docs/SI-REKTA_SLR.md`**](docs/SI-REKTA_SLR.md), sedangkan kerangka operasional teknis model dipaparkan pada [**`docs/SI-REKTA_CRISP_ML_Q.md`**](docs/SI-REKTA_CRISP_ML_Q.md).

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
├── README.md                     # Ringkasan singkat proyek & arsitektur sistem
└── .gitignore                    # Aturan pengabaian file cache & environment
```
