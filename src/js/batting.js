let globalVariables  = new GlobalVariables();
const API            = 'https://api.mlb-data.ryanrickgauer.com/main.php/batting' + globalVariables.getUrl();
let filterColumns    = ["year", "G", "AB", "R", "H", "2B", "3B", "HR", "RBI", "SB", "CS", "BB", "SO", "IBB", "HBP", "SH", "SF", "GIDP"];
let userFilerColumns = [];
let filters          = new Filters(globalVariables.filters);
let emptyRows        = '';
let pagination       = {
  current: null,
  first  : null,
  last   : null,
  next   : null,
};


// main
$(document).ready(function() {
  setUrlInputValues();

  generateBlankRows();
  $('.table-batting tbody').html(emptyRows);
  getData(API, loadTableData, updatePagination);

  $('.btn-pagination.next').on('click', function() {
    $('.table-batting tbody').html(emptyRows);
    getData(pagination.next, loadTableData, updatePagination);
  });

  $('.btn-pagination.previous').on('click', function() {
    $('.table-batting tbody').html(emptyRows);
    getData(pagination.previous, loadTableData, updatePagination);
  });


  $('.btn-filter-new').on('click', function() {
    addNewFilterRow();
  });


  $('.form-filters').on('click', '.btn-filter-delete', function() {
    deleteFilter(this);
  });

  $('.btn-filters-apply').on('click', function() {
    applyFilters();
  });

  $('.btn-sort-apply').on('click', function() {
    applySort();
  });

  $('.select-per-page').on('change', function() {
    applyPerPage();
  });

  $('.table-batting').on('mouseover', '.link-player', function() {
    showPlayerPopover(this);
  });

  $('.table-batting').on('mouseout', '.link-player', function() {
    removePlayerPopover(this);
  });

});



function setUrlInputValues() {

  // set perPage
  const perPageOptions = $('.select-per-page option');
  for (let count = 0; count < perPageOptions.length; count++) {
    if ($(perPageOptions[count]).val() == globalVariables.perPage) {
      $(perPageOptions[count]).prop('selected', true);
      break;
    }

    $(perPageOptions[count]).prop('selected', false);
  }

  // sort type and column
  if (globalVariables.sort != null) {
    // set sort column
    const inputSortColumns = $('#form-sort-column option');
    let i = 0;
    while ($(inputSortColumns[i]).val() != globalVariables.sortColumn) {
      i++;
    }

    $(inputSortColumns[i]).prop('selected', true);

    // set sort type
    if (globalVariables.sortType == 'asc') {
      $('#form-sort-type-asc').prop('checked', true);
      $('#form-sort-type-desc').prop('checked', false);
    } else {
      $('#form-sort-type-asc').prop('checked', false);
      $('#form-sort-type-desc').prop('checked', true);
    }
  }


  // add existing filters to the modal
  const filterList = filters.filterList;
  for (let count = 0; count < filterList.length; count++)
    addNewFilterRow(filterList[count].column, filterList[count].conditional, filterList[count].qualifier);

}


function showPlayerPopover(link) {
  $('.table-batting [data-toggle="popover"]').popover('hide');
  const playerID = $(link).closest('.table-batting-row').attr('data-player-id');
  const playerUrl = 'https://api.mlb-data.ryanrickgauer.com/main.php/people/' + playerID;

  $.getJSON(playerUrl, function(response) {
    // if the mouse is still not hovering over the link exit
    if (!$(link).is(':hover'))
      return;

    let content = getPlayerPopoverContent(response);
    $(link).attr('data-content', content);
    $(link).popover('show');
  });

}

function getPlayerPopoverContent(data) {

  let html = `
  <div class="d-flex align-items-start">
    <div class="player-bio-left mr-3">
      <div class="player-bio-item">
        <img src="${data.results.image}" width="60" height="90" alt="Player image" class="player-item-data image">
      </div>
    </div>
    <div class="player-bio-right">
      <h4 class="player-bio-item-data name">${data.results.nameFirst} ${data.results.nameLast}</h4>
      <div class="player-bio-item">
        <span class="player-bio-item-label">Debut date</span>
        <span class="player-bio-item-data debut-date">${data.results.debuteDate}</span>
      </div>
      <div class="player-bio-item">
        <span class="player-bio-item-label">Team</span>
        <span class="player-bio-item-data team">${data.results.team}</span>
      </div>
    </div>
  </div>
  `;

  return html;

}

function removePlayerPopover(link) {
  $('.table-batting [data-toggle="popover"]').popover('hide');
  // $(link).popover('hide');
}

function applyPerPage() {
  let newPerPage = $('.select-per-page option:checked').val();
  globalVariables.perPage = newPerPage;
  refreshPage();
}


