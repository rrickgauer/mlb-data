<!DOCTYPE html>
<html>
<head>
    <?php include('header.php'); ?>
    <title>MLB Data - Pitching</title>
</head>
<body>
  <?php include('navbar.php'); ?>

  <div class="container">
    
    <h1 class="text-center mt-5 mb-5">Pitching</h1>

    <form class="form-inline">
      <!-- select -->
      <select class="form-control mr-4" name="column">
        <option value="years">years</option>
        <option value="W">W</option>
        <option value="L">L</option>
        <option value="G">G</option>
        <option value="GS">GS</option>
        <option value="CG">CG</option>
        <option value="SHO">SHO</option>
        <option value="SV">SV</option>
        <option value="IPouts">IPouts</option>
        <option value="H">H</option>
        <option value="ER">ER</option>
        <option value="HR">HR</option>
        <option value="BB">BB</option>
        <option value="SO">SO</option>
        <option value="BAOpp">BAOpp</option>
        <option value="ERA">ERA</option>
        <option value="IBB">IBB</option>
        <option value="WP">WP</option>
        <option value="HBP">HBP</option>
        <option value="BK">BK</option>
        <option value="BFP">BFP</option>
        <option value="GF">GF</option>
        <option value="R">R</option>
        <option value="SH">SH</option>
        <option value="SF">SF</option>
        <option value="GIDP">GIDP</option>
      </select>

      <!-- checkbox -->
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="type" value="asc" checked>
        <label class="form-check-label">Ascending</label>
      </div>
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="type" value="desc">
        <label class="form-check-label">Descensing</label>
      </div>

      <!-- submit -->
      <button type="submit" class="btn btn-sm btn-primary ml-4">Sort table</button>
    </form>


  </div>

<?php include('footer.php'); ?>
<script src="js/pitching.js"></script>
</body>
</html>