const previewImage = (event) => {
    const imageFiles = event.target.files;
    const imageFilesLength = imageFiles.length;
    if (imageFilesLength > 0) {
        const imageSrc = URL.createObjectURL(imageFiles[0]);
        const imagePreviewElement = document.querySelector("#preview-selected-image");
        imagePreviewElement.src = imageSrc;
        imagePreviewElement.style.display = "block";
    }
};
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
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid);
            //get the document for current user.
            currentUser.get().then(userDoc => {
                    //get the data fields of the user

                    var userName = userDoc.data().name;
                    nameInput.value = userName;
            })
        } else {
            // No user is signed in.
            console.log ("No user is signed in");
        }
    });

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
    // Add an event listener to the image input to trigger image preview
    imageInput.addEventListener('change', previewImage);

    // Create an image element for preview
    let imagePreview = document.createElement('img');
    imagePreview.id = 'preview-selected-image';
    imagePreview.style.display = 'none'; // Initially hide the image preview

    let divImagePreview = document.createElement('div');
    divImagePreview.className = 'image-preview-container';

    divImage.appendChild(labelImage);
    divImage.appendChild(imageInput);
    divImage.appendChild(imagePreview);
    divImagePreview.appendChild(imagePreview);

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
    form.appendChild(divImagePreview);
    form.appendChild(divSubmit);
    document.body.appendChild(outerDiv);
}

newTicket();

outerDiv.style.marginBottom = '5rem';
outerDiv.style.padding = '2rem';

function formatTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

function ticketSubmit() {
    const userID = firebase.auth().currentUser.uid;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
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
            .then(url => {
                ticketDetails.image = url; // Add the image URL to ticketDetails object
                return newSubmissionRef.set(ticketDetails); // Create the submission with image URL
            })
            .then(() => {
                const userRef = firebase.firestore().collection('users').doc(userID);
                return userRef.update({
                    userSubmissions: firebase.firestore.FieldValue.arrayUnion(submissionID)
                });
            })
            .then(() => {
                return formSubmissionRef.get(); // Change this line to use formSubmissionsRef instead of formSubmissionRef
            })
            .then(doc => {
                const formattedTime = formatTimestamp(doc.data().timestamp);
                console.log('Submission time:', formattedTime);
                window.location.href = "postThanks.html";
                resetNewTicketDiv();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    } else {
        newSubmissionRef.set(ticketDetails)
            .then(() => {
                const userRef = firebase.firestore().collection('users').doc(userID);
                return userRef.update({
                    userSubmissions: firebase.firestore.FieldValue.arrayUnion(submissionID)
                });
            })
            .then(() => {
                return newSubmissionRef.get();
            })
            .then(doc => {
                const formattedTime = formatTimestamp(doc.data().timestamp);
                console.log('Submission time:', formattedTime);
                window.location.href = "discussionThanks.html";
                resetNewTicketDiv();
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }
}

function uploadPic(submissionID, imageInput) {
    var storageRef = storage.ref("images/" + submissionID + ".jpg");

    return storageRef.put(imageInput)
        .then(() => {
            return storageRef.getDownloadURL();
        })
        .catch(error => {
            console.log("error uploading to cloud storage", error);
            throw error;
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
