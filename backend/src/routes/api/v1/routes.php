<?php
namespace Src\Routes\Api\V1;

use FastRoute;
use Src\Controllers\UserController;

class Router {
    protected $dispatcher;

    public function __construct() {
        $this->dispatcher = FastRoute\simpleDispatcher(function(FastRoute\RouteCollector $r) {
            $r->addRoute('POST', '/user', [UserController::class, 'postUser']);
            $r->addRoute('GET', '/users', [UserController::class, 'getUsers']);
            $r->addRoute('GET', '/user/{name}', [UserController::class, 'getUser']);
        });
    }

    public function handle($method, $uri) {
        $routeInfo = $this->dispatcher->dispatch($method, $uri);
        switch ($routeInfo[0]) {
            case FastRoute\Dispatcher::NOT_FOUND:
                echo "Page does not exist";
                http_response_code(404);
                break;
            case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
                echo "Method not allowed";
                http_response_code(405);
                break;
            case FastRoute\Dispatcher::FOUND:
                $controllerName = $routeInfo[1][0];
                $method = $routeInfo[1][1];
                $vars = $routeInfo[2];
                var_dump($controllerName);
                var_dump($method);
                var_dump($vars);
                // Instantiate the controller
                $controller = new $controllerName();

                // Call the method
                $vars = $routeInfo[2];
                $controller->$method($vars);

                // Set HTTP response code
                http_response_code(200);
                break;
        }
    }
}
