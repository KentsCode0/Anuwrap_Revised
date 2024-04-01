<?php

namespace Src\Routes\Api\V1;

use FastRoute;
use Src\Controllers\ReportController;
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
            $r->addRoute('POST', '/users', [UserController::class, 'postUser']);
            $r->addRoute('GET', '/users/{userId:\d+}', [UserController::class, 'getUser']);
            $r->addRoute('PUT', '/users/{userId:\d+}', [UserController::class, 'updateUser']);
            $r->addRoute('DELETE', '/users/{userId:\d+}', [UserController::class, 'deleteUser']);

            $r->addRoute('POST', '/token', [TokenController::class, 'postToken']);

            $r->addRoute('POST', '/users/{userId:\d+}/workspaces', [WorkspaceController::class, 'createWorkspace']);
            $r->addRoute('GET', '/users/{userId:\d+}/workspaces', [WorkspaceController::class, 'getAllWorkspace']);
            $r->addRoute('GET', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}', [WorkspaceController::class, 'getWorkspace']);
            $r->addRoute('PUT', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}', [WorkspaceController::class, 'updateWorkspace']);
            $r->addRoute('DELETE', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}', [WorkspaceController::class, 'deleteWorkspace']);
            
            $r->addRoute('POST', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/userworkspaces', [UserWorkspaceController::class, 'createUserWorkspace']);
            $r->addRoute('GET', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/userworkspaces', [UserWorkspaceController::class, 'getAllUserWorkspace']);
            $r->addRoute('PUT', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/userworkspaces', [UserWorkspaceController::class, 'updateUserWorkspace']);
            $r->addRoute('DELETE', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/userworkspaces', [UserWorkspaceController::class, 'deleteUserWorkspace']);
            
            $r->addRoute('GET', '/report-types', [ReportController::class, 'getAllReportType']);

            $r->addRoute('POST', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/reports', [ReportController::class, 'createReport']);
            $r->addRoute('GET', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/reports', [ReportController::class, 'getAllReport']);
            $r->addRoute('GET', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/reports/{reportId:\d+}', [ReportController::class, 'getReport']);
            $r->addRoute('PUT', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/reports/{reportId:\d+}', [ReportController::class, 'updateReport']);
            $r->addRoute('DELETE', '/users/{userId:\d+}/workspaces/{workspaceId:\d+}/reports/{reportId:\d+}', [ReportController::class, 'deleteReport']);
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
