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
                            var userName = userDoc.data().name;

                            //if the data fields are not empty, then write them in to the form.
                            if (userName != null) {
                                document.getElementById("nameInput").value = userName;
                            }
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

function saveUserInfo() {
    //enter code here
    //a) get user entered values
    userName = document.getElementById('nameInput').value;       //get the value of the field with id="nameInput"
    
    let confirmation = confirm(`Are you sure you want to change the name to: ${userName}`);

    if (confirmation) {
        //b) update user's document in Firestore
        currentUser.update({
            name: userName,
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
        //c) disable edit 
        document.getElementById('personalInfoFields').disabled = true;
        alert("Your changes have been successfully saved!")
    } else {
        alert("Canceled");
    }

    
}
//call the function to run it 
populateUserInfo();
