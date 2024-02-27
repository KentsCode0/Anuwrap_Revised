<?php

namespace Src\Services;

use Firebase\JWT\JWT;

class AuthenticationService
{
    function authenticate($user, $password)
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

    function checkRegistration($username, $email, $firstname, $lastname, $password)
    {
    }
    function isUsernameExist($username)
    {
    }

    function isEmailExist($email)
    {
    }

    function isUsernameInCorrectFormat($username)
    {
    }
    function isFirstNameInCorrectFormat($firstname)
    {
    }
    function isLastNameInCorrectFormat($lastname)
    {
    }

    function isPasswordInCorrectFormat($password)
    {
    }
}
