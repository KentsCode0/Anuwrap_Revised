<?php

namespace Src\Config;

use PDO;

date_default_timezone_set("Asia/Manila");
set_time_limit(1000);

class Database
{
    private $pdo = null;
    private $user;
    private $password;
    private $connection_string;

    private static $options = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    function __construct()
    {
        $this->user = $_ENV['DB_USERNAME'];
        $this->password = $_ENV['DB_PASSWORD'];
        $this->connection_string = "{$_ENV['DB_DRIVER']}:host={$_ENV['DB_HOST']};port={$_ENV['DB_PORT']};dbname={$_ENV['DB_NAME']};charset=utf8mb4";
    }
    function get_connection()
    {
        try {
            $this->pdo = new PDO($this->connection_string, $this->user, $this->password, DATABASE::$options);
            echo "Database Connection Successful<br>";
            return $this->pdo;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }
}
