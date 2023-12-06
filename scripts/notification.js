
function fetchDataAndDisplay(userID) {
  const dataContainer = document.getElementById('dataContainer');
  dataContainer.innerHTML = "";

  // Retrieve form submission data from Firestore based on the user ID
  db.collection('discussionSubmissions')
      .where('userID', '==', userID)
      .where('commentNotif', '==', true)
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

        // Convert milliseconds to days
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

        var status = "New Comment";
        // Check if 24 hours have passed

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
              <button type="button" id="save-button" class="btn btn-primary" onclick="markAsRead('${doc.id}')">Mark as Read</button>
            </div>
          </div>
          `;
        } else if (data.image) {
        dataElement.innerHTML = `
        <div class="card-header">
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
            <button type="button" id="save-button" class="btn btn-primary" onclick="markAsRead('${doc.id}')">Mark as Read</button>
          </div>
        </div>
        `;
        } else {
          dataElement.innerHTML = `
          <div class="card-header">
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
              <button type="button" id="save-button" class="btn btn-primary" onclick="markAsRead('${doc.id}')">Mark as Read</button>
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


function markAsRead(inputId) {
  // var up = document.getElementById('upvote');

  // toggleFontVariation(up);
  console.log("before if")

  const docRef = db.collection("discussionSubmissions").doc(inputId);

  docRef.get().then((doc) => {
    if (doc.exists) {
        // If previously liked and now unliking
        docRef
          .update({
            commentNotif: false,
            likeNotif: false,
          })
          .then(() => {
            console.log("Document successfully updated!");
          }).then(() => {
            location.reload();
          });

}})}