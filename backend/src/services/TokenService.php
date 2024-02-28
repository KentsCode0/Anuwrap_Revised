<?php

namespace Src\Services;

date_default_timezone_set("Asia/Manila");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;

class TokenService
{
    function create($user, $password)
    {

        if (!($user && password_verify($password, $user['password']))) {
            return false;
        }

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

        return true;
    }

    function delete()
    {
        if (isset($_COOKIE['Token'])) {
            setcookie("Token", "", time() - 3600);
            return true;
        } else {
            return false;
        }
    }
    function readEncodedToken()
    {
        $headers = apache_request_headers();
        if (isset($headers['Authorization'])) {
            $token = str_replace('Bearer ', '',  $headers['Authorization']);

            $key = $_ENV['SECRET_API_KEY'];

            try {
                $x = JWT::decode($token, new Key($key, 'HS256'));
                return true;
            } catch (Exception $e) {
                echo $e->getMessage();
            }
        } else {
            return false;
        }
    }
}
