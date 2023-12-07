var currentUser;
var likeButton;
var dislikeButton;

var sortSelect = document.getElementById('sort-type');

firebase.auth().onAuthStateChanged((user) => {
  // Check if user is signed in:
  if (user) {
    //go to the correct user document by referencing to the user uid
    currentUser = db.collection("users").doc(user.uid);
    console.log(user.uid);
    // Fetch user's liked and disliked posts
    currentUser.get().then((userDoc) => {
      const likedPosts = (userDoc.data() && userDoc.data().liked) || [];
      const dislikedPosts = (userDoc.data() && userDoc.data().disliked) || [];
      

      // Call the function to fetch and display data with the user's liked and disliked posts
      runPage(likedPosts, dislikedPosts);
    });
  }
});

function fetchDataAndDisplay(sort, order, userLikedPosts, userDislikedPosts) {

  const dataContainer = document.getElementById("dataContainer");

  // Clear previous data before re-rendering
  dataContainer.innerHTML = "";

  // Set up a real-time listener on the 'discussionSubmissions' collection
  db.collection("discussionSubmissions")
    .orderBy(sort, order)
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

        const currentDate = new Date();

        const timeDifference = currentDate - dateObject;

        // Convert milliseconds to hours
        const hoursDifference = timeDifference / (1000 * 60 * 60);

        // Convert milliseconds to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        var status;
        // Check if 24 hours have passed
        if (daysDifference > 3) {
          status = "Past";
        }
        else if (hoursDifference >= 24) {
            status = "Recent";
        } else {
            status = data.action;
        }

        // Formatting the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
        if (status === "Removed") {
          dataElement.innerHTML = `
          <div class="card-header">
            <span class="tag tag-teal" id="title">${status}</span>
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
            </div>
          </div>
          `;
        } else if (data.image) {
          dataElement.innerHTML = `
          <div class="card-header" id="tags">
            <span class="tag tag-teal" id="title">${status}</span>
            <span class="tag tag-purple" id="title">${data.concern}</span>
            <span class="tag tag-pink" id="title">${data.location}</span>
          </div>
          <div class="card-body">
            <div class="user">
              <h1 id="details">${data.title}</h1>
              <small id="timestamp">${formattedDateTime}</small>
              <h5 id="name">${data.name}</h5>
            </div>
            <div class="card-details">
              <div class="card-image" id="post-image">
                <img src="${data.image}" alt="${data.title}" />
              </div> 
              <p>${data.details}</p>
            </div>
            <div id="like-section">
            <button class="like">Upvote</button>
              <h5 id="likeCount"><span id="like-number">${data.likes || 0}</span></h5>
              <button class="dislike">Downvote</button>
            </div>
          </div>
        `;
        } else {
          dataElement.innerHTML = `
          <div class="card-header" id="tags">
            <span class="tag tag-teal" id="title">${status}</span>
            <span class="tag tag-purple" id="title">${data.concern}</span>
            <span class="tag tag-pink" id="title">${data.location}</span>
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
              <button class="like">Upvote</button>
              <h5 id="likeCount"><span id="like-number">${data.likes || 0}</span></h5>
              <button class="dislike">Downvote</button>
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

        if (dataElement.querySelector(".like") != null && dataElement.querySelector(".dislike") != null) {
          const likeButton = dataElement.querySelector(".like");
          const dislikeButton = dataElement.querySelector(".dislike");
          const docId = doc.id;
          const likeSection = dataElement.querySelector("#like-section"); // Get the like-section div

          if (likeSection) {
          likeButton.id = `like-${docId}`;
          dislikeButton.id = `dislike-${docId}`;
          }
        
        
          

          // Check if the post is liked by the user
          if (userLikedPosts.includes(docId)) {
            console.log("like");
            likeButton.classList.add("liked");
          }

          // Check if the post is disliked by the user
          if (userDislikedPosts.includes(docId)) {
            console.log("dislike");
            dislikeButton.classList.add("disliked");
          }

          // Check if the elements exist before adding event listeners
          // Add event listeners to the like and dislike buttons
          likeButton.onclick = () => {
            likePost(docId, data.likes || 0);
          }
          dislikeButton.onclick = () => DislikePost(docId, data.likes || 0);
        }

        dataContainer.appendChild(dataElement);
      });
    }, (error) => {
      console.error("Error reading Firestore data:", error);
    });
}

//call changeSort() every time the user changes the value in the dropdown list
sortSelect.addEventListener("change", function() {
  localStorage.setItem('dropdownValue', this.value);
  changeSort();
});

//when the user changes the value, it directs them to the loading page
function changeSort() {
  dataContainer.innerHTML = "";
  
  setTimeout(function() {
    window.location.href = "loading.html";
  }, 100);
}

//change the sort and order variable when the value has changed
function runPage(likedPosts, dislikedPosts) {
  var sort;
  var order;

  if (localStorage.getItem('dropdownValue')) {
    sortSelect.value = localStorage.getItem('dropdownValue');
    var sortType = localStorage.getItem('dropdownValue');
  }

  if (sortType == 'New') {
    sort = "timestamp";
    order = "desc";
  } else if (sortType == 'Old') {
    sort = "timestamp";
    order = "asc";
  } else if (sortType == 'Concern') {
    sort = "concern";
    order = "asc";
  } else if (sortType == 'Likes') {
    sort = "likes";
    order = "desc";
  } else if (sortType == 'City') {
    sort = "location";
    order = "asc";
  }

  fetchDataAndDisplay(sort, order, likedPosts, dislikedPosts);
}

function likePost(docId, currentLikes) {
  const userID = firebase.auth().currentUser.uid;
  const docRef = db.collection("discussionSubmissions").doc(docId);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const likedBy = doc.data().likedBy || [];
      const dislikedBy = doc.data().dislikedBy || [];

      if (likedBy.includes(userID)) {
        // If previously liked and now unliking
        docRef.update({
          likes: parseInt(currentLikes) - 1,
          likedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
          // Remove "liked" class from like button
          // Set background color to default
          const likeButton = document.getElementById(`like-${docId}`);
          if (likeButton) {
            likeButton.classList.remove("liked");
            likeButton.style.backgroundColor = ''; // Set the default background color
          }

          // Remove from user's liked posts
          currentUser.update({
            liked: firebase.firestore.FieldValue.arrayRemove(docId),
          });
        });
      } else {
        // If not previously liked or changing from dislike to like
        docRef.update({
          likes: dislikedBy.includes(userID) ? parseInt(currentLikes) + 2 : parseInt(currentLikes) + 1,
          likedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          dislikedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
          // Add "liked" class to like button
          // Change background color
          const likeButton = document.getElementById(`like-${docId}`);
          if (likeButton) {
            likeButton.classList.add("liked");
            likeButton.style.backgroundColor = '#878484'; // Change to desired color when liked
          }

          // Remove "disliked" class from dislike button
          const dislikeButton = document.getElementById(`dislike-${docId}`);
          if (dislikeButton) {
            dislikeButton.classList.remove("disliked");
            dislikeButton.style.backgroundColor = ''; // Set the default background color
          }

          // Add to user's liked posts and remove from disliked posts
          currentUser.update({
            liked: firebase.firestore.FieldValue.arrayUnion(docId),
            disliked: firebase.firestore.FieldValue.arrayRemove(docId)
          });
        });
      }
    }
  });
}

function DislikePost(docId, currentLikes) {
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
          // Remove "disliked" class from dislike button
          // Set background color to default
          const dislikeButton = document.getElementById(`dislike-${docId}`);
          if (dislikeButton) {
            dislikeButton.classList.remove("disliked");
            dislikeButton.style.backgroundColor = ''; // Set the default background color
          }

          // Remove from user's disliked posts
          currentUser.update({
            disliked: firebase.firestore.FieldValue.arrayRemove(docId),
          });
        });
      } else {
        // If not previously disliked or changing from like to dislike
        docRef.update({
          likes: likedBy.includes(userID) ? parseInt(currentLikes) - 2 : parseInt(currentLikes) - 1,
          dislikedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          likedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        }).then(() => {
          console.log("Document successfully updated!");
          // Add "disliked" class to dislike button
          // Change background color
          const dislikeButton = document.getElementById(`dislike-${docId}`);
          if (dislikeButton) {
            dislikeButton.classList.add("disliked");
            dislikeButton.style.backgroundColor = '#878484'; // Change to desired color when disliked
          }

          // Remove "liked" class from like button
          const likeButton = document.getElementById(`like-${docId}`);
          if (likeButton) {
            likeButton.classList.remove("liked");
            likeButton.style.backgroundColor = ''; // Set the default background color
          }

          // Add to user's disliked posts and remove from liked posts
          currentUser.update({
            disliked: firebase.firestore.FieldValue.arrayUnion(docId),
            liked: firebase.firestore.FieldValue.arrayRemove(docId)
          });
        });
      }
    }
  });
}

