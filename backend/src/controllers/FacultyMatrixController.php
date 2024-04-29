<?php
namespace Src\Controllers;

use Src\Services\FacultyMatrixService;
use Src\Config\DatabaseConnector;

class FacultyMatrixController
{
    private $facultyMatrixService;

    public function __construct()
    {
        // Instantiate DatabaseConnector to obtain PDO instance
        $databaseConnector = new DatabaseConnector();
        $pdo = $databaseConnector->getConnection();
        
        // Pass PDO instance to FacultyMatrixService constructor
        $this->facultyMatrixService = new FacultyMatrixService($pdo);
    }

    public function createFacultyMatrix($request)
    {
        var_dump($request); // Check if the request data is received
    error_log('Reached createFacultyMatrix method');
        $postData = json_decode(file_get_contents("php://input"), true);

        $result = $this->facultyMatrixService->create($postData);

        http_response_code($result['code']);
        unset($result['code']);
        echo json_encode($result);
    }

    public function updateFacultyMatrix($request)
    {
        $postData = json_decode(file_get_contents("php://input"), true);
        $facultyMatrixId = $request['facultyMatrixId'];

        $result = $this->facultyMatrixService->update($postData, $facultyMatrixId);

        http_response_code($result['code']);
        unset($result['code']);
        echo json_encode($result);
    }

    public function deleteFacultyMatrix($request)
    {
        $facultyMatrixId = $request['facultyMatrixId'];

        $result = $this->facultyMatrixService->delete($facultyMatrixId);

        http_response_code($result['code']);
        unset($result['code']);
        echo json_encode($result);
    }

    public function getFacultyMatrix($request)
    {
        $facultyMatrixId = $request['facultyMatrixId'];

        $result = $this->facultyMatrixService->get($facultyMatrixId);

        http_response_code($result['code']);
        unset($result['code']);
        echo json_encode($result);
    }
}
?>
