<?php
if (isset($_POST['reg_button'])) 
{
// Retrieve the submitted username and password from the registration form
$userid = $_POST['studentID'];
$firstname= $_POST['firstname'];
$lastname= $_POST['lastname'];
$username = $_POST['email'];
$tel_no= $_POST['tel_no'];
$dob= $_POST['DOB'];
$user_pass =  $_POST['CreatePassword'];

// Hash the password for secure storage
$hashedPassword = md5($user_pass);



// Database connection settings
$servername = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "fitfam_management_system";

// Create a database connection
$conn = new mysqli($servername, $db_username, $db_password, $db_name);

// Check the connection
if ($conn->connect_error) {
    echo json_encode(["error" => "Connection failed: " . $conn->connect_error]);
    exit();
}

// Prepare the SQL statement to insert the new user into the database
$stmt = $conn->prepare("INSERT INTO person  (user_id, first_name, last_name, email, tel_no,dob,user_pass) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssss", $userid, $firstname, $lastname, $username, $tel_no, $dob, $hashedPassword);
$stmt->execute();


// Check if the user was successfully inserted
if ($stmt->affected_rows === 1) {
    // If the registration is successful, redirect to a login page or show a success message
    header("Location: FITFAM/index.html"); 
    exit();
} else {
    // If the registration fails, redirect back to the registration page with an error message
    header("Location:Register.html?error=1"); // Redirect to the registration page with an error query parameter
    exit();
}

// Close the prepared statement and database connection
$stmt->close();
$conn->close();
}

else{
    header("Location:Register.html"); // Redirect to the registration page with an error query parameter
    exit();

}
?>
