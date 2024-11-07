<?php
error_reporting(0);
use config\DBConfig;
require_once "header.php";
require_once "config/DBConfig.php";

$dbConfig = new DBConfig();
$conn = $dbConfig->getConnection();

if (isset($_REQUEST['todel'])) {
    $deletStmt = $conn->prepare("CALL deleteIsf(".$_REQUEST['todel'].");");
    if ($deletStmt->execute()) {
        echo "<script>alert('Sucessfully deleted...')</script>";
        echo "<script>location='index.php'</script>";
    }else{
        echo "<script>alert('Deletion process failed!')</script>";
        echo "<script>location='index.php'</script>";
    }
}

$selectStmt = $conn->prepare("CALL getAllIsf();");
$selectStmt->execute();
$resultArr = $selectStmt->fetchAll(PDO::FETCH_OBJ);


?>
<!-- Database Table Display -->
<main>
    <div class="container-fluid">
        <div class="col-12 mx-auto mt-3 card mb-3">
            <div class="card-header">
                Data List
            </div>
            <div class="card-body p-4">
                <table id="example" class="table table-striped table-bordered nowrap" style="width:100%">
                    <thead>
                        <tr>
                            <?php
                            echo "<th>No</th>";
                            echo "<th>Action</th>";
                            foreach($resultArr[0] as $k=>$v){
                                if ($k!="rowId") {
                                    echo "<th>$k</th>";   
                                }
                            }
                            ?>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $no=0;
                        foreach ($resultArr as $obj) {
                            $no++;
                            $rid = $obj->rowId;
                            echo "<tr>";
                            echo "<td>$no</td>";
                            echo "<td><a href='index.php?todel=$rid'><i class='fas fa-trash text-danger'></i></a></td>";
                            foreach($obj as $k=>$v){
                                if ($k!="rowId") {
                                    echo "<td>$v</td>";   
                                }
                            }
                            echo "</tr>";
                        }
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<script>
$(document).ready(function() {
    var table = $('#example').DataTable( {
        responsive: true
    } );
} );
</script>
<?php
require_once "footer.php";
?>