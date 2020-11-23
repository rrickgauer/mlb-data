function Player(playerID) {
  this.playerID                  = playerID;
  this.apiRootUrl                = 'https://api.mlb-data.ryanrickgauer.com/main.php';
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
  this.battingPost               = this.apiRootUrl + '/batting-post/' + playerID;
  this.pitchingPost              = this.apiRootUrl + '/pitching-post/' + playerID;
  this.fieldingPost              = this.apiRootUrl + '/fielding-post/' + playerID;
  this.battingPost_aggregate     = this.battingPost + '?aggregate=true';
  this.pitchingPost_aggregate    = this.pitchingPost + '?aggregate=true';
  this.fieldingPost_aggregate    = this.fieldingPost + '?aggregate=true';
}



function ChartData(apiResults) {

  const CHART_COLORS = ['red', 'pink', 
  'purple', 'darkviolet', 'indigo', 'blue', 'lightblue', 
  'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'goldenrod', 
  'orange', 'tomato', 'brown', 'grey', 'cadetblue', 
  'thistle', 'yellowgreen'];

  // column names to ignore
  const IGNORE_COLUMNS = ['teamName', 'POS', 'nameFirst', 'nameLast', 'lgID', 'stint', 'year', 'playerID'];

  // extract the years
  this.years = [];
  for (let count = 0; count < apiResults.length; count++)
    this.years.push(apiResults[count].year);
  

  const columnNames = Object.keys(apiResults[0]);
  let datasets      = [];
  let colorCount    = 0;

  // for every column name, extract its apiResults from the passed in argument
  for (let count = 0; count < columnNames.length; count++) {
    let dataArray = [];
    let label = columnNames[count];

    // skip this iteration if unneeded column
    if (IGNORE_COLUMNS.includes(label))
      continue;

    colorCount++;

    // add the apiResults piece into the array
    for (let i = 0; i < apiResults.length; i++) 
      dataArray.push(apiResults[i][label]);
      
    // add this column from the input into the superset
    datasets.push(new ChartDataSubset(label, dataArray, CHART_COLORS[colorCount]));

  }

  this.datasets = datasets;
}



function ChartDataSubset(label, apiResults, color) {
  this.label = label;
  this.data  = apiResults;
  this.borderColor = color;
  this.fill  = false;
}



function Pagination() {
  this.current = null;
  this.first   = null;
  this.last    = null;
  this.next    = null;
}


function TeamUrls(teamID) {
  this.base = 'https://api.mlb-data.ryanrickgauer.com/main.php/teams/' + teamID;
  this.aggregate = this.base + '?aggregate=true';






}















