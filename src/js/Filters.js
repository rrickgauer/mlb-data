function Filters() {
  this.filterList = [];
}

Filters.prototype = {

  addFilter: function(column, conditional, qualifier) {
    const newFilter = {
      column: column,
      conditional: conditional,
      qualifier: qualifier,
    }

    this.filterList.push(newFilter);
  },

  getFiltersString: function() {
    let result = '';

    for (let count = 0; count < this.filterList.length; count++) {
      let filter = this.filterList[count];

      if (count > 0)
        result += ',';

      result += `${filter.column}:${filter.conditional}:${filter.qualifier}`
    }

    return result;
  }

}
