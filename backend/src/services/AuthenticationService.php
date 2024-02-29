<?php

namespace Src\Services;

date_default_timezone_set("Asia/Manila");

use Src\Models\Authentication;

class AuthenticationService
{
    function isUsernameExist($username)
    {
    }

    function isEmailExist($email)
    {
    }

    function isUsernameInCorrectFormat($username)
    {
        // Username should contain only alphanumeric characters and underscores
        return preg_match('/^[a-zA-Z0-9_]+$/', $username);
    }

    function isFirstNameInCorrectFormat($firstname)
    {
        // First name should contain only letters and spaces
        return preg_match('/^[a-zA-Z ]+$/', $firstname);
    }

    function isLastNameInCorrectFormat($lastname)
    {
        // Last name should contain only letters and spaces
        return preg_match('/^[a-zA-Z ]+$/', $lastname);
    }

    function isPasswordInCorrectFormat($password)
    {
        // Password should be at least 8 characters long and contain at 
        // least one uppercase letter, one lowercase 
        // letter, one number, and one special character
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password);
    }
}
