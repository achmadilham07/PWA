function getDetailPlayerTeamByIdJson(data) {
  document.getElementById("a-name").innerHTML = data.name;

  document.getElementById("a-dateOfBirth").innerHTML = data.dateOfBirth;
  document.getElementById("a-countryOfBirth").innerHTML = data.countryOfBirth;
  document.getElementById("a-nationality").innerHTML = data.nationality;
  document.getElementById("a-position").innerHTML = data.position;
  document.getElementById("a-preloader").innerHTML = '';
}

function resultPlayerFav(data) {
  var dataPlayerFavHtml = ''
  data.forEach(function (player) {
    dataPlayerFavHtml += `

     <div class="col xl6 l6 m12 s12">
        <a class="black-text" href="./pages/player_detail.html?id=${player.id}&name_team=${player.name}">
          <div class="card hoverable">
            <div class="card-content blue lighten-5">
              <div center-align>
                <h5 class="center-align black-text">
                  ${player.name}
                </h5>          
              </div>
            </div>
          </div>
        </a>
      </div>
    `
  });

  document.getElementById("a-favorit-load").innerHTML = dataPlayerFavHtml;
}