<?php


class Html {

  public static function getSpinner() {
    $html = '
    <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div>';

    return $html;
  }


  public static function getPitchingAggregateTable($pitchingData) {

    $html = '';

    for ($count = 0; $count < count($pitchingData); $count++) {
      $row = array_values((array)$pitchingData[$count]);
      $rowHtml = '<tr>';

      for ($i = 0; $i < count($row); $i++) {
        $rowHtml .= '<td>' . $row[$i] . '</td>';
      }

      $rowHtml .= '</tr>';

      $html .= $rowHtml;
    }

    return $html;

  }

}









?>