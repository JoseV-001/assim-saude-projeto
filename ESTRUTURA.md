# Estrutura do Projeto

```text
sistema-assim-saude/
├── backend/
│   ├── .htaccess
│   ├── composer.json
│   ├── composer.lock
│   ├── index.php
│   ├── src/
│   │   ├── Config/
│   │   │   ├── Database.php
│   │   │   └── SchemaUpdater.php
│   │   ├── Controllers/
│   │   │   ├── CargoController.php
│   │   │   ├── FuncionarioController.php
│   │   │   └── RelatorioController.php
│   │   ├── Models/
│   │   │   ├── Cargo.php
│   │   │   └── Funcionario.php
│   │   ├── Repository/
│   │   │   ├── CargoRepository.php
│   │   │   └── FuncionarioRepository.php
│   │   └── Utils/
│   │       ├── CpfValidator.php
│   │       └── DateValidator.php
│   └── vendor/
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
│   ├── docker-compose.override.yml.example
│   ├── limpar-banco.bat
│   └── limpar-banco.sh
├── .env.example
├── .gitignore
├── database.sql
├── iniciar.bat
├── iniciar.sh
├── README.md
└── ESTRUTURA.md
```

## Responsabilidades por camada

- Backend (`backend/src`): regras de negocio, validacoes, roteamento da API e acesso a dados com PDO
- Frontend (`frontend`): telas HTML, estilo CSS e consumo da API via JavaScript
- Docker (`docker`): ambiente local de execucao da aplicacao PHP + MySQL

## Observacoes

- O projeto segue arquitetura MVC no backend.
- O banco inicial e criado a partir de `database.sql` no ambiente Docker.
- Nao ha modulo de autenticacao (escopo da avaliacao tecnica).
