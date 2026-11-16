export interface LecturerRecommendation {
  peringkat: number;
  id_dosen: number;
  nama_dosen: string;
  inisial: string;
  kode_kk?: string;
  nama_kk?: string;
  jumlah_ta: number;
  jumlah_publikasi: number;
  is_publikasi_only: boolean;
  kata_kunci_keahlian: string[];
  kata_kunci_cocok: string[];
}

export interface RecommendationResponse {
  judul_input: string;
  kata_kunci_kueri: string[];
  rekomendasi: LecturerRecommendation[];
  is_low_confidence: boolean;
  message?: string;
}

export interface DosenItem {
  id_dosen: number;
  nama_lengkap: string;
  inisial: string;
  kode_kk?: string;
  nama_kk?: string;
  jumlah_ta: number;
  jumlah_publikasi: number;
  total_dokumen: number;
  is_publikasi_only: boolean;
  kata_kunci: string[];
}

export interface DokumenItem {
  id_dokumen: number;
  judul_dokumen: string;
  nama_file_pdf: string;
  keterangan?: string;
}

export interface ModelInfo {
  nama_model: string;
  metode_pembobotan: string;
  metode_pemeringkatan: string;
  jumlah_dosen: number;
  jumlah_fitur_tfidf: number;
  total_riwayat_ta: number;
  total_publikasi: number;
  hit_rate_at_3: number;
  recall_at_3: number;
  mrr_at_3: number;
  precision_at_3: number;
}

export interface HistoryItem {
  id: string;
  timestamp: string;
  search_title: string;
  results: LecturerRecommendation[];
  kata_kunci_kueri: string[];
  is_low_confidence: boolean;
}
