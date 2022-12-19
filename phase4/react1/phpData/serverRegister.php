<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: Content-Type');
$rest_json = file_get_contents("php://input");
$_POST = json_decode($rest_json, true);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

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
    $type = $_POST["type"];
    $email = $_POST["email"];
    $pass = $_POST["pass"];
    $major = $_POST["major"];
    $phoneNumber = $_POST["phoneNumber"];

    $sql = "INSERT INTO userData (fname,lname,phoneNumber,major,type,email,password)
            VALUES ('$fname', '$lname','$phoneNumber','$major', '$type', '$email', '$pass')";

    if ($conn->query($sql) === TRUE) {
      
      echo "SUCCESS";
      try {
        //Set the SMTP server to send through 
        $mail = new PHPMailer();
        $mail->IsSMTP();  // telling the class to use SMTP
        $mail->Mailer = "smtp";
        $mail->Host = "ssl://smtp.gmail.com";
        $mail->SMTPAuth = true; 
        $mail->Username   = 'abhishekduggirala27@gmail.com';
        $mail->Password   = 'ntcltoevfgchneat'; 
        $mail->Port       = 465;  
        $mail->setFrom('abhishekduggirala27@gmail.com', 'Mailer');
        $mail->addAddress($email);
        $mail->Subject = 'Student Portal';
        $mail->Body    = "Username -".$email." Password - ".$pass;
        $mail->send();
      } catch (Exception $e) {
          
      }

    } else {
      
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