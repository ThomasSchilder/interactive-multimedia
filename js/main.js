function switchToResults(){
  document.getElementsByClassName("search")[0].style.display = "none";
  document.getElementsByClassName("results")[0].style.display = "block";
}

function switchToSearch(){
  document.getElementsByClassName('search')[0].style.display = "block";
  document.getElementsByClassName('results')[0].style.display = "none";
  document.getElementById("results").innerHTML = '<table><caption id="resultsAmount"></caption></table><br>';
  document.getElementByClassName("lostart")[0].innerHTML = "";
  document.getElementByClassName("lostart")[0].setAttribute("alreadySearched", "false");
  document.getElementByClassName("lootart")[0].innerHTML = "";
  document.getElementByClassName("lootart")[0].setAttribute("alreadySearched", "false");
  document.getElementByClassName("herkomstgezocht")[0].innerHTML = "";
  document.getElementByClassName("herkomstgezocht")[0].setAttribute("alreadySearched", "false");
  document.getElementByClassName("rkd")[0].innerHTML = "";
  document.getElementByClassName("rkd")[0].setAttribute("alreadySearched", "false");
}
