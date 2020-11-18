/*jshint esversion: 6 */


/////////////////
// Constructor //
/////////////////
function Module(tableSelector, baseApiUrl, filterColumns) {
  this.globalVariables  = new GlobalVariables();
  this.API              = baseApiUrl + this.globalVariables.getUrl();
  this.filterColumns    = filterColumns;
  this.userFilerColumns = [];
  this.filters          = new Filters(this.globalVariables.filters);
  this.emptyRows        = '';
  this.pagination       = new Pagination();
  this.datatable        = $(tableSelector);
}


Module.prototype.init = function() {
  const self = this;

  this.setUrlInputValues();
  this.generateBlankRows();

  $(this.datatable).find('tbody').html(this.emptyRows);

  this.getData(this.API, this.loadTableData.bind(this), this.updatePagination.bind(this));

  $('.btn-pagination.next').on('click', function(e) {
    $(self.datatable).find('tbody').html(self.emptyRows);
    self.getData(self.pagination.next, self.loadTableData.bind(self), self.updatePagination.bind(self));
  });

  $('.btn-pagination.previous').on('click', function() {
    $(self.datatable).find('tbody').html(self.emptyRows);
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


Module.prototype.getData = function(url, actionResults, actionPagination) {
  $.getJSON(url, function(response) {
    actionResults(response.results);
    actionPagination(response.pagination);    
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
  // $('.table-fielding [data-toggle="popover"]').popover('hide');
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
        <div class="text-center">
        <div class="spinner-border spinner-border-sm" role="status">
        <span class="sr-only">Loading...</span>
        </div></div>
      </td>
    </tr>`;

  }

  this.emptyRows = html;

}

Module.prototype.getTableRowHtml = function(data) {
  data = this.replaceNulls(data, '-');

  let player = '<a data-toggle="popover" data-html="true" data-placement="bottom" class="link-player"';
  player += `href="player.php?playerID=${data.playerID}">${data.nameFirst} ${data.nameLast}</a>`;
  
  let html = `<tr class="table-fielding-row" data-player-id="${data.playerID}"><td>${player}</td>`;

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
  // reset the this.filters
  this.filters = new Filters();

  let filterRows = $('.input-group-filter');

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

