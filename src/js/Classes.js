

function ChartData(apiResults) {

  const CHART_COLORS = ['red', 'pink', 
  'purple', 'darkviolet', 'indigo', 'blue', 'lightblue', 
  'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'goldenrod', 
  'orange', 'tomato', 'brown', 'grey', 'cadetblue', 
  'thistle', 'yellowgreen'];

  // column names to ignore
  const IGNORE_COLUMNS = ['teamName', 'POS', 'nameFirst', 'nameLast', 'lgID', 'stint', 'year', 'playerID'];

  // extract the years
  this.years = [];
  for (let count = 0; count < apiResults.length; count++)
    this.years.push(apiResults[count].year);
  

  const columnNames = Object.keys(apiResults[0]);
  let datasets      = [];
  let colorCount    = 0;

  // for every column name, extract its apiResults from the passed in argument
  for (let count = 0; count < columnNames.length; count++) {
    let dataArray = [];
    let label = columnNames[count];

    // skip this iteration if unneeded column
    if (IGNORE_COLUMNS.includes(label))
      continue;

    colorCount++;

    // add the apiResults piece into the array
    for (let i = 0; i < apiResults.length; i++) 
      dataArray.push(apiResults[i][label]);
      
    // add this column from the input into the superset
    datasets.push(new ChartDataSubset(label, dataArray, CHART_COLORS[colorCount]));

  }

  this.datasets = datasets;
}



function ChartDataSubset(label, apiResults, color) {
  this.label = label;
  this.data  = apiResults;
  this.borderColor = color;
  this.fill  = false;
}



















