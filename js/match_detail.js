function getDetailMatchByIdJSON(data) {
  console.log(data)
  var dataMatch = data.match;
  var dataHead2Head = data.head2head;
  var matchDay = dataMatch.matchday;

  var homeTeamName = dataMatch.homeTeam.name;
  var awayTeamName = dataMatch.awayTeam.name;
  var numberOfMatches = dataHead2Head.numberOfMatches;

  var homeTeamWins = dataHead2Head.homeTeam.wins;
  var awayTeamWins = dataHead2Head.awayTeam.wins;
  var homeTeamDraws = dataHead2Head.homeTeam.draws;
  var awayTeamDraws = dataHead2Head.awayTeam.draws;
  var homeTeamLosses = dataHead2Head.homeTeam.losses;
  var awayTeamLosses = dataHead2Head.awayTeam.losses;
  var venue = dataMatch.venue;

  var homeTeamScore = dataMatch.score.fullTime.homeTeam
  var awayTeamScore = dataMatch.score.fullTime.awayTeam
  
  var competitionName = dataMatch.competition.name

  var urlParams = new URLSearchParams(window.location.search);
  var typed = (urlParams.get("typed"));
  if (typed == "Latest"){
    document.getElementById("a-scoreOrVs").innerHTML = `<strong>${homeTeamScore}</strong> : <strong>${awayTeamScore}</strong>`;
  } else if (typed == "Upcoming") {
    document.getElementById("a-scoreOrVs").innerHTML = `<strong>VS</strong>`;
  }

  document.getElementById("a-competitionName").innerHTML = `Competition Name : <strong>${competitionName}</strong>`;
  document.getElementById("a-matchDay").innerHTML = `Matchday : ${matchDay}`;
  document.getElementById("a-homeTeamName").innerHTML = `<strong>${homeTeamName}</strong>`;
  document.getElementById("a-awayTeamName").innerHTML = `<strong>${awayTeamName}</strong>`;
  document.getElementById("a-numberOfMatches").innerHTML = `Number Of Matches: <strong>${numberOfMatches}</strong>`;
  document.getElementById("a-homeTeamWins").innerHTML = homeTeamWins;
  document.getElementById("a-awayTeamWins").innerHTML = awayTeamWins;
  document.getElementById("a-homeTeamDraws").innerHTML = homeTeamDraws;
  document.getElementById("a-awayTeamDraws").innerHTML = awayTeamDraws;
  document.getElementById("a-homeTeamLosses").innerHTML = homeTeamLosses;
  document.getElementById("a-awayTeamLosses").innerHTML = awayTeamLosses;
  document.getElementById("a-venue").innerHTML = `Venue: <strong>${venue}</strong>`;
  document.getElementById("a-preloader").innerHTML = '';
}

function resultMatchFav(data) {
  var dataMatchFavHtml = ''
  data.forEach(function (match) {
    var typed = '';
    if (match.match.status == "FINISHED"){
      typed = "Latest";
    } else if (match.match.status == "SCHEDULED") {
      typed = "Upcoming";
    }

    var matches = match.match;

    var scoreOrVs = "";
    if (matches.score.fullTime.homeTeam == null || matches.score.fullTime.awayTeam == null){
      scoreOrVs = `VS`
    } else {
      scoreOrVs = `${matches.score.fullTime.homeTeam} : ${matches.score.fullTime.awayTeam}`
    }

    dataMatchFavHtml += `

      <div class="col xl6 l12 m12 s12 clear-padding-heading center-align">
        <a class="black-text" href="./pages/match_detail.html?id=${match.id}&typed=${typed}">
          <div class="card hoverable" >
            <div class="card-content blue lighten-5" >

              <div class="row valign-wrapper">
                <div class="col s5 right-align">
                  <h6 class="clear-padding-heading" data-position="top" 
            data-tooltip="This is some extra information in a tooltip placement top"><strong>${matches.homeTeam.name}</strong></h6>
                </div>
                <div class="col s2">
                  <h6 class="clear-padding-heading">${scoreOrVs}</h6>
                </div>
                <div class="col s5 left-align">
                  <h6 class="clear-padding-heading"><strong>${matches.awayTeam.name}</strong></h6>
                </div>
              </div>

              <div class="row clear-padding-heading">
                <div class="col s12"><h7 class="clear-padding-heading">Competition Name : <strong>${matches.competition.name}</strong></h7></div>
              </div>

            </div>
          </div>
        </a>
      </div>
    

    `
  });

  // <div class="col s12 m6 l6">
  //   <div class="card">
  //     <div class="card-content">
  //       <div center-align>
  //         <h5 class="center-align">Matchday : ${match.match.matchday}</h5>
  //         <div class="center-align">Kick Off : ${convertDate(new Date(match.match.utcDate))}</div>

  //         <div class="row" style="margin:20px">
  //           <div class="col s5 truncate right-align">
  //             <span class="blue-text text-darken-2">  ${match.match.homeTeam.name}</span>
  //           </div>
  //           <div class="col s2 ">
  //             VS
  //                       </div>
  //           <div class="col s5 truncate left-align">
  //             <span class="blue-text text-darken-2">  ${match.match.awayTeam.name}</span>
  //           </div>
  //         </div>
  //         <div class="center-align">
  //           <a class="blue waves-effect waves-light btn" href="./pages/match_detail.html?id=${match.id}&typed=${typed}">Lihat Detail</a>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // </div>

  document.getElementById("a-favorit-load").innerHTML = dataMatchFavHtml;
}