# Sistema Assim Saude

Aplicacao web para gestao de cargos e funcionarios, desenvolvida em arquitetura MVC, como parte de uma avaliacao tecnica.

## Visao geral

O sistema permite:
- Cadastro e manutencao de cargos
- Cadastro e manutencao de funcionarios
- Listagem e busca com filtros
- Relatorio de funcionarios por nome e cargo

A aplicacao e dividida em:
- Backend (API em PHP)
- Frontend (paginas HTML com JavaScript)
- Banco de dados MySQL
- Ambiente de execucao via Docker

## Tecnologias utilizadas

- Backend: PHP 8.1+ (projeto), executando em container PHP 8.2 com Apache
- Frontend: HTML, CSS, JavaScript (puro)
- Banco de dados: MySQL
- Arquitetura: MVC
- Infraestrutura: Docker e Docker Compose

## Funcionalidades do sistema

### Cargos
- Cadastro de cargo
- Edicao de cargo
- Exclusao de cargo
- Busca por nome
- Validacao de nome obrigatorio
- Bloqueio de exclusao de cargo vinculado a funcionarios

### Funcionarios
- Cadastro de funcionario
- Edicao de funcionario
- Exclusao de funcionario
- Busca por nome e CPF
- Validacoes de negocio (CPF, duplicidade, data, salario, cargo)
- Campos adicionais de contato e endereco

### Relatorio
- Listagem de funcionarios
- Filtro por nome
- Filtro por cargo
- Exibicao de telefone formatado na tela

## Estrutura do projeto

```text
sistema-assim-saude/
|- backend/     # API, regras de negocio, controllers, repositories e models
|- frontend/    # Paginas HTML, CSS e JavaScript
|- docker/      # Dockerfile e docker-compose
|- database.sql # Schema inicial e dados de exemplo
```

## Como rodar o projeto (passo a passo)

### Pre-requisitos

- Docker
- Docker Compose

### Passos

1. Clonar o repositorio:

```bash
git clone <URL_DO_REPOSITORIO>
```

2. Acessar a pasta do projeto:

```bash
cd sistema-assim-saude
```

3. Subir os containers:

```bash
cd docker
docker compose up --build
```

4. Acessar no navegador:

- Frontend: `http://localhost:8080/frontend/index.html`

5. API disponivel em:

- `http://localhost:8080/backend/index.php`

## Banco de dados

- O banco e criado automaticamente na subida dos containers.
- Nome do banco: `assim_saude`.
- O arquivo `database.sql` e aplicado automaticamente na inicializacao do MySQL.

## Observacoes importantes

- CPF deve ter 11 digitos e nao pode ser duplicado.
- O sistema tambem rejeita CPFs com todos os digitos iguais.
- Telefones sao enviados/armazenados sem formatacao (somente numeros) e exibidos formatados no frontend.
- O sistema nao possui autenticacao (fora do escopo desta avaliacao tecnica).

## Resetar banco de dados (opcional)

Para reiniciar o ambiente do zero (apagando volumes):

```bash
cd docker
docker compose down -v
docker compose up --build
```

## Endpoints principais da API

- `GET /backend/index.php?resource=cargos&q=texto`
- `POST /backend/index.php?resource=cargos`
- `PUT /backend/index.php?resource=cargos&id=1`
- `DELETE /backend/index.php?resource=cargos&id=1`
- `GET /backend/index.php?resource=funcionarios&nome=texto&cpf=12345678901`
- `POST /backend/index.php?resource=funcionarios`
- `PUT /backend/index.php?resource=funcionarios&id=1`
- `DELETE /backend/index.php?resource=funcionarios&id=1`
- `GET /backend/index.php?resource=relatorio&nome=texto&cargo=texto`

## Status

- CRUD de cargos e funcionarios implementado
- Relatorio com filtros implementado
- Validacoes principais de negocio implementadas
- Projeto pronto para execucao em ambiente Docker
