import React, { useState, useEffect } from 'react';
import { getLecturerPhoto } from '../config/lecturerPhotos';

interface LecturerAvatarProps {
  idDosen?: number;
  nama: string;
  inisial: string;
  className?: string;
}

export const LecturerAvatar: React.FC<LecturerAvatarProps> = ({
  idDosen,
  nama,
  inisial,
  className = 'w-13 h-13 rounded-2xl bg-brand-50 text-brand-700 font-extrabold text-lg border border-brand-100',
}) => {
  const [imgError, setImgError] = useState(false);
  const photo = idDosen ? getLecturerPhoto(idDosen) : null;

  useEffect(() => {
    setImgError(false);
  }, [photo?.src]);

  if (photo && !imgError) {
    return (
      <div className={`${className} overflow-hidden shrink-0`}>
        <img
          src={photo.src}
          alt={nama}
          onError={() => setImgError(true)}
          style={{ objectPosition: photo.position }}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${className} flex items-center justify-center shrink-0`}>
      {inisial}
    </div>
  );
};
