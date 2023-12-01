<?php
if (isset($_POST['log_button'])) 
{
    session_start();

    // Retrieve the submitted username and password from the login form
    $username = $_POST['email'];
    $password = $_POST['password'];


    $hashedLogin=md5($password);
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

    // Prepare the SQL statement to retrieve user information based on the submitted username
    $stmt = $conn->prepare("SELECT user_id, first_name, last_name, tel_no, user_pass FROM person WHERE email = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // Check if a user with the submitted username exists
    if ($stmt->num_rows === 1) {
        // Bind the result to variables
        $stmt->bind_result($userId, $firstName, $lastName, $telNo, $hashedPassword);
        $stmt->fetch();

        // Verify the submitted password against the stored hashed password
        if ($hashedLogin == $hashedPassword) {
            // If the password matches, set the session variables
            $_SESSION['user_id'] = $userId;
            $_SESSION['first_name'] = $firstName;
            $_SESSION['last_name'] = $lastName;
            $_SESSION['tel_no'] = $telNo;
            $_SESSION['email'] = $username;

            header("Location: FITFAM/AdminDashboard.php"); // Replace "dashboard.php" with your desired page
            exit();
        } else {
            // Invalid password
            header("Location: FITFAM/index.html?error=1"); // Redirect to the login page with an error query parameter
            exit();
        }
    } else {
        // User does not exist
        header("Location: FITFAM/index.html?error=2"); // Redirect to the login page with an error query parameter
        exit();
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();
}
else{
    header("Location: FITFAM/index.html"); 
    exit();
}
?>
