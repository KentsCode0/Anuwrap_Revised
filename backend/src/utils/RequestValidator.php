<?php 
namespace Src\Utils;

class RequestValidator
{
    public static function validateRequestBody($request)
    {
        $postData = json_decode(file_get_contents("php://input"), true);

        if (empty($postData)) {
            return [];
        }

        return $postData;
    }
}
