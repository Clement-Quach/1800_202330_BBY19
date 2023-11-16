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

        const time = data.timestamp;

        dataElement.innerHTML = `
          <div class="card-header">
          </div>
          <div class="card-body">
            <span class="tag tag-teal" id="title">${data.action}</span>
            <h4 id="details">${data.title}</h4>
            <p>${data.details}</p>
            <div class="user">
              <div class="user-info">
                <h5 id="name">${data.name}</h5>
                <small id="timestamp">${time.toDate()}</small>
              </div>
              <div>
              <span id="likeCount">Likes: ${data.likes || 0}</span>
              <div>
              <button onclick="likePost('${doc.id}', '${data.likes || 0}')">Like</button>
              <button onclick="DislikePost('${doc.id}', '${data.likes || 0}')">Dislike</button>
             
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
fetchDataAndDisplay();
                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.id)



function likePost(docId, currentLikes) {
    const dataContainer = document.getElementById('dataContainer');
                        //enter code here
                    
                        const userID = firebase.auth().currentUser.uid;
                        //a) get user entered values
                        const userName = firebase.firestore().collection('users').doc(userID);
                        const docRef = db.collection('discussionSubmissions').doc(docId);
                        docRef.get().then((doc) =>

                        {if (doc.exists){
                          const arrValue = doc.data().likedBy;
                          console.log(arrValue)

                          if( !(arrValue.includes(userID)))
                          docRef.update({

                            likes: parseInt(currentLikes) +1,
                            likedBy: firebase.firestore.FieldValue.arrayUnion(userID),
                           
                        
                        }) .then(() => {
                          console.log("Document successfully updated!");
                          })


                        }
                        
                        
                        }
                        
                        )

                      
                      //   db.collection('discussionSubmissions').doc(docId).update({
                          
                      //       likes: parseInt(currentLikes) +1,
                      //       likedBy: firebase.firestore.FieldValue.arrayUnion(userID),
                           
                        
                      //   }) .then(() => {
                      //     console.log("Document successfully updated!");
                          
                      // })}
                      
function DislikePost(docId, currentLikes) {
  const dataContainer = document.getElementById('dataContainer');
                      //enter code here
                  
                      const userID = firebase.auth().currentUser.uid;
                      //a) get user entered values
                      const userName = firebase.firestore().collection('users').doc(userID);



                      db.collection('discussionSubmissions').doc(docId).update({
                        
                          likes: parseInt(currentLikes) -1,
                          likedBy: firebase.firestore.FieldValue.arrayUnion(userName),
                         
                      
                      }) .then(() => {
                        console.log("Document successfully updated!");
                    })}
                   
                     
                    
                  }