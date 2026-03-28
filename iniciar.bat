@echo off
REM Script para iniciar o projeto no Windows

echo.
echo ========================================
echo  SISTEMA ASSIM SAUDE
echo ========================================
echo.

REM Verificar se Docker está instalado
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Docker nao encontrado.
    echo Baixe Docker Desktop em: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo [OK] Docker encontrado
echo.

REM Verificar se Docker Compose está disponível
docker compose version >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo X Docker Compose nao encontrado.
    echo Use "docker-compose" se "docker compose" nao funcionar.
    pause
    exit /b 1
)

echo [OK] Docker Compose encontrado
echo.

REM Navegar para pasta docker
cd docker || (
    echo X Erro ao acessar pasta docker
    pause
    exit /b 1
)

echo [*] Iniciando containers...
echo.

docker compose up --build

echo.
echo ========================================
echo.
echo [OK] Projeto iniciado com sucesso!
echo.
echo [*] Acesse: http://localhost:8080/frontend/index.html
echo.
echo [*] Para parar, volte ao terminal e pressione CTRL+C
echo.
pause

