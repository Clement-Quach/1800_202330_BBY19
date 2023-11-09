


document.addEventListener('DOMContentLoaded', function () {

    const nameGoesHere = document.getElementById('name-goes-here');


    db.collection('users')
      .doc('qpOBppnMTkUqLWAmGYGQQh3ZPQj1')
      .get()
      .then((doc) => {
        if (doc.exists) {
          const name = doc.data().name;

          nameGoesHere.textContent = name;
          
        } else {
          console.log("Name not Found");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
});
