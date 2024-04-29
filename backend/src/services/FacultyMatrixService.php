<?php
namespace Src\Services;

use Src\Models\FacultyMatrix;
use Src\Utils\Response;


class FacultyMatrixService
{
    private $facultyMatrixModel;

    public function __construct(\PDO $pdo)
    {
        $this->facultyMatrixModel = new FacultyMatrix($pdo);
    }

    public function create($data)
    {
        $result = $this->facultyMatrixModel->create($data);

        if ($result) {
            return Response::payload(201, true, "Faculty matrix created successfully", $result);
        } else {
            return Response::payload(500, false, "Failed to create faculty matrix");
        }
    }

    public function update($data, $id)
    {
        $result = $this->facultyMatrixModel->update($data, $id);

        if ($result) {
            return Response::payload(200, true, "Faculty matrix updated successfully");
        } else {
            return Response::payload(500, false, "Failed to update faculty matrix");
        }
    }

    public function delete($id)
    {
        $result = $this->facultyMatrixModel->delete($id);

        if ($result) {
            return Response::payload(200, true, "Faculty matrix deleted successfully");
        } else {
            return Response::payload(500, false, "Failed to delete faculty matrix");
        }
    }

    public function get($id)
    {
        $result = $this->facultyMatrixModel->get($id);

        if ($result) {
            return Response::payload(200, true, "Faculty matrix retrieved successfully", $result);
        } else {
            return Response::payload(404, false, "Faculty matrix not found");
        }
    }
}
?>
