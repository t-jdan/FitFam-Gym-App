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
$userid = $_POST['coach_id'];
$firstname = $_POST['first_name'];
$lastname = $_POST['last_name'];
$email = $_POST['email'];
$telno = $_POST['tel_no'];
$dob = $_POST['dob'];
$wage = $_POST['wage'];

// Insert data into the person table
$sqlPerson = "INSERT INTO person (user_id, first_name, last_name, email, tel_no, dob) VALUES ('$userid', '$firstname', '$lastname', '$email', '$telno', '$dob')";

if ($conn->query($sqlPerson) === TRUE) {
    // Get the user_id of the inserted record
    $userId = $conn->insert_id;

    // Insert data into the gymtrainer table
    $sqlGymTrainer = "INSERT INTO gymtrainer (user_id, wage) VALUES ('$userid', '$wage')";

    if ($conn->query($sqlGymTrainer) === TRUE) {
        header("Location: AdminTrainerView.php");
        echo "Record inserted successfully";
    } else {
        header("Location: AdminTrainerView.php");
        echo "Error inserting into gymtrainer table: " . $conn->error;
    }
} else {
    echo "Error inserting into person table: " . $conn->error;
}

// Close the database connection
$conn->close();
?>
