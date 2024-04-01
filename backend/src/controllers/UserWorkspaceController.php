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

    function getAllWithUser($request)
    {
        $userId = $request["userId"];
        $payload = $this->userWorkpaceService->getAllWithUser($userId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    function getAllWithWorkspace($request)
    {
        $workspaceId = $request["workspaceId"];
        $payload = $this->userWorkpaceService->getAllWithWorkspace($workspaceId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    
    function deleteUserWorkspace($request)
    {
        $userId = $request["userId"];
        $payload = $this->userWorkpaceService->delete($userId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    
    function updateUserWorkspace($request)
    {
        $userId = $request["userId"];
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->userWorkpaceService->update($postData, $userId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
