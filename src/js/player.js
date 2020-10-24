const urlParams             = new URLSearchParams(window.location.search);
const playerID              = urlParams.get('playerID');  
const API                   = 'http://api.mlb-data.ryanrickgauer.com/main.php';
const API_BATTING           = API + '/batting/' + playerID;
const API_PITCHING          = API + '/pitching/' + playerID;
const API_FIELDING          = API + '/fielding/' + playerID;
const API_FIELDING_OF       = API + '/fielding-of/' + playerID;
const API_FIELDING_OF_SPLIT = API + '/fielding-of-split/' + playerID;
const API_APPEARANCES       = API + '/appearances/' + playerID;
const API_SALARIES          = API + '/salaries/' + playerID;
const API_BIO               = API + '/people/' + playerID;

// main function
$(document).ready(function() {
  loadAllPlayerData();
});


function loadAllPlayerData() {
  getPlayerData(API_BIO, loadBioData, 'bio');
  getPlayerData(API_BATTING, loadBattingTable, 'batting');
  getPlayerData(API_PITCHING, loadPitchingTable, 'pitching');
  getPlayerData(API_FIELDING, loadFieldingTable, 'fielding');  
  getPlayerData(API_FIELDING_OF, loadFieldingOfTable, 'fieldingOF');
  getPlayerData(API_FIELDING_OF_SPLIT, loadFieldingOfSplitTable, 'fieldingOFSplit');
  getPlayerData(API_APPEARANCES, loadAppearancesTable, 'appearances');
  getPlayerData(API_SALARIES, loadSalariesTable, 'salaries');
}

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


function loadFieldingTable(data) {
  let html = '';
  for (var count = 0; count < data.length; count++)
    html += getFieldingRowHtml(data[count]);

  $('.table-fielding tbody').html(html);
}

function getFieldingRowHtml(data) {
  let html = `
    <tr class="table-fielding-row">
    <td>${data.yearID}</td>
    <td>${data.teamName}</td>
    <td>${data.POS}</td>
    <td>${data.G}</td>
    <td>${data.GS}</td>
    <td>${data.InnOuts}</td>
    <td>${data.PO}</td>
    <td>${data.A}</td>
    <td>${data.E}</td>
    <td>${data.DP}</td>
    <td>${data.PB}</td>
    <td>${data.WP}</td>
    <td>${data.SB}</td>
    <td>${data.CS}</td>
    <td>${data.ZR}</td>
    </tr>`;

    return html;
}


function loadFieldingOfTable(data) {
  let html = '';
  for (var count = 0; count < data.length; count++)
    html += getFieldingOfRowHtml(data[count]);

  $('.table-fielding-of tbody').html(html);
}

function getFieldingOfRowHtml(data) {
  let html = `
    <tr class="table-fielding-of-row">
      <td>${data.yearID}</td>
      <td>${data.Glf}</td>
      <td>${data.Gcf}</td>
      <td>${data.Grf}</td>
    </tr>`;

  return html;
}


function loadFieldingOfSplitTable(data) {
  let html = '';
  for (var count = 0; count < data.length; count++)
    html += getFieldingOfSplitRowHtml(data[count]);

  $('.table-fielding-of-split tbody').html(html);
}

function getFieldingOfSplitRowHtml(data) {
  let html = `
    <tr class="table-fielding-of-split">
      <td>${data.yearID}</td>
      <td>${data.name}</td>
      <td>${data.POS}</td>
      <td>${data.G}</td>
      <td>${data.GS}</td>
      <td>${data.InnOuts}</td>
      <td>${data.PO}</td>
      <td>${data.A}</td>
      <td>${data.E}</td>
      <td>${data.DP}</td>
      <td>${data.PB}</td>
      <td>${data.WP}</td>
      <td>${data.SB}</td>
      <td>${data.CS}</td>
      <td>${data.ZR}</td>
    </tr>`;

  return html;
}


function loadAppearancesTable(data) {
  let html = '';
  for (var count = 0; count < data.length; count++)
    html += getAppearancesRowHtml(data[count]);

  $('.table-appearances tbody').html(html);
}

function getAppearancesRowHtml(data) {
  let html = `
    <tr class="table-appearances-row">
      <td>${data.yearID}</td>
      <td>${data.name}</td>
      <td>${data.G_all}</td>
      <td>${data.GS}</td>
      <td>${data.G_batting}</td>
      <td>${data.G_defense}</td>
      <td>${data.G_p}</td>
      <td>${data.G_c}</td>
      <td>${data.G_1b}</td>
      <td>${data.G_2b}</td>
      <td>${data.G_3b}</td>
      <td>${data.G_ss}</td>
      <td>${data.G_lf}</td>
      <td>${data.G_cf}</td>
      <td>${data.G_rf}</td>
      <td>${data.G_of}</td>
      <td>${data.G_dh}</td>
      <td>${data.G_ph}</td>
      <td>${data.G_pr}</td>
    </tr>`;

  return html;
}

function loadSalariesTable(data) {
  let html = '';
  for (var count = 0; count < data.length; count++)
    html += getSalariesRowHtml(data[count]);

  $('.table-salaries tbody').html(html);
}

function getSalariesRowHtml(data) {

  let salaryDisplay = formatCurrency(data.salary);

  let html = `
    <tr class="table-salaries-row">
      <td>${data.yearID}</td>
      <td>${data.teamName}</td>
      <td>${salaryDisplay}</td>
    </tr>`;

  return html;
}

function loadBioData(data) {
  data = data[0];

  let height           = inchesToFeet(data.height);
  let heightDisplay    = height.feet + '-' + height.inches;
  let birthDateDisplay = getDisplayDate(data.birthDate);
  let debutDateDisplay = getDisplayDate(data.debuteDate);
  let birthCityState   = data.birthCity + ', ' + data.birthState;
  let nameDisplay      = data.nameFirst + ' ' + data.nameLast;

  $('.player-bio .player-bio-item-data.name').text(nameDisplay);
  $('.player-bio .player-bio-item-data.bats').text(data.bats);
  $('.player-bio .player-bio-item-data.throws').text(data.throws);
  $('.player-bio .player-bio-item-data.height').text(heightDisplay);
  $('.player-bio .player-bio-item-data.weight').text(data.weight + 'lb');
  $('.player-bio .player-bio-item-data.birth-date').text(birthDateDisplay );
  $('.player-bio .player-bio-item-data.birth-city-state').text(birthCityState);
  $('.player-bio .player-bio-item-data.debut-date').text(debutDateDisplay);
  $('.player-bio .player-bio-item-data.bbref-link').attr("href", data.baseballReferenceLink);

}

function inchesToFeet(inches) {
  let result = {
    feet: 0,
    inches: 0,
  }

  if (inches <= 12) {
    result.inches = inches;
    return result;
  }

  let feet = 0;
  let divisor = inches;

  while (divisor > 12) {
    feet++;
    divisor += -12;
  }

  result.feet = feet;
  result.inches = divisor;

  return result;
}


function getDisplayDate(date) {
  dateData = date.split("-");
  let result = dateData[1] + '/' + dateData[2] + '/' + dateData[0];
  return result;
}

function formatCurrency(currency) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0,
    //maximumFractionDigits: 0,
  });

  return formatter.format(currency);
}