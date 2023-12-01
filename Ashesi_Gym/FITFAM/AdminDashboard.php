<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <!-- <link rel="stylesheet" href="AdminDashboard.css"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link rel="stylesheet" href="AdminDashboard.css">
    <link rel="stylesheet" href="AdminTrainerView.css">
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
            <a href="#dashboard" style="color: black;">Dashboard</a>
        </div>
        <div class="dashboard"  id="adminpro">
            <i class="fa-regular fa-user"></i>
            <a href="#adminprofile">Admin Profile</a>
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
    <div class="maincontent">
        <div id="headings" style="display: flex;">
            <div id="headingsL" style="float: left;margin-right: 650px;font-size: larger;font-weight: bolder;">
                FITFAM
            </div>
            <div id="headingsR" style="float: right;"> 
                FEEDBACK
                <i class="fa-sharp fa-solid fa-bell" id="notif"></i>
            </div>
        </div>
        
        <div class="maincontenta">
            <div id="item1">
                <div class="item1left">
                    Welcome Banner, <strong>Martell</strong>
                    <p style="font-size: small;">Lorem ipsum dolor sit amet, consectetur <br>adipiscing elit, sed do eiusmod tempor<br> incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                </div>
                <div id="item1right">
                    <img src="blackk.jpeg" alt="Profile Photo" id="trainerpic">
                </div>
            </div>
            <div class="item2" style="text-align: center;">Calender<br><br><br></div>
        </div>
        <div class="maincontentb">
            <div class="item3">
                <div style="text-align: center;margin-bottom: 15px;">Trainers</div>
                <div class="item3a">
                    <img src="blackk.jpeg" alt="Profile Photo" class ="trainerpic">
                        <p style="font-size: medium;">Juan Cruz</p>    
                </div>
                <div class="item3a">
                    <img src="blackk.jpeg" alt="Profile Photo" class="trainerpic">
                        <p style="font-size: medium;">Peter Parker</p>    
                </div>
                <div class="item3a">
                    <img src="blackk.jpeg" alt="Profile Photo" class ="trainerpic">
                        <p style="font-size: medium;">Micheal Gray</p>    
                </div>
            </div>
            <div class="item4" style="text-align: center;">Equipment<br><br><br></div>
        </div>
        <div class="maincontentc">
            <div class="item5">
                <p style="margin-bottom: 5px; text-align: center;" >Trainers</p>
                <div class="cleft">
                    <div class="clefta" style="margin-right: 20px;">
                        <img src="greyyy.jpeg" alt="Profile Photo" class ="trainerpic">
                        <p style="font-size: medium;">James Medalla</p> 
                    </div>
                    <div class="clefta" style="margin-left: 15px;">
                        <img src="greyyy.jpeg" alt="Profile Photo" class ="trainerpic">
                        <p style="font-size: medium;">Kent Charl Mabutas</p> 
                    </div>
                    <div class="clefta" style="margin-left: 11px;">
                        <img src="greyyy.jpeg" alt="Profile Photo" class ="trainerpic">
                        <p style="font-size: medium;">John Elmar Rodrigo</p> 
                    </div>
                </div>
                <div class="cright">

                </div>
            </div>
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
            console.log(currentLocation)
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
