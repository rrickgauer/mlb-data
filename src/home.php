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


    <div class="card card-table">
      <div class="card-body">
        <nav>
          <div class="nav nav-normal">
            <a class="nav-link active" data-toggle="tab" href="#nav-table-module" role="tab">Table</a>
            <a class="nav-link" data-toggle="tab" href="#nav-chart-module" role="tab">Chart</a>
          </div>
        </nav>
        <div class="tab-content mt-3">
          <!-- table -->
          <div class="tab-pane fade show active" id="nav-table-module">



          </div>

          <!-- chart -->
          <div class="tab-pane fade" id="nav-chart-module">
            <canvas id="chart-player-module" class="d-none"></canvas>
          </div>
        </div>
      </div>  
    </div>





  </div>

<?php include('footer.php'); ?>
</body>
</html>