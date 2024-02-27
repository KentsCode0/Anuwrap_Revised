<?php

namespace Src\Controllers;

use Src\Models\Authentication;
use Src\Config\DatabaseConnector;
use Src\Services\AuthenticationService;


class SessionController
{
    private $pdo;
    private $authentication;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->authentication = new Authentication($this->pdo);
    }

    function postToken()
    {
        if (isset($_POST['email']) && isset($_POST['password'])) {
            $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
            $password = $_POST['password'];

            $user = $this->authentication->get("email", $email);

            $AuthService = new AuthenticationService();

            $isAuthenticated = $AuthService->authenticate($user, $password);

            if ($isAuthenticated) {
                http_response_code(200);
                unset($user['password']);
                echo json_encode(array("success" => true, "user" => $user));
            } else {
                http_response_code(401);
                echo json_encode(array("success" => false, "message" => "Incorrect email or password "));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "Email and password are required"));
        }
    }

    
}
