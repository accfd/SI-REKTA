import sys
sys.modules['pyarrow'] = None
import os
import csv
import json
import re
from pathlib import Path
import joblib
import numpy as np
from scipy.sparse import load_npz

BASE_DIR = Path(__file__).resolve().parent
DOCS_DIR = BASE_DIR / "docs"
MODEL_DIR = BASE_DIR / "model"
SQL_OUTPUT = BASE_DIR / "sirekta.sql"

# 1. Alias mapping untuk standardisasi nama pembimbing dari Judul_TA.csv
alias_dosen = {
    "Prof. Surya Afnarius": "Prof. Surya Afnarius, Ph.D.",
    "Prof. Surya Afnarius, P.Hd": "Prof. Surya Afnarius, Ph.D.",
    "Prof. Surya Afnarius, Ph.D": "Prof. Surya Afnarius, Ph.D.",
    "Prof. Surya Afnarius, PhD": "Prof. Surya Afnarius, Ph.D.",
    "Prof.Surya Afnarius,Ph.D": "Prof. Surya Afnarius, Ph.D.",
    "Afriyanti Dwi Kartika, MT": "Afriyanti Dwi Kartika, S.Pd., M.T.",
    "Dwi Welly Sukma N, MT": "Dwi Welly Sukma Nirad, M.T.",
    "Hafizah Hanim, M.Kom": "Hafizah Hanim, M.Kom.",
    "Haris Suryamen, M.Sc": "Haris Suryamen, M.Sc.",
    "Hasdi Putra, MT": "Hasdi Putra, M.T.",
    "Husnil Kamil, MT": "Husnil Kamil, M.T.",
    "Jefril Ramadoni,M.Kom": "Jefril Rahmadoni, M.Kom.",
    "Rahmatika Pratama S, MT": "Rahmatika Pratama Santi, M.T.",
    "Rahmatika Pratama, MT": "Rahmatika Pratama Santi, M.T.",
    "Ricky Akbar, M.Kom": "Ricky Akbar, M.Kom.",
    "Ricky Akbar, M.Sc": "Ricky Akbar, M.Kom.",
    "Ricky Akbar, M.kom": "Ricky Akbar, M.Kom.",
    "Ullya Mega Wahyuni, M.Kom": "Ullya Mega Wahyuni, M.Kom.",
    "Aina Hubby Aziira, M.Eng": "Aina Hubby Aziira, M.Eng.",
    "Adi Arga Arifnur, M.Kom": "Adi Arga Arifnur, M.Kom.",
    "Fajril Akbar, M.Sc": "Fajril Akbar, M.Sc.",
    "Fajril Akbar, M.Kom": "Fajril Akbar, M.Sc."
}

def standardisasi_nama(nama):
    if not nama:
        return None
    nama = str(nama).strip()
    if nama in ("", "-"):
        return None
    return alias_dosen.get(nama, nama)

def escape_sql(text):
    if text is None:
        return "NULL"
    s = str(text).replace("\\", "\\\\").replace("'", "''")
    return f"'{s}'"

