#!/bin/bash

# Script para compilar Angular para producción
# Uso: ./build-production.sh

echo "=========================================="
echo "Compilando aplicación Angular para producción"
echo "=========================================="

# Limpiar compilaciones anteriores
echo "Limpiando compilaciones anteriores..."
rm -rf dist

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
fi

# Compilar para producción
echo "Compilando para producción..."
ng build --configuration production

# Verificar si la compilación fue exitosa
if [ $? -eq 0 ]; then
    echo "=========================================="
    echo "✓ Compilación exitosa!"
    echo "=========================================="
    echo "Los archivos de producción están en: dist/"
    echo ""
    echo "Tamaño de los archivos generados:"
    du -sh dist/*
else
    echo "=========================================="
    echo "✗ Error en la compilación"
    echo "=========================================="
    exit 1
fi

