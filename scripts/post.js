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

function newTicket() {
    
    var createButton = document.getElementById("outerDiv");

    createButton.addEventListener("click", () => {
        createButton.classList.add("ticket-form-appear");
    })
    
    
    const createPostButton = document.getElementById('createPostButton');
    const postForm = document.getElementsByClassName('outerDiv');
    if (createPostButton) {
        createPostButton.style.display = 'none';
    }
    
    resetNewTicketDiv();
    let outerDiv = document.getElementById("outerDiv");
    outerDiv.className = 'container';
    let div = document.createElement('div');
    div.className = 'jumbotron';
    div.style.backgroundColor = "#3B3A38"; // Use backgroundColor to set the background color
    let form = document.createElement('form');
    form.id = 'newTicketForm';
    form.innerHTML = '<h1>Create a Ticket</h1>';
    form.scrollIntoView();
    let divTitle = document.createElement('div');
    divTitle.className = 'form-group';
    let labelTitle = document.createElement('label');
    labelTitle.className = 'form-group';
    labelTitle.innerHTML = 'Title';
    labelTitle.htmlFor = 'ticketName';
    let title = document.createElement("input");
    title.type = 'text';
    title.className = 'form-control';
    title.id = 'ticketName';

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

    let divPriority = document.createElement('div');
    divPriority.className = 'form-group';
    let labelPriority = document.createElement('label');
    labelPriority.innerHTML = 'Priority';
    labelPriority.htmlFor = 'chosePriority';
    let selectPriority = document.createElement('select');
    selectPriority.className = 'form-control';
    selectPriority.id = 'chosePriority';
    let optionPriority = document.createElement('option');
    let optionPriority1 = document.createElement('option');
    let optionPriority2 = document.createElement('option');
    let optionPriority3 = document.createElement('option');
    let optionPriority4 = document.createElement('option');
    optionPriority.value = 'Low';
    optionPriority.innerHTML = 'Low';
    optionPriority1.value = 'Medium';
    optionPriority1.innerHTML = 'Medium';
    optionPriority2.value = 'High';
    optionPriority2.innerHTML = 'High';
    divPriority.appendChild(labelPriority);
    divPriority.appendChild(selectPriority);
    selectPriority.appendChild(optionPriority);
    selectPriority.appendChild(optionPriority1);
    selectPriority.appendChild(optionPriority2);

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
    divSubmit.className = 'btn btn-light';
    divSubmit.innerHTML = 'SUBMIT';
    divSubmit.addEventListener("click", ticketSubmit);

    outerDiv.appendChild(div);
    div.appendChild(form);
    form.appendChild(divTitle);
    form.appendChild(divName);
    form.appendChild(divLocation);
    form.appendChild(divConcern);
    form.appendChild(divPriority);
    form.appendChild(divMessage);
    form.appendChild(divImage);
    form.appendChild(divImagePreview);
    form.appendChild(divSubmit);
    form.appendChild(divStatus);
    document.body.appendChild(outerDiv);
}

newTicket();

outerDiv.style.marginBottom = '5rem';
outerDiv.style.padding = '2rem';


function addRowToTable(tableId, rowData) {
    const tableBody = document.getElementById("ticketTableBody");
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${rowData.ticketNumber}</td>
        <td>${rowData.title}</td>
        <td>${rowData.concern}</td>
        <td>${rowData.priority}</td>
        <td>${rowData.name}</td>
        <td>${rowData.action}</td>
    `;

    tableBody.appendChild(newRow);
}

function ticketSubmit() {
    // Get the current user ID
    const userID = firebase.auth().currentUser.uid;

    // Get the current timestamp
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();

    // Create a unique formSubmissionID
    const formSubmissionID = firebase.firestore().collection('formSubmissions').doc().id;

    // // Retrieve form values
    // let ticketNumber = generateTicketNumber();
    // let ticketTitle = document.getElementById("ticketName").value;
    // let ticketConcern = document.getElementById("choseConcern").value;
    // let ticketPriority = document.getElementById("chosePriority").value;
    // let ticketProblemDetails = document.getElementById("inputText").value;
    // let ticketName = document.getElementById("name").value;

    // Create ticketDetails object
    let ticketDetails = {
        ticketNumber: generateTicketNumber(),
        title: document.getElementById("ticketName").value,
        concern: document.getElementById("choseConcern").value,
        priority: document.getElementById("chosePriority").value,
        details: document.getElementById("inputText").value,
        name: document.getElementById("name").value,
        action: 'new',
        userID: userID,
        timestamp: timestamp,
        formSubmissionID: formSubmissionID,
    };

    // Reference to the formSubmissions collection
    const formSubmissionsRef = firebase.firestore().collection('formSubmissions').doc(formSubmissionID);
    let imageInput = document.getElementById('imageAttachment').files[0];

    if (imageInput) {
        uploadPic(formSubmissionID, imageInput)
            .then(url => {
                ticketDetails.image = url; // Add the image URL to ticketDetails object
                return formSubmissionsRef.set(ticketDetails); // Create the submission with image URL
            })
            .then(() => {
                const userRef = firebase.firestore().collection('users').doc(userID);
                return userRef.update({
                    userSubmissions: firebase.firestore.FieldValue.arrayUnion(formSubmissionID)
                });
            })
            .then(() => {
                return formSubmissionsRef.get();
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
        formSubmissionsRef.set(ticketDetails)
        .then(() => {
            // Update the user document with the formSubmissionID
            const userRef = firebase.firestore().collection('users').doc(userID);
            return userRef.update({
                userPosts: firebase.firestore.FieldValue.arrayUnion(formSubmissionID)
            });
        })
        .then(() => {
            const formattedTime = formatTimestamp(doc.data().timestamp);
            console.log('Submission time:', formattedTime);
            // Redirect to thank you
            window.location.href = "postThanks.html";
            // Reset the form
            resetNewTicketDiv();
        })
        .catch(error => {
            console.error('Error storing data in Firebase: ', error);
        });

    // Display confirmation message
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "black";
    newOuterDiv.innerHTML = "<h1>Submitted!</h1>";

    // Add row to the ticket table
    addRowToTable('ticketTable', ticketDetails);
}

}


document.addEventListener('DOMContentLoaded', function () {
    let divSubmit = document.querySelector('.btn-success');
    if (divSubmit) {
        divSubmit.addEventListener("click", ticketSubmit);
    }
});

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

function resetNewTicketDiv() {
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "";
    newOuterDiv.innerHTML = "";
}

function randomTableColor() {
    let x = Math.floor(Math.random()*3);
     let colors = ["table-primary","table-success","table-danger","table-info","table-warning","table-light"];
              return colors[x];
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

function formatTimestamp(timestamp) {
    const date = timestamp.toDate(); // Convert Firebase timestamp to JavaScript Date object
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
