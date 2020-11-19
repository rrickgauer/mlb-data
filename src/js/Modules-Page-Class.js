/*jshint esversion: 6 */


/////////////////
// Constructor //
/////////////////
function Module(tableSelector, baseApiUrl, filterColumns) {
  this.globalVariables  = new GlobalVariables();
  this.baseAPI = baseApiUrl;
  this.API              = baseApiUrl + this.globalVariables.getUrl();
  this.filterColumns    = filterColumns;
  this.userFilerColumns = [];
  this.filters          = new Filters(this.globalVariables.filters);
  this.emptyRows        = '';
  this.pagination       = new Pagination();
  this.datatable        = $(tableSelector);


  // initialize the details modal
  this.initDetailsModal();                            

  // set up the super table
  this.superTable = new SuperTable('.table', '.super-table-checkboxes');
}


Module.prototype.init = function() {
  const self = this;

  this.setUrlInputValues();
  this.generateBlankRows();

  $(this.datatable).find('tbody').html(this.emptyRows);
  this.disablePaginationButtons();

  this.getData(this.API, this.loadTableData.bind(this), this.updatePagination.bind(this), this.loadResultsCount);

  $('.btn-pagination.next').on('click', function(e) {
    $(self.datatable).find('tbody').html(self.emptyRows);
    self.disablePaginationButtons();
    self.getData(self.pagination.next, self.loadTableData.bind(self), self.updatePagination.bind(self));
  });

  $('.btn-pagination.previous').on('click', function() {
    $(self.datatable).find('tbody').html(self.emptyRows);
    self.disablePaginationButtons();
    self.getData(self.pagination.previous, self.loadTableData.bind(self), self.updatePagination.bind(self));
  });

  $('.btn-filter-new').on('click', function() {
    self.addNewFilterRow();
  });

  $('.form-filters').on('click', '.btn-filter-delete', function() {
    self.deleteFilter(this);
  });

  $('.btn-filters-apply').on('click', function() {
    self.applyFilters();
  });

  $('.btn-sort-apply').on('click', function() {
    self.applySort();
  });

  $('.select-per-page').on('change', function() {
    self.applyPerPage();
  });

  $(this.datatable).on('mouseover', '.link-player', function() {
    self.showPlayerPopover(this);
  });

  $(this.datatable).on('mouseout', '.link-player', function() {
    self.removePlayerPopover(this);
  });


  $(this.datatable).on('click', 'tbody tr', function() {
    self.openDetailsModal(this);
  });

  // if player link is clicked, don't open the details modal
  $(this.datatable).on('click', 'tbody td a', function(e) {
    e.stopPropagation(); 
  });


  $('.modal-details').on('hidden.bs.modal', function() {
    self.initDetailsModal();
  });

}


Module.prototype.initDetailsModal = function() {

  // bio
  this.showDetailsModalBioSkeletons(true);

  let html = '';

  for (let count = 0; count < this.filterColumns.length; count++) {
    const columnName = this.filterColumns[count];

    let columnNameDisplay = columnName;

    if (columnNameDisplay == 'teamName')
      columnNameDisplay = 'Team';
    else if (columnNameDisplay == 'year')
      columnNameDisplay = 'Year';

    html += `
    <li class="modal-details-item list-group-item" data-key="${columnName}">
      <dt>${columnNameDisplay}</dt>
      <dd><div class="skeleton-text skeleton-effect-wave">156</div></dd>
    </li>`;
  }

  $('.modal-details-items').html(html);
}

Module.prototype.showDetailsModalBioSkeletons = function(showSkeletons = false) {

  if (!showSkeletons) {
    $('.player-bio .player-bio-item').removeClass('skeleton-text').removeClass('skeleton-effect-wave');
    $('.player-bio .player-bio-item-data.name').removeClass('skeleton-text').removeClass('skeleton-effect-wave');
  } else {
    $('.player-bio .player-bio-item').addClass('skeleton-text').addClass('skeleton-effect-wave');
    $('.player-bio .player-bio-item-data.name').addClass('skeleton-text').addClass('skeleton-effect-wave');
    $('.player-bio .player-item-data.image img').attr("src", 'https://www.elitefoods.com.au/backend/user_images/avatar.jpg');
  }

}

