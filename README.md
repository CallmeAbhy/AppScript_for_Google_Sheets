
# Google Sheets Dynamic Dashboard with App Script

The ultimate goal of this project was to create a dynamic dashboard that updates in real-time as new data is added to a particular Google Sheets document. This was achieved through the implementation of custom menu options, such as "Update Dashboard" and "Run Script."

## Features

- **Update Dashboard:** Syncs data from the main document (AppS) to the dashboard document, ensuring real-time updates.
- **Run Script:** Allows for easy addition of new entries (e.g., devices), updating date and time while incrementing corresponding counters.

## Precision Presentation

To enhance precision in presentation, the script uses the following formatting for date and time:

```javascript
var currentDate = Utilities.formatDate(new Date(), "GMT", "dd-MM");
var currentTime = Utilities.formatDate(new Date(), "GMT", "HH:mm");

sheet.getRange(row, col - 2).setValue(currentDate); // Date goes to the column before the machine number
sheet.getRange(row, col - 1).setValue(currentTime); // Time goes to the column before the date column
```

## Code Modifications

### Handling Undefined Error

The script was updated to handle the undefined error when using `e.source`. The code modification ensured that the source was properly checked before proceeding.

```javascript
function updateDashboard(e) {
  if (e && e.source && e.range) {
    // Existing code...
  }
}
```

### Precise Date and Time Entry

To ensure precise date and time entry, the code was modified to use the `Utilities.formatDate` function instead of directly setting the date.

```javascript
sheet.getRange(row, col - 2).setValue(currentDate); // Date goes to the column before the machine number
sheet.getRange(row, col - 1).setValue(currentTime); // Time goes to the column before the date column
```

### Error While Adding '1'

The line sheet.getRange(activeCell.getRow() + 1, sheet.getLastColumn()).setValue(''); is used to clear the contents of the cell in the next row of the last column. This line is added as part of the runScript function to clear the total sum value in the next row before updating it with the new sum.

```javascript
sheet.getRange(activeCell.getRow() + 1, sheet.getLastColumn()).setValue('');
```

### UpdateSum Function

The `updateSum` function is responsible for accurately calculating and displaying the total sum in the sheet. Here's a breakdown of each line:

```javascript
function updateSum(sheet) {
  // Get the last row of the sheet
  var lastRow = sheet.getLastRow();

  // Get the range of values excluding the header row
  var sumRange = sheet.getRange(2, sheet.getLastColumn(), lastRow - 1);

  // Create a sum formula for the range
  var sumFormula = '=SUM(' + sumRange.getA1Notation() + ')';

  // Place the sum formula in the last row of the last column
  sheet.getRange(sheet.getLastRow() + 1, sheet.getLastColumn()).setFormula(sumFormula);
  
  // Fetch the total sum and set it in a specific cell
  var totalSum = sheet.getRange(sheet.getLastRow(), sheet.getLastColumn()).getValue();

  // Place the total sum in the next row of the last column
  sheet.getRange(sheet.getLastRow() + 1, sheet.getLastColumn()).setValue(totalSum);
}
```

These steps ensure that the total sum is accurately calculated and displayed in the sheet, and the previous total is cleared before updating with the new sum.
```

Feel free to adjust the formatting or content based on your preferences.
