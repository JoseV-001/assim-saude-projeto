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

-- Inserir 10 cargos de exemplo
INSERT INTO cargos (nome, descricao) VALUES
  ('Analista de Sistemas', 'Levantamento de requisitos, modelagem e melhoria de processos de sistemas.'),
  ('Desenvolvedor Backend', 'Implementacao de APIs, regras de negocio e integracao com banco de dados.'),
  ('Desenvolvedor Frontend', 'Construcao de interfaces web com foco em usabilidade e manutencao.'),
  ('Analista de RH', 'Apoio nos processos de recrutamento, onboarding e desenvolvimento de pessoas.'),
  ('Analista Financeiro', 'Controle de fluxo de caixa, conciliacoes e apoio a planejamento financeiro.'),
  ('Assistente Administrativo', 'Suporte operacional e organizacao de documentos e rotinas administrativas.'),
  ('Coordenador de Projetos', 'Planejamento, acompanhamento de cronograma e gestao de entregas.'),
  ('Tecnico de Suporte', 'Atendimento a chamados e manutencao de equipamentos e sistemas internos.'),
  ('Analista de Dados', 'Analise de indicadores, criacao de relatorios e suporte a decisoes.'),
  ('Especialista em Qualidade', 'Definicao de padroes e auditoria de qualidade em processos internos.');