Module.prototype.openDetailsModal = function(row) {
  $('.modal-details').modal('show');
  
  const self = this;

  // construct the url
  const playerID = $(row).attr('data-player-id');
  const year     = $(row).attr('data-year');
  const stint    = $(row).attr('data-stint');
  const dataUrl  = this.baseAPI + `/${playerID}?filter=year:=:${year},stint:=:${stint}`;

  this.loadDetailsModalBioData(playerID);
  this.getData(dataUrl, self.loadDetailsModalModuleData.bind(this));
}


Module.prototype.loadDetailsModalBioData = function(playerID) {
  const self = this;
  const playerUrls = new Player(playerID);


  this.getData(playerUrls.bio, function(data) {

    // image
    $('.player-bio .player-item-data.image img').attr("src", data.image);

    // name
    let nameDisplay      = data.nameFirst + ' ' + data.nameLast;
    $('.player-bio .player-bio-item-data.name').text(nameDisplay);

    // hof
    if (data.hallOfFame == 'y')
      $('.player-bio .player-bio-item-data.hof').removeClass('d-none');

    // bats
    $('.player-bio .player-bio-item-data.bats').text(data.bats);

    // throws
    $('.player-bio .player-bio-item-data.throws').text(data.throws);

    // height
    let height = self.inchesToFeet(data.height);
    let heightDisplay = height.feet + '-' + height.inches;
    $('.player-bio .player-bio-item-data.height').text(heightDisplay);

    // weight
    $('.player-bio .player-bio-item-data.weight').text(data.weight + 'lb');

    // birthday
    let birthDateDisplay = self.getDisplayDate(data.birthDate);
    $('.player-bio .player-bio-item-data.birth-date').text(birthDateDisplay );

    // birth location - city and state
    let birthCityState   = data.birthCity + ', ' + data.birthState;
    $('.player-bio .player-bio-item-data.birth-city-state').text(birthCityState);
    
    // debut date
    let debutDateDisplay = self.getDisplayDate(data.debuteDate);
    $('.player-bio .player-bio-item-data.debut-date').text(debutDateDisplay);

    // link to player's page
    const playerPage = 'player.php?playerID=' + playerID;
    $('.player-bio .player-bio-item-data.player-page-link').attr("href", playerPage);

    // hide skeletons
    self.showDetailsModalBioSkeletons(false);
  });
}


