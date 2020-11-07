function Filters(filterUrl) {
  this.filterList = [];

  // if no argument is passed in stop
  if (filterUrl == undefined || filterUrl == null)
    return;


  const filterBlocks = filterUrl.split(',');

  for (let count = 0; count < filterBlocks.length; count++) {
    const filterParts = filterBlocks[count].split(':');

    // ensure there are 3 parts to the filter
    if (filterParts.length != 3)
      continue;

    this.addFilter(filterParts[0], filterParts[1], filterParts[2]);
  }

}

Filters.prototype.addFilter = function(column, conditional, qualifier) {
  const newFilter = {
    column: column,
    conditional: conditional,
    qualifier: qualifier,
  }

  this.filterList.push(newFilter);
}


Filters.prototype.getFiltersString = function() {
  let result = '';

  for (let count = 0; count < this.filterList.length; count++) {
    let filter = this.filterList[count];

    if (count > 0)
      result += ',';

    result += `${filter.column}:${filter.conditional}:${filter.qualifier}`
  }

  return result;
}


