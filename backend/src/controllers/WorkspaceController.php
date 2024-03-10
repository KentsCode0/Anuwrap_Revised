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

    function createWorkspace()
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
        $id = $request["id"];
        $payload = $this->workspaceService->get($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function getAllWorkspace($request)
    {
        $id = $request["id"];
        $payload = $this->workspaceService->getAll($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function deleteWorkspace($request)
    {
        $id = $request["id"];
        $payload = $this->workspaceService->delete($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function updateWorkspace($request)
    {
        $id = $request["id"];
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->workspaceService->update($postData, $id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
