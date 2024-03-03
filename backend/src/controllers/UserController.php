<?php

namespace Src\Controllers;

use Src\Models\User;
use Src\Config\DatabaseConnector;
use Src\Services\AuthorizationService;
use Src\Services\TokenService;
use Src\Services\UserService;

class UserController
{
    private $pdo;
    private $userService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->userService = new UserService();
    }
    function getUser($request)
    {
        $payload = $this->userService->getInformation($request["id"]);
        http_response_code($payload["code"]);
        
        unset($payload["code"]);
        echo json_encode($payload);
    }
    function postUser()
    {
        $payload = $this->userService->register($_POST);
        http_response_code($payload["code"]);
        unset($payload["code"]);

        echo json_encode($payload);
    }

    function deleteUser($request)
    {
        $payload = $this->userService->deleteUser($request["id"]);
        http_response_code($payload["code"]);
        
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function updateUser($request)
    {
        $payload = $this->userService->updateUser($request["id"], $_POST);
        http_response_code($payload["code"]);
        
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
