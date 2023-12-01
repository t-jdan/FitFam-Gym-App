<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
include 'db_connect.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize input data
    $firstName = htmlspecialchars($_POST['first_name']);
    $lastName = htmlspecialchars($_POST['last_name']);
    $email = htmlspecialchars($_POST['email']);
    $idNumber = htmlspecialchars($_POST['idno']);
    $telNo = htmlspecialchars($_POST['tel_no']);
    $dob = $_POST['DOB'];  // Date validation will be handled separately
    $createPassword = htmlspecialchars($_POST['CreatePassword']);
    $retypePassword = htmlspecialchars($_POST['ReTypePassword']);
    

    // Validate the data
    $errors = [];
    if (empty($firstName) || empty($lastName) || empty($email) || empty($idNumber) || empty($telNo) || empty($dob) || empty($createPassword) || empty($retypePassword)) {
        $errors[] = "All fields are required.";
    }
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format.";
    }
    if ($createPassword !== $retypePassword) {
        $errors[] = "Passwords do not match.";
    }
    // Date validation (simple format check)
    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $dob)) {
        $errors[] = "Invalid date format. Expected YYYY-MM-DD.";
    }

    if (empty($errors)) {
        $hashedPassword = password_hash($createPassword, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO person (user_id, first_name, last_name, email, tel_no, dob, user_pass) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $idNumber, $firstName, $lastName, $email, $telNo, $dob, $hashedPassword);

        if ($stmt->execute()) {
            // Redirect to a success page
            header("Location: login.html");

            // Close statement and connection
            $stmt->close();
            $conn->close();

            
            exit;
        } else {
            echo "Error: " . $stmt->error;
        }
    } else {
        // Display errors
        foreach ($errors as $error) {
            echo $error . "<br>";
        }
    }

    // Close statement and connection if still open
    if (isset($stmt)) {
        $stmt->close();
    }
    $conn->close();
} else {
    echo "Invalid request method.";
}
?>
