<?php

require_once __DIR__ . "/../bootstrap.php";

use Src\Routes\Api\V1\Router;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode('/', $uri);

if ($uri[3] === "public" && $uri[4] === "api") {
    require_once __DIR__ . '/../src/routes/api/v1/routes.php';
    var_dump($_POST);
    $router = new Router();
    $route = "/" . implode("/", array_splice($uri, 5));
    $router->handle($_SERVER['REQUEST_METHOD'], $route);
} else {
    echo "Page does not exist"; // Display error message
    http_response_code(404); // Set HTTP response code
}
