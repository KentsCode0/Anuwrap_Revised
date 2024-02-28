<?php

namespace Src\Controllers;

use Src\Models\User;
use Src\Config\DatabaseConnector;
use Src\Services\AuthorizationService;

class UserController
{
    private $user;
    private $pdo;
    private $AuthService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->user = new User($this->pdo);
        $this->AuthService = new AuthorizationService();
    }
    function getUser($request)
    {
        $id = $request["id"];
        if (!$id) return false;
        
        $isAuthorized = $this->AuthService->handleToken();

        if (!$isAuthorized) {
            http_response_code(401);
            echo json_encode(array("success" => false, "message" => "Unauthorized access"));
        } else {

            $user = $this->user->get($id);

            if ($user) {
                http_response_code(200);

                unset($user['password']);
                echo json_encode(array("success" => true, "user" => $user));
            } else {
                http_response_code(400);
                echo json_encode(array("success" => false, "message" => "User not found"));
            }
        }
    }
    function postUser()
    {

        if (isset($_POST['username']) && isset($_POST['firstname']) && isset($_POST['lastname']) && isset($_POST['email']) && isset($_POST['password'])) {
            $isCreated = $this->user->create($_POST);

            if ($isCreated) {
                http_response_code(200);
                echo json_encode(array("success" => true, "message" => "Registration Successful"));
            } else {
                http_response_code(400);
                echo json_encode(array("success" => false, "message" => "Registration Unsuccessful"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "username, firstname, lastname, email, and password is required"));
        }
    }

    function deleteUser($request)
    {
        $id = $request["id"];
        if (!$id) return false;
        $isDeleted = $this->user->delete($id);

        if ($isDeleted) {
            http_response_code(200);
            echo json_encode(array("message" => "Deletion Successful"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Deletion Unsuccessful"));
        }
    }

    function updateUser($request)
    {
        $id = $request["id"];
        if (!$id) return false;
        $isUpdated = $this->user->update($id);

        if ($isUpdated) {
            http_response_code(200);
            echo json_encode(array("message" => "Update Successful"));
        } else {
            http_response_code(400);
            echo json_encode(array("message" => "Update Unsuccessful"));
        }
    }
}
