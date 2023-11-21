function fetchDataAndDisplay(userID) {
  const dataContainer = document.getElementById('dataContainer');

  // Retrieve form submission data from Firestore based on the user ID
  db.collection('discussionSubmissions')
      .where('userID', '==', userID) // Add this line to filter by user ID
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Create HTML elements based on the data
        const dataElement = document.createElement('div');
        dataElement.className = 'card';

        const time = data.timestamp;

        const dateObject = time.toDate();

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

        var status;
        // Check if 24 hours have passed
        if (hoursDifference >= 24) {
            status = "Previous"
        } else {
            status = data.action;
        }
        // Formatting the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

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
              <h3 id="likeCount">Likes: <span id="like-number">${data.likes || 0}</span></h3>
              <button id="like-image" class="btn btn-primary" onclick="likePost('${
                doc.id
              }', '${data.likes || 0}')">Like</button>
              <button class="btn btn-danger" onclick="DislikePost('${doc.id}', '${
              data.likes || 0
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


        // Append the HTML to the container
        dataContainer.appendChild(dataElement);
      });
    })
    .catch((error) => {
      console.error('Error reading Firestore data:', error);
    });

}

firebase.auth().onAuthStateChanged(user => {
  // Check if user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.id)
  }
  const userID = firebase.auth().currentUser.uid;
  console.log(userID);
  // Call the function with the user ID
  fetchDataAndDisplay(userID);
});



//go to the correct user document by referencing to the user uid
// currentUser = db.collection("users").doc(user.id);





function likePost(docId, currentLikes) {
  const dataContainer = document.getElementById('dataContainer');
  //enter code here

  const userID = firebase.auth().currentUser.uid;
  //a) get user entered values
  const userName = firebase.firestore().collection('users').doc(userID);
  const docRef = db.collection('discussionSubmissions').doc(docId);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const arrValue = doc.data().likedBy;
      console.log(arrValue)

      if (!(arrValue.includes(userID))) {
        var currentNumber = parseInt(currentLikes) + 1;
        docRef.update({

          likes: currentNumber,
          likedBy: firebase.firestore.FieldValue.arrayUnion(userID),


        }).then(() => {
          // var numberDisplay = document.getElementById("like-number");
          // numberDisplay.textContent = currentNumber;
          console.log("Document successfully updated!");
        })

      } else {
        var currentNumber = parseInt(currentLikes) - 1;
        docRef.update({

          likes: currentNumber,
          likedBy: firebase.firestore.FieldValue.arrayRemove(userID),

        }).then(() => {
          // var numberDisplay = document.getElementById("like-number");
          // numberDisplay.textContent = currentNumber;
          console.log("Document successfully updated!");
        })

      }
    }
  }

  )


  //   db.collection('discussionSubmissions').doc(docId).update({

  //       likes: parseInt(currentLikes) +1,
  //       likedBy: firebase.firestore.FieldValue.arrayUnion(userID),


  //   }) .then(() => {
  //     console.log("Document successfully updated!");

  // })}
}
function DislikePost(docId, currentLikes) {
  const dataContainer = document.getElementById('dataContainer');
  //enter code here

  const userID = firebase.auth().currentUser.uid;
  //a) get user entered values
  const userName = firebase.firestore().collection('users').doc(userID);
  const docRef = db.collection('discussionSubmissions').doc(docId);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const arrValue = doc.data().dislikedBy;
      console.log(arrValue)

      if (!(arrValue.includes(userID))) {
        docRef.update({

          likes: parseInt(currentLikes) - 1,
          dislikedBy: firebase.firestore.FieldValue.arrayUnion(userID),


        }).then(() => {
          console.log("Document successfully updated!");
        })

      } else {
        docRef.update({
          likes: parseInt(currentLikes) + 1,
          dislikedBy: firebase.firestore.FieldValue.arrayRemove(userID),

        })

      }
    }



  })
}