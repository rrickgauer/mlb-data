let URL         = 'https://api.mlb-data.ryanrickgauer.com/main.php/batting?aggregate=true&perPage=100';
let sortColumn  = null;
let sortType    = 'desc';
const urlParams = new URLSearchParams(window.location.search); 

// main
$(document).ready(function() {
  setGlobalVariables();
  setSelectedInputValues();
  getData(URL, loadTableData);
});

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

function getData(url, action) {
  $.getJSON(url, function(response) {
    action(response);
  })
  .fail(function(response) {
    alert('Error fetching data from API');
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
      <td>${data.years}</td>
      <td>${data.G}</td>
      <td>${data.G_batting}</td>
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