<!DOCTYPE html>
<html>
<head>
  <?php include('header.php'); ?>
  <title>MLB Data - Batting</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">
    <h1 class="text-center mt-5 mb-5">Batting</h1>

    <!-- data table -->
    <div class="card card-table card-module mt-3">
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
          <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-filter-batting">Filters</button>

          <!-- sort -->
          <button type="button" class="btn btn-sm btn-primary" data-toggle="modal" data-target="#modal-sort-batting">Sort</button>

          <!-- pagination -->
          <div class="btn-group btn-group-sm" role="group">
            <button type="button" class="btn btn-primary btn-pagination previous" disabled><</button>
            <button type="button" class="btn btn-primary btn-pagination next">></button>
          </div>

        </div>
      </div>

      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-sm table-batting">
            <thead><tr>
              <th>Player</th>
              <th>Team</th>
              <th>Year</th>
              <th>G</th>
              <th>AB</th>
              <th>R</th>
              <th>H</th>
              <th>2B</th>
              <th>3B</th>
              <th>HR</th>
              <th>RBI</th>
              <th>SB</th>
              <th>CS</th>
              <th>BB</th>
              <th>SO</th>
              <th>IBB</th>
              <th>HBP</th>
              <th>SH</th>
              <th>SF</th>
              <th>GIDP</th>
            </tr></thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>

  <!-- filter modal -->
  <div class="modal fade modal-filter" id="modal-filter-batting" tabindex="-1">
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
  <div class="modal fade modal-sort" id="modal-sort-batting" tabindex="-1">
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
                <option value="G">G</option>
                <option value="AB">AB</option>
                <option value="R">R</option>
                <option value="H">H</option>
                <option value="2B">2B</option>
                <option value="3B">3B</option>
                <option value="HR">HR</option>
                <option value="RBI">RBI</option>
                <option value="SB">SB</option>
                <option value="CS">CS</option>
                <option value="BB">BB</option>
                <option value="SO">SO</option>
                <option value="IBB">IBB</option>
                <option value="HBP">HBP</option>
                <option value="SH">SH</option>
                <option value="SF">SF</option>
                <option value="GIDP">GIDP</option>
              </select>
            </div>
            
            <!-- type -->
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
  <?php require_once('details-modal.php'); ?>




  <?php include('footer.php'); ?>
  <script src="js/batting.js"></script>
</body>
</html>