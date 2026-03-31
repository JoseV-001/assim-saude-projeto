<?php

declare(strict_types=1);

use App\Config\Database;
use App\Config\SchemaUpdater;
use App\Controllers\CargoController;
use App\Controllers\FuncionarioController;
use App\Controllers\RelatorioController;
use App\Repository\CargoRepository;
use App\Repository\FuncionarioRepository;

require_once __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    $connection = Database::getConnection();
    SchemaUpdater::ensureFuncionarioColumns($connection);

    $cargoRepository = new CargoRepository($connection);
    $funcionarioRepository = new FuncionarioRepository($connection);

    $cargoController = new CargoController($cargoRepository);
    $funcionarioController = new FuncionarioController($funcionarioRepository, $cargoRepository);
    $relatorioController = new RelatorioController($funcionarioRepository);

    $resource = $_GET['resource'] ?? '';
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    $body = json_decode((string) file_get_contents('php://input'), true);
    $body = is_array($body) ? $body : [];

    switch ($resource) {
        case 'cargos':
            [$status, $response] = $cargoController->handle($method, $_GET, $body);
            break;
        case 'funcionarios':
            [$status, $response] = $funcionarioController->handle($method, $_GET, $body);
            break;
        case 'relatorio':
            [$status, $response] = $relatorioController->handle($method, $_GET);
            break;
        default:
            $status = 404;
            $response = ['error' => 'Rota nao encontrada.'];
            break;
    }

    http_response_code($status);
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
} catch (\Throwable $exception) {
    error_log('Erro não tratado: ' . $exception->getMessage() . ' - ' . $exception->getFile() . ':' . $exception->getLine());
    http_response_code(500);
    echo json_encode([
        'error' => 'Erro interno no servidor.',
    ], JSON_UNESCAPED_UNICODE);
}
