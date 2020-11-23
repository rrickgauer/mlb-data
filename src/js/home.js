function API_Links() {
  this.base        = 'https://api.mlb-data.ryanrickgauer.com/main.php';
  this.people      = this.base + '/people?perPage=1';
  this.teams       = this.base + '/teams?aggregate=true&perPage=1';
  this.batting     = this.base + '/batting?perPage=1';
  this.fielding    = this.base + '/fielding?perPage=1';
  this.pitching    = this.base + '/pitching?perPage=1';
  this.appearances = this.base + '/appearances?perPage=1';
}

const API = new API_Links();


// main function
$(document).ready(function() {
  loadAllCardData();

});

function loadAllCardData() {
  // players
  getData(API.people, function(response) {
    loadPlayersCard('players', response);
  });

  // teams
  getData(API.teams, function(response) {
    loadPlayersCard('teams', response);
  });

  // batting
  getData(API.batting, function(response) {
    loadPlayersCard('batting', response);
  });

  // fielding
  getData(API.fielding, function(response) {
    loadPlayersCard('fielding', response);
  });

  // pitching
  getData(API.pitching, function(response) {
    loadPlayersCard('pitching', response);
  });

  // appearances
  getData(API.appearances, function(response) {
    loadPlayersCard('appearances', response);
  });
}

function loadPlayersCard(cardClass, data) {
  const count = data.resultsCount;
  $(`.card-home.${cardClass} .data`).text(count.toLocaleString());
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
