<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="AdminDashboard.css">
    <link rel="stylesheet" href="AdminDashboard.css">
    <link rel="stylesheet" href="AdminTrainerView.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="menu">
            <div id="profile-section">
                <img src="OIP.jpeg" alt="Profile Photo" id="profilePic">
                <h3 id="name"><?php echo explode('@', $_SESSION['email'])[0]?></h3>
                <p id="email"><?php echo isset($_SESSION['email']) ? $_SESSION['email'] : '-'; ?></p>
            </div>
            <div class="sidebar-item">
                <i class="fas fa-table-columns"></i>
                <a href="AdminDashboard.php">Dashboard</a>
            </div>
            <div class="sidebar-item">
                <i class="fa-regular fa-user"></i>
                <a href="AdminProfile.php">Admin Profile</a>
            </div>
            <div class="sidebar-item">
                <i class="fa-solid fa-list-check"></i>
                <a href="AdminAttendance.php">Attendance</a>
            </div>
            <div class="sidebar-item">
                <i class="fa-solid fa-dumbbell"></i>
                <a href="AdminEquipment.php">Equipment</a>
            </div>
            <!-- <div class="dashboard">
                <i class="fa-regular fa-eye"></i>
                <a href="viewtrainers.html" style="color: black;">View Trainers</a>
            </div> -->
            <div class="sidebar-item">
                <i class="fa-solid fa-person"></i>
                <a href="AdminTrainerView.php">Trainers</a>
            </div>    
            <div class="sidebar-item">
                <i class="fa-solid fa-book"></i>
                <a href="AdminReport.php">Report</a>
            </div>
            <div class="sidebar-item">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <a href="logout.html">Logout</a>
            </div>
        </div>
    </div>
    <script>
        // Function to highlight the active tab
        function highlightActiveTab() {
            var currentLocation = window.location.pathname;
            console.log(currentLocation)
            // Get all sidebar items
            var sidebarItems = document.querySelectorAll('.sidebar-item');

            // Loop through sidebar items to find the active one
            sidebarItems.forEach(function (item) {
                var link = item.querySelector('a');
                // if (link && link.getAttribute('href') === currentLocation) {
                //     // Add 'active' class to the active tab
                //     item.classList.add('active');
                // }
                if (link && link.getAttribute('href') === currentLocation.split("/")[3]) {
                    // Add 'active' class to the active tab
                    item.classList.add('active');
                }
            });
        }
        
        highlightActiveTab()
        // Call the function when the page is loaded
        window.onload = function () {
            highlightActiveTab();
        };
    </script>
</body>
</html>