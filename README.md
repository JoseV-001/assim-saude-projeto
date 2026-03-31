# Sistema ASSIM Saude

Aplicacao web em PHP (MVC) para cadastro de cargos e funcionarios, com relatorio filtravel.

## Ferramentas utilizadas

- Backend: PHP 8.1+ (PDO)
- Frontend: HTML, CSS e JavaScript
- Banco de dados: MySQL 8.0+
- Containerizacao: Docker + Docker Compose

## Estrutura da documentacao

- `README.md`: visao geral e instrucoes completas
- `QUICKSTART.md`: guia rapido para subir o projeto
- `ESTRUTURA.md`: mapa de pastas e responsabilidades

## Como rodar com Docker (recomendado)

```bash
cd docker
docker compose up --build
```

Acesse no navegador:

- Frontend: `http://localhost:8080/frontend/index.html`
- API exemplo: `http://localhost:8080/backend/index.php?resource=cargos`

Para parar os containers:

```bash
cd docker
docker compose down
```

Para limpar dados do banco e reiniciar do zero:

```bash
cd docker
docker compose down -v
docker compose up --build
```

## Como rodar local (sem Docker)

1. Instale dependencias do backend:

```bash
cd backend
composer install
```

2. Crie o banco e importe o schema:

```sql
CREATE DATABASE assim_saude;
```

```bash
mysql -u root -p assim_saude < ../database.sql
```

3. Configure variaveis de ambiente (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`).

4. Inicie o servidor PHP na raiz do projeto:

```bash
php -S localhost:8080
```

## Endpoints principais

- `GET /backend/index.php?resource=cargos&q=texto`
- `POST /backend/index.php?resource=cargos`
- `PUT /backend/index.php?resource=cargos&id=1`
- `DELETE /backend/index.php?resource=cargos&id=1`
- `GET /backend/index.php?resource=funcionarios&nome=texto&cpf=12345678901`
- `POST /backend/index.php?resource=funcionarios`
- `PUT /backend/index.php?resource=funcionarios&id=1`
- `DELETE /backend/index.php?resource=funcionarios&id=1`
- `GET /backend/index.php?resource=relatorio&nome=texto&cargo=texto`

## Funcionalidades

### Tela de Cargos
- ✅ Criar novo cargo
- ✅ Pesquisar cargo por nome
- ✅ Editar cargo (selecione na tabela)
- ✅ Deletar cargo
- ✅ Validacao obrigatoria de nome

### Tela de Funcionarios
- ✅ Criar novo funcionario
- ✅ Pesquisar por nome e/ou CPF
- ✅ Editar funcionario (selecione na tabela)
- ✅ Deletar funcionario
- ✅ Completo cadastro de endereco
- ✅ Selecionar cargo na lista (combo box)
- ✅ Campos opcionais: email, telefone, complemento, cep, logradouro, numero, bairro, municipio, uf

### Tela de Relatorio
- ✅ Exibir todos os funcionarios
- ✅ Filtrar por nome
- ✅ Filtrar por cargo
- ✅ Mostrar: Nome, Telefone, Cargo e Salario

### Dados Iniciais
- ✅ 5 cargos pre-cadastrados
- ✅ 10 funcionarios com dados completos
- ✅ Todos com CPF validado

## Regras de negocio implementadas

- ✅ CPF valido (com validacao de digitos verificadores)
- ✅ CPF unico (nao permite duplicado)
- ✅ Data de nascimento valida (`YYYY-MM-DD`)
- ✅ Nome obrigatorio
- ✅ Salario maior que zero
- ✅ Cargo obrigatorio e existente
- ✅ Nao permitir CPF inválido
- ✅ Nao permitir 2 funcionarios com mesmo CPF
- ✅ Nao permitir data de nascimento inválida

## Status

- ✅ CRUD completo (Create, Read, Update, Delete)
- ✅ Validacao robusta de CPF com algoritmo correto
- ✅ Dados iniciais populados
- ✅ Frontend com tabelas interativas (clique para editar)
- ✅ Relatorio com filtros
- ✅ Documentacao essencial organizada
- ✅ Projeto pronto para execucao com Docker
- ❌ Nao inclui autenticacao de usuarios


