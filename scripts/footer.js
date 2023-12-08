var notif = false;
var notification = document.getElementById("notification");

function createForm() {
  document.getElementById("overlay").style.display = "grid";
}

function closePopup() {
  // Close the popup
  document.getElementById("overlay").style.display = "none";
}

function notificationAlert(userID) {
  // Retrieve form submission data from Firestore based on the user ID and commentNotification
  db.collection("discussionSubmissions")
    .where("userID", "==", userID)
    .where("commentNotif", "==", true)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        // Matching documents found
        document.getElementById("notification-icon").style.display = "block";
      } else {
        // No matching documents found
        console.log("No matching documents found.");
        document.getElementById("notification-icon").style.display = "none";
      }
    })
    .catch((error) => {
      console.error("Error getting documents: ", error);
    });
}

firebase.auth().onAuthStateChanged((user) => {
  // Check if user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.id);
  }
  const userID = firebase.auth().currentUser.uid;
  console.log(userID);
  // Call the function with the user ID
  notificationAlert(userID);
});
