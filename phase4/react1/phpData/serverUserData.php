<?php
session_start();
header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$servername = "51.81.160.154";
$username = "oxg7237_wdm_project";
$password = "StudentPortal";
$database = "oxg7237_wdm_test";
$conn = new mysqli($servername, $username, $password);
mysqli_select_db($conn,$database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn){
    if (isset($_SESSION['id'])){
        if ($_SESSION['type'] == "schooladmin"){
            $sql = "SELECT * from userData where type IN ('student','businessowner')";
            $result = $conn->query($sql);
            if ($result->num_rows) {
                while($row = $result->fetch_assoc()) {
                    $json[] = $row;
                }
                echo json_encode($json);
            } else {
                    echo "FAILED";
            }
    
        } 
        if ($_SESSION['type'] == "superadmin"){
            $sql = "SELECT * from userData where type IN ('student','businessowner','schooladmin','superadmin')";
            $result = $conn->query($sql);
            if ($result->num_rows) {
                while($row = $result->fetch_assoc()) {
                    $json[] = $row;
                }
                echo json_encode($json);
            } else {
                    echo "FAILED";
            }
    
        } 
    }
    else {
        echo "NOTLOGIN";
}}
?>