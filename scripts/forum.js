var likeCount;

function fetchDataAndDisplay() {
  const dataContainer = document.getElementById("dataContainer");

  db.collection("discussionSubmissions")
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Create HTML elements based on the data
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

        var status;
        // Check if 24 hours have passed
        if (hoursDifference >= 24) {
            status = "Previous"
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
              <h3 id="likeCount">Likes: <span id="like-number">${likeCount}</span></h3>
              <button id="like-image" onclick="likePost('${
                doc.id
              }', '${likeCount}')">Like</button>
              <button onclick="DislikePost('${doc.id}', '${
                likeCount
                }')">Dislike</button>
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
              <h3 id="likeCount">Likes: <span id="like-number">${likeCount}</span></h3>
              <button id="like-image" onclick="likePost('${
                doc.id
              }', '${data.likes || 0}')">Like</button>
              <button onclick="DislikePost('${doc.id}', '${
                likeCount
              }')">Dislike</button>
            </div>
          </div>
          `;
        }

        // Append the HTML to the container
        dataContainer.appendChild(dataElement);
      });
    })
    .catch((error) => {
      console.error("Error reading Firestore data:", error);
    });
}

fetchDataAndDisplay();
//go to the correct user document by referencing to the user uid
firebase.auth().onAuthStateChanged((user) => {
  // Check if user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.id);
  }
});

function likePost(docId, currentLikes) {
  const dataContainer = document.getElementById("dataContainer");
  //enter code here

  const userID = firebase.auth().currentUser.uid;
  //a) get user entered values
  const userName = firebase.firestore().collection("users").doc(userID);
  const docRef = db.collection("discussionSubmissions").doc(docId);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const arrValue = doc.data().likedBy;
      console.log(arrValue);

      if (!arrValue.includes(userID)) {
        docRef
          .update({
            likes: parseInt(currentLikes) + 1,
            likedBy: firebase.firestore.FieldValue.arrayUnion(userID),
          })
          .then(() => {
            document.getElementById("like-number").innerHTML = parseInt(currentLikes) + 1;
            console.log("Document successfully updated!");
          });
      } else {
        docRef.update({
          likes: parseInt(currentLikes) - 1,
          likedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        })
        .then(() => {
          document.getElementById("like-number").innerHTML = parseInt(currentLikes) - 1;
          console.log("Document successfully updated!");
        })
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
  const dataContainer = document.getElementById("dataContainer");
  //enter code here

  const userID = firebase.auth().currentUser.uid;
  //a) get user entered values
  const userName = firebase.firestore().collection("users").doc(userID);
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
        docRef.update({
          likes: parseInt(currentLikes) + 1,
          dislikedBy: firebase.firestore.FieldValue.arrayRemove(userID),
        });
      }
    }
  });
}
