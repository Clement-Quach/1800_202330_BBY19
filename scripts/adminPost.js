document.addEventListener('DOMContentLoaded', function () {
    const tableBody = document.getElementById('ticketTableBody');

    // Retrieve form submission data from Firestore
    db.collection('formSubmissions').get()
        .then(querySnapshot => {
            querySnapshot.forEach(doc => {
                const submission = doc.data();
                const newRow = tableBody.insertRow();
                // Populate table cells with submission data
                newRow.insertCell(0).textContent = submission.ticketNumber;
                newRow.insertCell(1).textContent = submission.title;
                newRow.insertCell(2).textContent = submission.concern;
                newRow.insertCell(3).textContent = submission.priority;
                newRow.insertCell(4).textContent = submission.name;
                newRow.insertCell(5).textContent = submission.action;
                // Add any additional columns as needed
            });
        })
        .catch(error => {
            console.error('Error retrieving data from Firestore: ', error);
        });
});