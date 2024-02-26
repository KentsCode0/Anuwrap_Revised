<?php

namespace Src\Controllers;

use Src\Models\Authentication;
use Src\Models\User;
use Src\Config\DatabaseConnector;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class SessionController
{
    private $pdo;
    private $authentication;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->get_connection();
        $this->authentication = new Authentication($this->pdo);
    }

    function getSession()
    {
        if (isset($_POST['email']) && isset($_POST['password'])) {
            #sanitation
            $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
            $password = $_POST['password'];

            $user = $this->authentication->get("email", $email);

            if ($user && password_verify($password, $user['password'])) {

                $payload = array(
                    "userID" => $user["user_id"],
                );
                $token = JWT::encode(
                    $payload,
                    $_ENV['SECRET_API_KEY'],
                    "HS256"
                );

                setcookie("Token", $token, [
                    'expires' => time() + 3600,
                    'path' => '/',
                    'domain' => '',
                    'secure' => true,
                    'httponly' => true
                ]);

                unset($user['password']);
                echo json_encode(array("success" => true, "user" => $user));
            } else {
                http_response_code(401);
                echo json_encode(array("success" => false, "message" => "Incorrect email or password"));
            }
        } else {
            http_response_code(400);
            echo json_encode(array("success" => false, "message" => "Email and password are required"));
        }
    }
}
