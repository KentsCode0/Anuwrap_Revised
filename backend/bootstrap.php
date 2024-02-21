<?php
require "../vendor/autoload.php";

use Dotenv\Dotenv;
use Src\Config\Database;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

$pdo = (new Database())->get_connection();
