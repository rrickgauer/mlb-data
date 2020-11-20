<?php  

///////////////////////////////////////////////////////////////////////////
//                                                                       //
// This is the table row details modal that is used in every module      //
//                                                                       //
// It displays bio information about the player and all the data for the //
// row the user selected in the table.                                   //
//                                                                       //
///////////////////////////////////////////////////////////////////////////
?>

<div class="modal modal-details" tabindex="-1">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <!-- player bio -->
        <div class="player-bio">
          <!-- player image -->
          <div class="player-item-data image">
            <img src="https://www.elitefoods.com.au/backend/user_images/avatar.jpg" alt="Player image">
          </div>

          <div class="player-bio-right">
            <!-- name -->
            <h2 class="player-bio-item-data name"></h2>

            <!-- hall of fame -->
            <div class="player-bio-item">
              <span class="player-bio-item-data hof d-none badge badge-info">Hall of fame</span>
            </div>

            <!-- position -->
            <div class="player-bio-item">
              <span class="player-bio-item-label">Position</span>
              <span class="player-bio-item-data position"></span>
            </div>

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
              <a href="#" class="player-bio-item-data player-page-link">View profile</a>
            </div>
          </div>

        </div>

        <!-- module stats go here -->
        <ul class="list-group list-group-flush modal-details-items"></ul>

      </div>
    </div>
  </div>
</div>