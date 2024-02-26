<?php

namespace Src\Models;

class User
{
    private $pdo;
    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    function get($id)
    {
        $queryStr = "SELECT * FROM user WHERE id=:$id";
        $stmt = $this->pdo->prepare($queryStr);

        $stmt->execute(array(
            "id" => $id
        ));

        $user = $stmt->fetch();
        return $user;
    }
    function getAll()
    {
    }

    function create()
    {
        $username = $_POST['username'];
        $firstname = $_POST['firstname'];
        $lastname = $_POST['lastname'];
        $email = $_POST['email'];
        $password = $_POST['password'];

        $queryStr = "INSERT INTO User (username, first_name, last_name, email, password) 
        VALUES (:username, :firstname, :lastname, :email, :password)";

        $stmt = $this->pdo->prepare($queryStr);
        $stmt->execute(
            array(
                "username" => $username,
                "firstname" => $firstname,
                "lastname" => $lastname,
                "email" => $email,
                "password" => password_hash($password, PASSWORD_DEFAULT)
            )
        );

        return array("message" => "Registration Successful");
    }

    function delete($id)
    {
    }
}
