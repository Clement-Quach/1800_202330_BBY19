function loadSkeleton() {

  firebase.auth().onAuthStateChanged(function (user) {
      if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
          // User is signed in.
          // Do something for the user here.
          console.log($('#navbarPlaceholder').load('./text/nav_after.html'));
          console.log($('#footerPlaceholder').load('./text/footer_after.html'));
      } else {
          // No user is signed in.
          console.log($('#navbarPlaceholder').load('./text/nav_before.html'));
          console.log($('#footerPlaceholder').load('./text/footer_before.html'));
      }
  });
}
loadSkeleton(); //invoke the function