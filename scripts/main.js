var currentUser;

document.addEventListener('DOMContentLoaded', function () {

  firebase.auth().onAuthStateChanged(users => {
    const nameGoesHere = document.getElementById('name-goes-here');

  db.collection('users')
    .doc(users.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const name = doc.data().name;

        nameGoesHere.innerHTML = name;
        
      } else {
        console.log("Name not Found");
      }
    })
    .catch((error) => {
      console.error("Error getting document:", error);

    });
  })
});

//Directs to account page
document.getElementById('account-card').addEventListener("click", () => {
  window.location.href="account.html";
});

//Directs to view post page
document.getElementById('view-post-card').addEventListener("click", () => {
  window.location.href="forums.html";
});

//Directs to the view ticket page
document.getElementById('view-ticket-card').addEventListener("click", () => {
  window.location.href="inbox.html";
});

