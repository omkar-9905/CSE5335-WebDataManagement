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

// Create connection
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
    
$sql = "SELECT type, count(*) as number FROM userData GROUP BY type";
$result = mysqli_query($conn, $sql);




$conn->close();
?>

<!DOCTYPE html>
<html>
	<head>
		 <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>  
           <script type="text/javascript">  
           google.charts.load('current', {'packages':['corechart']});  
           google.charts.setOnLoadCallback(drawChart);  
           function drawChart()  
           {  
                var userdata = google.visualization.arrayToDataTable([  
                          ['type', 'Number'],  
                          <?php  
                          while($row = mysqli_fetch_array($result))  
                          {  
                               echo "['".$row["type"]."', ".$row["number"]."],";  
                          }  
                          ?>  
                     ]);  
                var title = {  
                      title: 'Percentage of users using the website',   
                     };  
                var chart = new google.visualization.PieChart(document.getElementById('piechart'));  
                chart.draw(userdata, title);  
           }  
           </script>  
	</head>
		  
	<body>  
           <br /><br />  
           
                 
                <br />  
                <div id="piechart" style="width: 1200px; height: 700px;"></div>  
            
      </body>  
 </html>  