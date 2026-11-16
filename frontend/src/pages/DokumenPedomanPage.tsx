import React, { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, AlertCircle, Eye, ArrowLeft, RefreshCw } from 'lucide-react';
import type { DokumenItem } from '../types';
import { api } from '../services/api';

export const DokumenPedomanPage: React.FC = () => {
  const [documents, setDocuments] = useState<DokumenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoc, setSelectedDoc] = useState<DokumenItem | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    loadDocs();
  }, []);

  const loadDocs = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const data = await api.getDocuments();
      setDocuments(data);
    } catch (err) {
      setErrorMsg('Dokumen pedoman tidak dapat dimuat dari server backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dokumen Pedoman Tugas Akhir</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Akses resmi pedoman pelaksanaan dan daftar bidang minat topik tugas akhir Departemen Sistem Informasi (DSI) tahun 2025 dalam format PDF.
        </p>
      </div>

      {errorMsg ? (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
            <div>
              <h3 className="font-bold">Gagal Memuat Dokumen</h3>
              <p className="text-xs text-red-600 mt-0.5">{errorMsg}</p>
            </div>
          </div>
          <button
            onClick={loadDocs}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-800"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Coba Lagi</span>
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-16">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">Memuat berkas pedoman resmi...</p>
        </div>
      ) : selectedDoc ? (
        /* PDF Viewer Container */
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSelectedDoc(null)}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali ke Daftar</span>
              </button>
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{selectedDoc.judul_dokumen}</h3>
                <p className="text-xs text-slate-400">{selectedDoc.nama_file_pdf}</p>
              </div>
            </div>

            <a
              href={api.getDocumentStreamUrl(selectedDoc.id_dokumen)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Buka di Tab Baru</span>
            </a>
          </div>

          <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-700 h-[750px] relative">
            <iframe
              src={`${api.getDocumentStreamUrl(selectedDoc.id_dokumen)}#toolbar=1&navpanes=0`}
              title={selectedDoc.judul_dokumen}
              className="w-full h-full border-none"
            />
          </div>
        </div>
      ) : (
        /* List Kartu Dokumen */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {documents.map((doc) => (
            <div
              key={doc.id_dokumen}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                    PDF Dokumen
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">{doc.judul_dokumen}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {doc.keterangan || 'Dokumen acuan resmi pedoman tugas akhir mahasiswa Departemen Sistem Informasi.'}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 truncate max-w-[180px]">{doc.nama_file_pdf}</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Buka Dokumen</span>
                  </button>
                  <a
                    href={api.getDocumentStreamUrl(doc.id_dokumen)}
                    download={doc.nama_file_pdf}
                    className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
