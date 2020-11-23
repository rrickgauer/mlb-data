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
          <li class="nav-item nav-item-player stats"><a class="nav-link active" href="#team-stats" data-toggle="tab" data-module="stats">Pitching</a></li>
          <li class="nav-item nav-item-player rosters"><a class="nav-link" href="#team-rosters" data-toggle="tab" data-module="rosters">Rosters</a></li>
        </ul>
      </div>

      <!-- sub panels -->
      <div class="col-sm-12 col-md-8 col-lg-9">
        <div class="tab-content" id="team-panels">
          <!-- stats -->
          <div class="tab-pane fade show active" id="team-stats" role="tabpanel">
            <h3>Stats</h3>
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
