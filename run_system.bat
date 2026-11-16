@echo off
title SI-REKTA Launcher
echo ============================================================
echo   SI-REKTA (Sistem Rekomendasi Dosen Pembimbing Tugas Akhir)
echo   Departemen Sistem Informasi - 2025/2026
echo ============================================================
echo.
echo 1. Menjalankan Backend FastAPI (port 8000)...
start "SI-REKTA Backend API" cmd /k "start_backend.bat"

echo 2. Menjalankan Frontend React Vite (port 5173)...
start "SI-REKTA Frontend Web" cmd /k "start_frontend.bat"

echo.
echo Sistem SI-REKTA berhasil diluncurkan!
echo - Akses Frontend Web: http://localhost:5173
echo - Akses Dokumentasi API Swagger: http://localhost:8000/docs
echo.
pause
