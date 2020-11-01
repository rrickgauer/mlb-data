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
              <option value="G">G</option>
              <option value="G_batting">G_batting</option>
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

        <div class="btn-group btn-group-sm mb-3" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-secondary btn-pagination previous"><</button>
          <button type="button" class="btn btn-secondary btn-pagination next">></button>
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

  <?php include('footer.php'); ?>

  <script src="js/batting.js"></script>
</body>
</html>