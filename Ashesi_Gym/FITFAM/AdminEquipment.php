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
    <!-- <link rel="stylesheet" href="AdminTrainerView.css"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<style>
     table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
        }

        table, th, td {
            border: 1px solid #ddd;
        }

        th, td {
            padding: 12px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        input[type=text] {
            padding: 8px;
            margin-bottom: 10px;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
            background-color: #fff;
            width: 80%;
            max-width: 400px;
            margin: 100px auto;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        /* Style for the close button */
        .close-btn {
            background-color: #f44336;
            color: #fff;
            border: none;
            padding: 8px 12px;
            border-radius: 3px;
            cursor: pointer;
        }

        .create-input{
           width: 90%
        }
</style>
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
        <div>
            <div>
                <div > Active Equipment </div>
                <button onclick="openModal()" > Add Equipment</button>
            </div>
            <div>
            <input type="text" id="searchInput" onkeyup="filterTable()" placeholder="Search for names...">

<!-- Table -->
<table id="coachTable">
    <thead>
        <tr>
            <th>Equipment ID</th>
            <th>Equipment Name</th>
            <th>Description</th>
            <th>Quantity Available</th>
            <th>Last Maintenance Date</th>
        </tr>
    </thead>

        <tbody>
            
            <!-- Add more rows as needed -->
        </tbody>
</table>
            </div>
        </div>
    

    </div>
</div> 

<div id="myModal" class="modal">
    <div class="modal-content">
        <!-- Content for data entry -->
        <h4>Add Equipment</h4>
        <form id="dataEntryForm" method="post" action="process_equipment_add.php">
            <input type="text" id="dataField" name="equipmentID" required placeholder="equipmentId" class="create-input">
            <br>
            <input type="text" id="dataField" name="equipmentName" required placeholder="equipmentName" class="create-input">
            <br>
            <input type="text" id="dataField" name="quantityAvailable" required placeholder="quantityAvailable" class="create-input">
            <br>
            <input type="text" id="dataField" name="description" required placeholder="description" class="create-input">
            <br>
            <input type="text" id="dataField" name="lastMaintenanceDate" required placeholder="lastMaintenanceDate" class="create-input">
            <br>
            <!-- Close button -->
            <button type="button" class="close-btn" onclick="closeModal()">Close</button>
            <button type="submit" class="close-btn" >Create</button>
        </form>
    </div>
</div>

<script>
        // Function to open the modal
    function openModal() {
        document.getElementById('myModal').style.display = 'block';
    }

    function submitForm(){

    }

    // Function to close the modal
    function closeModal() {
        document.getElementById('myModal').style.display = 'none';
        
    }

    // Function to filter the table based on user input
    function filterTable() {
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("searchInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("coachTable");
            tr = table.getElementsByTagName("tr");

    
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[1];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
    }
    
    </script>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src ="fetch_equipment.js"></script>
    <script>
        const editEquipment = () => {

        }

        const deleteEquipment = (equipmentId) => {
            $.ajax({
                    type: "POST",
                    url: "process_delete_equipment.php",
                    data: { equipmentId: equipmentId },
                    success: function (response) {
                        alert(response); // Display the response message
                        // You can also handle the response to update the UI as needed
                    },
                    error: function (error) {
                        alert("Error: " + error.responseText);
                    }
                });
        }

        // Function to highlight the active tab
        function highlightActiveTab() {
            var currentLocation = window.location.pathname;
            // Get all sidebar items
            var sidebarItems = document.querySelectorAll('.sidebar-item');

            // Loop through sidebar items to find the active one
            sidebarItems.forEach(function (item) {
                var link = item.querySelector('a');
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