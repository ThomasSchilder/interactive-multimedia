function searchAll(){
  document.getElementById("results").innerHTML = "";
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var title = document.getElementById("title").value;
  var authority = document.getElementById("authority").value;
  var nationality = document.getElementById("nationality").value;
  searchRkd(fName, lName);
  searchLootedArt(fName, lName, title, authority, nationality);
  searchLostart(fName, lName, title, authority);
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
        
        for(let i = 1; i < pages; i++){
            j = i + 1;
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
			&submit1=Search&page=" + j.toString(), function(data) {
		        htmlresults = new DOMParser().parseFromString(data, "text/html");
		        var table = htmlresults.getElementsByTagName('table')[0].innerHTML;
	        	$('#results').append(table);
	        	var a = document.getElementsByTagName("a");
                Array.from (a).forEach (((x) => { x.setAttribute("target", "_blank"); }) );
	    	});
        }
	});
}

function searchLostart(fName, lName, title, authority){
	$.get("https://cors-anywhere.herokuapp.com/http://www.lostart.de/Webs/EN/Datenbank/SucheDetail/SucheMeldungDetail.html?resourceId=7398&input_=7332&pageLocale=en\
	&titelbesch=" + title + "\
	&person=" + fName + " " + lName + "\
	&objektart=-1\
	&objektart.GROUP=1\
	&mattech=\
	&datierung=\
	&provenienz=\
	&instsamml=" + authority + "\
	&kennz=\
	&id=+477958&pubop=eq&pubop.GROUP=1&pubyear=&pubyear.GROUP=1&type.GROUP=1&suche_typ=MeldungDetail&suche_typ.HASH=1f7be21bf284266ab474&suchen=Search", function(data) {
			htmlresults = new DOMParser().parseFromString(data, "text/html");
			var tableEmpty = document.createElement("table");
			tableEmpty.setAttribute("id", "emptyTable");
			$('#results').append(tableEmpty);
		    var table = htmlresults.getElementsByTagName('tbody')[0].innerHTML;
	        $('#emptyTable').append(table);
	        var a = document.getElementsByTagName("a");
            Array.from (a).forEach (((x) => { x.setAttribute("target", "_blank"); }) );
            
            var results = data.split("<caption>")[1].split(" Search results")[0];
        	var pages = Math.ceil(parseInt(results)/10);
        	console.log(pages);
        	var sucheId = data.split("SUCHE_ID%3D")[1].split("%")[0];
        	console.log(sucheId);
        	for(let i = 0; i < pages-1; i++){
            	j = i + 1;
            	$.get("https://cors-anywhere.herokuapp.com/http://www.lostart.de/Webs/EN/Datenbank/SucheDetail/SucheDetailErgebnis.html?cms_param=SUCHE_ID%3D" + sucheId + "%26page%3D" + j.toString() + "#result", function(data) {
					htmlresults = new DOMParser().parseFromString(data, "text/html");
					var tableEmpty = document.createElement("table");
					tableEmpty.setAttribute("id", "emptyTable");
					$('#results').append(tableEmpty);
				    var table = htmlresults.getElementsByTagName('tbody')[0].innerHTML;
			        $('#emptyTable').append(table);
			        var a = document.getElementsByTagName("a");
			        Array.from (a).forEach (((x) => { x.setAttribute("target", "_blank"); }) );
				});
            }
	});
}

function searchRkd(fName, lName){
    $.get("/rkdcall?fName=" + fName + "&lName=" + lName, function(data) {
        console.log(data);
    });
}