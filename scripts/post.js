

var database = firebase.database();
var ref = database.ref('ticketRecord');



var ticketsArray = [];

function newTicket() {
    resetNewTicketDiv();
    let outerDiv = document.getElementById("outerDiv");
    outerDiv.className = 'container';
    let div = document.createElement('div');
    div.className = 'jumbotron';
    div.style = "background-color: NavajoWhite";
    let form = document.createElement('form');
    form.id = 'newTicketForm';
    form.innerHTML = '<h1>ADD NEW TICKET</h1>';
    form.scrollIntoView();
    let divTitle = document.createElement('div');
    divTitle.className = 'form-group';
    let labelTitle = document.createElement('label');
    labelTitle.className = 'form-group';
    labelTitle.innerHTML = 'Title';
    labelTitle.for = 'ticketName';
    let title = document.createElement("input");
    title.type = 'text';
    title.className = 'form-control';
    title.id = 'ticketName';

    divTitle.appendChild(labelTitle);
    divTitle.appendChild(title);

    let divEmail = document.createElement('div');
    divEmail.className = 'form-group';
    let labelEmail = document.createElement('label');
    labelEmail.className = 'form-group';
    labelEmail.innerHTML = 'Email';
    labelEmail.for = 'ticketEmail';
    labelEmail.innerHTML = 'Email';
    let email = document.createElement("input");
    email.type = 'email';
    email.className = 'form-control';
    email.id = 'ticketEmail';

    divEmail.appendChild(labelEmail);
    divEmail.appendChild(email);

    let divConcern = document.createElement('div'); // Changed "Department" to "Concern"
    divConcern.className = 'form-group';
    let labelConcern = document.createElement('label');
    labelConcern.innerHTML = 'Type of Concern'; // Changed "Department" to "Type of Concern"
    labelConcern.for = 'choseConcern'; // Changed "Department" to "choseConcern"
    let select = document.createElement('select');
    select.id = 'choseConcern'; // Changed "choseDpt" to "choseConcern"
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
    option2.innerHTML = 'Treasury';
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
    labelPriority.for = 'chosePriority';
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
    optionPriority3.value = 'Critical';
    optionPriority3.innerHTML = 'Critical';
    optionPriority4.value = 'Emergency';
    optionPriority4.innerHTML = 'Emergency';
    divPriority.appendChild(labelPriority);
    divPriority.appendChild(selectPriority);
    selectPriority.appendChild(optionPriority);
    selectPriority.appendChild(optionPriority1);
    selectPriority.appendChild(optionPriority2);
    selectPriority.appendChild(optionPriority3);
    selectPriority.appendChild(optionPriority4);

    let divMessage = document.createElement('div');
    divMessage.className = 'form-group';
    let labelMessage = document.createElement('label');
    labelMessage.className = 'col-sm-2 control-label';
    labelMessage.innerHTML = 'Problem';
    labelMessage.for = 'inputText';
    let messageText = document.createElement('textarea');
    messageText.className = 'form-control';
    messageText.id = 'inputText';
    messageText.rows = '3';
    messageText.placeholder = 'Problem details';
    divMessage.appendChild(labelMessage);
    divMessage.appendChild(messageText);

    let divPhoneContact = document.createElement('div');
    divPhoneContact.className = 'form-group';
    let labelPhone = document.createElement('label');
    labelPhone.className = 'form-group';
    labelPhone.innerHTML = 'Contact Phone';
    labelPhone.for = 'ticketContact';
    let contactInput = document.createElement("input");
    contactInput.type = 'text';
    contactInput.className = 'form-control';
    contactInput.id = 'ticketContact';
    divPhoneContact.appendChild(labelPhone);
    divPhoneContact.appendChild(contactInput);

    let divCustomer = document.createElement('div');
    divCustomer.className = 'form-group';
    let labelCustomer = document.createElement('label');
    labelCustomer.className = 'form-group';
    labelCustomer.innerHTML = 'Customer Name';
    labelCustomer.for = 'customerName';
    let customerName = document.createElement("input");
    customerName.type = 'text';
    customerName.className = 'form-control';
    customerName.id = 'customerName';
    divCustomer.appendChild(labelCustomer);
    divCustomer.appendChild(customerName);

    let divStatus = document.createElement('div');
    divStatus.id = 'status';

    let divSubmit = document.createElement('div');
    divSubmit.type = 'button';
    divSubmit.className = 'btn btn-success';
    divSubmit.innerHTML = 'SUBMIT';
    divSubmit.addEventListener("click", ticketSubmit);

    outerDiv.appendChild(div);
    div.appendChild(form);
    form.appendChild(divTitle);
    form.appendChild(divEmail);
    form.appendChild(divConcern); // Changed "divDepartment" to "divConcern"
    form.appendChild(divPriority);
    form.appendChild(divMessage);
    form.appendChild(divPhoneContact);
    form.appendChild(divCustomer);
    form.appendChild(divSubmit);
    form.appendChild(divStatus);
    document.body.appendChild(outerDiv);
}

function ticketSubmit() {

    let ticketNumber = generateTicketNumber();
    let ticketTitle = document.getElementById("ticketName").value;
    let ticketEmail = document.getElementById("ticketEmail").value;
    let ticketConcern = document.getElementById("choseConcern").value; // Changed "choseDpt" to "choseConcern"
    let ticketPriority = document.getElementById("chosePriority").value;
    let ticketProblemDetails = document.getElementById("inputText").value;
    let ticketPhoneNo = document.getElementById("ticketContact").value;
    let ticketCustomerName = document.getElementById("customerName").value;

    let ticketDetails = {

        ticketNumber: ticketNumber,
        title: ticketTitle,
        email: ticketEmail,
        concern: ticketConcern,
        priority: ticketPriority,
        details: ticketProblemDetails,
        phone: ticketPhoneNo,
        customerName: ticketCustomerName
    };
}

function resetNewTicketDiv() {
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "";
    newOuterDiv.innerHTML = "";
}

ref.once('value', function (snapshot) {
    snapshot.forEach(function (item) {
        let ticketRecord = (JSON.stringify(item.val()));
        let records = JSON.parse(ticketRecord);
        ticketsArray.push(records);
        ticketSummary(item.val().ticketNumber, item.val().title, item.val().department, item.val().priority, item.val().customerName);
    });
});

function submitTicket() {
    // Get the ticket details
    let ticketDetails = {
        ticketNumber: generateTicketNumber(),
        title: document.getElementById("ticketName").value,
        email: document.getElementById("ticketEmail").value,
        concern: document.getElementById("choseConcern").value,
        priority: document.getElementById("chosePriority").value,
        details: document.getElementById("inputText").value,
        phone: document.getElementById("ticketContact").value,
        customerName: document.getElementById("customerName").value,
    };

    // Reset the form
    resetNewTicketDiv();

    // Display confirmation message
    let newOuterDiv = document.getElementById("outerDiv");
    newOuterDiv.style.color = "red";
    newOuterDiv.innerHTML = "<h1>Submitted!!</h1>";

    // Push the ticket details to Firebase
    ref.push(ticketDetails);
}

// Add an event listener to the "SUBMIT" button to call the submitTicket function
let divSubmit = document.querySelector('.btn-success');
divSubmit.addEventListener("click", submitTicket);

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
function randomTableColor(){
    let x = Math.floor(Math.random()*5);
     let colors = ["table-primary","table-success","table-danger","table-info","table-warning","table-light"];
              return colors[x];

}