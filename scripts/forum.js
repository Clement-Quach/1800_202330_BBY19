var likeCount;

var sortSelect = document.getElementById('sort-type');


function fetchDataAndDisplay(sort, order) {

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

        // Formatting the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

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

        likeCount = data.likes || 0;

        if (data.image) {
          dataElement.innerHTML = `
          <div class="card-header">
            <span class="tag tag-teal" id="title">${status}</span>
            <span class="tag tag-purple" id="title">${data.concern}</span>
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
              <span id="upvote" class="material-symbols-outlined" onclick="likePost('${
                doc.id
              }', '${likeCount}')">arrow_circle_up</span>
              <span id="like-number">${likeCount}</span>
              <span id="downvote" class="material-symbols-outlined" onclick="DislikePost('${doc.id}', '${
                likeCount
                }')">arrow_circle_down</span>
            </div>
          </div>
        `;
        } else {
          dataElement.innerHTML = `
          <div class="card-header">
            <span class="tag tag-teal" id="title">${status}</span>
            <span class="tag tag-purple" id="title">${data.concern}</span>
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
              <p id="likeCount">Likes: <span id="like-number">${likeCount}</span></p>
              <button id="like-image" onclick="likePost('${
                doc.id
              }', '${likeCount}')">Like</button>
              <button onclick="DislikePost('${doc.id}', '${
                likeCount
                }')">Dislike</button>
            </div>
          </div>
        `;
        }
        dataContainer.appendChild(dataElement);
      });
    }, (error) => {
      console.error("Error reading Firestore data:", error);
    });
}

sortSelect.addEventListener("change", function() {
  localStorage.setItem('dropdownValue', this.value);
  changeSort(this.value);
});


function changeSort(sortType) {
  dataContainer.innerHTML = "";
  
  setTimeout(function() {
    window.location.href = "loading.html";
  }, 100);
}

function runPage() {
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
  }

  fetchDataAndDisplay(sort, order);
}

runPage();



//go to the correct user document by referencing to the user uid
firebase.auth().onAuthStateChanged((user) => {
  // Check if user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.id);
  }
});

function likePost(docId, currentLikes) {

  var up = document.getElementById('upvote');

  toggleFontVariation(up);

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
        });
      }
    }
  });
  //   db.collection('discussionSubmissions').doc(docId).update({

  //       likes: parseInt(currentLikes) +1,
  //       likedBy: firebase.firestore.FieldValue.arrayUnion(userID),

  //   }) .then(() => {
  //     console.log("Document successfully updated!");

  // })}
}


function DislikePost(docId, currentLikes) {

  var down = document.getElementById('downvote');

  toggleFontVariation(down);

  const userID = firebase.auth().currentUser.uid;
  const docRef = db.collection("discussionSubmissions").doc(docId);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const arrValue = doc.data().dislikedBy;
      console.log(arrValue);

      if (!arrValue.includes(userID)) {
        docRef
          .update({
            likes: parseInt(currentLikes) - 1,
            dislikedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          })
          .then(() => {
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
}





var isClicked = false;

function toggleFontVariation(id) {
  // Get the element by its class name
  var element = id

  // Toggle the state and change the 'FILL' value accordingly
  isClicked = !isClicked;

  if (isClicked) {
    element.style.fontVariationSettings = "'FILL' 50, 'wght' 500, 'GRAD' 0, 'opsz' 30";
  } else {
    element.style.fontVariationSettings = "'FILL' 0, 'wght' 500, 'GRAD' 0, 'opsz' 30";
  }
}