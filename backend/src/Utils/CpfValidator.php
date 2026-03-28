<?php

declare(strict_types=1);

namespace App\Utils;

final class CpfValidator
{
    public static function isValid(string $cpf): bool
    {
        $cpf = preg_replace('/\D/', '', $cpf) ?? '';

        return strlen($cpf) === 11;
    }
}

