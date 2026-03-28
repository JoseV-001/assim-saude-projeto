<?php

declare(strict_types=1);

namespace App\Models;

final class Funcionario
{
    public function __construct(
        public ?int $id,
        public string $nome,
        public string $cpf,
        public string $dataNascimento,
        public float $salario,
        public int $cargoId,
        public ?string $cargoNome = null,
        public ?string $cep = null,
        public ?string $logradouro = null,
        public ?string $numero = null,
        public ?string $complemento = null,
        public ?string $bairro = null,
        public ?string $municipio = null,
        public ?string $uf = null,
        public ?string $email = null,
        public ?string $telefone = null
    ) {
    }
}

