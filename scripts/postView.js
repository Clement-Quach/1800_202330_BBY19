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

          // Construct the HTML string with the post creator's name from postData
          const htmlString = `
            <div class="title">${postData.title}</div>
            <div class="container">
              <div class="post">
                <div id="userImage">
                  <img src="./images/userIcon.jpg">
                </div>
                <div id="userInfo">${postData.name}</div> <!-- Use postData.name for post creator's name -->
                <div id="discussion">${postData.details}</div>
              </div>
              <div class="comment">
                <div id="commentMessage">LEAVE A COMMENT</div>
                <div id="commentImage">
                  <img src="./images/userIcon.jpg">
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
