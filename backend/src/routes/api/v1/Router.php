<?php

namespace Src\Routes\Api\V1;

use FastRoute;
use Src\Controllers\TokenController;
use Src\Controllers\UserController;
use Src\Controllers\WorkspaceController;
use Src\Controllers\UserWorkspaceController;

class Router
{
    private $dispatcher;
    public function __construct()
    {
        $this->dispatcher = FastRoute\simpleDispatcher(function (FastRoute\RouteCollector $r) {
            $r->addRoute('POST', '/user', [UserController::class, 'postUser']);
            $r->addRoute('GET', '/user/{id:\d+}', [UserController::class, 'getUser']);
            $r->addRoute('POST', '/user/{id:\d+}', [UserController::class, 'updateUser']);
            $r->addRoute('DELETE', '/user/{id:\d+}', [UserController::class, 'deleteUser']);
            $r->addRoute('POST', '/token', [TokenController::class, 'postToken']);
            $r->addRoute('DELETE', '/token', [TokenController::class, 'deleteToken']);
            $r->addRoute('POST', '/workspace', [WorkspaceController::class, 'createWorkspace']);
            $r->addRoute('GET', '/workspace/{id:\d+}', [WorkspaceController::class, 'getWorkspace']);
            $r->addRoute('POST', '/workspace/{id:\d+}', [WorkspaceController::class, 'updateWorkspace']);
            $r->addRoute('DELETE', '/workspace/{id:\d+}', [WorkspaceController::class, 'deleteWorkspace']);
            $r->addRoute('POST', '/userworkspace', [UserWorkspaceController::class, 'createUserWorkspace']);
            $r->addRoute('GET', '/userworkspace/{id:\d+}', [UserWorkspaceController::class, 'getUserWorkspace']);
            $r->addRoute('POST', '/userworkspace/{id:\d+}', [UserWorkspaceController::class, 'updateUserWorkspace']);
            $r->addRoute('DELETE', '/userworkspace/{id:\d+}', [UserWorkspaceController::class, 'deleteUserWorkspace']);
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