def main():
    print("Membaca data dan metadata model...")
    with open(MODEL_DIR / "metadata_model.json", "r", encoding="utf-8") as f:
        meta = json.load(f)

    with open(MODEL_DIR / "daftar_profil_dosen.json", "r", encoding="utf-8") as f:
        profil_dosen_data = json.load(f)

    # 17 dosen terdaftar di model
    model_dosen_list = meta["urutan_nama_dosen"]
    dosen_id_map = {nama: idx + 1 for idx, nama in enumerate(model_dosen_list)}

    # Dosen -> Kelompok Keahlian mapping dari Publikasi_Dosen.csv
    kk_map = {
        "TK-ITI": (1, "Tata Kelola & Infrastruktur Teknologi Informasi"),
        "SD": (2, "Sistem Digital"),
        "RD-BI": (3, "Rekayasa Data & Business Intelligence"),
        "SE": (4, "Software Engineering")
    }

    dosen_kk_code = {}
    publikasi_records = []
    with open(DOCS_DIR / "Publikasi_Dosen.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter=";")
        for r in reader:
            d = r["nama_dosen"].strip()
            kk = r.get("kelompok_keahlian", "").strip()
            if d and kk and d not in dosen_kk_code:
                dosen_kk_code[d] = kk
            
            judul_pub = r.get("judul_publikasi", "").strip()
            tahun_pub = r.get("tahun", "").strip()
            try:
                tahun_pub = int(tahun_pub)
            except:
                tahun_pub = None
            if judul_pub:
                publikasi_records.append({
                    "judul": judul_pub,
                    "tahun": tahun_pub,
                    "nama_dosen": d
                })

    # Ekstraksi kata kunci dosen dari TF-IDF profil
    stopwords_id = {
        "dan", "di", "ke", "dari", "pada", "yang", "untuk", "dengan", "dalam",
        "atau", "oleh", "sebagai", "studi", "kasus", "berbasis", "sistem", "informasi",
        "aplikasi", "pembangunan", "analisis", "perancangan", "implementasi", "menggunakan",
        "metode", "model", "pengembangan", "pada", "ini", "itu", "terhadap", "web", "website"
    }

    vec = joblib.load(MODEL_DIR / "vectorizer.joblib")
    mat = load_npz(MODEL_DIR / "matriks_tfidf_profil_dosen.npz")
    feature_names = np.array(vec.get_feature_names_out())

    keywords_per_dosen = {}
    for i, nama in enumerate(model_dosen_list):
        row = mat[i].toarray().ravel()
        top_indices = np.argsort(row)[::-1]
        cur_kw = []
        for idx in top_indices:
            word = feature_names[idx]
            # filter jika hanya stopword murni
            tokens = word.split()
            if all(t in stopwords_id for t in tokens):
                continue
            cur_kw.append((word, round(float(row[idx]), 4)))
            if len(cur_kw) >= 8:
                break
        keywords_per_dosen[nama] = cur_kw

    # Membaca data TA dari Judul_TA.csv
    ta_records = []
    ta_bimbingan = [] # (id_ta, id_dosen, posisi)
    with open(DOCS_DIR / "Judul_TA.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter=";")
        for r in reader:
            judul = r.get("judul_ta", "").strip()
            if not judul:
                continue
            tahun = r.get("tahun", "").strip()
            try:
                tahun = int(tahun)
            except:
                tahun = None
            mhs = r.get("nama_mahasiswa", "").strip() or None
            nim = r.get("nim", "").strip() or None

            id_ta = len(ta_records) + 1
            ta_records.append({
                "id_ta": id_ta,
                "judul": judul,
                "tahun": tahun,
                "mhs": mhs,
                "nim": nim
            })

            # Pembimbing 1
            p1_raw = r.get("pembimbing_1", "")
            p1 = standardisasi_nama(p1_raw)
            if p1 in dosen_id_map:
                ta_bimbingan.append((id_ta, dosen_id_map[p1], 1))

            # Pembimbing 2
            p2_raw = r.get("pembimbing_2", "")
            p2 = standardisasi_nama(p2_raw)
            if p2 in dosen_id_map:
                ta_bimbingan.append((id_ta, dosen_id_map[p2], 2))

    # Memulai pembentukan SQL
    sql_lines = []
    sql_lines.append("-- =============================================================")
    sql_lines.append("-- DATABASE SI-REKTA (Sistem Rekomendasi Dosen Pembimbing TA)")
    sql_lines.append("-- Skema Ternormalisasi (3NF) & Data Master/Referensi Lengkap")
    sql_lines.append("-- =============================================================")
    sql_lines.append("CREATE DATABASE IF NOT EXISTS `sirekta_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
    sql_lines.append("USE `sirekta_db`;\n")

    sql_lines.append("SET FOREIGN_KEY_CHECKS = 0;")
    tables = [
        "bimbingan_ta", "tugas_akhir", "publikasi_dosen", "publikasi",
        "kata_kunci_dosen", "profil_dosen", "dosen", "kelompok_keahlian",
        "dokumen_pedoman", "model_versi"
    ]
    for t in tables:
        sql_lines.append(f"DROP TABLE IF EXISTS `{t}`;")
    sql_lines.append("SET FOREIGN_KEY_CHECKS = 1;\n")

    # 1. kelompok_keahlian
    sql_lines.append("""
CREATE TABLE `kelompok_keahlian` (
  `id_kk` INT AUTO_INCREMENT PRIMARY KEY,
  `kode_kk` VARCHAR(20) NOT NULL UNIQUE,
  `nama_kk` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    for kode, (id_k, nama_k) in kk_map.items():
        sql_lines.append(f"INSERT INTO `kelompok_keahlian` (`id_kk`, `kode_kk`, `nama_kk`) VALUES ({id_k}, {escape_sql(kode)}, {escape_sql(nama_k)});")

    # 2. dosen
    sql_lines.append("""
CREATE TABLE `dosen` (
  `id_dosen` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_lengkap` VARCHAR(150) NOT NULL UNIQUE,
  `id_kk` INT DEFAULT NULL,
  `termasuk_model` BOOLEAN DEFAULT TRUE,
  CONSTRAINT `fk_dosen_kk` FOREIGN KEY (`id_kk`) REFERENCES `kelompok_keahlian` (`id_kk`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    for nama in model_dosen_list:
        id_d = dosen_id_map[nama]
        kode_kk = dosen_kk_code.get(nama)
        id_kk = kk_map[kode_kk][0] if kode_kk in kk_map else "NULL"
        sql_lines.append(f"INSERT INTO `dosen` (`id_dosen`, `nama_lengkap`, `id_kk`, `termasuk_model`) VALUES ({id_d}, {escape_sql(nama)}, {id_kk}, TRUE);")

    # 3. profil_dosen
    sql_lines.append("""
CREATE TABLE `profil_dosen` (
  `id_profil` INT AUTO_INCREMENT PRIMARY KEY,
  `id_dosen` INT NOT NULL UNIQUE,
  `jumlah_ta` INT DEFAULT 0,
  `jumlah_publikasi` INT DEFAULT 0,
  `is_publikasi_only` BOOLEAN DEFAULT FALSE,
  CONSTRAINT `fk_profil_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    profil_lookup = {item["nama_dosen"]: item for item in profil_dosen_data}
    for nama in model_dosen_list:
        id_d = dosen_id_map[nama]
        p = profil_lookup.get(nama, {})
        ta_cnt = p.get("tugas_akhir", 0)
        pub_cnt = p.get("publikasi", 0)
        pub_only = "TRUE" if ta_cnt == 0 else "FALSE"
        sql_lines.append(f"INSERT INTO `profil_dosen` (`id_dosen`, `jumlah_ta`, `jumlah_publikasi`, `is_publikasi_only`) VALUES ({id_d}, {ta_cnt}, {pub_cnt}, {pub_only});")

    # 4. kata_kunci_dosen
    sql_lines.append("""
CREATE TABLE `kata_kunci_dosen` (
  `id_kata_kunci` INT AUTO_INCREMENT PRIMARY KEY,
  `id_dosen` INT NOT NULL,
  `kata_kunci` VARCHAR(100) NOT NULL,
  `bobot_tfidf` FLOAT NOT NULL,
  CONSTRAINT `fk_kata_kunci_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    for nama, kw_list in keywords_per_dosen.items():
        id_d = dosen_id_map[nama]
        for kw, w in kw_list:
            sql_lines.append(f"INSERT INTO `kata_kunci_dosen` (`id_dosen`, `kata_kunci`, `bobot_tfidf`) VALUES ({id_d}, {escape_sql(kw)}, {w});")

    # 5. tugas_akhir
    sql_lines.append("""
CREATE TABLE `tugas_akhir` (
  `id_ta` INT AUTO_INCREMENT PRIMARY KEY,
  `judul_ta` TEXT NOT NULL,
  `tahun` INT DEFAULT NULL,
  `nama_mahasiswa` VARCHAR(150) DEFAULT NULL,
  `nim` VARCHAR(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    for ta in ta_records:
        th = ta['tahun'] if ta['tahun'] is not None else "NULL"
        sql_lines.append(f"INSERT INTO `tugas_akhir` (`id_ta`, `judul_ta`, `tahun`, `nama_mahasiswa`, `nim`) VALUES ({ta['id_ta']}, {escape_sql(ta['judul'])}, {th}, {escape_sql(ta['mhs'])}, {escape_sql(ta['nim'])});")

    # 6. bimbingan_ta (Junction Table)
    sql_lines.append("""
CREATE TABLE `bimbingan_ta` (
  `id_bimbingan` INT AUTO_INCREMENT PRIMARY KEY,
  `id_ta` INT NOT NULL,
  `id_dosen` INT NOT NULL,
  `posisi_pembimbing` TINYINT NOT NULL,
  CONSTRAINT `fk_bimbingan_ta` FOREIGN KEY (`id_ta`) REFERENCES `tugas_akhir` (`id_ta`) ON DELETE CASCADE,
  CONSTRAINT `fk_bimbingan_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    for id_ta, id_dosen, pos in ta_bimbingan:
        sql_lines.append(f"INSERT INTO `bimbingan_ta` (`id_ta`, `id_dosen`, `posisi_pembimbing`) VALUES ({id_ta}, {id_dosen}, {pos});")

    # 7. publikasi
    sql_lines.append("""
CREATE TABLE `publikasi` (
  `id_publikasi` INT AUTO_INCREMENT PRIMARY KEY,
  `judul_publikasi` TEXT NOT NULL,
  `tahun` INT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    # 8. publikasi_dosen (Junction Table)
    sql_lines.append("""
CREATE TABLE `publikasi_dosen` (
  `id_relasi` INT AUTO_INCREMENT PRIMARY KEY,
  `id_publikasi` INT NOT NULL,
  `id_dosen` INT NOT NULL,
  CONSTRAINT `fk_pub_relasi_pub` FOREIGN KEY (`id_publikasi`) REFERENCES `publikasi` (`id_publikasi`) ON DELETE CASCADE,
  CONSTRAINT `fk_pub_relasi_dosen` FOREIGN KEY (`id_dosen`) REFERENCES `dosen` (`id_dosen`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    pub_insert_lines = []
    pub_relasi_lines = []
    for idx, pub in enumerate(publikasi_records, 1):
        th = pub['tahun'] if pub['tahun'] is not None else "NULL"
        pub_insert_lines.append(f"INSERT INTO `publikasi` (`id_publikasi`, `judul_publikasi`, `tahun`) VALUES ({idx}, {escape_sql(pub['judul'])}, {th});")
        d_name = pub['nama_dosen']
        if d_name in dosen_id_map:
            id_d = dosen_id_map[d_name]
            pub_relasi_lines.append(f"INSERT INTO `publikasi_dosen` (`id_publikasi`, `id_dosen`) VALUES ({idx}, {id_d});")

    sql_lines.extend(pub_insert_lines)
    sql_lines.extend(pub_relasi_lines)

    # 9. dokumen_pedoman
    sql_lines.append("""
CREATE TABLE `dokumen_pedoman` (
  `id_dokumen` INT AUTO_INCREMENT PRIMARY KEY,
  `judul_dokumen` VARCHAR(150) NOT NULL,
  `nama_file_pdf` VARCHAR(150) NOT NULL,
  `keterangan` TEXT DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    sql_lines.append(f"INSERT INTO `dokumen_pedoman` (`id_dokumen`, `judul_dokumen`, `nama_file_pdf`, `keterangan`) VALUES (1, 'Pedoman Tugas Akhir', 'PANDUAN TUGAS AKHIR DSI 2025.pdf', 'Dokumen pedoman pelaksanaan tugas akhir Departemen Sistem Informasi 2025');")
    sql_lines.append(f"INSERT INTO `dokumen_pedoman` (`id_dokumen`, `judul_dokumen`, `nama_file_pdf`, `keterangan`) VALUES (2, 'Pedoman Topik Tugas Akhir DSI', 'PEDOMAN TOPIK TUGAS AKHIR DSI 2025.pdf', 'Dokumen pedoman bidang minat dan topik tugas akhir DSI 2025');")

    # 10. model_versi
    sql_lines.append("""
CREATE TABLE `model_versi` (
  `id_versi` INT AUTO_INCREMENT PRIMARY KEY,
  `nama_model` VARCHAR(50) NOT NULL,
  `metode_pembobotan` VARCHAR(50) NOT NULL,
  `metode_pemeringkatan` VARCHAR(50) NOT NULL,
  `hit_rate_at_3` FLOAT NOT NULL,
  `recall_at_3` FLOAT NOT NULL,
  `mrr_at_3` FLOAT NOT NULL,
  `precision_at_3` FLOAT NOT NULL,
  `tanggal_rilis` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
""")

    metrik = meta.get("metrik_evaluasi", {})
    sql_lines.append(f"INSERT INTO `model_versi` (`nama_model`, `metode_pembobotan`, `metode_pemeringkatan`, `hit_rate_at_3`, `recall_at_3`, `mrr_at_3`, `precision_at_3`) VALUES ({escape_sql(meta.get('nama_model', 'SI-REKTA'))}, {escape_sql(meta.get('metode_pembobotan', 'TF-IDF'))}, {escape_sql(meta.get('metode_pemeringkatan', 'Cosine Similarity'))}, {metrik.get('Hit Rate@3', 0.7966)}, {metrik.get('Recall@3', 0.7542)}, {metrik.get('MRR@3', 0.6031)}, {metrik.get('Precision@3', 0.3051)});")

    with open(SQL_OUTPUT, "w", encoding="utf-8") as f:
        f.write("\n".join(sql_lines) + "\n")

    print(f"Sukses meng-generate file SQL: {SQL_OUTPUT}")
    print(f"- Total Judul TA: {len(ta_records)}")
    print(f"- Total Relasi Bimbingan TA: {len(ta_bimbingan)}")
    print(f"- Total Publikasi: {len(publikasi_records)}")

if __name__ == "__main__":
    main()
