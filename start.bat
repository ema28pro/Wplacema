@echo off
chcp 65001 >nul
title Atlas de Mi Mundo - BlueMap Portal
powershell -ExecutionPolicy Bypass -NoProfile -File "%~dp0render-world.ps1"
pause
