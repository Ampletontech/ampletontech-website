# Google Sheet Contact Form Backend Setup

Since your website is static (HTML/JS only) and hosted on Vercel, we need a backend service to accept the form data and save it to a Google Sheet. We will use **Google Apps Script** for this. It is free and natively integrates with Google Sheets.

## Step 1: Create the Google Sheet
1. Go to [Google Sheets](https://docs.google.com/spreadsheets/).
2. Create a new "Blank" spreadsheet.
3. Name it something like "Ampleton Website Leads".
4. Rename the first tab (at the bottom) to `Sheet1` (it usually is by default, just verify).
5. Add the following headers to the first row (Row 1):
    - **A1**: `Date`
    - **B1**: `Name`
    - **C1**: `Email`
    - **D1**: `Phone`
    - **E1**: `Service`

## Step 2: Add the Backend Script
1. In your Google Sheet, click on **Extensions** > **Apps Script** in the top menu.
2. A new tab will open with a code editor.
3. Delete any default code (like `function myFunction() {...}`) and paste the following code exactly:

``javascript
/*`
  Google Apps Script to handle Contact Form submissions
  Maps specific form fields to Google Sheet columns.
*/

const SHEET_NAME = "Sheet1";

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    const doc = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = doc.getSheetByName(SHEET_NAME);

    // Parse the incoming data
    // The keys here must match the 'name' attributes in your HTML form
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const nextRow = sheet.getLastRow() + 1;

    // Extract data from the POST request
    // These names match input name="name" in HTML
    const name = e.parameter.name || e.parameter.fullName || "";
    const email = e.parameter.email || "";
    const phone = e.parameter.phone || e.parameter.contactNumber || "";
    const service = e.parameter.service || "";
    
    const timestamp = new Date();

    // Map extracted data to row based on our fixed structure: Date, Name, Email, Phone, Service
    // Or you can map dynamically if you prefer, but fixed is safer for this simple use case.
    const newRow = [
      timestamp, 
      name, 
      email, 
      phone, 
      service
    ];

    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": nextRow }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (e) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": e }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

## Step 3: Deploy as a Web App (CRITICAL)
1. Click the blue **Deploy** button in the top right.
2. Select **New deployment**.
3. Click the gear icon (Select type) next to "Select type" and choose **Web app**.
4. Configure the settings:
    - **Description**: Contact Form Backend
    - **Execute as**: `Me` (your email address)
    - **Who has access**: **Anyone** (This is crucial so your website visitors can submit the form without logging in).
5. Click **Deploy**.
6. You may be asked to **Authorize access**. Click "Review permissions", choose your account.
    - If you see a warning "Google hasn't verified this app", click **Advanced** -> **Go to (Script Name) (unsafe)**. This is safe because it is your own script.
    - Click **Allow**.
7. Copy the **Web App URL**. It will look like `https://script.google.com/macros/s/AKfycbx.../exec`.

## Step 4: Update Your Website Code
1. Open the file `js/script.js`.
2. Find the placeholder `CONST GOOGLE_SCRIPT_URL = 'YOUR_WEB_APP_URL_HERE';` (I will add this for you).
3. Replace the placeholder string with the URL you just copied.
4. Save the file and deploy your website.

**Done!** Submissions will now appear in your Google Sheet.
