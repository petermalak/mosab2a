import { google } from 'googleapis';

// Validate environment variables
function validateEnvironment() {
  const missing = [];
  
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    missing.push('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  }
  
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    missing.push('GOOGLE_PRIVATE_KEY');
  }
  
  if (!process.env.SPREADSHEET_ID) {
    missing.push('SPREADSHEET_ID');
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing.join(', ')}`);
  }
}

// Initialize Google Sheets API
let auth, sheets;

try {
  validateEnvironment();
  
  auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheets = google.sheets({ version: 'v4', auth });
} catch (error) {
  console.error('Failed to initialize Google Sheets:', error.message);
}

export async function addWinnerToSheet(winnerData) {
  try {
    if (!sheets) {
      return { success: false, error: 'Google Sheets not initialized' };
    }
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'winners!A:C'; // Sheet name 'winners', columns A-C

    // Prepare the data row: [Phone, Timestamp, Date]
    const values = [
      [
        winnerData.phone,
        winnerData.timestamp,
        new Date(winnerData.timestamp).toLocaleString('ar-EG')
      ]
    ];

    console.log('Adding to Google Sheets:', { spreadsheetId, range, values });

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values,
      },
    });

    console.log('Google Sheets response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error adding winner to sheet:', error);
    return { success: false, error: error.message };
  }
}

export async function getWinnersFromSheet() {
  try {
    if (!sheets) {
      return { success: false, error: 'Google Sheets not initialized' };
    }
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'winners!A:C'; // Sheet name 'winners', columns A-C

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values || [];
    
    // Skip header row if it exists, and convert to objects
    const winners = rows.slice(1).map((row, index) => ({
      phone: row[0] || '',
      timestamp: parseInt(row[1]) || 0,
      date: row[2] || '',
      index: index + 1
    }));

    return { success: true, data: winners };
  } catch (error) {
    console.error('Error getting winners from sheet:', error);
    return { success: false, error: error.message };
  }
}

export async function clearWinnersSheet() {
  try {
    if (!sheets) {
      return { success: false, error: 'Google Sheets not initialized' };
    }
    
    const spreadsheetId = process.env.SPREADSHEET_ID;
    const range = 'winners!A:C'; // Sheet name 'winners', columns A-C

    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range,
    });

    // Add header row
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'winners!A1:C1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [['رقم الهاتف', 'الطابع الزمني', 'التاريخ']]
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error clearing winners sheet:', error);
    return { success: false, error: error.message };
  }
} 