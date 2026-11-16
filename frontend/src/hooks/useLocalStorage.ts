import { useState, useEffect } from 'react';
import type { HistoryItem, LecturerRecommendation } from '../types';

const STORAGE_KEY = 'sirekta_history_v1';

export function useHistoryStorage() {
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Gagal membaca history dari local storage', e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Gagal menyimpan history ke local storage', e);
    }
  }, [history]);

  const addHistory = (
    search_title: string,
    results: LecturerRecommendation[],
    kata_kunci_kueri: string[],
    is_low_confidence: boolean
  ) => {
    const newItem: HistoryItem = {
      id: 'hist_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      timestamp: new Date().toISOString(),
      search_title,
      results,
      kata_kunci_kueri,
      is_low_confidence,
    };
    setHistory((prev) => [newItem, ...prev]);
    return newItem.id;
  };

  const deleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    addHistory,
    deleteHistory,
    clearAllHistory,
  };
}
