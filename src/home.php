<!DOCTYPE html>
<html>
<head>
    <?php include('header.php'); ?>
    <title>MLB Data</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">

    <h1 class="text-center mt-5 mb-5">Home</h1>


      <div class="card-deck card-deck-home">
        <!-- people -->
        <div class="card card-home players">
          <div class="card-body">
            <h3 class="data"><div class="skeleton-text skeleton-effect-wave">156</div></h3>
            <p class="label">Players</p>
          </div>
        </div>

        <!-- appearances -->
        <div class="card card-home teams">
          <div class="card-body">
            <h3 class="data"><div class="skeleton-text skeleton-effect-wave">156</div></h3>
            <p class="label">Teams</p>
          </div>
        </div>

        <!-- appearances -->
        <div class="card card-home batting">
          <div class="card-body">
            <h3 class="data"><div class="skeleton-text skeleton-effect-wave">156</div></h3>
            <p class="label">Batting records</p>
          </div>
        </div>
      </div>

      <div class="card-deck card-deck-home">
        <!-- appearances -->
        <div class="card card-home fielding">
          <div class="card-body">
            <h3 class="data"><div class="skeleton-text skeleton-effect-wave">156</div></h3>
            <p class="label">Fielding records</p>
          </div>
        </div>

        <!-- appearances -->
        <div class="card card-home pitching">
          <div class="card-body">
            <h3 class="data"><div class="skeleton-text skeleton-effect-wave">156</div></h3>
            <p class="label">Pitching records</p>
          </div>
        </div>

        <!-- appearances -->
        <div class="card card-home appearances">
          <div class="card-body">
            <h3 class="data"><div class="skeleton-text skeleton-effect-wave">156</div></h3>
            <p class="label">Appearance records</p>
          </div>
        </div>
      </div>


  </div>

<?php include('footer.php'); ?>
<script src="js/home.js"></script>

</script>
</body>
</html>
