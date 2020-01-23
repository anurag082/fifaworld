// fetch('https://worldcup.sfg.io/matches')
// .then(function (response) {
//   return response.json();
// })
// .then(function (data) {
//   appendData(data);
// })
// .catch(function (err) {
//   console.log('error: ' + err);
// });
function loadJSON() {
  var data_file = "https://worldcup.sfg.io/matches";
  var http_request = new XMLHttpRequest();
  try{
     // Opera 8.0+, Firefox, Chrome, Safari
     http_request = new XMLHttpRequest();
  }catch (e) {
     // Internet Explorer Browsers
     try{
        http_request = new ActiveXObject("Msxml2.XMLHTTP");
     }catch (e) {
        try{
           http_request = new ActiveXObject("Microsoft.XMLHTTP");
        }catch (e) {
           // Something went wrong
           alert("Your browser broke!");
           return false;
        }
     }
  }
  http_request.onreadystatechange = function() {
     if (http_request.readyState == 4  ) {
        // Javascript function JSON.parse to parse JSON data
        var data = JSON.parse(http_request.responseText);
        appendData(data)
     }
  }
  http_request.open("GET", data_file, true);
  http_request.send();
}
loadJSON();    

function appendData(data) {
  var tablecontainer = document.querySelector(".tablecontainer"),
  player=0,
  table = document.createElement("TABLE"); // Creating Table
  table.setAttribute('class','myData')
  tablecontainer.appendChild(table) // appending table to TableContainer
  var mainContainer = document.querySelector(".myData");
  var tr= document.createElement("tr"); // Creating Table row
  tr.setAttribute('class','participatingTeams') 
  mainContainer.appendChild(tr);            
  var Container = document.querySelector('.participatingTeams');
  for (var i = 0; i<10; i++) {                
      var th = document.createElement("th");
    th.innerHTML =  data[i].home_team_country;
    Container.appendChild(th);
  }
  for(var j = 0;j<=10;j++) {
    var row = table.insertRow(); // Creating Rows       
    for (var i = 0; i<10; i++) {
      if(data[i].home_team_statistics.country== data[i].home_team_country) { //comparing table header with home_team_statistics.country to get the playing eleven                  
        var datacell = document.createElement("td"); // Creating data cell
        datacell.innerHTML =  data[i].home_team_statistics.starting_eleven[player].name;              
        row.appendChild(datacell);               
        }                                
      }
      player++;
  }
}