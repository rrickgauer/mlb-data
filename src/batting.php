<?php require_once('HTML-Generator.php'); ?>
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

    <form method="get" class="form-batting-sort">
      <div class="font-weight-bold mb-2">Sorting options</div>
      <div class="form-row">
        <div class="col-10">
          <div class="input-group input-group-sm">
            <select class="custom-select" id="batting-select" name="sort-column">
              <option>Choose one...</option>
              <option value="year">Year</option>
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
            <div class="input-group-append">
              <div class="input-group-text">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="sort-type" id="batting-inlineradio-asc" value="asc">
                  <label class="form-check-label" for="batting-inlineradio-asc">Ascending</label>
                </div>
              </div>
              <div class="input-group-text">
                <div class="form-check form-check-inline">
                  <input class="form-check-input" type="radio" name="sort-type" id="batting-inlineradio-desc" value="desc">
                  <label class="form-check-label" for="batting-inlineradio-desc">Descending</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="btn btn-sm btn-primary">Sort table</button>
      </div>
    </form>


    <div class="card card-table mt-3">
      <div class="card-body">

        <div class="d-flex align-items-center justify-content-between my-3">
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-secondary btn-pagination previous" disabled><</button>
            <button type="button" class="btn btn-secondary btn-pagination next">></button>
          </div>

          <button type="button" class="btn btn-sm btn-secondary" data-toggle="modal" data-target="#modal-filter-batting">
            Filters
          </button>
        </div>



        <div class="table-responsive">
          <table class="table table-sm table-batting">
            <thead><tr>
              <th>Player</th>
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
            
          <form>
            <p>Year</p>
            <div class="form-row">
              <div class="form-group col-md-2">
                <select id="inputState" class="form-control">
                  <option>=</option>
                  <option>></option>
                  <option><</option>
                  <option>!=</option>
                </select>
              </div>
              <div class="form-group col-md-10">
                <input type="text" class="form-control" id="inputZip">
              </div>
            </div>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <?php include('footer.php'); ?>

  <script src="js/batting.js"></script>
</body>
</html>