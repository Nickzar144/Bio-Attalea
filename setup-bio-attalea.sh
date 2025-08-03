#!/bin/bash

# 🌱 Bio Attalea Setup Script
# Script para configurar y desplegar la dApp Bio Attalea

set -e

echo "🌱 Iniciando setup de Bio Attalea Tokenization dApp..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si estamos en el directorio correcto
if [ ! -f "package.json" ] || [ ! -d "packages" ]; then
    print_error "No se encontró el proyecto Bio Attalea. Asegúrate de estar en el directorio correcto."
    exit 1
fi

# Paso 1: Instalar dependencias
print_status "Instalando dependencias..."
yarn install
print_success "Dependencias instaladas correctamente"

# Paso 2: Compilar contratos
print_status "Compilando contratos inteligentes..."
yarn compile
print_success "Contratos compilados correctamente"

# Paso 3: Verificar si hay una blockchain local ejecutándose
print_status "Verificando blockchain local..."
if pgrep -f "hardhat node" > /dev/null; then
    print_warning "Ya hay una blockchain local ejecutándose"
else
    print_status "Iniciando blockchain local..."
    yarn chain &
    CHAIN_PID=$!
    echo $CHAIN_PID > .chain.pid
    sleep 5
    print_success "Blockchain local iniciada (PID: $CHAIN_PID)"
fi

# Paso 4: Desplegar contratos
print_status "Desplegando contratos..."
yarn deploy
print_success "Contratos desplegados correctamente"

# Paso 5: Verificar deployment
print_status "Verificando deployment de contratos..."
node update-contract-addresses.js
print_success "Contratos verificados correctamente"

# Paso 6: Verificar que todo esté funcionando
print_status "Verificando configuración..."

# Verificar que el archivo page.jsx existe
if [ -f "packages/nextjs/app/page.jsx" ]; then
    print_success "Archivo page.jsx encontrado"
else
    print_error "Archivo page.jsx no encontrado"
    exit 1
fi

# Verificar que el contrato TokenAmbiental esté desplegado
if grep -q "TokenAmbiental" packages/nextjs/contracts/deployedContracts.ts; then
    print_success "Contrato TokenAmbiental encontrado en deployedContracts.ts"
else
    print_error "Contrato TokenAmbiental no encontrado en deployedContracts.ts"
    exit 1
fi

echo ""
echo "🎉 Setup completado exitosamente!"
echo "=================================="
echo ""
echo "📋 Próximos pasos:"
echo "1. Inicia el frontend: ${GREEN}yarn start${NC}"
echo "2. Abre tu navegador en: ${GREEN}http://localhost:3000${NC}"
echo "3. Conecta tu wallet (MetaMask)"
echo "4. Si eres el owner, podrás emitir tokens BIOA"
echo ""
echo "🔧 Comandos útiles:"
echo "- ${GREEN}yarn chain${NC}: Inicia blockchain local"
echo "- ${GREEN}yarn deploy${NC}: Despliega contratos"
echo "- ${GREEN}yarn start${NC}: Inicia frontend"
echo "- ${GREEN}yarn test${NC}: Ejecuta tests"
echo ""
echo "📚 Documentación:"
echo "- Lee ${GREEN}README_BIO_ATTALEA.md${NC} para más detalles"
echo ""
echo "🌱 ¡Disfruta tokenizando la captura de CO₂!"

# Función de limpieza al salir
cleanup() {
    if [ -f ".chain.pid" ]; then
        CHAIN_PID=$(cat .chain.pid)
        if kill -0 $CHAIN_PID 2>/dev/null; then
            print_status "Deteniendo blockchain local..."
            kill $CHAIN_PID
            rm .chain.pid
            print_success "Blockchain local detenida"
        fi
    fi
}

# Registrar función de limpieza
trap cleanup EXIT 