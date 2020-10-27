let URL         = 'https://api.mlb-data.ryanrickgauer.com/main.php/pitching?aggregate=true&perPage=100';
let sortColumn  = null;
let sortType    = 'desc';
const urlParams = new URLSearchParams(window.location.search); 

// main
$(document).ready(function() {
  setGlobalVariables();

  retrieveData(loadTableData);

});

function setGlobalVariables() {
  if (urlParams.has('column'))
    sortColumn = urlParams.get('column');
  if (urlParams.has('type') && urlParams.get('type') == 'asc')
    sortType = 'asc';
  if (sortColumn != null)
    URL += '&sort=' + sortColumn + ':' + sortType; 
}


function retrieveData(action) {
  $.getJSON(URL, function(response) {
    action(response);
  });
}


function loadTableData(data) {
  let html = '';
  for (var count = 0; count < data.length; count++) 
    html += getTableRowHtml(data[count]);

  $('.table-pitching tbody').html(html);
}


function getTableRowHtml(data) {
  let name = '<a href="player.php?playerID=' + data.playerID + '">' + data.nameFirst + ' ' + data.nameLast + '</a>';

  let BAOpp = '-';
  if (data.BAOpp != null)
    BAOpp = data.BAOpp.toFixed(2);

  let ERA = '-';

  if (data.ERA != null) {
    ERA = (9 * data.ER) / (data.IPouts / 3);
    ERA = ERA.toFixed(2);
  }


  let html = `
  <tr>
    <td>${name}</td>
    <td>${data.years}</td>
    <td>${data.W}</td>
    <td>${data.L}</td>
    <td>${data.G}</td>
    <td>${data.GS}</td>
    <td>${data.CG}</td>
    <td>${data.SHO}</td>
    <td>${data.SV}</td>
    <td>${data.IPouts}</td>
    <td>${data.H}</td>
    <td>${data.ER}</td>
    <td>${data.HR}</td>
    <td>${data.BB}</td>
    <td>${data.SO}</td>
    <td>${BAOpp}</td>
    <td>${ERA}</td>
    <td>${data.IBB}</td>
    <td>${data.WP}</td>
    <td>${data.HBP}</td>
    <td>${data.BK}</td>
    <td>${data.BFP}</td>
    <td>${data.GF}</td>
    <td>${data.R}</td>
    <td>${data.SH}</td>
    <td>${data.SF}</td>
    <td>${data.GIDP}</td>
  </tr>`;

  return html;
}

