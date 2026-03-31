<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\Cargo;
use App\Repository\CargoRepository;

final class CargoController
{
    public function __construct(private readonly CargoRepository $repository)
    {
    }

    public function handle(string $method, array $params, array $body): array
    {
        if ($method === 'GET') {
            $search = isset($params['q']) ? trim((string) $params['q']) : null;
            $items = $this->repository->findAll($search);

            return [200, ['data' => $items]];
        }

        if ($method === 'POST') {
            $nome = trim((string) ($body['nome'] ?? ''));
            $descricao = isset($body['descricao']) ? trim((string) $body['descricao']) : null;

            if ($nome === '') {
                return [422, ['error' => 'Nome do cargo e obrigatorio.']];
            }

            $cargo = new Cargo(null, $nome, $descricao !== '' ? $descricao : null);
            $id = $this->repository->create($cargo);

            return [201, ['message' => 'Cargo criado com sucesso.', 'id' => $id]];
        }

        if ($method === 'PUT') {
            $id = isset($params['id']) ? (int) $params['id'] : 0;
            $nome = trim((string) ($body['nome'] ?? ''));
            $descricao = isset($body['descricao']) ? trim((string) $body['descricao']) : null;

            if ($id <= 0) {
                return [422, ['error' => 'ID do cargo invalido.']];
            }

            if ($nome === '') {
                return [422, ['error' => 'Nome do cargo e obrigatorio.']];
            }

            $cargo = new Cargo($id, $nome, $descricao !== '' ? $descricao : null);
            $this->repository->update($cargo);

            return [200, ['message' => 'Cargo atualizado com sucesso.']];
        }

        if ($method === 'DELETE') {
            $id = isset($params['id']) ? (int) $params['id'] : 0;

            if ($id <= 0) {
                return [422, ['error' => 'ID do cargo invalido.']];
            }

            $this->repository->delete($id);

            return [200, ['message' => 'Cargo deletado com sucesso.']];
        }

        return [405, ['error' => 'Metodo nao permitido.']];
    }
}

