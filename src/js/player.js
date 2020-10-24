const urlParams = new URLSearchParams(window.location.search);
const playerID  = urlParams.get('playerID');  
const API       = 'http://api.mlb-data.ryanrickgauer.com/main.php/batting/' + playerID;                


$(document).ready(function() {

  getPlayerBatting(playerID, console.log);
  getPlayerBatting(playerID, loadBattingTable);


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
  $.getJSON(API, function(result) {
    action(result);
  })
  .fail(function(response) {
    displayAlert('There was an error with the API: getPlayerBatting()');
  });
}

function loadBattingTable(batting) {

  let html = '';

  for (var count = 0; count < batting.length; count++)
    html += getTableRowHtml(batting[count]);

  $("table tbody").html(html);

}

function getTableRowHtml(data) {

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

