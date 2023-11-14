function getNameFromAuth() {
  firebase.auth().onAuthStateChanged(users => {
      // Check if a user is signed in:
      if (users) {
          // Do something for the currently logged-in user here: 
          console.log(users.uid); //print the uid in the browser console
          console.log(users.displayName);  //print the user name in the browser console
          userName = users.displayName;

          document.getElementById("name-goes-here").innerText = userName;    

          //method #2:  insert using jquery
          // $("#name-goes-here").text(userName); //using jquery

          //method #3:  insert using querySelector
          //document.querySelector("#name-goes-here").innerText = userName

      } else {
          // No user is signed in.
      }
  });
}
getNameFromAuth();
