var currentUser; //points to the document of the user who is logged in

function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var accountEmail = userDoc.data().email;
        var userCity = userDoc.data().city;
        var userPhone = userDoc.data().phoneNumber;
        var userPreferEmail = userDoc.data().userPreferedContactEmail;
        let picUrl = userDoc.data().profilePic;

        //if the data fields are not empty, then write them in to the form.
        if (accountEmail != null) {
          email = document.getElementById("account-email");
          email.value = accountEmail;
        }

        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }

        if (userCity != null) {
          document.getElementById("cityInput").value = userCity;
        }

        if (userPhone != null) {
          document.getElementById("phoneInput").value = userPhone;
        }

        if (userPreferEmail != null) {
          document.getElementById("emailInput").value = userPreferEmail;
        }

        if (picUrl != null) {
          console.log(picUrl);
          $("#mypic-goes-here").attr("src", picUrl);
        } else {
          console.log("picURL is null");
        }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

var profilePictureContainer = document.getElementById('mypic-goes-here');
var editText = document.getElementById('edit-text');

function editUserInfo() {
  //Enable the form fields and save button
  document.getElementById("nameInput").style.border = "1px solid #ced4da";
  var edit = document.getElementById("personalInfoFields").disabled;
  document.getElementById("save-button").disabled;

  if (edit == true) {
    document.getElementById("personalInfoFields").disabled = false;
    profilePictureContainer.style.border = "black solid 1px";
    document.getElementById("save-button").disabled = false;
    document.getElementById("mypic-input").disabled = false;
    document.getElementById("edit-button").style.color = "black";
    editText.style.opacity = '1';
    profilePictureContainer.style.filter = 'blur(3px)';


  } else {
    document.getElementById("personalInfoFields").disabled = true;
    document.getElementById("save-button").disabled = true;
    document.getElementById("mypic-input").disabled = false;
    document.getElementById("edit-button").style.color = "white";
    profilePictureContainer.style.border = "none";
    editText.style.opacity = '0';
    profilePictureContainer.style.filter = 'none';
  }
}

function triggerFileInput() {
    var edit = document.getElementById("personalInfoFields").disabled;
    if (edit == false) {
        document.getElementById('mypic-input').click();
    }
}

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    // get the inputs from the form by ID.
    var userName = document.getElementById("nameInput").value;
    var userCity = document.getElementById("cityInput").value;
    var userPhone = document.getElementById("phoneInput").value;
    var userContactEmail = document.getElementById("emailInput").value;

    if (ImageFile) {
      var storageRef = storage.ref("images/" + user.uid + ".jpg");

      storageRef.put(ImageFile).then(function () {
        console.log("Uploaded to Cloud Storage.");

        storageRef.getDownloadURL().then(function (url) {
          console.log("Got the download URL.");

          // Update profile information in Firestore, including the profile picture URL
          db.collection("users")
            .doc(user.uid)
            .update({
              name: userName,
              city: userCity,
              phoneNumber: userPhone,
              userPreferedContactEmail: userContactEmail,
              profilePic: url,
            })
            .then(function () {
              console.log("Document successfully updated!");
              window.location.href = "account.html";
            });
        });
      });
    } else {
      // If no new profile picture is chosen, update other user information without profilePic
      db.collection("users")
        .doc(user.uid)
        .update({
          name: userName,
          city: userCity,
          phoneNumber: userPhone,
          userPreferedContactEmail: userContactEmail,
        })
        .then(function () {
          console.log("Document successfully updated!");
          window.location.href = "account.html";
        });
    }

    // Disable form fields after saving
    document.getElementById("personalInfoFields").disabled = true;
  });
}

function openSaveModal() {
  var userName = document.getElementById("nameInput").value;
  if (userName.trim() == "") {
    document.getElementById("nameInput").style.border = "solid 2px red";
  } else {
    $('#saveModal').modal('show');
  }
}

function saveUser() {
  // Add your logic to save user information here
  saveUserInfo();
  // Close the modal after saving
  $('#saveModal').modal('hide');
}






//call the function to run it
populateUserInfo();

var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}

chooseFileListener();