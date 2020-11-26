document.addEventListener("DOMContentLoaded", function () {
  var urlParams = new URLSearchParams(window.location.search);
  var id = Number(urlParams.get("id"));
  var isFavorit = false;

  checkData("match_favorit", id).then((msg) => {
    console.log("statusData: Resolve = " + msg)
    document.getElementById("iconFav").textContent = "favorite"
    getSavedDataById("match")
    isFavorit = true
  }).catch((msg) => {
    console.log("statusData: Reject = " + msg)
    document.getElementById("iconFav").textContent = "favorite_border"
    getDetailMatchById()
    isFavorit = false
  })

  var iconFav = document.getElementById("iconFav");

  iconFav.onclick = function () {
    console.log("Tombol Favorit di klik.");
    if (isFavorit) {
      deleteDatafav("match_favorit", id);
      isFavorit = false
    } else {
      items = getDetailMatchById();
      items.then(function (team) {
        createDataFav("match", team);
      });
      isFavorit = true
    }
  };
});