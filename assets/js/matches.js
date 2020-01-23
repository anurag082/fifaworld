// fetch('https://worldcup.sfg.io/matches')
// .then(function (response) {
//     return response.json();
// })
// .then(function (data) {
//     appendData(data);
// })
// .catch(function (err) {
//     console.log('error: ' + err);
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
var match =document.querySelector(".match .wrapper")         
refereeNames=0;           
for(var j=0;j<10;j++) { // this loops creates a section which contains h2(team1 vs team 2) and ul(match detail)
// Creating Section element
var data_container = document.createElement("section");
data_container.setAttribute("class","match-deatils");
match.appendChild(data_container);
var match_deatils = document.querySelectorAll(".match-deatils");
// Creating h2 element
var hometeam = document.createElement("h2")
hometeam.innerHTML= data[j].home_team_country + " " + "VS" + " " + data[j].away_team_country+ " " ;
match_deatils[j].appendChild(hometeam);
var winner = document.createElement("span");
winner.innerHTML = "Winner" + " " + data[j].winner ;
hometeam.appendChild(winner);
//Creating ul element
var matchdeatil = document.createElement("ul")
matchdeatil.setAttribute("class","matchdetail")
match_deatils[j].appendChild(matchdeatil);
var datacontainer = document.querySelectorAll(".matchdetail");
for(var i = 0;i<1;i++) { // this loops creates and gets the match details and statistics      
//====================Location====================================
var location = document.createElement("li");
location.innerHTML = "Location :" + " " + data[j].location;
datacontainer[j].appendChild(location);
//====================Attendance====================================
var attendance = document.createElement("li");
attendance.innerHTML = "Attendance :" + " "  + data[j].attendance;
datacontainer[j].appendChild(attendance);
//====================Team Name======================================
var team = document.createElement("li");
team.setAttribute("class","teamName");
datacontainer[j].appendChild(team);
var team_name = document.createElement("a");
var teamName = document.querySelectorAll(".teamName");
teamName[j].appendChild(team_name);
var teaminfo = data[j].home_team_country;
team_name.innerHTML = "Hoisting Team :" + teaminfo;
team_name.setAttribute("href","teamDetails.html" +"#"+teaminfo);
team_name.setAttribute("target","_blank");
team_name.setAttribute("title",data[j].home_team_country);
//====================Date & Time======================================
var time = document.createElement("li");
time.innerHTML = "Date and Time :" + " "  + data[j].datetime;
datacontainer[j].appendChild(time);
//====================Referee========================================
var referee = document.createElement("li");
referee.setAttribute("class","referee")
var referee_names=[];
for(var p=0;p<data[i].officials.length;p++) { // this loop gets the name of official from json                
  referee_names[p] =  data[j].officials[refereeNames];
  datacontainer[j].appendChild(referee);
  refereeNames++;
}
referee.innerHTML= "Referee's : " + " " +referee_names;
//====================Home Team Statistics============================
var home_statistics = document.createElement("li");
home_statistics.setAttribute("class","home-statistics")
  var homestatistics = document.createElement("li");
  homestatistics.setAttribute("class","homestatistics")
for (z in data[j].home_team_statistics) { 
  if(z==="starting_eleven") {
      break;
    } 
    home_statistics.innerHTML += z + "<br>" ;
    homestatistics.innerHTML +=   data[j].home_team_statistics[z] + "<br>" ;                   
}              
datacontainer[j].appendChild(home_statistics);
datacontainer[j].appendChild(homestatistics);
//====================Away Team Statistics=============================
var away_statistics = document.createElement("li");
away_statistics.setAttribute("class","away-statistics")
  var awaystatistics = document.createElement("li");
  awaystatistics.setAttribute("class","awaystatistics")
for (z in data[j].away_team_statistics) {
  if(z==="starting_eleven") {
      break;
    } 
    awaystatistics.innerHTML +=   data[j].away_team_statistics[z] + "<br>" ;                   
}              
datacontainer[j].appendChild(awaystatistics);
}
refereeNames=0;             
}
}

//========== Accordian================
$(function() {  
  $(document).on('click', 'h2', function(e) {
     e.preventDefault();
    $(".matchdetail").slideUp(1000), $(this).next().is(":visible") || $(this).next().slideDown(1000),
    e.stopPropagation()      
   });
});