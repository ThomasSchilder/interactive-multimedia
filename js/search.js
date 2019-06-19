function searchAll(){
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var title = document.getElementById("title").value;
  var authority = document.getElementById("authority").value;
  var nationality = document.getElementById("nationality").value;
  searchRkd(fName, lName);
  searchLootedArt(fName, lName, title, authority, nationality);
  document.getElementById("lijntje").style.display = "block";
}

function searchLootedArt(fName, lName, title, authority, nationality){
	$.get("https://cors-anywhere.herokuapp.com/https://www.lootedart.com/search/searchdisplay.php\
		?txtArtistLastName=" + fName + "\
		&txtArtistFirstName=" + lName + "\
		&cboNat=ANY&txtObjectStatus=ANY\
		&txtPeriodDesc=ANY\
		&txtObjectTitle=" + title + "\
		&txtObjectType=ANY\
		&cboPeriodStartYear=\
		&cboPeriodStartEra=AD\
		&cboPeriodEndYear=\
		&cboPeriodEndEra=AD\
		&txtOrientation=ANY\
		&txtContactLastName=" + authority + "\
		&txtContactFirstName=\
		&txtLocationCity=\
		&txtLocationCountry=" + nationality + "\
		&txtStartYearComment=\
		&txtEndYearComment=\
		&submit1=Search", function(data) {
		htmlresults = new DOMParser().parseFromString(data, "text/html");
		var table = htmlresults.getElementsByTagName('table')[0].innerHTML;
		$('#results').append(table);
		var a = document.getElementsByTagName("a");
        Array.from (a).forEach (((x) => { x.setAttribute("target", "_blank"); }) );
        var results = data.split("Your search returned ")[1].split(" results")[0];
        var pages = Math.ceil(results/10);
        console.log(pages);
	});
}

function searchRkd(fName, lName){
    $.get("/rkdcall?fName=" + fName + "&lName=" + lName, function(data) {
        console.log(data);
    });
}