<?php
ini_set("session.cookie_domain", 'localhost'); //update to deploy on cloud 
session_set_cookie_params(3600, '/', 'localhost'); //update to deploy on cloud 
if(!isset($_SESSION)) {
   session_start();
}

// csrf code add here (see below...)
$http_origin = $_SERVER['HTTP_ORIGIN'];
if ($http_origin == "http://localhost:3000" || $http_origin == "http://localhost:3000"){  //update to deploy on cloud 
    header("Access-Control-Allow-Origin: $http_origin");
}
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
// code starts here



header("Access-Control-Allow-Origin: *");
// header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);

$servername = "51.81.160.154";
$username = "oxg7237_wdm_project";
$password = "StudentPortal";
$database = "oxg7237_wdm_test";
$res = new StdClass;

$conn = new mysqli($servername, $username, $password);
mysqli_select_db($conn,$database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

if ($conn){
  if ($_POST){
    $email = $_POST["email"];
    $pass = $_POST["pass"];
    $sql = "SELECT password,type,studentID,fname from userData WHERE email= '$email'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            if($pass === $row["password"])
        {   
            $_SESSION['id'] = $row['studentID'];
            $_SESSION['name'] = $row['fname'];
            $_SESSION['type'] = $row['type'];
            $_SESSION['addClub'] = [];
            $_SESSION['cartProduct'] = [];
            $res->status = "SUCCESS";
            $res->type = $row['type'];
            echo json_encode($res);
        }
        else
        {
            echo "FAILED";
        }
          }

    } else {
        // echo $result;
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
session_write_close();
?>