function updatePagination(newPagination) {
  pagination.current  = newPagination.current;
  pagination.first    = newPagination.first;
  pagination.last     = newPagination.last;
  pagination.next     = newPagination.next;
  pagination.previous = newPagination.previous;

  // disable the previous button if previous link is null
  if (pagination.previous == null) {
    $('.btn-pagination.previous').prop('disabled', true);
  } else {
    $('.btn-pagination.previous').prop('disabled', false);
  }

}


function generateBlankRows() {
  let html = '';

  for (var count = 0; count < globalVariables.perPage; count++) {
    html += `
    <tr>
      <td colspan="19">
        <div class="text-center">
        <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
        </div></div>
      </td>
    </tr>`;
  }

  emptyRows = html;
}


function getData(url, actionResults, actionPagination) {
  $.getJSON(url, function(response) {
    actionResults(response.results);
    actionPagination(response.pagination);    
  })
  .fail(function(response) {
    console.error(response);
  });
}

function loadTableData(data) {
  let html = '';
  for (var count = 0; count < data.length; count++) 
    html += getTableRowHtml(data[count]);
  
  $('.table-batting tbody').html(html);
}

function getTableRowHtml(data) {

  data = replaceNulls(data, '-');

  let doubles = data['2B'];
  let triples = data['3B'];

  let player = `<a data-toggle="popover" data-html="true" data-placement="bottom" 
  class="link-player"
   href="player.php?playerID=${data.playerID}">${data.nameFirst} ${data.nameLast}</a>`;

  let html = `
    <tr class="table-batting-row" data-player-id="${data.playerID}">
      <td>${player}</td>
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

  return html;
}

function replaceNulls(data, newCharacter = '-') {
  const dataKeys = Object.keys(data);
  for (let count = 0; count < dataKeys.length; count++) {
    const thisKey = dataKeys[count];

    if (data[thisKey] == null)
      data[thisKey] = newCharacter;
  }

  return data;
}


function addNewFilterRow(column, conditional, qualifier) {
  let html = '<div class="input-group input-group-filter">';

  // column
  html += getFilterColumnOptionsHtml(column);

  // conditional
  html += `
    <select class="form-control filter-conditional">
      <option value="=">=</option>
      <option value="!=">!=</option>
      <option value=">=">>=</option>
      <option value="<="><=</option>
      <option value=">">></option>
      <option value="<"><</option>
    </select>`;

    // set the conditional to selected if it is set
    if (conditional != undefined)
      $(html).find('.filter-conditional option[value="' + conditional + '"]').prop('selected', true);

  // qualifier
  if (qualifier == undefined)
    html += '<input type="text" class="form-control filter-qualifier">';
  else
    html += `<input type="text" class="form-control filter-qualifier" value="${qualifier}">`;

  // delete filter button
  html += `
    <div class="input-group-append">
      <button class="btn btn-outline-secondary btn-filter-delete" type="button"><i class='bx bx-trash'></i></button>
    </div>`;

  html += '</div>';

  $('.form-filters').append(html);
}


// TODO: don't need to check for used filters
function getFilterColumnOptionsHtml(existingColumn) {
  // get a list of already used filters
  let usedFilters = $('.filter-column option:checked').text();
  let html        = '<select class="form-control filter-column">';

  for (let count = 0; count < filterColumns.length; count++) {

    if (existingColumn == undefined || existingColumn != filterColumns[count]) {
      html += `<option value="${filterColumns[count]}">${filterColumns[count]}</option>`;      
    } else {
      html += `<option selected value="${filterColumns[count]}">${filterColumns[count]}</option>`;  
    }
  }
  
  html += '</select>';
  return html;
}

//////////////////////////////////////////
// remove a filter from the filter list //
//////////////////////////////////////////
function deleteFilter(btn) {
  $(btn).closest('.input-group-filter').remove();
}


// Executes when the .btn-filters-apply button is clicked
function applyFilters() {
  // reset the filters
  filters = new Filters();

  let filterRows = $('.input-group-filter');

  for (let count = 0; count < filterRows.length; count++) {
    let newColumn      = $(filterRows[count]).find('.filter-column option:checked').val();
    let newConditional = $(filterRows[count]).find('.filter-conditional option:checked').val();
    let newQualifier   = $(filterRows[count]).find('.filter-qualifier').val();
    filters.addFilter(newColumn, newConditional, newQualifier);
  }

  // update the filters
  globalVariables.filters = filters.getFiltersString();

  refreshPage();
}


function applySort() {
  let sortColumn       = $('.sort-column option:checked').val();
  let sortType         = $('input[name="form-sort-type"]:checked').val();
  let sortResult       = `${sortColumn}:${sortType}`;
  globalVariables.sort = sortResult;

  refreshPage();
}

function refreshPage() {
  // go to the new page
  window.location.href = window.location.protocol + window.location.pathname + globalVariables.getUrl();
}

