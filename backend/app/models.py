from sqlalchemy import Column, Integer, String, Text, Boolean, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base

class KelompokKeahlian(Base):
    __tablename__ = "kelompok_keahlian"

    id_kk = Column(Integer, primary_key=True, index=True, autoincrement=True)
    kode_kk = Column(String(20), unique=True, nullable=False)
    nama_kk = Column(String(100), nullable=False)

    dosen = relationship("Dosen", back_populates="kelompok_keahlian")

class Dosen(Base):
    __tablename__ = "dosen"

    id_dosen = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama_lengkap = Column(String(150), unique=True, nullable=False)
    id_kk = Column(Integer, ForeignKey("kelompok_keahlian.id_kk", ondelete="SET NULL"), nullable=True)
    termasuk_model = Column(Boolean, default=True)

    kelompok_keahlian = relationship("KelompokKeahlian", back_populates="dosen")
    profil = relationship("ProfilDosen", back_populates="dosen", uselist=False)
    kata_kunci = relationship("KataKunciDosen", back_populates="dosen")
    bimbingan = relationship("BimbinganTA", back_populates="dosen")
    publikasi_relasi = relationship("PublikasiDosen", back_populates="dosen")

class ProfilDosen(Base):
    __tablename__ = "profil_dosen"

    id_profil = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_dosen = Column(Integer, ForeignKey("dosen.id_dosen", ondelete="CASCADE"), unique=True, nullable=False)
    jumlah_ta = Column(Integer, default=0)
    jumlah_publikasi = Column(Integer, default=0)
    is_publikasi_only = Column(Boolean, default=False)

    dosen = relationship("Dosen", back_populates="profil")

class KataKunciDosen(Base):
    __tablename__ = "kata_kunci_dosen"

    id_kata_kunci = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_dosen = Column(Integer, ForeignKey("dosen.id_dosen", ondelete="CASCADE"), nullable=False)
    kata_kunci = Column(String(100), nullable=False)
    bobot_tfidf = Column(Float, nullable=False)

    dosen = relationship("Dosen", back_populates="kata_kunci")

class TugasAkhir(Base):
    __tablename__ = "tugas_akhir"

    id_ta = Column(Integer, primary_key=True, index=True, autoincrement=True)
    judul_ta = Column(Text, nullable=False)
    tahun = Column(Integer, nullable=True)
    nama_mahasiswa = Column(String(150), nullable=True)
    nim = Column(String(30), nullable=True)

    bimbingan = relationship("BimbinganTA", back_populates="tugas_akhir")

class BimbinganTA(Base):
    __tablename__ = "bimbingan_ta"

    id_bimbingan = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_ta = Column(Integer, ForeignKey("tugas_akhir.id_ta", ondelete="CASCADE"), nullable=False)
    id_dosen = Column(Integer, ForeignKey("dosen.id_dosen", ondelete="CASCADE"), nullable=False)
    posisi_pembimbing = Column(Integer, nullable=False)

    tugas_akhir = relationship("TugasAkhir", back_populates="bimbingan")
    dosen = relationship("Dosen", back_populates="bimbingan")

class Publikasi(Base):
    __tablename__ = "publikasi"

    id_publikasi = Column(Integer, primary_key=True, index=True, autoincrement=True)
    judul_publikasi = Column(Text, nullable=False)
    tahun = Column(Integer, nullable=True)

    relasi_dosen = relationship("PublikasiDosen", back_populates="publikasi")

class PublikasiDosen(Base):
    __tablename__ = "publikasi_dosen"

    id_relasi = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_publikasi = Column(Integer, ForeignKey("publikasi.id_publikasi", ondelete="CASCADE"), nullable=False)
    id_dosen = Column(Integer, ForeignKey("dosen.id_dosen", ondelete="CASCADE"), nullable=False)

    publikasi = relationship("Publikasi", back_populates="relasi_dosen")
    dosen = relationship("Dosen", back_populates="publikasi_relasi")

class DokumenPedoman(Base):
    __tablename__ = "dokumen_pedoman"

    id_dokumen = Column(Integer, primary_key=True, index=True, autoincrement=True)
    judul_dokumen = Column(String(150), nullable=False)
    nama_file_pdf = Column(String(150), nullable=False)
    keterangan = Column(Text, nullable=True)

class ModelVersi(Base):
    __tablename__ = "model_versi"

    id_versi = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nama_model = Column(String(50), nullable=False)
    metode_pembobotan = Column(String(50), nullable=False)
    metode_pemeringkatan = Column(String(50), nullable=False)
    hit_rate_at_3 = Column(Float, nullable=False)
    recall_at_3 = Column(Float, nullable=False)
    mrr_at_3 = Column(Float, nullable=False)
    precision_at_3 = Column(Float, nullable=False)
    tanggal_rilis = Column(DateTime, default=func.now())
