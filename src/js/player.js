const urlParams             = new URLSearchParams(window.location.search);
const playerID              = urlParams.get('playerID');  
const API                   = 'http://api.mlb-data.ryanrickgauer.com/main.php';
const CHART_COLORS = ['red', 'pink', 'purple', 'darkviolet', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'goldenrod', 'orange', 'tomato', 'brown', 'grey', 'cadetblue', 'thistle', 'yellowgreen'];

const API_LINKS = {
  BATTING          : API + '/batting/' + playerID,
  PITCHING         : API + '/pitching/' + playerID,
  FIELDING         : API + '/fielding/' + playerID,
  FIELDING_OF      : API + '/fielding-of/' + playerID,
  FIELDING_OF_SPLIT: API + '/fielding-of-split/' + playerID,
  APPEARANCES      : API + '/appearances/' + playerID,
  SALARIES         : API + '/salaries/' + playerID,
  BIO              : API + '/people/' + playerID,
}

const MODULES = {
  PITCHING         : "pitching",
  BATTING          : "batting",
  FIELDING         : "fielding",
  FIELDING_OF      : "fielding-of",
  FIELDING_OF_SPLIT: "fielding-of-split",
  APPEARANCES      : "appearances",
  SALARIES         : "salaries",
  BIO              : "bio",
};

///////////////////
// Main function //
///////////////////
$(document).ready(function() {
  loadAllPlayerData();
});


