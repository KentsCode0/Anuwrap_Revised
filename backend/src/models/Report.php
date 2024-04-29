<?php 
namespace Src\Models;

use PDOException;

class Report
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function get($id)
    {
        $query = "SELECT * FROM report WHERE report_id = :id";
        $stmt = $this->pdo->prepare($query);

        try {
            $stmt->execute(['id' => $id]);
            return $stmt->fetch();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }

    public function getAll($workspaceId)
    {
        $query = "SELECT * FROM report WHERE workspace_id = :workspace_id";
        $stmt = $this->pdo->prepare($query);

        try {
            $stmt->execute(['workspace_id' => $workspaceId]);
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }

    public function create($request)
{
    $title = $request["title"];
    $report_type_id = $request["report_type_id"];
    $workspace_id = $request["workspace_id"];
    $name = $request["name"];
    $position = $request["position"];
    $tenure = $request["tenure"];
    $status = $request["status"];
    $related_cert = $request["related_cert"];
    $doctorate_degree = $request["doctorate_degree"];
    $masters_degree = $request["masters_degree"];
    $baccalaureate_degree = $request["baccalaureate_degree"];
    $specification = $request["specification"];
    $enrollment_stats = $request["enrollment_stats"];
    $designation = $request["designation"];
    $teaching_exp = $request["teaching_exp"];
    $org_membership = $request["org_membership"];

    $data = array(
        "title" => $title,
        "report_type_id" => $report_type_id,
        "workspace_id" => $workspace_id,
        "name" => $name,
        "position" => $position,
        "tenure" => $tenure,
        "status" => $status,
        "related_cert" => $related_cert,
        "doctorate_degree" => $doctorate_degree,
        "masters_degree" => $masters_degree,
        "baccalaureate_degree" => $baccalaureate_degree,
        "specification" => $specification,
        "enrollment_stats" => $enrollment_stats,
        "designation" => $designation,
        "teaching_exp" => $teaching_exp,
        "org_membership" => $org_membership
    );

    $query = "INSERT INTO report (title, report_type_id, workspace_id, name, position, tenure, status, related_cert, doctorate_degree, masters_degree, baccalaureate_degree, specification, enrollment_stats, designation, teaching_exp, org_membership)
              VALUES (:title, :report_type_id, :workspace_id, :name, :position, :tenure, :status, :related_cert, :doctorate_degree, :masters_degree, :baccalaureate_degree, :specification, :enrollment_stats, :designation, :teaching_exp, :org_membership)";

    $stmt = $this->pdo->prepare($query);

    try {
        $stmt->execute($data);
        return $this->pdo->lastInsertId();
    } catch (PDOException $e) {
        error_log($e->getMessage());
        return false;
    }
}


public function update($request, $id)
{
    $title = $request["title"];
    $report_type_id = $request["report_type_id"];
    $workspace_id = $request["workspace_id"];
    $name = $request["name"];
    $position = $request["position"];
    $tenure = $request["tenure"];
    $status = $request["status"];
    $related_cert = $request["related_cert"];
    $doctorate_degree = $request["doctorate_degree"];
    $masters_degree = $request["masters_degree"];
    $baccalaureate_degree = $request["baccalaureate_degree"];
    $specification = $request["specification"];
    $enrollment_stats = $request["enrollment_stats"];
    $designation = $request["designation"];
    $teaching_exp = $request["teaching_exp"];
    $org_membership = $request["org_membership"];

    $data = array(
        "title" => $title,
        "report_type_id" => $report_type_id,
        "workspace_id" => $workspace_id,
        "name" => $name,
        "position" => $position,
        "tenure" => $tenure,
        "status" => $status,
        "related_cert" => $related_cert,
        "doctorate_degree" => $doctorate_degree,
        "masters_degree" => $masters_degree,
        "baccalaureate_degree" => $baccalaureate_degree,
        "specification" => $specification,
        "enrollment_stats" => $enrollment_stats,
        "designation" => $designation,
        "teaching_exp" => $teaching_exp,
        "org_membership" => $org_membership,
        "id" => $id
    );

    $query = "UPDATE report 
              SET title=:title, report_type_id=:report_type_id, workspace_id=:workspace_id,
                  name=:name, position=:position, tenure=:tenure, status=:status,
                  related_cert=:related_cert, doctorate_degree=:doctorate_degree,
                  masters_degree=:masters_degree, baccalaureate_degree=:baccalaureate_degree,
                  specification=:specification, enrollment_stats=:enrollment_stats,
                  designation=:designation, teaching_exp=:teaching_exp, org_membership=:org_membership
              WHERE report_id = :id";

    $stmt = $this->pdo->prepare($query);

    try {
        $stmt->execute($data);
        return true;
    } catch (PDOException $e) {
        error_log($e->getMessage());
        return false;
    }
}


    public function delete($id)
    {
        $query = "DELETE FROM report WHERE report_id = :id";
        $stmt = $this->pdo->prepare($query);

        try {
            $stmt->execute(['id' => $id]);
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    public function getAllReportType()
    {
        $query = "SELECT * FROM ReportType";
        $stmt = $this->pdo->query($query);

        return $stmt->fetchAll();
    }
}
