<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fitfam_management_system";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$equipmentID = $_POST['equipmentID'];
$equipmentName = $_POST['equipmentName'];
$description = $_POST['description'];
$quantityAvailable = $_POST['quantityAvailable'];
$lastMaintenanceDate = $_POST['lastMaintenanceDate'];


// Insert data into the person table
$sqlPerson = "UPDATE equipment 
              SET equipmentName = '$equipmentName', 
                  description = '$description', 
                  quantityAvailable = '$quantityAvailable', 
                  lastMaintenanceDate = '$lastMaintenanceDate'
              WHERE equipmentID = '$equipmentID'";



if ($conn->query($sqlPerson) === TRUE) {
    // Get the user_id of the inserted record
    $userId = $conn->insert_id;
    header("Location: AdminEquipment.html");
    echo "Record inserted successfully";
  
} else {
    echo "Error inserting into person table: " . $conn->error;
}

// Close the database connection
$conn->close(); 

?>