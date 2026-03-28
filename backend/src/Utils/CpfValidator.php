<?php

declare(strict_types=1);

namespace App\Utils;

final class CpfValidator
{
    public static function isValid(string $cpf): bool
    {
        $cpf = preg_replace('/\D/', '', $cpf) ?? '';

        if (strlen($cpf) !== 11 || preg_match('/^(\d)\1{10}$/', $cpf) === 1) {
            return false;
        }

        for ($digit = 9; $digit < 11; $digit++) {
            $sum = 0;
            for ($i = 0; $i < $digit; $i++) {
                $sum += (int) $cpf[$i] * (($digit + 1) - $i);
            }

            $checkDigit = ((10 * $sum) % 11) % 10;
            if ((int) $cpf[$digit] !== $checkDigit) {
                return false;
            }
        }

        return true;
    }
}

