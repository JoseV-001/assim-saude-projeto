# Quickstart

## Subir com Docker

```bash
cd docker
docker compose up --build
```

Acesse:

- `http://localhost:8080/frontend/index.html`

## Parar containers

```bash
cd docker
docker compose down
```

## Resetar banco (apagar cargos e funcionarios)

```bash
cd docker
docker compose down -v
docker compose up --build
```

## Rodar sem Docker

```bash
cd backend
composer install
```

Configure variaveis de ambiente:

- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASS`

Inicie servidor local na raiz do projeto:

```bash
php -S localhost:8080
```

## Verificacao rapida

- ✅ Frontend abre em `http://localhost:8080/frontend/index.html`
- ✅ API responde em `http://localhost:8080/backend/index.php?resource=cargos`
- ❌ Se a API falhar, confirme conexao com MySQL e variaveis de ambiente
