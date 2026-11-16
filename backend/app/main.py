import sys
sys.modules['pyarrow'] = None

from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.config import DOCS_DIR
from app.database import get_db, engine, Base
from app import models, schemas
from app.preprocessor import validasi_judul
from app.recommender import recommender_engine

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Memuat model sekali saat startup server
    try:
        recommender_engine.load()
    except Exception as e:
        print(f"Warning: Gagal memuat artefak model saat startup: {e}")
    yield

app = FastAPI(
    title="SI-REKTA API",
    description="Backend API Sistem Rekomendasi Dosen Pembimbing Tugas Akhir (DSI)",
    version="1.1.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def dapatkan_inisial(nama: str) -> str:
    """Mendapatkan inisial 2-3 huruf dari nama dosen."""
    clean = nama.replace("Prof.", "").replace("Ph.D.", "").replace("M.Kom.", "").replace("M.T.", "").replace("M.Sc.", "").replace("M.Eng.", "").replace("S.Pd.", "")
    parts = [p.strip() for p in clean.split() if p.strip()]
    if not parts:
        return "DS"
    if len(parts) == 1:
        return parts[0][:2].upper()
    return (parts[0][0] + parts[1][0]).upper()

@app.get("/")
def root():
    return {
        "status": "online",
        "service": "SI-REKTA Backend API",
        "database": "MySQL (Laragon) connected"
    }

@app.post("/api/recommend", response_model=schemas.RecommendResponse)
def get_recommendation(payload: schemas.RecommendRequest, db: Session = Depends(get_db)):
    is_valid, err_msg = validasi_judul(payload.judul)
    if not is_valid:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=err_msg
        )

    try:
        top_recs, kata_kunci_kueri, is_low = recommender_engine.recommend(payload.judul, top_n=3)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Layanan rekomendasi sedang tidak tersedia: {str(e)}"
        )

    if not top_recs:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Rekomendasi tidak ditemukan untuk judul yang dimasukkan."
        )

    rekomendasi_output = []
    for r in top_recs:
        nama_dosen = r["nama_dosen"]
        dosen_obj = db.query(models.Dosen).filter(models.Dosen.nama_lengkap == nama_dosen).first()
        if not dosen_obj:
            continue

        profil_obj = dosen_obj.profil
        kk_obj = dosen_obj.kelompok_keahlian

        kw_objs = db.query(models.KataKunciDosen).filter(
            models.KataKunciDosen.id_dosen == dosen_obj.id_dosen
        ).order_by(models.KataKunciDosen.bobot_tfidf.desc()).limit(5).all()
        kata_kunci_keahlian = [k.kata_kunci for k in kw_objs]

        rekomendasi_output.append(schemas.LecturerCardResponse(
            peringkat=r["peringkat"],
            id_dosen=dosen_obj.id_dosen,
            nama_dosen=dosen_obj.nama_lengkap,
            inisial=dapatkan_inisial(dosen_obj.nama_lengkap),
            kode_kk=kk_obj.kode_kk if kk_obj else None,
            nama_kk=kk_obj.nama_kk if kk_obj else None,
            jumlah_ta=profil_obj.jumlah_ta if profil_obj else 0,
            jumlah_publikasi=profil_obj.jumlah_publikasi if profil_obj else 0,
            is_publikasi_only=profil_obj.is_publikasi_only if profil_obj else False,
            kata_kunci_keahlian=kata_kunci_keahlian,
            kata_kunci_cocok=r["kata_kunci_cocok"]
        ))

    return schemas.RecommendResponse(
        judul_input=payload.judul,
        kata_kunci_kueri=kata_kunci_kueri[:8],
        rekomendasi=rekomendasi_output,
        is_low_confidence=is_low,
        message="Hasil kurang meyakinkan karena sedikit istilah yang dikenali model." if is_low else None
    )

@app.get("/api/dosen", response_model=list[schemas.DosenItem])
def get_all_dosen(db: Session = Depends(get_db)):
    dosen_list = db.query(models.Dosen).filter(models.Dosen.termasuk_model == True).all()
    output = []
    for d in dosen_list:
        profil = d.profil
        kk = d.kelompok_keahlian
        ta_cnt = profil.jumlah_ta if profil else 0
        pub_cnt = profil.jumlah_publikasi if profil else 0
        
        kw_objs = db.query(models.KataKunciDosen).filter(
            models.KataKunciDosen.id_dosen == d.id_dosen
        ).order_by(models.KataKunciDosen.bobot_tfidf.desc()).limit(6).all()
        
        output.append(schemas.DosenItem(
            id_dosen=d.id_dosen,
            nama_lengkap=d.nama_lengkap,
            inisial=dapatkan_inisial(d.nama_lengkap),
            kode_kk=kk.kode_kk if kk else None,
            nama_kk=kk.nama_kk if kk else None,
            jumlah_ta=ta_cnt,
            jumlah_publikasi=pub_cnt,
            total_dokumen=ta_cnt + pub_cnt,
            is_publikasi_only=profil.is_publikasi_only if profil else False,
            kata_kunci=[k.kata_kunci for k in kw_objs]
        ))

    output.sort(key=lambda x: x.nama_lengkap)
    return output

