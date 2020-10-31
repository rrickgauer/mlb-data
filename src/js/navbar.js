const API_SEARCH = 'http://api.mlb-data.ryanrickgauer.com/main.php/search?perPage=20&q=';


// main
$(document).ready(function() {

  // wait till user finishes typing to execute the search
  let timer = 0;
  $('.navbar-search-input').on('keydown', function() {
    if (timer)
      clearTimeout(timer);
    timer = setTimeout(playerSearch, 400); 
  });

  // close search results menu when clicked off
  $('body *:not(.navbar-search *)').on('click', function() {
    toggleNavbarSearchResultsMenu(false);
  });

  $('.navbar-search-input').on('focus', function() {
    playerSearch();
  });

});

// displays an alert on the screen
function displayAlert(text) {
  $.toast({
    text: text,
    position: 'bottom-center',
    loader: false,
    bgColor: '#3D3D3D',
    textColor: 'white'
  });
}


function playerSearch() {
  let navbarInput = $('.navbar-search-input');
  let query = $(navbarInput).val();

  if (query.length < 2 || query == '') {
    toggleNavbarSearchResultsMenu(false);
    return;
  }

  let url = API_SEARCH + query;

  $.getJSON(url, function(response) {
    let topResults = response.results;

    // if no results break and inform user
    if (topResults.length == 0) {
      let noResultsText = 'No results found.';
      $('.navbar-search-menu').text(noResultsText);
      toggleNavbarSearchResultsMenu(true);
      return;
    }

    let resultsHtml = getNavbarSearchResultsHtml(topResults);
    $('.navbar-search-menu').html(resultsHtml);

    toggleNavbarSearchResultsMenu(true);
  })
  .fail(function(response) {
    console.log(response);
  });

}

function toggleNavbarSearchResultsMenu(toggle) {
  if (toggle == true) 
    $('.navbar-search-menu').removeClass('d-none');
  else
    $('.navbar-search-menu').addClass('d-none');
}



function getNavbarSearchResultsHtml(results) {
  let html = '';

  for (let count = 0; count < results.length; count++) {
    html += `<a href="player.php?playerID=${results[count].playerID}" class="navbar-search-menu-item ">
      ${results[count].nameFirst} ${results[count].nameLast}</a>`;
  }

  return html;
}













