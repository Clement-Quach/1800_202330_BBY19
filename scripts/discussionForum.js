// document.addEventListener('DOMContentLoaded', function () {
//     // Assuming you have already initialized Firebase with your Firebase configuration.
//     // This example uses the variable db to refer to your Firestore database.

//     // Get a reference to the <a> element by its id
//     const discussionLink = document.getElementById('discussion-link');
//     const detailsParagraph = document.getElementById('details-paragraph');
//     const nameLink = document.getElementById('name-link');
//     // Retrieve the title data from Firestore and update the link text
//     firebase.auth().onAuthStateChanged(users => {
//       db.collection('discussionSubmission')
//       .doc('GLtSrHMDMRGpxRVdaRB') // Replace 'yourDocumentId' with the actual document ID
//       .get()
//       .then((doc) => {
//         if (doc.exists) {
//           // Access the 'title' field from the document data
//           const title = doc.data().title;
//           const details = doc.data().details;
//           const name = doc.data().name;

//           // Update the text content of the <a> element with the fetched title
//           discussionLink.textContent = title;
//           detailsParagraph.textContent = details;
//           nameLink.textContent = name;
          
//         } else {
//           console.log("Document not found");
//         }
//       })
//       .catch((error) => {
//         console.error("Error getting document:", error);
//       });
//     });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   let cardTemplate = document.getElementById("cardTemplate");

//   // Retrieve form submission data from Firestore
//   db.collection('formSubmissions').get()
//       .then(querySnapshot => {
//           querySnapshot.forEach(doc => {
//             const name = doc.data().name;
//             const title = doc.data().title;
//             const action = doc.data().action;
//             const details = doc.data().details;
//             const concern = doc.data().concern;
//             const tickNumber = doc.data().tickNumber;
//             let newcard = cardTemplate.content.cloneNode(true);
            
//             document.getElementById('.text-body').innerHTML = name;
              


//           });
//       })
//       .catch(error => {
//           console.error('Error retrieving data from Firestore: ', error);
//       });
// });


const discussionContainer = document.getElementById('discussionContainer');
const discussionRef = ref(db, 'discussionSubmission');

discussionRef.once('value')
  .then(snapshot => {
    snapshot.forEach(childSnapshot => {
      const discussionData = childSnapshot.val();
      const discussionHtml = createDiscussionHtml(discussionData);
      discussionContainer.innerHTML += discussionHtml;
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function createDiscussionHtml(data) {
  return `
    <div class="card mb-2">
      <div class="card-body p-2 p-sm-3">
        <div class="media forum-item">
          <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="mr-3 rounded-circle" width="50" alt="User" /></a>
          <div class="media-body">
            <h6><a id="discussion-link" href="#" data-toggle="collapse" data-target=".forum-content" class="text-body">${data.title}</a></h6>
            <a href="javascript:void(0)" class="text-secondary" id="name-link">${data.name}</a>
            <small class="text-muted ml-2">1 hour ago</small>
            <div class="mt-3 font-size-sm">
              <p class="text-secondary" id="details-paragraph">${data.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

