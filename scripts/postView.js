document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('postId');
  const postContentDiv = document.getElementById('postContent');

  const db = firebase.firestore();
  const auth = firebase.auth(); // Firebase authentication instance

  const documentSubmissionID = localStorage.getItem('documentSubmissionID');

  // Listen for changes in authentication state
  auth.onAuthStateChanged((user) => {
    if (user) {
      const postRef = db.collection('discussionSubmissions').doc(documentSubmissionID || postId);
  
      postRef.onSnapshot((doc) => {
        if (doc.exists) {
          const postData = doc.data();
          const postUserID = postData.userID; // Assuming postData contains the userID
        
          // Get the user document based on the post's userID
          const userRef = db.collection('users').doc(postUserID);
        
          // Retrieve the user data and handle it accordingly
          userRef.get().then((userDoc) => {
            if (userDoc.exists) {
              const userData = userDoc.data();
              let profilePic = userData.profilePic; // Assuming profilePic exists in userData

              // Check if profilePic exists and is not empty/null/undefined
              if (!profilePic) {
                // If profilePic doesn't exist or is empty, use a default user icon
                profilePic = './images/userIcon.jpg';
              }

              // Construct the HTML string with the post creator's name from postData
              const htmlString = `
                <div class="title">${postData.title}</div>
                <div class="container">
                  <div class="post">
                    <div id="userImage">
                      <img src="${profilePic}">
                    </div>
                    <div id="userInfo">${userData.name}</div> <!-- Assuming name is in the user data -->
                    <div id="discussion">${postData.details}</div>
                  </div>
                  <div class="comment">
                    <div id="commentMessage">LEAVE A COMMENT</div>
                    <div id="commentImage">
                      <img src="${profilePic}"> <!-- Using the same imgSrc for comment image -->
                    </div>
                    <div id="commentName">${user.displayName}</div> <!-- Display the logged-in user's name -->
                    <div id="commentBox">
                      <textarea id="commentInput" placeholder="Comment here"></textarea>
                    </div>
                    <div id="commentPost">
                      <input id="commentPreview" type="button" value="PREVIEW">
                      <input id="commentPostComment" type="button" value="POST COMMENT">
                    </div>
                  </div>
                </div>
              `;
              // Set the constructed HTML string to the postContentDiv
              postContentDiv.innerHTML = htmlString;
            } else {
              console.error('User document does not exist');
            }
          }).catch((error) => {
            console.error('Error getting user document:', error);
          });
        } else {
          console.error('Post document does not exist');
        }
      });
    } else {
      console.error('User is not logged in');
    }
  });
});