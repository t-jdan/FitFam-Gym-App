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

// Perform SQL JOIN to get data from both person and gymtrainer tables
$sql = "SELECT person.*, gymtrainer.wage
        FROM person
        RIGHT JOIN gymtrainer ON person.user_id = gymtrainer.user_id";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    echo json_encode($data);
} else {
    echo json_encode([]);
}

// Close the database connection
$conn->close();

?>