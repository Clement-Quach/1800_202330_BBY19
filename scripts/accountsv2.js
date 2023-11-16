var currentUser;               //points to the document of the user who is logged in

function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {
                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid);
                    //get the document for current user.
                    currentUser.get().then(userDoc => {
                            //get the data fields of the user

                            var userName = userDoc.data().name;
                            var userCity = userDoc.data().city;
                            var userPhone = userDoc.data().phoneNumber;
                            var userEmail = userDoc.data().userPreferedContactEmail;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }

                            if (userCity != null) {
                                document.getElementById("cityInput").value = userCity
                            }

                            if (userPhone != null) {
                                document.getElementById("phoneInput").value = userPhone;
                            }

                            if (userEmail != null) {
                                document.getElementById("emailInput").value = userEmail;
                            }
                        })
                    
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }
function editUserInfo() {
          //Enable the form fields and save button
          document.getElementById('personalInfoFields').disabled = false;
          document.getElementById('save-button').disabled = false;
       }

function saveUserInfo() {
        //enter code here

        //a) get user entered values
        userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
        userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
        userPhone = document.getElementById('phoneInput').value;
        userContactEmail = document.getElementById('emailInput').value;
        text = `Are you sure you want to change the information below?`

        if (confirm(text) == true) {
            //if yes, update user's document in Firestore
            currentUser.update({
                name: userName,
                city: userCity,
                phoneNumber: userPhone,
                userPreferedContactEmail: userContactEmail 
            })
            .then(() => {
                console.log("Document successfully updated!");
                window.location.href = "account.html";
            })
            alert("Successfully saved!");
            //c) disable edit 
            document.getElementById('personalInfoFields').disabled = true;
        } else {
            //if no
            alert("You canceled!");
        }
    }

//call the function to run it 
populateUserInfo();
