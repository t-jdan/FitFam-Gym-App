<?php
session_start()
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Profile</title>
    <!-- <link rel="stylesheet" href="AdminProfile.css"> -->
    <link rel="stylesheet" href="AdminDashboard.css">
    <link rel="stylesheet" href="AdminProfile.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body>  
<div class="container">
    
    <!-- <div class="menu">
        <div id="profile-section">
            <img src="OIP.jpeg" alt="Profile Photo" id="profilePic">
            <h3 id="name" class="details">John Doe</h3>
            <p id="email" class="details">john.doe@example.com</p>
        </div>
        <div class="dashboard" id="dashB">
            <i class="fas fa-table-columns"></i>
            <a href="#dashboard" >Dashboard</a>
        </div>
        <div class="dashboard"  id="adminpro" style="color: black">
            <i class="fa-regular fa-user"></i>
            <a href="#adminprofile" style="color: black;">Admin Profile</a>
        </div>
        <div class="dashboard" id="attend">
            <i class="fa-solid fa-list-check"></i>
            <a href="#attendance">Attendance</a>
        </div>
        <div class="dashboard" id="equip">
            <i class="fa-solid fa-dumbbell"></i>
            <a href="#equipment">Equipment</a>
        </div>
        <div class="dashboard" id="viewT">
            <i class="fa-regular fa-eye"></i>
            <a href="#viewtrainers">View Trainers</a>
        </div>
        <div class="dashboard" id="Train">
            <i class="fa-solid fa-person"></i>
            <a href="#trainers">Trainers</a>
        </div>    
        <div class="dashboard" id="rep">
            <i class="fa-solid fa-book"></i>
            <a href="#report">Report</a>
        </div>
        <div  id="logout">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <a href="#logout">Logout</a>
        </div>
    </div> -->
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
            <a href="AdminTrainerView.html">Trainers</a>
        </div>    
        <div class="sidebar-item">
            <i class="fa-solid fa-book"></i>
            <a href="AdminReport.html">Report</a>
        </div>
        <div class="sidebar-item">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <a href="logout.html">Logout</a>
        </div>
    </div>
    <div class="maincontent">
        <div id="maincontenta">
            <p style="text-align: center;font-weight: bolder;font-size: xx-large;">PROFILE  PAGE</p>
        </div>
        <div id="maincontentb">
            <div id="adPic" style="float: left;">
                <img src="latinn0.jpeg" alt="Profile Photo" id="adProPic">
            </div>
            <div class="adDetails" style="float: right;">
                <p>FirstName: <?php echo $_SESSION['first_name'] ?></p>
                <p>LastName: <?php echo $_SESSION['last_name']; ?></p>
                <p>TelNo: <?php echo $_SESSION['tel_no']; ?></p>
                <p>ID: <?php echo $_SESSION['user_id']; ?></p>
            </div>            
        </div>

    </div>

</div>
</div> 
<script>
    // Function to highlight the active tab
    function highlightActiveTab() {
        var currentLocation = window.location.pathname;

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

    // Call the function when the page is loaded
    window.onload = function () {
        highlightActiveTab();
    };
</script>
</body>
</html>
