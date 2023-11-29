function displayPostInfo() {
  let params = new URL( window.location.href ); //get URL of search bar
  let paramsStr = encodeURI(params)
  console.log(paramsStr);
  let indexId = paramsStr.indexOf("docId=")+6;
  console.log(indexId);
  let ID = paramsStr.slice(indexId, paramsStr.length); //get value for key "id"
  // let ID = params.searchParams.get( "docID" ); //get value for key "id"

  console.log( ID );

  db.collection( "discussionSubmissions" )
  .doc( ID )
  .get()
  .then( doc => {
      thisPost = doc.data();
      postName = thisPost.title;
      postAuthor = thisPost.name;
     
      postDate = thisPost.timestamp;

      const data = doc.data();
      // Create HTML elements based on the data
      const dataElement = document.createElement('div');
      dataElement.className = 'card';

      const time = data.timestamp;

      const dateObject = time.toDate();

      const year = dateObject.getFullYear();
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = dateObject.getDate().toString().padStart(2, '0');

      // Extracting time components
      const hours = dateObject.getHours().toString().padStart(2, '0');
      const minutes = dateObject.getMinutes().toString().padStart(2, '0');

      const currentDate = new Date();

      const timeDifference = currentDate - dateObject;

      // Convert milliseconds to hours
      const hoursDifference = timeDifference / (1000 * 60 * 60);

      // Convert milliseconds to days
      const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

      var status;
      // Check if 24 hours have passed
      if (daysDifference > 3) {
        status = "Past";
      }
      else if (hoursDifference >= 24) {
          status = "Recent";
      } else {
          status = data.action;
      }


      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

      if (data.image) {
      dataElement.innerHTML = `
        <div class="card-header">
          <span class="tag tag-teal" id="title">${status}</span>
          <span class="tag tag-purple" id="title">${data.concern}</span>
          <span class="tag tag-pink" id="title">${data.location}</span>
        </div>
        <div class="card-body">
          <div class="user">
            <h1 id="details">${data.title}</h1>
            <small id="timestamp">${formattedDateTime}</small>
            <h5 id="name">${data.name}</h5>
          </div>
          <div class="card-details">
            <div class="card-image">
              <img src="${data.image}" alt="${data.title}" />
            </div> 
          </div>
          <div class="card-details">
            <input type="text" id="detailsInput" class="form-control" >
          </div>
          <div id="like-section">
            <button type="button" class="btn btn-secondary" id="edit-button">Edit</button>
            <button type="button" id="save-button" class="btn btn-primary" onclick="saveEdits()">Save</button>
          </div>
        </div>
      `;
      
  }  else {
    dataElement.innerHTML = `
    <div class="card-header">
      <span class="tag tag-teal" id="title">${status}</span>
      <span class="tag tag-purple" id="title">${data.concern}</span>
      <span class="tag tag-pink" id="title">${data.location}</span>
    </div>
    <div class="card-body">
      <div class="user">
        <h1 id="details">${data.title}</h1>
        <small id="timestamp">${formattedDateTime}</small>
        <h5 id="name">${data.name}</h5>
      </div>
      <div class="card-details">
        <input type="text" id="detailsInput" class="form-control" >
      </div>
      <div id="like-section">
        <button type="button" id="save-button" class="btn btn-primary" onclick="saveEdits()">Save</button>
      </div>
    </div>
    `;
  }
  dataContainer.appendChild(dataElement);

  document.getElementById('detailsInput').value = "";

  document.getElementById('detailsInput').value = data.details;


});
 
//<p>${data.details}</p>
}

displayPostInfo();

function saveEdits(){
  let params = new URL( window.location.href ); //get URL of search bar
  let paramsStr = encodeURI(params)
  newDetails = document.getElementById('detailsInput').value;
  let indexId = paramsStr.indexOf("docId=")+6;
  console.log(indexId);
  let ID = paramsStr.slice(indexId, paramsStr.length)
  db.collection('discussionSubmissions')
  .doc( ID )
  .get()
  .then(() => {
    thisPost =  db.collection('discussionSubmissions').doc(ID);
    console.log(newDetails);
    thisPost.update({
      details: newDetails, 
    })
  })
}
