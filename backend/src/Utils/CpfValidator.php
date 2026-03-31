<?php

declare(strict_types=1);

namespace App\Utils;

final class CpfValidator
{
    public static function normalize(string $cpf): string
    {
        return preg_replace('/\D/', '', $cpf) ?? '';
    }

    public static function isValid(string $cpf): bool
    {
        $normalizedCpf = self::normalize($cpf);

        if (strlen($normalizedCpf) !== 11) {
            return false;
        }

        return !preg_match('/^(\d)\1{10}$/', $normalizedCpf);
    }
}

