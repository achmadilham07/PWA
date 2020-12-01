var convertDate = date => {
  const namaBulan = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
  var jam = date.getHours();
  var menit = date.getMinutes();
  var ampm = jam >= 12 ? 'pm' : 'am';
  jam = jam % 12;
  jam = jam ? jam : 12;
  menit = menit < 10 ? '0' + menit : menit;
  var strTime = jam + ':' + menit + ' ' + ampm;
  return strTime;
}

function checkData(storeName, id) {
  return new Promise(function (resolve, reject) {
    databasePromise(idb)
      .then(function (db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function (data) {
        if (data != undefined) {
          resolve("Data favorit")
        } else {
          reject("Bukan data favorit")
        }
      });
  });
}

function deleteDatafav(storeName, data) {
  databasePromise(idb).then(function (db) {
    var tx = db.transaction(storeName, 'readwrite');
    var store = tx.objectStore(storeName);
    store.delete(data);
    return tx.complete;
  }).then(function () {
    console.log('Item deleted');
    document.getElementById("iconFav").textContent = "favorite_border";
    M.toast({
      html: 'Data berhasil dihapus dari Favorit!'
    });
  }).catch(function () {
    M.toast({
      html: 'Terjadi Kesalahan'
    });
  });
}

function createDataFav(dataType, data) {
  var storeName = "";
  var dataToCreate = {}
  if (dataType === "team") {
    storeName = "team_favorit"
    dataToCreate = {
      id: data.id,
      name: data.name,
      crestUrl: data.crestUrl,
      address: data.address,
      phone: data.phone,
      website: data.website,
      email: data.email,
      venue: data.venue,
      squad: data.squad
    }
  } else if (dataType === "player") {
    storeName = "player_favorit";
    dataToCreate = {
      id: data.id,
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      countryOfBirth: data.countryOfBirth,
      nationality: data.nationality,
      position: data.position
    }
  } else if (dataType === "match") {
    storeName = "match_favorit"
    dataToCreate = {
      id: data.match.id,
      head2head: {
        numberOfMatches: data.head2head.numberOfMatches,
        homeTeam: {
          wins: data.head2head.homeTeam.wins,
          draws: data.head2head.homeTeam.draws,
          losses: data.head2head.homeTeam.losses
        },
        awayTeam: {
          wins: data.head2head.awayTeam.wins,
          draws: data.head2head.awayTeam.draws,
          losses: data.head2head.awayTeam.losses
        }
      },
      match: {
        venue: data.match.venue,
        matchday: data.match.matchday,
        score: {
          fullTime: {
            homeTeam: data.match.score.fullTime.homeTeam,
            awayTeam: data.match.score.fullTime.awayTeam
          }
        },
        utcDate: data.match.utcDate,
        status: data.match.status,
        competition: {
          name: data.match.competition.name
        },
        homeTeam: {
          name: data.match.homeTeam.name
        },
        awayTeam: {
          name: data.match.awayTeam.name
        }
      }
    }
  }

  databasePromise(idb).then(db => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(dataToCreate);

    return tx.complete;
  }).then(function () {
    console.log('Team berhasil disimpan.');
    document.getElementById("iconFav").textContent = "favorite";
    M.toast({
      html: 'Berhasil Di Favoritkan!'
    });
  }).catch(function () {
    M.toast({
      html: 'Terjadi Kesalahan'
    });
  });
}

function getSavedDataById(dataType) {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = Number(urlParams.get("id"));

  if (dataType === "team") {
    getDataById("team_favorit", idParam).then(function (team) {
      getDetailTeamByIdJson(team)
      setTableSquad(team)
    })
  } else if (dataType === "player") {
    getDataById("player_favorit", idParam).then(function (player) {
      getDetailPlayerTeamByIdJson(player);
    });
  } else if (dataType === "match") {
    getDataById("match_favorit", idParam).then(function (match) {
      getDetailMatchByIdJSON(match);
    });
  }
}

function getDataById(storeName, id) {
  return new Promise(function (resolve, reject) {
    databasePromise(idb)
      .then(function (db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function readDataFavHtml(dataType) {
  if (dataType === "fav-team") {
    getAllData("team_favorit").then(function (data) {
      resultTeamFav(data);
    });
  } else if (dataType === "fav-player") {
    getAllData("player_favorit").then(function (data) {
      resultPlayerFav(data);
    });
  } else if (dataType === "fav-match") {
    getAllData("match_favorit").then(function (data) {
      resultMatchFav(data);
    });
  }
}

function getAllData(storeName) {
  return new Promise(function (resolve, reject) {
    databasePromise(idb)
      .then(function (db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.getAll();
      })
      .then(function (data) {
        resolve(data);
      });
  });
}