-- Inserir 50 funcionarios de exemplo
INSERT INTO funcionarios (nome, cpf, data_nascimento, salario, cargo_id, cep, logradouro, numero, complemento, bairro, municipio, uf, email, telefone) VALUES
  ('Gustavo Almeida Dias', '46504038473', '1990-07-16', 5807.00, 1, '55769631', 'Rua Marechal Deodoro', '8303', NULL, 'Bela Vista', 'Sao Paulo', 'SP', 'gustavo.almeida.dias01@gmail.com', '81992059349'),
  ('Ricardo Araujo Gomes', '62797334329', '1982-07-10', 4376.00, 2, '96954886', 'Rua das Acacias', '8670', NULL, 'Boa Viagem', 'Recife', 'PE', 'ricardo.araujo.gomes02@gmail.com', '21930117943'),
  ('Alexandre Rodrigues Souza', '78141632000', '2004-01-12', 8690.00, 3, '77591519', 'Avenida Paulista', '4194', NULL, 'Bela Vista', 'Sao Paulo', 'SP', 'alexandre.rodrigues.souza03@gmail.com', '81957157585'),
  ('Vinicius Martins Santos', '09091896760', '2001-05-24', 4768.00, 4, '29178606', 'Avenida Sete de Setembro', '3096', NULL, 'Boa Viagem', 'Recife', 'PE', 'vinicius.martins.santos04@gmail.com', '71990595208'),
  ('Alexandre Almeida Oliveira', '26827630307', '1981-09-08', 12949.00, 5, '38982554', 'Avenida Sete de Setembro', '6801', NULL, 'Aldeota', 'Fortaleza', 'CE', 'alexandre.almeida.oliveira05@gmail.com', '31968282100'),
  ('Anderson Costa Gomes', '69242023302', '1976-05-23', 2981.00, 6, '94892599', 'Avenida Brasil', '3754', NULL, 'Pituba', 'Salvador', 'BA', 'anderson.costa.gomes06@gmail.com', '31940107088'),
  ('Camila Martins Barbosa', '14108517962', '1974-04-14', 8881.00, 7, '03163625', 'Avenida Sete de Setembro', '9074', NULL, 'Funcionarios', 'Belo Horizonte', 'MG', 'camila.martins.barbosa07@gmail.com', '41905248431'),
  ('Carlos Silva Barbosa', '42213708746', '2003-04-24', 9757.00, 8, '54723793', 'Rua das Acacias', '3859', NULL, 'Centro', 'Rio de Janeiro', 'RJ', 'carlos.silva.barbosa08@gmail.com', '71925084135'),
  ('Priscila Gomes Lima', '76227165107', '1999-06-12', 8386.00, 9, '50858861', 'Rua das Flores', '7778', NULL, 'Bela Vista', 'Sao Paulo', 'SP', 'priscila.gomes.lima09@gmail.com', '21910291609'),
  ('Anderson Costa Souza', '08534983429', '2002-03-20', 4196.00, 10, '29863947', 'Avenida Paulista', '9176', NULL, 'Centro Civico', 'Curitiba', 'PR', 'anderson.costa.souza10@gmail.com', '85901427104'),
  ('Patricia Freitas Nogueira', '16914967156', '1981-05-25', 8299.00, 1, '40462073', 'Rua Primeiro de Maio', '6389', NULL, 'Aldeota', 'Fortaleza', 'CE', 'patricia.freitas.nogueira11@gmail.com', '91909582377'),
  ('Priscila Freitas Nogueira', '69720063335', '1989-06-06', 6910.00, 2, '01027416', 'Rua Visconde de Piraja', '66', NULL, 'Centro Civico', 'Curitiba', 'PR', 'priscila.freitas.nogueira12@gmail.com', '81939882989'),
  ('Natasha Ribeiro Pereira', '70337558809', '1973-04-11', 4447.00, 3, '56543814', 'Rua do Comercio', '7833', 'Apto 541', 'Funcionarios', 'Belo Horizonte', 'MG', 'natasha.ribeiro.pereira13@gmail.com', '21987690957'),
  ('Felipe Rodrigues Ferreira', '50708962700', '1986-03-27', 14973.00, 4, '25264920', 'Avenida Atlantica', '7536', 'Apto 415', 'Centro', 'Rio de Janeiro', 'RJ', 'felipe.rodrigues.ferreira14@gmail.com', '21929947997'),
  ('Vanessa Carvalho Nogueira', '47421156941', '1983-01-23', 8305.00, 5, '58832903', 'Avenida Brasil', '453', 'Apto 763', 'Bela Vista', 'Sao Paulo', 'SP', 'vanessa.carvalho.nogueira15@gmail.com', '71985254399'),
  ('Priscila Costa Freitas', '66473514260', '1976-11-05', 5662.00, 6, '85879194', 'Rua Visconde de Piraja', '867', 'Apto 320', 'Aldeota', 'Fortaleza', 'CE', 'priscila.costa.freitas16@gmail.com', '71938690355'),
  ('Leandro Carvalho Almeida', '38311808147', '1982-12-05', 4440.00, 7, '51744384', 'Rua Marechal Deodoro', '7681', 'Apto 770', 'Pituba', 'Salvador', 'BA', 'leandro.carvalho.almeida17@gmail.com', '81969600504'),
  ('Fernanda Rodrigues Ferreira', '67999709603', '1992-05-08', 14372.00, 8, '09267462', 'Avenida Paulista', '4871', 'Apto 531', 'Pituba', 'Salvador', 'BA', 'fernanda.rodrigues.ferreira18@gmail.com', '41962514801'),
  ('Fernanda Barbosa Almeida', '49311526193', '1987-02-18', 12898.00, 9, '23976737', 'Avenida Sete de Setembro', '8289', NULL, 'Funcionarios', 'Belo Horizonte', 'MG', 'fernanda.barbosa.almeida19@gmail.com', '61990388935'),
  ('Larissa Oliveira Rodrigues', '07598753750', '1994-08-21', 4000.00, 10, '08081826', 'Rua Visconde de Piraja', '3751', NULL, 'Centro Civico', 'Curitiba', 'PR', 'larissa.oliveira.rodrigues20@gmail.com', '85949875469'),
  ('Bruno Pereira Araujo', '95435799201', '1997-07-24', 5556.00, 1, '81028136', 'Avenida Sete de Setembro', '6734', NULL, 'Centro Civico', 'Curitiba', 'PR', 'bruno.pereira.araujo21@gmail.com', '41980316409'),
  ('Renata Santos Lima', '27525127247', '1979-05-15', 12422.00, 2, '20364971', 'Rua Primeiro de Maio', '8561', 'Apto 160', 'Funcionarios', 'Belo Horizonte', 'MG', 'renata.santos.lima22@gmail.com', '71939004146'),
  ('Juliana Rodrigues Pereira', '39814388840', '1970-05-12', 3752.00, 3, '81225082', 'Avenida Sete de Setembro', '4667', 'Apto 653', 'Aldeota', 'Fortaleza', 'CE', 'juliana.rodrigues.pereira23@gmail.com', '71934686063'),
  ('Felipe Almeida Dias', '13728141089', '1979-02-17', 14117.00, 4, '89302472', 'Avenida Paulista', '9905', 'Apto 713', 'Aldeota', 'Fortaleza', 'CE', 'felipe.almeida.dias24@gmail.com', '21922884977'),
  ('Natasha Oliveira Ribeiro', '41984976214', '1977-03-17', 6723.00, 5, '39195778', 'Rua Primeiro de Maio', '8130', 'Apto 162', 'Funcionarios', 'Belo Horizonte', 'MG', 'natasha.oliveira.ribeiro25@gmail.com', '31935841025'),
  ('Vinicius Costa Dias', '57125880800', '1988-02-25', 10749.00, 6, '38388705', 'Avenida Sete de Setembro', '2528', 'Apto 405', 'Boa Viagem', 'Recife', 'PE', 'vinicius.costa.dias26@gmail.com', '71988594562'),
  ('Anderson Martins Costa', '15139532140', '1977-04-12', 4918.00, 7, '71915922', 'Avenida Paulista', '2901', 'Apto 613', 'Boa Viagem', 'Recife', 'PE', 'anderson.martins.costa27@gmail.com', '85926250130'),
  ('Eduardo Nogueira Ribeiro', '63927600164', '1982-04-06', 3701.00, 8, '86427432', 'Rua Visconde de Piraja', '3257', NULL, 'Centro', 'Rio de Janeiro', 'RJ', 'eduardo.nogueira.ribeiro28@gmail.com', '71987043028'),
  ('Eduardo Dias Barbosa', '24420749580', '1973-01-23', 10308.00, 9, '76220825', 'Avenida Atlantica', '252', 'Apto 458', 'Aldeota', 'Fortaleza', 'CE', 'eduardo.dias.barbosa29@gmail.com', '51994066134'),
  ('Thiago Souza Almeida', '59016135545', '2004-07-19', 12905.00, 10, '96394978', 'Rua das Acacias', '7676', 'Apto 875', 'Boa Viagem', 'Recife', 'PE', 'thiago.souza.almeida30@gmail.com', '51966693282'),
  ('Renata Almeida Freitas', '95535746452', '1995-02-12', 4114.00, 1, '70569983', 'Rua Primeiro de Maio', '8358', 'Apto 392', 'Centro Civico', 'Curitiba', 'PR', 'renata.almeida.freitas31@gmail.com', '81938907392'),
  ('Mariana Santos Araujo', '70764364421', '2000-03-19', 10112.00, 2, '84571391', 'Rua Visconde de Piraja', '1298', NULL, 'Asa Sul', 'Brasilia', 'DF', 'mariana.santos.araujo32@gmail.com', '11902190542'),
  ('Vinicius Lima Rodrigues', '11854940651', '1977-02-14', 3918.00, 3, '07722098', 'Avenida Brasil', '1160', NULL, 'Boa Viagem', 'Recife', 'PE', 'vinicius.lima.rodrigues33@gmail.com', '61954258215'),
  ('Alexandre Almeida Dias', '60548639167', '1970-12-15', 5788.00, 4, '97475690', 'Avenida Brasil', '7656', NULL, 'Boa Viagem', 'Recife', 'PE', 'alexandre.almeida.dias34@gmail.com', '91940385770'),
  ('Gustavo Ribeiro Souza', '24039204875', '1985-10-10', 6861.00, 5, '62090332', 'Rua Primeiro de Maio', '5880', NULL, 'Boa Viagem', 'Recife', 'PE', 'gustavo.ribeiro.souza35@gmail.com', '81927321327'),
  ('Vinicius Santos Araujo', '85733569280', '1982-10-25', 8794.00, 6, '20527961', 'Rua Marechal Deodoro', '1337', NULL, 'Aldeota', 'Fortaleza', 'CE', 'vinicius.santos.araujo36@gmail.com', '91970160442'),
  ('Alexandre Melo Silva', '37299538342', '1977-02-18', 3077.00, 7, '19741054', 'Avenida Sete de Setembro', '5319', 'Apto 541', 'Pituba', 'Salvador', 'BA', 'alexandre.melo.silva37@gmail.com', '81927335212'),
  ('Monica Araujo Freitas', '82335305492', '1999-08-09', 7293.00, 8, '24793320', 'Rua Marechal Deodoro', '2937', 'Apto 656', 'Asa Sul', 'Brasilia', 'DF', 'monica.araujo.freitas38@gmail.com', '81950088886'),
  ('Alexandre Martins Rodrigues', '42104677904', '1976-10-25', 5676.00, 9, '46510625', 'Rua Marechal Deodoro', '3073', 'Apto 204', 'Pituba', 'Salvador', 'BA', 'alexandre.martins.rodrigues39@gmail.com', '81980031584'),
  ('Eduardo Silva Carvalho', '41977689400', '1992-04-04', 11317.00, 10, '51160146', 'Avenida Brasil', '8960', NULL, 'Centro', 'Rio de Janeiro', 'RJ', 'eduardo.silva.carvalho40@gmail.com', '71902653011'),
  ('Rodrigo Carvalho Pereira', '79828713560', '1991-03-25', 9833.00, 1, '95843098', 'Rua do Comercio', '7480', 'Apto 941', 'Boa Viagem', 'Recife', 'PE', 'rodrigo.carvalho.pereira41@gmail.com', '71933773887'),
  ('Eduardo Santos Barbosa', '80294957499', '1992-08-01', 11719.00, 2, '61727266', 'Rua do Comercio', '1123', 'Apto 463', 'Funcionarios', 'Belo Horizonte', 'MG', 'eduardo.santos.barbosa42@gmail.com', '71949479179'),
  ('Natasha Carvalho Oliveira', '17431457138', '2000-01-11', 4957.00, 3, '56735932', 'Rua das Flores', '306', NULL, 'Boa Viagem', 'Recife', 'PE', 'natasha.carvalho.oliveira43@gmail.com', '61965852122'),
  ('Renata Martins Araujo', '54489667302', '1988-02-15', 3825.00, 4, '26324722', 'Rua Primeiro de Maio', '4872', 'Apto 895', 'Bela Vista', 'Sao Paulo', 'SP', 'renata.martins.araujo44@gmail.com', '91928906456'),
  ('Camila Gomes Costa', '50783847823', '1981-12-19', 3246.00, 5, '93061969', 'Rua Primeiro de Maio', '7966', NULL, 'Boa Viagem', 'Recife', 'PE', 'camila.gomes.costa45@gmail.com', '85931396802'),
  ('Juliana Dias Araujo', '95932212047', '1988-04-05', 7610.00, 6, '22830733', 'Rua Primeiro de Maio', '8380', 'Apto 588', 'Aldeota', 'Fortaleza', 'CE', 'juliana.dias.araujo46@gmail.com', '21934561485'),
  ('Tatiane Santos Melo', '81710630981', '1984-11-07', 11747.00, 7, '71783190', 'Avenida Sete de Setembro', '7208', NULL, 'Asa Sul', 'Brasilia', 'DF', 'tatiane.santos.melo47@gmail.com', '81906140041'),
  ('Lucas Gomes Carvalho', '41542486858', '2004-03-16', 7141.00, 8, '27359396', 'Avenida Atlantica', '7843', NULL, 'Pituba', 'Salvador', 'BA', 'lucas.gomes.carvalho48@gmail.com', '21927409325'),
  ('Anderson Silva Oliveira', '22502947715', '1987-01-15', 11402.00, 9, '54525640', 'Rua das Flores', '5149', NULL, 'Pituba', 'Salvador', 'BA', 'anderson.silva.oliveira49@gmail.com', '81935836183'),
  ('Fernanda Rodrigues Souza', '74537870176', '1998-05-06', 13208.00, 10, '01035684', 'Rua das Acacias', '8911', NULL, 'Funcionarios', 'Belo Horizonte', 'MG', 'fernanda.rodrigues.souza50@gmail.com', '91919748524');

