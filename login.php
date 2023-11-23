<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <link rel="stylesheet" type="text/css" href="login.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

    <script>
        function validateForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var username = document.forms["loginForm"]["username"].value;
    var password = document.forms["loginForm"]["password"].value;

    // Regular expression for username validation
    var usernameRegex = /^[a-zA-Z0-9_]+$/;
    // Regular expression for password validation
    var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (username == "" || !usernameRegex.test(username)) {
        alert("Please enter a valid username.");
        return false;
    }

    if (password == "" || !passwordRegex.test(password)) {
        alert("Please enter a valid password. Password must be at least 8 characters long and contain at least one letter and one number.");
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
    <h1>Login</h1>
    <form name="loginForm" method="post" action="login_process.php" onsubmit="return validateForm();">
        <input type="text" name="username" id="username" placeholder="Username" required>
        <br>
        <input type="password" name="password" id="password" placeholder="Password" required>
        <br>
        <button type="submit" class="btn" name="log_button">Login</button>
    </form>
    </div>
    
</body>
</html>
