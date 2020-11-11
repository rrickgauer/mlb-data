const datatable = '.table-fielding';
const baseApiUrl = 'https://api.mlb-data.ryanrickgauer.com/main.php/fielding';
const filterColumns = ['teamName', 'year', 'POS', 'G', 'GS', 'InnOuts', 'PO','A','E', 'DP', 'PB', 'WP', 'SB', 'CS', 'ZR'];

$(document).ready(function() {
  let moduleTest = new Module(datatable, baseApiUrl, filterColumns);
  moduleTest.init();
});