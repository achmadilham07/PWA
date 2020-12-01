document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var id = Number(urlParams.get("id"));
  var isFavorit = false;
  
  checkData("player_favorit", id).then((msg) => {
    console.log("statusData: Resolve = " + msg)
    document.getElementById("iconFav").textContent = "favorite"
    getSavedDataById("player")
    isFavorit = true
  }).catch((msg) => {
    console.log("statusData: Reject = " + msg)
    document.getElementById("iconFav").textContent = "favorite_border"
    getDetailPlayerTeamById()
    isFavorit = false
  })

  var iconFav = document.getElementById("iconFav");

  iconFav.onclick = function () {
    console.log("Tombol Favorit di klik.");
    if (isFavorit) {
      deleteDatafav("player_favorit", id);
      isFavorit = false
    } else {
      items = getDetailPlayerTeamById();
      items.then(function (team) {
        createDataFav("player", team);
      });
      isFavorit = true
    }
  };
});