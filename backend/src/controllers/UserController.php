<?php

namespace Src\Controllers;

use Src\Services\UserService;

class UserController
{
    private $userService;
    function __construct()
    {
        $this->userService = new UserService();
    }
    function getUser($request)
    {
        var_dump($request);
        $payload = $this->userService->getInformation($request["userId"]);
        http_response_code($payload["code"]);
        
        unset($payload["code"]);
        echo json_encode($payload);
    }
    function postUser()
    {
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->userService->register($postData);
        http_response_code($payload["code"]);
        unset($payload["code"]);

        echo json_encode($payload);
    }

    function deleteUser($request)
    {
        $payload = $this->userService->deleteUser($request["userId"]);
        http_response_code($payload["code"]);
        
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function updateUser($request)
    {
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        var_dump($postData);
        $payload = $this->userService->updateUser($request["userId"], $postData);
        http_response_code($payload["code"]);
        
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
