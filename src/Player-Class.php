<?php


class Player {

  private $playerID;


  private $batting;

  public function __construct($newPlayerID) {
    $this->playerID = $newPlayerID;

    $battingData = file_get_contents("https://api.mlb-data.ryanrickgauer.com/main.php/batting/" . $this->playerID);
    $this->batting = $battingData;

  }

  public function getBatting() {
    return $this->batting;
  }




}



?>