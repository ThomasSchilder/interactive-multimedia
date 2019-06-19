function rkdCall (){
  let fs = require('fs');
  let parseString = require('xml2js').parseString;
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const http = new XMLHttpRequest();
  let arr = [];
  let fName = document.getElementById('fName').value;
  let sName = document.getElementById('lName').value;
  let url = "http://opendata.rkd.nl/opensearch/artists/eac-cpf?q=part_name:(" + sName + " " + fName + ")&language=en";
  http.open("Get", url);
  http.send();
  http.onreadystatechange = function(){
    if (http.readyState == 4 && http.status == 200){
      if (http.responseText){
        let obj = {};
        let response = String(http.responseText);
        if(response.indexOf("<item>") > -1){
          let startIndex = response.indexOf("<item>");
          let endIndex = response.indexOf("</item>");
          let target = response.substr(startIndex, endIndex);
          let split = target.split("</channel>")
          split = split.toString();
          parseString(split, function (err, result) {
            let jeson = JSON.stringify(result);
            jeson = JSON.parse(jeson);
            let content = jeson.item[ 'eac-cpf:eac-cpf' ];
            for (let i=0; i<content.length; i++){
              if (content[i][ 'eac-cpf:cpfDescription' ] != null){
                let description = content[i][ 'eac-cpf:cpfDescription' ];
                for (let j=0; j<description[0][ 'eac-cpf:identity' ].length; j++){
                  obj.type = description[0][ 'eac-cpf:identity' ][j][ 'eac-cpf:identityType' ][0];
                  obj.name = description[0][ 'eac-cpf:identity' ][j][ 'eac-cpf:nameEntry'][0][ 'eac-cpf:part' ][0];
                  let localDescription = description[0][ 'eac-cpf:description' ][0][ 'eac-cpf:localDescription' ];
                  for (let k=0; k<localDescription.length; k++){
                    if (localDescription[k][ 'eac-cpf:term' ] != null){
                      for (let o=0; o<localDescription[k][ 'eac-cpf:term' ].length; o++){
                        if (localDescription[k][ 'eac-cpf:term' ][o].toLowerCase() == 'Male' || localDescription[k][ 'eac-cpf:term' ][o].toLowerCase() == 'female'){
                          obj.gender = localDescription[k][ 'eac-cpf:term' ][o];
                        }
                        else{
                          obj.nationality = localDescription[k][ 'eac-cpf:term' ][o];
                        }
                      }
                    }
                    //console.log(localDescription[k])
                  }
                  let places = description[0][ 'eac-cpf:description' ][0][ 'eac-cpf:places'];
                  for (let k=0; k<places[0][ 'eac-cpf:place'].length; k++){
                    let index = places[0][ 'eac-cpf:place'][k];
                    if (index[ 'eac-cpf:placeRole' ][0] == 'Place of birth'){
                      obj.placeOfBirth = index[ 'eac-cpf:placeEntry' ][0];
                    }
                    else if (index[ 'eac-cpf:placeRole' ][0] == 'Place of death'){
                      obj.placeOfDeath = index[ 'eac-cpf:placeEntry' ][0];
                    }
                  }
                  let dateRange = description[0][ 'eac-cpf:description' ][0][ 'eac-cpf:existDates' ][0][ 'eac-cpf:dateRange' ];
                  obj.dateOfBirth = dateRange[0][ 'eac-cpf:fromDate' ][0].$.standardDate;
                  obj.dateOfDeath = dateRange[0][ 'eac-cpf:toDate' ][0].$.standardDate;
                }
                obj.function = description[0][ 'eac-cpf:functions' ][0][ 'eac-cpf:function' ][0];
              }
            }
          });
        }
        arr.push(obj);
      }
    }
    return array;
  }
}
