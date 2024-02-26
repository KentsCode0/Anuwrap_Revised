<?php

require_once __DIR__ . "/../bootstrap.php";

use Src\Routes\Api\V1\Router;

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Set content type
header("Content-Type: application/json; charset=UTF-8");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ($uri[3] === "public" && $uri[4] === "api") {
    $router = new Router();

    $route = "/" . implode("/", array_splice($uri, 5));

    $router->handle($_SERVER['REQUEST_METHOD'], $route);
} else {
    http_response_code(404);
    echo json_encode(array("error" => "Page not found"));
}
