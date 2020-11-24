const urlParams             = new URLSearchParams(window.location.search);
const teamID                = urlParams.get('teamID');
const API                   = 'https://api.mlb-data.ryanrickgauer.com/main.php';
const teamUrls              = new TeamUrls(teamID);
let rosterTableSkeletonHtml = null;
let teamTableSkeletonHtml   = null;


$(document).ready(function() {
  init();
});


function init() {
  getTeamTableSkeletonHtml();
  showRosterTableSkeleton();
  getRosterTableSkeletonHtml();
  showRosterTableSkeleton();
  loadMetaData();
  loadStatsData();
  loadRosterData();

  $('.select-year').on('change', function() {
    const year = $('.select-year option:selected').val();
    loadRoster(year);
    showRosterTableSkeleton();
  });
}



function getData(url, actionResults, actionError) {
  $.getJSON(url, function(response) {
    actionResults(response);
  })
  .fail(function(response) {
    if (actionError != undefined)
      actionError(response);
  });
}


function loadMetaData() {
  getData(teamUrls.aggregate, function(response) {
    const data = response.results;
    $('.team-bio .data.name').text(data.teamName);
    $('.team-bio-item .data.seasons').text(data.years);
    $('.team-bio-item .data.record-w').text(data.W.toLocaleString());
    $('.team-bio-item .data.record-l').text(data.L.toLocaleString());
    $('.team-item-data.image img').attr('src', data.image);

    //https://www.baseball-reference.com/teams//
    // const bbrefLink = `https://www.baseball-reference.com/teams/${data.}/`
  });


  const teamNamesUrl = teamUrls.base + '?perPage=500&sort=year:desc';
  getData(teamNamesUrl, function(response) {
    const data = response.results;

    let teamNames = [];
    for (let count = 0; count < data.length; count++) {
      const newTeamName = data[count].teamName;

      // add team name to the list if it isn't already included
      if (!teamNames.includes(newTeamName))
        teamNames.push(newTeamName);
    }

    displayTeamNames(teamNames);
  });
}

function displayTeamNames(teamNames) {
  let html = '';

  for (let count = 0; count < teamNames.length; count++) {
    if (count > 0)
      html += ',';
    
    html += ` ${teamNames[count]}`;
  }

  $('.team-bio-item .data.names').text(html);
}



function loadStatsData() {
  const url = teamUrls.base + '?perPage=1000&sort=year:desc';

  getData(url, function(response) {
    const data = response.results;

    let html = '';
    for (let count = 0; count < data.length; count++) {
      html += getTeamTableRowHtml(data[count]);
    }

    $('.table-team tbody').html(html);
    new SuperTable('.table-team', '.super-table-checkboxes.team');

    getData(teamUrls.aggregate, function(response) {
      displayTeamsTableFooter(response.results);
    });
  });
}



function getTeamTableRowHtml(data) {
  removeNulls(data);

  const doubles = data['2B'];
  const triples = data['3B'];

  let html = `
    <tr>
    <td>${data.year}</td>
    <td>${data.teamRank}</td>
    <td>${data.G.toLocaleString()}</td>
    <td>${data.Ghome.toLocaleString()}</td>
    <td>${data.W.toLocaleString()}</td>
    <td>${data.L.toLocaleString()}</td>
    <td>${data.DivWin}</td>
    <td>${data.WCWin}</td>
    <td>${data.LgWin}</td>
    <td>${data.WSWin}</td>
    <td>${data.R.toLocaleString()}</td>
    <td>${data.AB.toLocaleString()}</td>
    <td>${data.H.toLocaleString()}</td>
    <td>${doubles.toLocaleString()}</td>
    <td>${triples.toLocaleString()}</td>
    <td>${data.HR.toLocaleString()}</td>
    <td>${data.BB.toLocaleString()}</td>
    <td>${data.SO.toLocaleString()}</td>
    <td>${data.SB.toLocaleString()}</td>
    <td>${data.CS.toLocaleString()}</td>
    <td>${data.HBP.toLocaleString()}</td>
    <td>${data.SF.toLocaleString()}</td>
    <td>${data.RA.toLocaleString()}</td>
    <td>${data.ER.toLocaleString()}</td>
    <td>${data.ERA.toLocaleString()}</td>
    <td>${data.CG.toLocaleString()}</td>
    <td>${data.SHO.toLocaleString()}</td>
    <td>${data.SV.toLocaleString()}</td>
    <td>${data.IPouts.toLocaleString()}</td>
    <td>${data.HA.toLocaleString()}</td>
    <td>${data.HRA.toLocaleString()}</td>
    <td>${data.BBA.toLocaleString()}</td>
    <td>${data.SOA.toLocaleString()}</td>
    <td>${data.E.toLocaleString()}</td>
    <td>${data.DP.toLocaleString()}</td>
    <td>${data.FP.toLocaleString()}</td>
    <td>${data.attendance.toLocaleString()}</td>
    <td>${data.BPF}</td>
    <td>${data.PPF}</td>
    </tr>`;

  return html;
}



