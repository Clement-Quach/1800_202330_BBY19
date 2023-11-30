function createForm() {
  document.getElementById('overlay').style.display = 'grid';

}

function closePopup() {
  // Close the popup
  document.getElementById('overlay').style.display = 'none';
}

var isScrolling;

window.addEventListener('scroll', function() {
  clearTimeout(isScrolling);
  
  // Hide the footer
  document.getElementById('footer-bottom').style.opacity = '0';

  isScrolling = setTimeout(function() {
      // Reappear the footer after a delay
      document.getElementById('footer-bottom').style.opacity = '1';
  }, 300); // Adjust the timeout value based on your preference
});