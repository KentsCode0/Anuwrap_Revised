<?php

namespace Src\Services;

date_default_timezone_set("Asia/Manila");
class AuthorizationService
{
    function isTokenMatch($id)
    {
        $tokenService = new TokenService();
        $token = $tokenService->readEncodedToken();

        return $token && $token['user_id'] == $id;
    }
}
