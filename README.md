
# Google Sheets Dynamic Dashboard with App Script

The ultimate goal of this project was to create a dynamic dashboard that updates in real-time as new data is added to a particular Google Sheets document. This was achieved through the implementation of custom menu options, such as "Update Dashboard" and "Run Script." 

The **Update Dashboard** function seamlessly syncs data from the main document, named AppS, to the dashboard document, ensuring that any changes or additions are immediately reflected. On the other hand, the **Run Script** function provides a user-friendly way to add new entries, such as devices. It updates the date and time while incrementing corresponding counters. 

To enhance precision in presentation, the script uses the following formatting for date and time:

```javascript
var currentDate = Utilities.formatDate(new Date(), "GMT", "dd-MM");
var currentTime = Utilities.formatDate(new Date(), "GMT", "HH:mm");

sheet.getRange(row, col - 2).setValue(currentDate); // Date goes to the column before machine number
sheet.getRange(row, col - 1).setValue(currentTime); // Time goes to the column before the date column
```

These adjustments not only contribute to a more efficient data management experience but also provide a modern and user-friendly interface for viewing and interacting with data in Google Sheets through a custom App Script.

---

Feel free to customize it further based on the specifics of your project or any additional information you'd like to include.
