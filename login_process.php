<?php
if (isset($_POST['log_button'])) 
{
session_start();

// Retrieve the submitted username and password from the login form
$username = $_POST['username'];
$password = $_POST['password'];

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


// Prepare the SQL statement to retrieve user information based on the submitted username
$stmt = $conn->prepare("SELECT passcode FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

// Check if a user with the submitted username exists
if ($stmt->num_rows === 1) {
    // Bind the result to a variable
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();

    // Verify the submitted password against the stored hashed password
    if (password_verify($password, $hashedPassword)) {
        // If the password matches, set the session variable and redirect to a dashboard or home page
        $_SESSION['username'] = $username;
        header("Location: dashboard.php"); // Replace "dashboard.php" with your desired page
        exit();
    } else {
        // Invalid password
        header("Location: login.php?error=1"); // Redirect to the login page with an error query parameter
        exit();
    }
} else {
    // User does not exist
    header("Location: login.php?error=2"); // Redirect to the login page with an error query parameter
    exit();
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
}
else{
    header("Location: login.php"); 
    exit();

}
?>
