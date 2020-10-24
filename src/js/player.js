const urlParams = new URLSearchParams(window.location.search);
const playerID  = urlParams.get('playerID');  

const API = 'http://api.mlb-data.ryanrickgauer.com/main.php';

const API_BATTING           = API + '/batting/' + playerID
const API_PITCHING          = API + '/pitching/' + playerID
const API_FIELDING          = API + '/fielding/' + playerID
const API_FIELDING_OF       = API + '/fielding-of/' + playerID
const API_FIELDING_OF_SPLIT = API + '/fielding-of-split/' + playerID
const API_APPEARANCES       = API + '/appearances/' + playerID
const API_SALARIES          = API + '/salaries/' + playerID
const API_BIO               = API + '/people/' + playerID


$(document).ready(function() {

  // getPlayerBatting(playerID, console.log);
  getPlayerData(API_BATTING, loadBattingTable, 'batting');
  getPlayerData(API_PITCHING, loadPitchingTable, 'pitching');


});

// displays an alert on the screen
function displayAlert(text) {
  $.toast({
    text: text,
    position: 'bottom-center',
    loader: false,
    bgColor: '#3D3D3D',
    textColor: 'white'
  });
}


function getPlayerBatting(playerID, action) {
  $.getJSON(API_BATTING, function(result) {
    action(result);
  })
  .fail(function(response) {
    displayAlert('There was an error with the API: getPlayerBatting()');
  });
}

function loadBattingTable(batting) {
  let html = '';

  for (var count = 0; count < batting.length; count++)
    html += getBattingTableRowHtml(batting[count]);

  $(".table-batting tbody").html(html);
}

function getBattingTableRowHtml(data) {
  let doubles = data['2B'];
  let triples = data['3B'];


  let row =  
  ` <tr class="table-batting-row">
    <td>${data.yearID}</td>
    <td>${data.G}</td>
    <td>${data.AB}</td>
    <td>${data.R}</td>
    <td>${data.H}</td>
    <td>${doubles}</td>
    <td>${triples}</td>
    <td>${data.HR}</td>
    <td>${data.RBI}</td>
    <td>${data.SB}</td>
    <td>${data.CS}</td>
    <td>${data.BB}</td>
    <td>${data.SO}</td>
    <td>${data.IBB}</td>
    <td>${data.HBP}</td>
    <td>${data.SH}</td>
    <td>${data.SF}</td>
    <td>${data.GIDP}</td>
    </tr>`;

    return row;
}

function getPlayerData(url, action, errorMessage) {
  $.getJSON(url, function(response) {
    action(response);
  })
  .fail(function(response) {
    displayAlert('API Error: ' + errorMessage);
    return;
  });
}


function loadPitchingTable(data) {
  let html = '';

  for (var count = 0; count < data.length; count++)
    html += getPitchingRowHtml(data[count]);

  $('.table-pitching tbody').html(html);
}

function getPitchingRowHtml(pitching) {
  let html = `
  <tr class="table-pitching-row">
  <td>${pitching.year}</td>
  <td>${pitching.teamName}</td>  
  <td>${pitching.W}</td> 
  <td>${pitching.L}</td>
  <td>${pitching.G}</td>
  <td>${pitching.GS}</td>  
  <td>${pitching.CG}</td>  
  <td>${pitching.SHO}</td>
  <td>${pitching.SV}</td>
  <td>${pitching.IPouts}</td>  
  <td>${pitching.H}</td> 
  <td>${pitching.ER}</td>  
  <td>${pitching.HR}</td>  
  <td>${pitching.BB}</td>  
  <td>${pitching.SO}</td>  
  <td>${pitching.BAOpp}</td> 
  <td>${pitching.ERA}</td> 
  <td>${pitching.IBB}</td>
  <td>${pitching.WP}</td>  
  <td>${pitching.HBP}</td> 
  <td>${pitching.BK}</td>  
  <td>${pitching.BFP}</td> 
  <td>${pitching.GF}</td>  
  <td>${pitching.R}</td> 
  <td>${pitching.SH}</td>  
  <td>${pitching.SF}</td>  
  <td>${pitching.GIDP}</td>
  </tr>`;

  return html;
}
