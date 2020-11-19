

$(document).ready(function() {

  new SuperTable('.table-batting', '.table-header-checkboxes');

});





// let table = $('.table');
// let columnHeaders = null;


// $(document).ready(function() {
//   columnHeaders = getColumnHeaders();
//   generateCheckboxes();

//   $('.table-header-checkboxes').on('click', '.check-toggle-table-column', function() {
//     toggleTableColumn(this);
//   });
// });




// function toggleTableColumn(check) {
//   const columnIndex = check.value;

//   // hide header
//   $(table).find(`thead th:eq(${columnIndex})`).toggleClass('d-none');

//   // hide body column
//   $(table).find('tbody tr').find(`td:eq(${columnIndex})`).toggleClass('d-none');
  
// }


// function getColumnHeaders() {
//   const colHeaders = $(table).find('thead th');

//   const colHeaderNames = [];
//   for (let count = 0; count < colHeaders.length; count++) {
//     colHeaderNames.push($(colHeaders[count]).text());
//   }

//   return colHeaderNames;
// }


// function generateCheckboxes() {
//   let html = '';

//   for (let count = 0; count < columnHeaders.length; count++)
//     html += getCheckboxHtml(columnHeaders[count], count);

//   $('.table-header-checkboxes').html(html);
// }


// function getCheckboxHtml(column, index) {
//   const checkboxID = `table-column-checkbox-${index}`;

//   let html = `
//   <div class="form-check">
//     <input class="form-check-input check-toggle-table-column" type="checkbox" value="${index}" id="${checkboxID}" checked>
//     <label class="form-check-label" for="${checkboxID}">
//       ${column}
//     </label>
//   </div>`;

//   return html;
// }