let request = require("request");
let parseString = require('xml2js').parseString;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();


function rkd(){
  let sName = 'van Rijn'
  let fName = 'Rembrandt'
  var nummer = "";
  let url = "http://opendata.rkd.nl/opensearch/artists/eac-cpf?q=part_name:(" + sName + " " + fName + ")&language=en";
  return new Promise(function(resolve, reject){
    request(url, function (error, response, body) {
    if (error){
      reject(error);
    }
    else{
      response = String(body);
      if (response.indexOf("<item>") > -1){
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
          let kunstenaarsnummer = target[1].toString();
          var query = "https://api.rkd.nl/api/record/artists/" + kunstenaarsnummer + "?format=json&language=eng";
          resolve(query);
        });
      }
    }
  });
});
}

/*let fs = require('fs');
let parseString = require('xml2js').parseString;
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const http = new XMLHttpRequest();

function rkd(callback){
  let sName = 'Cascieri'
  let fName = 'Arcangelo'
  var nummer = "";
  let arr = [];
  let url = "http://opendata.rkd.nl/opensearch/artists/eac-cpf?q=part_name:(" + sName + " " + fName + ")&language=en";
  http.open("Get", url);
  http.onload = function(){
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
        var query = "https://api.rkd.nl/api/record/artist/" + kunstenaarsnummer + "?format=json";
        nummer = query;
        console.log(nummer);
      })
    }
  }
}
  /*http.send(null);
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
            var query = "https://api.rkd.nl/api/record/artist/" + kunstenaarsnummer + "?format=json";
            nummer = query;
            http.abort();
            callback(nummer);
          })
        }
      }
    }
  }
}*/

async function main(){
  let urlPromise = rkd();
  urlPromise.then(function(result){
    let nav = result;
    console.log(nav);
    return new Promise(function(resolve,reject){
      request({
        headers: {
          'Content-Type': 'application/json'
        },
        uri: nav,
        method: 'GET'
      }, function (error, response, body){
          if (error){
            reject(error);
          }
          else{
            console.log(response.statusCode);
            resolve(body);
          }
        })
      })
    }),
    function(err){
    console.log(err);
  }
}
async function last(){
  let jesonPromise = main();
  jesonPromise.then(function(result){
    let details = String(result);
    console.log('kees');
  },
    function(err){
      console.log(err);
    })
  }

last();
