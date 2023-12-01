<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the trainer ID from the AJAX request
    $trainerId = $_POST["trainerId"];

    // Validate and sanitize the input if needed

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

    // Start a transaction to ensure data consistency across multiple tables
    $conn->begin_transaction();

    try {
        // Prepare the SQL statement to delete from gymtrainer
        $stmt1 = $conn->prepare("DELETE FROM gymtrainer WHERE user_id = ?");
        $stmt1->bind_param("i", $trainerId);
        $stmt1->execute();

        // Prepare the SQL statement to delete from person
        $stmt2 = $conn->prepare("DELETE FROM person WHERE user_id = ?");
        $stmt2->bind_param("i", $trainerId);
        $stmt2->execute();

        // Commit the transaction if both delete operations are successful
        $conn->commit();

        echo "Trainer deleted successfully.";
        header("Location: AdminTrainerView.html");

    } catch (Exception $e) {
        // Rollback the transaction if there's any error
        $conn->rollback();

        echo "Error deleting trainer: " . $e->getMessage();
    }

    // Close the prepared statements and database connection
    $stmt1->close();
    $stmt2->close();
    $conn->close();
} else {
    // Return an error message if accessed directly without a POST request
    http_response_code(400); // Bad Request
    echo "Invalid request.";
}
?>
