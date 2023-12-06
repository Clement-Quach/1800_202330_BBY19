var notif = false;
var notification = document.getElementById("notification");

function createForm() {
  document.getElementById('overlay').style.display = 'grid';
  notification.style.backgroundColor = "black";

}

function closePopup() {
  // Close the popup
  document.getElementById('overlay').style.display = 'none';
}

function notificationAlert(userID) {
  // Retrieve form submission data from Firestore based on the user ID and commentNotif
  db.collection('discussionSubmissions')
    .where('userID', '==', userID)
    .where('commentNotif', '==', true)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        // Matching documents found
        document.getElementById("notification").style.backgroundColor = "rgba(97, 80, 76, 0.721)(242, 138, 138)";
      } else {
        // No matching documents found
        console.log('No matching documents found.');
        document.getElementById("notification").style.backgroundColor = "none";
        // You can handle this case accordingly, e.g., display a message or perform other actions.
      }
    })
    .catch(error => {
      console.error('Error getting documents: ', error);
      // Handle errors here
    });
}





firebase.auth().onAuthStateChanged(user => {

  // Check if user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.id)
  }
  const userID = firebase.auth().currentUser.uid;
  console.log(userID);
  // Call the function with the user ID
  notificationAlert(userID);
});