$(document).ready(function () {
    // Function to fetch and display data in the table
    function fetchData() {
        $.ajax({
            url: 'fetch_equipment.php',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Clear existing table rows
                $('#coachTable tbody').empty();

                // Populate the table with fetched data
                data.forEach(function (row) {
                    var newRow = '<tr>' +
                        '<td>' + row.equipmentID + '</td>' +
                        '<td>' + row.equipmentName + '</td>' +
                        '<td>' + row.description + '</td>' +
                        '<td>' + row.quantityAvailable + '</td>' +
                        '<td>' + row.lastMaintenanceDate + '</td>' +
                        `<td><button onclick="editEquipment(${row.equipmentID})">Edit</button><button onclick = "deleteEquipment(${row.equipmentID})">Delete</button></td>` +
                        '</tr>'

                    $('#coachTable tbody').append(newRow);
                });
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
            }
        });
    }

    // Initial fetch when the page loads
    fetchData();

    

    // Periodic data refresh, adjust the interval as needed (e.g., every 5 seconds)
    setInterval(fetchData, 5000);
})