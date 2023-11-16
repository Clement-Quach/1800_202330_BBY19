var ticketsArray = [];

function generateTicketNumber(){
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZ";
    let nums = "0123456789";
    let string_length = 3;
    let number_length = 2;
    let randomstring = '';
    let randomnumber = '';
    for (let i=0; i<string_length; i++) {
        let rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    for (let i=0; i<number_length; i++) {
        let r = Math.floor(Math.random() * nums.length);
        randomnumber += nums.substring(r,r+1);
    }
    return  (randomstring + randomnumber);
}

function newTicket() {

    var createButton = document.getElementById("outerDiv");

    createButton.addEventListener("click", () => {
        createButton.classList.add("ticket-form-appear");
    })

    resetNewTicketDiv();
    let outerDiv = document.getElementById("outerDiv");
    outerDiv.className = 'container';   
    let div = document.createElement('div');
    div.className = 'jumbotron';
    div.style.backgroundColor = "#498FF0"; // Use backgroundColor to set the background color
    let form = document.createElement('form');
    form.id = 'newTicketForm';
    form.innerHTML = '<h1>Create a post</h1>'; // Close the h1 tag
    form.scrollIntoView();
    let divTitle = document.createElement('div');
    divTitle.className = 'form-group';
    let labelTitle = document.createElement('label');
    labelTitle.className = 'form-group';
    labelTitle.innerHTML = 'Title';
    labelTitle.htmlFor = 'ticketName'; // Use htmlFor to associate the label with the input
    let title = document.createElement("input");
    title.type = 'text';
    title.className = 'form-control';
    title.id = 'ticketName';

    const createPostButton = document.getElementById('createPostButton');
    if (createPostButton) {
        createPostButton.style.display = 'none';
    }
    
    let divLocation = document.createElement('div');
    divLocation.className = 'form-group';
    let labelLocation = document.createElement('label');
    labelLocation.innerHTML = 'Location';
    labelLocation.htmlFor = 'choseLocation';
    let selectLocation = document.createElement('select');
    selectLocation.id = 'choseLocation';
    selectLocation.className = 'form-control';
    let optionLocation1 = document.createElement('option');
    let optionLocation2 = document.createElement('option');
    let optionLocation3 = document.createElement('option');
    optionLocation1.value = 'Burnaby';
    optionLocation2.value = 'Vancouver';
    optionLocation3.value = 'Richmond';
    optionLocation1.innerHTML = 'Burnaby';
    optionLocation2.innerHTML = 'Vancouver';
    optionLocation3.innerHTML = 'Richmond';
    divLocation.appendChild(labelLocation);
    divLocation.appendChild(selectLocation);
    selectLocation.appendChild(optionLocation1);
    selectLocation.appendChild(optionLocation2);
    selectLocation.appendChild(optionLocation3);

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(title);

    let divConcern = document.createElement('div');
    divConcern.className = 'form-group';
    let labelConcern = document.createElement('label');
    labelConcern.innerHTML = 'Type of Concern';
    labelConcern.htmlFor = 'choseConcern';
    let select = document.createElement('select');
    select.id = 'choseConcern';
    select.className = 'form-control';
    let option = document.createElement('option');
    let option1 = document.createElement('option');
    let option2 = document.createElement('option');
    let option3 = document.createElement('option');
    let option4 = document.createElement('option');
    option.value = 'Street';
    option1.value = 'Safety';
    option3.value = 'Public Service';
    option4.value = 'Housing';
    option2.value = 'Emergency';
    option.innerHTML = 'Street';
    option1.innerHTML = 'Safety';
    option3.innerHTML = 'Public Service';
    option4.innerHTML = 'Housing';
    option2.innerHTML = 'Emergency';
    divConcern.appendChild(labelConcern);
    divConcern.appendChild(select);
    select.appendChild(option);
    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);
    select.appendChild(option4);

    let divMessage = document.createElement('div');
    divMessage.className = 'form-group';
    let labelMessage = document.createElement('label');
    labelMessage.innerHTML = 'Problem';
    labelMessage.htmlFor = 'inputText';
    let messageText = document.createElement('textarea');
    messageText.className = 'form-control';
    messageText.id = 'inputText';
    messageText.rows = '3';
    messageText.placeholder = 'Problem details';
    divMessage.appendChild(labelMessage);
    divMessage.appendChild(messageText);
    

    let divName = document.createElement('div');
    divName.className = 'form-group';
    let labelName = document.createElement('label');
    labelName.className = 'form-group';
    labelName.innerHTML = 'Name';
    labelName.htmlFor = 'name';
    let nameInput = document.createElement("input");
    nameInput.type = 'text';
    nameInput.className = 'form-control';
    nameInput.id = 'name';

    divName.appendChild(labelName);
    divName.appendChild(nameInput);

    let divImage = document.createElement('div');
    divImage.className = 'form-group';
    let labelImage = document.createElement('label');
    labelImage.innerHTML = 'Attach Image';
    let imageInput = document.createElement('input');
    imageInput.type = 'file';
    imageInput.id = 'imageAttachment';
    imageInput.className = 'form-control-file';

    divImage.appendChild(labelImage);
    divImage.appendChild(imageInput);

    let divStatus = document.createElement('div');
    divStatus.id = 'status';

    let divSubmit = document.createElement('button'); // Change 'div' to 'button'
    divSubmit.type = 'button';
    divSubmit.className = 'btn btn-success';
    divSubmit.innerHTML = 'SUBMIT';
    divSubmit.addEventListener("click", ticketSubmit);

    outerDiv.appendChild(div);
    div.appendChild(form);
    form.appendChild(divTitle);
    form.appendChild(divName);
    form.appendChild(divLocation);
    form.appendChild(divConcern);
    form.appendChild(divMessage);
    form.appendChild(divImage);
    form.appendChild(divSubmit);
    document.body.appendChild(outerDiv);
}