/////////////////////////////////////////////////////////////////
// Load all the data for the player into the tables and charts //
/////////////////////////////////////////////////////////////////
function loadAllPlayerData() {
  // Positsion
  getPlayerData(API_LINKS.APPEARANCES + '?aggregate=true', loadPositionData, function() {
    console.log('error: loadPositionData()');
  });

  // Bio data
  getPlayerData(API_LINKS.BIO, loadBioData, function() {
    displayAlert('API Error: bio data');
  });

  // Batting - aggregate
  let urlBattingAggregate = API_LINKS.BATTING + '?aggregate=true';
  getPlayerData(urlBattingAggregate, loadBattingAggregateData, console.log);

  getPlayerData(urlBattingAggregate, loadBattingTableFooter, console.log);

  // Batting - graph
  getPlayerBatting(urlBattingAggregate, loadBattingChartData, function() {
    hideModule('batting');
  });

  // Batting - table
  getPlayerData(API_LINKS.BATTING, loadBattingTable, function() {
    hideModule('batting');
  });

  // Pitching - aggregate
  let urlPitchingAggregate = API_LINKS.PITCHING + '?aggregate=true';
  getPlayerData(urlPitchingAggregate, loadPitchingAggregateData, function() {
    hideModule('pitching');
  });

  // Pitching - table
  getPlayerData(API_LINKS.PITCHING, loadPitchingTable, function() {
    hideModule('pitching');
  });

  // Fielding
  getPlayerData(API_LINKS.FIELDING, loadFieldingTable, function() {
    hideModule('fielding');
  });  
  
  // Fielding OF
  getPlayerData(API_LINKS.FIELDING_OF, loadFieldingOfTable, function() {
    hideModule('fielding-of');
  });

  // Fielding OF Split
  getPlayerData(API_LINKS.FIELDING_OF_SPLIT, loadFieldingOfSplitTable, function() {
    hideModule('fielding-of-split');
  });

  // Appearances
  getPlayerData(API_LINKS.APPEARANCES, loadAppearancesTable, function() {
    hideModule('appearances');
  });

  // Salaries
  getPlayerData(API_LINKS.SALARIES, loadSalariesTable, function() {
    hideModule('salaries');
  });
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

function hideModule(moduleName) {
  let element = '.nav-item.' + moduleName;
  $(element).addClass('d-none');
}

function getPlayerBatting(playerID, action) {
  $.getJSON(API_LINKS.BATTING, function(result) {
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
  `<tr class="table-batting-row">
    <td>${data.teamName}</td>
    <td>${data.year}</td>
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


function loadBattingTableFooter(data) {

  console.log(data);

  let doubles = data['2B'];
  let triples = data['3B'];

  let row = `
  <tr>
    <th>Totals</th>
    <th>${data.years}</th>
    <th>${data.G}</th>
    <th>${data.AB}</th>
    <th>${data.R}</th>
    <th>${data.H}</th>
    <th>${doubles}</th>
    <th>${triples}</th>
    <th>${data.HR}</th>
    <th>${data.RBI}</th>
    <th>${data.SB}</th>
    <th>${data.CS}</th>
    <th>${data.BB}</th>
    <th>${data.SO}</th>
    <th>${data.IBB}</th>
    <th>${data.HBP}</th>
    <th>${data.SH}</th>
    <th>${data.SF}</th>
    <th>${data.GIDP}</th>
  </tr>`;

  $('.table-batting tfoot').html(row);

}


function getPlayerData(url, action, actionError) {
  $.getJSON(url, function(response) {
    action(response.results);
  })
  .fail(function(response) {
    actionError();
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
      <td>${data.year}</td>
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
      <td>${data.year}</td>
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
      <td>${data.year}</td>
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


function loadAppearancesTable(data) {
  let html = '';
  for (var count = 0; count < data.length; count++)
    html += getAppearancesRowHtml(data[count]);

  $('.table-appearances tbody').html(html);
}

function getAppearancesRowHtml(data) {
  let html = `
    <tr class="table-appearances-row">
      <td>${data.year}</td>
      <td>${data.teamName}</td>
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
      <td>${data.year}</td>
      <td>${data.teamName}</td>
      <td>${salaryDisplay}</td>
    </tr>`;

  return html;
}

function loadBioData(data) {
  
  console.log(data);

  let height           = inchesToFeet(data.height);
  let heightDisplay    = height.feet + '-' + height.inches;
  let birthDateDisplay = getDisplayDate(data.birthDate);
  let debutDateDisplay = getDisplayDate(data.debuteDate);
  let birthCityState   = data.birthCity + ', ' + data.birthState;
  let nameDisplay      = data.nameFirst + ' ' + data.nameLast;

  $('.player-bio .player-item-data.image img').attr("src", data.image);
  $('.player-bio .player-bio-item-data.name').text(nameDisplay);


  if (data.hallOfFame == 'y')
    $('.player-bio .player-bio-item-data.hof').removeClass('d-none');

  $('.player-bio .player-bio-item-data.bats').text(data.bats);
  $('.player-bio .player-bio-item-data.throws').text(data.throws);
  $('.player-bio .player-bio-item-data.height').text(heightDisplay);
  $('.player-bio .player-bio-item-data.weight').text(data.weight + 'lb');
  $('.player-bio .player-bio-item-data.birth-date').text(birthDateDisplay );
  $('.player-bio .player-bio-item-data.birth-city-state').text(birthCityState);
  $('.player-bio .player-bio-item-data.debut-date').text(debutDateDisplay);
  $('.player-bio .player-bio-item-data.bbref-link').attr("href", data.bbrefLink);


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
  let  dateData = date.split("-");
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


function loadBattingAggregateData(data) {
  const BA = data.H / data.AB;

  let battingSummary = $('.player-summary.batting');
  $(battingSummary).find('.player-summary-card.ab .data').text(data.AB);
  $(battingSummary).find('.player-summary-card.h .data').text(data.H);
  $(battingSummary).find('.player-summary-card.hr .data').text(data.HR);
  $(battingSummary).find('.player-summary-card.ba .data').text(BA.toFixed(3));
  $(battingSummary).find('.player-summary-card.r .data').text(data.R);
  $(battingSummary).find('.player-summary-card.rbi .data').text(data.RBI);
}


function loadPitchingAggregateData(data) {
  const IP = data.IPouts / 3;

  // calculate era
  let ERA = (data.ER * 9) / IP;
  ERA = ERA.toFixed(2);

  // calculate whip
  let WHIP = (data.BB + data.H) / IP;
  WHIP = WHIP.toFixed(2);

  // load data into the dom
  let battingSummary = $('.player-summary.pitching');
  $(battingSummary).find('.player-summary-card.era .data').text(ERA);
  $(battingSummary).find('.player-summary-card.w .data').text(data.W);
  $(battingSummary).find('.player-summary-card.g .data').text(data.G);
  $(battingSummary).find('.player-summary-card.ip .data').text(IP.toFixed(1));
  $(battingSummary).find('.player-summary-card.so .data').text(data.SO);
  $(battingSummary).find('.player-summary-card.whip .data').text(WHIP);

}



function loadBattingChartData(data) {
  let chartData = getBattingDatasets(data);

  var ctz = document.getElementById('chart-player-batting');
  new Chart(ctz, {
    type: 'line',
    data: {
      labels: chartData.labels,
      datasets: chartData.datasets,
    },
  });

  $('#chart-player-batting').removeClass('d-none');
  $('#chart-player-batting').closest('.card-body').find('.spinner-border').remove();
}

function getBattingChartDataset(label, data, color) {
  let item = {
    label: label,
    data: data,
    borderColor: color,
    fill: false,
  }

  return item;
}



function getBattingDatasets(data) {
  data = data.results;

  let columnNames = Object.keys(data[0]);
  let datasets = [];

  for (var count = 0; count < columnNames.length; count++) {
    let dataArray = [];
    let label = columnNames[count];

    // add the data piece into the array
    for (let i = 0; i < data.length; i++) {
      let item = data[i][label];
      dataArray.push(item);
      // console.log(item);
    }

    datasets.push(getBattingChartDataset(label, dataArray, CHART_COLORS[count]));
  }

  // redo the colors
  let i = 0;
  for (var count = 8; count < datasets.length; count++) {
    datasets[count].borderColor = CHART_COLORS[i];
    i++;
  }

  return {
    labels: datasets[3].data,
    datasets: datasets.slice(8),
  }
}


function loadPositionData(data) {
  const positions = {
    G_1b: 'First Baseman',
    G_2b: 'Second Baseman',
    G_3b: 'Third Baseman',
    G_ss: 'Shortstop',
    G_lf: 'Leftfielder',
    G_rf: 'Rightfielder',
    G_cf: 'Centerfielder',
    G_p: 'Pitcher',
    G_c: 'Catcher',
  }

  const positionKeys = Object.keys(positions);
  let dataArray      = Object.entries(data);

  // sort the data
  let dataSorted = dataArray.sort(function(a, b) {
    let aValue = a[1];
    let bValue = b[1];

    return (aValue > bValue) ? -1 : 1;
  });

  // find the highest sum in the data that is a key in the positions array
  let count = 0;
  while (!positionKeys.includes(dataSorted[count][0])) {
    count++;
  }

  const positionKey = dataSorted[count][0];
  $('.player-bio .player-bio-item-data.position').text(positions[positionKey]);
}