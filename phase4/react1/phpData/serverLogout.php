<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Headers: X-Requested-With, Origin, Content-Type, X-CSRF-Token, Accept');
session_start(); //to ensure you are using same session
session_destroy(); //destroy the session
echo "SUCCESS";
// header("location:/severLogin.php"); //to redirect back to "index.php" after logging out
exit();
?>