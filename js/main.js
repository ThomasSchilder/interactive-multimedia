function switchToResults(){

  document.getElementsByClassName("results")[0].style.display = "block";
}

function switchToSearch(){
  
  document.getElementsByClassName('results')[0].style.display = "none";
  document.getElementById("results").innerHTML = '<table><caption id="resultsAmount"></caption></table><br>';
  document.getElementsByClassName("lostart")[0].innerHTML = "";
  document.getElementsByClassName("lostart")[0].setAttribute("alreadySearched", "false");
  document.getElementsByClassName("lootart")[0].innerHTML = "";
  document.getElementsByClassName("lootart")[0].setAttribute("alreadySearched", "false");
  document.getElementsByClassName("herkomstgezocht")[0].innerHTML = "";
  document.getElementsByClassName("herkomstgezocht")[0].setAttribute("alreadySearched", "false");
  document.getElementsByClassName("rkd")[0].innerHTML = "";
  document.getElementsByClassName("rkd")[0].setAttribute("alreadySearched", "false");
}

function openNotes(){
	document.getElementsByClassName('instruction')[0].style.display = 'none';
	document.getElementsByClassName("lostart")[0].style.display = "none";
	document.getElementsByClassName("lootart")[0].style.display = "none";
	document.getElementsByClassName("herkomstgezocht")[0].style.display = "none";
	document.getElementsByClassName("rkd")[0].style.display = "none";
	document.getElementById("notes").style.display = "block";
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementsByClassName("navigation")[0];

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
} 