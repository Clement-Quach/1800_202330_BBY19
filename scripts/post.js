var ticketsArray = [];

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
    div.style.backgroundColor = "#3B3A38"; // Use backgroundColor to set the background color
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
    const postForm = document.getElementsByClassName('outerDiv');
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

    divImage.appendChild(labelImage);
    divImage.appendChild(imageInput);

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
    form.appendChild(divSubmit);
    form.appendChild(divStatus);
    document.body.appendChild(outerDiv);
}

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
    let ticketNumber = generateTicketNumber();
    let ticketTitle = document.getElementById("ticketName").value;
    let ticketConcern = document.getElementById("choseConcern").value;
    let ticketPriority = document.getElementById("chosePriority").value;
    let ticketProblemDetails = document.getElementById("inputText").value;
    let ticketName = document.getElementById("name").value;
    let imageAttachment = document.getElementById("imageAttachment").files[0];

    // Handle the image attachment here, you can use the File API to upload it to a server or process it in any other way.

    let ticketDetails = {
        ticketNumber: ticketNumber,
        title: ticketTitle,
        concern: ticketConcern,
        priority: ticketPriority,
        details: ticketProblemDetails,
        name: ticketName,
        action: 'In progress'
        // image: Handle the image attachment here,
    };
    const db = firebase.firestore();
    const submissionsRef = db.collection('formSubmissions');
    const newSubmissionRef = submissionsRef.doc();

    // Store the form submission data in Firebase
    newSubmissionRef.set(ticketDetails)
        .then(() => {
            // redirect to thank you
            window.location.href = "postThanks.html";
            // Reset the form
            resetNewTicketDiv();

            // Display confirmation message or redirect to the table page
        })
        .catch(error => {
            console.error('Error storing data in Firebase: ', error);
        });

    // Display confirmation message
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "black";
    newOuterDiv.innerHTML = "<h1>Submitted!</h1>";

    addRowToTable('ticketTable', ticketDetails);

    // Push the ticket details to Firebase
    ref.push(ticketDetails);
}

// Add an event listener to the "SUBMIT" button to call the ticketSubmit function
let divSubmit = document.querySelector('.btn-success');
divSubmit.addEventListener("click", ticketSubmit);

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
