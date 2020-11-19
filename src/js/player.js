const urlParams = new URLSearchParams(window.location.search);
const playerID  = urlParams.get('playerID');  
const API       = 'https://api.mlb-data.ryanrickgauer.com/main.php';
const player    = new Player(playerID);

const MODULES   = {
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
  initTableSkeletons();
  loadAllPlayerData();

  $('.card-table').on('click', 'table tbody tr', function() {
    activateTableRow(this);
  });
});



function initTableSkeletons() {
  const numColumns = $(this.datatable).find('th').length;
  let tables = $('.card-table table');

  for (let count = 0; count < tables.length; count++) {
    let thisTable = tables[count];
    const numColumns = $(thisTable).find('th').length;

    let html = '';

    for (let i = 0; i < 10; i++) {
      html += `
      <tr>
        <td colspan="${numColumns}">
          <div class="skeleton-block skeleton-effect-wave">
         </div>
        </td>
      </tr>`;
    }

    $(thisTable).find('tbody').html(html);
  }
}

/////////////////////////////////////////////////////////////////
// Load all the data for the player into the tables and charts //
/////////////////////////////////////////////////////////////////
function loadAllPlayerData() {
  
  //////////////
  // Position //
  //////////////
  getPlayerData(player.appearances_aggregate, function(response) {
    loadPositionData(response.results);
    loadAppearancesTableFooter(response.results);
  }, function(response) {
    // console.error(response);
  });

  //////////////
  // Bio data //
  //////////////
  getPlayerData(player.bio, function(response) {
    loadBioData(response.results);
  }, function(response) {
    // console.error(response);
  });


  /////////////////////////
  // Batting - aggregate //
  /////////////////////////
  let urlBattingAggregate = player.batting + '?aggregate=true';
  getPlayerData(urlBattingAggregate, function(response) {
    loadBattingAggregateData(response.results);
    loadBattingTableFooter(response.results);
  }, function(response) {
    // console.error(response);
  });


  /////////////////////
  // Batting - table //
  /////////////////////
  getPlayerData(player.batting, function(response) {
    loadBattingTable(response.results);
    displayChartData(response.results, '#chart-player-batting');
  }, function(response) {
    $('#player-batting .results').addClass('d-none');
    $('#player-batting .results-no-data').removeClass('d-none');
  });


  //////////////////
  // Batting post //
  //////////////////
  getPlayerData(player.battingPost, function(response) {
    loadBattingPostTable(response.results);
    displayChartData(response.results, '#chart-player-batting-post');
  }, function(response) {
    console.error(response);
    $('.table-batting-post').closest('.card-table').remove();
  });

  ////////////////////////////
  // Batting post aggregate //
  ////////////////////////////
  getPlayerData(player.battingPost_aggregate, function(response) {
    loadBattingPostTableFooter(response.results);
  }, function(response) {
    // console.error(response);
  });


  //////////////////////////
  // Pitching - aggregate //
  //////////////////////////
  let urlPitchingAggregate = player.pitching + '?aggregate=true';
  getPlayerData(urlPitchingAggregate, function(response) {
    loadPitchingAggregateData(response.results);
    loadPitchingFooter(response.results);
  }, function(response) {
    // hideModule('pitching');
    // console.error(response);
  });

  //////////////////////
  // Pitching - table //
  //////////////////////
  getPlayerData(player.pitching , function(response) {
    loadPitchingTable(response.results);
    displayChartData(response.results, '#chart-player-pitching');
  }, function(response) {
    $('#player-pitching .results').addClass('d-none');
    $('#player-pitching .results-no-data').removeClass('d-none');
  });


  ///////////////////
  // Pitching post //
  ///////////////////
  getPlayerData(player.pitchingPost , function(response) {
    loadPitchingPostTable(response.results);
    displayChartData(response.results, '#chart-player-pitching-post');
  }, function(response) {
    // hideModule('pitching');

    $('.table-pitching-post').closest('.card-table').remove();
    // console.error(response);
  });

  /////////////////////////////
  // Pitching post aggregate //
  /////////////////////////////
  getPlayerData(player.pitchingPost_aggregate , function(response) {
    loadPitchingPostTableFooter(response.results);
  }, function(response) {
    // hideModule('pitching');
    // console.error(response);
  });

  //////////////
  // Fielding //
  //////////////
  getPlayerData(player.fielding, function(response) {
    loadFieldingTable(response.results);
    displayChartData(response.results, '#chart-player-fielding');
  }, function(response) {
    $('#player-fielding .results').addClass('d-none');
    $('#player-fielding .results-no-data').removeClass('d-none');
  });  


  //////////////////////////
  // Fielding - aggregate //
  //////////////////////////
  getPlayerData(player.fielding_aggregate, function(response) {
    loadFieldingTableFooter(response.results);
  }, function(response) {
    // console.error(response);
  });

  ///////////////////
  // Fielding post //
  ///////////////////
  getPlayerData(player.fieldingPost, function(response) {
    loadFieldingPostTable(response.results);
    displayChartData(response.results, '#chart-player-fielding-post');
  }, function(response) {
    $('.table-fielding-post').closest('.card-table').remove();
  });  

  /////////////////////////////
  // Fielding post aggregate //
  /////////////////////////////
  getPlayerData(player.fieldingPost_aggregate, function(response) {
    loadFieldingPostTableFooter(response.results);
  }, function(response) {
    // hideModule('fielding');
    // console.error(response);
  });  

  
  ///////////////////////
  // Fielding OF Split //
  ///////////////////////
  getPlayerData(player.fieldingOfSplit, function(response) {
    loadFieldingOfSplitTable(response.results);
    displayChartData(response.results, '#chart-player-fielding-of-split');
  }, function(response) {
    $('#player-fielding-of-split .results').addClass('d-none');
    $('#player-fielding-of-split .results-no-data').removeClass('d-none');
  });

  ///////////////////////////////////
  // Fielding OF Split - Aggregate //
  ///////////////////////////////////
  getPlayerData(player.fieldingOfSplit_aggregate, function(response) {
    loadFieldingOfSplitTableFooter(response.results);
  }, function(response) {
    // console.error(response);
  });


  /////////////////
  // Appearances //
  /////////////////
  getPlayerData(player.appearances, function(response) {
    loadAppearancesTable(response.results);
    displayChartData(response.results, '#chart-player-appearances');
  }, function(response) {
    $('#player-appearances .results').addClass('d-none');
    $('#player-appearances .results-no-data').removeClass('d-none');
  });

  //////////////
  // Salaries //
  //////////////
  getPlayerData(player.salaries, function(response) {
    loadSalariesTable(response.results);
    displayChartData(response.results, '#chart-player-salaries');
  }, function(response) {
    $('#player-salaries .results').addClass('d-none');
    $('#player-salaries .results-no-data').removeClass('d-none');
  });

  //////////////////////////
  // Salaries - aggregate //
  //////////////////////////
  getPlayerData(player.salaries_aggregate, function(response) {
    loadSalariesTableFooter(response.results);
  }, function(response) {
    // hideModule('salaries');
    // console.error(response);
  });

}


