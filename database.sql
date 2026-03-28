CREATE DATABASE IF NOT EXISTS assim_saude;
USE assim_saude;

CREATE TABLE IF NOT EXISTS cargos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  descricao VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS funcionarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  cpf CHAR(11) NOT NULL UNIQUE,
  data_nascimento DATE NOT NULL,
  salario DECIMAL(10,2) NOT NULL,
  cargo_id INT NOT NULL,
  cep VARCHAR(8),
  logradouro VARCHAR(255),
  numero VARCHAR(10),
  complemento VARCHAR(255),
  bairro VARCHAR(100),
  municipio VARCHAR(100),
  uf VARCHAR(2),
  email VARCHAR(255),
  telefone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_funcionario_cargo FOREIGN KEY (cargo_id) REFERENCES cargos(id)
);

