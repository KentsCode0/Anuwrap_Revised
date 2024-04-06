<?php

namespace Src\Services;

use Src\Models\Authentication;
use Src\Models\Workspace;
use Src\Config\DatabaseConnector;
use Src\Models\UserWorkspace;
use Src\Utils\Checker;
use Src\Utils\Response;

class WorkspaceService
{
    private $workspaceModel;
    private $pdo;
    private $tokenService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->workspaceModel = new Workspace($this->pdo);

        $this->tokenService = new TokenService();
    }

    function create($workspace)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        if(!Checker::isFieldExist($workspace, ["name"])){
            return Response::payload(
                400,
                false,
                "name is required"
            );
        }
        
        $creation = $this->workspaceModel->create($workspace);

        if ($creation === false) {
            return Response::payload(500, false, array("message" => "Contact administrator (adriangallanomain@gmail.com)"));
        }

        return $creation ? Response::payload(
            200,
            true,
            "workspace creation successful",
            array("workspace_id" => $creation)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function getAll($userId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        
        $workspaces = $this->workspaceModel->getAll($userId);

        if (!$workspaces) {
            return Response::payload(404, false, "workspaces not found");
        }
        return $workspaces ? Response::payload(
            200,
            true,
            "workspace found",
            array("workspace" => $workspaces)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function get($workspaceId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $workspace = $this->workspaceModel->get($workspaceId);

        if (!$workspace) {
            return Response::payload(404, false, "workspace not found");
        }
        return $workspace ? Response::payload(
            200,
            true,
            "workspace found",
            array("workspace" => $workspace)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }

    function update($workspace, $id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $workspace = $this->workspaceModel->update($workspace, $id);

        if (!$workspace) {
            return Response::payload(404, false, "update unsuccessful");
        }

        return $workspace ? Response::payload(
            200,
            true,
            "update successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function delete($workspaceId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $workspace = $this->workspaceModel->delete($workspaceId);

        if (!$workspace) {
            return Response::payload(404, false, "deletion unsuccessful");
        }

        return $workspace ? Response::payload(
            200,
            true,
            "deletion successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
}
