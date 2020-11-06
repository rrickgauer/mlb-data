
function Player(playerID) {
  this.playerID                  = playerID;
  this.apiRootUrl                = 'http://api.mlb-data.ryanrickgauer.com/main.php';
  this.batting                   = this.apiRootUrl + '/batting/' + playerID;
  this.pitching                  = this.apiRootUrl + '/pitching/' + playerID;
  this.fielding                  = this.apiRootUrl + '/fielding/' + playerID;
  this.fieldingOf                = this.apiRootUrl + '/fielding-of/' + playerID;
  this.fieldingOfSplit           = this.apiRootUrl + '/fielding-of-split/' + playerID;
  this.appearances               = this.apiRootUrl + '/appearances/' + playerID;
  this.salaries                  = this.apiRootUrl + '/salaries/' + playerID;
  this.bio                       = this.apiRootUrl + '/people/' + playerID;
  this.batting_aggregate         = this.batting + '?aggregate=true';         
  this.pitching_aggregate        = this.pitching + '?aggregate=true';        
  this.fielding_aggregate        = this.fielding + '?aggregate=true';        
  this.fieldingOf_aggregate      = this.fieldingOf + '?aggregate=true';      
  this.fieldingOfSplit_aggregate = this.fieldingOfSplit + '?aggregate=true'; 
  this.appearances_aggregate     = this.appearances + '?aggregate=true';     
  this.salaries_aggregate        = this.salaries + '?aggregate=true';
  this.batting_post              = this.apiRootUrl + '/batting/' + playerID;
  this.pitching_post             = this.apiRootUrl + '/pitching/' + playerID;
  this.fielding_post             = this.apiRootUrl + '/fielding/' + playerID;
}

