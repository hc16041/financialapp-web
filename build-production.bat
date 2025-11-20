@echo off
REM Script para compilar Angular para producción en Windows
REM Uso: build-production.bat

echo ==========================================
echo Compilando aplicacion Angular para produccion
echo ==========================================

REM Limpiar compilaciones anteriores
echo Limpiando compilaciones anteriores...
if exist dist rmdir /s /q dist

REM Instalar dependencias si es necesario
if not exist node_modules (
    echo Instalando dependencias...
    call npm install
)

REM Compilar para producción
echo Compilando para produccion...
call ng build --configuration production

REM Verificar si la compilación fue exitosa
if %ERRORLEVEL% EQU 0 (
    echo ==========================================
    echo Compilacion exitosa!
    echo ==========================================
    echo Los archivos de produccion estan en: dist\
) else (
    echo ==========================================
    echo Error en la compilacion
    echo ==========================================
    exit /b 1
)

pause

