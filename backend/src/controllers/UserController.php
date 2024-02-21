<?php

namespace Src\Controllers;
class UserController
{
    function getUsers()
    {
        echo "GET USER EXECUTED";
    }

    function getUser($var)
    {
        echo "GET USER EXECUTED ";
        var_dump($var);
    }

    function postUser()
    {
        echo "GET USER EXECUTED\n";
        var_dump($_POST);
    }
    
}
