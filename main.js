function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom Menu')
    .addItem('Update Dashboard', 'updateDashboard')
    .addItem('Run Script', 'runScript')
    .addToUi();
} 
 
function updateDashboard() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  var range = sheet.getActiveRange();

  
  if (range.getColumn() == 2 && range.getValue() !== '') {
    var row = range.getRow();

    
    if (row > 1) {
      
      var priorSum = sheet.getRange(row - 1, 2).getValue();

      
      var diff = range.getValue() - priorSum;

      
      sheet.getRange(row, 3).setValue(diff);
    }
  }
}





function runScript() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet(); 
  var activeCell = sheet.getActiveCell();

  if (activeCell.getColumn() == 3) {
    var machineNumber = activeCell.getValue();

    if (machineNumber !== "") {
      
      sheet.getRange(activeCell.getRow() + 1, sheet.getLastColumn()).setValue('');

      var currentDate = Utilities.formatDate(new Date(), "GMT", "MM/dd");
      var currentTime = Utilities.formatDate(new Date(), "GMT", "HH:mm");

      sheet.getRange(activeCell.getRow(), activeCell.getColumn() - 2).setValue(currentDate); 
      sheet.getRange(activeCell.getRow(), activeCell.getColumn() - 1).setValue(currentTime); 

      
      sheet.getRange(activeCell.getRow(), sheet.getLastColumn()).setValue(1);

      updateSum(sheet);

      syncToDashboard(sheet);
    }
  }
}


function syncToDashboard(sourceSheet) {
  var dashboardSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Dashboard'); 
  if (!dashboardSheet) {
    Logger.log('Dashboard sheet not found');
    return;
  }

  var sourceData = sourceSheet.getDataRange().getValues();
  var destinationRange = dashboardSheet.getRange(1, 1, sourceData.length, sourceData[0].length);
  destinationRange.setValues(sourceData);
}


function updateSum(sheet) {
  var totalColumn = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();

  
  var sumRange = sheet.getRange(2, totalColumn, lastRow - 1);

  
  var totalSum = sumRange.getValues().reduce(function (sum, row) {
    return sum + (row[0] === 1 ? 1 : 0);
  }, 0);

  
  sheet.getRange(lastRow + 1, totalColumn).setValue(totalSum);
}




