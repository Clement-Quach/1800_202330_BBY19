function fetchDataAndDisplay() {
  const dataContainer = document.getElementById('dataContainer');

  db.collection('discussionSubmissions')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        // Create HTML elements based on the data
        const dataElement = document.createElement('div');
        dataElement.className = 'card';

        const title = data.title;
        const details = data.details;
        const name = data.name;

        dataElement.innerHTML = `
          <div class="card-header">
            <img src="${data.imageURL}" alt="${data.title}" />
          </div>
          <div class="card-body">
            <span class="tag tag-teal" id="title">${data.action}</span>
            <h4 id="details">${data.title}</h4>
            <p>${data.details}</p>
            <div class="user">
              <img src="${data.userImage}" alt="user" />
              <div class="user-info">
                <h5 id="name">${name}</h5>
                <small id="timestamp">${data.timestamp}</small>
              </div>
            </div>
          </div>
        `;

        // Append the HTML to the container
        dataContainer.appendChild(dataElement);
      });
    })
    .catch((error) => {
      console.error('Error reading Firestore data:', error);
    });
}

document.getElementById('fetchDataButton').addEventListener('click', fetchDataAndDisplay);