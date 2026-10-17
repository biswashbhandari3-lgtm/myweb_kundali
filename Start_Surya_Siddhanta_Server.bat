@echo off
title Kundali Darsan - SkyVision 2.0 Surya Siddhanta API Server
color 0A
echo ========================================================
echo   कुण्डली दर्शन (Kundali Darsan) - सूर्य सिद्धान्त इन्जिन
echo   SkyVision 2.0 Vedic Astrology Native Server
echo ========================================================
echo.
cd /d "%~dp0surya_siddhanta_api"
echo Starting SkyVision Native API server at http://127.0.0.1:8000 ...

where node >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    node server.js
    pause
    exit /b 0
)

if exist ".venv\Scripts\activate.bat" (
    call .venv\Scripts\activate.bat
    uvicorn app.main:app --host 127.0.0.1 --port 8000
) else (
    echo [ERROR] Node.js or Python environment not found!
    echo Please install Node.js to run the SkyVision Engine.
)
pause
