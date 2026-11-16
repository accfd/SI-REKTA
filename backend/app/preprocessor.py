import re
from typing import Tuple

def bersihkan_teks(teks: str) -> str:
    """Membersihkan teks sesuai pipeline notebook SI-REKTA."""
    if not teks:
        return ""
    teks = str(teks).lower()
    # Hapus URL
    teks = re.sub(r"https?://\S+|www\.\S+", " ", teks)
    # Hapus tanda baca / karakter non-alfanumerik
    teks = re.sub(r"[^\w\s]", " ", teks, flags=re.UNICODE)
    teks = teks.replace("_", " ")
    # Normalisasi multi spasi
    teks = re.sub(r"\s+", " ", teks).strip()
    return teks

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
