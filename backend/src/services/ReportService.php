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
    function get($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $report = $this->reportModel->get($id);

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

    function update($report, $id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $report = $this->reportModel->update($report, $id);

        if (!$report) {
            return Response::payload(404, false, "update unsuccessful");
        }

        return $report ? Response::payload(
            200,
            true,
            "update successful",
        ) : array("message" => "Contact administrator (adriangallanomain@gmail.com)");
    }
    function delete($id)
    {
        $token = $this->tokenService->readEncodedToken();

        if (!$token) {
            return Response::payload(404, false, "unauthorized access");
        }

        $report = $this->reportModel->delete($id);

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
