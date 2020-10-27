<?php

require_once('Constants.php');

class Pitching
{
  private $sortColumn;
  private $sortType;
  private $perPage;
  
  public function __construct($newSortColumn = null, $newSortType = null) {
    $this->setSortColumn($newSortColumn);
    $this->setSortType($newSortType);
    $this->perPage = 20;
  }

  public function setSortColumn($newSortColumn) {
    $this->sortColumn = $newSortColumn;
  }

  public function setSortType($newSortType) {
    $this->sortType = $newSortType;
  }

  public function getSortColumn() {
    return $this->sortColumn;
  }

  public function getSortType() {
    return $this->sortType;
  }

  // determines the url
  public function getUrl() {
    $url = Constants::API . '/pitching?aggregate=true&perPage=' . $this->perPage;

    if ($this->sortColumn != null) {
      // determine sort type
      $sortType = 'desc';
      if ($this->sortType == 'asc')
        $sortType = 'asc';
      $url = $url . '&sort=' . $this->sortColumn . ':' . $sortType;
    }

    return $url;
  }

  public function getDataset() {
    $url = $this->getUrl();
    $dataset = file_get_contents($url);
    $dataset = json_decode($dataset);

    return $dataset;


  }




}






?>