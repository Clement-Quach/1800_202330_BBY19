function searchInput() {
  let input = document.getElementById("search-bar").value;
  
  if (input == "Create a Post") {
    console.log("Go to " + input);
    window.location.assign("../discussion.html");
  } else if (input == "Create a Ticket") {
    window.location.assign("../post.html");
  } else if (input == "View Posts") {
    window.location.assign("../forums.html");
  } else if (input == "View Tickets") {
    window.location.assign("../inbox.html");
  } else if (input == "Manage Account") {
    window.location.assign("../account.html");
  } else {
    alert("Your input is not valid!");
  }

}