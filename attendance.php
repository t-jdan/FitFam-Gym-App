<?php

// Connect to the database
$db = new mysqli('localhost', 'root', '', 'FitFam_Management_System');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}

// Function to check in a gym user
function checkInUser($userId) {
    global $db;

    // Check if the user exists
    $sql = "SELECT * FROM GymUser WHERE user_id = '$userId'";
    $result = $db->query($sql);

    if ($result->num_rows == 0) {
        echo "User with ID {$userId} does not exist.";
        return;
    }

    // Check if the user has already checked in for the day
    $today = date('Y-m-d');
    $sql = "SELECT * FROM GymLog WHERE user_id = '$userId' AND log_in = '$today'";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        echo "User with ID {$userId} has already checked in for today.";
        return;
    }

    // Insert a new check-in record
    $sql = "INSERT INTO GymLog (user_id, log_in) VALUES ('$userId', '$today')";
    $db->query($sql);

    echo "User with ID {$userId} has been checked in successfully.";
}

// Function to record attendance for a gym user
function recordAttendance($userId) {
    global $db;

    // Check if the user exists
    $sql = "SELECT * FROM GymUser WHERE user_id = '$userId'";
    $result = $db->query($sql);

    if ($result->num_rows == 0) {
        echo "User with ID {$userId} does not exist.";
        return;
    }

    // Check if the user has checked in for the day
    $today = date('Y-m-d');
    $sql = "SELECT * FROM GymLog WHERE user_id = '$userId' AND log_in = '$today'";
    $result = $db->query($sql);

    if ($result->num_rows == 0) {
        echo "User with ID {$userId} has not checked in for today.";
        return;
    }

    // Record the attendance for the day
    $sql = "UPDATE GymLog SET log_out = '$today' WHERE user_id = '$userId' AND log_in = '$today'";
    $db->query($sql);

    echo "Attendance for user with ID {$userId} has been recorded successfully.";
}

$db->close();
?>
