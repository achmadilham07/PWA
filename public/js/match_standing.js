function getStandingMatchesJson(data) {
	var tabelStandingHTML = ''
	data.standings.forEach(function (standing) {
		var dataStanding = ''
		standing.table.forEach(function (dataForClub) {
			dataForClub = JSON.parse(JSON.stringify(dataForClub).replace(/http:/g, 'https:'));
			dataStanding += `
			<tr>
				<td >${dataForClub.position}</td>
				<td >
					
					<div>
						<a href="./pages/team_detail.html?id=${dataForClub.team.id}" class="valign-wrapper center-align">
							<div class="col l2 m2 s2">
								<p><img class ="circle responsive-img" width="80px" height="80px" src=${dataForClub.team.crestUrl}  alt="logo"></p>
							</div>
							<div class="col l10 m10 s10 left-align">
								${dataForClub.team.name}
							</div>
						</a>
					</div>

				</td>
				<td >${dataForClub.playedGames}</td>
				<td >${dataForClub.won}</td>
				<td >${dataForClub.draw}</td>
				<td >${dataForClub.lost}</td>
				<td >${dataForClub.goalsFor}</td>
				<td >${dataForClub.goalsAgainst}</td>
				<td >${dataForClub.goalDifference}</td>
				<td >${dataForClub.points}</td>
			</tr>`
		})

		tabelStandingHTML += `
			<div class="card hoverable">
				<div class="card-content">
					<div class="row clear-padding-heading">

						<div class="col xl6 l6 m6 s6 right-align">
							<h6>Group :</h6>
						</div>
						<div class="col xl6 l6 m6 s6 left-align">
							<h6><strong>${standing.group}</strong></h6>
						</div>

					</div>
					
					<table class="responsive-table centered highlight" >
						<thead>
							<tr>
								<th >Position</th>
								<th >Team</th>
								<th >Played</th>
								<th >Won</th>
								<th >Draw</th>
								<th >Lost</th>
								<th >GF</th>
								<th >GA</th>
								<th >GD</th>
								<th >Points</th>
							</tr>
						</thead>
						<tbody>` + dataStanding + `</tbody>
					</table>
				</div>
			</div>`
	});

	document.getElementById("standing-content").innerHTML = tabelStandingHTML;
}