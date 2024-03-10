<?php

namespace Src\Models;

use PDOException;

class Report
{
    private $pdo;
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
    function get($id)
    {
        $queryStr = "SELECT * FROM Report WHERE report_id = :id";
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

    function getAllWithWorkspaceId($workspace_id)
    {
        $queryStr = "SELECT * FROM Report WHERE workspace_id = :workspace_id";
        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "workspace_id" => $workspace_id
            ));

            $workspace = $stmt->fetchAll();
            return $workspace;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }
    function create($request)
    {
        $title = $request["title"];
        $description = $request["description"];
        $workspace_id = $request["workspace_id"];

        $queryStr = "INSERT INTO 
        UserWorkspace(title, description, workspace_id) VALUES
        (:title, :description, :workspace_id)";

        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(array(
                "title" => $title,
                "description" => $description,
                "workspace_id" => $workspace_id
            ));
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }


    function delete($id)
    {
        $queryStr = "DELETE FROM Report WHERE report_id = :id";

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
        $title = $request["title"];
        $description = $request["description"];
        $workspace_id = $request["workspace_id"];

        $queryStr = "UPDATE Report 
            SET title=:title, description=:description, workspace_id=:workspace_id WHERE report_id = :id";

        $stmt = $this->pdo->prepare($queryStr);
        try {
            $stmt->execute(
                array(
                    "title" => $title,
                    "description" => $description,
                    "workspace_id" => $workspace_id,
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
