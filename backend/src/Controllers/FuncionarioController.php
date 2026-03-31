<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Models\Funcionario;
use App\Repository\CargoRepository;
use App\Repository\FuncionarioRepository;
use App\Utils\CpfValidator;
use App\Utils\DateValidator;
use PDOException;

final class FuncionarioController
{
    public function __construct(
        private readonly FuncionarioRepository $repository,
        private readonly CargoRepository $cargoRepository
    ) {
    }

    public function handle(string $method, array $params, array $body): array
    {
        if ($method === 'GET') {
            $name = isset($params['nome']) ? trim((string) $params['nome']) : null;
            $cpf = isset($params['cpf']) ? trim((string) $params['cpf']) : null;
            $cargoId = isset($params['cargo_id']) && $params['cargo_id'] !== '' ? (int) $params['cargo_id'] : null;
            $items = $this->repository->findAll($name, $cpf, $cargoId);

            return [200, ['data' => $items]];
        }

        if ($method === 'POST') {
            $nome = trim((string) ($body['nome'] ?? ''));
            $cpf = trim((string) ($body['cpf'] ?? ''));
            $cpf = preg_replace('/\D/', '', $cpf) ?? '';
            $dataNascimento = trim((string) ($body['data_nascimento'] ?? ''));
            $salario = (float) ($body['salario'] ?? 0);
            $cargoId = (int) ($body['cargo_id'] ?? 0);
            $cep = isset($body['cep']) ? trim((string) $body['cep']) : null;
            $logradouro = isset($body['logradouro']) ? trim((string) $body['logradouro']) : null;
            $numero = isset($body['numero']) ? trim((string) $body['numero']) : null;
            $complemento = isset($body['complemento']) ? trim((string) $body['complemento']) : null;
            $bairro = isset($body['bairro']) ? trim((string) $body['bairro']) : null;
            $municipio = isset($body['municipio']) ? trim((string) $body['municipio']) : null;
            $uf = isset($body['uf']) ? trim((string) $body['uf']) : null;
            $email = isset($body['email']) ? trim((string) $body['email']) : null;
            $telefone = isset($body['telefone']) ? trim((string) $body['telefone']) : null;

            if ($nome === '') {
                return [422, ['error' => 'Nome do funcionario e obrigatorio.']];
            }

            if (!CpfValidator::isValid($cpf)) {
                return [422, ['error' => 'CPF invalido.']];
            }

            if ($this->repository->cpfExists($cpf)) {
                return [409, ['error' => 'CPF ja cadastrado.']];
            }

            if (!DateValidator::isValid($dataNascimento)) {
                return [422, ['error' => 'Data de nascimento invalida. Use YYYY-MM-DD.']];
            }

            if ($salario <= 0) {
                return [422, ['error' => 'Salario deve ser maior que zero.']];
            }

            if ($cargoId <= 0 || !$this->cargoRepository->existsById($cargoId)) {
                return [422, ['error' => 'Cargo informado nao existe.']];
            }

            $funcionario = new Funcionario(
                null,
                $nome,
                $cpf,
                $dataNascimento,
                $salario,
                $cargoId,
                null,
                $cep,
                $logradouro,
                $numero,
                $complemento,
                $bairro,
                $municipio,
                $uf,
                $email,
                $telefone
            );

            try {
                $id = $this->repository->create($funcionario);
                return [201, ['message' => 'Funcionario criado com sucesso.', 'id' => $id]];
            } catch (PDOException $e) {
                if (strpos($e->getMessage(), 'UNIQUE constraint failed') !== false || 
                    strpos($e->getMessage(), 'Duplicate entry') !== false) {
                    return [409, ['error' => 'CPF ja cadastrado.']];
                }
                throw $e;
            }
        }

        if ($method === 'PUT') {
            $id = isset($params['id']) ? (int) $params['id'] : 0;
            $nome = trim((string) ($body['nome'] ?? ''));
            $cpf = trim((string) ($body['cpf'] ?? ''));
            $cpf = preg_replace('/\D/', '', $cpf) ?? '';
            $dataNascimento = trim((string) ($body['data_nascimento'] ?? ''));
            $salario = (float) ($body['salario'] ?? 0);
            $cargoId = (int) ($body['cargo_id'] ?? 0);
            $cep = isset($body['cep']) ? trim((string) $body['cep']) : null;
            $logradouro = isset($body['logradouro']) ? trim((string) $body['logradouro']) : null;
            $numero = isset($body['numero']) ? trim((string) $body['numero']) : null;
            $complemento = isset($body['complemento']) ? trim((string) $body['complemento']) : null;
            $bairro = isset($body['bairro']) ? trim((string) $body['bairro']) : null;
            $municipio = isset($body['municipio']) ? trim((string) $body['municipio']) : null;
            $uf = isset($body['uf']) ? trim((string) $body['uf']) : null;
            $email = isset($body['email']) ? trim((string) $body['email']) : null;
            $telefone = isset($body['telefone']) ? trim((string) $body['telefone']) : null;

            if ($id <= 0) {
                return [422, ['error' => 'ID do funcionario invalido.']];
            }

            if ($nome === '') {
                return [422, ['error' => 'Nome do funcionario e obrigatorio.']];
            }

            if (!CpfValidator::isValid($cpf)) {
                return [422, ['error' => 'CPF invalido.']];
            }

            if (!DateValidator::isValid($dataNascimento)) {
                return [422, ['error' => 'Data de nascimento invalida. Use YYYY-MM-DD.']];
            }

            if ($salario <= 0) {
                return [422, ['error' => 'Salario deve ser maior que zero.']];
            }

            if ($cargoId <= 0 || !$this->cargoRepository->existsById($cargoId)) {
                return [422, ['error' => 'Cargo informado nao existe.']];
            }

            $funcionario = new Funcionario(
                $id,
                $nome,
                $cpf,
                $dataNascimento,
                $salario,
                $cargoId,
                null,
                $cep,
                $logradouro,
                $numero,
                $complemento,
                $bairro,
                $municipio,
                $uf,
                $email,
                $telefone
            );

            try {
                $this->repository->update($funcionario);
                return [200, ['message' => 'Funcionario atualizado com sucesso.']];
            } catch (PDOException $e) {
                if (strpos($e->getMessage(), 'UNIQUE constraint failed') !== false || 
                    strpos($e->getMessage(), 'Duplicate entry') !== false) {
                    return [409, ['error' => 'CPF ja cadastrado.']];
                }
                throw $e;
            }
        }

        if ($method === 'DELETE') {
            $id = isset($params['id']) ? (int) $params['id'] : 0;

            if ($id <= 0) {
                return [422, ['error' => 'ID do funcionario invalido.']];
            }

            $this->repository->delete($id);

            return [200, ['message' => 'Funcionario deletado com sucesso.']];
        }

        return [405, ['error' => 'Metodo nao permitido.']];
    }
}

