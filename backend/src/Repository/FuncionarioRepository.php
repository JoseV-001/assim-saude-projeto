<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Funcionario;
use PDO;

final class FuncionarioRepository
{
    public function __construct(private readonly PDO $connection)
    {
    }

    public function findAll(?string $name = null, ?string $cpf = null, ?int $cargoId = null): array
    {
        $query = 'SELECT f.id, f.nome, f.cpf, f.data_nascimento, f.salario, f.cargo_id, c.nome AS cargo_nome,
                         f.cep, f.logradouro, f.numero, f.complemento, f.bairro, f.municipio, f.uf, f.email, f.telefone
                  FROM funcionarios f
                  INNER JOIN cargos c ON c.id = f.cargo_id
                  WHERE 1 = 1';
        $params = [];

        if ($name !== null && $name !== '') {
            $query .= ' AND f.nome LIKE :nome';
            $params['nome'] = '%' . $name . '%';
        }

        if ($cpf !== null && $cpf !== '') {
            $cpf = preg_replace('/\D/', '', $cpf) ?? '';
            $query .= ' AND f.cpf = :cpf';
            $params['cpf'] = $cpf;
        }

        if ($cargoId !== null) {
            $query .= ' AND f.cargo_id = :cargo_id';
            $params['cargo_id'] = $cargoId;
        }

        $query .= ' ORDER BY f.nome';

        $statement = $this->connection->prepare($query);
        $statement->execute($params);

        return $statement->fetchAll();
    }

    public function create(Funcionario $funcionario): int
    {
        $statement = $this->connection->prepare(
            'INSERT INTO funcionarios (nome, cpf, data_nascimento, salario, cargo_id, cep, logradouro, numero, complemento, bairro, municipio, uf, email, telefone)
             VALUES (:nome, :cpf, :data_nascimento, :salario, :cargo_id, :cep, :logradouro, :numero, :complemento, :bairro, :municipio, :uf, :email, :telefone)'
        );

        $statement->execute([
            'nome' => $funcionario->nome,
            'cpf' => $funcionario->cpf,
            'data_nascimento' => $funcionario->dataNascimento,
            'salario' => $funcionario->salario,
            'cargo_id' => $funcionario->cargoId,
            'cep' => $funcionario->cep,
            'logradouro' => $funcionario->logradouro,
            'numero' => $funcionario->numero,
            'complemento' => $funcionario->complemento,
            'bairro' => $funcionario->bairro,
            'municipio' => $funcionario->municipio,
            'uf' => $funcionario->uf,
            'email' => $funcionario->email,
            'telefone' => $funcionario->telefone,
        ]);

        return (int) $this->connection->lastInsertId();
    }

    public function cpfExists(string $cpf): bool
    {
        $cpf = preg_replace('/\D/', '', $cpf) ?? '';
        $statement = $this->connection->prepare('SELECT 1 FROM funcionarios WHERE cpf = :cpf LIMIT 1');
        $statement->execute(['cpf' => $cpf]);

        return (bool) $statement->fetchColumn();
    }

    public function report(?string $name = null, ?string $cargo = null): array
    {
        $query = 'SELECT f.nome, f.cpf, f.data_nascimento, f.salario, c.nome AS cargo_nome, f.telefone
                  FROM funcionarios f
                  INNER JOIN cargos c ON c.id = f.cargo_id
                  WHERE 1 = 1';
        $params = [];

        if ($name !== null && $name !== '') {
            $query .= ' AND f.nome LIKE :nome';
            $params['nome'] = '%' . $name . '%';
        }

        if ($cargo !== null && $cargo !== '') {
            $query .= ' AND c.nome LIKE :cargo';
            $params['cargo'] = '%' . $cargo . '%';
        }

        $query .= ' ORDER BY c.nome, f.nome';

        $statement = $this->connection->prepare($query);
        $statement->execute($params);

        return $statement->fetchAll();
    }
}

