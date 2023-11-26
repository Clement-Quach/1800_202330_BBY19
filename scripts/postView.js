document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');
  const db = firebase.firestore();
  const auth = firebase.auth(); // Firebase authentication instance
  const documentSubmissionID = localStorage.getItem('documentSubmissionID');

  // Listen for changes in authentication state
  auth.onAuthStateChanged((user) => {
    if (user) {
      const postRef = db.collection('discussionSubmissions').doc(documentSubmissionID || postId);

      postRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const userID = userData.userID; // Assuming the userID is stored within the userData

          // Fetch the user's data using the userID
          db.collection('users').doc(userID).get().then((userDoc) => {
            if (userDoc.exists) {
              const userProfileData = userDoc.data();
              const profilePic = userProfileData.profilePic;

              // Populating HTML elements with fetched data
              const titleElement = document.getElementById('title');
              const userInfoElement = document.getElementById('userInfo');
              const discussionElement = document.getElementById('discussion');
              const postProfilePicElement = document.getElementById('postProfilePic');

              titleElement.textContent = userData.title || 'Default Title';
              userInfoElement.textContent = userData.name || 'Default Name';
              discussionElement.textContent = userData.details || 'Default Discussion';

              if (profilePic) {
                postProfilePicElement.setAttribute('src', profilePic || './images/Profile-Icon.png');
              }
            } else {
              console.error('User document does not exist');
            }
          }).catch((error) => {
            console.error('Error fetching user document: ', error);
          });
        } else {
          console.error('Post document does not exist');
        }
      }, (error) => {
        console.error('Error fetching document: ', error);
      });
    } else {
      // User is not logged in
      console.error('User is not logged in');
    }
  });
});

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const currentUser = db.collection("users").doc(user.uid);

    currentUser.get().then((userDoc) => {
      if (userDoc.exists) {
        const commentProfilePicElement = document.getElementById('commentProfilePic');
        const commentNameElement = document.getElementById('commentName');

        const userData = userDoc.data();
        const profilePic = userData.profilePic;
        const displayName = userData.name;

        commentProfilePicElement.setAttribute('src', profilePic || './images/defaultProfilePic.jpg');
        commentNameElement.textContent = displayName;
      } else {
        console.error('User document does not exist');
      }
    }).catch((error) => {
      console.error('Error fetching user document: ', error);
    });
  } else {
    console.error('User is not logged in');
  }
});