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
          picUrl = "./images/default_profile_picture.png"
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

populateImage();