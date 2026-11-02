@echo off
copy /Y "%~dp0ArtPage.jsx" "%~dp0..\..\src\pages\arts\ArtPage.jsx" >nul
if errorlevel 1 exit /b 1
echo Restored the Arts page to the version before the cohesive-layout redesign.
