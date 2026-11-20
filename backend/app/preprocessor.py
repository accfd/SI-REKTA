import re
from typing import Tuple

# Daftar Stop Words Tambahan (English & Academic Noise, serta Indonesian Prepositions & Noise)
STOPWORDS = {
    # English Prepositions & Conjunctions
    "of", "in", "the", "and", "for", "on", "with", "by", "at", "to", "from",
    "as", "an", "a", "is", "are", "was", "were", "into", "through", "about",
    "between", "after", "before", "above", "under", "than", "this", "that",
    "it", "its", "their", "or", "be", "been", "being", "have", "has", "had",
    # English Academic & Neutral Noise
    "using", "based", "study", "case", "analysis", "approach", "implementation",
    "development", "evaluation", "via", "towards", "review",
    # Indonesian Prepositions, Conjunctions & Generic Noise
    "bagi", "pada", "untuk", "dengan", "dalam", "dan", "dari", "yang",
    "terhadap", "tentang", "kota", "kabupaten", "provinsi", "di", "ke",
    "atau", "oleh", "sebagai", "ini", "itu"
}

def bersihkan_teks(teks: str) -> str:
    """
    Membersihkan teks dan menyaring kata-kata stopword bilingual (Indonesia & Inggris)
    agar kueri pencarian hanya memuat istilah keahlian/domain yang relevan.
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
