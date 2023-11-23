<?php
if (isset($_POST['reg_button'])) 
{
// Retrieve the submitted username and password from the registration form
$username = $_POST['username'];
$user_pass = $_POST['password'];

// Hash the password for secure storage
$hashedPassword = password_hash($user_pass, PASSWORD_DEFAULT);

// Database connection settings
$servername = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "collection_app";

// Create a database connection
$conn = new mysqli($servername, $db_username, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Prepare the SQL statement to insert the new user into the database
$stmt = $conn->prepare("INSERT INTO users (username, passcode) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hashedPassword);
$stmt->execute();

// Check if the user was successfully inserted
if ($stmt->affected_rows === 1) {
    // If the registration is successful, redirect to a login page or show a success message
    header("Location: login.php"); // Replace "login.php" with your desired page
    exit();
} else {
    // If the registration fails, redirect back to the registration page with an error message
    header("Location:register.php?error=1"); // Redirect to the registration page with an error query parameter
    exit();
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
}

else{
    header("Location:register.php"); // Redirect to the registration page with an error query parameter
    exit();

}
?>
