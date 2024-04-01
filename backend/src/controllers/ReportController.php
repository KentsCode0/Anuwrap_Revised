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
        $reportId = $request["reportId"];
        $payload = $this->reportService->get($reportId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function getAllReport($request)
    {
        $workspaceId = $request["workspaceId"];
        $payload = $this->reportService->getAll($workspaceId);

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
        $reportId = $request["reportId"];
        $payload = $this->reportService->delete($reportId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }

    function updateReport($request)
    {
        $reportId = $request["reportId"];
        $postData = json_decode(file_get_contents("php://input"));
        $postData = json_decode(json_encode($postData), true);
        $payload = $this->reportService->update($postData, $reportId);

        http_response_code($payload["code"]);
        unset($payload["code"]);
        echo json_encode($payload);
    }
}
