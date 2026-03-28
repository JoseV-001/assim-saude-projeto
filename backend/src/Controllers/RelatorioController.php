<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Repository\FuncionarioRepository;

final class RelatorioController
{
    public function __construct(private readonly FuncionarioRepository $repository)
    {
    }

    public function handle(string $method, array $params): array
    {
        if ($method !== 'GET') {
            return [405, ['error' => 'Metodo nao permitido.']];
        }

        $name = isset($params['nome']) ? trim((string) $params['nome']) : null;
        $cargo = isset($params['cargo']) ? trim((string) $params['cargo']) : null;

        $items = $this->repository->report($name, $cargo);

        return [200, ['data' => $items]];
    }
}

