<?php

namespace Src\Services;

use Src\Models\Authentication;
use Src\Models\Workspace;
use Src\Config\DatabaseConnector;
use Src\Utils\Checker;
use Src\Utils\Response;

class UserService
{
    private $authenticationModel;
    private $pdo;
    private $tokenService;
    private $userService;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->authenticationModel = new Authentication($this->pdo);
        $this->userService = new UserService();
        $this->tokenService = new TokenService();
    }
}
