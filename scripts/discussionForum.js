document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have already initialized Firebase with your Firebase configuration.
    // This example uses the variable db to refer to your Firestore database.

    // Get a reference to the <a> element by its id
    const discussionLink = document.getElementById('discussion-lin');
    const detailsParagraph = document.getElementById('details-paragraph');
    const nameLink = document.getElementById('name-link');
    // Retrieve the title data from Firestore and update the link text
    db.collection('discussionSubmission')
      .doc('lrDvGJlhjxfiwZhTqLyk') // Replace 'yourDocumentId' with the actual document ID
      .get()
      .then((doc) => {
        if (doc.exists) {
          // Access the 'title' field from the document data
          const title = doc.data().title;
          const details = doc.data().details;
          const name = doc.data().name;

          // Update the text content of the <a> element with the fetched title
          discussionLink.textContent = title;
          discussionLink2.textContent = title;
          detailsParagraph.textContent = details;
          nameLink.textContent = name;
          
        } else {
          console.log("Document not found");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
});

