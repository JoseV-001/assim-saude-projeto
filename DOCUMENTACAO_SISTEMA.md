# Documentacao do Sistema ASSIM Saude

## 1. Visao geral

O `sistema-assim-saude` e uma aplicacao web para gestao de cargos e funcionarios.

Principais capacidades:
- Cadastro e consulta de cargos
- Cadastro e consulta de funcionarios
- Relatorio de funcionarios com filtros

Tecnologias identificadas no projeto:
- Backend: PHP 8.1+ com PDO
- Frontend: HTML, CSS e JavaScript puro
- Banco de dados: MySQL
- Infraestrutura: Docker e Docker Compose

---

## 2. Arquitetura e organizacao

Estrutura principal:
- `backend/`: API, regras de negocio e acesso ao banco
- `frontend/`: paginas e scripts do cliente
- `docker/`: ambiente de execucao com app e banco
- `database.sql`: schema inicial do banco

Padrao aplicado no backend:
- Controllers: recebem requisicoes e aplicam validacoes
- Repository: executa consultas SQL
- Models: representam entidades de dominio
- Utils: validadores (CPF e data)
- Config: conexao com banco (`Database.php`)

---

## 3. Fluxos funcionais

### 3.1 Menu inicial
Arquivo: `frontend/index.html`
- Mostra menu principal
- Navega para Cargos, Funcionarios e Relatorio

### 3.2 Modulo de cargos
Arquivos: `frontend/cargos.html`, `frontend/js/cargo.js`
- Criar novo cargo
  - Campos: `nome` (obrigatorio), `descricao` (opcional)
- Pesquisar cargos por nome
- Exibir lista em tabela (`id`, `nome`, `descricao`)

### 3.3 Modulo de funcionarios
Arquivos: `frontend/funcionarios.html`, `frontend/js/funcionario.js`
- Criar novo funcionario
  - Campos obrigatorios: `nome`, `cpf`, `data_nascimento`, `salario`, `cargo_id`
  - Campos opcionais: endereco e contato (email, telefone, CEP, etc.)
- Pesquisar funcionarios por `nome` e `cpf`
- Exibir lista com dados principais e cargo
- Formatar CPF e salario na tela

### 3.4 Modulo de relatorio
Arquivos: `frontend/relatorio.html`, `frontend/js/relatorio.js`
- Consultar relatorio de funcionarios
- Filtrar por `nome` e `cargo`
- Exibir nome, telefone, cargo e salario

---

## 4. API e endpoints

Entrada unica da API: `backend/index.php`

Comportamento global:
- Conteudo JSON
- CORS liberado (`*`)
- Metodos permitidos: `GET`, `POST`, `OPTIONS`
- `OPTIONS` responde `204`

### 4.1 Cargos

#### GET `?resource=cargos&q=texto`
- Lista cargos
- Filtro opcional por nome via `q`
- Resposta de sucesso: `200`

#### POST `?resource=cargos`
- Cria cargo
- Body JSON:

```json
{
  "nome": "Analista",
  "descricao": "Cargo de analise"
}
```

- Erro de validacao: `422` se `nome` estiver vazio
- Sucesso: `201` com `id` criado

### 4.2 Funcionarios

#### GET `?resource=funcionarios&nome=...&cpf=...&cargo_id=...`
- Lista funcionarios
- Filtros opcionais por nome, CPF e cargo
- Resposta de sucesso: `200`

#### POST `?resource=funcionarios`
- Cria funcionario
- Exemplo de body JSON:

```json
{
  "nome": "Maria Silva",
  "cpf": "12345678901",
  "data_nascimento": "1995-06-10",
  "salario": 3500.50,
  "cargo_id": 1,
  "email": "maria@email.com",
  "telefone": "11999999999",
  "cep": "01001000",
  "logradouro": "Rua Exemplo",
  "numero": "100",
  "complemento": "Apto 12",
  "bairro": "Centro",
  "municipio": "Sao Paulo",
  "uf": "SP"
}
```

- Sucesso: `201`
- Possiveis erros:
  - `422`: nome obrigatorio
  - `422`: CPF invalido
  - `409`: CPF ja cadastrado
  - `422`: data invalida (`YYYY-MM-DD`)
  - `422`: salario <= 0
  - `422`: cargo inexistente

### 4.3 Relatorio

#### GET `?resource=relatorio&nome=...&cargo=...`
- Retorna dados para relatorio
- Filtros opcionais por nome e cargo
- Sucesso: `200`
- Metodo diferente de GET: `405`

### 4.4 Erros gerais
- `404`: rota nao encontrada
- `405`: metodo nao permitido
- `500`: erro interno no servidor

---

## 5. Regras de negocio implementadas

Regras observadas no backend:
- Nome do cargo obrigatorio
- Nome do funcionario obrigatorio
- CPF deve ser valido
- CPF deve ser unico
- Data de nascimento deve ser valida no formato `YYYY-MM-DD`
- Salario deve ser maior que zero
- Cargo informado deve existir no banco

---

## 6. Banco de dados

Arquivo: `database.sql`

### Tabela `cargos`
- `id` (PK, auto incremento)
- `nome` (obrigatorio)
- `descricao` (opcional)
- `created_at`

### Tabela `funcionarios`
- `id` (PK, auto incremento)
- `nome`
- `cpf` (unico)
- `data_nascimento`
- `salario`
- `cargo_id` (FK para `cargos.id`)
- Campos de endereco e contato
- `created_at`

Relacionamento:
- 1 cargo para N funcionarios

---

## 7. Configuracao de ambiente

Variaveis usadas pela conexao (`backend/src/Config/Database.php`):
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASS`

Arquivo de exemplo: `.env.example`

Valores padrao no backend (quando variaveis nao existem):
- Host: `db`
- Porta: `3306`
- Banco: `assim_saude`
- Usuario: `root`
- Senha: `root`

---

## 8. Como executar

As instrucoes detalhadas estao em `README.md` e `QUICKSTART.md`.

### 8.1 Com Docker

```bash
cd docker
docker compose up --build
```

Acesso esperado:
- Frontend: `http://localhost:8080/frontend/index.html`
- API (exemplo): `http://localhost:8080/backend/index.php?resource=cargos`

### 8.2 Sem Docker

```bash
cd backend
composer install
```

Depois, criar/importar banco e subir servidor PHP na raiz do projeto.

---

## 9. Itens fora do escopo atual

Limitacoes observadas:
- Sem autenticacao/autorizacao
- Sem operacoes de edicao e exclusao (foco em criar e listar)
- Sem paginacao nas listagens
- Sem suite de testes automatizados versionada

---

## 10. Resumo executivo

O sistema entrega uma base funcional de gestao de RH, com cadastro e consulta de cargos e funcionarios, validacoes de negocio essenciais e relatorio filtravel. A estrutura esta organizada por camadas no backend e separada do frontend, com suporte de execucao local e via Docker, pronta para evoluir para recursos de seguranca, CRUD completo e testes automatizados.

