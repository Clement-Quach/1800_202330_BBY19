function fetchDataAndDisplay() {
  const dataContainer = document.getElementById("dataContainer");

  // Clear previous data before re-rendering
  dataContainer.innerHTML = "";

  // Set up a real-time listener on the 'discussionSubmissions' collection
  db.collection("discussionSubmissions")
    .orderBy("timestamp", "desc")
    .onSnapshot((querySnapshot) => {

      dataContainer.innerHTML = "";

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const dataElement = document.createElement("div");
        dataElement.className = "card";

        const time = data.timestamp;

        const dateObject = time.toDate();

        // Extracting date components
        const year = dateObject.getFullYear();
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
        const day = dateObject.getDate().toString().padStart(2, '0');

        // Extracting time components
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');

        // Formatting the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        if (data.image) {
          dataElement.innerHTML = `
          <div class="card-header">
            <span class="tag tag-teal" id="title">${data.action}</span>
          </div>
          <div class="card-body">
            <div class="user">
              <h1 id="details">${data.title}</h1>
              <small id="timestamp">${formattedDateTime}</small>
              <h5 id="name">${data.name}</h5>
            </div>
            <div class="card-details">
              <div class="card-image">
                <img src="${data.image}" alt="${data.title}" />
              </div> 
              <p>${data.details}</p>
            </div>
            <div id="like-section">
              <h3 id="likeCount">Likes: <span id="like-number">${data.likes || 0}</span></h3>
              <button id="like-image" onclick="likePost('${
                doc.id
              }', '${data.likes || 0}')">Like</button>
              <button onclick="DislikePost('${doc.id}', '${
              data.likes || 0
                }')">Dislike</button>
            </div>
          </div>
        `;
        } else {
          dataElement.innerHTML = `
          <div class="card-header">
            <span class="tag tag-teal" id="title">${data.action}</span>
          </div>
          <div class="card-body">
            <div class="user">
              <h1 id="details">${data.title}</h1>
              <small id="timestamp">${formattedDateTime}</small>
              <h5 id="name">${data.name}</h5>
            </div>
            <div class="card-details">
              <p>${data.details}</p>
            </div>
            <div id="like-section">
              <span id="likeCount">Likes: <span id="like-number">${data.likes || 0}</span></span>
              <button id="like-image" onclick="likePost('${
                doc.id
              }', '${data.likes || 0}')">Like</button>
              <button onclick="DislikePost('${doc.id}', '${
                data.likes || 0
              }')">Dislike</button>
            </div>
          </div>
          `;
        }
        const docID = doc.id; // Get the document ID

        dataElement.setAttribute('data-documentSubmissionID', docID);
        
        dataElement.addEventListener('click', function(event) {
          const submissionID = this.getAttribute('data-documentSubmissionID');
        
          if (event.target.tagName.toLowerCase() !== 'button' && submissionID) {
            event.preventDefault();

            localStorage.setItem('documentSubmissionID', submissionID);
            window.location.href = `postView.html?documentSubmissionID=${submissionID}`;
          }
        });

        dataContainer.appendChild(dataElement);
      });
    }, (error) => {
      console.error("Error reading Firestore data:", error);
    });
}

fetchDataAndDisplay();

firebase.auth().onAuthStateChanged((user) => {
  // Check if user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.id);
  } else {
    currentUser = null;
  }
});
const needToLogInMessage = "you need to log in to like or dislike a post"

function likePost(docId, currentLikes) {

  if(currentUser != null){
    const userID = firebase.auth().currentUser.uid;
    const docRef = db.collection("discussionSubmissions").doc(docId);
  
  docRef.get().then((doc) => {
    if (doc.exists) {
      const likedBy = doc.data().likedBy || []; 
      const dislikedBy = doc.data().dislikedBy || [];
      // sendLikeNotification(docRef)

      if (likedBy.includes(userID)) {
        // If previously liked and now unliking
        docRef.update({
          likes: parseInt(currentLikes) - 1,
          likedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
        });
      } else {
        // If not previously liked or changing from dislike to like
        docRef.update({
          likes: dislikedBy.includes(userID) ? parseInt(currentLikes) + 2 : parseInt(currentLikes) + 1,
          likedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          dislikedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
        });

      }
    }}
  )} else {
    alert(needToLogInMessage)
  } 

  }
function DislikePost(docId, currentLikes) {

  if (currentUser != null) {
  const userID = firebase.auth().currentUser.uid;
  const docRef = db.collection("discussionSubmissions").doc(docId);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const likedBy = doc.data().likedBy || [];
      const dislikedBy = doc.data().dislikedBy || [];

      if (dislikedBy.includes(userID)) {
        // If previously disliked and now undisliking
        docRef.update({
          likes: parseInt(currentLikes) + 1,
          dislikedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
        });
      } else {
        // If not previously disliked or changing from like to dislike
        docRef.update({
          likes: likedBy.includes(userID) ? parseInt(currentLikes) - 2 : parseInt(currentLikes) - 1,
          dislikedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          likedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
        });
      }
    }
    
  });
} else {
  alert(needToLogInMessage)
}
}


// beta version of the notification system

// function sendLikeNotification(post){
//        const docRef = post;
       
//        docRef.get().then((doc) => {
//         if(doc.exists){
//           const originalPoster = doc.data().userID;
//           const thePost = doc.data().formSubmissionID;
//           const userRef = db.collection("users").doc(originalPoster)
//           userRef.update({
//             notifications: firebase.firestore.arrayUnion(thePost + "has been liked")
//           })
        
//         }
//        })
// }


