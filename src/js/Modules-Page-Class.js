

function Module(tableSelector, baseApiUrl, filterColumns) {

  this.globalVariables  = new GlobalVariables();
  // const API            = 'https://api.mlb-data.ryanrickgauer.com/main.php/fielding' + globalVariables.getUrl();
  this.API = baseApiUrl + this.globalVariables.getUrl();

  // let filterColumns = ['year', 'teamName', 'POS', 'G', 'GS',
  //                      'InnOuts', 'PO','A','E',
  //                      'DP', 'PB', 'WP', 'SB',
  //                      'CS', 'ZR'];

  this.filterColumns = filterColumns;

  this.userFilerColumns = [];
  this.filters          = new Filters(globalVariables.filters);
  this.emptyRows        = '';
  this.pagination       = {
    current: null,
    first  : null,
    last   : null,
    next   : null,
  };


  this.datatable = $(tableSelector);

}

