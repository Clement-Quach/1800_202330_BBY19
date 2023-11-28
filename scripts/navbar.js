function populateImage() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        let picUrl = userDoc.data().profilePic;

        if (picUrl != null) {
          console.log(picUrl);
          $("#main-profile-picture").attr("src", picUrl);
        } else {
          console.log("picURL is null");
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

populateImage();