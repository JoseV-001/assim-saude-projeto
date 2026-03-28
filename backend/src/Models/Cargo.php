<?php

declare(strict_types=1);

namespace App\Models;

final class Cargo
{
    public function __construct(
        public ?int $id,
        public string $nome,
        public ?string $descricao = null
    ) {
    }
}

