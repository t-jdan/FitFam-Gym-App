$(document).ready(function () {
        // Function to fetch and display data in the table
        function fetchData() {
            $.ajax({
                url: 'fetch_trainer.php',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    // Clear existing table rows
                    $('#coachTable tbody').empty();

                    // Populate the table with fetched data
                    data.forEach(function (row) {
                        var newRow = '<tr>' +
                            '<td>' + row.first_name + ' ' + row.last_name + '</td>' +
                            '<td>' + row.user_id + '</td>' +
                            '<td>' + row.tel_no + '</td>' +
                            '<td>' + row.dob + '</td>' +
                            '<td>' + (row.wage ? row.wage : '-') + '</td>' +
                            `<td><button onclick="editCoach(${row.user_id})">Edit</button> <button onclick = "deleteCoach(${row.user_id})">Delete</button></td>` +
                            '</tr>';

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