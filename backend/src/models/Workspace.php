<?php

namespace Src\Models;

use PDOException;

class Workspace
{
    private $pdo;
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    function getAll($id)
    {
        $queryStr = "SELECT * FROM Workspace WHERE user_id = :id";
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
    function get($id)
    {
        $queryStr = "SELECT * FROM Workspace WHERE workspace_id = :id";
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

    function create($workspace)
    {
        $name = $workspace['name'];

        $queryStr = "INSERT INTO Workspace (name) VALUES (:name)";

        $stmt = $this->pdo->prepare($queryStr);

        try {
            $stmt->execute(
                array(
                    "name" => $name
                )
            );
            return $this->pdo->lastInsertId();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
    function delete($id)
    {
        $queryStr = "DELETE FROM Workspace WHERE workspace_id = :id";

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
    function update($workspace, $id)
    {
        $name = $workspace["name"];
        $queryStr = "UPDATE Workspace 
            SET name=:name WHERE workspace_id = :id";

        $stmt = $this->pdo->prepare($queryStr);
        try {
            $stmt->execute(
                array(
                    "name" => $name,
                    "id" => $id,
                )
            );
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }
}
