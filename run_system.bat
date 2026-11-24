@echo off
title SI-REKTA Launcher
cd /d "%~dp0"

echo ============================================================
echo   SI-REKTA - Sistem Rekomendasi Dosen Pembimbing Tugas Akhir
echo ============================================================
echo.

echo [1/3] Menjalankan Backend FastAPI (port 8000)...
start "SI-REKTA Backend API" "%~dp0start_backend.bat"

echo [2/3] Menjalankan Frontend React Vite (port 5173)...
start "SI-REKTA Frontend Web" "%~dp0start_frontend.bat"

echo [3/3] Membuka browser otomatis dalam 3 detik...
ping 127.0.0.1 -n 4 >nul
start http://localhost:5173

echo.
echo ============================================================
echo   Sistem berhasil diluncurkan!
echo   Frontend : http://localhost:5173
echo   Backend  : http://localhost:8000/docs
echo ============================================================
echo.
pause
