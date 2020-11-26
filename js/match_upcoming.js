function getUpcomingMatchesJson(data) {
  var UpcomingHTML = ''
  data.matches.forEach(function (upcoming) {
    upcoming = JSON.parse(JSON.stringify(upcoming).replace(/http:/g, 'https:'));

    UpcomingHTML += `

      <div class="row clear-padding-heading">
        <div class="col s12 m12">
          <a class="black-text" href="./match_detail.html?id=${upcoming.id}&typed=Upcoming">
            <div class="card hoverable blue lighten-5">
              <div class="card-content">

                <div class="row valign-wrapper">
                  <div class="col s5 right-align">
                    <h6 class="clear-padding-heading"><strong>${upcoming.homeTeam.name}</strong></h6>
                  </div>
                  <div class="col s2">
                    <h5 class="clear-padding-heading">VS</h5>
                  </div>
                  <div class="col s5 left-align">
                    <h6 class="clear-padding-heading"><strong>${upcoming.awayTeam.name}</strong></h6>
                  </div>
                </div>

                <div class="row">
                  <div class="col s12"><h7 class="clear-padding-heading">Competition Name : <strong>${upcoming.competition.name}</strong></h7></div>
                </div>

                <div class="row">
                  <div class="col s12"><h7 class="clear-padding-heading">Date : <strong>${convertDate(new Date(upcoming.utcDate))}</strong></h7></div>
                </div>

              </div>
            </div>
          </a>
        </div>
      </div>
    
    `

  });
  document.getElementById("upcoming-content").innerHTML = UpcomingHTML;
}