import sys
sys.modules['pyarrow'] = None

import json
from pathlib import Path
import numpy as np
import joblib
from scipy.sparse import load_npz
from sklearn.metrics.pairwise import cosine_similarity
from app.config import MODEL_DIR
from app.preprocessor import bersihkan_teks

class RecommenderEngine:
    def __init__(self):
        self.vectorizer = None
        self.matrix = None
        self.metadata = None
        self.dosen_names = []
        self.feature_names = None
        self.is_loaded = False

    def load(self):
        if self.is_loaded:
            return

        print("Memuat artefak model SI-REKTA ke memori...")
        vec_path = MODEL_DIR / "vectorizer.joblib"
        mat_path = MODEL_DIR / "matriks_tfidf_profil_dosen.npz"
        meta_path = MODEL_DIR / "metadata_model.json"

        if not vec_path.exists() or not mat_path.exists() or not meta_path.exists():
            raise FileNotFoundError(f"Artefak model tidak ditemukan di {MODEL_DIR}")

        self.vectorizer = joblib.load(vec_path)
        self.matrix = load_npz(mat_path)
        with open(meta_path, "r", encoding="utf-8") as f:
            self.metadata = json.load(f)

        self.dosen_names = self.metadata["urutan_nama_dosen"]
        self.feature_names = np.array(self.vectorizer.get_feature_names_out())
        self.is_loaded = True
        print(f"Model berhasil dimuat: {len(self.dosen_names)} dosen, {len(self.feature_names)} fitur TF-IDF.")

    def recommend(self, judul: str, top_n: int = 3):
        if not self.is_loaded:
            self.load()

        teks_bersih = bersihkan_teks(judul)
        if not teks_bersih:
            return [], [], True

        # Transformasi TF-IDF kueri
        vektor_input = self.vectorizer.transform([teks_bersih])
        
        # Ekstrak token / n-gram kueri yang ada di vocabulary
        query_nonzeros = vektor_input.nonzero()[1]
        kata_kunci_kueri = [self.feature_names[idx] for idx in query_nonzeros]

        # Hitung Cosine Similarity terhadap seluruh 17 profil dosen
        skor = cosine_similarity(vektor_input, self.matrix).ravel()

        # Urutkan dari yang tertinggi
        sorted_indices = np.argsort(skor)[::-1]

        # Cek apakah skor kemiripan teratas sangat rendah (< 0.05) atau 0
        top_score = skor[sorted_indices[0]] if len(sorted_indices) > 0 else 0
        is_low_confidence = bool(top_score < 0.05 or len(query_nonzeros) == 0)

        hasil = []
        for rank, idx in enumerate(sorted_indices[:top_n], start=1):
            nama_dosen = self.dosen_names[idx]
            
            # Cari kata kunci yang cocok antara kueri dan profil dosen ini
            dosen_row = self.matrix[idx].toarray().ravel()
            # Intersect token kueri dengan bobot dosen
            matched = []
            for q_idx in query_nonzeros:
                if dosen_row[q_idx] > 0:
                    matched.append((self.feature_names[q_idx], dosen_row[q_idx]))
            
            # Urutkan kata kunci cocok berdasarkan bobot TF-IDF pada dosen tersebut
            matched.sort(key=lambda x: x[1], reverse=True)
            matched_keywords = [m[0] for m in matched[:5]]

            hasil.append({
                "peringkat": rank,
                "nama_dosen": nama_dosen,
                "kata_kunci_cocok": matched_keywords,
                "raw_score": float(skor[idx]) # internal only, tidak diteruskan ke response publik
            })

        return hasil, kata_kunci_kueri, is_low_confidence

recommender_engine = RecommenderEngine()
