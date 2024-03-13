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
    private $userWorkspaceModel;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->workspaceModel = new Workspace($this->pdo);
        $this->userWorkspaceModel = new UserWorkspace($this->pdo);

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
        
        $workspaceId = $this->workspaceModel->create($workspace);

        if ($workspaceId === false) {
            return Response::payload(500, false, array("message" => "Contact administrator (adriangallanomain@gmail.com)"));
        }

        $data = array(
            "workspace_id" => $workspaceId,
            "user_id" => $token["user_id"],
            "role_id" => 1
        );

        $creation = $this->userWorkspaceModel->create($data);

        return $creation ? Response::payload(
            200,
            true,
            "workspace creation successful",
            $data
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function getAll($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        
        $workspaces = $this->workspaceModel->getAll($id);

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
    function get($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $workspace = $this->workspaceModel->get($id);

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
    function delete($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $workspace = $this->workspaceModel->delete($id);

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
