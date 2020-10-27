<?php require_once('HTML-Generator.php'); ?>


<!DOCTYPE html>
<html>
<head>
  <?php include('header.php'); ?>
  <title>MLB Data - Player</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">

    <div class="player-bio mt-5 mb-5">

      <!-- name -->
      <h2 class="player-bio-item-data name"></h2>

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
        <a href="#" class="player-bio-item-data bbref-link" target="_blank">Baseball Reference Profile <i class='bx bx-link-external'></i></a>
      </div>
    </div>


    <!-- sidebar links -->
    <ul class="nav nav-tabs mt-3 mb-4">
      <li class="nav-item"><a class="nav-link active" href="#player-batting" data-toggle="tab">Batting</a></li>
      <li class="nav-item"><a class="nav-link" href="#player-pitching" data-toggle="tab">Pitching</a></li>
      <li class="nav-item"><a class="nav-link" href="#player-fielding" data-toggle="tab">Fielding</a></li>
      <li class="nav-item"><a class="nav-link" href="#player-fielding-of" data-toggle="tab">Fielding OF</a></li>
      <li class="nav-item"><a class="nav-link" href="#player-fielding-of-split" data-toggle="tab">Fielding OF Split</a></li>
      <li class="nav-item"><a class="nav-link" href="#player-appearances" data-toggle="tab">Appearances</a></li>
      <li class="nav-item"><a class="nav-link" href="#player-salaries" data-toggle="tab">Salaries</a></li>
    </ul>

    <!-- sub panels -->
    <div class="tab-content" id="player-panels">

      <!-- batting -->
      <div class="tab-pane fade show active" id="player-batting" role="tabpanel">

        <h4>Career</h4> 
        <div class="player-summary batting">
          <!-- AB -->
          <div class="card player-summary-card ab">
            <div class="card-body">
              <h4 class="card-title data">
                <?php echo Html::getSpinner(); ?>
              </h4>
              <span class="label">At bats</span>
            </div>
          </div>

          <!-- H -->
          <div class="card player-summary-card h">
            <div class="card-body">
              <h4 class="card-title data">
                <?php echo Html::getSpinner(); ?>
              </h4>
              <span class="label">Hits</span>
            </div>
          </div>

          <!-- BA -->
          <div class="card player-summary-card ba">
            <div class="card-body">
              <h4 class="card-title data">
                <?php echo Html::getSpinner(); ?>
              </h4>
              <span class="label">Batting average</span>
            </div>
          </div>

          <!-- HR -->
          <div class="card player-summary-card hr">
            <div class="card-body">
              <h4 class="card-title data">
                <?php echo Html::getSpinner(); ?>
              </h4>
              <span class="label">Home runs</span>
            </div>
          </div>

          <!-- R -->
          <div class="card player-summary-card r">
            <div class="card-body">
              <h4 class="card-title data">
                <?php echo Html::getSpinner(); ?>
              </h4>
              <span class="label">Runs</span>
            </div>
          </div>

          <!-- RBI -->
          <div class="card player-summary-card rbi">
            <div class="card-body">
              <h4 class="card-title data">
                <?php echo Html::getSpinner(); ?>
              </h4>
              <span class="label">Runs batted in</span>
            </div>
          </div>
        </div>

        <h4 class="mt-5">Seasonal</h4>

        <!-- chart -->
        <div class="card card-chart mb-5">
          <div class="card-body">

            <!-- loading spinner -->
            <div class="text-center">
              <?php echo Html::getSpinner(); ?>
            </div>

            <canvas id="chart-player-batting" class="d-none"></canvas>
          </div>
        </div>

        <!-- seasonal batting stats -->
        <div class="card card-table">
          <div class="card-body">
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
                <tbody>
                  
                  <!-- inital spinner -->
                  <tr><td colspan="27">
                    <div class="text-center mt-5">
                      <?php echo Html::getSpinner(); ?>
                    </div>
                  </td></tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <!-- pitching -->
      <div class="tab-pane fade" id="player-pitching" role="tabpanel"> 

        <!-- career stats -->
        <h5>Career</h5> 
        <div class="player-summary pitching">
          <!-- ERA -->
          <div class="card player-summary-card era">
            <div class="card-body">
              <h4 class="card-title data"></h4>
              <span class="label">Earned run average</span>
            </div>
          </div>

          <!-- W -->
          <div class="card player-summary-card w">
            <div class="card-body">
              <h4 class="card-title data"></h4>
              <span class="label">Wins</span>
            </div>
          </div>

          <!-- G -->
          <div class="card player-summary-card g">
            <div class="card-body">
              <h4 class="card-title data"></h4>
              <span class="label">Games</span>
            </div>
          </div>

          <!-- IP -->
          <div class="card player-summary-card ip">
            <div class="card-body">
              <h4 class="card-title data"></h4>
              <span class="label">Innings pitched</span>
            </div>
          </div>

          <!-- SO -->
          <div class="card player-summary-card so">
            <div class="card-body">
              <h4 class="card-title data"></h4>
              <span class="label">Strike outs</span>
            </div>
          </div>

          <!-- WHIP -->
          <div class="card player-summary-card whip">
            <div class="card-body">
              <h4 class="card-title data"></h4>
              <span class="label">WHIP</span>
            </div>
          </div>
        </div>


        <div class="table-responsive">
          <table class="table table-sm tablesort table-pitching">
            <thead><tr>
              <th data-tablesort-type="int">Year</th>
              <th data-tablesort-type="string">Team</th>
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
              <th data-tablesort-type="int">Year</th>
              <th data-tablesort-type="string">Team</th>
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
              <th data-tablesort-type="int">Year</th>
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
              <th data-tablesort-type="int">Year</th>
              <th data-tablesort-type="string">Team</th>
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
              <th data-tablesort-type="int">Year</th>
              <th data-tablesort-type="string">Team</th>
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
              <th data-tablesort-type="int">Year</th>
              <th data-tablesort-type="string">Team</th>
              <th data-tablesort-type="int">Salary</th>
            </tr></thead>
            <tbody></tbody>
          </table>
        </div>

      </div>
    </div>


  </div>

  <?php include('footer.php'); ?>
  <script src="js/player.js"></script>
</body>
</html>