<?php

namespace Src\Controllers;
use Src\Services\UserWorkspaceService;


class UserWorkspaceController
{
    private $userWorkpaceService;
    function __construct()
    {
        $this->userWorkpaceService = new UserWorkspaceService();
    }

    function createUserWorkspace()
    {

        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->userWorkpaceService->create($postData);

        http_response_code($payload["code"]);

        unset($payload["code"]);
        echo json_encode($payload);
    }

    function getUserWorkspace($request)
    {
        $id = $request["id"];
        $payload = $this->userWorkpaceService->get($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function deleteUserWorkspace($request)
    {
        $id = $request["id"];
        $payload = $this->userWorkpaceService->delete($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    
    function updateUserWorkspace($request)
    {
        $id = $request["id"];
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->userWorkpaceService->update($postData, $id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