function displayTeamsTableFooter(data) {
  const doubles = data['2B'];
  const triples = data['3B'];


  let html = `
  <tr>
  <th>${data.years.toLocaleString()}</th>
  <th>-</th>
  <th>${data.G.toLocaleString()}</th>
  <th>${data.Ghome.toLocaleString()}</th>
  <th>${data.W.toLocaleString()}</th>
  <th>${data.L.toLocaleString()}</th>
  <th>-</th>
  <th>-</th>
  <th>-</th>
  <th>-</th>
  <th>${data.R.toLocaleString()}</th>
  <th>${data.AB.toLocaleString()}</th>
  <th>${data.H.toLocaleString()}</th>
  <th>${doubles.toLocaleString()}</th>
  <th>${triples.toLocaleString()}</th>
  <th>${data.HR.toLocaleString()}</th>
  <th>${data.BB.toLocaleString()}</th>
  <th>${data.SO.toLocaleString()}</th>
  <th>${data.SB.toLocaleString()}</th>
  <th>${data.CS.toLocaleString()}</th>
  <th>${data.HBP.toLocaleString()}</th>
  <th>${data.SF.toLocaleString()}</th>
  <th>${data.RA.toLocaleString()}</th>
  <th>${data.ER.toLocaleString()}</th>
  <th>${data.ERA.toLocaleString()}</th>
  <th>${data.CG.toLocaleString()}</th>
  <th>${data.SHO.toLocaleString()}</th>
  <th>${data.SV.toLocaleString()}</th>
  <th>${data.IPouts.toLocaleString()}</th>
  <th>${data.HA.toLocaleString()}</th>
  <th>${data.HRA.toLocaleString()}</th>
  <th>${data.BBA.toLocaleString()}</th>
  <th>${data.SOA.toLocaleString()}</th>
  <th>${data.E.toLocaleString()}</th>
  <th>${data.DP.toLocaleString()}</th>
  <th>${data.FP.toLocaleString()}</th>
  <th>${data.attendance.toLocaleString()}</th>
  <th>${data.BPF.toLocaleString()}</th>
  <th>${data.PPF.toLocaleString()}</th>
  </tr>`;

  $('.table-team tfoot').html(html);

}


function removeNulls(data) {
  const keys = Object.keys(data);
  
  let results = data;

  for (let count = 0; count < keys.length; count++) {
    const key = keys[count];

    if (results[key] == null) {
      results[key] = '-';
      continue;
    }
  }
}



function loadRosterData() {
  loadRosterYearSelectHtml();
}

function loadRosterYearSelectHtml() {
  // setup filter options
  const url = teamUrls.base + '?sort=year:desc&perPage=250';
  getData(url, function(response) {
    let yearList = [];
    const numYears = response.resultsCount;

    for (let count = 0; count < numYears; count++)
      yearList.push(response.results[count].year);

    let html = '';
    for (let count = 0; count < yearList.length; count++)
      html += `<option value="${yearList[count]}">${yearList[count]}</option>`;

    $('.select-year').html(html);

    // load the first year
    loadRoster(yearList[0]);
  });
}


function loadRoster(year) {
  const url = teamUrls.base + `/${year}/players`;
  getData(url, function(response) {
    let html = '';
    for (let count = 0; count < response.results.length; count++)
      html += getRosterTableRowHtml(response.results[count]);

    $('.table-rosters tbody').html(html);
  });
}


function getRosterTableRowHtml(data) {
  // create the player link
  let player = '<a data-toggle="popover" data-html="true" data-placement="bottom" class="link-player"';
  player += `href="player.php?playerID=${data.playerID}">${data.nameFirst} ${data.nameLast}</a>`;

  let html = `
  <tr>
  <td>${player}</td>
  <td>${data.G_all}</td>
  <td>${data.GS}</td>
  <td>${data.G_batting}</td>
  <td>${data.G_defense}</td>
  <td>${data.G_p}</td>
  <td>${data.G_c}</td>
  <td>${data.G_1b}</td>
  <td>${data.G_2b}</td>
  <td>${data.G_3b}</td>
  <td>${data.G_ss}</td>
  <td>${data.G_lf}</td>
  <td>${data.G_cf}</td>
  <td>${data.G_rf}</td>
  <td>${data.G_of}</td>
  <td>${data.G_dh}</td>
  <td>${data.G_ph}</td>
  <td>${data.G_pr}</td>
  </tr>`;

  return html;
}

function getRosterTableSkeletonHtml(numRows = 50) {
  const numColumns = $('.table-rosters th').length;

  let html = '';
  for (let count = 0; count < numRows; count++) {
    html += `
    <tr>
      <td colspan="${numColumns}">
        <div class="skeleton-block skeleton-effect-wave">
       </div>
      </td>
    </tr>`;
  }

  rosterTableSkeletonHtml = html;
}

function showTeamTableSkeleton() {
  $('.table-rosters tbody').html(rosterTableSkeletonHtml);
}


function getTeamTableSkeletonHtml(numRows = 50) {
  const numColumns = $('.table-team th').length;

  let html = '';
  for (let count = 0; count < numRows; count++) {
    html += `
    <tr>
      <td colspan="${numColumns}">
        <div class="skeleton-block skeleton-effect-wave">
       </div>
      </td>
    </tr>`;
  }

  teamTableSkeletonHtml = html;
}

function showRosterTableSkeleton() {
  $('.table-team tbody').html(teamTableSkeletonHtml);
}

