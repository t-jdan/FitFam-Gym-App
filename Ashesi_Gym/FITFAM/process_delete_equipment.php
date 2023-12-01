<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the equipment ID from the AJAX request
    $equipmentId = $_POST["equipmentId"];

    // Validate and sanitize the input if needed

    // Database connection settings
    $servername = "localhost";
    $db_username = "root";
    $db_password = "";
    $db_name = "fitfam_management_system";

    // Create a database connection
    $conn = new mysqli($servername, $db_username, $db_password, $db_name);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL statement to delete equipment
    $stmt = $conn->prepare("DELETE FROM Equipment WHERE equipmentID = ?");
    $stmt->bind_param("i", $equipmentId);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Equipment deleted successfully.";
        header("Location: AdminEquipment.html");
    } else {
        echo "Error deleting equipment: " . $stmt->error;
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $conn->close();
} else {
    // Return an error message if accessed directly without a POST request
    http_response_code(400); // Bad Request
    echo "Invalid request.";
}
?>
