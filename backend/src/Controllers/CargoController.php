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
                return [422, ['error' => 'Nome do cargo é obrigatório.']];
            }

            try {
                $cargo = new Cargo(null, $nome, $descricao !== '' ? $descricao : null);
                $id = $this->repository->create($cargo);
                return [201, ['message' => 'Cargo criado com sucesso.', 'id' => $id]];
            } catch (\Throwable $exception) {
                error_log('Erro ao criar cargo: ' . $exception->getMessage());
                return [500, ['error' => 'Erro ao criar cargo. Tente novamente.']];
            }
        }

        if ($method === 'PUT') {
            $id = isset($params['id']) ? (int) $params['id'] : 0;
            $nome = trim((string) ($body['nome'] ?? ''));
            $descricao = isset($body['descricao']) ? trim((string) $body['descricao']) : null;

            if ($id <= 0) {
                return [400, ['error' => 'ID do cargo é obrigatório e deve ser um número válido.']];
            }

            if ($nome === '') {
                return [422, ['error' => 'Nome do cargo é obrigatório.']];
            }

            if (!$this->repository->existsById($id)) {
                return [404, ['error' => 'Cargo não encontrado.']];
            }

            try {
                $cargo = new Cargo($id, $nome, $descricao !== '' ? $descricao : null);
                $this->repository->update($cargo);
                return [200, ['message' => 'Cargo atualizado com sucesso.']];
            } catch (\Throwable $exception) {
                error_log('Erro ao atualizar cargo ID ' . $id . ': ' . $exception->getMessage());
                return [500, ['error' => 'Erro ao atualizar cargo. Tente novamente.']];
            }
        }

        if ($method === 'DELETE') {
            $id = isset($params['id']) ? (int) $params['id'] : 0;

            if ($id <= 0) {
                return [400, ['error' => 'ID do cargo é obrigatório e deve ser um número válido.']];
            }

            if (!$this->repository->existsById($id)) {
                return [404, ['error' => 'Cargo não encontrado.']];
            }

            if ($this->repository->hasEmployees($id)) {
                return [409, ['error' => 'Não é possível excluir cargo vinculado a funcionários.']];
            }

            try {
                $this->repository->delete($id);
                return [200, ['message' => 'Cargo removido com sucesso.']];
            } catch (\Throwable $exception) {
                error_log('Erro ao deletar cargo ID ' . $id . ': ' . $exception->getMessage());
                return [500, ['error' => 'Erro ao remover cargo. Tente novamente.']];
            }
        }

        return [405, ['error' => 'Metodo nao permitido.']];
    }
}

