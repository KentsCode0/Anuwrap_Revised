<?php

namespace Src\Controllers;

use Src\Models\User;
use Src\Config\DatabaseConnector;
use Src\Services\AuthorizationService;
use Src\Services\TokenService;
use Src\Services\UserService;

class UserController
{
    private $user;
    private $pdo;
    private $authorizationService;
    private $userService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->user = new User($this->pdo);
        $this->authorizationService = new AuthorizationService();
        $this->userService = new UserService();
    }
    function getUser($request)
    {
        $id = $request["id"];
        $matches = $this->authorizationService->isTokenMatch($id);

        if (!$matches) {
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

            $payload = $this->userService->validate($_POST);

            
            $isCreated = $this->user->create($_POST);
            
            var_dump($isCreated);
            if ($isCreated && !(in_array(false, $payload, true))) {
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
        $matches = $this->authorizationService->isTokenMatch($id);

        if (!$matches) {
            http_response_code(401);
            echo json_encode(array("success" => false, "message" => "Unauthorized access"));
        } else {

            $isDeleted = $this->user->delete($id);

            if ($isDeleted) {
                http_response_code(200);
                echo json_encode(array("success" => true, "message" => "Deletion Successful"));
            } else {
                http_response_code(400);
                echo json_encode(array("success" => false, "message" => "Deletion Unsuccessful"));
            }
        }
    }

    function updateUser($request)
    {
        $id = $request["id"];
        $matches = $this->authorizationService->isTokenMatch($id);

        if (!$matches) {
            http_response_code(401);
            echo json_encode(array("success" => false, "message" => "Unauthorized access"));
        } else {
            if (isset($_POST['username']) && isset($_POST['firstname']) && isset($_POST['lastname'])) {
                $user = $this->user->update($id, $_POST);
            }
            if ($user) {
                http_response_code(200);
                echo json_encode(array("success" => true, "message" => "Update Successful", "user" => $user));
            } else {
                http_response_code(400);
                echo json_encode(array("success" => false, "message" => "Update Unsuccessful"));
            }
        }
    }
}
