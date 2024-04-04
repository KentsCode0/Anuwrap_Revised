<?php


namespace Src\Controllers;

use Src\Services\WorkspaceService;

class WorkspaceController
{
    private $workspaceService;
    function __construct()
    {
        $this->workspaceService = new WorkspaceService();
    }

    function createWorkspace($request)
    {

        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->workspaceService->create($postData);

        http_response_code($payload["code"]);

        unset($payload["code"]);
        echo json_encode($payload);
    }

    function getWorkspace($request)
    {
        $workspaceId = $request["workspaceId"];
        $payload = $this->workspaceService->get($workspaceId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    
    function deleteWorkspace($request)
    {
        $workspaceId = $request["workspaceId"];
        $payload = $this->workspaceService->delete($workspaceId);
        
        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    
    function updateWorkspace($request)
    {
        $workspaceId = $request["workspaceId"];
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->workspaceService->update($postData, $workspaceId);
        
        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    
    function getAllWorkspace($request)
    {
        $userId = $request["userId"];
        $payload = $this->workspaceService->getAll($userId);
    
        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
