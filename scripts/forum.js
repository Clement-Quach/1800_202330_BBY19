function fetchDataAndDisplay() {
  const dataContainer = document.getElementById('dataContainer');

  db.collection('discussionSubmissions')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Create HTML elements based on the data
        const dataElement = document.createElement('div');
        dataElement.className = 'card';

        dataElement.innerHTML = `
          <div class="card-body">
            <span class="tag tag-teal" id="title">${data.action}</span>
            <h4 id="details">${data.title}</h4>
            <p>${data.details}</p>
            <div class="user">
              <div class="user-info">
                <h5 id="name">${data.name}</h5>
                <small id="timestamp">${data.timestamp.toDate()}</small>
                <button onclick="likePost('${doc.id}', '${data.likes || 0}')">Like</button>
                <span id="likeCount">Likes: ${data.likes || 0}</span>
              </div>
            </div>
          </div>
        `;

        // Append the HTML to the container
        dataContainer.appendChild(dataElement);
      });
    })
    .catch((error) => {
      console.error('Error reading Firestore data:', error);
    });
}
// document.getElementById('fetchDataButton').addEventListener('click', fetchDataAndDisplay);

function likePost(docId, currentLikes) {
  const dataContainer = document.getElementById('dataContainer');
    //enter code here

    const userID = firebase.auth().currentUser.uid;
    //a) get user entered values
    const userName = firebase.firestore().collection('users').doc(userID);

    db.collection('discussionSubmissions').doc(docId).update({
      likes: parseInt(currentLikes) +1,
      likedBy: firebase.firestore.FieldValue.arrayUnion(userName),
    })
  .then(() => {
      console.log("Document successfully updated!");
  })

}
fetchDataAndDisplay();
// Below is the image header and user image for dataElement.innerHTML

{/* <div class="card-header">
<img src="${data.imageURL}" alt="${data.title}" />
</div> */}

{/* <img src="${data.userImage}" alt="user" /> */}