# ==============================================================================
# Script de Renderizado y Servidor BlueMap para Minecraft
# Compatible con Windows PowerShell y Java 21/25
# ==============================================================================

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   ATLAS DE MI MUNDO - BLUEMAP MINECRAFT PORTAL           " -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Detectar Java
$JavaExe = ""
if (Test-Path "C:\.jdk\openJdk-25\bin\java.exe") {
    $JavaExe = "C:\.jdk\openJdk-25\bin\java.exe"
} else {
    $JavaExe = "java.exe"
}

Write-Host "[1/3] Usando Java: $JavaExe" -ForegroundColor Green

# 2. Menu de opciones
Write-Host ""
Write-Host "Que deseas hacer hoy?" -ForegroundColor White
Write-Host " [1] Iniciar Servidor Web Local (http://localhost:8100)" -ForegroundColor Yellow
Write-Host " [2] Re-renderizar el mapa completo (Actualizar cambios de bloques)" -ForegroundColor Yellow
Write-Host " [3] Iniciar Servidor y vigilar cambios en vivo (-u)" -ForegroundColor Yellow
Write-Host " [4] Desplegar en Cloudflare Pages (Comando Wrangler)" -ForegroundColor Yellow
Write-Host ""
$Choice = Read-Host "Ingresa el numero de tu opcion (1-4)"

switch ($Choice) {
    "1" {
        Write-Host ""
        Write-Host "-> Iniciando servidor web en http://localhost:8100/ ..." -ForegroundColor Cyan
        Write-Host "   Servidor listo en http://localhost:8100/" -ForegroundColor Gray
        Write-Host "   Presiona Ctrl+C en cualquier momento para detenerlo." -ForegroundColor Gray
        & $JavaExe -jar tools\bluemap-cli.jar -c config -w
    }
    "2" {
        Write-Host ""
        Write-Host "-> Renderizando Overworld (Area del spawn)..." -ForegroundColor Cyan
        & $JavaExe -jar tools\bluemap-cli.jar -c config -f -r
        Write-Host "-> Renderizado completado con exito!" -ForegroundColor Green
        Write-Host "-> Iniciando servidor web en http://localhost:8100/ ..." -ForegroundColor Cyan
        Write-Host "   Presiona Ctrl+C en cualquier momento para detenerlo." -ForegroundColor Gray
        & $JavaExe -jar tools\bluemap-cli.jar -c config -w
    }
    "3" {
        Write-Host ""
        Write-Host "-> Renderizando y vigilando cambios en vivo en http://localhost:8100/ ..." -ForegroundColor Cyan
        Write-Host "   Presiona Ctrl+C en cualquier momento para detenerlo." -ForegroundColor Gray
        & $JavaExe -jar tools\bluemap-cli.jar -c config -ru
    }
    "4" {
        Write-Host ""
        Write-Host "-> Desplegando en Cloudflare Pages..." -ForegroundColor Cyan
        npx -y wrangler pages deploy web --project-name=mi-mundo-minecraft
    }
    Default {
        Write-Host "Opcion invalida. Iniciando servidor por defecto..." -ForegroundColor Yellow
        Write-Host "   Servidor listo en http://localhost:8100/" -ForegroundColor Gray
        & $JavaExe -jar tools\bluemap-cli.jar -c config -w
    }
}
