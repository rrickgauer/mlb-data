<?php require_once('HTML-Generator.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <?php include('header.php'); ?>
  <title>MLB Data - Pitching</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">
    <h1 class="text-center mt-5 mb-5">Pitching</h1>

    <!-- data table -->
    <div class="card card-table card-module mt-3">

      <!-- header -->
      <div class="card-header">
        <!-- results count -->
        <div class="results-count">
          <span class="h5">Results&nbsp;</span>
          <span class="results-count-data badge">
            <div class="spinner-border spinner-border-sm" role="status"></div>
          </span>
        </div>

        <!-- toolbar -->
        <div class="toolbar">

          <!-- per page -->
          <select class="form-control select-per-page">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="500">500</option>
            <option value="1000">1000</option>
          </select>

          <!-- super table dropdown -->
          <div class="dropdown dropdown-super-table">
            <button class="btn btn-primary btn-sm" type="button" data-toggle="dropdown">
              <i class='bx bx-list-check'></i>
            </button>
             <div class="dropdown-menu">
               <!-- checkboxes to toggle columns -->
               <div class="super-table-checkboxes"></div>
             </div>
          </div>
          
          <!-- filters -->
          <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-filter-pitching">Filters</button>

          <!-- sort -->
          <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-sort-pitching">Sort</button>

         
          <!-- pagination -->
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-primary btn-pagination previous" disabled><</button>
            <button type="button" class="btn btn-primary btn-pagination next">></button>
          </div>
        </div>
      </div>

      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-sm table-pitching">
            <thead><tr>
              <th>Player</th>
              <th>Team</th>
              <th>Year</th>
              <th>W</th>
              <th>L</th>
              <th>G</th>
              <th>GS</th>
              <th>CG</th>
              <th>SHO</th>
              <th>SV</th>
              <th>IPouts</th>
              <th>H</th>
              <th>ER</th>
              <th>HR</th>
              <th>BB</th>
              <th>SO</th>
              <th>BAOpp</th>
              <th>ERA</th>
              <th>IBB</th>
              <th>WP</th>
              <th>HBP</th>
              <th>BK</th>
              <th>BFP</th>
              <th>GF</th>
              <th>R</th>
              <th>SH</th>
              <th>SF</th>
              <th>GIDP</th>
            </tr></thead>
            <tbody>
<!--               <tr><td colspan="21" rowspan="20">
                <div class="text-center mt-5 mb-5">
                  <?php //echo Html::getSpinner() ?>
                </div>
              </td></tr> -->

              <tr><td colspan="21" rowspan="20">
                <div class="skeleton-block skeleton-effect-wave">
                  
                </div>
              </td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

  <!-- filter modal -->
  <div class="modal fade modal-filter" id="modal-filter-pitching" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Filters</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- filter inputs go here -->
          <form class="form-filters"></form>

          <!-- new filter button -->
          <button type="button" class="btn btn-sm btn-outline-secondary form-control btn-filter-new mt-3">Add new filter</button>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary btn-filters-apply">Apply filters</button>
        </div>
      </div>
    </div>
  </div>

  <!-- sort modal -->
  <div class="modal fade modal-sort" id="modal-sort-pitching" tabindex="-1">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Sorting</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <!-- filter inputs go here -->
          <form class="form-sort">

            <div class="form-group">
              <label for="form-sort-column">Column</label>
              <select class="form-control sort-column mb-3" id="form-sort-column">
                <option value="year">Year</option>
                <option value="teamName">Team</option>
                <option value="W">W</option>
                <option value="L">L</option>
                <option value="G">G</option>
                <option value="GS">GS</option>
                <option value="CG">CG</option>
                <option value="SHO">SHO</option>
                <option value="SV">SV</option>
                <option value="IPouts">IPouts</option>
                <option value="H">H</option>
                <option value="ER">ER</option>
                <option value="HR">HR</option>
                <option value="BB">BB</option>
                <option value="SO">SO</option>
                <option value="BAOpp">BAOpp</option>
                <option value="ERA">ERA</option>
                <option value="IBB">IBB</option>
                <option value="WP">WP</option>
                <option value="HBP">HBP</option>
                <option value="BK">BK</option>
                <option value="BFP">BFP</option>
                <option value="GF">GF</option>
                <option value="R">R</option>
                <option value="SH">SH</option>
                <option value="SF">SF</option>
                <option value="GIDP">GIDP</option>
              </select>
            </div>
            

            <div class="form-check">
              <input class="form-check-input" type="radio" name="form-sort-type" id="form-sort-type-asc" value="asc">
              <label class="form-check-label" for="form-sort-type-asc">
                Ascending
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="form-sort-type" id="form-sort-type-desc" value="desc" checked>
              <label class="form-check-label" for="form-sort-type-desc">
                Descending
              </label>
            </div>
          </form>
          <button type="button" class="btn btn-sm btn-outline-primary form-control mt-3 btn-sort-apply">Sort table</button>
        </div>
      </div>
    </div>
  </div>

  <!-- table row details modal -->
  <div class="modal modal-details" id="modal-details-batting" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Details</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">

          <!-- player bio -->
          <div class="player-bio">
            <!-- player image -->
            <div class="player-item-data image">
              <img src="https://www.elitefoods.com.au/backend/user_images/avatar.jpg" alt="Player image">
            </div>

            <div class="player-bio-right">
              <!-- name -->
              <h2 class="player-bio-item-data name"></h2>

              <!-- hall of fame -->
              <div class="player-bio-item">
                <span class="player-bio-item-data hof d-none badge badge-info">Hall of fame</span>
              </div>

              <!-- position -->
              <div class="player-bio-item">
                <span class="player-bio-item-label">Position</span>
                <span class="player-bio-item-data position"></span>
              </div>

              <!-- bats and throws -->
              <div class="d-flex">
                <!-- bats -->
                <div class="player-bio-item">
                  <span class="player-bio-item-label">Bats</span>
                  <span class="player-bio-item-data bats"></span>
                </div>

                <span>&nbsp;&bull;&nbsp;</span>

                <!-- throws -->
                <div class="player-bio-item">
                  <span class="player-bio-item-label">Throws</span>
                  <span class="player-bio-item-data throws"></span>
                </div>
              </div>

              <!-- height -->
              <div class="player-bio-item">
                <span class="player-bio-item-label">Height</span>
                <span class="player-bio-item-data height"></span>
              </div>

              <!-- weight -->
              <div class="player-bio-item">
                <span class="player-bio-item-label">Weight</span>
                <span class="player-bio-item-data weight"></span>
              </div>

              <!-- birth date -->
              <div class="player-bio-item">
                <span class="player-bio-item-label">Born </span>
                <span class="player-bio-item-data birth-date"></span>
                <span>in</span>
                <span class="player-bio-item-data birth-city-state"></span>
              </div>

              <!-- debut date -->
              <div class="player-bio-item">
                <span class="player-bio-item-label">Debut date</span>
                <span class="player-bio-item-data debut-date"></span>
              </div>

              <!-- baseball reference -->
              <div class="player-bio-item">
                <a href="#" class="player-bio-item-data player-page-link">View profile</a>
              </div>
            </div>

          </div>

          <!-- module stats go here -->
          <ul class="list-group list-group-flush modal-details-items"></ul>

        </div>
      </div>
    </div>
  </div>


  <?php include('footer.php'); ?>
  <script src="js/pitching.js"></script>
</body>
</html>