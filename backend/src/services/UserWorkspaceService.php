<?php

namespace Src\Services;

use Src\Config\DatabaseConnector;
use Src\Models\UserWorkspace;
use Src\Utils\Response;
use Src\Utils\Checker;
use Src\Services\TokenService;

class UserWorkspaceService
{
    private $pdo;
    private $userWorkspaceModel;
    private $tokenService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector)->getConnection();
        $this->userWorkspaceModel = new UserWorkspace($this->pdo);
        $this->tokenService = new TokenService();
    }
    function create($userWorkspace)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        if(!Checker::isFieldExist($userWorkspace, ["user_id", "workspace_id", "role_id"])){
            return Response::payload(
                400,
                false,
                "user_id, workspace_id, and role_id is required"
            );
        }
        
        $creation = $this->userWorkspaceModel->create($userWorkspace);

        return $creation ? Response::payload(
            200,
            true,
            "User Workspace creation successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function getAllWithWorkspace($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $userWorkspace = $this->userWorkspaceModel->getAllWorkspaceWithWorkspace($id);

        if (!$userWorkspace) {
            return Response::payload(404, false, "User Workspace not found");
        }
        return $userWorkspace ? Response::payload(
            200,
            true,
            "User Workspace found",
            array("userWorkspace" => $userWorkspace)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function getAllWithUser($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $userWorkspaces = $this->userWorkspaceModel->getAllWorkspaceWithUser($id);

        if (!$userWorkspaces) {
            return Response::payload(404, false, "User Workspace not found");
        }
        return $userWorkspaces ? Response::payload(
            200,
            true,
            "User Workspace found",
            array("userWorkspace" => $userWorkspaces)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }

    function update($userWorkspace, $id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $userWorkspace = $this->userWorkspaceModel->update($userWorkspace, $id);
        
        if (!$userWorkspace) {
            return Response::payload(404, false, "update unsuccessful");
        }

        return $userWorkspace ? Response::payload(
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

        $userWorkspace = $this->userWorkspaceModel->delete($id);

        if (!$userWorkspace) {
            return Response::payload(404, false, "deletion unsuccessful");
        }

        return $userWorkspace ? Response::payload(
            200,
            true,
            "deletion successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
}
