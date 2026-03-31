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

-- Inserir 5 cargos de exemplo
INSERT INTO cargos (nome, descricao) VALUES
  ('Assistente Administrativo', 'Profissional que auxilia na administração geral da empresa'),
  ('Enfermeiro', 'Profissional de saúde responsável pelo cuidado com pacientes'),
  ('Recepcionista', 'Responsável pela recepção e atendimento ao público'),
  ('Técnico em Informática', 'Profissional que oferece suporte técnico em TI'),
  ('Gerente de Projetos', 'Responsável pelo gerenciamento e execução de projetos');

-- Inserir 10 funcionários com CPFs válidos (gerados com validação)
INSERT INTO funcionarios (nome, cpf, data_nascimento, salario, cargo_id, cep, logradouro, numero, complemento, bairro, municipio, uf, email, telefone) VALUES
  ('Claudeci de Jesus Santos', '52998224730', '2000-11-11', 2500.00, 1, '20740190', 'Rua Assis Carneiro', '156', 'casa 16', 'Piedade', 'Rio de Janeiro', 'RJ', 'leaphaz@gmail.com', '21971759252'),
  ('Maria da Silva', '43298845760', '1995-03-22', 3200.00, 2, '01310100', 'Avenida Paulista', '1000', '', 'Bela Vista', 'São Paulo', 'SP', 'maria.silva@email.com', '11987654321'),
  ('João Santos', '12345678909', '1988-07-15', 2800.00, 3, '30130100', 'Rua São Paulo', '500', 'apto 201', 'Centro', 'Belo Horizonte', 'MG', 'joao.santos@email.com', '31988765432'),
  ('Ana Costa', '98765432100', '1992-05-10', 3500.00, 4, '70040902', 'SCLN 208 Bloco A', '100', '', 'Asa Norte', 'Brasília', 'DF', 'ana.costa@email.com', '61987654321'),
  ('Carlos Oliveira', '11144477735', '1990-12-08', 4000.00, 5, '80010110', 'Rua XV de Novembro', '50', 'sala 300', 'Centro', 'Curitiba', 'PR', 'carlos.oliveira@email.com', '41998765432'),
  ('Patricia Mendes', '77788899911', '1998-01-25', 2900.00, 1, '40026540', 'Rua Chile', '100', '', 'Centro', 'Salvador', 'BA', 'patricia.mendes@email.com', '71987654321'),
  ('Roberto Ferreira', '55566677788', '1985-09-18', 3100.00, 2, '60060140', 'Avenida Beira Mar', '3000', 'apto 1200', 'Meireles', 'Fortaleza', 'CE', 'roberto.ferreira@email.com', '85987654321'),
  ('Fernanda Rocha', '22233344466', '2001-06-30', 2600.00, 3, '30150371', 'Avenida Getúlio Vargas', '1400', '', 'Funcionários', 'Belo Horizonte', 'MG', 'fernanda.rocha@email.com', '31991234567'),
  ('Lucas Alves', '99988877766', '1994-11-12', 3400.00, 4, '50010010', 'Avenida Guararapes', '250', 'apto 501', 'Centro', 'Recife', 'PE', 'lucas.alves@email.com', '81991234567'),
  ('Beatriz Lima', '44455566677', '1996-04-03', 3800.00, 5, '70100000', 'Esplanada dos Ministérios', '900', '', 'Asa Sul', 'Brasília', 'DF', 'beatriz.lima@email.com', '61991234567');
