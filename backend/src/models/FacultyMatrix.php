<?php
namespace Src\Models;

use PDO;
use PDOException;

class FacultyMatrix
{
    private $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function create($data)
    {
        $query = "INSERT INTO facultymatrix 
                  (name, position, tenure, status, related_cert, doctorate_degree, masters_degree, baccalaureate_degree, specification, enrollment_stats, designation, teaching_exp, org_membership) 
                  VALUES 
                  (:name, :position, :tenure, :status, :related_cert, :doctorate_degree, :masters_degree, :baccalaureate_degree, :specification, :enrollment_stats, :designation, :teaching_exp, :org_membership)";

        $stmt = $this->pdo->prepare($query);

        try {
            $stmt->execute($data);
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    public function update($data, $id)
    {
        $query = "UPDATE facultymatrix 
                  SET 
                  name = :name, 
                  position = :position, 
                  tenure = :tenure, 
                  status = :status, 
                  related_cert = :related_cert, 
                  doctorate_degree = :doctorate_degree, 
                  masters_degree = :masters_degree, 
                  baccalaureate_degree = :baccalaureate_degree, 
                  specification = :specification, 
                  enrollment_stats = :enrollment_stats, 
                  designation = :designation, 
                  teaching_exp = :teaching_exp, 
                  org_membership = :org_membership 
                  WHERE 
                  facultymatrix_id = :id";

        $stmt = $this->pdo->prepare($query);

        try {
            $data['id'] = $id;
            $stmt->execute($data);
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    public function delete($id)
    {
        $query = "DELETE FROM facultymatrix WHERE facultymatrix_id = :id";
        $stmt = $this->pdo->prepare($query);

        try {
            $stmt->execute(['id' => $id]);
            return true;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return false;
        }
    }

    public function get($id)
    {
        $query = "SELECT * FROM facultymatrix WHERE facultymatrix_id = :id";
        $stmt = $this->pdo->prepare($query);

        try {
            $stmt->execute(['id' => $id]);
            $facultyMatrix = $stmt->fetch(PDO::FETCH_ASSOC);
            return $facultyMatrix;
        } catch (PDOException $e) {
            error_log($e->getMessage());
            return null;
        }
    }
}
?>
