<?php
session_start();

// Clear all session variables
session_unset();

// Destroy the session
session_destroy();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Logout</title>
</head>
<body>
    <h1>Logged Out Successfully</h1>
    <p>You have been successfully logged out.</p>
    <a href="login.php">Click here to login again</a>
</body>
</html>
