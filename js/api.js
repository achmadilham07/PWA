var BASE_API = "https://api.football-data.org/v2/";
var to_matchs = `${BASE_API}matches/`;
var to_teams = `${BASE_API}teams/`;
var to_players = `${BASE_API}players/`;
var id_liga = 2001;
var to_latest_matches = `${BASE_API}teams/$id/matches?status=FINISHED&competitions=${id_liga}`;
var to_upcoming_matches = `${BASE_API}teams/$id/matches?status=SCHEDULED&competitions=${id_liga}`;
var to_standing_matches = `${BASE_API}competitions/${id_liga}/standings?standingType=TOTAL`;

// fetch data from url
var fetch_api = url => {
  console.log(url);
  return fetch(url, {
    headers: {
      'X-Auth-Token': 'ed43e0bf07ab4c69b49a349b43d4af89'
    }
  })
}
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

// Blok kode untuk melakukan request data json
// Get Latest Matches
function getLatestMatches(id ='86') {
  to_latest_matches = to_latest_matches.replace('$id', id)
  if ('caches' in window) {
    caches.match(to_latest_matches).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          getLatestMatchesJson(data);
        });
      }
    });
  }

  fetch_api(to_latest_matches)
    .then(status)
    .then(json)
    .then(function (data) {
      getLatestMatchesJson(data)
    })
    .catch(function (err) {
      error(err)
      document.getElementById('latest-content').innerHTML = 'None';      
    });
}

// Get Upcoming Matches
function getUpcomingMatches(id = '86') {
  to_upcoming_matches = to_upcoming_matches.replace('$id', id)
  if ('caches' in window) {
    caches.match(to_upcoming_matches).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          getUpcomingMatchesJson(data);
        });
      }
    });
  }

  fetch_api(to_upcoming_matches)
    .then(status)
    .then(json)
    .then(function (data) {
      getUpcomingMatchesJson(data)
    })
    .catch(function (err) {
      error(err)
      document.getElementById('upcoming-content').innerHTML = 'None';
    });
}

// Get Standing Matches
function getStandingMatches() {
  if ('caches' in window) {
    caches.match(to_standing_matches).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          getStandingMatchesJson(data);
        });
      }
    });
  }

  fetch_api(to_standing_matches)
    .then(status)
    .then(json)
    .then(function (data) {
      getStandingMatchesJson(data)
    })
    .catch(error);
}

// Get Detail Team By ID
function getDetailTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var url = to_teams + idParam;
    if ("caches" in window) {
      caches.match(url).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            getDetailTeamByIdJson(data);
            setTableSquad(data);
            resolve(data);
          });
        }
      });
    }

    fetch_api(url)
      .then(status)
      .then(json)
      .then(function (data) {
        getDetailTeamByIdJson(data);
        setTableSquad(data);
        resolve(data);
      })
      .catch(error);
  });
}

// Show Latest and Upcoming Matches By ID
function getLatestAndUpcomingMatchesById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    getLatestMatches(idParam);
    getUpcomingMatches(idParam);
    
  });
}

// Get Detail Player Team By ID
function getDetailPlayerTeamById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    var url = to_players + idParam;

    if ("caches" in window) {
      caches.match(url).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            getDetailPlayerTeamByIdJson(data);
            
            resolve(data);
          });
        }
      });
    }

    fetch_api(url)
      .then(status)
      .then(json)
      .then(function (data) {
        getDetailPlayerTeamByIdJson(data);
        
        resolve(data);
      })
      .catch(error);
  });
}

// Get Detail Match By ID
function getDetailMatchById() {
  return new Promise(function (resolve, reject) {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    if ('caches' in window) {
      caches.match(to_matchs + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            getDetailMatchByIdJSON(data);
            resolve(data)
          });
        }
      });
    }
    fetch_api(to_matchs + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        getDetailMatchByIdJSON(data);
        resolve(data);
      })
      .catch(error);
  });
}