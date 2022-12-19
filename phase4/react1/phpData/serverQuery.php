<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
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
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $query = $_POST["query"];
    $phoneNumber = $_POST["phoneNumber"];

    $sql = "INSERT INTO userQuery (fname,lname,phoneNumber,email,query)
            VALUES ('$fname', '$lname','$phoneNumber','$query', '$email')";
    if ($conn->query($sql) === TRUE) {
      
      echo "SUCCESS";

    } else {
      echo "Error: " . $sql . "<br>" . $conn->error;
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