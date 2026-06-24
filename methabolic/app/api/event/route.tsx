// src/app/api/team/route.js
import { getSheetData, getSheetEvents } from '../../components/sheets';
import { NextResponse, NextRequest } from 'next/server';



import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
const SHEET_NAME = 'events'; // ← Change to your actual tab name

const auth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function getWorksheet() {
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, auth);
  await doc.loadInfo();
  const sheet = doc.sheetsByTitle[SHEET_NAME];
  if (!sheet) throw new Error(`Sheet "${SHEET_NAME}" not found`);
  return sheet;
}

export async function GET() {
  try {
    const data = await getSheetEvents();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}



// PUT - Update Google Sheet
export async function PUT(req:NextRequest) {
  try {
    const body = await req.json();
    console.log('update body....', body)
    const sheet = await getWorksheet();
    const rows = await sheet.getRows(); // ← Must call getRows()

    const rowIndex = rows.findIndex(r => r.get('id') === body.id);

    if (rowIndex === -1) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    const row = rows[rowIndex];

    // Update fields
    row.set('title', body.title || '');
    row.set('content', body.content || '');
    row.set('type', body.type|| '');
    row.set('date', body.date || '');
    row.set('link', body.link || '');
    row.set('cta', body.cta || '');
    // Add more .set() calls for additional columns

    await row.save(); // ← This persists the changes

    return Response.json({ 
      success: true, 
      message: 'Event updated successfully in Google Sheet' 
    });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Failed to update Google Sheet' }, { status: 500 });
  }
}