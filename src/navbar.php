<section id="navbar">
  <nav class="navbar navbar-expand-lg">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">
      <i class='bx bx-menu'></i>
    </button>

    <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
        <li class="nav-item"><a class="nav-link" id="nav-item-home" href="home.php">Home</a></li>
        <li class="nav-item"><a class="nav-link" id="nav-item-player" href="player.php">Player</a></li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbar-dropdown-modules" role="button" data-toggle="dropdown">
            Modules
          </a>
          <div class="dropdown-menu">
            <a class="dropdown-item" href="batting.php">Batting</a>
            <a class="dropdown-item" href="pitching.php">Pitching</a>
            <a class="dropdown-item" href="fielding.php">Fielding</a>
          </div>
        </li>
      </ul>

      <!-- navbar search -->
      <div class="navbar-search">
        <form class="form-inline">
          <div class="input-group input-group-sm">
            <div class="input-group-prepend">
              <span class="input-group-text"><i class='bx bx-search'></i></span>
            </div>
            <input type="text" class="form-control navbar-search-input" placeholder="Search...">
          </div>
        </form>

        <!-- search results menu -->
        <div class="navbar-search-menu d-none">
        </div>
      </div>

    </div>
  </nav>
</section>