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

        return [405, ['error' => 'Metodo nao permitido.']];
    }
}

