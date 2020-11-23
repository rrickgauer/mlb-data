<?php 

if(!isset($_GET['teamID'])) {
  http_response_code(400);
  exit;
}

?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <?php include('header.php'); ?>
  <meta charset="utf-8">
  <title></title>
</head>
<body>

  <?php include('navbar.php'); ?>

  <div class="container-fluid">
    <!-- meta -->
    <div class="team-bio">
      <!-- team image -->
      <div class="team-item-data image">
        <img src="https://www.elitefoods.com.au/backend/user_images/avatar.jpg" alt="team image">
      </div>

      <div class="team-bio-right">
        <!-- name -->
        <h2 class="data name">Team name</h2>

        <!-- list of names -->
        <div class="team-bio-item">
          <span class="label">Team names</span>
          <span class="data names"></span>
        </div>

        <!-- number of seasons -->
        <div class="team-bio-item">
          <span class="label">Seasons</span>
          <span class="data seasons"></span>
        </div>

        <!-- record -->
        <div class="team-bio-item">
          <span class="label">Record</span>
          <span class="data record-w">45</span>
          <span>-</span>
          <span class="data record-l">355</span>
        </div>


        <!-- baseball reference -->
<!--         <div class="team-bio-item">
          <a href="#" class="team-bio-item-data bbref-link" target="_blank">Baseball Reference Profile <i class='bx bx-link-external'></i></a>
        </div> -->
      </div>
    </div>



    <div class="row">
      <!-- sidebar links -->
      <div class="col-sm-12 col-md-4 col-lg-3 col-nav-player">
        <h4 class="ml-4">Modules</h4>

        <ul class="nav flex-column nav-player">
          <li class="nav-item nav-item-player stats"><a class="nav-link active" href="#team-stats" data-toggle="tab" data-module="stats">Stats</a></li>
          <li class="nav-item nav-item-player rosters"><a class="nav-link" href="#team-rosters" data-toggle="tab" data-module="rosters">Rosters</a></li>
        </ul>
      </div>

      <!-- sub panels -->
      <div class="col-sm-12 col-md-8 col-lg-9">
        <div class="tab-content" id="team-panels">
          <!-- stats -->
          <div class="tab-pane fade show active" id="team-stats" role="tabpanel">

            <!-- regular season -->
            <div class="card card-table">
              <div class="card-header">
                <h4>Regular season</h4>

                <!-- super table dropdown -->
                <div class="dropright dropdown-super-table">
                  <button class="btn btn-light btn-sm" type="button" data-toggle="dropdown">
                    <i class='bx bx-list-check'></i>
                  </button>
                  <div class="dropdown-menu">
                    <!-- checkboxes to toggle columns -->
                    <div class="super-table-checkboxes team"></div>
                  </div>
                </div>
              </div>

              <div class="card-body">

                <div class="table-responsive">
                  <table class="table table-sm table-team tablesort">
                    <thead>
                      <tr>
                        <th data-tablesort-type="int">year</th>
                        <th data-tablesort-type="int">teamRank</th>
                        <th data-tablesort-type="int">G</th>
                        <th data-tablesort-type="int">Ghome</th>
                        <th data-tablesort-type="int">W</th>
                        <th data-tablesort-type="int">L</th>
                        <th data-tablesort-type="int">DivWin</th>
                        <th data-tablesort-type="int">WCWin</th>
                        <th data-tablesort-type="int">LgWin</th>
                        <th data-tablesort-type="int">WSWin</th>
                        <th data-tablesort-type="int">R</th>
                        <th data-tablesort-type="int">AB</th>
                        <th data-tablesort-type="int">H</th>
                        <th data-tablesort-type="int">2B</th>
                        <th data-tablesort-type="int">3B</th>
                        <th data-tablesort-type="int">HR</th>
                        <th data-tablesort-type="int">BB</th>
                        <th data-tablesort-type="int">SO</th>
                        <th data-tablesort-type="int">SB</th>
                        <th data-tablesort-type="int">CS</th>
                        <th data-tablesort-type="int">HBP</th>
                        <th data-tablesort-type="int">SF</th>
                        <th data-tablesort-type="int">RA</th>
                        <th data-tablesort-type="int">ER</th>
                        <th data-tablesort-type="int">ERA</th>
                        <th data-tablesort-type="int">CG</th>
                        <th data-tablesort-type="int">SHO</th>
                        <th data-tablesort-type="int">SV</th>
                        <th data-tablesort-type="int">IPouts</th>
                        <th data-tablesort-type="int">HA</th>
                        <th data-tablesort-type="int">HRA</th>
                        <th data-tablesort-type="int">BBA</th>
                        <th data-tablesort-type="int">SOA</th>
                        <th data-tablesort-type="int">E</th>
                        <th data-tablesort-type="int">DP</th>
                        <th data-tablesort-type="int">FP</th>
                        <th data-tablesort-type="int">attendance</th>
                        <th data-tablesort-type="int">BPF</th>
                        <th data-tablesort-type="int">PPF</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                    <!-- total -->
                    <tfoot></tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <!-- rosters -->
          <div class="tab-pane fade" id="team-rosters" role="tabpanel">
            <h3>rosters</h3>
          </div>
        </div>
      </div>


    </div> <!-- end row -->





  </div>




  <?php include('footer.php'); ?>
  <script src="js/team.js"></script>
</body>
</html>
