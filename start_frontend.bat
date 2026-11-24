@echo off
title SI-REKTA Frontend (React + Vite)
cd /d "%~dp0frontend"
echo [SI-REKTA] Menjalankan Frontend React pada port 5173...
echo.
call npm run dev
pause
