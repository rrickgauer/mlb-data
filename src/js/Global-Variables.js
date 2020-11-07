
function GlobalVariables() {
  const urlParams = new URLSearchParams(window.location.search);

  // this.root = root;

  if (urlParams.get('perPage') != null)
    this.perPage = urlParams.get('perPage');
  else
    this.perPage = 10;

  // sort
  this.sort = urlParams.get('sort');
  this.filters = urlParams.get('filter');

  // split sort into column and type
  this.sortColumn = null;
  this.sortType   = null;

  // make sure the sort is set
  if (this.sort != null) {
    const sortData = this.sort.split(':');
    this.sortColumn = sortData[0];
    this.sortType = sortData[1];
  }

}


GlobalVariables.prototype = {
  getUrl: function() {
    // let result = this.root + '?perPage=' + this.perPage;
    let result = '?perPage=' + this.perPage;

    if (this.filters != null)
      result += '&filter=' + this.filters;
    if (this.sort != null)
      result += '&sort=' + this.sort;

    return result;
  },
}