newTicket();

outerDiv.style.marginBottom = '5rem';
outerDiv.style.padding = '2rem';

function ticketSubmit() {
    // Get the current user ID
    const userID = firebase.auth().currentUser.uid;

    // Get the current timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Create a unique submission ID
    const submissionID = firebase.firestore().collection('discussionSubmissions').doc().id;

    let ticketDetails = {
        ticketNumber: generateTicketNumber(),
        title: document.getElementById("ticketName").value,
        concern: document.getElementById("choseConcern").value,
        details: document.getElementById("inputText").value,
        name: document.getElementById("name").value,
        action: 'New',
        userID: userID,
        timestamp: timestamp,
        documentSubmissionID: submissionID,
    };

    const newSubmissionRef = firebase.firestore().collection('discussionSubmissions').doc(submissionID);

    let imageInput = document.getElementById('imageAttachment').files[0];

    if (imageInput) {
        uploadPic(submissionID, imageInput)
            // .then(url => {
            //     // Perform additional operations after obtaining the download URL
            //     return someAdditionalOperation();
            // })
            .then(() => {
                // Update the collection to include "image" : url
                return newSubmissionRef.update({ image: url });
            })
            .then(() => {
                // Associate the documentSubmissionID with the user
                const userRef = firebase.firestore().collection('users').doc(userID);
                return userRef.update({
                    userSubmissions: firebase.firestore.FieldValue.arrayUnion(submissionID)
                });
            })
            .then(() => {
                // Display formatted time
                return newSubmissionRef.get(); // Fetch the document with the updated timestamp
            })
            .then(doc => {
                const formattedTime = formatTimestamp(doc.data().timestamp);
                console.log('Submission time:', formattedTime);

                window.location.href = "discussionThanks.html";
                // Reset the form
                resetNewTicketDiv();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    } else {
        // If no image is selected, proceed with other data
        newSubmissionRef.set(ticketDetails)
            .then(() => {
                // Associate the documentSubmissionID with the user
                const userRef = firebase.firestore().collection('users').doc(userID);
                return userRef.update({
                    userSubmissions: firebase.firestore.FieldValue.arrayUnion(submissionID)
                });
            })
            .then(() => {
                // Display formatted time
                return newSubmissionRef.get(); // Fetch the document with the original timestamp
            })
            .then(doc => {
                const formattedTime = formatTimestamp(doc.data().timestamp);
                console.log('Submission time:', formattedTime);

                window.location.href = "discussionThanks.html";
                // Reset the form
                resetNewTicketDiv();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }

    addRowToTable('ticketTable', ticketDetails);
}

// Function to format timestamp
function formatTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

// Modify the uploadPic function to accept the submissionID and imageInput
function uploadPic(submissionID, imageInput) {
    console.log("inside uploadPic " + submissionID);
    var storageRef = storage.ref("images/" + submissionID + ".jpg");

    return storageRef.put(imageInput)
        .then(() => {
            console.log('2. Uploaded to Cloud Storage.');
            return storageRef.getDownloadURL();
        })
        .then(url => {
            console.log("3. Got the download URL.");
            // Save the URL into discussionSubmissions collection
            return db.collection("discussionSubmissions").doc(submissionID).update({
                "image": url
            });
        })
        .then(() => {
            console.log('4. Added pic URL to Firestore.');
            // Return the download URL for further use in the ticketSubmit function
            return url;
        })
        .catch(error => {
            console.log("error uploading to cloud storage", error);
            throw error; // Rethrow the error to be caught in the ticketSubmit function
        });
}

// Add an event listener to the "SUBMIT" button to call the ticketSubmit function
document.addEventListener('DOMContentLoaded', function () {
    let divSubmit = document.querySelector('.btn-success');
    if (divSubmit) {
        divSubmit.addEventListener("click", ticketSubmit);
    }
});


function resetNewTicketDiv() {
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "";
    newOuterDiv.innerHTML = "";
}   