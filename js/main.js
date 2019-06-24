function switchToResults(){
  document.getElementsByClassName("search")[0].style.display = "none";
  document.getElementsByClassName("results")[0].style.display = "block";
}

function switchToSearch(){
  document.getElementsByClassName('search')[0].style.display = "block";
  document.getElementById('results')[0].style.display = "none";
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
