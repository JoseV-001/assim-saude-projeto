<?php

declare(strict_types=1);

namespace App\Config;

use PDO;

final class SchemaUpdater
{
    /**
     * Garante compatibilidade com bancos antigos que nao possuem os campos
     * adicionais de endereco/contato em funcionarios.
     */
    public static function ensureFuncionarioColumns(PDO $connection): void
    {
        $columns = [
            'cep' => 'VARCHAR(8) NULL AFTER cargo_id',
            'logradouro' => 'VARCHAR(255) NULL AFTER cep',
            'numero' => 'VARCHAR(10) NULL AFTER logradouro',
            'complemento' => 'VARCHAR(255) NULL AFTER numero',
            'bairro' => 'VARCHAR(100) NULL AFTER complemento',
            'municipio' => 'VARCHAR(100) NULL AFTER bairro',
            'uf' => 'VARCHAR(2) NULL AFTER municipio',
            'email' => 'VARCHAR(255) NULL AFTER uf',
            'telefone' => 'VARCHAR(20) NULL AFTER email',
        ];

        foreach ($columns as $columnName => $definition) {
            if (!self::columnExists($connection, 'funcionarios', $columnName)) {
                $connection->exec(sprintf('ALTER TABLE funcionarios ADD COLUMN %s %s', $columnName, $definition));
            }
        }
    }

    private static function columnExists(PDO $connection, string $tableName, string $columnName): bool
    {
        $statement = $connection->prepare(
            'SELECT 1
             FROM information_schema.COLUMNS
             WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = :table_name
               AND COLUMN_NAME = :column_name
             LIMIT 1'
        );

        $statement->execute([
            'table_name' => $tableName,
            'column_name' => $columnName,
        ]);

        return (bool) $statement->fetchColumn();
    }
}
