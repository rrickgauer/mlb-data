
function GlobalVariables() {
  const urlParams = new URLSearchParams(window.location.search);

  // this.root = root;

  if (urlParams.get('perPage') != null)
    this.perPage = urlParams.get('perPage');
  else
    this.perPage = 50;

  // sort
  this.sort = urlParams.get('sort');
  this.filters = urlParams.get('filter');
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
  }
}
