const base_url = `https://api.football-data.org/v2/`;
const header_options = {
  headers: {
    'X-Auth-Token': 'cf02b37a12be47bd9c51e1c3db3e1d5f'
  }
};

// Mengecek kode status dari response
const status = response => {

  if (response.status !== 200) {
    console.log(`Error: ${response.status}`);

    // Membuat blok catch
    return Promise.reject(new Error(response.statusText));
  } else {
    // Membuat blok then
    return Promise.resolve(response);
  }
}

// blok parsing json
const json = response => response.json();

// Handle error di blok catch
const error = error => {
  console.log(`Error: ${error}`);
}

const getTeams = () => {

  if ('caches' in window) {
    caches.match(`${base_url}competitions/2021/teams`)
      .then(response => {
        if (response) {
          response.json()
            .then(data => {
              let teamsHTML = ``;
              data.teams.forEach(team => {
                teamsHTML += `
                <div class="card">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="${team.crestUrl}" alt="Logo Tim"/>
                  </div>
                  <div class="card-content">
                    <span class="card-title truncate"><b>${team.name}</b></span>
                  </div>
                  <div class="card-action left-align">
                    <a href="./detailTeam.html?id=${team.id}">Details</a>
                  </div>
                </div>
              `;
              })
              document.getElementById('loader').style.display = 'none';
              document.getElementById('teams').innerHTML = teamsHTML;
            })
        }
      })
  }

  // Untuk mendapatkan data-data tim liga inggris
  fetch(`${base_url}competitions/2021/teams`, header_options)
    .then(status)
    .then(json)
    .then(data => {

      let teamsHTML = ``;
      data.teams.forEach(team => {
        team = JSON.parse(JSON.stringify(team).replace(/https:/g, 'http:'));

        teamsHTML += `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${team.crestUrl}" />
            </div>
            <div class="card-content">
              <span class="card-title truncate"><b>${team.name}</b></span>
            </div>
            <div class="card-action left-align">
              <a href="./detailTeam.html?id=${team.id}">Details</a>
            </div>
          </div>
        `;
      });
      document.getElementById('loader').style.display = 'none';
      document.getElementById('teams').innerHTML = teamsHTML;
    })
    .catch(error);
}