function displayChartData(data, chartElementName) {
  const newChartData = new ChartData(data);
  const ctz = $(chartElementName);
  new Chart(ctz, {
    type: 'line',
    data: {
      labels: newChartData.years,
      datasets: newChartData.datasets,
    },
  });

  $(ctz).removeClass('d-none');
}



function getPlayerData(url, action, actionError) {
  $.getJSON(url, function(response) {
    action(response);
  })
  .fail(function(response) {
    actionError(response);
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


function loadBattingPostTable(data) {
  let html = '';

  for (let count = 0; count < data.length; count++) {
    const doubles = data[count]['2B'];
    const triples = data[count]['3B'];

    const row = `
    <tr>
      <td>${data[count].teamName}</td>
      <td>${data[count].year}</td>
      <td>${data[count].G}</td>
      <td>${data[count].AB}</td>
      <td>${data[count].R}</td>
      <td>${data[count].H}</td>
      <td>${doubles}</td>
      <td>${triples}</td>
      <td>${data[count].HR}</td>
      <td>${data[count].RBI}</td>
      <td>${data[count].SB}</td>
      <td>${data[count].CS}</td>
      <td>${data[count].BB}</td>
      <td>${data[count].SO}</td>
      <td>${data[count].IBB}</td>
      <td>${data[count].HBP}</td>
      <td>${data[count].SH}</td>
      <td>${data[count].SF}</td>
      <td>${data[count].GIDP}</td>
    <tr>`;

    html += row;
  }

  $('.table-batting-post tbody').html(html);
}



function loadBattingPostTableFooter(data) {
  const doubles = data['2B'];
  const triples = data['3B'];

  const html = `
  <tr>
    <th>Total</th>
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
  <tr>`;
 
  $('.table-batting-post tfoot').html(html);
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
    <td>${pitching.teamName}</td>  
    <td>${pitching.year}</td>
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


function loadPitchingPostTable(data) {
  let html = '';

  for (let count = 0; count < data.length; count++) {
    const row = `
    <tr>
      <td>${data[count].teamName}</td>
      <td>${data[count].year}</td>
      <td>${data[count].W}</td>
      <td>${data[count].L}</td>
      <td>${data[count].G}</td>
      <td>${data[count].GS}</td>
      <td>${data[count].CG}</td>
      <td>${data[count].SHO}</td>
      <td>${data[count].SV}</td>
      <td>${data[count].IPouts}</td>
      <td>${data[count].H}</td>
      <td>${data[count].ER}</td>
      <td>${data[count].HR}</td>
      <td>${data[count].BB}</td>
      <td>${data[count].SO}</td>
      <td>${data[count].BAOpp}</td>
      <td>${data[count].ERA}</td>
      <td>${data[count].IBB}</td>
      <td>${data[count].WP}</td>
      <td>${data[count].HBP}</td>
      <td>${data[count].BK}</td>
      <td>${data[count].BFP}</td>
      <td>${data[count].GF}</td>
      <td>${data[count].R}</td>
      <td>${data[count].SH}</td>
      <td>${data[count].SF}</td>
      <td>${data[count].GIDP}</td>
    </tr>`;

    html += row;
  }

  $('.table-pitching-post tbody').html(html);

}


function loadPitchingPostTableFooter(data) {
  let html = `
  <tr>
    <th>Total</th>
    <th>${data.years}</th>
    <th>${data.W}</th>
    <th>${data.L}</th>
    <th>${data.G}</th>
    <th>${data.GS}</th>
    <th>${data.CG}</th>
    <th>${data.SHO}</th>
    <th>${data.SV}</th>
    <th>${data.IPouts}</th>
    <th>${data.H}</th>
    <th>${data.ER}</th>
    <th>${data.HR}</th>
    <th>${data.BB}</th>
    <th>${data.SO}</th>
    <th>${data.BAOpp}</th>
    <th>${data.ERA}</th>
    <th>${data.IBB}</th>
    <th>${data.WP}</th>
    <th>${data.HBP}</th>
    <th>${data.BK}</th>
    <th>${data.BFP}</th>
    <th>${data.GF}</th>
    <th>${data.R}</th>
    <th>${data.SH}</th>
    <th>${data.SF}</th>
    <th>${data.GIDP}</th>
  </tr>`;


  $('.table-pitching-post tfoot').html(html);
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
      <td>${data.teamName}</td>
      <td>${data.year}</td>
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

function loadFieldingTableFooter(data) {
  
  let html = `
  <tr>
    <th>Total</th>
    <th>${data.years}</th>
    <th>-</th>
    <th>${data.G}</th>
    <th>${data.GS}</th>
    <th>${data.InnOuts}</th>
    <th>${data.PO}</th>
    <th>${data.A}</th>
    <th>${data.E}</th>
    <th>${data.DP}</th>
    <th>${data.PB}</th>
    <th>${data.WP}</th>
    <th>${data.SB}</th>
    <th>${data.CS}</th>
    <th>${data.ZR}</th>
  </tr>`;

  $('.table-fielding tfoot').html(html);
}


function loadFieldingPostTable(data) {
  let html = '';

  for (let count = 0; count < data.length; count++) {
    const row = `
    <tr>
      <td>${data[count].teamName}</td>
      <td>${data[count].year}</td>
      <td>${data[count].POS}</td>
      <td>${data[count].G}</td>
      <td>${data[count].GS}</td>
      <td>${data[count].InnOuts}</td>
      <td>${data[count].PO}</td>
      <td>${data[count].A}</td>
      <td>${data[count].E}</td>
      <td>${data[count].DP}</td>
      <td>${data[count].PB}</td>
      <td>${data[count].SB}</td>
      <td>${data[count].CS}</td>
    </tr>`;

    html += row;
  }

  $('.table-fielding-post tbody').html(html);
}


function loadFieldingPostTableFooter(data) {
  const html = `
  <tr>
    <th>Total</th>
    <th>${data.years}</th>
    <th>-</th>
    <th>${data.G}</th>
    <th>${data.GS}</th>
    <th>${data.InnOuts}</th>
    <th>${data.PO}</th>
    <th>${data.A}</th>
    <th>${data.E}</th>
    <th>${data.DP}</th>
    <th>${data.PB}</th>
    <th>${data.SB}</th>
    <th>${data.CS}</th>
  </tr>`;

  $('.table-fielding-post tfoot').html(html);
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
      <td>${data.teamName}</td>
      <td>${data.year}</td>
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

function loadFieldingOfSplitTableFooter(data) {
  let html = `
  <tr>
    <th>Total</th>
    <th>${data.years}</th>
    <th>-</th>
    <th>${data.G}</th>
    <th>${data.GS}</th>
    <th>${data.InnOuts}</th>
    <th>${data.PO}</th>
    <th>${data.A}</th>
    <th>${data.E}</th>
    <th>${data.DP}</th>
    <th>${data.PB}</th>
    <th>${data.WP}</th>
    <th>${data.SB}</th>
    <th>${data.CS}</th>
    <th>${data.ZR}</th>
  </tr>`;
  
  $('.table-fielding-of-split tfoot').html(html);
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
      <td>${data.teamName}</td>
      <td>${data.year}</td>
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


function loadAppearancesTableFooter(data) {
  let html = `
  <tr>
    <th>Total</th>
    <th>${data.years}</th>
    <th>${data.G_all}</th>
    <th>${data.GS}</th>
    <th>${data.G_batting}</th>
    <th>${data.G_defense}</th>
    <th>${data.G_p}</th>
    <th>${data.G_c}</th>
    <th>${data.G_1b}</th>
    <th>${data.G_2b}</th>
    <th>${data.G_3b}</th>
    <th>${data.G_ss}</th>
    <th>${data.G_lf}</th>
    <th>${data.G_cf}</th>
    <th>${data.G_rf}</th>
    <th>${data.G_of}</th>
    <th>${data.G_dh}</th>
    <th>${data.G_ph}</th>
    <th>${data.G_pr}</th>
  </tr>
  `;

  $('.table-appearances tfoot').html(html);
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
      <td>${data.teamName}</td>
      <td>${data.year}</td>
      <td>${salaryDisplay}</td>
    </tr>`;

  return html;
}

function loadSalariesTableFooter(data) {
  const salaryDisplay =  formatCurrency(data.salary);
  const html = `
  <tr>
    <th>Total</th>
    <th>${data.years}</th>
    <th>${salaryDisplay}</th>
  </tr>`;

  $('.table-salaries tfoot').html(html);
}

function loadBioData(data) {
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

function loadPitchingFooter(data) {

  let html = `
  <tr>
    <th>Totals</th>
    <th>${data.years}</th>
    <th>${data.W}</th>
    <th>${data.L}</th>
    <th>${data.G}</th>
    <th>${data.GS}</th>
    <th>${data.CG}</th>
    <th>${data.SHO}</th>
    <th>${data.SV}</th>
    <th>${data.IPouts}</th>
    <th>${data.H}</th>
    <th>${data.ER}</th>
    <th>${data.HR}</th>
    <th>${data.BB}</th>
    <th>${data.SO}</th>
    <th>${data.BAOpp.toFixed(2)}</th>
    <th>${data.ERA}</th>
    <th>${data.IBB}</th>
    <th>${data.WP}</th>
    <th>${data.HBP}</th>
    <th>${data.BK}</th>
    <th>${data.BFP}</th>
    <th>${data.GF}</th>
    <th>${data.R}</th>
    <th>${data.SH}</th>
    <th>${data.SF}</th>
    <th>${data.GIDP}</th>
  </tr>`;

  $('.table-pitching tfoot').html(html);
}

function activateTableRow(row) {
  $(row).toggleClass('active');
}