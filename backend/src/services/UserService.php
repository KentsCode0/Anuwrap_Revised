<?php

namespace Src\Services;

date_default_timezone_set("Asia/Manila");

use Src\Models\Authentication;
use Src\Models\User;
use Src\Config\DatabaseConnector;
use Src\Utils\Checker;
use Src\Utils\Response;

class UserService
{
    private $authenticationModel;
    private $pdo;
    private $userModel;
    private $authorizationService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->authenticationModel = new Authentication($this->pdo);
        $this->userModel = new User($this->pdo);
        $this->authorizationService = new AuthorizationService();
    }

    function register($user)
    {
        if (!(Checker::isFieldExist($user, ["username", "firstname", "lastname", "email", "password", "confirm_password"]))) {
            return Response::payload(
                400,
                false,
                "username, firstname, lastname, email, password, confirm_password is required"
            );
        }

        $errors = $this->validate($user);

        if (count($errors) > 0) {
            return Response::payload(
                400,
                false,
                "registration unsuccessful",
                errors: $errors
            );
        }

        $creation = $this->userModel->create($user);
        return $creation ? Response::payload(
            200,
            true,
            "registration successful",
            errors: $errors
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }

    function getInformation($id)
    {
        $matches = $this->authorizationService->isTokenMatch($id);
        if (!$matches) {
            return Response::payload(401, false, "unauthorized access");
        }

        $user = $this->userModel->get($id);

        if (!$user) {
            return Response::payload(404, false, "user not found");
        }

        unset($user['password']);
        return Response::payload(200, true, "found user", array("user" => $user));
    }

    function deleteUser($id)
    {
        $matches = $this->authorizationService->isTokenMatch($id);
        if (!$matches) {
            return Response::payload(401, false, "unauthorized access");
        }

        $isDeleted = $this->userModel->delete($id);

        if (!$isDeleted) {
            return Response::payload(500, false, "Deletion Unsuccessful");
        }

        return Response::payload(200, true, "Deletion successful");
    }

    function updateUser($id, $newUserInfo)
    {
        $matches = $this->authorizationService->isTokenMatch($id);
        if (!$matches) {
            return Response::payload(401, false, "unauthorized access");
        }
        
        if (count($newUserInfo) < 1){
            return Response::payload(400, false, "no fields found");
            
        }
        
        $isUpdated = $this->userModel->update($id, $newUserInfo);

        if (!$isUpdated) {
            return Response::payload(500, false, "Update Unsuccessful");
        }

        return Response::payload(200, true, "Update successful");
    }
    function validate($user)
    {
        $errors = array();

        $isUsernameExist = $this->UsernameExist($user["username"]);
        $isEmailExist = $this->EmailExist($user["email"]);
        $validateUsername = $this->validateUsernameFormat($user["username"]);
        $validateFirstName = $this->validateFirstNameFormat($user["firstname"]);
        $validateLastName = $this->validateLastNameFormat($user["lastname"]);
        $validateEmail = $this->validateEmailFormat($user["email"]);
        $validatePassword = $this->validatePasswordFormat($user["password"]);
        $isConfirmPasswordMatch = $this->confirmPasswordDoesNotMatch($user["password"], $user["confirm_password"]);

        if ($isUsernameExist) $errors[] = $isUsernameExist;
        if ($isEmailExist) $errors[] = $isEmailExist;
        if ($validateUsername) $errors[] = $validateUsername;
        if ($validateFirstName) $errors[] = $validateFirstName;
        if ($validateLastName) $errors[] = $validateLastName;
        if ($validateEmail) $errors[] = $validateEmail;
        if ($validatePassword) $errors[] = $validatePassword;
        if ($isConfirmPasswordMatch) $errors[] = $isConfirmPasswordMatch;


        return $errors;
    }
    function UsernameExist($username)
    {
        $username = $this->authenticationModel->get("username", $username);
        return $username == true ? "username already exist" : false;
    }

    function EmailExist($email)
    {
        $email = $this->authenticationModel->get("email", $email);
        return $email == true ? "email already exist" : false;
    }

    function validateUsernameFormat($username)
    {
        return preg_match('/^[a-zA-Z0-9_]+$/', $username) ? null : "username should contain only letters, numbers, and underscores";
    }
    function validateFirstNameFormat($firstname)
    {
        return preg_match('/^[a-zA-Z ]+$/', $firstname) ? null : "first name should contain only letters and spaces";
    }
    function validateLastNameFormat($lastname)
    {
        return preg_match('/^[a-zA-Z ]+$/', $lastname) ? null : "last name should contain only letters and spaces";
    }
    function validateEmailFormat($email)
    {
        return preg_match('/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/', $email) ? null : "invalid email format";
    }
    function validatePasswordFormat($password)
    {
        $requirements = "password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        return preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/', $password) ? null : $requirements;
    }
    function confirmPasswordDoesNotMatch($password, $password2)
    {
        return $password !== $password2 ? "confirmation password does not match" : false;
    }
}
