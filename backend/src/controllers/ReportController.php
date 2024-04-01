<?php


namespace Src\Controllers;

use Src\Services\ReportService;

class ReportController
{
    private $reportService;
    function __construct()
    {
        $this->reportService = new ReportService();
    }

    function createReport($request)
    {

        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->reportService->create($postData);

        http_response_code($payload["code"]);

        unset($payload["code"]);
        echo json_encode($payload);
    }

    function getReport($request)
    {
        $id = $request["id"];
        $payload = $this->reportService->get($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function getAllReport($request)
    {
        $id = $request["id"];
        $payload = $this->reportService->getAll($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
    function getAllReportType()
    {
        $payload = $this->reportService->getAllReportType();

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function deleteReport($request)
    {
        $id = $request["id"];
        $payload = $this->reportService->delete($id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function updateReport($request)
    {
        $id = $request["id"];
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->reportService->update($postData, $id);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
