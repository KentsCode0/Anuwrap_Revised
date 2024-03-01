<?php

namespace Src\Services;

date_default_timezone_set("Asia/Manila");

use Src\Models\Authentication;
use Src\Config\DatabaseConnector;

class UserService
{
    private $authentication;
    private $pdo;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->authentication = new Authentication($this->pdo);
    }

    // function validate($request)
    // {
    //     // $isValidFormat = $this->validateFormat($request);
    //     // if ($isValidFormat) {
    //     // }
    // }
    function UsernameDoesNotExist($username)
    {
        $username = $this->authentication->get("username", $username);
        return $username == false;
    }

    function EmailDoesNotExist($email)
    {
        $email = $this->authentication->get("email", $email);
        return $email == false;
    }

    function isConfirmPasswordMatch($password, $password2)
    {
        return $password === $password2;
    }
    function validate($user)
    {
        // Username should contain only alphanumeric characters and underscores
        $isUsernameInCorrectFormat = preg_match('/^[a-zA-Z0-9_]+$/', $user["username"]) == 1;
        // First name should contain only letters and spaces
        $isFirstNameInCorrectFormat = preg_match('/^[a-zA-Z ]+$/', $user["firstname"]) == 1;
        // Last name should contain only letters and spaces
        $isLastNameInCorrectFormat = preg_match('/^[a-zA-Z ]+$/', $user["lastname"]) == 1;

        $isEmailInCorrectFormat = filter_var($user["email"], FILTER_VALIDATE_EMAIL) != false;

        // Password should be at least 8 characters long and contain at 
        // least one uppercase letter, one lowercase 
        // letter, one number, and one special character
        $isPasswordInCorrectFormat = preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $user["password"]) == 1;

        $isUsernameExist = $this->UsernameDoesNotExist($user["username"]);
        $isEmailExist = $this->EmailDoesNotExist($user["email"]);

        $payload = array(
            "CorrectUsernameFormat"=>$isUsernameInCorrectFormat,
            "CorrectFirstNameFormat"=>$isFirstNameInCorrectFormat,
            "CorrectLastNameFormat"=>$isLastNameInCorrectFormat,
            "CorrectEmailFormat"=>$isEmailInCorrectFormat,
            "CorrectPasswordFormat"=>$isPasswordInCorrectFormat,
            "UsernameDoesNotExist"=>$isUsernameExist,
            "EmailDoesNotExist"=>$isEmailExist
        );

        return $payload;
    }
}
