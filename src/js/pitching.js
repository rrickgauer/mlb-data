const datatable = '.table-pitching';
const baseApiUrl = 'https://api.mlb-data.ryanrickgauer.com/main.php/pitching';
const filterColumns = ['year', 'teamName', 'W', 'L', 'G', 'GS', 'CG', 'SHO', 'SV', 'IPouts', 
                    'H', 'ER', 'HR', 'BB', 'SO', 'BAOpp', 'ERA', 'IBB', 'WP', 
                    'HBP', 'BK', 'BFP', 'GF', 'R', 'SH', 'SF', 'GIDP'];

$(document).ready(function() {
  let modulesClass = new Module(datatable, baseApiUrl, filterColumns);
  modulesClass.init();
});