function getLatestMatchesJson(data) {
  var LatestHTML = ''
  data.matches.forEach(function (latest) {
    latest = JSON.parse(JSON.stringify(latest).replace(/http:/g, 'https:'));
    
    LatestHTML += `

    <div class="row clear-padding-heading">
      <div class="col s12 m12">
        <a class="black-text" href="./match_detail.html?id=${latest.id}&typed=Latest">
          <div class="card hoverable" >
            <div class="card-content" >

              <div class="row valign-wrapper">
                <div class="col s5 right-align">
                  <h6 class="clear-padding-heading" data-position="top" 
            data-tooltip="This is some extra information in a tooltip placement top"><strong>${latest.homeTeam.name}</strong></h6>
                </div>
                <div class="col s2">
                  <h6 class="clear-padding-heading">${latest.score.fullTime.homeTeam} : ${latest.score.fullTime.awayTeam}</h6>
                </div>
                <div class="col s5 left-align">
                  <h6 class="clear-padding-heading"><strong>${latest.awayTeam.name}</strong></h6>
                </div>
              </div>

              <div class="row">
                <div class="col s12"><h7 class="clear-padding-heading">Competition Name : <strong>${latest.competition.name}</strong></h7></div>
              </div>

              <div class="row">
                <div class="col s12"><h7 class="clear-padding-heading">Date : <strong>${convertDate(new Date(latest.utcDate))}</strong></h7></div>
              </div>

            </div>
          </div>
        </a>
      </div>
    </div>
        
    `
    
  });
  document.getElementById("latest-content").innerHTML = LatestHTML;

}