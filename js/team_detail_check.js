document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var id = Number(urlParams.get("id"));
  var isFavorit = false;
  
  checkData("team_favorit", id).then((msg) => {
    console.log("statusData: Resolve = " + msg)
    document.getElementById("iconFav").textContent = "favorite"
    getSavedDataById("team")
    isFavorit = true
  }).catch((msg) => {
    console.log("statusData: Reject = " + msg)
    document.getElementById("iconFav").textContent = "favorite_border"
    getDetailTeamById()
    isFavorit = false
  })

  var iconFav = document.getElementById("iconFav");

  iconFav.onclick = function () {
    console.log("Tombol Favorit di klik.");
    if (isFavorit) {
      deleteDatafav("team_favorit", id);
      isFavorit = false
    } else {
      items = getDetailTeamById();
      items.then(function (team) {
        createDataFav("team", team);
      });
      isFavorit = true
    }
  };
});