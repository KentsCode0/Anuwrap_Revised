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

    function get($id)
    {
    }
    function getAll($id)
    {
    }
    function create()
    {
    }
    function delete($id)
    {
    }
    function update($id, $request)
    {
    }
}
