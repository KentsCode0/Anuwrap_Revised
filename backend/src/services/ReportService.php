<?php

namespace Src\Services;

use Src\Models\Report;
use Src\Config\DatabaseConnector;
use Src\Utils\Checker;
use Src\Utils\Response;

class ReportService
{
    private $pdo;
    private $tokenService;
    private $reportModel;
    function __construct()
    {
        $this->pdo = (new DatabaseConnector())->getConnection();
        $this->reportModel = new Report($this->pdo);
        $this->tokenService = new TokenService();
    }

    public function create($report)
    {
        $token = $this->tokenService->readEncodedToken();
    
        if (!$token) {
            return Response::payload(404, false, "Unauthorized access");
        }
    
        $requiredFields = ["title", "status", "name", "position", "report_type_id", "workspace_id"];
    
        // Log or inspect the received report data
        error_log("Received report data: " . json_encode($report));
    
        // Check if all required fields are present
        if (!Checker::isFieldExist($report, $requiredFields)) {
            error_log("Missing required fields: " . implode(', ', $requiredFields));
            return Response::payload(
                400,
                false,
                "Required fields are missing: " . implode(', ', $requiredFields)
            );
        }
    
        // Attempt to create the report
        $reportId = $this->reportModel->create($report);
    
        if ($reportId === false) {
            return Response::payload(500, false, ["message" => "Contact administrator (adriangallanomain@gmail.com)"]);
        }
    
        // Report creation successful
        return Response::payload(
            201,
            true,
            "Report creation successful",
            ["report_id" => $reportId]
        );
    }
    

    public function get($reportId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "Unauthorized access");
        }

        $report = $this->reportModel->get($reportId);

        if (!$report) {
            return Response::payload(404, false, "Report not found");
        }

        return Response::payload(
            200,
            true,
            "Report found",
            ["report" => $report]
        );
    }

    public function getAll($workspaceId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "Unauthorized access");
        }

        $reports = $this->reportModel->getAll($workspaceId);

        if (!$reports) {
            return Response::payload(404, false, "Reports not found");
        }

        return Response::payload(
            200,
            true,
            "Reports found",
            ["reports" => $reports]
        );
    }

    public function update($report, $reportId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "Unauthorized access");
        }

        $success = $this->reportModel->update($report, $reportId);

        if (!$success) {
            return Response::payload(404, false, "Update unsuccessful");
        }

        return Response::payload(
            200,
            true,
            "Update successful"
        );
    }

    public function delete($reportId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "Unauthorized access");
        }

        $success = $this->reportModel->delete($reportId);

        if (!$success) {
            return Response::payload(404, false, "Deletion unsuccessful");
        }

        return Response::payload(
            200,
            true,
            "Deletion successful"
        );
    }

    function getAllReportType()
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $reportType = $this->reportModel->getAllReportType();

        if (!$reportType) {
            return Response::payload(404, false, "report type not found");
        }
        return $reportType ? Response::payload(
            200,
            true,
            "report type found",
            array("report" => $reportType)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }

}
