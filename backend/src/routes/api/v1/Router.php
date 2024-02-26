<?php

namespace Src\Routes\Api\V1;

use FastRoute;
use Src\Controllers\SessionController;
use Src\Controllers\UserController;

class Router
{
    private $dispatcher;
    public function __construct()
    {
        $this->dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
            $r->addRoute('POST', '/user', [UserController::class, 'postUser']);
            $r->addRoute('GET', '/user/{name}', [UserController::class, 'getUser']);

            $r->addRoute('POST', '/session', [SessionController::class, 'getSession']);
        });
    }

    public function handle($method, $uri)
    {
        $routeInfo = $this->dispatcher->dispatch($method, $uri);

        switch ($routeInfo[0]) {
            case FastRoute\Dispatcher::NOT_FOUND:
                http_response_code(404);
                echo json_encode(array("error" => "Not found"));
                break;
            case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
                http_response_code(405);
                echo json_encode(array("error" => "Method not allowed"));
                break;
            case FastRoute\Dispatcher::FOUND:
                $controllerName = $routeInfo[1][0];
                $method = $routeInfo[1][1];
                $vars = $routeInfo[2];

                $controller = new $controllerName();

                if (count($vars) == 0) {
                    $controller->$method();
                } else {
                    $controller->$method($vars);
                }
                break;
        }
    }
}
