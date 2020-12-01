function getDetailTeamByIdJson(data) {
  data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));

  var website_data = `<a href="${data.website}" target="_blank"><h6 class="blue-text">${data.website}</h6></a>`;
  var email_data = `<a href="mailto:${data.email}" target="_blank"><h6 class="blue-text">${data.email}</h6></a>`;
  var btn_data = `
    <a href="./latest_upcoming_match.html?id=${data.id}&title=${data.name}">
      <h6 class="orange-text valign-wrapper clear-padding-heading">Latest and Upcoming Matches on ${data.name}</h6>
    </a>
    `;

  document.getElementById("a-namaklub").innerHTML = data.name;
  document.getElementById("a-logoklub").src = data.crestUrl;
  document.getElementById("a-name").innerHTML = data.name;
  document.getElementById("a-address").innerHTML = data.address;
  document.getElementById("a-phone").innerHTML = data.phone;
  document.getElementById("a-website").innerHTML = website_data;
  document.getElementById("a-email").innerHTML = email_data;
  document.getElementById("a-venue").innerHTML = data.venue;
  document.getElementById("a-preloader").innerHTML = '';

  document.getElementById("link-to-next").innerHTML = btn_data;

}

function setTableSquad(data){

  var tableSquadHTML  = "";
  var dataSquadHTML = "";
  data.squad.forEach(function (squad, index) {
    dataSquadJSON = squad;
    dataSquadHTML += `

    <tr>
      <td><a href="./player_detail.html?id=${squad.id}&name_team=${data.name}" class="blue-text"> ${squad.name}</a></td>
      <td>${squad.position}</td>
    </tr>
      
    `
  });
  tableSquadHTML += `
    <table class="highlight responsive-table">
      <thead>
        <tr>
          <td><strong>Name</strong></td>
          <td><strong>Position</strong></td>
        </tr>
      </thead>
      <tbody>${dataSquadHTML}</tbody>
    </table>
  `
  
  document.getElementById("squad").innerHTML = tableSquadHTML;
}

function resultTeamFav(data) {
  var dataTeamFavHtml = ''

  if(data.length != 0){
    data.forEach(function (team) {
      dataTeamFavHtml += `
        <div class="col xl6 l6 m12 s12">
          <a class="black-text" href="./pages/team_detail.html?id=${team.id}">
            <div class="card hoverable">
              <div class="card-content blue lighten-5">
                <div center-align>
                  <h5 class="center-align black-text">
                    ${team.name}
                  </h5>          
                </div>
              </div>
            </div>
          </a>
        </div>
      `
    });
  } else {
    dataTeamFavHtml = `
      <div class="col xl12 l12 m12 s12 center-align">
        <h5>No Favorite Team</h5>
      </div>
    `;
  }

  // <span>
  //   <a class="black-text" href="./pages/team_detail.html?id=${team.id}">${team.name}</a>
  // </span>

  document.getElementById("a-favorit-load").innerHTML = dataTeamFavHtml;
}