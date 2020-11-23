const urlParams = new URLSearchParams(window.location.search);
const teamID    = urlParams.get('teamID');
const API       = 'https://api.mlb-data.ryanrickgauer.com/main.php';
const teamUrls  = new TeamUrls(teamID);


$(document).ready(function() {
  init();
});


function init() {
  loadMetaData();
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















