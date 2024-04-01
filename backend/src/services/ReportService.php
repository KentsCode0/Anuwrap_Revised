<?php

namespace Src\Services;

use Src\Models\Authentication;
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

    function create($report)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        if(!Checker::isFieldExist($report, ["title", "description", "content", "report_type_id", "workspace_id"])){
            return Response::payload(
                400,
                false,
                "title, description, content, report_type_id, and workspace_id is required"
            );
        }
        
        $reportId = $this->reportModel->create($report);

        if ($reportId === false) {
            return Response::payload(500, false, array("message" => "Contact administrator (adriangallanomain@gmail.com)"));
        }

        return $reportId ? Response::payload(
            200,
            true,
            "report creation successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function get($reportId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $report = $this->reportModel->get($reportId);

        if (!$report) {
            return Response::payload(404, false, "report not found");
        }
        return $report ? Response::payload(
            200,
            true,
            "report found",
            array("report" => $report)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    
    function getAll($workspaceId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $reports = $this->reportModel->getAll($workspaceId);

        if (!$reports) {
            return Response::payload(404, false, "reports not found");
        }
        return $reports ? Response::payload(
            200,
            true,
            "reports found",
            array("report" => $reports)
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
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

    function update($report, $reportId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $report = $this->reportModel->update($report, $reportId);

        if (!$report) {
            return Response::payload(404, false, "update unsuccessful");
        }

        return $report ? Response::payload(
            200,
            true,
            "update successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function delete($reportId)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $report = $this->reportModel->delete($reportId);

        if (!$report) {
            return Response::payload(404, false, "deletion unsuccessful");
        }

        return $report ? Response::payload(
            200,
            true,
            "deletion successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
}