@app.get("/api/dosen/{dosen_id}/documents", response_model=schemas.LecturerDetailResponse)
def get_dosen_documents(dosen_id: int, db: Session = Depends(get_db)):
    """Mengambil rincian seluruh judul bimbingan TA dan publikasi dari dosen tertentu."""
    dosen = db.query(models.Dosen).filter(models.Dosen.id_dosen == dosen_id).first()
    if not dosen:
        raise HTTPException(status_code=404, detail="Dosen tidak ditemukan.")

    profil = dosen.profil
    kk = dosen.kelompok_keahlian

    # Ambil seluruh judul TA yang pernah dibimbing
    bimbingan_list = db.query(models.BimbinganTA).filter(
        models.BimbinganTA.id_dosen == dosen_id
    ).all()

    ta_output = []
    for b in bimbingan_list:
        ta = b.tugas_akhir
        if ta:
            ta_output.append(schemas.LecturerTADocument(
                id_ta=ta.id_ta,
                judul_ta=ta.judul_ta,
                tahun=ta.tahun,
                nama_mahasiswa=ta.nama_mahasiswa,
                nim=ta.nim,
                posisi_pembimbing=b.posisi_pembimbing
            ))
    # Urutkan TA berdasarkan tahun terbaru
    ta_output.sort(key=lambda x: (x.tahun or 0, x.id_ta), reverse=True)

    # Ambil seluruh publikasi dosen
    publikasi_relasi = db.query(models.PublikasiDosen).filter(
        models.PublikasiDosen.id_dosen == dosen_id
    ).all()

    pub_output = []
    for pr in publikasi_relasi:
        p = pr.publikasi
        if p:
            pub_output.append(schemas.LecturerPublicationDocument(
                id_publikasi=p.id_publikasi,
                judul_publikasi=p.judul_publikasi,
                tahun=p.tahun
            ))
    # Urutkan publikasi berdasarkan tahun terbaru
    pub_output.sort(key=lambda x: (x.tahun or 0, x.id_publikasi), reverse=True)

    kw_objs = db.query(models.KataKunciDosen).filter(
        models.KataKunciDosen.id_dosen == dosen_id
    ).order_by(models.KataKunciDosen.bobot_tfidf.desc()).limit(8).all()

    return schemas.LecturerDetailResponse(
        id_dosen=dosen.id_dosen,
        nama_lengkap=dosen.nama_lengkap,
        inisial=dapatkan_inisial(dosen.nama_lengkap),
        kode_kk=kk.kode_kk if kk else None,
        nama_kk=kk.nama_kk if kk else None,
        jumlah_ta=profil.jumlah_ta if profil else 0,
        jumlah_publikasi=profil.jumlah_publikasi if profil else 0,
        is_publikasi_only=profil.is_publikasi_only if profil else False,
        kata_kunci=[k.kata_kunci for k in kw_objs],
        tugas_akhir=ta_output,
        publikasi=pub_output
    )

@app.get("/api/info", response_model=schemas.ModelInfoResponse)
def get_model_info(db: Session = Depends(get_db)):
    versi = db.query(models.ModelVersi).order_by(models.ModelVersi.id_versi.desc()).first()
    if not versi:
        raise HTTPException(status_code=404, detail="Data versi model tidak ditemukan.")

    tot_ta = db.query(func.count(models.TugasAkhir.id_ta)).scalar() or 0
    tot_pub = db.query(func.count(models.Publikasi.id_publikasi)).scalar() or 0
    tot_dosen = db.query(func.count(models.Dosen.id_dosen)).filter(models.Dosen.termasuk_model == True).scalar() or 0

    return schemas.ModelInfoResponse(
        nama_model=versi.nama_model,
        metode_pembobotan=versi.metode_pembobotan,
        metode_pemeringkatan=versi.metode_pemeringkatan,
        jumlah_dosen=tot_dosen,
        jumlah_fitur_tfidf=12364,
        total_riwayat_ta=tot_ta,
        total_publikasi=tot_pub,
        hit_rate_at_3=round(versi.hit_rate_at_3 * 100, 2),
        recall_at_3=round(versi.recall_at_3 * 100, 2),
        mrr_at_3=round(versi.mrr_at_3, 2)
    )

@app.get("/api/documents", response_model=list[schemas.DokumenItem])
def get_documents(db: Session = Depends(get_db)):
    docs = db.query(models.DokumenPedoman).all()
    return [
        schemas.DokumenItem(
            id_dokumen=d.id_dokumen,
            judul_dokumen=d.judul_dokumen,
            nama_file_pdf=d.nama_file_pdf,
            keterangan=d.keterangan
        )
        for d in docs
    ]

@app.get("/api/documents/{doc_id}/stream")
def stream_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.DokumenPedoman).filter(models.DokumenPedoman.id_dokumen == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Dokumen pedoman tidak ditemukan.")

    file_path = DOCS_DIR / doc.nama_file_pdf
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File PDF tidak ditemukan di server.")

    # content_disposition_type='inline' AGAR BISA DITAMPILKAN LANGSUNG DI DALAM BROWSER WEB
    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        content_disposition_type="inline"
    )

@app.get("/api/documents/{doc_id}/download")
def download_document(doc_id: int, db: Session = Depends(get_db)):
    doc = db.query(models.DokumenPedoman).filter(models.DokumenPedoman.id_dokumen == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Dokumen pedoman tidak ditemukan.")

    file_path = DOCS_DIR / doc.nama_file_pdf
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File PDF tidak ditemukan di server.")

    return FileResponse(
        path=file_path,
        media_type="application/pdf",
        filename=doc.nama_file_pdf,
        content_disposition_type="attachment"
    )
