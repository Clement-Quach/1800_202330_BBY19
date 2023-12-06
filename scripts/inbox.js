function displayFirestoreData(userID) {
  const tableBody = document.getElementById('ticketTableBody');

  // Retrieve form submission data from Firestore based on the user ID
  db.collection('formSubmissions')
      .orderBy('timestamp', 'desc')
      .where('userID', '==', userID) // Add this line to filter by user ID
      .get()
      .then(querySnapshot => {
          tableBody.innerHTML = ''; // Clear any previous data

          querySnapshot.forEach(doc => {
              const submission = doc.data();
              const newRow = tableBody.insertRow();

              // Populate table cells with submission data
              newRow.insertCell(0).textContent = submission.ticketNumber;
              newRow.insertCell(1).textContent = submission.title;
              newRow.insertCell(2).textContent = submission.concern;
              newRow.insertCell(3).textContent = submission.priority;
              const actionCell = newRow.insertCell(4);
              actionCell.textContent = submission.action;

              actionCell.classList.add('greenBackground');
              // Add any additional columns as needed

              const docID = doc.id; // Get the document ID
              newRow.setAttribute('data-formSubmissionID', docID); // Set the correct ID to the row

              // Add click event listener to each row
              newRow.addEventListener('click', function(event) {
                  const submissionID = this.getAttribute('data-formSubmissionID');

                  if (submissionID) {
                      localStorage.setItem('formSubmissionID', submissionID);
                      window.location.href = `inboxView.html?formSubmissionID=${submissionID}`;
                  }
              });
          });
      })
      .catch(error => {
          console.error('Error retrieving data from Firestore: ', error);
      });
}


// Add an event listener to the "Fetch Data" button to call the function when clicked
// const fetchDataButton = document.getElementById('fetchDataButton');
// fetchDataButton.addEventListener('click', () => {
//     // Get the current user ID
//     const userID = firebase.auth().currentUser.uid;
//     console.log(userID);
//     // Call the function with the user ID
//     displayFirestoreData(userID);
// });

firebase.auth().onAuthStateChanged(user => {
    // Check if user is signed in:
    if (user) {
      currentUser = db.collection("users").doc(user.id)
    }
    const userID = firebase.auth().currentUser.uid;
    console.log(userID);
    // Call the function with the user ID
    displayFirestoreData(userID);
  });