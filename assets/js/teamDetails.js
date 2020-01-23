var team_info= window.location.hash.substring(1);
// fetch('https://worldcup.sfg.io/matches')
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     appendData(data);
//   })
//   .catch(function (err) {
//     console.log('error: ' + err);
//   }); 
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
  var teamDetails = document.querySelector(".team-details .wrapper"),
  k=0;
  for(j=0;j<10;j++) {
    if(data[j].home_team_country===team_info){
      var teamName = document.createElement("h2")
      teamName.innerHTML= data[j].home_team_country;
      teamDetails.appendChild(teamName);
      teamName.setAttribute("class","hometeam")
      var table = document.createElement('table');
      table.setAttribute("class","playerDetails")
      teamDetails.appendChild(table);
      var col = [];
      for (var i = 0; i < data[j].home_team_statistics.starting_eleven.length; i++) {
          for (var key in data[j].home_team_statistics.starting_eleven[i]) {
              if (col.indexOf(key) === -1) {
                col.push(key);
              }
          }
      }
      var tr = table.insertRow(-1);                   // TABLE ROW.
      for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        if(th.innerHTML==="captain") { continue; }
        tr.appendChild(th);
      }
      for (var i = 0; i < data[j].home_team_statistics.starting_eleven.length; i++) {
        tr = table.insertRow(-1);        
        for (var e = 0; e < col.length; e++) {
          var tabCell = tr.insertCell(-1);
          if(e==1){ 
            tabCell.style.display="none";
            continue;
            }
          tabCell.innerHTML = data[j].home_team_statistics.starting_eleven[i][col[e]];
        }
      }
    }
  }
}