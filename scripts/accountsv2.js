var currentUser;               //points to the document of the user who is logged in

function populateUserInfo() {
            firebase.auth().onAuthStateChanged(user => {
                // Check if user is signed in:
                if (user) {

                    //go to the correct user document by referencing to the user uid
                    currentUser = db.collection("users").doc(user.uid)
                    //get the document for current user.
                    currentUser.get()
                        .then(userDoc => {
                            //get the data fields of the user
<<<<<<< HEAD
                            var userName = userDoc.data().name;
                            // var userSchool = userDoc.data().school;
                            // var userCity = userDoc.data().city;
=======
                            var userName = userDoc.name;
>>>>>>> a9dc6d7076179f4f90c95e812aa2063a5cf173d6

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
<<<<<<< HEAD
                            // if (userSchool != null) {
                            //     document.getElementById("schoolInput").value = userSchool;
                            // }
                            // if (userCity != null) {
                            //     document.getElementById("cityInput").value = userCity;
                            // }
=======
>>>>>>> a9dc6d7076179f4f90c95e812aa2063a5cf173d6
                        })
                } else {
                    // No user is signed in.
                    console.log ("No user is signed in");
                }
            });
        }
function editUserInfo() {
          //Enable the form fields
          document.getElementById('personalInfoFields').disabled = false;
       }
<<<<<<< HEAD
function saveUserInfo() {
        //enter code here
   
        //a) get user entered values
        userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
        // userSchool = document.getElementById('schoolInput').value;     //get the value of the field with id="schoolInput"
        // userCity = document.getElementById('cityInput').value;       //get the value of the field with id="cityInput"
        //b) update user's document in Firestore
        currentUser.update({
          name: userName,

      })
      .then(() => {
          console.log("Document successfully updated!");
          window.location.href = "account.html";
      })
        //c) disable edit 
        document.getElementById('personalInfoFields').disabled = true;
      }
=======

function saveUserInfo() {
    //enter code here

    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    //b) update user's document in Firestore
    currentUser.update({
        name: userName,
    })
    .then(() => {
        console.log("Document successfully updated!");
    })
    //c) disable edit 
    document.getElementById('personalInfoFields').disabled = true;
}
>>>>>>> a9dc6d7076179f4f90c95e812aa2063a5cf173d6
//call the function to run it 
populateUserInfo();
