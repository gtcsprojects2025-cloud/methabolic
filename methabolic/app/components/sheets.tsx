import { google } from 'googleapis';

export async function getSheetData() {

    const GOOGLE_SHEETS_API_KEY= process.env.GOOGLE_SHEETS_API_KEY;
    const GOOGLE_SHEET_ID= process.env.GOOGLE_SHEET_ID;
  try {
    const sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_SHEETS_API_KEY,
    });

    // Specify the sheet name and the range of cells you want to fetch
    const range = 'Sheet1!A1:G20'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return [];
    }

    // Transform rows (array of arrays) into an array of objects using the first row as keys
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const rowObject: any= {};
      headers.forEach((header, index) => {
        rowObject[header.toLowerCase()] = row[index] || '';
      });
      return rowObject;
    });

    return data;
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    return [];
  }
}


export async function getSheetEvents() {

    const GOOGLE_SHEETS_API_KEY= process.env.GOOGLE_SHEETS_API_KEY;
    const GOOGLE_SHEET_ID= process.env.GOOGLE_SHEET_ID;
  try {
    const sheets = google.sheets({
      version: 'v4',
      auth: GOOGLE_SHEETS_API_KEY,
    });

    // Specify the sheet name and the range of cells you want to fetch
    const range = 'events!A1:G20'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return [];
    }

    // Transform rows (array of arrays) into an array of objects using the first row as keys
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const rowObject: any= {};
      headers.forEach((header, index) => {
        rowObject[header.toLowerCase()] = row[index] || '';
      });
      return rowObject;
    });

    return data;
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    return [];
  }
}


export async function getBlogData() {

    const GOOGLE_SHEETS_API_KEY= "AIzaSyCSxOEPg9tshhaZdQSSAnEtfbSMblPLJgY";
    const GOOGLE_SHEET_ID="1GmuHYd6bYqnlbwmJghti4DuiMGx0e3hgB1I97zo_kv4";
  try {
    const sheets = google.sheets({
      version: 'v4',
      auth: process.env.GOOGLE_SHEETS_API_KEY,
    });

    // Specify the sheet name and the range of cells you want to fetch
    const range = 'blogs!A1:L20'; 

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: range,
    });

    const rows = response.data.values;
    
    if (!rows || rows.length === 0) {
      return [];
    }

    // Transform rows (array of arrays) into an array of objects using the first row as keys
    const headers = rows[0];
    const data = rows.slice(1).map((row) => {
      const rowObject: any= {};
      headers.forEach((header, index) => {
        rowObject[header.toLowerCase()] = row[index] || '';
      });
      return rowObject;
    });

    return data;
  } catch (error) {
    console.error('Error fetching sheets data:', error);
    return [];
  }
}