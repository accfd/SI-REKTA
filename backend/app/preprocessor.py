import re
from typing import Tuple

# Kamus Hybrid Domain-Specific Academic Stopwords (Identik dengan Cell 33 SIREKTA.ipynb)
STOPWORDS = {
    # 1. Preposisi, Konjungsi & Kata Hubung (ID & EN)
    "dan", "di", "ke", "dari", "pada", "untuk", "dengan", "dalam", "yang", 
    "terhadap", "tentang", "atau", "oleh", "sebagai", "ini", "itu", "bagi",
    "of", "in", "the", "and", "for", "on", "with", "by", "at", "to", "from", 
    "as", "an", "a", "is", "are", "into", "through", "about", "via", "towards",

    # 2. Templat Prosedural & Kata Kerja Skripsi (ID & EN)
    "pembangunan", "rancang", "bangun", "pengembangan", "pembuatan", "perancangan",
    "penerapan", "implementasi", "analisis", "analisa", "evaluasi", "pemodelan",
    "menggunakan", "metode", "berbasis", "studi", "kasus", "fitur", "aplikasi",
    "using", "based", "study", "case", "analysis", "approach", "implementation", 
    "development", "evaluation", "design", "review",

    # 3. Entitas Institusi, Lokasi, dan Istilah Umum Jurusan
    "sistem", "informasi", "system", "information",
    "universitas", "andalas", "unand", "fakultas", "teknologi", "jurusan", "departemen",
    "padang", "kota", "provinsi", "sumatera", "barat", "indonesia",
    "dinas", "pt", "cv", "kantor", "instansi"
}

def bersihkan_teks(teks: str) -> str:
    """
    Membersihkan teks dan menyaring kata-kata stopword bilingual (Indonesia & Inggris)
    serta entitas umum kampus/administratif agar kueri pencarian hanya memuat
    istilah keahlian/domain yang relevan.
    """
    if not teks:
        return ""
    teks = str(teks).lower()
    # Hapus URL
    teks = re.sub(r"https?://\S+|www\.\S+", " ", teks)
    # Hapus tanda baca / karakter non-alfanumerik
    teks = re.sub(r"[^\w\s]", " ", teks, flags=re.UNICODE)
    teks = teks.replace("_", " ")
    
    # Filter stopwords dan token dengan panjang <= 1
    tokens = [t for t in teks.split() if t not in STOPWORDS and len(t) > 1]
    teks_bersih = " ".join(tokens)
    # Jika seluruh kata terfilter sebagai stopword, kembalikan teks normalisasi asli
    return teks_bersih if teks_bersih else re.sub(r"\s+", " ", teks).strip()

def validasi_judul(judul: str) -> Tuple[bool, str]:
    """
    Validasi judul sesuai aturan SRS FR-03:
    - Tidak boleh kosong
    - Minimal 6 kata
    """
    if not judul or not str(judul).strip():
        return False, "Judul tidak boleh kosong."

    kata_kata = [k for k in str(judul).strip().split() if k]
    if len(kata_kata) < 6:
        return False, "Judul terlalu pendek, tulis minimal 6 kata."

    return True, ""
