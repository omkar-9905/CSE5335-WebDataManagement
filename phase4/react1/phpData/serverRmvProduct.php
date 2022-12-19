<?php
session_start();
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
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
  if ($_POST){
    if (isset($_SESSION['id'])){
    $productid = $_POST["id"];
    $sql = "DELETE from products WHERE productID = $productid";
    if ($conn->query($sql) === TRUE) {
      echo "SUCCESS";
    } else {
        echo "NOTLOGIN";
    }
    }
} else {
 // tell the user about error
 echo json_encode(
     [
        "sent" => FALSE,
     ]
 );
}
}
?>