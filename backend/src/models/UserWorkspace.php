<?php

namespace Src\Models;

use PDOException;

class UserWorkspace
{
    private $pdo;
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    function getWithUser($id)
    {
        $queryStr = "SELECT * FROM UserWorkspace WHERE user_id = :id";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "id" => $id
            ));

            $workspace = $stmt->fetch();
            return $workspace;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }

    function getWithWorkspace($id)
    {
        $queryStr = "SELECT * FROM UserWorkspace WHERE workspace_id = :id";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "id" => $id
            ));

            $workspace = $stmt->fetch();
            return $workspace;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }

    function create($request)
    {
        $user_id = $request["user_id"];
        $workspace_id = $request["workspace_id"];
        $role_id = $request["role_id"];

        $queryStr = "INSERT INTO 
        UserWorkspace(user_id, workspace_id, role_id) VALUES
        (:user_id, :workspace_id, :role_id)";

        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "user_id" => $user_id,
                "workspace_id" => $workspace_id,
                "role_id" => $role_id
            ));
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    function getAllWorkspaceWithUser($id)
    {
        $queryStr = "SELECT * FROM UserWorkspace WHERE user_id = :id";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "id" => $id
            ));

            $workspace = $stmt->fetchAll();

            return $workspace;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }
    function getAllWorkspaceWithWorkspace($id)
    {
        $queryStr = "SELECT * FROM UserWorkspace WHERE workspace_id = :id";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "id" => $id
            ));

            $workspace = $stmt->fetchAll();

            return $workspace;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }
    function delete($id)
    {
        $queryStr = "DELETE FROM UserWorkspace WHERE workspace_id = :id";

        $stmt = $this->pdo->prepare($queryStr);
        try {
            $stmt->execute(
                array(
                    "id" => $id,
                )
            );
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
    function update($request, $id)
    {
        $user_id = $request["user_id"];
        $workspace_id = $request["workspace_id"];
        $role_id = $request["role_id"];
        
        $queryStr = "UPDATE UserWorkspace 
            SET user_id=:user_id, workspace_id=:workspace_id, role_id=:role_id WHERE workspace_id = :id";

        $stmt = $this->pdo->prepare($queryStr);
        try {
            $stmt->execute(
                array(
                    "user_id" => $user_id,
                    "workspace_id" => $workspace_id,
                    "role_id" => $role_id,
                    "id" => $id
                )
            );
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
}
