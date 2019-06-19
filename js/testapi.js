async function rkd(){
  let fs = require('fs');
  let $ = require('jquery')
  let parseString = require('xml2js').parseString;
  let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const http = new XMLHttpRequest();
  let sName = 'Cascieri'
  let fName = 'Arcangelo'
  let nummer = api();
  let arr = [];
  let url = "http://opendata.rkd.nl/opensearch/artists/eac-cpf?q=part_name:(" + sName + " " + fName + ")&language=en";
  http.open("Get", url);
  http.send();
  http.onreadystatechange = async function () {
    if (http.readyState == 4 && http.status == 200) {
      if (http.responseText) {
        let obj = {};
        let response = String(http.responseText);
        if (response.indexOf("<item>") > -1) {
          let startIndex = response.indexOf("<item>");
          let endIndex = response.indexOf("</item>");
          let target = response.substr(startIndex, endIndex);
          let split = target.split("</channel>")
          split = split.toString();
          parseString(split, function(err, result) {
            let jeson = JSON.stringify(result);
            jeson = JSON.parse(jeson);
            let str = jeson.item.link[0];
            let target = str.split('kunstenaarsnummer:');
            let kunstenaarsnummer = target[1];
            let query = "https://api.rkd.nl/api/record/artist/" + kunstenaarsnummer + "?format=json";
            return query
          })
        }
      }
    }
  }
  console.log(nummer);
}
rkd();
