function switchToResults(){
  document.getElementsByClassName("search")[0].style.display = "none";
  document.getElementsByClassName("results")[0].style.display = "block";
}

function switchToSearch(){
  document.getElementsByClassName('search')[0].style.display = "block";
  document.getElementsByClassName('results')[0].style.display = "none";
  document.getElementById("results").innerHTML = '<table><caption id="resultsAmount"></caption></table><br>';
  document.getElementById("lostart").innerHTML = "";
  document.getElementById("lostart").setAttribute("alreadySearched", "false");
  document.getElementById("lootart").innerHTML = "";
  document.getElementById("lootart").setAttribute("alreadySearched", "false");
  document.getElementById("herkomstgezocht").innerHTML = "";
  document.getElementById("herkomstgezocht").setAttribute("alreadySearched", "false");
  document.getElementById("rkd").innerHTML = "";
  document.getElementById("rkd").setAttribute("alreadySearched", "false");
}
