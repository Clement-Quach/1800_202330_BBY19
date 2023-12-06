document.addEventListener('DOMContentLoaded', () => {
  const db = firebase.firestore();
  const auth = firebase.auth(); // Firebase authentication instance
  const documentSubmissionID = localStorage.getItem('documentSubmissionID');

  // Listen for changes in authentication state
  auth.onAuthStateChanged((user) => {
    if (user) {
      const postRef = db.collection('discussionSubmissions').doc(documentSubmissionID);

      postRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          const userID = userData.userID; // Assuming the userID is stored within the userData

          // Fetch the user's data using the userID
          db.collection('users').doc(userID).get().then((userDoc) => {
            if (userDoc.exists) {

              const dateObject = userData.timestamp.toDate();
              
              // Extracting date components
              const year = dateObject.getFullYear();
              const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
              const day = dateObject.getDate().toString().padStart(2, '0');

              // Extracting time components
              const hours = dateObject.getHours().toString().padStart(2, '0');
              const minutes = dateObject.getMinutes().toString().padStart(2, '0');

              const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

              const action = document.getElementById('action');
              const concern = document.getElementById('concern');
              const city = document.getElementById('city');

              // Populating HTML elements with fetched data
              const titleElement = document.getElementById('title');
              const userInfoElement = document.getElementById('userInfo');
              const discussionElement = document.getElementById('discussion');
              const postProfilePicElement = document.getElementById('postProfilePic');
              const postImageElement = document.getElementById('postImage');
              const postTime = document.getElementById('timestamp');

              titleElement.textContent = userData.title;
              userInfoElement.textContent = userData.name;
              discussionElement.textContent = userData.details;
              postTime.textContent = formattedDateTime;

              if (userData.action == "Removed") {
                action.textContent = userData.action;
                city.style.display = "none";
                concern.style.display = "none";
              } else {
                action.textContent = userData.action;
                concern.textContent = userData.concern;
                city.textContent = userData.location;
              }

              // Check if profilePic exists before setting the attribute
              if (userData.action == "Removed") {
                postProfilePicElement.setAttribute('src', './images/profile-icon.png');
              } else if (profilePic) {
                postProfilePicElement.setAttribute('src', profilePic);
              } else {
                // If no profile pic is available, set a default image
                postProfilePicElement.setAttribute('src', './images/profile-icon.png');
              }

              if (userData.image) {
                postImageElement.src = userData.image;
                postImageElement.style.display = 'block'; // or 'inline' depending on the element type
                document.getElementById('postImageHere').style.display = 'block';
              } else {
                postImageElement.style.display = 'none';
                document.getElementById('postImageHere').style.display = 'none';
              }
            } else {
              console.error('User document does not exist');
            }
          }).catch((error) => {
            console.error('Error fetching user document: ', error);
          });
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


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    const currentUser = db.collection("users").doc(user.uid);

    currentUser.get().then((userDoc) => {
      if (userDoc.exists) {
        const commentProfilePicElement = document.getElementById('commentProfilePic');
        const commentNameElement = document.getElementById('commentName');

        const userData = userDoc.data();
        const profilePic = userData.profilePic;
        const displayName = userData.name;

        commentProfilePicElement.set('src', profilePic || './images/defaultProfilePic.jpg');
        commentNameElement.textContent = displayName;
      } else {
        console.error('User document does not exist');
      }
    }).catch((error) => {
      console.error('Error fetching user document: ', error);
    });
  } else {
    console.error('User is not logged in');
  }
});


function postComment() {
  const commentInput = document.getElementById('commentInput');
  const comment = commentInput.value; // Get the comment text from the textarea

  // Get the discussion submission ID from localStorage
  const documentSubmissionID = localStorage.getItem('documentSubmissionID');
  var warningMessage = document.getElementById('warning-message');

  firebase.auth().onAuthStateChanged((user) => {
    if (user && comment && documentSubmissionID) {
      warningMessage.style.display = 'none';
      const db = firebase.firestore();
      const discussionRef = db.collection('discussionSubmissions').doc(documentSubmissionID);
      const userRef = db.collection('users').doc(user.uid);
      const Timestamp = firebase.firestore.Timestamp;

      const createdAt = Timestamp.now();

      const commentID = db.collection('discussionSubmissions').doc().id;

      // Update the 'comments' field in the 'discussionSubmissions' document
      discussionRef.update({
        commentNotif: true,
        comments: firebase.firestore.FieldValue.arrayUnion({
          commentID: commentID,
          userID: user.uid,
          createdAt: createdAt,
          commentText: comment
        })
      })
        .then(() => {
          // Add the comment reference to the user's document in 'users' collection
          userRef.update({
            comments: firebase.firestore.FieldValue.arrayUnion({
              documentSubmissionID: documentSubmissionID,
              commentTimestamp: createdAt,
              commentID: commentID,
            })
          })
            .then(() => {
              console.log('Comment reference saved for the user');
              // Clear the textarea after posting the comment
              commentInput.value = ''; // Clear the textarea
            })
            .catch((error) => {
              console.error('Error saving comment reference for the user: ', error);
            });
        })
        .catch((error) => {
          console.error('Error posting comment: ', error);
        });
    } else {
      console.error('Comment, documentSubmissionID, or user is missing');
      warningMessage.style.opacity = '1';

      // Set another timeout to fade out the element after three seconds
      setTimeout(function () {
        warningMessage.style.opacity = '0';
      }, 2000);
    }
  });
}

function getUserInfo(userID) {
  const db = firebase.firestore();
  const userRef = db.collection('users').doc(userID);

  return userRef.get().then((doc) => {
    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  }).catch((error) => {
    console.error('Error getting user document:', error);
    return null;
  });
}

async function editComment(documentSubmissionID, commentID) {
  const commentElement = document.getElementById(`comment_${commentID}`);
  if (commentElement) {
    const commentText = commentElement.textContent.trim();

    const newCommentText = prompt('Edit your comment:', commentText);
    if (newCommentText !== null) {
      // Update the comment in the database with the new text
      try {
        const db = firebase.firestore();
        const discussionRef = db.collection('discussionSubmissions').doc(documentSubmissionID);

        // Retrieve the current comments
        const discussionDoc = await discussionRef.get();
        if (discussionDoc.exists) {
          const comments = discussionDoc.data().comments || [];
          const updatedComments = comments.map(comment => {
            if (comment.commentID === commentID) {
              return { ...comment, commentText: newCommentText };
            }
            return comment;
          });

          // Update the Firestore document with the modified comments array
          await discussionRef.update({ comments: updatedComments });
          console.log('Comment updated successfully!');
        } else {
          console.error('Discussion document does not exist.');
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    } else {
      console.log('Editing canceled');
    }
  } else {
    console.error('Comment element not found.');
  }
}

async function deleteComment(documentSubmissionID, commentID) {
  displayDeleteConfirmationModal(documentSubmissionID, commentID);
}

function displayDeleteConfirmationModal(documentSubmissionID, commentID) {
  const modal = document.getElementById('confirmationModal');
  $('#confirmationModal').modal('show');

  // Action on confirm delete
  $('#confirmDelete').on('click', function () {
    confirmDelete(documentSubmissionID, commentID);
    $('#confirmationModal').modal('hide');
  });

  // Action on cancel delete
  $('#cancelDelete').on('click', function () {
    $('#confirmationModal').modal('hide');
  });

  // Close the confirmation modal on outside click
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

async function confirmDelete(documentSubmissionID, commentID) {
  const db = firebase.firestore();
  const discussionRef = db.collection('discussionSubmissions').doc(documentSubmissionID);

  try {
    const discussionDoc = await discussionRef.get();
    if (discussionDoc.exists) {
      const comments = discussionDoc.data().comments || [];
      const updatedComments = comments.filter(comment => comment.commentID !== commentID);

      await discussionRef.update({ comments: updatedComments });
      console.log('Comment deleted successfully!');
      
      // Additionally, delete the comment reference from the user's document
      const user = firebase.auth().currentUser;
      if (user) {
        const userRef = db.collection('users').doc(user.uid);
        const userDoc = await userRef.get();
        
        if (userDoc.exists) {
          const userData = userDoc.data();
          const userComments = userData.comments || [];
          const updatedUserComments = userComments.filter(comment => comment.commentID !== commentID);
          
          await userRef.update({ comments: updatedUserComments });
          console.log('Comment reference deleted for the user');
        }
      }
    } else {
      console.error('Discussion document does not exist.');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
}


async function fetchCommentsAndDisplay() {
  const db = firebase.firestore();
  const documentSubmissionID = localStorage.getItem('documentSubmissionID');

  if (documentSubmissionID) {
    const discussionRef = db.collection('discussionSubmissions').doc(documentSubmissionID);

    try {
      // Listen for real-time updates to the comments array
      discussionRef.onSnapshot(async (doc) => {
        if (doc.exists) {
          const commentsData = doc.data().comments || [];
          let commentsHTML = '';

          for (const comment of commentsData) {
            try {
              const userData = await getUserInfo(comment.userID);

              commentsHTML += `
              <div class="commentContainer">
                <div class="commentsName">${userData?.name || 'Anonymous'}</div>
                <div class="commentsImage">
                  <img src="${userData?.profilePic || 'default_profile_image.jpg'}" alt="Profile Image">
                </div>
                <div class="commentText" id="comment_${comment.commentID}">
                  ${comment.commentText}
                </div>`;
              
            const user = firebase.auth().currentUser;
            if (user && user.uid === comment.userID) {
              commentsHTML += `
                <div class="commentActions">
                  <div class="options" id="options_${comment.commentID}">
                  <button onclick="editComment('${documentSubmissionID}', '${comment.commentID}', '${comment.commentText}')">Edit</button>
                  <button onclick="deleteComment('${documentSubmissionID}', '${comment.commentID}')">Delete</button>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16" onclick="toggleOptions('${comment.commentID}')">
                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                  </svg>
                </div>`;
            }
            
            commentsHTML += `</div>`;
            

            } catch (error) {
              console.error('Error fetching user information:', error);
            }
          }

          const container = document.getElementById('commentsContainer');
          container.innerHTML = commentsHTML;
        } else {
          console.log('No discussion found');
        }
      });
    } catch (error) {
      console.error('Error fetching discussion document:', error);
    }
  } else {
    console.error('Document Submission ID not found');
  }
}

const commentInput = document.querySelector('commentInput');
const commentSection = document.getElementById('make-comment');




function toggleOptions(commentID) {
  const options = document.getElementById(`options_${commentID}`);
  options.classList.toggle('show-options');
}


// Get the edit modal
const editModal = document.getElementById('editModal');
const editCommentInput = document.getElementById('editCommentInput');
const confirmEditBtn = document.getElementById('confirmEdit');
const cancelEditBtn = document.getElementById('cancelEdit');

// Function to display the edit modal with the existing comment text
function displayEditModal(commentText) {
  editCommentInput.value = commentText;
  $('#editModal').modal('show');
}

// Event listener for the Edit button in the comment
function editComment(documentSubmissionID, commentID, commentText) {
  displayEditModal(commentText);

  // When the user clicks "Save changes"
  confirmEditBtn.onclick = async () => {
    const newCommentText = editCommentInput.value;

    // Update the comment in Firebase Firestore with the new text
    try {
      const db = firebase.firestore();
      const discussionRef = db.collection('discussionSubmissions').doc(documentSubmissionID);
      const doc = await discussionRef.get();

      if (doc.exists) {
        const comments = doc.data().comments || [];
        const updatedComments = comments.map(comment => {
          if (comment.commentID === commentID) {
            return { ...comment, commentText: newCommentText };
          }
          return comment;
        });

        await discussionRef.update({ comments: updatedComments });
        console.log('Comment edited successfully!');
        $('#editModal').modal('hide');
      } else {
        console.error('Discussion document does not exist.');
      }
    } catch (error) {
      console.error('Error editing comment:', error);
    }
  };

  // When the user clicks "Cancel"
  cancelEditBtn.onclick = () => {
    editModal.style.display = 'none'; // Close the edit modal
  };
}

function goBack() {
  window.history.back();
}

var isScrolling;
var footer = document.getElementById('make-comment');

window.addEventListener('scroll', function() {
  clearTimeout(isScrolling);
  
  // Hide the footer
  footer.style.opacity = '0';

  isScrolling = setTimeout(function() {
      // Reappear the footer after a delay
      footer.style.opacity = '1';
  }, 600); // Adjust the timeout value based on your preference
});

// Call the function to fetch comment data and display comments
fetchCommentsAndDisplay();
