<?php

declare(strict_types=1);

namespace App\Repository;

use App\Models\Cargo;
use PDO;

final class CargoRepository
{
    public function __construct(private readonly PDO $connection)
    {
    }

    public function findAll(?string $search = null): array
    {
        $query = 'SELECT id, nome, descricao FROM cargos';
        $params = [];

        if ($search !== null && $search !== '') {
            $query .= ' WHERE nome LIKE :search';
            $params['search'] = '%' . $search . '%';
        }

        $query .= ' ORDER BY nome';

        $statement = $this->connection->prepare($query);
        $statement->execute($params);

        return $statement->fetchAll();
    }

    public function create(Cargo $cargo): int
    {
        $statement = $this->connection->prepare(
            'INSERT INTO cargos (nome, descricao) VALUES (:nome, :descricao)'
        );

        $statement->execute([
            'nome' => $cargo->nome,
            'descricao' => $cargo->descricao,
        ]);

        return (int) $this->connection->lastInsertId();
    }

    public function existsById(int $id): bool
    {
        $statement = $this->connection->prepare('SELECT 1 FROM cargos WHERE id = :id LIMIT 1');
        $statement->execute(['id' => $id]);

        return (bool) $statement->fetchColumn();
    }

    public function update(Cargo $cargo): void
    {
        $statement = $this->connection->prepare(
            'UPDATE cargos SET nome = :nome, descricao = :descricao WHERE id = :id'
        );

        $statement->execute([
            'id' => $cargo->id,
            'nome' => $cargo->nome,
            'descricao' => $cargo->descricao,
        ]);
    }

    public function hasEmployees(int $id): bool
    {
        $statement = $this->connection->prepare('SELECT 1 FROM funcionarios WHERE cargo_id = :id LIMIT 1');
        $statement->execute(['id' => $id]);

        return (bool) $statement->fetchColumn();
    }

    public function delete(int $id): void
    {
        $statement = $this->connection->prepare('DELETE FROM cargos WHERE id = :id');
        $statement->execute(['id' => $id]);
    }
}

