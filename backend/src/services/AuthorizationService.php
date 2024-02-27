<?php

namespace Src\Services;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class AuthorizationService
{

    function handleToken()
    {
        $headers = apache_request_headers();
        $token = str_replace('Bearer ', '',  $headers['Authorization']);
        $key = $_ENV['SECRET_API_KEY'];

        try {
            $x = JWT::decode($token, new Key($key, 'HS256'));
            var_dump($x);
        } catch (Exception $e) {
            echo $e->getMessage();
        }

        return true;
    }
}
