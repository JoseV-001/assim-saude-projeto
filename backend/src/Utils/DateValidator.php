<?php

declare(strict_types=1);

namespace App\Utils;

use DateTimeImmutable;

final class DateValidator
{
    public static function isValid(string $date): bool
    {
        $parsed = DateTimeImmutable::createFromFormat('Y-m-d', $date);

        return $parsed !== false && $parsed->format('Y-m-d') === $date;
    }
}

