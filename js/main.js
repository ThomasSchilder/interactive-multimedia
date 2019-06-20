function switchToResults(){
  document.getElementsByClassName("search")[0].style.display = "none";
  document.getElementsByClassName("results")[0].style.display = "block";
}

function switchToSearch(){
  document.getElementsByClassName('search')[0].style.display = "block";
  document.getElementsByClassName('results')[0].style.display = "none";
}
