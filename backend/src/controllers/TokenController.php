<?php

namespace Src\Controllers;

use Src\Services\TokenService;

class TokenController
{
    private $tokenService;
    function __construct()
    {
        $this->tokenService = new TokenService();
    }

    function postToken()
    {
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);

        $payload = $this->tokenService->login($postData);
        http_response_code($payload["code"]);

        unset($payload["code"]);
        echo json_encode($payload);
    }

}
