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

    <!-- toolbar -->
    <div class="d-flex align-items-center justify-content-start my-3">
      <!-- pagination -->
      <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-primary btn-pagination previous" disabled><</button>
        <button type="button" class="btn btn-primary btn-pagination next">></button>
      </div>

      <!-- filters -->
      <button type="button" class="btn btn-sm btn-primary ml-2" data-toggle="modal" data-target="#modal-filter-pitching">Filters</button>

      <!-- sort -->
      <button type="button" class="btn btn-sm btn-primary ml-2" data-toggle="modal" data-target="#modal-sort-pitching">Sort</button>

      <!-- per page -->
      <div class="ml-2">
        <select class="form-control select-per-page">
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="500">500</option>
          <option value="1000">1000</option>
        </select>
      </div>
    </div>

    <!-- data table -->
    <div class="card card-table mt-3">
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
              <tr><td colspan="21" rowspan="20">
                <div class="text-center mt-5 mb-5">
                  <?php echo Html::getSpinner() ?>
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


  <?php include('footer.php'); ?>

  <script src="js/Filters.js"></script>
  <script src="js/Global-Variables.js"></script>
  <script src="js/Pagination-Class.js"></script>
  <script src="js/Modules-Page-Class.js"></script>
  <script src="js/pitching.js"></script>
</body>
</html>