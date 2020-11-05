
function Player(playerID) {
  this.playerID        = playerID;
  this.apiRootUrl      = 'http://api.mlb-data.ryanrickgauer.com/main.php';
  this.batting         = this.apiRootUrl + '/batting/' + playerID;
  this.pitching        = this.apiRootUrl + '/pitching/' + playerID;
  this.fielding        = this.apiRootUrl + '/fielding/' + playerID;
  this.fieldingOf      = this.apiRootUrl + '/fielding-of/' + playerID;
  this.fieldingOfSplit = this.apiRootUrl + '/fielding-of-split/' + playerID;
  this.appearances     = this.apiRootUrl + '/appearances/' + playerID;
  this.salaries        = this.apiRootUrl + '/salaries/' + playerID;
  this.bio             = this.apiRootUrl + '/people/' + playerID;
}

