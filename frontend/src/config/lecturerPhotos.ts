/**
 * Konfigurasi foto profil 17 dosen SI-REKTA.
 *
 * Cara menambahkan foto dosen:
 * 1. Simpan file foto di folder: `frontend/public/assets/dosen/`
 *    (contoh: `frontend/public/assets/dosen/adi-arga.jpg`)
 * 2. Isi path-nya di bawah ini sesuai ID dosen, contoh:
 *    1: '/assets/dosen/adi-arga.jpg',
 * 3. Jika dikosongkan ('') atau file belum ada, tampilan otomatis memakai inisial dosen.
 * 4. Untuk mengatur posisi wajah per dosen jika kurang pas, bisa pakai objek:
 *    1: { src: '/assets/dosen/adi.jpg', position: '50% 15%' },
 *    (Default otomatis memakai '50% 20%' agar wajah berada di tengah).
 */
export type LecturerPhotoEntry = string | { src: string; position?: string };

export const LECTURER_PHOTOS: Record<number, LecturerPhotoEntry> = {
  1: '/assets/dosen/adi.jpg',       // Adi Arga Arifnur, M.Kom.
  2: '/assets/dosen/afriyanti.jpg', // Afriyanti Dwi Kartika, S.Pd., M.T.
  3: '/assets/dosen/aina.jpg',      // Aina Hubby Aziira, M.Eng.
  4: '/assets/dosen/welly.jpg',     // Dwi Welly Sukma Nirad, M.T.
  5: '/assets/dosen/fajril.png',    // Fajril Akbar, M.Sc.
  6: '/assets/dosen/febby.jpg',     // Febby Apri Wenando, M.Eng., Ph.D.
  7: '/assets/dosen/hanim.jpg',     // Hafizah Hanim, M.Kom.
  8: '/assets/dosen/izza.jpg',      // Hafzatin Nurlatifa, M.Eng.
  9: '/assets/dosen/haris.png',     // Haris Suryamen, M.Sc.
  10: '/assets/dosen/hasdi.png',    // Hasdi Putra, M.T.
  11: '/assets/dosen/husnil.jpg',   // Husnil Kamil, M.T.
  12: '/assets/dosen/jefril.jpg',   // Jefril Rahmadoni, M.Kom.
  13: '/assets/dosen/nisa.jpg',     // Nisa Dwi Angresti, M.Kom.
  14: '/assets/dosen/surya.png',    // Prof. Surya Afnarius, Ph.D.
  15: '/assets/dosen/rahmatika.jpg',// Rahmatika Pratama Santi, M.T.
  16: '/assets/dosen/ricky1.jpg',   // Ricky Akbar, M.Kom.
  17: '/assets/dosen/ullya.jpg',    // Ullya Mega Wahyuni, M.Kom.
};

export const getLecturerPhoto = (
  idDosen: number
): { src: string; position: string } | null => {
  const entry = LECTURER_PHOTOS[idDosen];
  if (!entry) return null;

  const rawSrc = typeof entry === 'string' ? entry.trim() : entry.src.trim();
  if (!rawSrc) return null;

  const src = rawSrc.startsWith('/') || rawSrc.startsWith('http') ? rawSrc : `/${rawSrc}`;
  const position =
    typeof entry === 'string' ? '50% 20%' : entry.position?.trim() || '50% 20%';

  return { src, position };
};
