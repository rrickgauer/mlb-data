const datatable = '.table-batting';
const baseApiUrl = 'https://api.mlb-data.ryanrickgauer.com/main.php/batting';
const filterColumns = ["teamName", "year", "G", "AB", "R", "H", "2B", "3B", "HR", "RBI", "SB", "CS", "BB", "SO", "IBB", "HBP", "SH", "SF", "GIDP"];


$(document).ready(function() {
  let modulesClass = new Module(datatable, baseApiUrl, filterColumns, 'batting');
  modulesClass.init();
});