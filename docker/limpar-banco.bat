@echo off
REM Script para limpar os dados do banco de dados (mantém estrutura)

echo.
echo ==========================================
echo   LIMPANDO BANCO DE DADOS
echo ==========================================
echo.

REM Conectar e limpar dados mantendo as tabelas
docker compose exec -T db mysql -u root -proot assim_saude -e "DELETE FROM funcionarios; DELETE FROM cargos; ALTER TABLE funcionarios AUTO_INCREMENT = 1; ALTER TABLE cargos AUTO_INCREMENT = 1;"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Banco de dados limpo com sucesso!
    echo.
    echo   - Funcionarios removidos
    echo   - Cargos removidos
    echo   - Contadores resetados
    echo.
) else (
    echo [X] Erro ao limpar banco de dados
    echo.
    echo Certifique-se que:
    echo   1. Docker containers estao rodando
    echo   2. Execute: docker compose up -d
    echo.
)

echo ==========================================
echo.
pause