Module.prototype.inchesToFeet = function(inches) {
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

Module.prototype.getDisplayDate = function(date) {
  let  dateData = date.split("-");
  let result = dateData[1] + '/' + dateData[2] + '/' + dateData[0];
  return result;
}


Module.prototype.loadDetailsModalModuleData = function(data) {
  data = data[0];

  // load each key into the details modal
  for (let count = 0; count < this.filterColumns.length; count++) {
    const key = this.filterColumns[count];
    const value = data[key];

    // set the element to the key
    $(`.modal-details-item[data-key="${key}"] dd`).text(value);
  }
}



Module.prototype.disablePaginationButtons = function() {
  const html = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';
  $('.btn-pagination').html(html).prop('disabled', true);
}



Module.prototype.setUrlInputValues = function() {
  // set perPage
  const perPageOptions = $('.select-per-page option');
  for (let count = 0; count < perPageOptions.length; count++) {
    if ($(perPageOptions[count]).val() == this.globalVariables.perPage) {
      $(perPageOptions[count]).prop('selected', true);
      break;
    }

    $(perPageOptions[count]).prop('selected', false);
  }

  // sort type and column
  if (this.globalVariables.sort != null) {
    // set sort column
    const inputSortColumns = $('#form-sort-column option');
    let i = 0;
    while ($(inputSortColumns[i]).val() != this.globalVariables.sortColumn) {
      i++;
    }

    $(inputSortColumns[i]).prop('selected', true);

    // set sort type
    if (this.globalVariables.sortType == 'asc') {
      $('#form-sort-type-asc').prop('checked', true);
      $('#form-sort-type-desc').prop('checked', false);
    } else {
      $('#form-sort-type-asc').prop('checked', false);
      $('#form-sort-type-desc').prop('checked', true);
    }
  }


  // add existing this.filters to the modal
  const filterList = this.filters.filterList;
  for (let count = 0; count < filterList.length; count++)
    this.addNewFilterRow(filterList[count].column, filterList[count].conditional, filterList[count].qualifier);
}


Module.prototype.getData = function(url, actionResults, actionPagination, actionResultsCount) {
  $.getJSON(url, function(response) {

    if (actionResultsCount != undefined)
      actionResultsCount(response.resultsCount)

    if (actionPagination != undefined)
      actionPagination(response.pagination);


    actionResults(response.results);
      
  })
  .fail(function(response) {
    console.error(response);
  });

}


Module.prototype.showPlayerPopover = function(link) {
  const self = this;

  $(this.datatable).find('[data-toggle="popover"]').popover('hide');

  const playerID = $(link).closest('tr').attr('data-player-id');
  const playerUrl = 'https://api.mlb-data.ryanrickgauer.com/main.php/people/' + playerID;

  $.getJSON(playerUrl, function(response) {
    // if the mouse is still not hovering over the link exit
    if (!$(link).is(':hover'))
      return;

    let content = self.getPlayerPopoverContent(response);
    $(link).attr('data-content', content);
    $(link).popover('show');
  });
}


Module.prototype.getPlayerPopoverContent = function(data) {
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


Module.prototype.removePlayerPopover = function(link) {
  $(this.datatable).find('[data-toggle="popover"]').popover('hide');
}


Module.prototype.applyPerPage = function()   {
  let newPerPage = $('.select-per-page option:checked').val();
  this.globalVariables.perPage = newPerPage;
  this.refreshPage();
}


Module.prototype.updatePagination = function(newPagination) {
  this.pagination.current  = newPagination.current;
  this.pagination.first    = newPagination.first;
  this.pagination.last     = newPagination.last;
  this.pagination.next     = newPagination.next;
  this.pagination.previous = newPagination.previous;

  // restore arrows
  $('.btn-pagination.previous').html('<');
  $('.btn-pagination.next').html('>');

  // check if the current page is the last page in the dataset
  if (this.pagination.current == this.pagination.next) {
    $('.btn-pagination.next').prop('disabled', true);         // disable next
  } else {
    $('.btn-pagination.next').prop('disabled', false);        // enable next
  }

  // disable the previous button if previous link is null
  if (this.pagination.previous == null) {
    $('.btn-pagination.previous').prop('disabled', true);
  } else {
    $('.btn-pagination.previous').prop('disabled', false);
  }

}

// TODO: need to set the result of this to a instance member
Module.prototype.generateBlankRows = function() {
  let html = '';
  
  const numColumns = $(this.datatable).find('th').length;

  for (let count = 0; count < this.globalVariables.perPage; count++) {
    html += `
    <tr>
      <td colspan="${numColumns}">
        <div class="skeleton-block skeleton-effect-wave">
       </div>
      </td>
    </tr>`;

  }

  this.emptyRows = html;
}

Module.prototype.getTableRowHtml = function(data) {
  data = this.replaceNulls(data, '-');

  // create the player link
  let player = '<a data-toggle="popover" data-html="true" data-placement="bottom" class="link-player"';
  player += `href="player.php?playerID=${data.playerID}">${data.nameFirst} ${data.nameLast}</a>`;
  
  let html = `<tr data-player-id="${data.playerID}" data-year="${data.year}" data-stint=${data.stint}>`;
  html += `<td>${player}</td>`;

  // build the rest of the row from the column keys
  for (let count = 0; count < this.filterColumns.length; count++) {
    let columnKey = this.filterColumns[count];
    html += `<td>${data[columnKey]}</td>`;
  }

  html += '</tr>';

  return html;
}


Module.prototype.loadTableData = function(data) {
  const self = this;

  let html = ''
  for (let count = 0; count < data.length; count++) {
    html += this.getTableRowHtml(data[count]);
  }

  $(this.datatable).find('tbody').html(html);

  // hide the previously hidden columns
  this.superTable.reset();
}

Module.prototype.loadResultsCount = function(resultsCount) {
  $('.results-count-data').addClass('badge-secondary').html(resultsCount);
}


Module.prototype.replaceNulls = function(data, newCharacter = '-') {
  const dataKeys = Object.keys(data);
  for (let count = 0; count < dataKeys.length; count++) {
    const thisKey = dataKeys[count];

    if (data[thisKey] == null)
      data[thisKey] = newCharacter;
  }

  return data;
}


Module.prototype.addNewFilterRow = function(column, conditional, qualifier) {
  let html = '<div class="input-group input-group-filter">';

  // column
  html += this.getFilterColumnOptionsHtml(column);

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


Module.prototype.getFilterColumnOptionsHtml = function(existingColumn) {

  // get a list of already used this.filters
  let usedFilters = $('.filter-column option:checked').text();
  let html        = '<select class="form-control filter-column">';

  for (let count = 0; count < this.filterColumns.length; count++) {
    // text to be displayed in the option
    let filterColumnDisplay = this.filterColumns[count];

    // standardize the display text to match the table headers
    if (filterColumnDisplay == 'year')
      filterColumnDisplay = 'Year';
    else if (filterColumnDisplay == 'teamName')
      filterColumnDisplay = 'Team';


    if (existingColumn == undefined || existingColumn != this.filterColumns[count]) {
      html += `<option value="${this.filterColumns[count]}">${filterColumnDisplay}</option>`;      
    } else {
      html += `<option selected value="${this.filterColumns[count]}">${filterColumnDisplay}</option>`;  
    }
  }
  
  html += '</select>';
  return html;

}


Module.prototype.deleteFilter = function(btn) {
  $(btn).closest('.input-group-filter').remove();
}


Module.prototype.applyFilters = function()   {
  // ensure none of the qualifiers are blank
  const qualifiers = $('.filter-qualifier');
  for (let count = 0; count < qualifiers.length; count++) {
    if ($(qualifiers[count]).val() == '') {
        this.displayAlert('Error! Empty qualifier.');
        return;
      }
  }

  // reset the this.filters
  this.filters = new Filters();

  // add all the filters
  const filterRows = $('.input-group-filter');
  for (let count = 0; count < filterRows.length; count++) {
    let newColumn      = $(filterRows[count]).find('.filter-column option:checked').val();
    let newConditional = $(filterRows[count]).find('.filter-conditional option:checked').val();
    let newQualifier   = $(filterRows[count]).find('.filter-qualifier').val();

    this.filters.addFilter(newColumn, newConditional, newQualifier);
  }

  // update the this.filters
  this.globalVariables.filters = this.filters.getFiltersString();

  this.refreshPage();

}

Module.prototype.applySort = function()   {
  let sortColumn       = $('.sort-column option:checked').val();
  let sortType         = $('input[name="form-sort-type"]:checked').val();
  let sortResult       = `${sortColumn}:${sortType}`;
  this.globalVariables.sort = sortResult;

  this.refreshPage();
}

Module.prototype.refreshPage = function() {
  window.location.href = window.location.protocol + window.location.pathname + this.globalVariables.getUrl();
}


// displays an alert on the screen
Module.prototype.displayAlert = function(text) {
  $.toast({
    text: text,
    position: 'bottom-center',
    loader: false,
    bgColor: '#3D3D3D',
    textColor: 'white'
  });
}

