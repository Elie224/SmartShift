@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Suppression du dossier .git (si present)...
if exist .git (
    rd /s /q .git 2>nul
    if exist .git (
        echo ERREUR: Impossible de supprimer .git. Ferme Cursor, OneDrive ou tout processus qui l utilise, puis relance ce script.
        pause
        exit /b 1
    )
)

echo.
echo Initialisation Git...
git init
if errorlevel 1 (echo Echec git init. & pause & exit /b 1)

git add .
git commit -m "Initial commit – SmartShift site"
if errorlevel 1 (echo Echec git commit. & pause & exit /b 1)

git branch -M main
git remote add origin https://github.com/Elie224/SmartShift.git 2>nul
git remote set-url origin https://github.com/Elie224/SmartShift.git

echo.
echo Push vers GitHub...
git push -u origin main
if errorlevel 1 (
    echo.
    echo Si erreur auth: connecte-toi sur GitHub, cree le depot SmartShift (vide), puis relance ce script.
    pause
    exit /b 1
)

echo.
echo OK – Code pousse sur https://github.com/Elie224/SmartShift
echo Tu peux maintenant deployer sur Netlify en important ce depot.
pause
