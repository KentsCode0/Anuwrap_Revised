<?php

namespace Src\Controllers;

use Src\Models\User;
use Src\Config\DatabaseConnector;
class UserController
{
    private $user;
    private $pdo;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->get_connection();
        $this->user = new User($this->pdo);
    }
    function getUser($id)
    {
        $this->user->get($id);
        return;
    }

    function getUsers()
    {
        $this->user->getAll();
        return;
    }
    function postUser()
    {

        if (isset($_POST['username']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['password'])) {
            http_response_code(200);
            $this->user->create();

        } else {
            http_response_code(400);
        }
    }

    function deleteUser($id)
    {
        $this->user->delete($id);
        return;
    }
}
