<!DOCTYPE html>
<html>
<head>
  <?php include('header.php'); ?>
  <title>MLB Data - Player</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">

    <h1 class="text-center mt-5 mb-5">Batting</h1>

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

  <?php include('footer.php'); ?>
  <script src="js/player.js"></script>
</body>
</html>