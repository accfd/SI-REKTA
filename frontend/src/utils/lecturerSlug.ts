import type { DosenItem } from '../types';

export type AppTab =
  | 'beranda'
  | 'cari'
  | 'dosen'
  | 'profil-dosen'
  | 'pedoman'
  | 'history'
  | 'informasi';

export interface LecturerProfileContext {
  idDosen?: number;
  namaDosen?: string;
  matchedKeywords?: string[];
  queryTitle?: string;
  peringkat?: number;
  sourceTab?: 'cari' | 'dosen' | 'history';
}

export const TAB_TO_PATH: Record<Exclude<AppTab, 'profil-dosen'>, string> = {
  beranda: '/',
  cari: '/cari',
  dosen: '/dosen',
  pedoman: '/pedoman',
  history: '/history',
  informasi: '/informasi',
};

/**
 * Mengubah nama lengkap dosen menjadi slug URL yang ringkas, unik, dan deterministik.
 * Contoh: "Prof. Surya Afnarius, Ph.D." -> "prof-surya-afnarius"
 */
export function slugifyDosen(nama: string): string {
  const withoutDegrees = String(nama || '').split(',')[0].trim();
  const base = (withoutDegrees || String(nama || ''))
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'dosen';
}

/**
 * Fallback slug lengkap beserta gelar untuk kompatibilitas tautan.
 */
function slugifyDosenFull(nama: string): string {
  return String(nama || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findDosenBySlug(list: DosenItem[], slug: string): DosenItem | undefined {
  const normalized = slug.trim().toLowerCase().replace(/^\/+|\/+$/g, '');
  return (
    list.find((d) => slugifyDosen(d.nama_lengkap) === normalized) ||
    list.find((d) => slugifyDosenFull(d.nama_lengkap) === normalized)
  );
}

export function getDosenProfilePath(namaDosen: string): string {
  return `/dosen/${slugifyDosen(namaDosen)}`;
}

export interface ParsedRoute {
  tab: AppTab;
  dosenSlug: string | null;
}

export function parseRouteFromPathname(pathname: string): ParsedRoute {
  const cleanPath = (pathname || '/').replace(/\/+$/, '') || '/';

  if (cleanPath === '/') return { tab: 'beranda', dosenSlug: null };
  if (cleanPath === '/cari') return { tab: 'cari', dosenSlug: null };
  if (cleanPath === '/dosen') return { tab: 'dosen', dosenSlug: null };
  if (cleanPath === '/pedoman') return { tab: 'pedoman', dosenSlug: null };
  if (cleanPath === '/history') return { tab: 'history', dosenSlug: null };
  if (cleanPath === '/informasi') return { tab: 'informasi', dosenSlug: null };

  if (cleanPath.startsWith('/dosen/')) {
    const slug = decodeURIComponent(cleanPath.slice('/dosen/'.length)).trim();
    if (slug) {
      return { tab: 'profil-dosen', dosenSlug: slug };
    }
    return { tab: 'dosen', dosenSlug: null };
  }

  return { tab: 'beranda', dosenSlug: null };
}
