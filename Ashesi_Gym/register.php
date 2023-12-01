<!DOCTYPE html>
<html>
<head>
    <title>Registration Page</title>
    <link rel="stylesheet" type="text/css" href="login.css">
    <script>
        function validateForm(event) {
            event.preventDefault(); // Prevent the form from submitting normally
            var username = document.forms["registrationForm"]["username"].value;
            var password = document.forms["registrationForm"]["password"].value;
            var confirmPassword = document.forms["registrationForm"]["confirm_password"].value;

            if (username == "") {
                alert("Please enter a username.");
                return false;
            }

            if (password == "") {
                alert("Please enter a password.");
                return false;
            }

            if (confirmPassword == "") {
                alert("Please confirm your password.");
                return false;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return false;
            }

             // If validation passed, make the AJAX call
    $.ajax({
        type: "POST",
        url: "login_process.php",
        data: { log_button: true, username: username, password: password },
        success: function(response) {
            // Handle the response from the server
            // This could be a redirect, an error message, etc.
            window.location.href = "dashboard.php";
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle any errors
            console.error(textStatus, errorThrown);
        }
    });
        }
    </script>
</head>
<body class="background-color">
<br><br><br><br><br>
    <div class="container">
    <h1>Registration</h1>

    <form name="registrationForm" method="post" action="register_process.php" onsubmit="return validateForm();">
    <input type="text" name="username" id="username" placeholder="Username" required>
        <br>

        <input type="password" name="password" id="password" placeholder="Password" required>
        
        <br>

        <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required>
        <br>
        <button type="submit" class="btn" name="reg_button">Register</button>
        
    </form>
    </div>
</body>
</html>
