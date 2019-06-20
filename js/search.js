function searchAll(){
  document.getElementById("results").innerHTML = '<table><caption id="resultsAmount"></caption></table><br>';
  var fName = document.getElementById("fName").value;
  var lName = document.getElementById("lName").value;
  var title = document.getElementById("title").value;
  var authority = document.getElementById("authority").value;
  var nationality = document.getElementById("nationality").value;
  searchRkd(fName, lName);
  searchLootedArt(fName, lName, title, authority, nationality);
  searchLostart(fName, lName, title, authority);
  searchHerkomstgezocht(fName, lName, title);
  switchToResults();
  document.getElementById("lijntje").style.display = "block";
}

function searchLootedArt(fName, lName, title, authority, nationality){
	$.get("https://cors-anywhere.herokuapp.com/https://www.lootedart.com/search/searchdisplay.php\
		?txtArtistLastName=" + lName + "\
		&txtArtistFirstName=" + fName + "\
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
        document.getElementById("resultsAmount").innerHTML = document.getElementById("resultsAmount").innerHTML + "lootedart.com returned " + results.toString() + " results<br>";
        var j;
        for(let i = 1; i < pages; i++){
            j = i + 1;
            $.get("https://cors-anywhere.herokuapp.com/https://www.lootedart.com/search/searchdisplay.php\
			?txtArtistLastName=" + lName + "\
			&txtArtistFirstName=" + fName + "\
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

            let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            if(arr.findIndex(x => x == data.split("<caption>")[1].trim()[0]) > -1){
            var results = data.split("<caption>")[1].split(" Search results")[0];
            document.getElementById("resultsAmount").innerHTML = document.getElementById("resultsAmount").innerHTML + "lostart.de returned " + results.toString() + " results<br>";
        	var pages = Math.ceil(parseInt(results)/10);
        	var sucheId = data.split("SUCHE_ID%3D")[1].split("%")[0];
        	var j, k;
        	for(let i = 0; i < pages-1; i++){
        		k = i + 1;
            	setTimeout(function() {
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
				}, (3000 * k));
            }
            }
	});
}

function searchHerkomstgezocht(fName, lName, title){
	$.get("https://cors-anywhere.herokuapp.com/http://herkomstgezocht.nl/nl/search/collection/\
	" + title + " " + fName + " " + lName, function(data) {
		htmlresults = new DOMParser().parseFromString(data, "text/html");
		var results = htmlresults.getElementsByTagName('ol')[0].innerHTML;
	    $('#results').append(results);
	    var a = document.getElementsByTagName("a");
        Array.from (a).forEach (((x) => { x.setAttribute("target", "_blank"); }) );

        var results = data.split("Er zijn ")[1].split(" item")[0];
        document.getElementById("resultsAmount").innerHTML = document.getElementById("resultsAmount").innerHTML + "herkomstgezocht.nl returned " + results.toString() + " results<br>";
        var pages = Math.ceil(results/15);
        var j;
        for(let i = 0; i < pages-1; i++){
            j = i + 1;
            $.get("https://cors-anywhere.herokuapp.com/http://herkomstgezocht.nl/nl/search/collection/\
			" + title + " " + fName + " " + lName + "?page=" + j.toString(), function(data) {
				htmlresults = new DOMParser().parseFromString(data, "text/html");
				var results = htmlresults.getElementsByTagName('ol')[0].innerHTML;
				$('#results').append(results);
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
