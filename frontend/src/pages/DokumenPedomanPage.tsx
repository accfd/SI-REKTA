import React, { useState, useEffect } from 'react';
import { FileText, Download, ExternalLink, AlertCircle, RefreshCw, BookOpen, Layers } from 'lucide-react';
import type { DokumenItem } from '../types';
import { api } from '../services/api';

export const DokumenPedomanPage: React.FC = () => {
  const [documents, setDocuments] = useState<DokumenItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);
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
      // Otomatis pilih dokumen pertama agar langsung tampil di layar
      if (data.length > 0) {
        setSelectedDocId(data[0].id_dokumen);
      }
    } catch (err) {
      setErrorMsg('Dokumen pedoman tidak dapat dimuat dari server backend.');
    } finally {
      setLoading(false);
    }
  };

  const currentDoc = documents.find((d) => d.id_dokumen === selectedDocId) || documents[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dokumen Pedoman Tugas Akhir</h1>
        <p className="text-sm text-slate-500 mt-1.5">
          Baca langsung buku panduan pelaksanaan dan daftar bidang minat topik tugas akhir DSI tahun 2025 langsung di dalam aplikasi web.
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
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500 font-medium">Memuat berkas pedoman resmi...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Document Switcher Bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center space-x-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Pilih Dokumen:</span>
              </span>
              {documents.map((doc) => {
                const isActive = doc.id_dokumen === currentDoc?.id_dokumen;
                return (
                  <button
                    key={doc.id_dokumen}
                    onClick={() => setSelectedDocId(doc.id_dokumen)}
                    className={`inline-flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{doc.judul_dokumen}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Document Actions */}
            {currentDoc && (
              <div className="flex items-center space-x-2 shrink-0">
                <a
                  href={api.getDocumentStreamUrl(currentDoc.id_dokumen)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Buka di Tab Baru</span>
                </a>

                <a
                  href={api.getDocumentDownloadUrl(currentDoc.id_dokumen)}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                  title="Unduh Berkas PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh PDF</span>
                </a>
              </div>
            )}
          </div>

          {/* Inline Document Info Banner */}
          {currentDoc && (
            <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200/60 flex items-center justify-between text-xs text-blue-900">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Sedang menampilkan: <strong>{currentDoc.judul_dokumen}</strong> ({currentDoc.nama_file_pdf})
                </span>
              </div>
              <span className="text-slate-500 hidden md:inline">
                {currentDoc.keterangan}
              </span>
            </div>
          )}

          {/* Interactive In-Page PDF Viewer */}
          {currentDoc && (
            <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 relative h-[820px]">
              <object
                data={`${api.getDocumentStreamUrl(currentDoc.id_dokumen)}#toolbar=1&navpanes=0&view=FitH`}
                type="application/pdf"
                className="w-full h-full"
              >
                {/* Fallback iframe jika object browser tidak didukung */}
                <iframe
                  src={`${api.getDocumentStreamUrl(currentDoc.id_dokumen)}#toolbar=1&navpanes=0&view=FitH`}
                  title={currentDoc.judul_dokumen}
                  className="w-full h-full border-none"
                >
                  <div className="p-8 text-center text-white space-y-4">
                    <p>Browser Anda tidak mendukung pratinjau PDF langsung.</p>
                    <a
                      href={api.getDocumentStreamUrl(currentDoc.id_dokumen)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-blue-600 rounded-xl text-white font-bold text-xs"
                    >
                      Klik di sini untuk membuka PDF di tab baru
                    </a>
                  </div>
                </iframe>
              </object>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