// fungsi untu mengambil data team berdasarkan id
const getTeamsById = () => {
  return new Promise((resolve, reject) => {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get('id');

    if ('caches' in window) {
      caches.match(`${base_url}teams/${idParam}`)
        .then(response => {
          if (response) {
            response.json()
              .then(data => {
                let keeperList = ``;
                let defenderList = ``;
                let midfielderList = ``;
                let attackerList = ``;
                let coachName = ``;
                data.squad.forEach(player => {
                  if (player.role === "COACH") {
                    coachName = player.name;
                  }

                  if (player.position === "Goalkeeper") {
                    keeperList += `
                  <p>${player.name}</p>
                `;
                  }

                  if (player.position === "Defender") {
                    defenderList += `
                  <p>${player.name}</p>
                `;
                  }

                  if (player.position === "Midfielder") {
                    midfielderList += `
                  <p>${player.name}</p>
                `;
                  }

                  if (player.position === "Attacker") {
                    attackerList += `
                  <p>${player.name}</p>
                `;
                  }


                })

                let detailTeamsHTML = `
              <div class="row">
                <div class="col s12 m6 offset-m3">
                  <div class="card">
                    <div class="card-image">
                      <img src="${data.crestUrl}" />
                    </div>
                    <div class="card-content center-align">
                      <div class="card-title"><b>${data.name}</b></div>
                      <a>${data.website === null ? "-" : data.website}</a>
                    </div>
                    <div class="card-action">
                      <p>Stadion: ${data.venue}</p>
                      <p>Tahun berdiri: ${data.founded}</p>
                      <p>Alamat: ${data.address}</p>
                      <p>Telepon: ${data.phone === null ? "-" : data.phone}</p>
                      <p>Email: ${data.email === null ? "-" : data.email}</p>
                    </div>
                    <div class="card-action center-align">
                      <div class="card-title">
                        <b>Coach</b>
                      </div>
                      <p>${coachName}</p>
                    </div>
                    <div class="card-action center-align">
                      <div class="card-title">
                        <b>Kiper</b>
                      </div>
                      ${keeperList}
                    </div>
                    <div class="card-action center-align">
                      <div class="card-title">
                        <b>Pemain Belakang</b>
                      </div>
                      <p>${defenderList}</p>
                    </div>
                    <div class="card-action center-align">
                      <div class="card-title">
                        <b>Gelandang</b>
                      </div>
                      <p>${midfielderList}</p>
                    </div>
                    <div class="card-action center-align">
                      <div class="card-title">
                        <b>Penyerang</b>
                      </div>
                      <p>${attackerList}</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
                document.getElementById("body-content").innerHTML = detailTeamsHTML;
                resolve(data);
              })
          }
        })
    }

    fetch(`${base_url}teams/${idParam}`, header_options)
      .then(status)
      .then(json)
      .then(data => {

        let keeperList = ``;
        let defenderList = ``;
        let midfielderList = ``;
        let attackerList = ``;
        let coachName = ``;
        data.squad.forEach(player => {
          if (player.role === "COACH") {
            coachName = player.name;
          }

          if (player.position === "Goalkeeper") {
            keeperList += `
            <p>${player.name}</p>
          `;
          }

          if (player.position === "Defender") {
            defenderList += `
            <p>${player.name}</p>
          `;
          }

          if (player.position === "Midfielder") {
            midfielderList += `
            <p>${player.name}</p>
          `;
          }

          if (player.position === "Attacker") {
            attackerList += `
            <p>${player.name}</p>
          `;
          }


        })

        let detailTeamsHTML = `
        <div class="row">
          <div class="col s12 m6 offset-m3">
            <div class="card">
              <div class="card-image">
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content center-align">
                <div class="card-title"><b>${data.name}</b></div>
                <a>${data.website === null ? "-" : data.website}</a>
              </div>
              <div class="card-action">
                <p>Stadion: ${data.venue}</p>
                <p>Tahun berdiri: ${data.founded}</p>
                <p>Alamat: ${data.address}</p>
                <p>Telepon: ${data.phone === null ? "-" : data.phone}</p>
                <p>Email: ${data.email === null ? "-" : data.email}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Coach</b>
                </div>
                <p>${coachName}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Kiper</b>
                </div>
                ${keeperList}
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Pemain Belakang</b>
                </div>
                <p>${defenderList}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Gelandang</b>
                </div>
                <p>${midfielderList}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Penyerang</b>
                </div>
                <p>${attackerList}</p>
              </div>
            </div>
          </div>
        </div>
      `;
        document.getElementById("body-content").innerHTML = detailTeamsHTML;
        resolve(data);
      })
  })
}

const getSavedTeams = () => {
  getAll().then(teams => {

    let teamsHTML = ``;
    if(teams.length < 1){
      teamsHTML += `
        <p>Anda belum memiliki tim favorit</p>
      `
    }
    else{
      teams.forEach(team => {
        team = JSON.parse(JSON.stringify(team).replace(/https:/g, 'http:'));
        console.log(team.crestUrl);
        teamsHTML += `
            <div class="card">
              <div class="card-image waves-effect waves-block waves-light">
                <img src="${team.crestUrl}" />
              </div>
              <div class="card-content">
                <span class="card-title truncate"><b>${team.name}</b></span>
              </div>
              <div class="card-action left-align">
                <a href="./detailTeam.html?id=${team.id}&saved=true">Details</a>
              </div>
            </div>
          `;
      });
    }
    document.getElementById('loader').style.display = 'none';
    document.getElementById('saved_teams').innerHTML = teamsHTML;

  })
}

const getSavedTeamById = () => {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get('id');
  // console.log(idParam);

  getById(parseInt(idParam)).then(data => {
    let keeperList = ``;
    let defenderList = ``;
    let midfielderList = ``;
    let attackerList = ``;
    let coachName = ``;
    // console.log(data);
    data.squad.forEach(player => {
      if (player.role === "COACH") {
        coachName = player.name;
      }

      if (player.position === "Goalkeeper") {
        keeperList += `
            <p>${player.name}</p>
          `;
      }

      if (player.position === "Defender") {
        defenderList += `
            <p>${player.name}</p>
          `;
      }

      if (player.position === "Midfielder") {
        midfielderList += `
            <p>${player.name}</p>
          `;
      }

      if (player.position === "Attacker") {
        attackerList += `
            <p>${player.name}</p>
          `;
      }


    })

    let detailTeamsHTML = `
        <div class="row">
          <div class="col s12 m6 offset-m3">
            <div class="card">
            
              <div class="card-image">
              
                <img src="${data.crestUrl}" />
              </div>
              <div class="card-content center-align">
                <div class="card-title"><b>${data.name}</b></div>
                <a>${data.website === null ? "-" : data.website}</a>
              </div>
              <div class="card-action">
                <p>Stadion: ${data.venue}</p>
                <p>Tahun berdiri: ${data.founded}</p>
                <p>Alamat: ${data.address}</p>
                <p>Telepon: ${data.phone === null ? "-" : data.phone}</p>
                <p>Email: ${data.email === null ? "-" : data.email}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Coach</b>
                </div>
                <p>${coachName}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Kiper</b>
                </div>
                ${keeperList}
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Pemain Belakang</b>
                </div>
                <p>${defenderList}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Gelandang</b>
                </div>
                <p>${midfielderList}</p>
              </div>
              <div class="card-action center-align">
                <div class="card-title">
                  <b>Penyerang</b>
                </div>
                <p>${attackerList}</p>
              </div>
            </div>
          </div>
        </div>
      `;
      document.getElementById("body-content").innerHTML = detailTeamsHTML;
  })
}

// Fungsi untuk mendapatkan data-data klasemen liga inggris
const getStandings = () => {

  if('caches' in window){
    caches.match(`${base_url}competitions/2021/standings?standingType=TOTAL`)
    .then(response => {
      if(response){
        response.json()
        .then(data => {
          let standingHTML = ``;

      data.standings.forEach(standing => {
        let standingList = ``;

        standing.table.forEach(team => {
          // console.log(team.team.id);
          standingList += `
          <tr>
            <td class="center-align">${team.position}</td>
            <td>
              <a href="../detailTeam.html?id=${team.team.id}">      
                <img width="20" height="20" src="${team.team.crestUrl}">
              </a>
            </td>
            <td class="center-align">${team.playedGames}</td>
            <td class="center-align">${team.won}</td>
            <td class="center-align">${team.draw}</td>
            <td class="center-align">${team.lost}</td>
            <td class="center-align">${team.points}</td>
            <td class="center-align">${team.goalsFor}</td>
            <td class="center-align">${team.goalsAgainst}</td>
          </tr>
        `;
        })

        standingHTML = `
          <div class="card">
              <table class="responsive-table centered highlight">
                <thead>
                  <tr>
                    <th class="center-align">Position</th>
                    <th class="center-align">Team</th>
                    <th class="center-align">Played</th>
                    <th class="center-align">Won</th>
                    <th class="center-align">Draw</th>
                    <th class="center-align">Lost</th>
                    <th class="center-align">Points</th>
                    <th class="center-align">Goals For</th>
                    <th class="center-align">Goals Against</th>
                  </tr>
                </thead>
                <tbody>
                  ${standingList}
                </tbody>
              </table>
          </div>
        `;
      })
      document.getElementById('loader').style.display = 'none';
      document.getElementById('standings').innerHTML = standingHTML;
        })
      }
    })
  }

  fetch(`${base_url}competitions/2021/standings?standingType=TOTAL`, header_options)
    .then(status)
    .then(json)
    .then(data => {

      let standingHTML = ``;

      data.standings.forEach(standing => {
        let standingList = ``;

        standing.table.forEach(team => {
          // console.log(team.team.id);
          standingList += `
          <tr>
            <td class="center-align">${team.position}</td>
            <td>
              <a href="../detailTeam.html?id=${team.team.id}">      
                <img width="20" height="20" src="${team.team.crestUrl}">
              </a>
            </td>
            <td class="center-align">${team.playedGames}</td>
            <td class="center-align">${team.won}</td>
            <td class="center-align">${team.draw}</td>
            <td class="center-align">${team.lost}</td>
            <td class="center-align">${team.points}</td>
            <td class="center-align">${team.goalsFor}</td>
            <td class="center-align">${team.goalsAgainst}</td>
          </tr>
        `;
        })

        standingHTML = `
          <div class="card">
              <table class="responsive-table centered highlight">
                <thead>
                  <tr>
                    <th class="center-align">Position</th>
                    <th class="center-align">Team</th>
                    <th class="center-align">Played</th>
                    <th class="center-align">Won</th>
                    <th class="center-align">Draw</th>
                    <th class="center-align">Lost</th>
                    <th class="center-align">Points</th>
                    <th class="center-align">Goals For</th>
                    <th class="center-align">Goals Against</th>
                  </tr>
                </thead>
                <tbody>
                  ${standingList}
                </tbody>
              </table>
          </div>
        `;
      })
      document.getElementById('loader').style.display = 'none';
      document.getElementById('standings').innerHTML = standingHTML;
    })
}