<?php

namespace Src\Services;

use Src\Config\DatabaseConnector;
use Src\Models\UserWorkspace;
use Src\Utils\Response;
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

        $creation = $this->userWorkspaceModel->create($userWorkspace);

        return $creation ? Response::payload(
            200,
            true,
            "User Workspace creation successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function get($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $userWorkspace = $this->userWorkspaceModel->getWithWorkspace($id);

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
