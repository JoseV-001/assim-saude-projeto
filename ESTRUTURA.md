# Estrutura do Projeto

```text
sistema-assim-saude/
├── backend/
│   ├── index.php
│   ├── composer.json
│   ├── .htaccess
│   └── src/
│       ├── Config/
│       │   └── Database.php
│       ├── Models/
│       │   ├── Cargo.php
│       │   └── Funcionario.php
│       ├── Controllers/
│       │   ├── CargoController.php
│       │   ├── FuncionarioController.php
│       │   └── RelatorioController.php
│       ├── Repository/
│       │   ├── CargoRepository.php
│       │   └── FuncionarioRepository.php
│       └── Utils/
│           ├── CpfValidator.php
│           └── DateValidator.php
├── frontend/
│   ├── index.html
│   ├── cargos.html
│   ├── funcionarios.html
│   ├── relatorio.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── cargo.js
│       ├── funcionario.js
│       └── relatorio.js
├── docker/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   ├── limpar-banco.bat
│   └── limpar-banco.sh
├── database.sql
├── README.md
├── QUICKSTART.md
└── ESTRUTURA.md
```

## Responsabilidades por camada

- Backend (`backend/src`): regras de negocio, validacoes, acesso ao banco e roteamento da API
- Frontend (`frontend`): telas HTML, estilo CSS e chamadas da API em JavaScript
- Docker (`docker`): ambiente local de execucao da aplicacao e banco

## Status

- ✅ Estrutura alinhada com MVC
- ✅ Separacao entre frontend, backend e infraestrutura
- ❌ Ainda sem modulo de autenticacao
