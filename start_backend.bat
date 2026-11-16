@echo off
title SI-REKTA Backend API (FastAPI)
cd /d "%~dp0backend"
echo [SI-REKTA] Menjalankan Backend FastAPI pada port 8000...
echo [SI-REKTA] Pastikan MySQL di Laragon sudah aktif (Start All).
echo.
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
pause
