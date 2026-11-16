import axios from 'axios';
import type {
  RecommendationResponse,
  DosenItem,
  DokumenItem,
  ModelInfo,
  LecturerDetailResponse
} from '../types';

const API_BASE = '/api';

export const api = {
  getRecommendations: async (judul: string): Promise<RecommendationResponse> => {
    const res = await axios.post<RecommendationResponse>(`${API_BASE}/recommend`, { judul });
    return res.data;
  },

  getAllDosen: async (): Promise<DosenItem[]> => {
    const res = await axios.get<DosenItem[]>(`${API_BASE}/dosen`);
    return res.data;
  },

  getLecturerDetail: async (idDosen: number): Promise<LecturerDetailResponse> => {
    const res = await axios.get<LecturerDetailResponse>(`${API_BASE}/dosen/${idDosen}/documents`);
    return res.data;
  },

  getModelInfo: async (): Promise<ModelInfo> => {
    const res = await axios.get<ModelInfo>(`${API_BASE}/info`);
    return res.data;
  },

  getDocuments: async (): Promise<DokumenItem[]> => {
    const res = await axios.get<DokumenItem[]>(`${API_BASE}/documents`);
    return res.data;
  },

  getDocumentStreamUrl: (docId: number): string => {
    return `${API_BASE}/documents/${docId}/stream`;
  },

  getDocumentDownloadUrl: (docId: number): string => {
    return `${API_BASE}/documents/${docId}/download`;
  }
};
