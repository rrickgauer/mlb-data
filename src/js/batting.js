let URL         = 'https://api.mlb-data.ryanrickgauer.com/main.php/batting?aggregate=false&perPage=10';
let sortColumn  = null;
let sortType    = 'desc';
const urlParams = new URLSearchParams(window.location.search); 
let data = null;

let paginationPrevious = [];

let pagination = {
  first: null,
  previous: null,
  next: null,
  last: null,
}

// main
$(document).ready(function() {
  testFunction();

  paginationPrevious.push(URL);

  $('.btn-pagination.next').on('click', function() {
    // console.log(pagination.next);
    // console.log(pagination);
    paginationPrevious.push(pagination.previous);
    getData(pagination.next, loadTableData, paginationActions);
    console.log(paginationPrevious);
  });

  $('.btn-pagination.previous').on('click', function() {
    // console.log(pagination);

    // paginationPrevious.pop()
    getData(paginationPrevious.pop(), loadTableData, paginationActions);
    console.log(paginationPrevious);
  });
});


function testFunction() {
  // console.log(pagination);
  getData(URL, loadTableData, paginationActions);
}

function paginationActions(paginationData) {
  pagination.first    = paginationData.first;
  pagination.previous = pagination.next;
  pagination.next     = paginationData.next;
  pagination.last     = paginationData.last;
}

function paginationActionsPrev(paginationData) {
  pagination.first    = paginationData.first;
  pagination.next     = paginationData.next;
  pagination.last     = paginationData.last;
}









function setGlobalVariables() {
  if (urlParams.has('sort-column'))
    sortColumn = urlParams.get('sort-column');
  if (urlParams.has('sort-type') && urlParams.get('sort-type') == 'asc')
    sortType = 'asc';
  if (sortColumn != null)
    URL += '&sort=' + sortColumn + ':' + sortType; 
}

function setSelectedInputValues() {
  // choose which sort type to check
  if (sortType == 'asc')
    $('#batting-inlineradio-asc').prop('checked', true);
  else
    $('#batting-inlineradio-desc').prop('checked', true);

  if (sortColumn == null)
    return;

  // display set the previously selected option
  $('#batting-select option[value="' + sortColumn + '"]').prop('selected', true);
}

function getData(url, actionResults, actionPagination, actionFail) {

  console.log('Fetching data from: ' + url);

  $.getJSON(url, function(response) {
    actionResults(response.results);
    actionPagination(response.pagination);
    console.log(pagination);
  })
  .fail(function(response) {
    actionFail();
  });
}

function loadTableData(data) {
  let html = '';
  for (var count = 0; count < data.length; count++) 
    html += getTableRowHtml(data[count]);
  

  $('.table-batting tbody').html(html);
}

function getTableRowHtml(data) {

  let doubles = data['2B'];
  let triples = data['3B'];

  let player = `<a href="player.php?playerID=${data.playerID}">${data.nameFirst} ${data.nameLast}</a>`;

  let html = `
    <tr class="table-batting-row">
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





