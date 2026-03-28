#!/bin/bash
# Script para iniciar o projeto automaticamente

echo "🚀 Sistema ASSIM Saúde - Iniciando..."
echo ""

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Instale Docker Desktop."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Instale Docker Desktop."
    exit 1
fi

echo "✅ Docker encontrado"
echo ""

# Navegar para pasta docker
cd docker || exit 1

echo "📦 Construindo containers..."
docker compose up --build

echo ""
echo "✅ Projeto iniciado com sucesso!"
echo ""
echo "📱 Acesse: http://localhost:8080/frontend/index.html"
echo ""
echo "💡 Para parar, pressione CTRL+C"

