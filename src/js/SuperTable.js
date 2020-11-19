function SuperTable(table, checkArea) {
  this.table         = table;
  this.checkArea     = checkArea;
  this.columnHeaders = this.getColumnHeaders();

  this.hiddenClassName = 'super-table-hidden';
  this.checkClassName = 'check-toggle-table-column'

  this.generateCheckboxes();
  this.init();
}

SuperTable.prototype.getColumnHeaders = function() {
  const colHeaders = $(this.table).find('thead th');

  const colHeaderNames = [];
  for (let count = 0; count < colHeaders.length; count++) {
    colHeaderNames.push($(colHeaders[count]).text());
  }

  return colHeaderNames;
}

SuperTable.prototype.generateCheckboxes = function() {
  let html = '';

  for (let count = 0; count < this.columnHeaders.length; count++)
    html += this.getCheckboxHtml(this.columnHeaders[count], count);

  $(this.checkArea).html(html);
}


SuperTable.prototype.getCheckboxHtml = function(column, index) {
  const checkboxID = `table-column-checkbox-${index}`;

  let html = `
  <div class="form-check">
    <input class="form-check-input ${this.checkClassName}" type="checkbox" value="${index}" id="${checkboxID}" checked>
    <label class="form-check-label" for="${checkboxID}">${column}</label>
  </div>`;

  return html;
}

SuperTable.prototype.init = function() {
  const self = this;

  $(this.checkArea).on('click', `.${self.checkClassName}`, function() {
    self.toggleTableColumn(this);
  });
}


SuperTable.prototype.toggleTableColumn = function(check) {
  // don't allow all columns to be hidden
  if (!check.checked && this.getNumberOfVisibleColumns() <= 1) {
    $(check).prop('checked', true);
    return;
  }

  const columnIndex = check.value;

  // hide header
  $(this.table).find(`thead th:eq(${columnIndex})`).toggleClass(this.hiddenClassName);

  // hide body column
  $(this.table).find('tbody tr').find(`td:eq(${columnIndex})`).toggleClass(this.hiddenClassName);
}

SuperTable.prototype.hideTableColumn = function(index) {
  $(this.table).find(`thead th:eq(${index})`).addClass(this.hiddenClassName);
  $(this.table).find('tbody tr').find(`td:eq(${index})`).addClass(this.hiddenClassName);
}

SuperTable.prototype.showTableColumn = function(index) {
  $(this.table).find(`thead th:eq(${index})`).removeClass(this.hiddenClassName);
  $(this.table).find('tbody tr').find(`td:eq(${index})`).removeClass(this.hiddenClassName);
}

SuperTable.prototype.showAllColumns = function() {
  // show header
  $(this.table).find(`thead th`).removeClass(this.hiddenClassName);

  // show body column
  $(this.table).find('tbody td').removeClass(this.hiddenClassName);

  $(this.checkArea).find(this.checkClassName).prop('checked', true);
}


SuperTable.prototype.getNumberOfVisibleColumns = function() {
  return $(this.table).find('thead th').not(this.hiddenClassName).length;
}


SuperTable.prototype.isIndexHidden = function(index) {
  return $(this.table).find(`thead th:eq(${index})`).hasClass(this.hiddenClassName);
}


SuperTable.prototype.getHiddenColumnIndexes = function() {
  let hiddenColumnIndexes = [];
  let ths = $(this.table).find('thead th');

  for (let count = 0; count < ths.length; count++) {
    if (this.isIndexHidden(count))
      hiddenColumnIndexes.push(count);
  }

  return hiddenColumnIndexes;
}


SuperTable.prototype.reset = function() {
  let hiddenColumnIndexes = this.getHiddenColumnIndexes();

  for (let count = 0; count < hiddenColumnIndexes.length; count++) {
    this.hideTableColumn(hiddenColumnIndexes[count]);
  }
}
