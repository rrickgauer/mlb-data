<!DOCTYPE html>
<html>
<head>
  <?php include('header.php'); ?>
  <title>MLB Data - Player</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">

    <h1 class="mt-5 mb-5 text-center">Player Data</h1>


    <div id="player-bio">

      
      

    </div>


    <div class="row">

      <!-- sidebar links -->
      <div class="col-sm-2">

        <b>Modules</b>

        <ul class="nav nav-pills flex-column mt-3">
          <!-- <li class="nav-item"><a class="nav-link active" href="#player-bio" data-toggle="tab">Biography</a></li> -->
          <li class="nav-item"><a class="nav-link active" href="#player-batting" data-toggle="tab">Batting</a></li>
          <li class="nav-item"><a class="nav-link" href="#player-pitching" data-toggle="tab">Pitching</a></li>
          <li class="nav-item"><a class="nav-link" href="#player-fielding" data-toggle="tab">Fielding</a></li>
          <li class="nav-item"><a class="nav-link" href="#player-fielding-of" data-toggle="tab">Fielding OF</a></li>
          <li class="nav-item"><a class="nav-link" href="#player-fielding-of-split" data-toggle="tab">Fielding OF Split</a></li>
          <li class="nav-item"><a class="nav-link" href="#player-appearances" data-toggle="tab">Appearances</a></li>
          <li class="nav-item"><a class="nav-link" href="#player-salaries" data-toggle="tab">Salaries</a></li>
        </ul>
      </div>


      <!-- sub panels -->
      <div class="col-sm-10">
        <div class="tab-content" id="player-panels">

          <!-- batting -->
          <div class="tab-pane fade show active" id="player-batting" role="tabpanel"> 
            <h4 class="mb-4">Batting</h4>

            <!-- seasonal batting stats -->
            <div class="table-responsive">
              <table class="table table-sm table-batting tablesort">
                <thead><tr>
                <th data-tablesort-type="int">Year</th>
                <th data-tablesort-type="int">G</th>
                <th data-tablesort-type="int">AB</th>
                <th data-tablesort-type="int">R</th>
                <th data-tablesort-type="int">H</th>
                <th data-tablesort-type="int">2B</th>
                <th data-tablesort-type="int">3B</th>
                <th data-tablesort-type="int">HR</th>
                <th data-tablesort-type="int">RBI</th>
                <th data-tablesort-type="int">SB</th>
                <th data-tablesort-type="int">CS</th>
                <th data-tablesort-type="int">BB</th>
                <th data-tablesort-type="int">SO</th>
                <th data-tablesort-type="int">IBB</th>
                <th data-tablesort-type="int">HBP</th>
                <th data-tablesort-type="int">SH</th>
                <th data-tablesort-type="int">SF</th>
                <th data-tablesort-type="int">GIDP</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <!-- pitching -->
          <div class="tab-pane fade" id="player-pitching" role="tabpanel"> 
            <h4>Pitching</h4>

            <div class="table-responsive">
              <table class="table table-sm tablesort table-pitching">
                <thead><tr>
                  <th data-tablesort-type="int">year</th>
                  <th data-tablesort-type="string">teamName</th>
                  <th data-tablesort-type="int">W</th>
                  <th data-tablesort-type="int">L</th>
                  <th data-tablesort-type="int">G</th>
                  <th data-tablesort-type="int">GS</th>
                  <th data-tablesort-type="int">CG</th>
                  <th data-tablesort-type="int">SHO</th>
                  <th data-tablesort-type="int">SV</th>
                  <th data-tablesort-type="int">IPouts</th>
                  <th data-tablesort-type="int">H</th>
                  <th data-tablesort-type="int">ER</th>
                  <th data-tablesort-type="int">HR</th>
                  <th data-tablesort-type="int">BB</th>
                  <th data-tablesort-type="int">SO</th>
                  <th data-tablesort-type="int">BAOpp</th>
                  <th data-tablesort-type="int">ERA</th>
                  <th data-tablesort-type="int">IBB</th>
                  <th data-tablesort-type="int">WP</th>
                  <th data-tablesort-type="int">HBP</th>
                  <th data-tablesort-type="int">BK</th>
                  <th data-tablesort-type="int">BFP</th>
                  <th data-tablesort-type="int">GF</th>
                  <th data-tablesort-type="int">R</th>
                  <th data-tablesort-type="int">SH</th>
                  <th data-tablesort-type="int">SF</th>
                  <th data-tablesort-type="int">GIDP</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>

          </div>

          <!-- fielding -->
          <div class="tab-pane fade" id="player-fielding" role="tabpanel"> 
            <h4>Fielding</h4>

            <div class="table-responsive">
              <table class="table table-sm tablesort table-fielding">
                <thead><tr>
                  <th data-tablesort-type="int">year</th>
                  <th data-tablesort-type="string">teamName</th>
                  <th data-tablesort-type="string">POS</th>
                  <th data-tablesort-type="int">G</th>
                  <th data-tablesort-type="int">GS</th>
                  <th data-tablesort-type="int">InnOuts</th>
                  <th data-tablesort-type="int">PO</th>
                  <th data-tablesort-type="int">A</th>
                  <th data-tablesort-type="int">E</th>
                  <th data-tablesort-type="int">DP</th>
                  <th data-tablesort-type="int">PB</th>
                  <th data-tablesort-type="int">WP</th>
                  <th data-tablesort-type="int">SB</th>
                  <th data-tablesort-type="int">CS</th>
                  <th data-tablesort-type="int">ZR</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <!-- fielding of -->
          <div class="tab-pane fade" id="player-fielding-of" role="tabpanel"> 
            <h4>Fielding OF</h4>

            <div class="table-responsive">
              <table class="table table-sm tablesort table-fielding-of">
                <thead><tr>
                  <th data-tablesort-type="int">year</th>
                  <th data-tablesort-type="int">Glf</th>
                  <th data-tablesort-type="int">Gcf</th>
                  <th data-tablesort-type="int">Grf</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <!-- fielding of split -->
          <div class="tab-pane fade" id="player-fielding-of-split" role="tabpanel"> 
            <h4>Fielding OF Split</h4>

            <div class="table-responsive">
              <table class="table table-sm tablesort table-fielding-of-split">
                <thead><tr>
                  <th data-tablesort-type="int">yearID</th>
                  <th data-tablesort-type="string">team name</th>
                  <th data-tablesort-type="string">POS</th>
                  <th data-tablesort-type="int">G</th>
                  <th data-tablesort-type="int">GS</th>
                  <th data-tablesort-type="int">InnOuts</th>
                  <th data-tablesort-type="int">PO</th>
                  <th data-tablesort-type="int">A</th>
                  <th data-tablesort-type="int">E</th>
                  <th data-tablesort-type="int">DP</th>
                  <th data-tablesort-type="int">PB</th>
                  <th data-tablesort-type="int">WP</th>
                  <th data-tablesort-type="int">SB</th>
                  <th data-tablesort-type="int">CS</th>
                  <th data-tablesort-type="int">ZR</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>

          <!-- appearances -->
          <div class="tab-pane fade" id="player-appearances" role="tabpanel"> 
            <h4>Appearances</h4>

            <div class="table-responsive">
              <table class="table table-sm tablesort table-appearances">
                <thead><tr>
                  <th data-tablesort-type="int">yearID</th>
                  <th data-tablesort-type="string">name</th>
                  <th data-tablesort-type="int">G_all</th>
                  <th data-tablesort-type="int">GS</th>
                  <th data-tablesort-type="int">G_batting</th>
                  <th data-tablesort-type="int">G_defense</th>
                  <th data-tablesort-type="int">G_p</th>
                  <th data-tablesort-type="int">G_c</th>
                  <th data-tablesort-type="int">G_1b</th>
                  <th data-tablesort-type="int">G_2b</th>
                  <th data-tablesort-type="int">G_3b</th>
                  <th data-tablesort-type="int">G_ss</th>
                  <th data-tablesort-type="int">G_lf</th>
                  <th data-tablesort-type="int">G_cf</th>
                  <th data-tablesort-type="int">G_rf</th>
                  <th data-tablesort-type="int">G_of</th>
                  <th data-tablesort-type="int">G_dh</th>
                  <th data-tablesort-type="int">G_ph</th>
                  <th data-tablesort-type="int">G_pr</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>
          </div>


          <!-- salaries -->
          <div class="tab-pane fade" id="player-salaries" role="tabpanel"> 
            <h4>Salaries</h4>

            <div class="table-responsive">
              <table class="table table-sm tablesort table-salaries">
                <thead><tr>
                  <th data-tablesort-type="int">yearID</th>
                  <th data-tablesort-type="string">teamName</th>
                  <th data-tablesort-type="int">salary</th>
                </tr></thead>
                <tbody></tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>



  </div>

  <?php include('footer.php'); ?>
  <script src="js/player.js"></script>
</body>
</html>