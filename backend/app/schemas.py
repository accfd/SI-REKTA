from pydantic import BaseModel, Field
from typing import List, Optional

class RecommendRequest(BaseModel):
    judul: str = Field(..., description="Judul atau rencana topik tugas akhir")

class LecturerCardResponse(BaseModel):
    peringkat: int
    id_dosen: int
    nama_dosen: str
    inisial: str
    kode_kk: Optional[str] = None
    nama_kk: Optional[str] = None
    jumlah_ta: int
    jumlah_publikasi: int
    is_publikasi_only: bool
    kata_kunci_keahlian: List[str]
    kata_kunci_cocok: List[str]

class RecommendResponse(BaseModel):
    judul_input: str
    kata_kunci_kueri: List[str]
    rekomendasi: List[LecturerCardResponse]
    is_low_confidence: bool
    message: Optional[str] = None

class DosenItem(BaseModel):
    id_dosen: int
    nama_lengkap: str
    inisial: str
    kode_kk: Optional[str] = None
    nama_kk: Optional[str] = None
    jumlah_ta: int
    jumlah_publikasi: int
    total_dokumen: int
    is_publikasi_only: bool
    kata_kunci: List[str]

class LecturerTADocument(BaseModel):
    id_ta: int
    judul_ta: str
    tahun: Optional[int] = None
    nama_mahasiswa: Optional[str] = None
    nim: Optional[str] = None
    posisi_pembimbing: int

class LecturerPublicationDocument(BaseModel):
    id_publikasi: int
    judul_publikasi: str
    tahun: Optional[int] = None

class LecturerDetailResponse(BaseModel):
    id_dosen: int
    nama_lengkap: str
    inisial: str
    kode_kk: Optional[str] = None
    nama_kk: Optional[str] = None
    jumlah_ta: int
    jumlah_publikasi: int
    is_publikasi_only: bool
    kata_kunci: List[str]
    tugas_akhir: List[LecturerTADocument]
    publikasi: List[LecturerPublicationDocument]

class DokumenItem(BaseModel):
    id_dokumen: int
    judul_dokumen: str
    nama_file_pdf: str
    keterangan: Optional[str] = None

class ModelInfoResponse(BaseModel):
    nama_model: str
    metode_pembobotan: str
    metode_pemeringkatan: str
    jumlah_dosen: int
    jumlah_fitur_tfidf: int
    total_riwayat_ta: int
    total_publikasi: int
    hit_rate_at_3: float
    recall_at_3: float
    mrr_at_3: float
